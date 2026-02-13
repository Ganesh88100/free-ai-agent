import { explainerAgent } from '@/agents/explainer';
import { generatorAgent } from '@/agents/generator';
import { plannerAgent } from '@/agents/planner';
import { MemoryCache } from '@/lib/cache';
import { diffPlans } from '@/lib/diffEngine';
import { AgentResult, UIPlan } from '@/lib/types';
import { validateCode, validatePlan, validatePrompt } from '@/lib/validation';
import { versionManager } from '@/lib/versionManager';

const plannerCache = new MemoryCache<UIPlan>(60_000);

export function runAgent(prompt: string): AgentResult {
  const injectionErrors = validatePrompt(prompt);
  if (injectionErrors.length) {
    throw new Error(injectionErrors.join('; '));
  }

  const previous = versionManager.list().at(-1)?.plan;
  const cached = plannerCache.get(prompt);
  const plan = cached ?? plannerAgent(prompt, previous);
  plannerCache.set(prompt, plan);

  const planErrors = validatePlan(plan);
  if (planErrors.length) throw new Error(planErrors.join('; '));

  const code = generatorAgent(plan);
  const codeErrors = validateCode(code);
  if (codeErrors.length) throw new Error(codeErrors.join('; '));

  const diff = diffPlans(previous, plan);
  const explanation = `${explainerAgent(plan, previous)}\nDiff: +[${diff.addedComponents.join(', ')}], -[${diff.removedComponents.join(', ')}]`;

  versionManager.add(plan, code, explanation);

  return {
    plan,
    code,
    explanation,
    warnings: diff.changedLayout ? ['Layout changed based on new intent.'] : []
  };
}
