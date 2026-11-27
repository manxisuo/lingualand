import {type Card,type Question} from './data'
import manifest from './content/2024-g3-manifest.json'
import verifiedG3a from './content/2024-g3a-verified.json'
import verifiedG3b from './content/2025-g3b-verified.json'
import verifiedG4a from './content/2025-g4a-verified.json'
import newWordlists from './content/g4b-g5a-wordlist.json'
export type Unit={id:string;title:string;description:string;cards:Card[];questions:Question[];status?:string;letters?:string;objectives?:string[];phrases?:{english:string;meaning:string;origin?:string}[];dialogues?:{lines:string[];origin?:string}[]}
export type Volume={id:string;grade:number;term:'上册'|'下册';units:Unit[]}
export type Curriculum={id:string;name:string;volumes:Volume[]}
// Original vocabulary practice derived from the transcribed textbook lists.
const newUnits:Unit[]=newWordlists.map(u=>({
 ...u,
 cards:u.cards as Card[],
 objectives:['理解本单元词汇及常用表达','在语境中识别并运用本单元词汇'],
 questions:u.cards.flatMap((c):Question[]=>{
  const distractors=[...new Set(u.cards.filter(x=>x.meaning!==c.meaning).map(x=>x.meaning))].slice(0,3)
  return [{id:c.id+'-meaning',kind:'choice',prompt:'“'+c.word+'”是什么意思？',answer:c.meaning,options:[c.meaning,...distractors]},...(/^[a-z]+$/i.test(c.word)?[{id:c.id+'-spell',kind:'spell' as const,prompt:'拼写：'+c.meaning,answer:c.word}]:[])]
 })
}))
const contentUnits:Unit[]=[...verifiedG3a,...verifiedG3b,...verifiedG4a].map(u=>({...u,cards:u.cards as Card[],questions:u.questions.map(q=>({...q,kind:q.kind as Question['kind']}))}))
contentUnits.push(...newUnits)
const byId=(id:string)=>{const u=contentUnits.find(u=>u.id===id);if(!u)throw new Error('Missing content unit: '+id);return u}
export const curricula:Curriculum[]=[{id:'yilin-2024',name:'译林版小学英语 · 2024修订版（原创配套练习）',volumes:[...manifest.volumes.map(v=>({id:v.id,grade:v.grade,term:v.term as Volume['term'],units:v.units.map(u=>byId(u.id))})),{id:'g4a',grade:4,term:'上册' as const,units:Array.from({length:8},(_,i)=>byId('g4a-u'+String(i+1).padStart(2,'0')))},...([{id:'g4b',grade:4,term:'下册'},{id:'g5a',grade:5,term:'上册'}] as const).map(v=>({...v,units:newUnits.filter(u=>u.id.startsWith(v.id+'-'))}))]}]
export const defaultUnitId='happy-day'
export const initialUnitId='g3a-u01'
export const allUnits=()=>curricula.flatMap(c=>c.volumes.flatMap(v=>v.units.map(unit=>({curriculum:c,volume:v,unit}))))
export const findUnit=(id:string)=>allUnits().find(x=>x.unit.id===id)||allUnits()[0]
