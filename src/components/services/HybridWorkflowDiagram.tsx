import { useTranslations } from "next-intl";
import { Sparkles, UserCheck, ShieldCheck, PackageCheck } from "lucide-react";

const STAGES = [
  { key: "workflowStage1", icon: Sparkles },
  { key: "workflowStage2", icon: UserCheck },
  { key: "workflowStage3", icon: ShieldCheck },
  { key: "workflowStage4", icon: PackageCheck },
] as const;

export function HybridWorkflowDiagram() {
  const t = useTranslations("Services");

  return (
    <div>
      <h2 className="text-h2 font-bold text-slate-900">{t("hybridWorkflowTitle")}</h2>
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const isEven = i % 2 === 0;
          return (
            <div key={stage.key} className="flex flex-1 items-center gap-4">
              <div
                className={`flex flex-1 flex-col items-center rounded-xl p-5 text-center ${
                  isEven ? "bg-primary-50" : "bg-accent-50"
                }`}
              >
                <div
                  className={`flex size-11 items-center justify-center rounded-full ${
                    isEven ? "bg-primary-600" : "bg-accent-500"
                  }`}
                >
                  <Icon className="size-5 text-white" aria-hidden />
                </div>
                <p className="mt-3 text-body font-semibold text-slate-800">{t(stage.key)}</p>
              </div>
              {i < STAGES.length - 1 && (
                <div className="hidden h-0.5 w-6 shrink-0 bg-slate-300 md:block rtl:rotate-180" aria-hidden />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
