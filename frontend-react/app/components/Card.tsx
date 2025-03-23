import { type JSX } from "react";
import { Link } from "react-router";

interface IProps {
  id: string;
  title: string;
  link: string;
}

export default function Card({ id, title, link }: IProps): JSX.Element {
  return (
    <Link
      to={link}
      className="bg-white border-2 border-[#001205] rounded-lg overflow-hidden transition hover:shadow-xl px-3 py-1 flex flex-col w-40"
    >
      <div className="flex flex-col gap-0">
        <span className="text-xl font-semibold hover:text-[#32a852] transition">
          {title}
        </span>
        <span className="text-gray-600 text-xs italic -mt-1">{id}</span>
      </div>
      <div>
        {/* icons button here */}
        {/* <button className="bg">*</button>
        <button>|</button> */}
      </div>
    </Link>
  );
}
