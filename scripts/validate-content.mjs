import {readFileSync} from 'node:fs'
const root=new URL('../src/content/',import.meta.url)
const units=JSON.parse(readFileSync(new URL('2024-g3a-verified.json',root),'utf8'))
const errors=[]
if(units.length!==8)errors.push('Expected 8 first-semester units')
const ids=new Set()
for(const u of units){
 if(!u.id||!u.title||!u.objectives?.length||!u.letters)errors.push('Missing metadata: '+u.id)
 if(!u.cards?.length||!u.questions?.length)errors.push('Empty unit: '+u.id)
 for(const c of u.cards){if(ids.has(c.id))errors.push('Duplicate card ID '+c.id);ids.add(c.id);if(!c.word||!c.meaning||!c.example||!c.source?.verified)errors.push('Invalid card '+c.id)}
 for(const q of u.questions){if(ids.has(q.id))errors.push('Duplicate question ID '+q.id);ids.add(q.id);if(!q.answer||!q.prompt)errors.push('Invalid question '+q.id);if((q.kind==='choice'||q.kind==='phrase')&&(!q.options?.includes(q.answer)||new Set(q.options).size!==q.options.length))errors.push('Invalid options '+q.id);if(q.kind==='order'&&q.tokens?.join(' ')===q.answer)errors.push('Unshuffled order '+q.id);if(q.kind==='order'&&q.tokens?.slice().sort().join('|')!==q.answer.split(' ').sort().join('|'))errors.push('Order tokens mismatch '+q.id)}
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('V2.1 content validation passed:',units.length,'units,',units.reduce((n,u)=>n+u.cards.length,0),'cards,',units.reduce((n,u)=>n+u.questions.length,0),'questions')
