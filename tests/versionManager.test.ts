import { describe, expect, it } from 'vitest';
import { versionManager } from '@/lib/versionManager';
import { plannerAgent } from '@/agents/planner';

describe('version rollback', () => {
  it('rolls back to previous version', () => {
    versionManager.add(plannerAgent('navbar'), 'code1', 'exp1');
    versionManager.add(plannerAgent('navbar modal'), 'code2', 'exp2');
    const rolled = versionManager.rollback(1);
    expect(rolled?.versionNumber).toBe(1);
  });
});
