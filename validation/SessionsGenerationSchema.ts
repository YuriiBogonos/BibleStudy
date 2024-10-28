import * as Yup from "yup";

export const SessionsGenerationSchema = Yup.object().shape({
  sessionName: Yup.string().required("Session name is required"),
  numberOfQuestions: Yup.number()
    .min(1, "Must have at least 1 question")
    .required("Number of questions is required")
    .transform((value) => (isNaN(value) ? undefined : value)),
  verses: Yup.number()
    .min(1, "Must have at least 1 verse")
    .required("Number of verses is required")
    .transform((value) => (isNaN(value) ? undefined : value)),
  focusTopic: Yup.string().required("Focus topic is required"),
  preferredBible: Yup.string().required("Preferred Bible version is required"),
  complexity: Yup.string().required("Complexity level is required"),
});
