import { FieldErrors, FieldValues, UseFormReturn } from "react-hook-form";

export type RHFBridgeProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  errors?:  FieldErrors<T>;
  setValue: UseFormReturn<T>['setValue'];
}