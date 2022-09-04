import className from "classnames";
import InputMask from "react-input-mask";
import { UseFormRegister } from "react-hook-form";
import { InputHTMLAttributes } from "react";

interface InputWithErrorMessageProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  hasError: boolean;
  hasTouched: boolean;
  hasMask?: boolean;
  mask?: string;
  errorMessage?: string;
  placeHolder: string;
  type?: string;
  register: UseFormRegister<any>;
}

export function InputWithErrorMessage({
  errorMessage,
  hasError,
  hasTouched,
  hasMask = false,
  mask = "",
  placeHolder,
  name,
  register,
  type = "text",
  ...rest
}: InputWithErrorMessageProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {hasMask ? (
        <InputMask
          {...register(name, { required: true })}
          mask={mask}
          className={className("w-full p-2 border border-gray-200", {
            "border-red-500 text-red-500 outline-red-500":
              hasError && hasTouched,
          })}
          placeholder={placeHolder}
          type={type}
          {...rest}
        />
      ) : (
        <input
          {...register(name, { required: true })}
          className={className("w-full p-2 border border-gray-200", {
            "border-red-500 text-red-500 outline-red-500":
              hasError && hasTouched,
          })}
          placeholder={placeHolder}
          type={type}
          {...rest}
        />
      )}
      {hasError && hasTouched && (
        <span className="text-red-500 text-sm font-light">{errorMessage}</span>
      )}
    </div>
  );
}
