export type Question = string | {
  question: string;
  options?: { value: string; label: string }[];
};

export interface Scale {
  options: number[];
  labels: Record<string, string>;
}

export interface QuestionnaireData {
  questions: Question[];
  scale?: Scale;
}

export interface AllQuestionnaires {
  [key: string]: {
    [key: string]: QuestionnaireData;
  };
}
