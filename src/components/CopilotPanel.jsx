import { useState } from 'react'
import { X, Sparkles, Send, Zap } from 'lucide-react'

const INITIAL_MESSAGES = [
  {
    role: 'ai',
    text: '¡Buenos días, Dra. García! He analizado los datos de la mañana. **3 residentes requieren atención prioritaria** esta semana. ¿En qué puedo ayudarle?',
    time: '8:30 AM'
  }
]

const QUICK_PROMPTS = [
  'Residentes en mayor riesgo',
  'Resumen del día',
  'Plan de intervención',
  'Estado de protocolos',
]

export default function CopilotPanel({ open, onClose }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  const sendMessage = (text) => {
    if (!text.trim()) return
    const userMsg = { role: 'user', text, time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const aiResponse = {
        role: 'ai',
        text: generateResponse(text),
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiResponse])
      setTyping(false)
    }, 1500)
  }

  const generateResponse = (query) => {
    const q = query.toLowerCase()
    if (q.includes('riesgo') || q.includes('risk')) {
      return '**Residentes en riesgo esta semana:**\n\n[CRITICAL] **Elena Morales** (Rm. 12) — Baja adherencia dietética correlacionada con deterioro GDS. Requiere revisión nutricional urgente.\n\n[WARNING] **Jorge Hernández** (Rm. 5) — Evaluación funcional de fisioterapia pendiente por 9 días.\n\n[WARNING] **Rosa Jiménez** (Rm. 8) — Descenso en dominio social WHOQOL. Se recomienda intervención grupal.'
    }
    if (q.includes('resumen') || q.includes('summary')) {
      return '**Resumen ejecutivo — Hoy:**\n\n• Ocupación: 87% (21/24 camas)\n• Índice de bienestar global: 76/100 (+4pts)\n• 7 alertas activas (2 críticas)\n• 8 profesionales en turno\n• Adherencia a protocolos: 91%\n\nTodos los indicadores en tendencia positiva excepto adherencia nutricional en 6 residentes.'
    }
    if (q.includes('plan') || q.includes('intervención')) {
      return '**Plan de intervención sugerido — Elena Morales:**\n\n> **Day 1-2:** Evaluación nutricional completa + ajuste de menú (proteína vegetal)\n> **Day 3-4:** Sesión psicológica individual (GDS follow-up)\n> **Day 5:** Evaluación funcional TUG con fisioterapia\n> **Day 6-7:** Revisión interdisciplinaria + ajuste de plan\n\n¿Desea que genere las órdenes correspondientes?'
    }
    return 'He procesado su consulta. Basándome en los datos actuales, puedo proporcionarle análisis detallados sobre cualquier residente, mtricas de operación, o generar planes de intervención personalizados. ¿Qué información específica necesita?'
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[199]" onClick={onClose} />
      )}

      {/* Panel */}
      <div className={`fixed top-0 right-0 bottom-0 w-[420px] max-w-full bg-white shadow-2xl z-[200] flex flex-col
        transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-900 to-indigo-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-white">AI Copilot</h2>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 pulse-dot" />
                <span className="text-[10px] text-white/50">Active · LongevAI Engine</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${msg.role === 'user' ? '' : ''}`}>
                <div className={`px-4 py-3 text-[13px] leading-relaxed whitespace-pre-line ${msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-2xl rounded-br-md'
                    : 'bg-slate-100 text-slate-700 rounded-2xl rounded-bl-md border border-slate-200'
                  }`}>
                  {msg.text.split('**').map((part, j) =>
                    j % 2 === 1 ? <strong key={j}>{part}</strong> : <span key={j}>{part}</span>
                  )}
                </div>
                <p className={`text-[10px] text-slate-400 mt-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 border border-slate-200">
                <div className="flex gap-1.5 items-center h-5">
                  <div className="w-2 h-2 rounded-full bg-slate-400 typing-1" />
                  <div className="w-2 h-2 rounded-full bg-slate-400 typing-2" />
                  <div className="w-2 h-2 rounded-full bg-slate-400 typing-3" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick prompts */}
        <div className="px-4 py-3 border-t border-slate-100 flex flex-wrap gap-2">
          {QUICK_PROMPTS.map(prompt => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] text-slate-600 
                hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all"
            >
              <Zap className="w-3 h-3 inline mr-1" />
              {prompt}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-slate-200 flex items-center gap-3 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder="Pregunta algo al Copilot..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-[13px] text-slate-700
              outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
          />
          <button
            onClick={() => sendMessage(input)}
            className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center
              transition-colors shadow-lg shadow-indigo-500/20 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  )
}
