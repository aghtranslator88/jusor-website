export function ProcessStepper({
  steps,
}: {
  steps: { title: string; body: string }[];
}) {
  return (
    <ol className="mt-10 flex flex-col gap-8 md:flex-row md:items-start md:gap-4">
      {steps.map((step, i) => (
        <li key={step.title} className="flex flex-1 flex-col items-center text-center">
          <div className="flex w-full items-center">
            <span
              className={`h-px flex-1 bg-slate-200 ${i === 0 ? "invisible" : ""}`}
              aria-hidden
            />
            <svg
              viewBox="0 0 48 48"
              className="mx-2 size-12 shrink-0"
              role="img"
              aria-label={`${i + 1}`}
            >
              <circle cx="24" cy="24" r="22" className="fill-primary-600" />
              <text
                x="24"
                y="24"
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-white text-[20px] font-bold"
              >
                {i + 1}
              </text>
            </svg>
            <span
              className={`h-px flex-1 bg-slate-200 ${i === steps.length - 1 ? "invisible" : ""}`}
              aria-hidden
            />
          </div>
          <h3 className="mt-4 text-h3 font-semibold text-slate-900">{step.title}</h3>
          <p className="mt-2 max-w-xs text-body text-slate-600">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
