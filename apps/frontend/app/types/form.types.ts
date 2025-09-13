export interface formMetaData {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
}

// Form Interface

interface formQuestionOptionsProps {
  id: string;
  text: string;
  questionId: string;
  createdAt: string;
  updatedAt: string;
}

interface formQuestionsProps {
  id: string;
  text: string;
  type: string;
  formID: string;
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
