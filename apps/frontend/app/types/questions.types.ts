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