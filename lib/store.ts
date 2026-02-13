'use client';

import { create } from 'zustand';
import { ConversationMessage, UIPlan } from './types';

type AppState = {
  prompt: string;
  code: string;
  explanation: string;
  plan?: UIPlan;
  messages: ConversationMessage[];
  versions: number[];
  setPrompt: (prompt: string) => void;
  addMessage: (message: ConversationMessage) => void;
  setResult: (payload: { code: string; explanation: string; plan: UIPlan }) => void;
  setCode: (code: string) => void;
  setVersions: (versions: number[]) => void;
};

export const useAppStore = create<AppState>((set) => ({
  prompt: '',
  code: '',
  explanation: '',
  messages: [],
  versions: [],
  setPrompt: (prompt) => set({ prompt }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setResult: ({ code, explanation, plan }) => set((state) => ({ code, explanation, plan, messages: [...state.messages, { role: 'assistant', content: explanation, createdAt: Date.now() }] })),
  setCode: (code) => set({ code }),
  setVersions: (versions) => set({ versions })
}));
