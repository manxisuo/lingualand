import {course,type Card,type Question} from './data'
export type Unit={id:string;title:string;description:string;cards:Card[];questions:Question[]}
export type Volume={id:string;grade:number;term:'上册'|'下册';units:Unit[]}
export type Curriculum={id:string;name:string;volumes:Volume[]}
const original:Unit={id:'happy-day',title:'My Happy Day',description:'问候与校园生活',cards:course.cards,questions:course.questions}
const friends:Unit={id:'new-friends',title:'New Friends',description:'介绍自己、认识朋友',cards:[
{id:'name',word:'name',meaning:'名字',emoji:'🏷️',example:'My name is Lily.'},
{id:'nice',word:'nice',meaning:'美好的',emoji:'🌷',example:'Nice to meet you.'},
{id:'meet',word:'meet',meaning:'遇见',emoji:'🤝',example:'Nice to meet you.'}
],questions:[
{id:'nf1',kind:'choice',prompt:'“名字”用英语怎么说？',answer:'name',options:['meet','nice','name','friend']},
{id:'nf2',kind:'spell',prompt:'拼写“遇见”',answer:'meet'},
{id:'nf3',kind:'phrase',prompt:'初次见面怎么说？',answer:'Nice to meet you',options:['Good night','Nice to meet you','Goodbye','Thank you']}
]}
const things:Unit={id:'everyday-things',title:'Everyday Things',description:'日常物品和简单表达',cards:[
{id:'pen',word:'pen',meaning:'钢笔',emoji:'🖊️',example:'This is my pen.'},
{id:'bag',word:'bag',meaning:'书包',emoji:'🎒',example:'My bag is blue.'},
{id:'desk',word:'desk',meaning:'书桌',emoji:'🪑',example:'The book is on the desk.'}
],questions:[
{id:'et1',kind:'choice',prompt:'“书包”用英语怎么说？',answer:'bag',options:['pen','bag','desk','book']},
{id:'et2',kind:'spell',prompt:'拼写“钢笔”',answer:'pen'},
{id:'et3',kind:'order',prompt:'排列词块：这是我的钢笔。',answer:'This is my pen.',tokens:['pen.','my','This','is']}
]}
export const curricula:Curriculum[]=[{id:'yilin-demo',name:'译林版方向 · 原创示范',volumes:[{id:'g3a',grade:3,term:'上册',units:[original,friends]},{id:'g3b',grade:3,term:'下册',units:[things]}]}]
export const defaultUnitId='happy-day'
export const allUnits=()=>curricula.flatMap(c=>c.volumes.flatMap(v=>v.units.map(unit=>({curriculum:c,volume:v,unit}))))
export const findUnit=(id:string)=>allUnits().find(x=>x.unit.id===id)||allUnits()[0]
