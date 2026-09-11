/* ============================================
   PROGRESS TRACKER — localStorage-based
   ============================================ */

const Progress = {
  STORAGE_KEY: 'dataAgentAcademy_progress',

  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  },

  save(data) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  },

  markCompleted(pageId) {
    const data = this.getAll();
    if (!data.completed) data.completed = [];
    if (!data.completed.includes(pageId)) {
      data.completed.push(pageId);
    }
    data.lastVisited = pageId;
    data.lastTimestamp = Date.now();
    this.save(data);
  },

  isCompleted(pageId) {
    const data = this.getAll();
    return (data.completed || []).includes(pageId);
  },

  getCompletedCount() {
    const data = this.getAll();
    return (data.completed || []).length;
  },

  saveQuizScore(quizId, score, total) {
    const data = this.getAll();
    if (!data.quizScores) data.quizScores = {};
    data.quizScores[quizId] = { score, total, timestamp: Date.now() };
    this.save(data);
  },

  getQuizScore(quizId) {
    const data = this.getAll();
    return (data.quizScores || {})[quizId] || null;
  },

  saveSimulationChoice(simId, choices) {
    const data = this.getAll();
    if (!data.simulations) data.simulations = {};
    data.simulations[simId] = { choices, timestamp: Date.now() };
    this.save(data);
  },

  reset() {
    localStorage.removeItem(this.STORAGE_KEY);
  },

  // Module 01: Architecture Foundation
  MODULE_01_PAGES: [
    'm1-five-layer-arch',
    'm1-tool-definitions',
    'm1-error-handling',
    'm1-tool-calling',
    'm1-sim-build-layers',
    'm1-framework-landscape',
    'm1-alternative-reasoning',
    'm1-advanced-tool-use'
  ],

  // Module 02: Agent Anatomy
  MODULE_02_PAGES: [
    'm02-agent-anatomy',
    'm02-role-taxonomy',
    'm02-sim-guardrails',
    'm02-langgraph-patterns',
    'm02-react-loop',
    'm02-quiz-final'
  ],

// Module 03: Persona Design
  MODULE_03_PAGES: [
    'm03-personas',
    'm03-guardrails-personas',
    'm03-hitl-patterns',
    'm03-sim-persona',
    'm03-quiz-final'
  ],

  // Module 04: Autonomy & Collaboration
  MODULE_04_PAGES: [
    'm04-goal-decomposition',
    'm04-multi-agent',
    'm04-memory-systems',
    'm04-state-failure',
    'm04-sim-orchestration',
    'm04-quiz-final'
  ],

  // Module 05: AgentOps — CI/CD & Evaluation Gates
  MODULE_05_PAGES: [
    'm05-observability',
    'm05-testing-evaluation',
    'm05-cicd-eval-gates',
    'm05-deployment-versioning',
    'm05-sim-eval-gates',
    'm05-quiz-final'
  ],

  // Module 06: Context Engineering & RAG
  MODULE_06_PAGES: ['m06-context-engineering', 'm06-rag-architecture', 'm06-retrieval-strategies', 'm06-agentic-rag', 'm06-sim-rag-pipeline', 'm06-quiz-final'],

  // Module 07: Interoperability Protocols
  MODULE_07_PAGES: ['m07-mcp-protocol', 'm07-a2a-protocol', 'm07-aaif-governance', 'm07-sim-protocol-selection', 'm07-quiz-final'],

  // Module 08: Security & Compliance
  MODULE_08_PAGES: ['m08-agent-security', 'm08-data-privacy', 'm08-security-implementation', 'm08-sim-security-incident', 'm08-quiz-final'],

  // Module 09: Cost Optimization
  MODULE_09_PAGES: ['m09-cost-economics', 'm09-optimization-strategies', 'm09-financial-guardrails', 'm09-sim-cost-optimization', 'm09-quiz-final'],

  // Module 10: Semantic Layer & Agent UX
  MODULE_10_PAGES: ['m10-semantic-layer', 'm10-agent-ux', 'm10-data-quality', 'm10-sim-query-design', 'm10-quiz-final'],

  // All pages across all modules
  ALL_PAGES() {
    return [...this.MODULE_01_PAGES, ...this.MODULE_02_PAGES, ...this.MODULE_03_PAGES, ...this.MODULE_04_PAGES, ...this.MODULE_05_PAGES, ...this.MODULE_06_PAGES, ...this.MODULE_07_PAGES, ...this.MODULE_08_PAGES, ...this.MODULE_09_PAGES, ...this.MODULE_10_PAGES];
  },

  getModuleProgress(modulePages) {
    const total = modulePages.length;
    const completed = modulePages.filter(p => this.isCompleted(p)).length;
    return { completed, total, percent: Math.round((completed / total) * 100) };
  },

  getModule01Progress() {
    return this.getModuleProgress(this.MODULE_01_PAGES);
  },

  getModule02Progress() {
    return this.getModuleProgress(this.MODULE_02_PAGES);
  },

  // Legacy combined progress
  getModule1Progress() {
    return this.getModuleProgress(this.MODULE_1_PAGES);
  },

  getModule03Progress() {
    return this.getModuleProgress(this.MODULE_03_PAGES);
  },

  getModule04Progress() {
    return this.getModuleProgress(this.MODULE_04_PAGES);
  },

  getModule05Progress() {
    return this.getModuleProgress(this.MODULE_05_PAGES);
  },

  getModule06Progress() { return this.getModuleProgress(this.MODULE_06_PAGES); },
  getModule07Progress() { return this.getModuleProgress(this.MODULE_07_PAGES); },
  getModule08Progress() { return this.getModuleProgress(this.MODULE_08_PAGES); },
  getModule09Progress() { return this.getModuleProgress(this.MODULE_09_PAGES); },
  getModule10Progress() { return this.getModuleProgress(this.MODULE_10_PAGES); },

  getOverallProgress() {
    const all = this.ALL_PAGES();
    return this.getModuleProgress(all);
  },

  // Update the progress bar in the nav
  updateProgressBar() {
    const bar = document.querySelector('.progress-bar__fill');
    if (!bar) return;
    const { percent } = this.getOverallProgress();
    bar.style.width = percent + '%';
  }
};

// Auto-update progress bar on page load
document.addEventListener('DOMContentLoaded', () => {
  Progress.updateProgressBar();
});
