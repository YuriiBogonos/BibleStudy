interface SessionHistory {
	id: string;
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
		id: "1",
		title: "Exploring the Psalms",
		questions: 4,
		verses: 3,
		version: "NIV",
		status: "Study",
		topic: "The Power of Prayer",
		date: "Today",
	},
	{
		id: "2",
		title: "The Power of Forgiveness",
		questions: 4,
		verses: 3,
		version: "NIV",
		status: "Study",
		topic: "Forgiveness",
		date: "Yesterday",
	},
	{
		id: "3",
		title: "Faith in Action",
		questions: 5,
		verses: 4,
		version: "KJV",
		status: "Completed",
		topic: "Living by Faith",
		date: "2 days ago",
	},
];
