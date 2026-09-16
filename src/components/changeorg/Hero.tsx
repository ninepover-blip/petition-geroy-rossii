"use client";

import Image from "next/image";

export default function ChangeHero() {
  return (
    <section className="relative bg-[#201d1a]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-8 py-10 md:grid-cols-2 md:gap-12 md:py-16 lg:gap-16">
          {/* Photo */}
          <div>
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
              <img
                src="/images/hero.jpg"
                alt="Николай Кривоусов — Герой России"
                className="h-full w-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#201d1a] via-[#201d1a]/30 to-transparent" />
              {/* Name overlay */}
              <div className="absolute right-0 bottom-0 left-0 p-5">
                <p className="text-xs font-medium tracking-wide text-white/60">
                  Вечная память
                </p>
                <p className="mt-1 text-xl font-bold leading-tight text-white">
                  Николай Александрович
                  <br />
                  Кривоусов
                </p>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col justify-center">
            {/* Red stripe */}
            <div
              className="h-3 bg-[#E5231E]"
              style={{ width: 71 }}
            />

            {/* Title */}
            <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Присвоить звание «Герой России» Кривоусову Николаю Александровичу
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
              Кривоусов Николай Александрович, уроженец пос. Бейсуг, участник СВО героически погиб 09 марта 2024 года на территории ДНР, спасая свой личный состав. На момент гибели ему было всего 25 лет. За свой короткий жизненный путь он успел совершить ряд подвигов и был награжден двумя медалями «Орден Мужества», медалью «За Отвагу», медалью «За воинскую доблесть».
            </p>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="#sign"
                className="inline-flex items-center justify-center rounded-lg bg-[#E5231E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c91c17]"
              >
                Подписать петицию
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
