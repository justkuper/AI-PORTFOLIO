/**
 * POST /chat
 * Body: { model, messages: [{role, content}], system?: string }
 *
 * Routes to the correct AI provider based on `model`.
 * API keys are set as environment variables in Serverless / Amplify Console.
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

export const handler = async (event) => {
  // HTTP API uses requestContext.http.method; REST API uses httpMethod
  const method = event.requestContext?.http?.method ?? event.httpMethod ?? ''

  if (method === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }
  if (method !== 'POST') {
    return respond(405, { error: 'Method not allowed' })
  }

  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return respond(400, { error: 'Invalid JSON' })
  }

  const { model = 'claude', messages = [], system } = body

  if (!messages.length) return respond(400, { error: 'messages is required' })

  try {
    let reply
    switch (model) {
      case 'claude':  reply = await callClaude(messages, system);  break
      case 'chatgpt': reply = await callOpenAI(messages, system);  break
      case 'gemini':  reply = await callGemini(messages, system);  break
      case 'grok':    reply = await callGrok(messages, system);    break
      case 'llama':   reply = await callLlama(messages, system);   break
      default:
        return respond(400, { error: `Unknown model: ${model}` })
    }
    return respond(200, { reply })
  } catch (e) {
    console.error(`[chat/${model}]`, e.message)
    return respond(502, { error: e.message || 'Provider error' })
  }
}

// ── Claude (Anthropic) ────────────────────────────────────────────────────────
async function callClaude(messages, system) {
  const payload = {
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    messages,
  }
  if (system) payload.system = system

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message ?? res.statusText)
  return data.content[0].text
}

// ── ChatGPT (OpenAI) ──────────────────────────────────────────────────────────
async function callOpenAI(messages, system) {
  const msgs = system
    ? [{ role: 'system', content: system }, ...messages]
    : messages

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: 'gpt-4o', messages: msgs }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message ?? res.statusText)
  return data.choices[0].message.content
}

// ── Gemini (Google) ───────────────────────────────────────────────────────────
async function callGemini(messages, system) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`

  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const payload = { contents }
  if (system) {
    payload.systemInstruction = { parts: [{ text: system }] }
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message ?? res.statusText)
  return data.candidates[0].content.parts[0].text
}

// ── Grok (xAI) ───────────────────────────────────────────────────────────────
async function callGrok(messages, system) {
  const msgs = system
    ? [{ role: 'system', content: system }, ...messages]
    : messages

  const res = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.XAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: 'grok-3', messages: msgs }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message ?? res.statusText)
  return data.choices[0].message.content
}

// ── Llama 3 via Groq ──────────────────────────────────────────────────────────
async function callLlama(messages, system) {
  const msgs = system
    ? [{ role: 'system', content: system }, ...messages]
    : messages

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: msgs }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message ?? res.statusText)
  return data.choices[0].message.content
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function respond(statusCode, body) {
  return { statusCode, headers: corsHeaders, body: JSON.stringify(body) }
}
