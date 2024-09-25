import * as Yup from "yup";

export const QuestionsGenerationSchema = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  verses: Yup.number().min(1, "At least 1 verse required").required(),
  preferredBible: Yup.string().required("Select a Bible version"),
  complexity: Yup.string().required("Select complexity level"),
});
