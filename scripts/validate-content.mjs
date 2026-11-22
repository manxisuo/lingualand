import {readFileSync} from 'node:fs'
const root=new URL('../src/content/',import.meta.url)
const units=JSON.parse(readFileSync(new URL('2024-g3a-verified.json',root),'utf8'))
const errors=[]
if(units.length!==8)errors.push('Expected 8 first-semester units')
const ids=new Set()
for(const u of units){
 if(!u.id||!u.title||!u.objectives?.length||!u.letters)errors.push('Missing metadata: '+u.id)
 if(!u.cards?.length||!u.questions?.length)errors.push('Empty unit: '+u.id)
 for(const c of u.cards){if(ids.has(c.id))errors.push('Duplicate card ID '+c.id);ids.add(c.id);if(!c.word||!c.meaning||!c.source?.verified)errors.push('Invalid card '+c.id)}
 for(const q of u.questions){if(ids.has(q.id))errors.push('Duplicate question ID '+q.id);ids.add(q.id);if(!q.answer||!q.prompt)errors.push('Invalid question '+q.id);if((q.kind==='choice'||q.kind==='phrase')&&(!q.options?.includes(q.answer)||new Set(q.options).size!==q.options.length||q.options.length!==4))errors.push('Invalid options '+q.id);if(q.kind==='choice'&&q.distractorStrategy&&q.options?.some((o,i)=>q.options.findIndex(x=>x.toLowerCase().trim()===o.toLowerCase().trim())!==i))errors.push('Duplicate normalized option '+q.id);if(q.kind==='order'&&q.tokens?.join(' ')===q.answer)errors.push('Unshuffled order '+q.id);if(q.kind==='order'&&q.tokens?.slice().sort().join('|')!==q.answer.split(' ').sort().join('|'))errors.push('Order tokens mismatch '+q.id)}
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('V2.1.1 textbook word-list validation passed:',units.length,'units,',units.reduce((n,u)=>n+u.cards.length,0),'cards,',units.reduce((n,u)=>n+u.questions.length,0),'questions')

const wl=JSON.parse(readFileSync(new URL('2024-g3a-wordlist.json',root),'utf8'))
for(const [i,u] of units.entries()){const entries=wl.units[i]?.entries||[];if(u.cards.length!==entries.length)throw Error('Incomplete word list '+u.id);for(const e of entries){if(!u.cards.some(c=>c.word===e.term&&c.source.bookPage===e.printedPage))throw Error('Word-list mismatch: '+e.term)}}
console.log('Verified textbook entries:',wl.units.reduce((n,u)=>n+u.entries.length,0))

for(const u of units){for(const q of u.questions.filter(q=>q.kind==='choice')){if(!q.distractorStrategy)throw Error('Missing curated distractors '+q.id)}}
console.log('Curated multiple-choice distractors:',units.reduce((n,u)=>n+u.questions.filter(q=>q.kind==='choice').length,0))

const spring=JSON.parse(readFileSync(new URL('2025-g3b-verified.json',root),'utf8'))
const springList=JSON.parse(readFileSync(new URL('2025-g3b-wordlist.json',root),'utf8'))
if(spring.length!==8||springList.units.length!==8)throw Error('Spring semester must contain eight units')
const seenSpring=new Set()
for(const [i,u] of spring.entries()){
 const entries=springList.units[i].entries
 if(u.cards.length!==entries.length)throw Error('Incomplete spring vocabulary: '+u.id)
 if(!u.questions.length)throw Error('Missing spring practice: '+u.id)
 for(const entry of entries){
  const card=u.cards.find(c=>c.word===entry.term&&c.source?.bookPage===entry.printedPage&&c.meaning===entry.meaning)
  if(!card)throw Error('Unmatched textbook word: '+entry.id)
  if(seenSpring.has(entry.id))throw Error('Duplicate spring entry: '+entry.id)
  seenSpring.add(entry.id)
 }
 for(const q of u.questions){
  if(!q.answer||!q.prompt)throw Error('Incomplete spring question: '+q.id)
  if(q.kind==='choice'&&(!q.options?.includes(q.answer)||q.options.length!==4||new Set(q.options).size!==4))throw Error('Invalid spring options: '+q.id)
 }
}
console.log('Spring 2025 textbook validation passed:',spring.length,'units,',seenSpring.size,'word-list entries,',spring.reduce((n,u)=>n+u.questions.length,0),'original questions')
