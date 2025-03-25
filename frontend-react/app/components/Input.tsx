import { useState, type HTMLInputTypeAttribute, type JSX } from "react";
import { CloseEye } from "./icons/CloseEye";
import { OpenEye } from "./icons/OpenEye";

interface IProps {
  ariaLabel: string;
  id: string;
  name: string;
  type: HTMLInputTypeAttribute;
  label: string;
  defaultValue?: string;
  isDisabled?: boolean;
  placeholder?: string;
}

export function Input({
  ariaLabel,
  id,
  label,
  name,
  type,
  defaultValue,
  isDisabled,
  placeholder,
}: IProps): JSX.Element {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col gap-2 font-medium text-black">
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <input
          aria-disabled={isDisabled}
          aria-label={ariaLabel}
          disabled={isDisabled}
          type={type === "password" && isPasswordVisible ? "text" : type}
          name={name}
          id={id}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="w-72 h-12 pl-3 bg-white border-2 border-[#001205] rounded"
        />
        {type === "password" && (
          <button
            onClick={togglePasswordVisible}
            className="absolute inset-y-0 right-0 flex items-center justify-center p-2"
          >
            {isPasswordVisible ? (
              <CloseEye height={30} width={30} />
            ) : (
              <OpenEye height={30} width={30} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
