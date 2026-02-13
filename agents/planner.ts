import { UIPlan } from '@/lib/types';

export function plannerAgent(prompt: string, previousPlan?: UIPlan): UIPlan {
  const text = prompt.toLowerCase();
  const components: UIPlan['components'] = [];

  if (text.includes('sidebar')) components.push({ type: 'Sidebar', props: { items: ['Overview', 'Reports', 'Settings'] }, children: [] });
  if (text.includes('navbar')) components.push({ type: 'Navbar', props: { title: 'Analytics Workspace' }, children: [] });

  if (text.includes('card') || text.includes('dashboard')) {
    components.push({
      type: 'Card',
      props: { title: 'Performance' },
      children: text.includes('chart') ? [{ type: 'Chart', props: { values: [20, 50, 35, 80] }, children: [] }] : []
    });
  }

  if (text.includes('table')) {
    components.push({ type: 'Table', props: { columns: ['Metric', 'Value'], rows: [['Users', '1,200'], ['Revenue', '$9,000']] }, children: [] });
  }

  if (text.includes('modal')) {
    components.push({ type: 'Modal', props: { title: 'Settings', open: true }, children: [{ type: 'Input', props: { placeholder: 'Workspace name' }, children: [] }] });
  }

  if (components.length === 0 && previousPlan) {
    return {
      ...previousPlan,
      reasoning: `No explicit new structure requested, preserving previous plan while applying text intent: ${prompt}`
    };
  }

  return {
    layout: text.includes('minimal') ? 'minimal-two-column' : 'dashboard-shell',
    components,
    reasoning: `Planner mapped intent keywords to deterministic component plan for prompt: ${prompt}`
  };
}
