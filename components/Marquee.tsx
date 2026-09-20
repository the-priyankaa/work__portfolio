/** Infinite CSS marquee band. Decorative — hidden from screen readers. */
export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((group) => (
          <div className="marquee__group" key={group}>
            {row.map((item, i) => (
              <span className="marquee__item" key={`${group}-${i}`}>
                {item} <span className="marquee__sep" aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}