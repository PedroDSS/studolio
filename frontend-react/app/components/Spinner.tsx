import { type JSX } from "react";

export default function Spinner(): JSX.Element {
  return (
    <div
      className="animate-spin inline-block w-8 h-8 border-4 border-solid rounded-full"
      style={{ borderColor: "#32a852", borderTopColor: "transparent" }}
    ></div>
  );
}
