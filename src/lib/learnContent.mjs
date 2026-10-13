/**
 * Editorial awareness content is manually written as a non-clinical prototype.
 * Sources are linked for further reading. No claims of live news or clinician review.
 */
export const categories = ["All","Understand","Feel better","Find help","Healthy habits"];
export const posts = [
  {
    id:"it-is-okay-to-ask",category:"Find help",read:"3 min",theme:"sea",symbol:"✳",
    eyebrow:"MENTAL HEALTH AWARENESS",title:"Asking for help is a strong first step",
    excerpt:"You don't need to have the right words before starting a conversation.",
    poster:"A conversation can change the direction of a day.",
    paragraphs:[
      "Finding support can feel unfamiliar, especially when you are worried about being judged. You do not have to explain your whole story in the first message.",
      "Consider starting with a simple question: 'I'd like to know what support is available, how much it costs, and how to book a first conversation.'",
      "It's okay to ask about privacy, language, the professional's qualifications, affordability and whether you can speak remotely. If a service is not suitable, ask if they can suggest another verified option.",
      "Zim Safe Minds is exploring a simpler first-contact pathway. We are not a clinic, and any real booking feature needs verified professional partners."
    ],
    sourceLabel:"Friendship Bench — independent Zimbabwean support",sourceUrl:"https://www.friendshipbenchzimbabwe.org/online"
  },
  {
    id:"stress-does-not-define-you",category:"Feel better",read:"3 min",theme:"sage",symbol:"◌",
    eyebrow:"EVERYDAY WELLBEING",title:"When life feels like too much",
    excerpt:"Give yourself permission to pause, notice, and choose one small next step.",
    poster:"A pause is still progress.",
    paragraphs:[
      "Stress can show up when there are pressures around school, work, family or uncertainty. You do not need to solve everything all at once.",
      "If you feel comfortable, notice where your feet touch the floor. Look around and quietly name a few things you can see. This is a general grounding practice, not medical treatment.",
      "Try identifying just one action you can manage next: rest, a glass of water, a short walk or a message to someone you trust.",
      "When distress persists or affects your daily life, consider reaching out to a qualified professional or trusted support service."
    ],
    sourceLabel:"WHO — Doing What Matters in Times of Stress",sourceUrl:"https://www.who.int/publications/i/item/9789240003927"
  },
  {
    id:"mental-health-is-health",category:"Understand",read:"2 min",theme:"sky",symbol:"☼",
    eyebrow:"BREAK THE STIGMA",title:"Mental health is part of health",
    excerpt:"Talking openly and respectfully can help make support easier to seek.",
    poster:"You are more than a difficult moment.",
    paragraphs:[
      "Mental wellbeing is part of our everyday lives. It affects how people cope, connect and participate in work, learning and relationships.",
      "You cannot understand somebody's experiences or needs by looking at them. Avoid labels or assumptions, and ask how you can support someone.",
      "Support can take many forms, including conversations with trusted people and services delivered by appropriately trained professionals.",
      "If you want to ask for care, you deserve clear explanations of costs, privacy and what will happen next."
    ],
    sourceLabel:"WHO — Mental health",sourceUrl:"https://www.who.int/health-topics/mental-health"
  },
  {
    id:"help-a-friend",category:"Find help",read:"3 min",theme:"mint",symbol:"↗",
    eyebrow:"SUPPORT EACH OTHER",title:"How to show up for a friend",
    excerpt:"Listen, respect boundaries, and help them find a trustworthy next step.",
    poster:"Listen first. You do not need to fix everything.",
    paragraphs:[
      "You do not need to be a therapist to show kindness. Give your friend a chance to speak without interruptions or judgment.",
      "Instead of promising total secrecy, be clear that urgent safety concerns can require involving immediate emergency help or a trusted professional.",
      "Ask whether they'd like practical help finding information about a qualified service, or whether they'd prefer you simply listen.",
      "When someone may be in immediate danger, do not rely on a website or a chatbot. Contact local emergency services or seek emergency medical care."
    ],
    sourceLabel:"Friendship Bench — independent support",sourceUrl:"https://www.friendshipbenchzimbabwe.org/online"
  },
  {
    id:"digital-break",category:"Healthy habits",read:"2 min",theme:"sand",symbol:"◎",
    eyebrow:"A LITTLE SPACE",title:"Your phone can wait a moment",
    excerpt:"Create a little room for rest without strict rules or pressure.",
    poster:"You can step away and return when you're ready.",
    paragraphs:[
      "Technology connects us with people and information, but it can also be tiring. You are allowed to take a break.",
      "Consider trying a small device-free moment during a meal, a short walk, or just before rest, if that's realistic for you.",
      "There is no perfect routine. Choose habits that fit your circumstances, responsibilities and access needs.",
      "If online experiences are causing sustained distress, speak to someone you trust or seek professional support when appropriate."
    ],
    sourceLabel:"WHO — World mental health resources",sourceUrl:"https://www.who.int/health-topics/mental-health"
  },
  {
    id:"first-appointment",category:"Understand",read:"4 min",theme:"blue",symbol:"♡",
    eyebrow:"WHAT TO EXPECT",title:"Your first support conversation",
    excerpt:"Questions you can ask before deciding who to speak with.",
    poster:"You can ask questions before you share your story.",
    paragraphs:[
      "You have the right to understand who is providing a service and what kind of support they are qualified to offer.",
      "Before booking, ask about the practitioner's qualifications, professional registration, fees, session format, location and how your information will be handled.",
      "You can start with what you feel comfortable sharing. Ask how confidentiality works and when professionals may be required to act to protect safety.",
      "If you are uncomfortable or the service is not a good fit, ask for information about other legitimate care options."
    ],
    sourceLabel:"Friendship Bench — online service information",sourceUrl:"https://www.friendshipbenchzimbabwe.org/online"
  }
];
export function filterPosts(query, category) {
 const q=String(query??"").trim().toLocaleLowerCase();
 return posts.filter(p=>(category==="All"||p.category===category)&&(!q||[p.title,p.excerpt,p.category,p.eyebrow].join(" ").toLocaleLowerCase().includes(q)));
}
