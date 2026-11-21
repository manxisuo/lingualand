import type {Question} from './data'
export type ReviewRecord={repetitions:number;intervalDays:number;ease:number;dueAt:number;lastAt:number;lapses:number}
export type ReviewStore=Record<string,ReviewRecord>
export const reviewKey='lingualand-review-v1'
const day=86400000
export function loadReviews():ReviewStore{try{const value=JSON.parse(localStorage.getItem(reviewKey)||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{} }catch{return {}}}
export function schedule(previous:ReviewRecord|undefined,correct:boolean,now=Date.now()):ReviewRecord{
 const old=previous||{repetitions:0,intervalDays:0,ease:2.5,dueAt:now,lastAt:0,lapses:0}
 const repetitions=correct?old.repetitions+1:0
 const intervalDays=correct?(repetitions===1?1:repetitions===2?3:Math.max(1,Math.round(old.intervalDays*old.ease))):0
 const ease=Math.max(1.3,Math.min(3,old.ease+(correct ? 0.1 : -0.2)))
 return {repetitions,intervalDays,ease,dueAt:now+(correct?intervalDays*day:0),lastAt:now,lapses:old.lapses+(correct?0:1)}
}
export function dueQuestions(questions:Question[],unitId:string,reviews:ReviewStore,results:Record<string,{correct:boolean;attempts:number}>,now=Date.now()){
 return questions.filter(q=>{const id=unitId==='happy-day'?q.id:unitId+':'+q.id;const r=reviews[id];if(r)return r.dueAt<=now;const legacy=results[id];return Boolean(legacy&&!legacy.correct)})
}
export function reviewedCount(reviews:ReviewStore,unitId:string){return Object.keys(reviews).filter(k=>unitId==='happy-day'?!k.includes(':'):k.startsWith(unitId+':')).length}
