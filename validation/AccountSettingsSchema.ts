import * as Yup from "yup";

export const AccountSettingsSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name is required")
    .max(16, "Full name must be at most 16 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});
