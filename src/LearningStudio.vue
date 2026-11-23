<script setup lang="ts">
import {computed,ref,watch} from 'vue'
import {curricula} from './curriculum'
import SentenceCastle from './SentenceCastle.vue'
type Mode='phrase'|'sentence'|'dialogue'
type Entry={id:string;mode:Mode;english:string;meaning:string;note:string;origin:'textbook-word-list'|'original-practice';volume:string;unit:string;unitTitle:string;icon:string}
const volumes=curricula[0]!.volumes.filter(v=>['g3a','g3b','g4a'].includes(v.id))
const entries:Entry[]=volumes.flatMap(v=>v.units.flatMap(u=>{
const base={volume:v.id,unit:u.id,unitTitle:u.title}
const phrases:Entry[]=(u.phrases||[]).filter(p=>p.english.trim()).map((p,i)=>({id:u.id+'-phrase-'+i,mode:'phrase',english:p.english,meaning:p.meaning,note:'教材词汇表收录的短语或常用表达',origin:'textbook-word-list',icon:'🧩',...base}))
const existing=new Set(phrases.map(p=>p.english.toLowerCase().trim()))
const expressions:Entry[]=u.cards.filter(c=>c.category==='expression'&&c.word.trim()&&!existing.has(c.word.toLowerCase().trim())).map(c=>({id:u.id+'-expr-'+c.id,mode:'phrase',english:c.word,meaning:c.meaning,note:'教材词汇表收录的表达',origin:'textbook-word-list',icon:c.emoji||'💬',...base}))
const sentences:Entry[]=u.cards.filter(c=>c.example&&c.example.trim()&&/[.!?]$/.test(c.example.trim())).map(c=>({id:u.id+'-sentence-'+c.id,mode:'sentence',english:c.example,meaning:'',note:'围绕“'+c.word+'”（'+c.meaning+'）的原创配套例句。尝试理解句子，再听发音。',origin:'original-practice',icon:c.emoji||'📖',...base}))
const seen=new Set<string>()
const uniqueSentences=sentences.filter(e=>{const k=e.english.toLowerCase().trim();if(seen.has(k))return false;seen.add(k);return true})
const dialogues:Entry[]=(u.dialogues||[]).filter(d=>d.lines.length>=2).map((d,i)=>({id:u.id+'-dialogue-'+i,mode:'dialogue',english:d.lines.map((line,j)=>(j%2?'B: ':'A: ')+line).join('\n'),meaning:'',note:'围绕本单元“'+u.title+'”主题编写的原创情景对话。',origin:'original-practice',icon:'🎭',...base}))
return [...phrases,...expressions,...uniqueSentences,...dialogues]
}))
const mode=ref<Mode>('phrase'),volume=ref('all'),unit=ref('all'),index=ref(0),revealed=ref(false)
const favorites=ref<string[]>(readFavorites())
const reviewOnly=ref(false)
function readFavorites(){try{const v=JSON.parse(localStorage.getItem('lingualand-studio-favorites')||'[]');return Array.isArray(v)?v.filter((x):x is string=>typeof x==='string'):[]}catch{return []}}
const units=computed(()=>volumes.filter(v=>volume.value==='all'||v.id===volume.value).flatMap(v=>v.units))
const cards=computed(()=>entries.filter(e=>e.mode===mode.value&&(volume.value==='all'||e.volume===volume.value)&&(unit.value==='all'||e.unit===unit.value)&&(!reviewOnly.value||favorites.value.includes(e.id))))
const card=computed(()=>cards.value[index.value])
const stats=computed(()=>({phrase:entries.filter(e=>e.mode==='phrase').length,sentence:entries.filter(e=>e.mode==='sentence').length,dialogue:entries.filter(e=>e.mode==='dialogue').length}))
const volumeLabel=(id:string)=>id==='g3a'?'三年级上册 · 2024秋':id==='g3b'?'三年级下册 · 2025春':'四年级上册 · 2025秋'
function reset(){index.value=0;revealed.value=false}
function change(m:Mode){mode.value=m;reset()}
function move(d:number){if(!cards.value.length)return;index.value=(index.value+d+cards.value.length)%cards.value.length;revealed.value=false}
function toggleFavorite(){if(!card.value)return;const id=card.value.id;favorites.value=favorites.value.includes(id)?favorites.value.filter(x=>x!==id):[...favorites.value,id];localStorage.setItem('lingualand-studio-favorites',JSON.stringify(favorites.value))}
watch([volume,unit,reviewOnly],reset)
watch(volume,()=>unit.value='all')
function speak(){if(!card.value||!('speechSynthesis' in window))return;window.speechSynthesis.cancel();for(const line of card.value.english.split('\n')){const u=new SpeechSynthesisUtterance(line.replace(/^[AB]:\s*/,''));u.lang='en-US';u.rate=.82;window.speechSynthesis.speak(u)}}
</script>
<template>
<section class="studio">
<div class="studio-header"><small>✦ LEARNING STUDIO · TEXTBOOK EDITION</small><h2>语言探索工坊</h2><p>三册教材联动，从短语、例句到情景对话，让英语真正用起来。</p></div>
<div class="studio-overview"><div><strong>{{stats.phrase}}</strong><span>短语与表达</span></div><div><strong>{{stats.sentence}}</strong><span>配套例句</span></div><div><strong>{{stats.dialogue}}</strong><span>情景对话</span></div></div>
<div class="studio-filters"><label>教材册次<select v-model="volume"><option value="all">全部三册</option><option v-for="v in volumes" :key="v.id" :value="v.id">{{volumeLabel(v.id)}}</option></select></label><label>学习单元<select v-model="unit"><option value="all">全部单元</option><option v-for="u in units" :key="u.id" :value="u.id">{{u.id.split('-').slice(-1)[0]?.toUpperCase()}} · {{u.title}}</option></select></label><label class="studio-review"><input v-model="reviewOnly" type="checkbox"/> 只看收藏（{{favorites.length}}）</label></div>
<div class="studio-tabs" role="tablist" aria-label="学习分类"><button :class="{active:mode==='phrase'}" role="tab" :aria-selected="mode==='phrase'" @click="change('phrase')">🧩 短语工坊</button><button :class="{active:mode==='sentence'}" role="tab" :aria-selected="mode==='sentence'" @click="change('sentence')">🏰 句式城堡</button><button :class="{active:mode==='dialogue'}" role="tab" :aria-selected="mode==='dialogue'" @click="change('dialogue')">🎭 情景对话</button></div>
<SentenceCastle v-if="mode==='sentence'" :volume="volume" :unit="unit"/>
<div v-else-if="card" class="studio-card"><div class="studio-card-top"><span>{{volumeLabel(card.volume)}} / {{card.unitTitle}}</span><span>{{index+1}} / {{cards.length}}</span></div><div class="studio-emoji">{{card.icon}}</div><h3>{{card.english}}</h3><p>{{card.note}}</p><div class="studio-answer" aria-live="polite">{{revealed?(card.meaning||'这是原创配套练习。请结合单元词汇理解、跟读，并尝试替换关键词进行表达。'):'先回忆意思或尝试朗读，再揭晓提示'}}</div><div class="studio-actions"><button class="secondary" @click="speak">🔊 听发音</button><button class="primary" @click="revealed=!revealed">{{revealed?'隐藏提示':'揭晓提示 ✨'}}</button><button class="secondary" :aria-pressed="favorites.includes(card.id)" @click="toggleFavorite">{{favorites.includes(card.id)?'★ 已收藏':'☆ 收藏复习'}}</button></div><div class="studio-origin">{{card.origin==='textbook-word-list'?'教材词汇表收录':'原创配套练习 · 非教材原文'}}</div></div>
<div v-else class="studio-card studio-empty"><h3>当前筛选条件下没有内容</h3><p>试试切换单元、学习分类，或者关闭“只看收藏”。</p><button class="secondary" @click="volume='all';unit='all';reviewOnly=false">查看全部内容</button></div>
<div v-if="mode!=='sentence'" class="studio-nav"><button class="secondary" :disabled="!cards.length" @click="move(-1)">← 上一张</button><button class="primary" :disabled="!cards.length" @click="move(1)">下一张 →</button></div>
<p class="studio-disclaimer">资料范围：译林版三年级上册（2024秋）、三年级下册（2025春）、四年级上册（2025秋）。短语和表达来自现有教材词汇表整理数据；句型模板、替换词块、例句及对话是原创配套练习，并非教材原文。</p>
</section>
</template>
<style scoped>
.studio-overview{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:0 0 20px}.studio-overview>div{padding:16px;background:linear-gradient(135deg,#e5f5e9,#fff9ec);border:1px solid #e3eee5;border-radius:17px;display:flex;align-items:center;gap:12px}.studio-overview strong{font-size:28px;color:#3c9169}.studio-overview span{font-size:12px;color:#6c8976}.studio-filters{display:flex;align-items:end;gap:13px;flex-wrap:wrap;margin:0 0 22px}.studio-filters label{display:flex;flex-direction:column;gap:7px;font-size:12px;color:#64836f;font-weight:800}.studio-filters select{max-width:290px;min-width:200px;border:1px solid #dce9de;border-radius:12px;background:#fff;padding:12px;color:#416c53;font:inherit}.studio-filters .studio-review{flex-direction:row;align-items:center;padding:12px;gap:9px}.studio-review input{accent-color:#4da879;width:17px;height:17px}.studio-card-top{display:flex;justify-content:space-between;gap:12px;font-size:11px;color:#729581;text-align:left}.studio-card-top span:last-child{white-space:nowrap}.studio-origin{margin-top:22px;font-size:11px;color:#789b82}.studio-empty{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px}.studio-empty h3{font-size:22px}.studio-actions button[aria-pressed=true]{background:#fff2d4;color:#9a7035}.studio-card h3{overflow-wrap:anywhere}@media(max-width:650px){.studio-overview>div{flex-direction:column;align-items:start;gap:4px}.studio-overview strong{font-size:22px}.studio-filters label:not(.studio-review),.studio-filters select{width:100%;max-width:none}.studio-card-top{flex-direction:column}.studio-actions{gap:8px}}
</style>