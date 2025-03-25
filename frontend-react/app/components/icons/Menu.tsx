import type { JSX } from "react";
import type Icons from "./interface/Icons";

export function Menu({
  height,
  width,
  color = "currentColor",
}: Icons): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path fill={color} d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"></path>
    </svg>
  );
}
