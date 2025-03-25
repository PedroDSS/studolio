import { type JSX } from "react";

interface IProps {
  width?: string;
  height?: string;
  border?: string;
}

export function Spinner({
  border = "4px",
  height = "32px",
  width = "32px",
}: IProps): JSX.Element {
  return (
    <div
      className="animate-spin inline-block rounded-full border-solid"
      style={{
        width,
        height,
        borderWidth: border,
        borderColor: "#32a852",
        borderTopColor: "transparent",
      }}
    ></div>
  );
}
