import { useState, useRef, useEffect } from 'react'

const API_URL = import.meta.env.VITE_CHAT_API_URL || ''

const SYSTEM_PROMPT = `You are a helpful AI assistant on KuperBank's portfolio site.
Answer questions about the portfolio, projects, and general coding topics.
Keep responses concise and friendly.`

export default function ChatBox() {
  const [open, setOpen]         = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)
  const abortRef  = useRef(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setLoading(true)

    abortRef.current = new AbortController()

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          model: 'claude',
          messages: history.map(m => ({ role: m.role, content: m.content })),
          system: SYSTEM_PROMPT,
        }),
      })

      const data = await res.json()
      const reply = data.reply || data.error || 'Something went wrong.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      if (err.name !== 'AbortError') {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Could not reach the server.' }])
      }
    } finally {
      setLoading(false)
    }
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const clear = () => {
    abortRef.current?.abort()
    setMessages([])
    setLoading(false)
  }

  return (
    <>
      <button
        className="chatbox-fab"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Ask Claude'}
      >
        {open ? '✕' : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

      {open && (
        <div className="chatbox-panel">
          <div className="chatbox-header">
            <div className="chatbox-header-left">
              <span className="chatbox-claude-logo">✦</span>
              <div>
                <div className="chatbox-header-title">Claude</div>
                <div className="chatbox-header-sub">by Anthropic</div>
              </div>
            </div>
            <div className="chatbox-header-actions">
              {messages.length > 0 && (
                <button className="chatbox-close" onClick={clear} title="Clear chat">↺</button>
              )}
              <button className="chatbox-close" onClick={() => setOpen(false)}>✕</button>
            </div>
          </div>

          <div className="chatbox-messages">
            {messages.length === 0 && !loading && (
              <div className="chatbox-empty">
                <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>✦</div>
                <div>Ask me anything about this portfolio or your projects.</div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`chatbox-msg chatbox-msg--${msg.role}`}>
                {msg.role === 'assistant' && (
                  <span className="chatbox-msg-emoji">✦</span>
                )}
                <div className="chatbox-msg-bubble">{msg.content}</div>
              </div>
            ))}
            {loading && (
              <div className="chatbox-msg chatbox-msg--assistant">
                <span className="chatbox-msg-emoji">✦</span>
                <div className="chatbox-msg-bubble chatbox-typing">
                  <span/><span/><span/>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chatbox-input-row">
            <textarea
              ref={inputRef}
              className="chatbox-input"
              placeholder="Ask Claude…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              rows={1}
              disabled={loading}
            />
            <button
              className="chatbox-send"
              onClick={send}
              disabled={!input.trim() || loading}
              aria-label="Send"
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  )
}
