<script setup lang="ts">
import {computed,ref,watch} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {topics,type TopicQuestion} from './grammar/topics'
const route=useRoute(),router=useRouter()
const topic=computed(()=>topics.find(t=>t.id===route.params.topicId))
const mode=ref<'learn'|'practice'|'challenge'>('learn')
const group=ref('space'),position=ref('under'),time=ref('at')
const groups=[{id:'space',label:'空间方位'},{id:'time',label:'时间表达'},{id:'phrase',label:'固定搭配'}]
const positions=[{id:'in',label:'里面',x:180,y:139},{id:'on',label:'上面',x:180,y:64},{id:'under',label:'下面',x:180,y:203},{id:'behind',label:'后面',x:209,y:103},{id:'by',label:'旁边',x:287,y:163}]
const place=computed(()=>positions.find(p=>p.id===position.value)!)
const times=[{id:'at',text:'at seven',zh:'七点',icon:'🕖'},{id:'on',text:'on Saturday',zh:'星期六',icon:'📅'},{id:'in',text:'in winter',zh:'冬季',icon:'❄️'}]
const timeItem=computed(()=>times.find(t=>t.id===time.value)!)
const rules=computed(()=>topic.value?.rules.filter(r=>r.group===group.value)||[])
type Result={correct:boolean;attempts:number}
const storageKey='lingualand-grammar-v1'
function load():Record<string,Result>{try{return JSON.parse(localStorage.getItem(storageKey)||'{}')||{}}catch{return {}}}
const results=ref(load())
const mastered=computed(()=>topic.value?.questions.filter(q=>results.value[q.id]?.correct).length||0)
const queue=ref<TopicQuestion[]>([]),index=ref(0),selected=ref(''),checked=ref(false),score=ref(0)
const question=computed(()=>queue.value[index.value])
const finished=computed(()=>index.value>=queue.value.length)
function shuffle<T>(items:T[]):T[]{const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function start(kind:'practice'|'challenge'){if(!topic.value)return;mode.value=kind;const source=kind==='practice'?topic.value.questions.filter(q=>topic.value!.rules[q.rule]?.group===group.value):topic.value.questions;queue.value=shuffle(source).map(q=>({...q,options:shuffle(q.options)}));index.value=0;selected.value='';checked.value=false;score.value=0}
function submit(){const q=question.value;if(!q||!selected.value||checked.value)return;checked.value=true;const correct=selected.value===q.answer;if(correct)score.value++;results.value={...results.value,[q.id]:{correct,attempts:(results.value[q.id]?.attempts||0)+1}};try{localStorage.setItem(storageKey,JSON.stringify(results.value))}catch{}}
function next(){if(!checked.value)return;index.value++;selected.value='';checked.value=false}
watch(()=>route.params.topicId,id=>{mode.value='learn';group.value='space';if(typeof id==='string'&&!topics.some(t=>t.id===id))void router.replace('/grammar')},{immediate:true})
</script>
<template>
<section class="grammar-island">
 <div class="grammar-hero"><small>✦ GRAMMAR ISLAND</small><h2>知识宝库</h2><p>把分散在各个单元里的知识，连成一张清晰的地图。</p><span>三年级至四年级 · 当前覆盖已整理的三册教材</span></div>
 <template v-if="!topic">
  <div class="grammar-grid"><button v-for="t in topics" :key="t.id" class="grammar-topic" @click="router.push('/grammar/'+t.id)"><span class="grammar-icon">🧭</span><small>{{t.english}}</small><h3>{{t.title}}</h3><p>{{t.description}}</p><b>{{t.questions.filter(q=>results[q.id]?.correct).length}} / {{t.questions.length}} 道已掌握 · 开始探索 →</b></button>
  <article v-for="name in ['人称代词家族','物主代词家族','动词变形工坊','名词复数乐园']" :key="name" class="grammar-topic grammar-planned"><span class="grammar-icon">✧</span><h3>{{name}}</h3><p>后续版本开放</p></article></div>
 </template>
 <template v-else>
  <button class="grammar-back" @click="router.push('/grammar')">← 返回知识宝库</button>
  <div class="grammar-heading"><div><small>{{topic.english}}</small><h3>{{topic.title}}</h3></div><b>{{mastered}} / {{topic.questions.length}} 已掌握</b></div>
  <div class="grammar-tabs"><button :class="{active:mode==='learn'}" @click="mode='learn'">知识精讲</button><button :class="{active:mode==='practice'}" @click="start('practice')">专项训练</button><button :class="{active:mode==='challenge'}" @click="start('challenge')">综合挑战</button></div>
  <template v-if="mode==='learn'">
   <div class="grammar-tabs"><button v-for="g in groups" :key="g.id" :class="{active:group===g.id}" @click="group=g.id">{{g.label}}</button></div>
   <div v-if="topic.demo==='prepositions'&&group==='space'" class="grammar-panel">
    <h3>位置实验 · Where is the ball?</h3>
    <svg viewBox="0 0 360 240" role="img" :aria-label="'球在箱子'+place.label"><rect width="360" height="240" rx="16" fill="#e9f5ed"/><path d="M0 210 Q180 180 360 210 V240 H0Z" fill="#c4dfb7"/><ellipse cx="180" cy="193" rx="86" ry="12" fill="#a5c69b"/><circle v-if="position==='behind'" :cx="place.x" :cy="place.y" r="19" fill="#ef8354" stroke="#fff" stroke-width="3"/><rect x="115" y="84" width="130" height="99" rx="7" fill="#d4a36d" stroke="#96663e" stroke-width="3"/><path d="M115 84 L135 70 H225 L245 84" fill="#f2ce99" stroke="#96663e" stroke-width="3"/><rect v-if="position==='in'" x="132" y="104" width="96" height="65" rx="5" fill="#79563d"/><circle v-if="position!=='behind'" :cx="place.x" :cy="place.y" r="19" fill="#ef8354" stroke="#fff" stroke-width="3"/></svg>
    <p class="grammar-sentence">The ball is <strong>{{position}}</strong> the box.</p><p>球在箱子{{place.label}}。</p><div class="grammar-tabs"><button v-for="p in positions" :key="p.id" :class="{active:position===p.id}" @click="position=p.id">{{p.id}}</button></div>
   </div>
   <div v-if="topic.demo==='prepositions'&&group==='time'" class="grammar-panel"><h3>时间实验</h3><div class="grammar-time">{{timeItem.icon}}</div><p class="grammar-sentence">{{timeItem.text}}</p><p>{{timeItem.zh}}</p><div class="grammar-tabs"><button v-for="t in times" :key="t.id" :class="{active:time===t.id}" @click="time=t.id">{{t.id}}</button></div></div>
   <div class="grammar-rules"><article v-for="r in rules" :key="r.word+r.group+r.meaning" class="grammar-rule"><h3>{{r.word}} <small>{{r.meaning}}</small></h3><strong>{{r.example}}</strong><p>{{r.translation}}</p><small>关联单元：{{r.unit}} · 原创归纳例句</small></article></div>
   <button class="grammar-primary" @click="start('practice')">开始本分类专项训练 →</button>
  </template>
  <div v-else class="grammar-panel grammar-practice">
   <template v-if="finished"><h3>本轮完成</h3><p class="grammar-sentence">{{score}} / {{queue.length}}</p><p>答题结果已记录，可再次练习巩固。</p><button class="grammar-primary" @click="start(mode==='challenge'?'challenge':'practice')">再练一次</button></template>
   <template v-else-if="question"><small>第 {{index+1}} / {{queue.length}} 题</small><progress :value="index" :max="queue.length"></progress><h3>{{question.prompt}}</h3><p>{{question.hint}}</p><div class="grammar-options"><button v-for="o in question.options" :key="o" :disabled="checked" :class="{active:selected===o,right:checked&&o===question.answer,wrong:checked&&selected===o&&o!==question.answer}" @click="selected=o">{{o}}</button></div><div v-if="checked" class="grammar-feedback" role="status"><strong>{{selected===question.answer?'回答正确！':'正确答案：'+question.answer}}</strong><p>{{topic.rules[question.rule]?.meaning}} · {{topic.rules[question.rule]?.example}}</p></div><button v-if="!checked" class="grammar-primary" :disabled="!selected" @click="submit">提交答案</button><button v-else class="grammar-primary" @click="next">下一题 →</button></template>
  </div>
 </template>
</section>
</template>
<style scoped>
.grammar-island{display:grid;gap:18px;color:inherit}.grammar-hero{padding:24px;border-radius:20px;background:linear-gradient(120deg,#e3f3e7,#fff1d3);color:#245b45}.grammar-hero h2{font-size:30px;margin:8px 0}.grammar-hero p{margin:8px 0}.grammar-hero span,.grammar-hero small{font-size:12px}.grammar-grid,.grammar-rules{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:14px}.grammar-topic,.grammar-rule,.grammar-panel{border:1px solid #dce8df;background:#fff;border-radius:18px;padding:20px;color:#28483b;text-align:left}.grammar-topic{cursor:pointer}.grammar-topic h3,.grammar-rule h3{margin:8px 0}.grammar-topic b{color:#34765b;font-size:13px}.grammar-icon{display:block;font-size:32px}.grammar-planned{opacity:.65;cursor:default}.grammar-heading{display:flex;align-items:center;justify-content:space-between;gap:12px}.grammar-heading h3{font-size:24px;margin:4px 0}.grammar-tabs,.grammar-options{display:flex;gap:8px;flex-wrap:wrap}.grammar-tabs button,.grammar-options button,.grammar-back{border:1px solid #cddfd2;border-radius:10px;background:white;color:#28513e;padding:10px 15px;cursor:pointer}.grammar-tabs .active,.grammar-options .active,.grammar-primary{background:#34765b;color:white;border-color:#34765b}.grammar-back{justify-self:start}.grammar-panel{text-align:center}.grammar-panel svg{display:block;width:100%;max-width:420px;margin:12px auto}.grammar-panel .grammar-tabs,.grammar-options{justify-content:center}.grammar-sentence{font-size:clamp(22px,4vw,32px);margin:12px 0}.grammar-sentence strong{color:#34765b}.grammar-time{font-size:64px}.grammar-rule small{font-size:12px;color:#587264}.grammar-rule p{margin:8px 0}.grammar-primary{border:0;border-radius:12px;padding:12px 20px;cursor:pointer;justify-self:start}.grammar-primary:disabled{opacity:.45;cursor:not-allowed}.grammar-practice{max-width:720px;width:100%;box-sizing:border-box;margin:auto}.grammar-practice progress{display:block;width:100%;margin:12px 0;accent-color:#34765b}.grammar-options button{min-width:80px;font-size:20px}.grammar-options .right{background:#d8f0df;color:#235b36;border-color:#55a36d}.grammar-options .wrong{background:#fde2de;color:#a43c32;border-color:#d77b71}.grammar-feedback{padding:12px;margin:12px 0;background:#f0f6f1;border-radius:10px}.grammar-practice .grammar-primary{margin-top:18px}@media(max-width:600px){.grammar-hero,.grammar-panel,.grammar-topic,.grammar-rule{padding:15px}.grammar-heading{align-items:flex-start}.grammar-tabs button{padding:8px 12px}}
</style>
