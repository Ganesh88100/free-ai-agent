import { UIPlan } from '@/lib/types';

export function explainerAgent(plan: UIPlan, previousPlan?: UIPlan): string {
  const changes = previousPlan
    ? `Updated from ${previousPlan.components.length} to ${plan.components.length} top-level components with incremental preservation.`
    : 'Created initial plan from scratch.';

  const componentReasons = plan.components.map((c) => `- ${c.type}: chosen to satisfy requested ${c.type.toLowerCase()} capability.`).join('\n');

  return `${changes}\nLayout: ${plan.layout}.\nReasoning: ${plan.reasoning}\nComponents:\n${componentReasons}`;
}
