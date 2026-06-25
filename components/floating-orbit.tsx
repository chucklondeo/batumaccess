export function FloatingOrbit() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="aurora absolute left-1/2 top-24 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full opacity-80"
      />
      <div
        className="absolute right-8 top-28 h-48 w-48 rounded-full border border-water/20"
      />
      <div
        className="absolute bottom-20 left-10 h-28 w-28 rounded-full border border-gold/20"
      />
    </div>
  );
}
