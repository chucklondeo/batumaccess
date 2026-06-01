import { ReactNode } from "react";
import { clsx } from "clsx";

export function Section({
  id,
  eyebrow,
  title,
  body,
  children,
  className
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={clsx("relative px-5 py-20 sm:px-8 lg:px-12", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.34em] text-water">{eyebrow}</p>
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] text-white sm:text-5xl">
            {title}
          </h2>
          {body ? <p className="mt-5 text-base leading-8 text-steel sm:text-lg">{body}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

