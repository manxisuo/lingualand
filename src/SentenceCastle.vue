<script setup lang="ts">
import {computed,ref,watch} from 'vue'
type Slot={label:string;choices:string[]}
type Pattern={id:string;volume:string;unit:string;title:string;zh:string;rule:string;parts:string[];slots:Slot[];example:string}
const patterns:Pattern[]=[
{id:'hello',volume:'g3a',unit:'g3a-u02',title:'问候与介绍',zh:'我是……',rule:'I am + 人名：介绍自己。',parts:['I am ','','.'],slots:[{label:'名字',choices:['Amy','Ben','Lily']}],example:'I am Amy.'},
{id:'this-is',volume:'g3a',unit:'g3a-u04',title:'介绍人物或物品',zh:'这是……',rule:'This is + 名词或姓名。',parts:['This is ','','.'],slots:[{label:'人物',choices:['my friend','my teacher','Lily']}],example:'This is my friend.'},
{id:'like',volume:'g3b',unit:'g3b-u05',title:'表达喜好',zh:'我喜欢……',rule:'I like + 名词。',parts:['I like ','','.'],slots:[{label:'事物',choices:['apples','cats','dogs']}],example:'I like cats.'},
{id:'school-thing',volume:'g3b',unit:'g3b-u01',title:'校园物品',zh:'这是我的……',rule:'This is my + 物品。',parts:['This is my ','','.'],slots:[{label:'文具',choices:['pen','pencil','ruler']}],example:'This is my pen.'},
{id:'where',volume:'g3b',unit:'g3b-u01',title:'寻找物品',zh:'我的……在哪里？',rule:'Where is my + 单数物品？',parts:['Where is my ','','?'],slots:[{label:'物品',choices:['pen','ruler','schoolbag']}],example:'Where is my ruler?'},
{id:'have',volume:'g3b',unit:'g3b-u01',title:'拥有物品',zh:'我有一个……',rule:'I have a + 单数可数名词。',parts:['I have a ','','.'],slots:[{label:'物品',choices:['pen','pencil','ruler']}],example:'I have a pencil.'},
{id:'subject',volume:'g4a',unit:'g4a-u01',title:'我最喜欢的学科',zh:'你最喜欢什么学科？',rule:'What subject do you like best? — I like + 学科 + best.',parts:['I like ','',' best.'],slots:[{label:'学科',choices:['English','Science','Art','PE']}],example:'I like Science best.'},
{id:'time',volume:'g4a',unit:'g4a-u02',title:'我的一天',zh:'我在……做……',rule:'I + 动作 + at + 时间。询问时间用 What time do you ...?',parts:['I ','',' at ','','.'],slots:[{label:'活动',choices:['get up','have breakfast','go to bed']},{label:'时间',choices:["seven o'clock",'seven thirty',"eight o'clock"]}],example:"I get up at seven o'clock."},
{id:'weekday',volume:'g4a',unit:'g4a-u03',title:'星期与日程',zh:'今天是星期……',rule:'What day is it today? — It is + 星期。',parts:['It is ','','.'],slots:[{label:'星期',choices:['Monday','Wednesday','Friday','Sunday']}],example:'It is Wednesday.'},
{id:'sport',volume:'g4a',unit:'g4a-u04',title:'运动喜好',zh:'你喜欢……吗？',rule:'Do you like + 运动？ — Yes, I do. / No, I don’t.',parts:['Do you like ','','?'],slots:[{label:'运动',choices:['basketball','football','table tennis']}],example:'Do you like basketball?'},
{id:'weather',volume:'g4a',unit:'g4a-u06',title:'天气怎么样',zh:'今天……',rule:'What is the weather like today? — It is + 天气形容词。',parts:['It is ','',' today.'],slots:[{label:'天气',choices:['sunny','cloudy','windy','rainy']}],example:'It is cloudy today.'},
{id:'season',volume:'g4a',unit:'g4a-u07',title:'四季活动',zh:'我在……去……',rule:'I + 活动 + in + 季节。',parts:['I ','',' in ','','.'],slots:[{label:'活动',choices:['go boating','go swimming','go skating']},{label:'季节',choices:['spring','summer','winter']}],example:'I go boating in spring.'},
{id:'wear',volume:'g4a',unit:'g4a-u08',title:'衣着搭配',zh:'穿上……',rule:'Wear + 衣物名词。',parts:['Wear ','','.'],slots:[{label:'衣物',choices:['a coat','a shirt','a dress']}],example:'Wear a coat.'},
{"id":"name-q","volume":"g3a","unit":"g3a-u02","title":"询问姓名","zh":"你叫什么名字？","rule":"What's your name? — My name is + 名字。","parts":["My name is ","","."],"slots":[{"label":"名字","choices":["Amy","Ben","Lily"]}],"example":"My name is Amy."},
{"id":"identity","volume":"g3a","unit":"g3a-u03","title":"确认身份","zh":"你是……吗？","rule":"Are you + 姓名？— Yes, I am. / No, I'm not.","parts":["Are you ","","?"],"slots":[{"label":"名字","choices":["Su Hai","Amy","Lily"]}],"example":"Are you Su Hai?"},
{"id":"family","volume":"g3a","unit":"g3a-u05","title":"介绍家人","zh":"她是我的……","rule":"She's my + 家庭成员。","parts":["She's my ","","."],"slots":[{"label":"家庭成员","choices":["mother","sister","grandma"]}],"example":"She's my mother."},
{"id":"grandpa","volume":"g3a","unit":"g3a-u06","title":"询问家庭关系","zh":"他是你的……吗？","rule":"Is he your + 家庭成员？— Yes, he is. / No, he isn't.","parts":["Is he your ","","?"],"slots":[{"label":"家庭成员","choices":["grandpa","father","brother"]}],"example":"Is he your grandpa?"},
{"id":"birthday","volume":"g3a","unit":"g3a-u07","title":"生日祝福","zh":"生日快乐！","rule":"Happy Birthday, + 名字！","parts":["Happy Birthday, ","","!"],"slots":[{"label":"名字","choices":["Amy","Ben","Lily"]}],"example":"Happy Birthday, Amy!"},
{"id":"can","volume":"g3a","unit":"g3a-u08","title":"询问能力","zh":"你会……吗？","rule":"Can you + 动词原形？— Yes, I can. / No, I can't.","parts":["Can you ","","?"],"slots":[{"label":"动作","choices":["sing","dance","swim"]}],"example":"Can you sing?"},
{"id":"clean","volume":"g3b","unit":"g3b-u02","title":"一起打扫","zh":"让我们……","rule":"Let's + 动词原形 + 地点。","parts":["Let's ","","."],"slots":[{"label":"行动","choices":["clean our classroom","clean the desk","put away the books"]}],"example":"Let's clean our classroom."},
{"id":"rules","volume":"g3b","unit":"g3b-u03","title":"校园规则","zh":"请……","rule":"Please + 动词原形。","parts":["Please ","","."],"slots":[{"label":"行动","choices":["sit down","be quiet","come in"]}],"example":"Please sit down."},
{"id":"play","volume":"g3b","unit":"g3b-u04","title":"课后活动","zh":"让我们……","rule":"Let's + 动词原形 + 时间。","parts":["Let's ","","."],"slots":[{"label":"活动","choices":["play after class","have fun","play football"]}],"example":"Let's play after class."},
{"id":"fruit","volume":"g3b","unit":"g3b-u05","title":"分享水果","zh":"你想要……吗？","rule":"Would you like + 名词？— Yes, please. / No, thank you.","parts":["Would you like ","","?"],"slots":[{"label":"水果","choices":["an apple","a banana","an orange"]}],"example":"Would you like an apple?"},
{"id":"farm","volume":"g3b","unit":"g3b-u06","title":"欢迎来到农场","zh":"欢迎来到……","rule":"Welcome to + 地点！","parts":["Welcome to ","","!"],"slots":[{"label":"地点","choices":["my farm","our school","my home"]}],"example":"Welcome to my farm!"},
{"id":"animal","volume":"g3b","unit":"g3b-u07","title":"观察动物","zh":"看这只……","rule":"Look at the + 动物！","parts":["Look at the ","","!"],"slots":[{"label":"动物","choices":["panda","tiger","monkey"]}],"example":"Look at the panda!"},
{"id":"colour","volume":"g3b","unit":"g3b-u08","title":"询问颜色","zh":"这只……是什么颜色？","rule":"What colour is the + 物品？","parts":["What colour is the ","","?"],"slots":[{"label":"物品","choices":["ball","kite","bag"]}],"example":"What colour is the ball?"},
{"id":"toys","volume":"g4a","unit":"g4a-u05","title":"描述玩具","zh":"它有……","rule":"It has + 名词短语。","parts":["It has ","","."],"slots":[{"label":"特征","choices":["long arms","big eyes","small ears"]}],"example":"It has long arms."},
{"id":"whose","volume":"g4a","unit":"g4a-u08","title":"询问衣物归属","zh":"这是谁的……？","rule":"Whose + 衣物 + is this?","parts":["Whose ",""," is this?"],"slots":[{"label":"衣物","choices":["coat","shirt","cap"]}],"example":"Whose coat is this?"}
]
const props=defineProps<{volume:string;unit:string}>()
const filtered=computed(()=>patterns.filter(p=>(props.volume==='all'||p.volume===props.volume)&&(props.unit==='all'||p.unit===props.unit)))
const selected=ref(0),values=ref<string[]>([]),activity=ref<'explore'|'challenge'|'match'|'transform'>('explore'),attempt=ref<string[]>([]),result=ref<'correct'|'wrong'|''>(''),showRule=ref(true)
const progress=ref<Record<string,boolean>>(loadProgress())
function loadProgress(){try{return JSON.parse(localStorage.getItem('lingualand-castle-progress')||'{}') as Record<string,boolean>}catch{return {}}}
const current=computed(()=>filtered.value[selected.value])
const sentence=computed(()=>current.value?current.value.parts.reduce((text,part,i)=>text+part+(values.value[i]||''),''):'')
const target=computed(()=>current.value?current.value.parts.reduce((text,part,i)=>text+part+(current.value!.slots[i]?.choices[0]||''),''):'')
const words=computed(()=>target.value.match(/[A-Za-z]+(?:'[A-Za-z]+)?|[?.!]/g)||[])
const pool=computed(()=>words.value.map((word,i)=>({word,id:i})).sort((a,b)=>b.id-a.id))
const correct=computed(()=>Object.keys(progress.value).filter(id=>progress.value[id]).length)
const matchChoice=ref('')
const transformChoice=ref('')
const qaItems=[
{q:'What is your name?',a:'My name is Amy.',wrong:['I am seven.','It is Monday.']},
{q:'Are you Su Hai?',a:'Yes, I am.',wrong:['Yes, he is.','Yes, I do.']},
{q:'Is he your grandpa?',a:'Yes, he is.',wrong:['Yes, I am.','Yes, it is.']},
{q:'Can you sing?',a:'Yes, I can.',wrong:['Yes, I do.','Yes, he is.']},
{q:'Would you like an apple?',a:'Yes, please.',wrong:['It is red.','I am Amy.']},
{q:'What colour is the ball?',a:'It is red.',wrong:['It is Monday.','I like English.']},
{q:'What subject do you like best?',a:'I like Science best.',wrong:['It is sunny.','I am seven.']},
{q:'What time do you get up?',a:"I get up at seven o'clock.",wrong:['It is Wednesday.','I like PE.']},
{q:'What day is it today?',a:'It is Wednesday.',wrong:['It is sunny.','I am Amy.']},
{q:'Do you like basketball?',a:'Yes, I do.',wrong:['Yes, I can.','Yes, he is.']},
{q:"What's the weather like today?",a:'It is cloudy.',wrong:['It is Friday.','It is my coat.']},
{q:"What's your favourite season?",a:'I like spring.',wrong:['I like Science.','It is my bag.']},
{q:'Whose coat is this?',a:"It is my brother's.",wrong:['It is sunny.','I am Amy.']}
]
const qa=computed(()=>qaItems.find(item=>item.q.toLowerCase().includes(current.value?.example.toLowerCase().replace(/[?.!]$/,'')||'___'))||qaItems.find(item=>item.q.toLowerCase().includes(current.value?.title.toLowerCase()||'___'))||qaItems[patterns.findIndex(p=>p.id===current.value?.id)%qaItems.length]!)
const transformItems=[
{from:'I like apples.',to:"I don't like apples.",wrong:['I not like apples.','I no like apples.'],hint:"一般现在时：I don't + 动词原形"},
{from:'I am Amy.',to:'I am not Amy.',wrong:["I don't am Amy.",'I no Amy.'],hint:'be 动词 am 后面加 not'},
{from:'He is my grandpa.',to:'He is not my grandpa.',wrong:["He don't my grandpa.",'He not is my grandpa.'],hint:'be 动词 is 后面加 not'},
{from:'I can sing.',to:"I can't sing.",wrong:["I don't can sing.",'I no can sing.'],hint:'情态动词 can 的否定是 cannot / can’t'},
{from:'It is sunny.',to:'It is not sunny.',wrong:["It don't sunny.",'It no sunny.'],hint:'be 动词 is 后面加 not'},
{from:'I have a pen.',to:"I don't have a pen.",wrong:["I haven't a pen.",'I no have a pen.'],hint:"一般现在时：I don't + 动词原形"}
]
const transformItem=computed(()=>transformItems[Math.max(0,patterns.findIndex(p=>p.id===current.value?.id))%transformItems.length]!)
const matchOptions=computed(()=>[qa.value.wrong[0],qa.value.a,qa.value.wrong[1]])
const transformOptions=computed(()=>[transformItem.value.wrong[0],transformItem.value.to,transformItem.value.wrong[1]])

function reset(){values.value=current.value?.slots.map(s=>s.choices[0]!)||[];attempt.value=[];matchChoice.value='';transformChoice.value='';result.value=''}
watch([filtered,selected],reset,{immediate:true})
function next(d:number){if(!filtered.value.length)return;selected.value=(selected.value+d+filtered.value.length)%filtered.value.length;reset()}
function choose(slot:number,value:string){values.value=[...values.value];values.value[slot]=value;result.value=''}
function addToken(id:number){if(attempt.value.includes(String(id)))return;attempt.value=[...attempt.value,String(id)];result.value=''}
function check(){if(!current.value)return;const expected=words.value.map((_,i)=>String(i));result.value=activity.value==='challenge'?(attempt.value.join(',')===expected.join(',')?'correct':'wrong'):activity.value==='match'?(matchChoice.value===qa.value.a?'correct':'wrong'):activity.value==='transform'?(transformChoice.value===transformItem.value.to?'correct':'wrong'):(sentence.value.trim()?'correct':'wrong');if(result.value==='correct'&&activity.value!=='explore'){progress.value={...progress.value,[current.value.id]:true};localStorage.setItem('lingualand-castle-progress',JSON.stringify(progress.value))}}
const speechStatus=ref('idle')
const speechMessage=ref('')
function speak(text:string){
  if(!('speechSynthesis' in window)||!('SpeechSynthesisUtterance' in window)){speechStatus.value='error';speechMessage.value='当前浏览器不支持语音朗读';return}
  if(!text.trim()){speechStatus.value='error';speechMessage.value='没有可朗读的内容';return}
  const synth=window.speechSynthesis
  synth.cancel()
  const utterance=new SpeechSynthesisUtterance(text.trim())
  utterance.lang='en-US'
  utterance.rate=.82
  utterance.onstart=()=>{speechStatus.value='speaking';speechMessage.value='正在朗读…'}
  utterance.onend=()=>{speechStatus.value='idle';speechMessage.value='朗读完成'}
  utterance.onerror=(event)=>{if(event.error==='canceled'||event.error==='interrupted')return;speechStatus.value='error';speechMessage.value='播放失败：'+event.error}
  speechStatus.value='idle'
  speechMessage.value='正在启动语音…'
  try{synth.speak(utterance);if(synth.paused)synth.resume()}catch{speechStatus.value='error';speechMessage.value='无法启动语音服务'}
}
</script>
<template>
<div class="castle">
<div class="castle-intro"><div><small>THE SENTENCE CASTLE</small><h3>句式城堡 · 造句实验室</h3><p>理解结构、替换词块、排列句子，逐步掌握英语表达。</p></div><div class="castle-stars">✦ {{correct}} / {{patterns.length}} <span>句型已掌握</span></div></div>
<div v-if="current" class="castle-body"><div class="castle-patterns"><button v-for="(p,i) in filtered" :key="p.id" :class="{chosen:i===selected,done:progress[p.id]}" @click="selected=i">{{progress[p.id]?'✓':'◇'}} {{p.title}}</button></div>
<div class="castle-main"><div class="castle-top"><span>{{current.volume==='g3a'?'三年级上册':current.volume==='g3b'?'三年级下册':'四年级上册'}} · {{current.unit.split('-').slice(-1)[0]?.toUpperCase()}}</span><span>{{selected+1}} / {{filtered.length}}</span></div><div class="castle-switch"><button :class="{chosen:activity==='explore'}" @click="activity='explore';result=''">词块替换</button><button :class="{chosen:activity==='challenge'}" @click="activity='challenge';result='';attempt=[]">组句挑战</button><button :class="{chosen:activity==='match'}" @click="activity='match';result=''">问答配对</button><button :class="{chosen:activity==='transform'}" @click="activity='transform';result=''">肯否转换</button></div><p class="castle-meaning">{{current.zh}}</p>
<template v-if="activity==='explore'"><div class="castle-sentence" aria-live="polite">{{sentence}}</div><div class="castle-slots"><fieldset v-for="(slot,i) in current.slots" :key="i"><legend>{{slot.label}}</legend><button v-for="choice in slot.choices" :key="choice" :class="{chosen:values[i]===choice}" @click="choose(i,choice)">{{choice}}</button></fieldset></div></template>
<template v-else-if="activity==='challenge'"><p class="castle-task">按正确顺序点击词块，拼出下面的句子。</p><div class="castle-assembled" aria-live="polite">{{attempt.map(id=>words[Number(id)]).join(' ')||'点击下方词块开始组句'}}</div><div class="castle-tokens"><button v-for="token in pool" :key="token.id" :disabled="attempt.includes(String(token.id))" @click="addToken(token.id)">{{token.word}}</button></div><button class="secondary" @click="attempt=[];result=''">↺ 重新排列</button></template>
<template v-else-if="activity==='match'"><p class="castle-task">选择与问题匹配的回答</p><div class="castle-sentence">{{qa.q}}</div><div class="castle-options"><button v-for="option in matchOptions" :key="option" :class="{chosen:matchChoice===option}" @click="matchChoice=option;result=''">{{option}}</button></div></template>
<template v-else><p class="castle-task">将下面的肯定句改成否定句</p><div class="castle-sentence">{{transformItem.from}}</div><div class="castle-options"><button v-for="option in transformOptions" :key="option" :class="{chosen:transformChoice===option}" @click="transformChoice=option;result=''">{{option}}</button></div><p class="castle-task">提示：{{transformItem.hint}}</p></template>
<div class="castle-actions"><button class="secondary" @click="showRule=!showRule">{{showRule?'收起':'查看'}}句型结构</button><button type="button" class="secondary" @click.stop="speak(activity==='explore'?sentence:activity==='match'?qa.q:activity==='transform'?transformItem.from:target)">🔊 {{speechStatus==='speaking'?'朗读中…':'听发音'}}</button><button class="primary" @click="check">检查答案</button></div>
<p v-if="speechMessage" class="castle-speech-status" :class="{error:speechStatus==='error'}" role="status">{{speechMessage}}</p><div v-if="showRule" class="castle-rule"><strong>结构解析</strong><p>{{current.rule}}</p><small>示范：{{current.example}}</small></div>
<p v-if="result" class="castle-result" :class="result" role="status">{{result==='correct'?(activity!=='explore'?'回答正确！已记录学习进度。':'句子生成成功！可以换一个词块，继续尝试。'):activity==='challenge'?'顺序还不对，可以清空后重新试试。':'再想一想，选择正确答案。':'请先完成词块选择。'}}</p><div class="castle-footer"><button class="secondary" @click="next(-1)">← 上一句型</button><button class="primary" @click="next(1)">下一句型 →</button></div>
</div></div><div v-else class="castle-empty">当前单元暂无句式实验。请选择其他单元或切换为“全部单元”。</div>
<p class="castle-source">本模块为依据三册教材单元主题、已有词汇及原创练习整理的教学设计，句型模板、替换词块和组句挑战属于原创配套内容，并非逐字摘录教材。组句挑战采用示范句作为固定标准答案。</p>
</div>
</template>
<style scoped>
.castle{margin:16px 0 24px}.castle-intro{background:linear-gradient(110deg,#e6e8ff,#fef1d8);border:1px solid #e7e5ee;border-radius:22px;padding:22px;display:flex;justify-content:space-between;align-items:center;gap:14px}.castle-intro small{color:#7772ad;font-weight:900;letter-spacing:2px}.castle-intro h3{font-size:24px;margin:6px 0;color:#5c5489}.castle-intro p{color:#807b98;font-size:13px}.castle-stars{font-weight:900;color:#9d7b41;white-space:nowrap}.castle-stars span{display:block;font-size:11px;color:#9c8d75}.castle-body{display:grid;grid-template-columns:minmax(180px,240px) minmax(0,1fr);gap:16px;margin-top:17px}.castle-patterns{display:flex;flex-direction:column;gap:7px;max-height:660px;overflow:auto}.castle-patterns button{text-align:left;border:1px solid #e3e4ee;background:#fff;border-radius:12px;padding:12px;color:#746b93;font-weight:800}.castle-patterns button.chosen{background:#ecebff;border-color:#a9a1e0;color:#514a91}.castle-patterns button.done:not(.chosen){color:#4b956d}.castle-main{min-width:0;border:1px solid #e3e4ef;border-radius:22px;background:#fff;padding:23px;box-shadow:0 12px 34px #655ca30c}.castle-top,.castle-footer{display:flex;justify-content:space-between;gap:12px;color:#8d8aab;font-size:12px}.castle-switch{display:flex;gap:8px;margin:18px 0}.castle-switch button{border:1px solid #d9d8ee;border-radius:99px;background:#fff;padding:10px 15px;color:#756e9c;font-weight:800}.castle-switch button.chosen{background:#6860a8;color:white}.castle-meaning{font-size:13px;color:#8885a6}.castle-sentence,.castle-assembled{display:flex;align-items:center;justify-content:center;min-height:105px;background:linear-gradient(120deg,#f3f0ff,#fff9e9);border-radius:16px;padding:18px;margin:14px 0 22px;text-align:center;color:#504c86;font-size:clamp(20px,3vw,29px);font-weight:900;line-height:1.5;overflow-wrap:anywhere}.castle-slots{display:flex;flex-wrap:wrap;gap:12px}.castle-slots fieldset{min-width:0;flex:1 1 220px;border:1px solid #e6e2f2;border-radius:14px;padding:12px}.castle-slots legend{color:#857ba5;font-size:12px;font-weight:900;padding:0 5px}.castle-slots button,.castle-tokens button{border:1px solid #ddd9ef;border-radius:10px;padding:10px 13px;background:#fff;color:#665b91;margin:3px;font-weight:800}.castle-slots button.chosen{background:#e7e3ff;border-color:#8d80d3}.castle-tokens{display:flex;flex-wrap:wrap;gap:7px;margin:15px 0}.castle-tokens button:disabled{opacity:.3}.castle-task{font-size:13px;color:#8d83a6}.castle-actions{display:flex;flex-wrap:wrap;gap:9px;margin:20px 0}.castle-rule{background:#f7f7ff;border-left:4px solid #9990d3;border-radius:12px;padding:14px 17px;color:#666184}.castle-rule p{margin:8px 0}.castle-rule small{color:#8d86a4}.castle-result{padding:12px 15px;border-radius:12px;font-weight:800}.castle-result.correct{background:#e6f7ed;color:#3c8c63}.castle-result.wrong{background:#fff0e5;color:#ae7751}.castle-footer{margin-top:22px}.castle-speech-status{font-size:12px;color:#6b8d78;margin:8px 0}.castle-speech-status.error{color:#b26951}.castle-actions button{position:relative;z-index:1;pointer-events:auto;touch-action:manipulation}.castle-options{display:grid;gap:10px;margin:18px 0}.castle-options button{border:1px solid #ddd9ef;background:white;border-radius:12px;padding:13px;text-align:left;color:#615a8b;font-weight:800}.castle-options button.chosen{background:#e7e3ff;border-color:#8d80d3}.castle-switch{flex-wrap:wrap}.castle-source{font-size:11px;color:#8f9a94;margin:17px 3px}.castle-empty{padding:35px;text-align:center;color:#8d84a2}@media(max-width:760px){.castle-body{grid-template-columns:1fr}.castle-patterns{flex-direction:row;overflow:auto;max-height:none}.castle-patterns button{white-space:nowrap}.castle-intro{align-items:flex-start;flex-direction:column}.castle-main{padding:16px}}
</style>