const AREAS = ["Spintex", "Nungua", "Klagon", "Tema", "Lashibi"];

export default function ServiceAreas() {
  return (
    <section
      aria-labelledby="service-areas-title"
      className="bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12"
    >
      <h2
        id="service-areas-title"
        className="text-center text-2xl font-extrabold text-[#0E7C3A] sm:text-3xl"
      >
        Service Areas
      </h2>

      {/* Centered and wraps, so any number of areas stays centered */}
      <ul className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-3 sm:gap-4">
        {AREAS.map((area) => (
          <li
            key={area}
            className="rounded-full bg-[#E3F4E8] px-6 py-2.5 text-sm font-semibold text-[#0B3D22] sm:px-8 sm:text-base"
          >
            {area}
          </li>
        ))}
      </ul>
    </section>
  );
}