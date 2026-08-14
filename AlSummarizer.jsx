import React from 'react';
// components/AISummarizer.tsx — PromptUI AI Summarizer
// Condenses long text into key points or summaries.
// Usage: <AISummarizer text={longContent} />
import { useState } from 'react';
import { askAI } from '../lib/promptui';
export function AISummarizer({ text = '', mode = 'summary', label = 'Summarize with AI' }) {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const summarize = async () => {
        if (!text.trim() || loading)
            return;
        setLoading(true);
        setResult('');
        try {
            const prompts = {
                summary: 'Provide a concise summary in 2-3 sentences.',
                bullets: 'Extract the key points as a bulleted list (use - for bullets).',
                tldr: 'Provide a one-line TL;DR.',
            };
            const promptInstruction = prompts[mode] || prompts.summary;
            const reply = await askAI(text.slice(0, 8000), {
                systemPrompt: `You are a summarization expert. ${promptInstruction} Be concise and accurate.`,
                temperature: 0.3,
            });
            setResult(reply);
        }
        catch {
            setResult('Failed to generate summary. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    return (<div data-promptui-id="promptui-components-aisummarizer-div-1" className="space-y-3">
      <button data-promptui-id="promptui-components-aisummarizer-button-2" onClick={summarize} disabled={loading || !text.trim()} className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 transition-colors transition-all duration-200 hover:opacity-90 active:opacity-95">
        {loading ? (<div data-promptui-id="promptui-components-aisummarizer-div-3" className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>) : (<svg data-promptui-id="promptui-components-aisummarizer-svg-4" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>)}
        {label}
      </button>
      {result && (<div data-promptui-id="promptui-components-aisummarizer-div-6" className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg text-sm whitespace-pre-wrap">
          {result}
        </div>)}
    </div>);
}

export default AISummarizer;
