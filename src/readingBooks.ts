export type ReadingBook={id:string;volume:string;unit:string;unitTitle:string;title:string;zh:string;pages:string[][];words:Record<string,string>;questions:string[][]}
export const books:ReadingBook[]=[
  {
    "id": "hello",
    "volume": "g3a",
    "unit": "g3a-u01",
    "unitTitle": "Hello!",
    "title": "Hello, Little Fox!",
    "zh": "你好，小狐狸！",
    "pages": [
      [
        "Good morning! I am a cat.",
        "cat",
        "morning"
      ],
      [
        "Hello! I am a fox.",
        "fox",
        "morning"
      ],
      [
        "Hi, Cat! Hi, Fox!",
        "both",
        "garden"
      ],
      [
        "Good afternoon, Cat!",
        "both",
        "afternoon"
      ],
      [
        "Goodbye, Fox!",
        "both",
        "evening"
      ],
      [
        "Goodbye, Cat!",
        "fox",
        "evening"
      ]
    ],
    "words": {
      "Good morning": "早上好",
      "Good afternoon": "下午好",
      "hello": "你好",
      "cat": "猫",
      "goodbye": "再见",
      "fox": "狐狸"
    },
    "questions": [
      [
        "Who says “I am a cat”?",
        "Cat",
        "Fox",
        "A bird"
      ],
      [
        "What do they say in the afternoon?",
        "Good afternoon!",
        "Good morning!",
        "Good night!"
      ],
      [
        "What do they say at the end?",
        "Goodbye!",
        "Hello!",
        "Thank you!"
      ]
    ]
  },
  {
    "id": "fruit",
    "volume": "g3b",
    "unit": "g3b-u05",
    "unitTitle": "Fruit",
    "title": "A Salad for Two",
    "zh": "两个人的水果沙拉",
    "pages": [
      [
        "Cat has an apple and a banana.",
        "cat",
        "apple"
      ],
      [
        "Fox has an orange and some grapes.",
        "fox",
        "grapes"
      ],
      [
        "“I like apples,” says Fox.",
        "both",
        "apple"
      ],
      [
        "“I like grapes,” says Cat.",
        "both",
        "grapes"
      ],
      [
        "“Let's share!” says Fox. They make a fruit salad.",
        "both",
        "salad"
      ],
      [
        "The salad is sweet. They eat it together.",
        "both",
        "salad"
      ]
    ],
    "words": {
      "apple": "苹果",
      "banana": "香蕉",
      "orange": "橙子",
      "grapes": "葡萄",
      "share": "分享",
      "fruit salad": "水果沙拉",
      "sweet": "甜的",
      "like": "喜欢"
    },
    "questions": [
      [
        "What fruit does Cat have?",
        "An apple and a banana",
        "An orange and grapes",
        "Two mangoes"
      ],
      [
        "What do they make?",
        "A fruit salad",
        "A cake",
        "A sandwich"
      ],
      [
        "Why can they both enjoy the salad?",
        "They share their fruit.",
        "They hide the fruit.",
        "They buy a toy."
      ]
    ]
  },
  {
    "id": "day",
    "volume": "g4a",
    "unit": "g4a-u02",
    "unitTitle": "My day",
    "title": "Fox's Busy Day",
    "zh": "小狐狸忙碌的一天",
    "pages": [
      [
        "Fox gets up at seven o'clock. He washes his face.",
        "fox",
        "morning"
      ],
      [
        "At seven thirty, he has breakfast. He has an apple.",
        "fox",
        "apple"
      ],
      [
        "He goes to school at eight o'clock. He has lessons with Cat.",
        "both",
        "school"
      ],
      [
        "At twelve o'clock, they have lunch together.",
        "both",
        "salad"
      ],
      [
        "After school, Fox plays with Cat in the garden.",
        "both",
        "garden"
      ],
      [
        "Fox has dinner at six. He goes to bed at nine o'clock. What a busy day!",
        "fox",
        "bed"
      ]
    ],
    "words": {
      "gets up": "起床",
      "washes his face": "洗脸",
      "breakfast": "早餐",
      "has lessons": "上课",
      "lunch": "午餐",
      "dinner": "晚餐",
      "goes to bed": "上床睡觉",
      "o'clock": "整点"
    },
    "questions": [
      [
        "When does Fox get up?",
        "At seven o'clock",
        "At eight o'clock",
        "At nine o'clock"
      ],
      [
        "Who has lessons with Fox?",
        "Cat",
        "A bear",
        "A rabbit"
      ],
      [
        "What does Fox do at nine?",
        "He goes to bed.",
        "He has lunch.",
        "He goes to school."
      ]
    ]
  }
]