/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Server, 
  Database, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  Terminal, 
  ArrowRight, 
  Cpu, 
  Code2, 
  FileText,
  Activity
} from 'lucide-react';
import { fetchHealthStatus } from './services/api.js';
import { HealthStatus } from './types/index.js';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'roadmap' | 'health'>('overview');
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loadingHealth, setLoadingHealth] = useState(true);

  useEffect(() => {
    fetchHealthStatus()
      .then((data) => {
        setHealth(data);
      })
      .finally(() => setLoadingHealth(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              AetherChat AI
            </h1>
            <p className="text-xs text-indigo-400 font-mono">Phase 0: Foundation Architecture</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-1 bg-slate-800/60 p-1 rounded-xl border border-slate-700/50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'architecture'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Architecture
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'roadmap'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Roadmap Checklist
          </button>
          <button
            onClick={() => setActiveTab('health')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
              activeTab === 'health'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Activity className="h-4 w-4" />
            <span>Health & Status</span>
          </button>
        </nav>

        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2"></span>
            Server Ready
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Hero Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/60 border border-indigo-500/20 p-8 md:p-12 shadow-2xl">
              <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase tracking-wider">
                  <span>Phase 0 Completed Successfully</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                  Professional Full-Stack AI Chatbot Foundation
                </h2>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                  The robust architectural foundation for AetherChat has been successfully established with TypeScript, Express.js backend, MongoDB Mongoose ODM schemas, secure JWT authentication middleware, Zod validation, and Google Gemini API integration readiness.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab('architecture')}
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2"
                  >
                    <span>Explore Architecture</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('roadmap')}
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium border border-slate-700 transition-all"
                  >
                    View Roadmap
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3 hover:border-indigo-500/40 transition-all shadow-lg">
                <div className="h-12 w-12 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">Express & TypeScript Backend</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Modular Express server with centralized error handling, environment validation, CORS, cookie parser, and Vite middleware integration.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3 hover:border-purple-500/40 transition-all shadow-lg">
                <div className="h-12 w-12 rounded-xl bg-purple-600/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">MongoDB & Mongoose Ready</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Pre-configured Mongoose models for User, Conversation, and Message with graceful foundation mode fallbacks.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3 hover:border-pink-500/40 transition-all shadow-lg">
                <div className="h-12 w-12 rounded-xl bg-pink-600/10 text-pink-400 flex items-center justify-center border border-pink-500/20">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">Secure Auth & Zod Validation</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  JWT authentication middleware with secure HTTP-only cookies, password hashing with bcryptjs, and strict Zod request validators.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-indigo-600/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                  <Layers className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">System Architecture & Directory Structure</h3>
                  <p className="text-sm text-slate-400">Clean, scalable separation of frontend and backend concerns.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-indigo-400 font-bold text-sm mb-3 flex items-center space-x-2">
                    <Code2 className="h-4 w-4" />
                    <span>Backend Structure (/server/src)</span>
                  </div>
                  <div className="text-slate-300 space-y-1">
                    <div>├── <span className="text-purple-400">config/</span> (db.ts, env.ts)</div>
                    <div>├── <span className="text-purple-400">models/</span> (User.ts, Conversation.ts, Message.ts)</div>
                    <div>├── <span className="text-purple-400">controllers/</span> (auth.controller.ts, chat.controller.ts)</div>
                    <div>├── <span className="text-purple-400">routes/</span> (auth.routes.ts, chat.routes.ts, health.routes.ts)</div>
                    <div>├── <span className="text-purple-400">middleware/</span> (auth.middleware.ts, errorHandler.middleware.ts)</div>
                    <div>└── <span className="text-purple-400">validators/</span> (auth.validator.ts)</div>
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-pink-400 font-bold text-sm mb-3 flex items-center space-x-2">
                    <Cpu className="h-4 w-4" />
                    <span>Frontend Structure (/src)</span>
                  </div>
                  <div className="text-slate-300 space-y-1">
                    <div>├── <span className="text-purple-400">components/</span> (Reusable UI widgets)</div>
                    <div>├── <span className="text-purple-400">pages/</span> (Chat, Dashboard, Auth views)</div>
                    <div>├── <span className="text-purple-400">layouts/</span> (MainLayout, AuthLayout)</div>
                    <div>├── <span className="text-purple-400">hooks/</span> (Custom React hooks)</div>
                    <div>├── <span className="text-purple-400">services/</span> (API clients & Gemini wrapper)</div>
                    <div>├── <span className="text-purple-400">types/</span> (TypeScript interfaces)</div>
                    <div>└── <span className="text-purple-400">utils/</span> (Formatters & helpers)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-600/10 text-purple-400 rounded-xl border border-purple-500/20">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Project Roadmap & Checklist</h3>
                  <p className="text-sm text-slate-400">Phased execution plan for AetherChat AI.</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { phase: 'Phase 0: Foundation', status: 'Implemented & Verified', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                  { phase: 'Phase 1: UI/UX and application shell', status: 'Planned', badge: 'bg-slate-800 text-slate-400 border-slate-700' },
                  { phase: 'Phase 2: Database and authentication', status: 'Planned', badge: 'bg-slate-800 text-slate-400 border-slate-700' },
                  { phase: 'Phase 3: Core AI chatbot & Gemini API', status: 'Planned', badge: 'bg-slate-800 text-slate-400 border-slate-700' },
                  { phase: 'Phase 4: Conversation and chat history', status: 'Planned', badge: 'bg-slate-800 text-slate-400 border-slate-700' },
                  { phase: 'Phase 5: Advanced chat experience', status: 'Planned', badge: 'bg-slate-800 text-slate-400 border-slate-700' },
                  { phase: 'Phase 6: Real-time features', status: 'Planned', badge: 'bg-slate-800 text-slate-400 border-slate-700' },
                  { phase: 'Phase 7: Personalization and feedback', status: 'Planned', badge: 'bg-slate-800 text-slate-400 border-slate-700' },
                  { phase: 'Phase 8: Admin dashboard and analytics', status: 'Planned', badge: 'bg-slate-800 text-slate-400 border-slate-700' },
                  { phase: 'Phase 9: Security, testing and deployment', status: 'Planned', badge: 'bg-slate-800 text-slate-400 border-slate-700' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all">
                    <div className="flex items-center space-x-3">
                      {idx === 0 ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-slate-700 flex items-center justify-center text-xs text-slate-500 font-mono">
                          {idx}
                        </div>
                      )}
                      <span className="font-medium text-slate-200">{item.phase}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${item.badge}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-600/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Backend Health & API Status</h3>
                  <p className="text-sm text-slate-400">Real-time status check from /api/health endpoint.</p>
                </div>
              </div>

              {loadingHealth ? (
                <div className="p-8 text-center text-slate-400 font-mono animate-pulse">Checking server health...</div>
              ) : health ? (
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 font-mono text-sm">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-emerald-400 font-bold uppercase">{health.status}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="text-slate-400">Database:</span>
                    <span className="text-indigo-400">{health.database}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="text-slate-400">Uptime:</span>
                    <span className="text-slate-200">{health.uptime.toFixed(2)} seconds</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Timestamp:</span>
                    <span className="text-slate-200">{health.timestamp}</span>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm">
                  Unable to connect to backend health endpoint. Ensure the dev server is running.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/40 py-6 px-6 text-center text-xs text-slate-500">
        <p>© 2026 AetherChat AI Platform. Phase 0 Foundation successfully established.</p>
      </footer>
    </div>
  );
}
