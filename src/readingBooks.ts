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
,{
  "id": "rainy-day",
  "volume": "g4a",
  "unit": "g4a-u06",
  "unitTitle": "Weather",
  "title": "A Rainy Day Surprise",
  "zh": "雨天里的惊喜",
  "pages": [
    [
      "It's Saturday morning. Fox and Cat are happy.",
      "both",
      "garden",
      "reading/rainy-day/01.webp"
    ],
    [
      "“Let's go to the park today!” says Fox.",
      "both",
      "garden",
      "reading/rainy-day/02.webp"
    ],
    [
      "“What's the weather like today?” asks Cat. “It's sunny and warm!”",
      "both",
      "garden",
      "reading/rainy-day/03.webp"
    ],
    [
      "Look! It's cloudy now. The wind is blowing. It's windy.",
      "both",
      "garden",
      "reading/rainy-day/04.webp"
    ],
    [
      "Oh no! It's rainy now. They can't go to the park.",
      "both",
      "garden",
      "reading/rainy-day/05.webp"
    ],
    [
      "“What can we do on a rainy day?” asks Fox.",
      "both",
      "garden",
      "reading/rainy-day/06.webp"
    ],
    [
      "Cat has an idea. “Let's make some cakes!”",
      "both",
      "garden",
      "reading/rainy-day/07.webp"
    ],
    [
      "They mix eggs, milk and flour in a big bowl.",
      "both",
      "garden",
      "reading/rainy-day/08.webp"
    ],
    [
      "The little cakes are ready. They smell good!",
      "both",
      "garden",
      "reading/rainy-day/09.webp"
    ],
    [
      "They have cakes and warm milk. It's cool outside, but warm inside.",
      "both",
      "garden",
      "reading/rainy-day/10.webp"
    ],
    [
      "“Let's make paper boats!” says Fox.",
      "both",
      "garden",
      "reading/rainy-day/11.webp"
    ],
    [
      "They put on their boots and take their umbrellas. Their boats float on the water.",
      "both",
      "garden",
      "reading/rainy-day/12.webp"
    ],
    [
      "The rain stops. The sun comes out. Look! A rainbow!",
      "both",
      "garden",
      "reading/rainy-day/13.webp"
    ],
    [
      "Fox takes a picture. “What a beautiful rainbow!” says Cat.",
      "both",
      "garden",
      "reading/rainy-day/14.webp"
    ],
    [
      "In the evening, they look at their pictures. “A rainy day can be fun, too!”",
      "both",
      "garden",
      "reading/rainy-day/15.webp"
    ]
  ],
  "words": {
    "sunny": "晴朗的",
    "warm": "温暖的",
    "cloudy": "多云的",
    "windy": "有风的",
    "rainy": "下雨的",
    "cool": "凉爽的",
    "park": "公园",
    "rainbow": "彩虹",
    "paper boats": "纸船",
    "What's the weather like today?": "今天天气怎么样？"
  },
  "questions": [
    [
      "Where do they want to go?",
      "The park",
      "The zoo",
      "The farm"
    ],
    [
      "Why do they stay inside?",
      "It's rainy.",
      "It's hot.",
      "It's sunny."
    ],
    [
      "What do they make first?",
      "Cakes",
      "Paper boats",
      "A kite"
    ],
    [
      "What do they see after the rain?",
      "A rainbow",
      "Snow",
      "A star"
    ],
    [
      "How do they feel at the end?",
      "Happy",
      "Angry",
      "Sad"
    ]
  ]
}]
