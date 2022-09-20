import { ArrowLeft } from "phosphor-react";
import { useOrder } from "@hooks";
import { formatToCurrency } from "@utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputWithErrorMessage, CheckoutOrder } from "@components";
import { useEffect } from "react";

interface Step2Props {
  handleNext: () => void;
  handleReturn: () => void;
}

type DeliveryAddressProps = {
  street: string;
  city: string;
  neighborhood: string;
  number: number;
  zipCode: string;
};

const schema = yup.object({
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  neighborhood: yup.string().required("Neighborhood is required"),
  number: yup
    .number()
    .required("Number is required")
    .min(1, "Number must be greater than 0"),
  zipCode: yup
    .string()
    .required("Zip code is required")
    .matches(/^\d{5}-\d{3}$/, "Zip code is invalid"),
});

export function Step2({ handleNext, handleReturn }: Step2Props) {
  const {
    deliveryMethods,
    selectedDeliveryMethod,
    deliveryAddress,
    setSelectedDeliveryMethod,
    setDeliveryAddress,
  } = useOrder();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, touchedFields },
  } = useForm<DeliveryAddressProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<DeliveryAddressProps> = (data) => {
    setDeliveryAddress(data);
    handleNext();
  };

  useEffect(() => {
    setValue("city", deliveryAddress?.city);
    setValue("neighborhood", deliveryAddress?.neighborhood);
    setValue("number", deliveryAddress?.number);
    setValue("street", deliveryAddress?.street);
    setValue("zipCode", deliveryAddress?.zipCode);
  }, []);

  return (
    <div className="flex">
      <div className="flex-[1.5] flex flex-col p-8">
        <h3 className="font-title text-lg mb-4">Delivery Address</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputWithErrorMessage
            control={control}
            hasError={!!errors.street}
            hasTouched={!!touchedFields.street}
            name="street"
            placeHolder="Street"
            register={register}
            errorMessage={errors.street?.message}
          />
          <div className="flex gap-8 my-4">
            <InputWithErrorMessage
              control={control}
              hasError={!!errors.zipCode}
              hasTouched={!!touchedFields.zipCode}
              name="zipCode"
              placeHolder="ZIP code"
              register={register}
              errorMessage={errors.zipCode?.message}
              hasMask
              mask="99999-999"
            />
            <InputWithErrorMessage
              control={control}
              hasError={!!errors.number}
              hasTouched={!!touchedFields.number}
              name="number"
              placeHolder="Number"
              register={register}
              errorMessage={errors.number?.message}
              type="number"
            />
          </div>
          <div className="flex gap-8 mb-4">
            <InputWithErrorMessage
              control={control}
              hasError={!!errors.city}
              hasTouched={!!touchedFields.city}
              name="city"
              placeHolder="City"
              register={register}
              errorMessage={errors.city?.message}
            />
            <InputWithErrorMessage
              control={control}
              hasError={!!errors.neighborhood}
              hasTouched={!!touchedFields.neighborhood}
              name="neighborhood"
              placeHolder="Neighborhood"
              register={register}
              errorMessage={errors.neighborhood?.message}
            />
          </div>
          <div>
            <h3 className="font-title text-lg mb-4">Delivery Method</h3>
            <div className="flex flex-col">
              {deliveryMethods.map(({ label, price }, index) => (
                <label key={label} className="flex items-center gap-2">
                  <input
                    onChange={() => setSelectedDeliveryMethod(index)}
                    className="accent-brown-500"
                    type="radio"
                    name="delivery"
                    checked={selectedDeliveryMethod === index}
                  />
                  <span className="text-sm">{label}</span>
                  <span className="font-semibold">
                    {formatToCurrency(price)}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => handleReturn()}
              className="flex items-center justify-center gap-2"
            >
              <ArrowLeft />
              <span>Return</span>
            </button>
            <button
              data-testid="button"
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
            2
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
