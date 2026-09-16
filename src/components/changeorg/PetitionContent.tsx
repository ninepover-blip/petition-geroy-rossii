"use client";

import Link from "next/link";
import { Flag } from "lucide-react";

export default function PetitionContent() {
  return (
    <article className="py-8">
      {/* Heading */}
      <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
        The Issue
      </h2>

      {/* Body text */}
      <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-700">
        <p>
          Кривоусов Николай Александрович, уроженец пос. Бейсуг, участник СВО героически погиб 09 марта 2024 года на территории ДНР, спасая свой личный состав. На момент гибели ему было всего 25 лет. За свой короткий жизненный путь он успел совершить ряд подвигов и был награжден двумя медалями «Орден Мужества», медалью «За Отвагу», медалью «За воинскую доблесть». Еще один орден мужества Николай получить не успел.
        </p>
        <p>
          Имена героических сынов России не должны быть забыты будущими поколениями. Призываем подписать петицию о присвоении Николаю звания «Герой России» посмертно. Подпишите петицию!
        </p>
      </div>

      {/* Report link */}
      <div className="mt-8">
        <Link
          href="#"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-700"
        >
          <Flag className="size-3" />
          Report a policy violation
        </Link>
      </div>

      <hr className="my-8 border-gray-200" />

      {/* Author block */}
      <div className="flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
          ВЛ
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Валентина Лузянина</p>
          <p className="text-xs text-gray-500">Petition Starter</p>
        </div>
      </div>

      {/* Media inquiries button */}
      <div className="mt-5">
        <Link
          href="#"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
        >
          Media inquiries
        </Link>
      </div>

      <hr className="my-8 border-gray-200" />
    </article>
  );
}
