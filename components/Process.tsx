import { PROCESS } from "@/lib/data";

export default function Process() {
  return (
    <section id="process" className="process">
      <div className="container">
        <h2 className="h2 h2--center">How I Work</h2>
        <ol className="process__grid">
          {PROCESS.map((step) => (
            <li key={step.n} className="step">
              <div className="step__box">
                <span className="step__n" aria-hidden="true">
                  {step.n}
                </span>
                <h3 className="step__title">{step.title}</h3>
              </div>
              <p className="step__text">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}