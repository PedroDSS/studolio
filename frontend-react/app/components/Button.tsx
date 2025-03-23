import { type JSX } from "react";

interface IProps {
  ariaLabel: string;
  label: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  ariaLabel,
  label,
  isDisabled,
  onClick,
}: IProps): JSX.Element {
  return (
    <button
      aria-disabled={isDisabled}
      aria-label={ariaLabel}
      disabled={isDisabled}
      onClick={onClick}
      className="px-5 py-2 bg-[#125724] text-white rounded text-sm font-bold hover:bg-[#32a852]"
    >
      {label}
    </button>
  );
}
