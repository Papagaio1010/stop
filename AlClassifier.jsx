import React from 'react';
// components/AIClassifier.tsx — PromptUI AI Classifier
// Automatically categorizes items using AI.
// Usage: <AIClassifier text="Uber ride $34.50" categories={['Transport','Food','Entertainment']} onResult={setCategory} />
import { useState, useCallback } from 'react';
import { askAI } from '../lib/promptui';
export function AIClassifier({ text = '', categories = [], onResult, label = 'Auto-classify' }) {
    const [result, setResult] = useState(null);
    const [confidence, setConfidence] = useState(null);
    const [loading, setLoading] = useState(false);
    const classify = useCallback(async () => {
        if (!text.trim() || !categories.length || loading)
            return;
        setLoading(true);
        try {
            const reply = await askAI(`Classify this item: "${text}"\n\nCategories: ${categories.join(', ')}\n\nRespond with ONLY JSON: {"category":"<chosen>","confidence":0.0-1.0}`, { systemPrompt: 'You classify items into categories. Respond with ONLY valid JSON, no markdown.', temperature: 0 });
            const match = reply.match(/\{[^}]+\}/);
            if (match) {
                const parsed = JSON.parse(match[0]);
                setResult(parsed.category);
                setConfidence(parsed.confidence);
                onResult?.(parsed);
            }
        }
        catch {
            setResult('Unknown');
            setConfidence(0);
        }
        finally {
            setLoading(false);
        }
    }, [text, categories, loading, onResult]);
    return (<div data-promptui-id="promptui-components-aiclassifier-div-1" className="inline-flex items-center gap-2">
      <button data-promptui-id="promptui-components-aiclassifier-button-2" onClick={classify} disabled={loading || !text.trim()} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors transition-all duration-200 hover:opacity-90 active:opacity-95">
        {loading ? '...' : label}
      </button>
      {result && (<span data-promptui-id="promptui-components-aiclassifier-span-3" className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded text-xs font-medium">
          {result}
          {confidence != null && <span data-promptui-id="promptui-components-aiclassifier-span-4" className="text-indigo-500">({Math.round(confidence * 100)}%)</span>}
        </span>)}
    </div>);
}

export default AIClassifier;
