<script setup lang="ts">
import {computed,onBeforeUnmount,ref} from 'vue'
import type {Card} from './data'
const props=defineProps<{cards:Card[]}>()
type Mode='word'|'meaning'|'speak'
type SpeechResult={transcript:string;confidence?:number}
type Recognition={lang:string;interimResults:boolean;continuous:boolean;onresult:((e:{results:ArrayLike<ArrayLike<SpeechResult>>})=>void)|null;onerror:((e:{error:string})=>void)|null;onend:(()=>void)|null;start:()=>void;stop:()=>void}
type RecognitionConstructor=new()=>Recognition
const mode=ref<Mode>('word'),index=ref(0),chosen=ref(''),revealed=ref(false),listening=ref(false),transcript=ref(''),speechError=ref('')
let recognition:Recognition|null=null
const cards=computed(()=>props.cards)
const card=computed(()=>cards.value[index.value])
const supportedTts=typeof window!=='undefined'&&'speechSynthesis'in window
const recognitionConstructor=typeof window!=='undefined'?(window as Window & {SpeechRecognition?:RecognitionConstructor;webkitSpeechRecognition?:RecognitionConstructor}).SpeechRecognition||(window as Window & {webkitSpeechRecognition?:RecognitionConstructor}).webkitSpeechRecognition:undefined
const supportedRecognition=Boolean(recognitionConstructor)
const correct=computed(()=>chosen.value===card.value?.word)
const wordOptions=computed(()=>[card.value,...cards.value.filter(c=>c.id!==card.value?.id).slice(0,3)].filter(Boolean).sort((a,b)=>hash(a.word+card.value?.id)-hash(b.word+card.value?.id)))
const meaningOptions=computed(()=>{const words=cards.value.filter(c=>c.id!==card.value?.id).slice(0,3).map(c=>c.meaning);return [card.value?.meaning||'',...words].sort((a,b)=>hash(a+card.value?.id)-hash(b+card.value?.id))})
function hash(v:string){return [...v].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7)}
function reset(){chosen.value='';revealed.value=false;transcript.value='';speechError.value='';if(recognition){recognition.stop();recognition=null}listening.value=false}
function change(m:Mode){reset();mode.value=m;index.value=0}
function next(){reset();index.value=(index.value+1)%cards.value.length}
function speak(value:string){if(!supportedTts){speechError.value='当前浏览器不支持语音播放';return}window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(value);u.lang='en-US';u.rate=.8;window.speechSynthesis.speak(u)}
function listen(){if(!recognitionConstructor){speechError.value='当前浏览器不支持语音识别，可以使用手动跟读模式。';return}reset();try{const r=new recognitionConstructor();recognition=r;r.lang='en-US';r.interimResults=false;r.continuous=false;r.onresult=e=>{transcript.value=e.results[0]?.[0]?.transcript||'';revealed.value=true};r.onerror=e=>{speechError.value='识别未完成：'+e.error+'。请检查麦克风权限或改用手动跟读。'};r.onend=()=>{listening.value=false;recognition=null};r.start();listening.value=true}catch{listening.value=false;speechError.value='无法启动麦克风，请检查浏览器权限。'}}
const normalized=(s:string)=>s.toLowerCase().replace(/[^a-z]/g,'')
const match=computed(()=>Boolean(transcript.value&&normalized(transcript.value)===normalized(card.value?.word||'')))
onBeforeUnmount(()=>{recognition?.stop();if(supportedTts)window.speechSynthesis.cancel()})
</script>
<template>
<section class="speaking-island">
<div class="studio-header"><small>✦ LISTEN & SPEAK</small><h2>听说探险岛</h2><p>听一听、想一想、大声说出来。当前练习来自所选单元。</p></div>
<div class="speaking-tabs" role="tablist" aria-label="听说训练类型">
<button :class="{active:mode==='word'}" role="tab" :aria-selected="mode==='word'" @click="change('word')">🎧 听音选词</button>
<button :class="{active:mode==='meaning'}" role="tab" :aria-selected="mode==='meaning'" @click="change('meaning')">💡 听音辨义</button>
<button :class="{active:mode==='speak'}" role="tab" :aria-selected="mode==='speak'" @click="change('speak')">🎙️ 跟读练习</button>
</div>
<div v-if="!card" class="speaking-card"><h3>这个单元还没有可练习的单词。</h3></div>
<div v-else class="speaking-card">
<div class="speaking-counter">练习 {{index+1}} / {{cards.length}}</div>
<div class="speaking-orb" aria-hidden="true">{{mode==='speak'?'🎙️':'🎧'}}</div>
<h3>{{mode==='speak'?card.word:mode==='word'?'听发音，找到对应的单词':'听发音，选择正确的中文意思'}}</h3>
<p>{{mode==='speak'?'先听示范，再点击麦克风跟读。':'可以反复播放，慢慢听清楚每个音。'}}</p>
<button class="speaking-play" :disabled="!supportedTts" @click="speak(card.word)">🔊 {{supportedTts?'播放英语发音':'浏览器不支持播放'}}</button>
<template v-if="mode==='word'"><div class="speaking-options"><button v-for="c in wordOptions" :key="c.id" :disabled="revealed" :class="{chosen:chosen===c.word}" @click="chosen=c.word">{{c.word}}</button></div></template>
<template v-else-if="mode==='meaning'"><div class="speaking-options"><button v-for="meaning in meaningOptions" :key="meaning" :disabled="revealed" :class="{chosen:chosen===meaning}" @click="chosen=meaning">{{meaning}}</button></div></template>
<template v-else><div class="speaking-record"><button class="primary" :disabled="listening||!supportedRecognition" @click="listen">{{listening?'正在聆听…':'🎙️ 开始跟读'}}</button><button class="secondary" @click="revealed=true">我已自行跟读</button></div><p v-if="!supportedRecognition" class="speaking-caveat">当前浏览器没有可用的语音识别接口。仍可听示范并自行跟读。</p><p v-if="transcript" class="speaking-transcript">识别文字：{{transcript}}<br>{{match?'文字匹配成功！':'与目标单词不完全相同，可以再试一次。'}}<br><small>这只是文字识别结果，不代表发音质量评分。</small></p></template>
<div v-if="mode!=='speak'&&revealed" class="speaking-feedback" :class="{incorrect:mode==='word'? !correct:chosen!==card.meaning}">{{(mode==='word'?correct:chosen===card.meaning)?'回答正确！':'继续加油！'}} 正确答案：{{card.word}} · {{card.meaning}}</div>
<p v-if="speechError" role="status" class="speaking-caveat">{{speechError}}</p>
<div class="speaking-actions"><button v-if="mode!=='speak'&&!revealed" class="secondary" :disabled="!chosen" @click="revealed=true">确认答案</button><button class="primary" @click="next">下一题 →</button></div>
</div>
<p class="speaking-note">语音播放取决于设备语音包；语音识别取决于浏览器、权限及可能的在线服务，不保证离线可用。</p>
</section>
</template>