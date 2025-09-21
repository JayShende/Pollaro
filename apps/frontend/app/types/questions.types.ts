export enum QuestionType {
  SHORT_ANSWER = "SHORT_ANSWER",
  LONG_ANSWER = "LONG_ANSWER",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  CHECKBOX = "CHECKBOX",
  DROPDOWN = "DROPDOWN",
  FILE_UPLOAD = "FILE_UPLOAD",
}

export interface addShortAnswerProps {
  text: string;
  type: QuestionType.SHORT_ANSWER;
  formId: string;
  order: number;
  required?: boolean;
}

export interface addLongAnswerProps {
  text: string;
  type: QuestionType.LONG_ANSWER;
  formId: string;
  order: number;
  required: boolean;
}

export interface addMultipleChoiceProps {
  text: string;
  type: QuestionType.MULTIPLE_CHOICE;
  formId: string;
  order: number;
  required: boolean;
  options: {
    text: string;
  }[];
}

export interface addCheckboxProps {
  text: string;
  type: QuestionType.CHECKBOX;
  formId: string;
  order: number;
  required: boolean;
  options: {
    text: string;
  }[];
}

export interface addDropdownProps {
  text: string;
  type: QuestionType.DROPDOWN;
  formId: string;
  order: number;
  required: boolean;
  options: {
    text: string;
  }[];
}

export interface addFileUploadProps {
  text: string;
  type: QuestionType.FILE_UPLOAD;
  formId: string;
  order: number;
  required: boolean;
}
