import Link from "next/link";
import { ArrowLeft } from "phosphor-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useOrder } from "@hooks";
import { InputWithErrorMessage, CheckoutOrder } from "@components";
import { useEffect } from "react";
interface Step1Props {
  handleNext: () => void;
}

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+\d+[ ]?\(?\d+\)?[ ]?\d+[-. ]?\d+$/, "Phone number is invalid"),
  email: yup.string().email("Email is invalid").required("Email is required"),
});

type ContactInfoProps = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
};

export function Step1({ handleNext }: Step1Props) {
  const { contactInfo, setContactInfo } = useOrder();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    setValue,
    control,
  } = useForm<ContactInfoProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ContactInfoProps> = (data) => {
    setContactInfo(data);
    handleNext();
  };

  useEffect(() => {
    setValue("firstName", contactInfo?.firstName);
    setValue("lastName", contactInfo?.lastName);
    setValue("phoneNumber", contactInfo?.phoneNumber);
  }, []);

  return (
    <div className="flex">
      <div className="flex-[1.5] flex flex-col p-8">
        <h3 className="font-title text-lg mb-4">Contacts</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-start gap-8 mb-4">
            <InputWithErrorMessage
              data-test="first-name-input"
              control={control}
              register={register}
              name="firstName"
              placeHolder="First name"
              hasError={!!errors.firstName}
              hasTouched={!!touchedFields.firstName}
              errorMessage={errors.firstName?.message}
            />
            <InputWithErrorMessage
              data-test="last-name-input"
              control={control}
              register={register}
              name="lastName"
              placeHolder="Last name"
              hasError={!!errors.lastName}
              hasTouched={!!touchedFields.lastName}
              errorMessage={errors.lastName?.message}
            />
          </div>
          <div className="flex items-start gap-8 mb-4">
            <InputWithErrorMessage
              data-test="phone-number-input"
              control={control}
              register={register}
              name="phoneNumber"
              placeHolder="Phone number"
              hasError={!!errors.phoneNumber}
              hasTouched={!!touchedFields.phoneNumber}
              errorMessage={errors.phoneNumber?.message}
              hasMask
              mask="+99 (99) 99999-9999"
            />
            <InputWithErrorMessage
              data-test="email-input"
              control={control}
              register={register}
              name="email"
              placeHolder="E-mail"
              hasError={!!errors.email}
              hasTouched={!!touchedFields.email}
              errorMessage={errors.email?.message}
            />
          </div>
          <div className="flex items-center justify-between mt-8">
            <Link href="/cart">
              <a className="flex items-center justify-center gap-2">
                <ArrowLeft />
                <span>Return</span>
              </a>
            </Link>
            <button
              type="submit"
              className="bg-brown-500 py-2 px-10 text-white"
            >
              <span>Next</span>
            </button>
          </div>
        </form>
        <footer className="flex items-center gap-2 mt-4">
          Page
          <span className="flex items-center justify-center bg-brown-500 text-white w-8 h-8  rounded-full">
            1
          </span>
          of
          <span className="flex items-center justify-center bg-brown-500 text-white w-8 h-8  rounded-full">
            4
          </span>
        </footer>
      </div>
      <CheckoutOrder />
    </div>
  );
}
