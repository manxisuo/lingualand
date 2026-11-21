export type Card={id:string;word:string;meaning:string;emoji:string;example:string;category?:'word'|'expression'}
export type Question={id:string;kind:'choice'|'spell'|'order'|'phrase';prompt:string;answer:string;options?:string[];tokens?:string[];hint?:string}
export const course={edition:'译林版方向 · 原创示范',grade:3,term:'上册',unit:'示范单元 · My Happy Day',
cards:[
{id:'hello',word:'hello',meaning:'你好',emoji:'👋',example:'Hello, my friend!'},
{id:'morning',word:'morning',meaning:'早晨',emoji:'🌅',example:'Good morning!'},
{id:'school',word:'school',meaning:'学校',emoji:'🏫',example:'I go to school.'},
{id:'friend',word:'friend',meaning:'朋友',emoji:'🧑‍🤝‍🧑',example:'You are my friend.'},
{id:'book',word:'book',meaning:'书',emoji:'📚',example:'This is my book.'},
{id:'happy',word:'happy',meaning:'开心的',emoji:'😊',example:'I am happy.'},
{id:'teacher',word:'teacher',meaning:'老师',emoji:'👩‍🏫',example:'My teacher is kind.'},
{id:'goodbye',word:'goodbye',meaning:'再见',emoji:'👋',example:'Goodbye, see you!'}
] as Card[],
questions:[
{id:'q1',kind:'choice',prompt:'“朋友”用英语怎么说？',answer:'friend',options:['teacher','friend','school','book'],hint:'想想一起玩耍的伙伴。'},
{id:'q2',kind:'choice',prompt:'Which word means “学校”?',answer:'school',options:['happy','hello','school','morning']},
{id:'q3',kind:'spell',prompt:'拼写“早晨”的英语单词',answer:'morning',hint:'以 m 开头，共 7 个字母。'},
{id:'q4',kind:'phrase',prompt:'选出“早上好”的正确表达',answer:'Good morning',options:['Goodbye','Good morning','My book','My friend']},
{id:'q5',kind:'order',prompt:'排列词块：这是我的书。',answer:'This is my book.',tokens:['my','book.','This','is']},
{id:'q6',kind:'choice',prompt:'“happy”是什么意思？',answer:'开心的',options:['伤心的','开心的','疲倦的','安静的']},
{id:'q7',kind:'spell',prompt:'拼写“老师”的英语单词',answer:'teacher'},
{id:'q8',kind:'order',prompt:'排列词块：我去上学。',answer:'I go to school.',tokens:['school.','go','I','to']}
] as Question[]}
