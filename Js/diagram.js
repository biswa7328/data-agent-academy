/* ============================================
   EVOLVING DIAGRAM — SVG-based layered reveal
   ============================================ */

const EvolvingDiagram = {
  // Layer visibility state
  state: {
    layers: {
      runtime: false,
      tools: false,
      context: false,
      guardrails: false,
      evaluation: false,
      // Agent anatomy
      llm: false,
      reasoning: false,
      memory: false,
      agentTools: false,
      policies: false,
      agentContext: false,
      // Roles
      orchestrator: false,
      superAgent: false,
      utilityAgent: false,
      // Patterns
      sequential: false,
      conditional: false,
      loop: false,
      parallel: false,
      // ReAct
      think: false,
      act: false,
      observe: false
    }
  },

  // ── Module 01: Five-Layer Architecture ──────────────────────────────
  render(containerId, visibleLayers) {
    const container = document.getElementById(containerId);
    if (!container) return;

    visibleLayers.forEach(l => { this.state.layers[l] = true; });

    const layerOpacity = (key) => this.state.layers[key] ? 1 : 0.08;
    const layerStroke  = (key) => this.state.layers[key] ? 'var(--stroke-primary)' : 'var(--stroke-dim)';
    const layerFill    = (key) => this.state.layers[key] ? 'rgba(74,158,255,0.08)' : 'transparent';
    const glowFilter   = (key) => this.state.layers[key] ? 'drop-shadow(0 0 6px rgba(74,158,255,0.4))' : 'none';

    const svg = `
    <svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <text x="350" y="25" text-anchor="middle" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="11" letter-spacing="0.15em">ACMECORP DATA AGENT — ARCHITECTURE</text>
      <g style="opacity:${layerOpacity('evaluation')};transition:opacity 0.8s ease;filter:${glowFilter('evaluation')}">
        <rect x="20" y="40" width="660" height="340" rx="6" fill="${layerFill('evaluation')}" stroke="${layerStroke('evaluation')}" stroke-width="1.5" stroke-dasharray="8,4"/>
        <text x="40" y="60" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing="0.1em">L5: EVALUATION</text>
      </g>
      <g style="opacity:${layerOpacity('guardrails')};transition:opacity 0.8s ease;filter:${glowFilter('guardrails')}">
        <rect x="50" y="72" width="600" height="290" rx="5" fill="${layerFill('guardrails')}" stroke="${this.state.layers.guardrails ? '#f59e0b' : 'var(--stroke-dim)'}" stroke-width="1.5" stroke-dasharray="6,3"/>
        <text x="70" y="92" fill="#f59e0b" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing="0.1em">L4: GUARDRAILS</text>
      </g>
      <g style="opacity:${layerOpacity('context')};transition:opacity 0.8s ease;filter:${glowFilter('context')}">
        <rect x="80" y="104" width="540" height="240" rx="4" fill="${layerFill('context')}" stroke="${this.state.layers.context ? '#2dd4bf' : 'var(--stroke-dim)'}" stroke-width="1.5" stroke-dasharray="5,3"/>
        <text x="100" y="124" fill="#2dd4bf" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing="0.1em">L3: DATA &amp; CONTEXT (RAG)</text>
      </g>
      <g style="opacity:${layerOpacity('tools')};transition:opacity 0.8s ease;filter:${glowFilter('tools')}">
        <rect x="110" y="136" width="480" height="190" rx="4" fill="${layerFill('tools')}" stroke="${layerStroke('tools')}" stroke-width="1.5" stroke-dasharray="4,3"/>
        <text x="130" y="156" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing="0.1em">L2: TOOL LAYER</text>
        <g style="opacity:${layerOpacity('tools')};transition:opacity 0.6s ease 0.2s">
          <rect x="130" y="165" width="90" height="32" rx="3" fill="rgba(74,158,255,0.06)" stroke="var(--stroke-dim)" stroke-width="1"/>
          <text x="175" y="185" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="8">data_access</text>
        </g>
        <g style="opacity:${layerOpacity('tools')};transition:opacity 0.6s ease 0.3s">
          <rect x="230" y="165" width="90" height="32" rx="3" fill="rgba(74,158,255,0.06)" stroke="var(--stroke-dim)" stroke-width="1"/>
          <text x="275" y="185" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="8">transform</text>
        </g>
        <g style="opacity:${layerOpacity('tools')};transition:opacity 0.6s ease 0.4s">
          <rect x="330" y="165" width="90" height="32" rx="3" fill="rgba(74,158,255,0.06)" stroke="var(--stroke-dim)" stroke-width="1"/>
          <text x="375" y="185" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="8">external_api</text>
        </g>
        <g style="opacity:${layerOpacity('tools')};transition:opacity 0.6s ease 0.5s">
          <rect x="430" y="165" width="90" height="32" rx="3" fill="rgba(74,158,255,0.06)" stroke="var(--stroke-dim)" stroke-width="1"/>
          <text x="475" y="185" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="8">compute</text>
        </g>
      </g>
      <g style="opacity:${layerOpacity('runtime')};transition:opacity 0.8s ease;filter:${glowFilter('runtime')}">
        <rect x="160" y="210" width="380" height="100" rx="4" fill="rgba(74,158,255,0.1)" stroke="${layerStroke('runtime')}" stroke-width="2"/>
        <text x="180" y="232" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600" letter-spacing="0.1em">L1: AGENT RUNTIME</text>
        <rect x="180" y="245" width="70" height="28" rx="3" fill="rgba(74,158,255,0.08)" stroke="var(--stroke-dim)" stroke-width="1"/>
        <text x="215" y="263" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono, monospace" font-size="8">LLM</text>
        <rect x="260" y="245" width="85" height="28" rx="3" fill="rgba(74,158,255,0.08)" stroke="var(--stroke-dim)" stroke-width="1"/>
        <text x="302" y="263" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono, monospace" font-size="8">State Mgr</text>
        <rect x="355" y="245" width="75" height="28" rx="3" fill="rgba(74,158,255,0.08)" stroke="var(--stroke-dim)" stroke-width="1"/>
        <text x="392" y="263" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono, monospace" font-size="8">Memory</text>
        <rect x="440" y="245" width="80" height="28" rx="3" fill="rgba(74,158,255,0.08)" stroke="var(--stroke-dim)" stroke-width="1"/>
        <text x="480" y="263" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono, monospace" font-size="8">Orchestrator</text>
        <line x1="250" y1="259" x2="260" y2="259" stroke="var(--stroke-dim)" stroke-width="1" stroke-dasharray="3,2"/>
        <line x1="345" y1="259" x2="355" y2="259" stroke="var(--stroke-dim)" stroke-width="1" stroke-dasharray="3,2"/>
        <line x1="430" y1="259" x2="440" y2="259" stroke="var(--stroke-dim)" stroke-width="1" stroke-dasharray="3,2"/>
      </g>
      <g stroke="var(--stroke-dim)" stroke-width="0.5" opacity="0.4">
        <line x1="15" y1="40" x2="15" y2="380"/>
        <line x1="12" y1="40" x2="18" y2="40"/>
        <line x1="12" y1="380" x2="18" y2="380"/>
        <text x="10" y="215" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="7" text-anchor="middle" transform="rotate(-90,10,215)">FULL STACK</text>
      </g>
    </svg>`;

    container.innerHTML = `<div class="evolving-diagram__label">AcmeCorp Agent Blueprint</div>${svg}`;
  },

  // ── Module 02, Lesson 1: Agent Anatomy ──────────────────────────────
  renderAgentAnatomy(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const svg = `
    <svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;">
      <defs>
        <filter id="glow-anatomy">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <marker id="arr-anatomy" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#4a9eff"/>
        </marker>
      </defs>

      <text x="350" y="22" text-anchor="middle" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="11" letter-spacing="0.15em">ACMECORP DATA AGENT — 6-COMPONENT ANATOMY</text>

      <!-- Central LLM -->
      <rect x="270" y="170" width="160" height="70" rx="6" fill="rgba(74,158,255,0.15)" stroke="#4a9eff" stroke-width="2" filter="url(#glow-anatomy)"/>
      <text x="350" y="200" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700">LLM</text>
      <text x="350" y="218" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="9">Core Reasoning Engine</text>
      <text x="350" y="232" text-anchor="middle" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="8">interprets · plans · decides</text>

      <!-- Reasoning Graph (top) -->
      <rect x="255" y="50" width="190" height="52" rx="5" fill="rgba(45,212,191,0.08)" stroke="#2dd4bf" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="350" y="73" text-anchor="middle" fill="#2dd4bf" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">Reasoning Graph</text>
      <text x="350" y="90" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">LangGraph orchestration · workflow state</text>
      <line x1="350" y1="102" x2="350" y2="170" stroke="#2dd4bf" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr-anatomy)"/>

      <!-- Memory (top-right) -->
      <rect x="520" y="80" width="155" height="52" rx="5" fill="rgba(74,158,255,0.08)" stroke="#4a9eff" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="597" y="103" text-anchor="middle" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">Memory</text>
      <text x="597" y="119" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">short-term · long-term · episodic</text>
      <line x1="520" y1="110" x2="430" y2="185" stroke="#4a9eff" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr-anatomy)"/>

      <!-- Tools (right) -->
      <rect x="530" y="185" width="155" height="52" rx="5" fill="rgba(74,158,255,0.08)" stroke="#4a9eff" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="607" y="207" text-anchor="middle" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">Tools</text>
      <text x="607" y="223" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">SQL · API · compute · data access</text>
      <line x1="530" y1="211" x2="430" y2="211" stroke="#4a9eff" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr-anatomy)"/>

      <!-- Policies (bottom) -->
      <rect x="255" y="310" width="190" height="52" rx="5" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="350" y="333" text-anchor="middle" fill="#f59e0b" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">Policies</text>
      <text x="350" y="349" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">guardrails · RBAC · PII masking · limits</text>
      <line x1="350" y1="310" x2="350" y2="240" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr-anatomy)"/>

      <!-- Context (top-left) -->
      <rect x="25" y="80" width="155" height="52" rx="5" fill="rgba(45,212,191,0.08)" stroke="#2dd4bf" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="102" y="103" text-anchor="middle" fill="#2dd4bf" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">Context</text>
      <text x="102" y="119" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">RAG · schema · business rules</text>
      <line x1="180" y1="110" x2="270" y2="185" stroke="#2dd4bf" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr-anatomy)"/>

      <!-- Policies (left) -->
      <rect x="15" y="185" width="155" height="52" rx="5" fill="rgba(74,158,255,0.08)" stroke="#4a9eff" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="92" y="207" text-anchor="middle" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">Context Window</text>
      <text x="92" y="223" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">active prompt · history · instructions</text>
      <line x1="170" y1="211" x2="270" y2="211" stroke="#4a9eff" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr-anatomy)"/>

      <!-- Bottom label -->
      <text x="350" y="405" text-anchor="middle" fill="#2a5a8f" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="0.1em">LLM ORCHESTRATES ALL COMPONENTS · EACH ROLE IS DISTINCT</text>
    </svg>`;

    container.innerHTML = `<div class="evolving-diagram__label">Agent Anatomy Blueprint</div>${svg}`;
  },

  // ── Module 02, Lesson 2: Role Taxonomy ──────────────────────────────
  renderRoleTaxonomy(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const svg = `
    <svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;">
      <defs>
        <filter id="glow-role">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <marker id="arr-role" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#4a9eff"/>
        </marker>
        <marker id="arr-role-teal" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#2dd4bf"/>
        </marker>
        <marker id="arr-role-amber" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#f59e0b"/>
        </marker>
      </defs>

      <text x="350" y="22" text-anchor="middle" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="11" letter-spacing="0.15em">ACMECORP DATA AGENT — ROLE TAXONOMY</text>

      <!-- Orchestrator -->
      <rect x="225" y="45" width="250" height="80" rx="6" fill="rgba(74,158,255,0.12)" stroke="#4a9eff" stroke-width="2" filter="url(#glow-role)"/>
      <text x="350" y="75" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700">Orchestrator</text>
      <text x="350" y="93" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="9">Decomposes goals · delegates sub-tasks</text>
      <text x="350" y="108" text-anchor="middle" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="8">coordinates · monitors · aggregates results</text>

      <!-- Delegate arrows -->
      <line x1="290" y1="125" x2="185" y2="195" stroke="#4a9eff" stroke-width="1.5" marker-end="url(#arr-role)"/>
      <line x1="410" y1="125" x2="515" y2="195" stroke="#4a9eff" stroke-width="1.5" marker-end="url(#arr-role)"/>

      <!-- Delegate labels -->
      <text x="218" y="168" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">delegates</text>
      <text x="482" y="168" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">delegates</text>

      <!-- Super Agent -->
      <rect x="55" y="195" width="260" height="90" rx="5" fill="rgba(45,212,191,0.08)" stroke="#2dd4bf" stroke-width="1.5"/>
      <text x="185" y="224" text-anchor="middle" fill="#2dd4bf" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600">Super Agent</text>
      <text x="185" y="242" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="9">Cross-domain generalist</text>
      <text x="185" y="257" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">ambiguous requests · broad reasoning</text>
      <text x="185" y="271" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">multi-domain knowledge · flexible scope</text>

      <!-- Utility Agent -->
      <rect x="385" y="195" width="260" height="90" rx="5" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="515" y="224" text-anchor="middle" fill="#f59e0b" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600">Utility Agent</text>
      <text x="515" y="242" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="9">Single-purpose specialist</text>
      <text x="515" y="257" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">scoped permissions · targeted guardrails</text>
      <text x="515" y="271" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">fast · reliable · one task done well</text>

      <!-- Example boxes -->
      <rect x="70" y="310" width="230" height="36" rx="4" fill="rgba(45,212,191,0.05)" stroke="#2dd4bf" stroke-width="1" stroke-dasharray="4,2"/>
      <text x="185" y="325" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">e.g. "Generate a full sales report</text>
      <text x="185" y="338" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">with insights across all regions"</text>

      <rect x="400" y="310" width="230" height="36" rx="4" fill="rgba(245,158,11,0.05)" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4,2"/>
      <text x="515" y="325" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">e.g. "Run this SQL query and</text>
      <text x="515" y="338" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">return the result set"</text>

      <!-- Agent Cards label -->
      <text x="350" y="385" text-anchor="middle" fill="#2a5a8f" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="0.1em">EACH ROLE PUBLISHES AN AGENT CARD · CAPABILITIES · PERMISSIONS · ENDPOINTS</text>
    </svg>`;

    container.innerHTML = `<div class="evolving-diagram__label">Agent Role Taxonomy Blueprint</div>${svg}`;
  },

  // ── Module 02, Lesson 3: LangGraph Patterns ─────────────────────────
  renderLangGraphPatterns(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const svg = `
    <svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;">
      <defs>
        <filter id="glow-lg">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <marker id="arr-lg" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#4a9eff"/>
        </marker>
        <marker id="arr-lg-amber" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#f59e0b"/>
        </marker>
        <marker id="arr-lg-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#ef4444"/>
        </marker>
        <marker id="arr-lg-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#10b981"/>
        </marker>
        <marker id="arr-lg-teal" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#2dd4bf"/>
        </marker>
      </defs>

      <text x="350" y="22" text-anchor="middle" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="11" letter-spacing="0.15em">ACMECORP DATA AGENT — LANGGRAPH STATE MACHINE</text>

      <!-- Shared State Object -->
      <rect x="240" y="38" width="220" height="72" rx="5" fill="rgba(74,158,255,0.06)" stroke="#4a9eff" stroke-width="1.5" stroke-dasharray="6,3" filter="url(#glow-lg)"/>
      <text x="350" y="58" text-anchor="middle" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing="0.08em">SHARED STATE OBJECT</text>
      <text x="350" y="74" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">{ query, intent, sql, result,</text>
      <text x="350" y="88" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">  errors, retry_count, output }</text>
      <text x="350" y="102" text-anchor="middle" fill="#2dd4bf" font-family="JetBrains Mono, monospace" font-size="8">← nodes read &amp; write here →</text>

      <!-- Arrow state → parse_intent -->
      <line x1="350" y1="110" x2="350" y2="140" stroke="#4a9eff" stroke-width="1.5" marker-end="url(#arr-lg)"/>

      <!-- parse_intent node -->
      <rect x="270" y="140" width="160" height="38" rx="4" fill="rgba(74,158,255,0.08)" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="350" y="162" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono, monospace" font-size="10">parse_intent</text>

      <!-- Arrow parse_intent → conditional edge -->
      <line x1="350" y1="178" x2="350" y2="208" stroke="#4a9eff" stroke-width="1.5" marker-end="url(#arr-lg)"/>

      <!-- Conditional edge diamond -->
      <polygon points="350,208 390,228 350,248 310,228" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="350" y="232" text-anchor="middle" fill="#f59e0b" font-family="JetBrains Mono, monospace" font-size="8">route?</text>

      <!-- Left path: generate_sql -->
      <line x1="310" y1="228" x2="160" y2="228" stroke="#4a9eff" stroke-width="1.5" marker-end="url(#arr-lg)"/>
      <text x="235" y="220" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">data query</text>
      <rect x="60" y="210" width="100" height="36" rx="4" fill="rgba(74,158,255,0.08)" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="110" y="232" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono, monospace" font-size="9">generate_sql</text>

      <!-- generate_sql → validate -->
      <line x1="110" y1="246" x2="110" y2="285" stroke="#4a9eff" stroke-width="1.5" marker-end="url(#arr-lg)"/>
      <rect x="55" y="285" width="110" height="36" rx="4" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="110" y="307" text-anchor="middle" fill="#f59e0b" font-family="JetBrains Mono, monospace" font-size="9">validate_sql</text>

      <!-- retry loop arrow -->
      <path d="M 60 303 C 15 303, 15 228, 60 228" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr-lg-red)"/>
      <text x="28" y="268" text-anchor="middle" fill="#ef4444" font-family="JetBrains Mono, monospace" font-size="7">retry</text>

      <!-- validate → execute -->
      <line x1="165" y1="303" x2="240" y2="303" stroke="#10b981" stroke-width="1.5" marker-end="url(#arr-lg-green)"/>
      <text x="203" y="296" text-anchor="middle" fill="#10b981" font-family="JetBrains Mono, monospace" font-size="7">valid</text>
      <rect x="240" y="285" width="100" height="36" rx="4" fill="rgba(16,185,129,0.08)" stroke="#10b981" stroke-width="1.5"/>
      <text x="290" y="307" text-anchor="middle" fill="#10b981" font-family="JetBrains Mono, monospace" font-size="9">execute_query</text>

      <!-- Right path: report_generator -->
      <line x1="390" y1="228" x2="530" y2="228" stroke="#2dd4bf" stroke-width="1.5" marker-end="url(#arr-lg-teal)"/>
      <text x="460" y="220" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">report gen</text>
      <rect x="530" y="210" width="120" height="36" rx="4" fill="rgba(45,212,191,0.08)" stroke="#2dd4bf" stroke-width="1.5"/>
      <text x="590" y="232" text-anchor="middle" fill="#2dd4bf" font-family="JetBrains Mono, monospace" font-size="9">report_generator</text>

      <!-- Both paths → format_output -->
      <line x1="340" y1="321" x2="380" y2="355" stroke="#10b981" stroke-width="1.5" marker-end="url(#arr-lg-green)"/>
      <line x1="590" y1="246" x2="590" y2="340" stroke="#2dd4bf" stroke-width="1.5"/>
      <line x1="590" y1="340" x2="430" y2="355" stroke="#2dd4bf" stroke-width="1.5" marker-end="url(#arr-lg-teal)"/>
      <rect x="360" y="355" width="140" height="36" rx="4" fill="rgba(74,158,255,0.1)" stroke="#4a9eff" stroke-width="2"/>
      <text x="430" y="377" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono, monospace" font-size="10">format_output</text>

      <!-- Bottom label -->
      <text x="350" y="395" text-anchor="middle" fill="#2a5a8f" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="0.1em">CONDITIONAL EDGES ROUTE EXECUTION · STATE SHARED ACROSS ALL NODES</text>
    </svg>`;

    container.innerHTML = `<div class="evolving-diagram__label">LangGraph State Machine Blueprint</div>${svg}`;
  },

  // ── Module 02, Lesson 4: ReAct Loop ─────────────────────────────────
  renderReactLoop(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const svg = `
    <svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;">
      <defs>
        <filter id="glow-react">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <marker id="arr-react-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#4a9eff"/>
        </marker>
        <marker id="arr-react-amber" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#f59e0b"/>
        </marker>
        <marker id="arr-react-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#10b981"/>
        </marker>
      </defs>

      <text x="350" y="22" text-anchor="middle" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="11" letter-spacing="0.15em">ACMECORP DATA AGENT — REACT REASONING LOOP</text>

      <!-- User Query entry -->
      <rect x="275" y="40" width="150" height="38" rx="4" fill="rgba(74,158,255,0.06)" stroke="#4a9eff" stroke-width="1" stroke-dasharray="4,2"/>
      <text x="350" y="63" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="9">User Query</text>
      <line x1="350" y1="78" x2="350" y2="108" stroke="#4a9eff" stroke-width="1.5" marker-end="url(#arr-react-blue)"/>

      <!-- THINK -->
      <rect x="210" y="108" width="280" height="70" rx="6" fill="rgba(74,158,255,0.12)" stroke="#4a9eff" stroke-width="2" filter="url(#glow-react)"/>
      <text x="350" y="135" text-anchor="middle" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">THINK</text>
      <text x="350" y="152" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="9">Reason about what action is needed</text>
      <text x="350" y="168" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">"I need to discover schema before writing SQL"</text>

      <!-- THINK → ACT -->
      <line x1="490" y1="143" x2="560" y2="143" stroke="#4a9eff" stroke-width="1.5" marker-end="url(#arr-react-blue)"/>

      <!-- ACT -->
      <rect x="560" y="108" width="120" height="70" rx="6" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" stroke-width="2" filter="url(#glow-react)"/>
      <text x="620" y="135" text-anchor="middle" fill="#f59e0b" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">ACT</text>
      <text x="620" y="152" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="9">Call tool</text>
      <text x="620" y="168" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">emit JSON</text>

      <!-- ACT → OBSERVE (down) -->
      <line x1="620" y1="178" x2="620" y2="258" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#arr-react-amber)"/>

      <!-- OBSERVE -->
      <rect x="560" y="258" width="120" height="70" rx="6" fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="2" filter="url(#glow-react)"/>
      <text x="620" y="285" text-anchor="middle" fill="#10b981" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">OBSERVE</text>
      <text x="620" y="302" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="9">Examine result</text>
      <text x="620" y="318" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8">update state</text>

      <!-- OBSERVE → THINK (loop back) -->
      <line x1="560" y1="293" x2="490" y2="293" stroke="#10b981" stroke-width="1.5" marker-end="url(#arr-react-green)"/>
      <line x1="490" y1="293" x2="490" y2="143" stroke="#10b981" stroke-width="1.5" stroke-dasharray="5,3"/>
      <line x1="490" y1="143" x2="490" y2="143" stroke="#10b981" stroke-width="1.5"/>
      <text x="520" y="220" text-anchor="middle" fill="#10b981" font-family="JetBrains Mono, monospace" font-size="8">iterate</text>

      <!-- Done? decision -->
      <polygon points="350,258 400,280 350,302 300,280" fill="rgba(74,158,255,0.08)" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="350" y="284" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono, monospace" font-size="8">done?</text>

      <!-- THINK → done? -->
      <line x1="350" y1="178" x2="350" y2="258" stroke="#4a9eff" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-react-blue)"/>

      <!-- done? → Final Answer -->
      <line x1="350" y1="302" x2="350" y2="340" stroke="#4a9eff" stroke-width="1.5" marker-end="url(#arr-react-blue)"/>
      <rect x="235" y="340" width="230" height="38" rx="5" fill="rgba(45,212,191,0.1)" stroke="#2dd4bf" stroke-width="1.5"/>
      <text x="350" y="362" text-anchor="middle" fill="#2dd4bf" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600">Final Answer → User</text>

      <!-- Trace example (left side) -->
      <rect x="20" y="108" width="175" height="220" rx="5" fill="rgba(74,158,255,0.03)" stroke="#1e3a5f" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="107" y="128" text-anchor="middle" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="8" letter-spacing="0.05em">ACMECORP TRACE</text>
      <text x="30" y="150" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="7.5">① THINK: discover schema</text>
      <text x="30" y="167" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="7.5">① ACT: get_schema(sales)</text>
      <text x="30" y="184" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="7.5">① OBSERVE: 9 cols found</text>
      <text x="30" y="207" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="7.5">② THINK: write SQL query</text>
      <text x="30" y="224" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="7.5">② ACT: validate_sql(...)</text>
      <text x="30" y="241" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="7.5">② OBSERVE: valid ✓</text>
      <text x="30" y="264" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="7.5">③ THINK: execute query</text>
      <text x="30" y="281" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="7.5">③ ACT: run_query(sql)</text>
      <text x="30" y="298" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="7.5">③ OBSERVE: 847 rows</text>
      <text x="30" y="315" fill="#2dd4bf" font-family="JetBrains Mono, monospace" font-size="7.5">→ done: format &amp; return</text>

      <!-- Bottom label -->
      <text x="350" y="395" text-anchor="middle" fill="#2a5a8f" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="0.1em">THINK → ACT → OBSERVE · REPEAT UNTIL DONE · SELF-CORRECTING BY DESIGN</text>
    </svg>`;

    container.innerHTML = `<div class="evolving-diagram__label">ReAct Loop Blueprint</div>${svg}`;
  },

  // ── Router ───────────────────────────────────────────────────────────
  renderForPage(containerId, pageId) {
    // Module 02 pages get topic-specific diagrams
    if (pageId === 'agent-anatomy') {
      return this.renderAgentAnatomy(containerId);
    }
    if (pageId === 'role-taxonomy') {
      return this.renderRoleTaxonomy(containerId);
    }
    if (pageId === 'langgraph-patterns') {
      return this.renderLangGraphPatterns(containerId);
    }
    if (pageId === 'react-loop') {
      return this.renderReactLoop(containerId);
    }

    // Module 01 pages — 5-layer architecture diagram
    const layerMap = {
      'five-layer-arch':       ['runtime', 'tools', 'context', 'guardrails', 'evaluation'],
      'tool-definitions':      ['runtime', 'tools', 'context', 'guardrails', 'evaluation'],
      'error-handling':        ['runtime', 'tools', 'context', 'guardrails', 'evaluation'],
      'tool-calling':          ['runtime', 'tools', 'context', 'guardrails', 'evaluation'],
    };

    Object.keys(this.state.layers).forEach(k => { this.state.layers[k] = false; });
    this.render(containerId, layerMap[pageId] || []);
  }
};
