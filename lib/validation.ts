import { ALLOWED_COMPONENTS, UIPlan, UIPlanNode } from './types';

const injectionPatterns = [/ignore previous/i, /system prompt/i, /create custom component/i, /eval\(/i];

export function validatePrompt(prompt: string): string[] {
  return injectionPatterns.filter((p) => p.test(prompt)).map((p) => `Rejected by injection filter: ${p.source}`);
}

function validateNode(node: UIPlanNode, errors: string[], path: string) {
  if (!ALLOWED_COMPONENTS.includes(node.type)) {
    errors.push(`Component ${node.type} at ${path} is not whitelisted.`);
  }
  if (typeof node.props !== 'object' || Array.isArray(node.props)) {
    errors.push(`Props at ${path} must be object.`);
  }
  node.children.forEach((child, index) => validateNode(child, errors, `${path}.children[${index}]`));
}

export function validatePlan(plan: UIPlan): string[] {
  const errors: string[] = [];
  plan.components.forEach((node, index) => validateNode(node, errors, `components[${index}]`));
  return errors;
}

export function validateCode(code: string): string[] {
  const errors: string[] = [];
  if (!code.includes('export function GeneratedUI')) errors.push('Generated code must export GeneratedUI function.');
  if (code.includes('style={{')) errors.push('Inline styles are disallowed in generated code.');
  return errors;
}
