'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { componentRegistry } from '@/components/registry';
import { useAppStore } from '@/lib/store';
import { UIPlanNode } from '@/lib/types';

function PreviewNode({ node }: { node: UIPlanNode }) {
  const Cmp = componentRegistry[node.type];
  return <Cmp {...node.props}>{node.children.map((child, i) => <PreviewNode key={`${node.type}-${i}`} node={child} />)}</Cmp>;
}

export default function HomePage() {
  const [status, setStatus] = useState('Idle');
  const { prompt, code, explanation, plan, messages, versions, setPrompt, setCode, setResult, addMessage, setVersions } = useAppStore();

  const versionLabel = useMemo(() => versions.at(-1) ?? 0, [versions]);

  const runGenerate = async () => {
    if (!prompt.trim()) return;
    addMessage({ role: 'user', content: prompt, createdAt: Date.now() });
    setStatus('Generating…');
    const response = await fetch('/api/agent', { method: 'POST', body: JSON.stringify({ prompt }) });
    const text = await response.text();
    const chunks = text.split('\n\n').filter(Boolean);
    const completed = chunks.at(-1)?.replace('data: ', '');
    if (!completed) return;
    const payload = JSON.parse(completed);
    setResult(payload.result);
    const versionsRes = await fetch('/api/versions');
    const versionsData = await versionsRes.json();
    setVersions(versionsData.versions.map((v: { versionNumber: number }) => v.versionNumber));
    setStatus('Done');
  };

  const rollback = async () => {
    if (versionLabel <= 1) return;
    await fetch('/api/versions', { method: 'POST', body: JSON.stringify({ rollbackVersion: versionLabel - 1 }) });
    const versionsRes = await fetch('/api/versions');
    const versionsData = await versionsRes.json();
    setVersions(versionsData.versions.map((v: { versionNumber: number }) => v.versionNumber));
    setStatus(`Rolled back to v${versionLabel - 1}`);
  };

  const useVoice = () => {
    const SR = (window as typeof window & { webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition;
    if (!SR) return setStatus('Speech recognition unavailable.');
    const rec = new SR();
    rec.onresult = (event) => setPrompt(event.results[0][0].transcript);
    rec.start();
  };

  return (
    <main className="layout">
      <section className="panel">
        <h2>AI Chat</h2>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe the UI..." />
        <div className="actions">
          <button className="btn" onClick={runGenerate}>Generate UI</button>
          <button className="btn btn-secondary" onClick={rollback}>Rollback</button>
          <button className="btn btn-secondary" onClick={useVoice}>Voice</button>
        </div>
        <div className="status">{status} | Version {versionLabel}</div>
        <div className="chat-log">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div key={message.createdAt} className="message" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                <strong>{message.role}</strong>: {message.content}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <section>
        <div className="panel panel-main">
          <h2>Generated React Code</h2>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} aria-label="Generated code" />
          <h3>Reasoning</h3>
          <p>{explanation}</p>
        </div>
        <div className="preview">
          <h2>Live Preview</h2>
          <div className="preview-wrap grid">
            {plan?.components.map((node, index) => <PreviewNode key={`${node.type}-${index}`} node={node} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
