import { type JSX, type ReactNode } from "react";
import { Link } from "react-router";
import { Pencil } from "./icons/Pencil";

interface IProps {
  id: string;
  title: string;
  linkView: string;
  desc?: string;
  deleteButton?: ReactNode;
  linkEdit?: string;
}

export function Card({
  id,
  title,
  linkView,
  desc,
  deleteButton,
  linkEdit,
}: IProps): JSX.Element {
  return (
    <div className="bg-white border-2 border-[#001205] rounded-lg transition hover:shadow-xl px-3 py-1 flex flex-col w-72 gap-4 overflow-hidden">
      <Link to={linkView}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold hover:text-[#32a852] transition">
              {title}
            </span>
            <span className="text-gray-400 text-xs italic">#{id}</span>
          </div>
          <p className="leading-none text-sm text-gray-600 line-clamp-3">
            {desc}
          </p>
        </div>
      </Link>
      <div className="self-end flex gap-2">
        {linkEdit && (
          <Link to={linkEdit} className="p-2 bg-yellow-400 text-white rounded">
            <Pencil height={16} width={16} />
          </Link>
        )}
        {deleteButton}
      </div>
    </div>
  );
}
