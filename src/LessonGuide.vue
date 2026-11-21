<script setup lang="ts">
import {computed,ref} from 'vue'
import type {Unit} from './curriculum'
const props=defineProps<{unit:Unit}>()
const active=ref(0)
const isTextbook=computed(()=>props.unit.status==='textbook-wordlist-verified')
function say(s:string){if(!('speechSynthesis' in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(s);u.lang='en-US';u.rate=.78;window.speechSynthesis.speak(u)}
</script>
<template>
<section class="lesson-guide">
<div class="studio-header"><small>✦ TEXTBOOK-ALIGNED LEARNING</small><h2>{{unit.title}}</h2><p>{{unit.description}}</p></div>
<div v-if="isTextbook" class="lesson-source">教材：2024 修订版译林英语 · 三年级上册 · 词卡完整对应书后 Word lists；对话和练习为原创配套内容，非教材原题。</div>
<div v-else class="lesson-source">当前单元为原创主题练习，尚未与所选教材逐页核对。</div>
<template v-if="unit.objectives?.length">
<h3>本单元学习目标</h3><div class="lesson-goals"><div v-for="(goal,i) in unit.objectives" :key="i"><span>0{{i+1}}</span>{{goal}}</div></div>
<div class="lesson-letter">字母学习 <strong>{{unit.letters}}</strong></div>
<h3>重点表达 · 听一听</h3><div class="lesson-phrases"><button v-for="(p,i) in unit.phrases" :key="i" @click="say(p.english)"><strong>{{p.english}}</strong><small>{{p.meaning}}</small><span>🔊</span></button></div>
<h3>原创情景对话 · 练一练</h3><div class="lesson-dialogue" v-if="unit.dialogues?.length"><div class="lesson-scene">场景 {{active+1}} / {{unit.dialogues.length}}</div><div v-for="(line,i) in unit.dialogues[active].lines" :key="i" class="lesson-bubble" :class="{reply:i%2}"><span>{{i%2?'B':'A'}}</span><button @click="say(line)">{{line}} 🔊</button></div><div class="lesson-switch"><button class="secondary" @click="active=(active+unit.dialogues.length-1)%unit.dialogues.length">← 上一组</button><button class="primary" @click="active=(active+1)%unit.dialogues.length">下一组 →</button></div></div>
<p class="lesson-disclaimer">这些情景对话是为练习目标编写的原创内容，不是教材 Story time / Cartoon time 原文。</p>
</template>
<p v-else>当前单元的教材知识目标正在核验中。可以先使用单词森林和练习题。</p>
</section>
</template>