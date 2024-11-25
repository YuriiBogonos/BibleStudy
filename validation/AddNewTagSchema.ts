import * as Yup from "yup";

export const AddNewTagSchema = Yup.object().shape({
  tagName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Tag must contain only letters")
    .required("Tag is required"),
});
