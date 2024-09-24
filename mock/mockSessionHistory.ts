interface SessionHistory {
  title: string;
  questions: number;
  verses: number;
  version: string;
  status: string;
  topic: string;
  date: string;
}

export const sessionHistory: SessionHistory[] = [
  {
    title: "Exploring the Psalms",
    questions: 4,
    verses: 3,
    version: "NIV",
    status: "Study",
    topic: "The Power of Prayer",
    date: "Today",
  },
  {
    title: "The Power of Forgiveness",
    questions: 4,
    verses: 3,
    version: "NIV",
    status: "Study",
    topic: "Forgiveness",
    date: "Yesterday",
  },
  {
    title: "Faith in Action",
    questions: 5,
    verses: 4,
    version: "KJV",
    status: "Completed",
    topic: "Living by Faith",
    date: "2 days ago",
  },
];
