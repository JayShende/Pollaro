export interface formMetaData {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  acceptingResponses: boolean;
}

// Form Interface

interface formQuestionOptionsProps {
  id: string;
  text: string;
  questionId: string;
  createdAt: string;
  updatedAt: string;
}

export enum questionType {
  SHORT_ANSWER = "SHORT_ANSWER",
  LONG_ANSWER = "LONG_ANSWER",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  CHECKBOX = "CHECKBOX",
  DROPDOWN = "DROPDOWN",
  FILE_UPLOAD = "FILE_UPLOAD",
}

export interface formQuestionsProps {
  id: string;
  text: string;
  type: questionType;
  formId: string;
  required: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  options?: formQuestionOptionsProps[];
}

interface ownerProps {
  name: string;
  email: string;
}

interface formData {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;

  owner: ownerProps;
  questions: formQuestionsProps[];
}

export interface formProps {
  message: string;
  data: formData;
}

interface responseOptionProps {
  optionId: string;
}

interface reponseAnswersProps {
  questionId: string;
  text?: string;
  files: [];
  options?: responseOptionProps;
}

export interface responseProps {
  formId: string;
  userId?: string;
  answers: reponseAnswersProps;
}

export interface createFormProps {
  title: string;
  description?: string;
}

export interface formInfoProps {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  owner: {
    name: string;
    email: string;
  };
}
