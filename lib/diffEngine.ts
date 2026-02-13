import { UIPlan } from './types';

export type PlanDiff = {
  changedLayout: boolean;
  addedComponents: string[];
  removedComponents: string[];
};

export function diffPlans(previous: UIPlan | undefined, next: UIPlan): PlanDiff {
  if (!previous) {
    return {
      changedLayout: true,
      addedComponents: next.components.map((c) => c.type),
      removedComponents: []
    };
  }

  const prevTypes = previous.components.map((c) => c.type);
  const nextTypes = next.components.map((c) => c.type);

  return {
    changedLayout: previous.layout !== next.layout,
    addedComponents: nextTypes.filter((t) => !prevTypes.includes(t)),
    removedComponents: prevTypes.filter((t) => !nextTypes.includes(t))
  };
}
