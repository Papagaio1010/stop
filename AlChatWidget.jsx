import React from 'react';
// components/AIChatWidget.tsx — PromptUI AI Chat
// Streaming chat UI with conversation history.
// Usage: <AIChatWidget systemPrompt="You are a helpful assistant." />
import { useState, useRef, useEffect } from 'react';
import { chatAI } from '../lib/promptui';
export function AIChatWidget({ systemPrompt = 'You are a helpful assistant.', placeholder = 'Ask anything...', title = 'AI Assistant' }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);
    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
    const sendMessage = async () => {
        if (!input.trim() || loading)
            return;
        const userMsg = { role: 'user', content: input.trim() };
        const newMsgs = [...messages, userMsg];
        setMessages(newMsgs);
        setInput('');
        setLoading(true);
        try {
            const apiMsgs = [{ role: 'system', content: systemPrompt }, ...newMsgs];
            const reply = await chatAI(apiMsgs);
            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        }
        catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
        }
        finally {
            setLoading(false);
        }
    };
    return (<div data-promptui-id="promptui-components-aichatwidget-div-1" className="flex flex-col h-96 border rounded-xl bg-white dark:bg-gray-900 shadow-sm">
      <div data-promptui-id="promptui-components-aichatwidget-div-2" className="px-4 py-3 border-b font-semibold text-sm">{title}</div>
      <div data-promptui-id="promptui-components-aichatwidget-div-3" className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (<p data-promptui-id="promptui-components-aichatwidget-p-4" className="text-gray-400 text-center mt-8">Start a conversation...</p>)}
        {messages.map((msg, i) => (<div data-promptui-id="promptui-components-aichatwidget-div-5" key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div data-promptui-id="promptui-components-aichatwidget-div-6" className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}>
              {msg.content}
            </div>
          </div>))}
        {loading && (<div data-promptui-id="promptui-components-aichatwidget-div-7" className="flex justify-start">
            <div data-promptui-id="promptui-components-aichatwidget-div-8" className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg text-sm text-gray-400">Thinking...</div>
          </div>)}
        <div data-promptui-id="promptui-components-aichatwidget-div-9" ref={bottomRef}/>
      </div>
      <div data-promptui-id="promptui-components-aichatwidget-div-10" className="p-3 border-t flex gap-2">
        <input data-promptui-id="promptui-components-aichatwidget-input-11" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder={placeholder} className="flex-1 px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors transition-all duration-200 hover:opacity-90 active:opacity-95" disabled={loading}/>
        <button data-promptui-id="promptui-components-aichatwidget-button-12" onClick={sendMessage} disabled={loading || !input.trim()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors transition-all duration-200 hover:opacity-90 active:opacity-95">
          Send
        </button>
      </div>
    </div>);
}

export default AIChatWidget;
