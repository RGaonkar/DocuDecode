export class Phrase {
    explanation: string;
    url: string;
    title: string;
}

interface Dictionary<T> {
    [key: string]: T;
  }

const myDict: Dictionary<string> = {
    "firstKey": "First Value",
    "secondKey": "Second Value"
};

export class Article {
    text: string;
    textV2?: string[];
    novice: Dictionary<Phrase>;
    intermediate: Dictionary<Phrase>;
    expert: Dictionary<Phrase>;
    status?: string;
    stringLevel?: string;
}

export default Article;