import { UIPlan, UIPlanNode } from '@/lib/types';

function nodeToCode(node: UIPlanNode, depth = 2): string {
  const indent = ' '.repeat(depth);
  const propEntries = Object.entries(node.props).map(([k, v]) => `${k}={${JSON.stringify(v)}}`).join(' ');
  if (!node.children.length) return `${indent}<${node.type} ${propEntries} />`;

  const children = node.children.map((child) => nodeToCode(child, depth + 2)).join('\n');
  return `${indent}<${node.type} ${propEntries}>\n${children}\n${indent}</${node.type}>`;
}

export function generatorAgent(plan: UIPlan): string {
  const body = plan.components.map((node) => nodeToCode(node)).join('\n');

  return `import { Button, Card, Input, Table, Modal, Sidebar, Navbar, Chart } from '@/components/runtime';\n\nexport function GeneratedUI() {\n  return (\n    <div>\n${body}\n    </div>\n  );\n}`;
}
