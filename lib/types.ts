export const ALLOWED_COMPONENTS = [
  'Button',
  'Card',
  'Input',
  'Table',
  'Modal',
  'Sidebar',
  'Navbar',
  'Chart'
] as const;

export type AllowedComponent = (typeof ALLOWED_COMPONENTS)[number];

export type UIPlanNode = {
  type: AllowedComponent;
  props: Record<string, string | number | boolean | string[] | undefined>;
  children: UIPlanNode[];
};

export type UIPlan = {
  layout: string;
  components: UIPlanNode[];
  reasoning: string;
};

export type AgentResult = {
  plan: UIPlan;
  code: string;
  explanation: string;
  warnings: string[];
};

export type ConversationMessage = {
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
};
