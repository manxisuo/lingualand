import {type Card,type Question} from './data'
import manifest from './content/2024-g3-manifest.json'
import verifiedG3a from './content/2024-g3a-verified.json'
import verifiedG3b from './content/2025-g3b-verified.json'
import verifiedG4a from './content/2025-g4a-verified.json'
import newWordlists from './content/g4b-g5a-wordlist.json'
export type Unit={id:string;title:string;description:string;cards:Card[];questions:Question[];status?:string;letters?:string;objectives?:string[];phrases?:{english:string;meaning:string;origin?:string}[];dialogues?:{lines:string[];origin?:string}[]}
export type Volume={id:string;grade:number;term:'上册'|'下册';units:Unit[]}
export type Curriculum={id:string;name:string;volumes:Volume[]}
// Original examples aligned with the inspected Unit 1 textbook pages.
const unitSupplements:Record<string, {objectives:string[];phrases:NonNullable<Unit['phrases']>;dialogues:NonNullable<Unit['dialogues']>;questions:Question[]}>=Object.fromEntries([
 ['g4b-u01', ['谈论朋友之间的互助','描述某处有什么','谈论快乐的一天'], [['share ... with ...','与……分享'],['there are','有（复数）'],['thank you for ...','感谢……']], ['There are some apples on the table.','Let us share them with our friends.'], [['There are two rabbits in the garden.','花园里有两只兔子。'],['There is a cat under the tree.','树下有一只猫。'],['I want to help my friends.','我想帮助我的朋友。'],['We share our fruit with them.','我们与他们分享水果。'],['Thank you for the apples.','谢谢你的苹果。']], ['There are ___ oranges.','some','a','an']],
 ['g5a-u01', ['谈论良好习惯','描述日常行为','运用一般现在时描述他人的习惯'], [['keep ... tidy','保持……整洁'],['do exercise','锻炼'],['take notes','记笔记']], ['Does your room look tidy?','Yes. I clean it every day.'], [['She keeps her desk tidy.','她保持书桌整洁。'],['He never runs in class.','他从不在课堂上跑。'],['I do exercise every day.','我每天锻炼。'],['My sister often takes notes.','我的姐姐经常记笔记。'],['Tom listens carefully in class.','汤姆在课堂上认真听讲。']], ['She ___ her room every day.','cleans','clean','cleaning']],
["g4b-u02",["认识校园设施","询问校园里有什么","介绍楼层并帮助新同学"],[["computer room","电脑室"],["have a look","看一看"],["on the first floor","在一楼"],["show ... around","带……参观"]],["Is there a library in your school?","Yes, there is. It is on the second floor."],[["Is there a swing in the playground?","操场上有秋千吗？"],["There are two computers in this room.","这个房间里有两台电脑。"],["The library is on the second floor.","图书馆在二楼。"],["Let me show you around our school.","让我带你参观我们的学校。"],["Are there any books on the desk?","书桌上有书吗？"]],["Are there ___ computers in the room?","any","a","an"]],
["g5a-u02",["描述情绪与感受","谈论擅长的活动","使用第三人称单数否定形式"],[["be good at","擅长"],["try hard","努力尝试"],["give up","放弃"],["feel excited","感到兴奋"]],["Why do you feel sad?","I am not good at the high jump.","You are good at football. Let's play!"],[["She does not feel happy today.","她今天感觉不开心。"],["He is good at football.","他擅长足球。"],["My friend never gives up.","我的朋友从不放弃。"],["She learns new words very fast.","她学新单词很快。"],["Tom does not understand this word.","汤姆不理解这个单词。"]],["He does not ___ happy today.","feel","feels","feeling"]]
].map(entry=>{
 const [id,objectives,phrases,lines,sentences,quiz]=entry as [string,string[],string[][],string[],string[][],string[]]
 return [id,{objectives,phrases:phrases.map(([english,meaning])=>({english,meaning,origin:'教材主题对齐'})),dialogues:[{lines,origin:'原创情景'}],questions:[{id:id+'-context-1',kind:'phrase' as const,prompt:quiz[0],answer:quiz[1],options:quiz.slice(1)},...sentences.map(([answer,zh],i)=>({id:id+'-order-'+(i+1),kind:'order' as const,prompt:'排列词块：'+zh,answer,tokens:answer.split(' ').reverse()}))]}]
}))
// Original vocabulary practice derived from the transcribed textbook lists.
const newUnits:Unit[]=newWordlists.map(u=>({
 ...u,
 cards:u.cards as Card[],
 objectives:unitSupplements[u.id]?.objectives??['理解本单元词汇及常用表达','在语境中识别并运用本单元词汇'],
 phrases:unitSupplements[u.id]?.phrases??[],
 dialogues:unitSupplements[u.id]?.dialogues??[],
 questions:[...(unitSupplements[u.id]?.questions??[]),...u.cards.flatMap((c):Question[]=>{
  const distractors=[...new Set(u.cards.filter(x=>x.meaning!==c.meaning).map(x=>x.meaning))].slice(0,3)
  return [{id:c.id+'-meaning',kind:'choice',prompt:'“'+c.word+'”是什么意思？',answer:c.meaning,options:[c.meaning,...distractors]},...(/^[a-z]+$/i.test(c.word)?[{id:c.id+'-spell',kind:'spell' as const,prompt:'拼写：'+c.meaning,answer:c.word}]:[])]
 })]
}))
const contentUnits:Unit[]=[...verifiedG3a,...verifiedG3b,...verifiedG4a].map(u=>({...u,cards:u.cards as Card[],questions:u.questions.map(q=>({...q,kind:q.kind as Question['kind']}))}))
contentUnits.push(...newUnits)
const byId=(id:string)=>{const u=contentUnits.find(u=>u.id===id);if(!u)throw new Error('Missing content unit: '+id);return u}
export const curricula:Curriculum[]=[{id:'yilin-2024',name:'译林版小学英语 · 2024修订版（原创配套练习）',volumes:[...manifest.volumes.map(v=>({id:v.id,grade:v.grade,term:v.term as Volume['term'],units:v.units.map(u=>byId(u.id))})),{id:'g4a',grade:4,term:'上册' as const,units:Array.from({length:8},(_,i)=>byId('g4a-u'+String(i+1).padStart(2,'0')))},...([{id:'g4b',grade:4,term:'下册'},{id:'g5a',grade:5,term:'上册'}] as const).map(v=>({...v,units:newUnits.filter(u=>u.id.startsWith(v.id+'-'))}))]}]
export const defaultUnitId='happy-day'
export const initialUnitId='g3a-u01'
export const allUnits=()=>curricula.flatMap(c=>c.volumes.flatMap(v=>v.units.map(unit=>({curriculum:c,volume:v,unit}))))
export const findUnit=(id:string)=>allUnits().find(x=>x.unit.id===id)||allUnits()[0]
