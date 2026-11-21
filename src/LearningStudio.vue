<script setup lang="ts">
import {computed,ref} from 'vue'
const content={
phrase:[['🌞','Good morning!','早上好！','早晨见面时的问候'],['🎒','go to school','去上学','go to + 地点'],['🤝','my good friend','我的好朋友','good 修饰 friend'],['👋','See you!','再见！','常见道别表达']],
sentence:[['📚','This is my book.','这是我的书。','This is + 名词'],['✨','I am happy.','我很开心。','I am + 形容词'],['💬','What is your name?','你叫什么名字？','My name is…'],['🌈','How are you?','你好吗？','I am fine, thank you.']],
dialogue:[['🏫','A: Good morning!\nB: Good morning!','早上好！\n早上好！','在校门口打招呼'],['🦊','A: What is your name?\nB: My name is Lily.','你叫什么名字？\n我叫莉莉。','认识新朋友']]
}
type Mode=keyof typeof content
const mode=ref<Mode>('phrase'),index=ref(0),revealed=ref(false)
const cards=computed(()=>content[mode.value])
const card=computed(()=>cards.value[index.value]!)
function change(m:Mode){mode.value=m;index.value=0;revealed.value=false}
function move(d:number){index.value=(index.value+d+cards.value.length)%cards.value.length;revealed.value=false}
function speak(){if(!('speechSynthesis' in window))return;window.speechSynthesis.cancel();for(const line of card.value[1].split('\n')){const u=new SpeechSynthesisUtterance(line.replace(/^[AB]:\s*/,''));u.lang='en-US';u.rate=.85;window.speechSynthesis.speak(u)}}
</script>
<template>
<section class="studio">
<div class="studio-header"><small>✦ LEARNING STUDIO</small><h2>语言探索工坊</h2><p>从单词到表达，把英语真正用起来。</p></div>
<div class="studio-tabs" role="tablist" aria-label="学习分类"><button :class="{active:mode==='phrase'}" role="tab" :aria-selected="mode==='phrase'" @click="change('phrase')">🧩 短语工坊</button><button :class="{active:mode==='sentence'}" role="tab" :aria-selected="mode==='sentence'" @click="change('sentence')">🏰 句式城堡</button><button :class="{active:mode==='dialogue'}" role="tab" :aria-selected="mode==='dialogue'" @click="change('dialogue')">🎭 情景对话</button></div>
<div class="studio-card"><div class="studio-count">{{index+1}} / {{cards.length}}</div><div class="studio-emoji">{{card[0]}}</div><h3>{{card[1]}}</h3><p>{{card[3]}}</p><div class="studio-answer" aria-live="polite">{{revealed?card[2]:'先回忆中文意思，再揭晓答案'}}</div><div class="studio-actions"><button class="secondary" @click="speak">🔊 听发音</button><button class="primary" @click="revealed=!revealed">{{revealed?'隐藏释义':'揭晓答案 ✨'}}</button></div></div>
<div class="studio-nav"><button class="secondary" @click="move(-1)">← 上一张</button><button class="primary" @click="move(1)">下一张 →</button></div><p class="studio-disclaimer">原创示范学习素材，尚未对应具体修订版译林教材单元。</p>
</section>
</template>