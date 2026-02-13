import { describe, expect, it } from 'vitest';
import { plannerAgent } from '@/agents/planner';

describe('plannerAgent', () => {
  it('maps dashboard prompt into deterministic components', () => {
    const plan = plannerAgent('Create a dashboard with sidebar, navbar and analytics cards');
    expect(plan.components.map((c) => c.type)).toEqual(expect.arrayContaining(['Sidebar', 'Navbar', 'Card']));
  });
});
