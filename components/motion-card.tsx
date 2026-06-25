import { ReactNode } from "react";
import { clsx } from "clsx";

export function MotionCard({
  children,
  className,
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      style={{ transitionDelay: `${delay}s` }}
      className={clsx("glass-card rounded-3xl", className)}
    >
      {children}
    </div>
  );
}
