export type Rule={word:string;meaning:string;example:string;translation:string;unit:string;group:string}
export type TopicQuestion={id:string;prompt:string;answer:string;options:string[];hint:string;rule:number}
export type Topic={id:string;title:string;english:string;description:string;rules:Rule[];questions:TopicQuestion[];demo?:'prepositions'}
export const topics:Topic[]=[{
  "id": "prepositions",
  "title": "介词王国",
  "english": "Prepositions",
  "description": "从空间、时间到常用搭配，理解小小介词的大作用。",
  "demo": "prepositions",
  "rules": [
    {
      "word": "in",
      "meaning": "在……里面",
      "example": "The ruler is in the schoolbag.",
      "translation": "尺子在书包里。",
      "unit": "g3b-u01",
      "group": "space"
    },
    {
      "word": "on",
      "meaning": "在……上面",
      "example": "The pen is on the desk.",
      "translation": "钢笔在桌上。",
      "unit": "g3b-u03",
      "group": "space"
    },
    {
      "word": "under",
      "meaning": "在……下面",
      "example": "The duck is under the tree.",
      "translation": "鸭子在树下。",
      "unit": "g3b-u04",
      "group": "space"
    },
    {
      "word": "behind",
      "meaning": "在……后面",
      "example": "The cat is behind the tree.",
      "translation": "猫在树后。",
      "unit": "g3b-u04",
      "group": "space"
    },
    {
      "word": "by",
      "meaning": "在……旁边",
      "example": "The cat is by the tree.",
      "translation": "猫在树旁。",
      "unit": "g3b-u04",
      "group": "space"
    },
    {
      "word": "at",
      "meaning": "在具体时刻",
      "example": "I get up at seven.",
      "translation": "我七点起床。",
      "unit": "g4a-u02",
      "group": "time"
    },
    {
      "word": "on",
      "meaning": "在星期几",
      "example": "I play football on Saturday.",
      "translation": "我星期六踢足球。",
      "unit": "g4a-u03",
      "group": "time"
    },
    {
      "word": "in",
      "meaning": "在某个季节",
      "example": "I go skating in winter.",
      "translation": "我冬天滑冰。",
      "unit": "g4a-u07",
      "group": "time"
    },
    {
      "word": "after",
      "meaning": "在……之后",
      "example": "Let's play after class.",
      "translation": "我们课后玩吧。",
      "unit": "g3b-u04",
      "group": "time"
    },
    {
      "word": "at",
      "meaning": "固定搭配：look at",
      "example": "Look at the panda!",
      "translation": "看看熊猫！",
      "unit": "g3b-u07",
      "group": "phrase"
    },
    {
      "word": "to",
      "meaning": "固定搭配：welcome to",
      "example": "Welcome to my farm!",
      "translation": "欢迎来到我的农场！",
      "unit": "g3b-u06",
      "group": "phrase"
    },
    {
      "word": "for",
      "meaning": "固定搭配：time for",
      "example": "It's time for dinner.",
      "translation": "该吃晚饭了。",
      "unit": "g4a-u02",
      "group": "phrase"
    }
  ],
  "questions": [
    {
      "id": "prep-1",
      "prompt": "The ruler is ___ the schoolbag.",
      "answer": "in",
      "options": [
        "in",
        "on",
        "under"
      ],
      "hint": "尺子在书包里面。",
      "rule": 0
    },
    {
      "id": "prep-2",
      "prompt": "The pen is ___ the desk.",
      "answer": "on",
      "options": [
        "on",
        "in",
        "behind"
      ],
      "hint": "钢笔在桌面上。",
      "rule": 1
    },
    {
      "id": "prep-3",
      "prompt": "The duck is ___ the tree.",
      "answer": "under",
      "options": [
        "under",
        "on",
        "in"
      ],
      "hint": "鸭子在树下。",
      "rule": 2
    },
    {
      "id": "prep-4",
      "prompt": "The cat is ___ the tree.",
      "answer": "behind",
      "options": [
        "behind",
        "on",
        "in"
      ],
      "hint": "猫在树后。",
      "rule": 3
    },
    {
      "id": "prep-5",
      "prompt": "The cat is ___ the tree.",
      "answer": "by",
      "options": [
        "by",
        "under",
        "in"
      ],
      "hint": "猫在树旁。",
      "rule": 4
    },
    {
      "id": "prep-6",
      "prompt": "I get up ___ seven.",
      "answer": "at",
      "options": [
        "at",
        "on",
        "in"
      ],
      "hint": "我七点起床。",
      "rule": 5
    },
    {
      "id": "prep-7",
      "prompt": "I play football ___ Saturday.",
      "answer": "on",
      "options": [
        "on",
        "at",
        "in"
      ],
      "hint": "我星期六踢足球。",
      "rule": 6
    },
    {
      "id": "prep-8",
      "prompt": "I go skating ___ winter.",
      "answer": "in",
      "options": [
        "in",
        "on",
        "at"
      ],
      "hint": "我冬天滑冰。",
      "rule": 7
    },
    {
      "id": "prep-9",
      "prompt": "Let's play ___ class.",
      "answer": "after",
      "options": [
        "after",
        "on",
        "in"
      ],
      "hint": "我们课后玩吧。",
      "rule": 8
    },
    {
      "id": "prep-10",
      "prompt": "Look ___ the panda!",
      "answer": "at",
      "options": [
        "at",
        "to",
        "for"
      ],
      "hint": "看看熊猫！",
      "rule": 9
    },
    {
      "id": "prep-11",
      "prompt": "Welcome ___ my farm!",
      "answer": "to",
      "options": [
        "to",
        "at",
        "for"
      ],
      "hint": "欢迎来到我的农场！",
      "rule": 10
    },
    {
      "id": "prep-12",
      "prompt": "It's time ___ dinner.",
      "answer": "for",
      "options": [
        "for",
        "at",
        "on"
      ],
      "hint": "该吃晚饭了。",
      "rule": 11
    }
  ]
}]
