import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const CodeLabPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('main.py');

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0d1117] text-[#c9d1d9] font-mono p-4 gap-4 overflow-hidden animate-slideUp">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#161b22] border border-[#30363d] rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 px-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <h2 className="text-sm font-semibold tracking-wide text-zinc-300">Davidious AI Code Lab Workspace</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-500">Autosaved just now</span>
          <button className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded transition-colors shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            Run Code
          </button>
        </div>
      </div>

      {/* Main IDE Area */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-[#161b22] border border-[#30363d] rounded-lg flex flex-col overflow-hidden shadow-lg hidden md:flex">
          <div className="p-3 border-b border-[#30363d] text-xs font-bold uppercase tracking-wider text-zinc-400">
            Explorer
          </div>
          <div className="p-2 flex-1 overflow-y-auto space-y-1">
            <div
              className={`px-3 py-1.5 text-sm rounded cursor-pointer transition-colors ${activeTab === 'main.py' ? 'bg-[#1f6feb] text-white' : 'hover:bg-[#21262d]'}`}
              onClick={() => setActiveTab('main.py')}
            >
              <span className="text-blue-400 mr-2"></span> main.py
            </div>
            <div
              className={`px-3 py-1.5 text-sm rounded cursor-pointer transition-colors ${activeTab === 'utils.py' ? 'bg-[#1f6feb] text-white' : 'hover:bg-[#21262d]'}`}
              onClick={() => setActiveTab('utils.py')}
            >
              <span className="text-blue-400 mr-2"></span> utils.py
            </div>
            <div
              className={`px-3 py-1.5 text-sm rounded cursor-pointer transition-colors ${activeTab === 'config.json' ? 'bg-[#1f6feb] text-white' : 'hover:bg-[#21262d]'}`}
              onClick={() => setActiveTab('config.json')}
            >
              <span className="text-yellow-400 mr-2"></span> config.json
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Code Editor Placeholder */}
          <div className="flex-1 bg-[#161b22] border border-[#30363d] rounded-lg flex flex-col shadow-lg overflow-hidden">
            <div className="flex bg-[#0d1117] border-b border-[#30363d] px-2 pt-2">
              <div className="px-4 py-2 bg-[#161b22] border-t border-l border-r border-[#30363d] rounded-t-md text-sm text-[#c9d1d9] flex items-center gap-2">
                <span className="text-blue-400"></span> {activeTab}
              </div>
            </div>
            <div className="p-4 flex-1 overflow-auto text-sm leading-relaxed" style={{ fontFamily: '"Fira Code", "JetBrains Mono", monospace' }}>
              {activeTab === 'main.py' && (
                <pre>
                  <code className="text-[#8b949e]"># Welcome {user?.full_name || user?.email} to your Sandbox!</code>{'\n'}
                  <code className="text-[#ff7b72]">import</code> <code className="text-[#79c0ff]">os</code>{'\n'}
                  <code className="text-[#ff7b72]">import</code> <code className="text-[#79c0ff]">davidious_ai</code>{'\n'}
                  {'\n'}
                  <code className="text-[#ff7b72]">def</code> <code className="text-[#d2a8ff]">main</code>():{'\n'}
                  {'    '}model <code className="text-[#ff7b72]">=</code> davidious_ai.<code className="text-[#d2a8ff]">load_model</code>(<code className="text-[#a5d6ff]">'gpt-sandbox'</code>){'\n'}
                  {'    '}<code className="text-[#ff7b72]">print</code>(<code className="text-[#a5d6ff]">f"AI Environment initialized successfully for {user?.email}!"</code>){'\n'}
                  {'\n'}
                  <code className="text-[#ff7b72]">if</code> __name__ <code className="text-[#ff7b72]">==</code> <code className="text-[#a5d6ff]">"__main__"</code>:{'\n'}
                  {'    '}<code className="text-[#d2a8ff]">main</code>()
                </pre>
              )}
              {activeTab === 'utils.py' && (
                <pre>
                  <code className="text-[#ff7b72]">def</code> <code className="text-[#d2a8ff]">helper_function</code>():{'\n'}
                  {'    '}<code className="text-[#ff7b72]">return</code> <code className="text-[#a5d6ff]">"Ready to assist."</code>
                </pre>
              )}
              {activeTab === 'config.json' && (
                <pre className="text-[#a5d6ff]">
                  {`{
  "theme": "dark",
  "ai_assistance": true,
  "auto_save": true
}`}
                </pre>
              )}
            </div>
          </div>

          {/* Terminal Area */}
          <div className="h-48 bg-[#0d1117] border border-[#30363d] rounded-lg p-3 font-mono text-xs shadow-lg overflow-y-auto">
            <div className="text-zinc-500 mb-2">Terminal - Local Workspace</div>
            <div className="text-zinc-300">
              <span className="text-emerald-400">davidious@sandbox:~$</span> python main.py
            </div>
            <div className="text-zinc-400 mt-1">
              Initializing AI Environment...<br />
              Loading 'gpt-sandbox' weights... Done.<br />
              <span className="text-emerald-400">AI Environment initialized successfully for {user?.email}!</span>
            </div>
            <div className="text-zinc-300 mt-2">
              <span className="text-emerald-400">davidious@sandbox:~$</span> <span className="animate-pulse">_</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
