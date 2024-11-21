export enum InputType {
  Text = "text",
  Email = "email",
  Password = "password",
}
export enum KeyboardType {
  Default = "default",
  EmailAddress = "email-address",
  Numeric = "numeric",
  PhonePad = "phone-pad",
}
export type InputTypeProps =
  | InputType.Text
  | InputType.Email
  | InputType.Password;

export interface CustomInputProps {
  type: InputTypeProps;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void;
}
