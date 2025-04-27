import type { JSX, ButtonHTMLAttributes } from "react";

interface IProps {
  ariaLabel: string;
  label: string;
  customStyle?: string;
  isDisabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
}

export function Button({
  ariaLabel,
  label,
  customStyle,
  isDisabled,
  type,
  onClick,
}: IProps): JSX.Element {
  return (
    <button
      aria-disabled={isDisabled}
      aria-label={ariaLabel}
      disabled={isDisabled}
      type={type}
      onClick={onClick}
      className={`px-5 py-2 bg-[#125724] text-white rounded text-sm font-bold hover:bg-[#32a852] ${customStyle}`}
    >
      {label}
    </button>
  );
}
