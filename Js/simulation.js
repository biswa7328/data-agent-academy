/* ============================================
   SIMULATION ENGINE — Flowchart Decision Trees
   ============================================ */

const SimulationEngine = {
  active: null,

  init(containerId, config) {
    const container = document.getElementById(containerId);
    if (!container) return;

    this.active = {
      containerId,
      config,        // { title, intro, nodes }
      currentNode: 'start',
      history: [],
      choices: {}
    };

    this.render();
  },

  render() {
    const { containerId, config, currentNode, history } = this.active;
    const container = document.getElementById(containerId);
    const node = config.nodes[currentNode];

    if (!node) return;

    let html = '';

    // History trail
    if (history.length > 0) {
      html += '<div class="sim-history">';
      history.forEach((h, idx) => {
        const pastNode = config.nodes[h.nodeId];
        html += `
          <div class="sim-history__step reveal visible">
            <div class="sim-history__step-label">Step ${idx + 1}</div>
            <div class="sim-history__step-title">${pastNode.title}</div>
            <div class="sim-history__step-choice ${h.wasGood ? 'good' : 'bad'}">
              Your choice: ${h.choiceLabel}
            </div>
          </div>
        `;
      });
      html += '</div>';
    }

    // Current node
    html += `
      <div class="sim-current reveal">
        <h3 style="color: var(--text-primary); margin-bottom: var(--space-3);">${node.title}</h3>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-6); line-height: 1.7;">${node.description}</p>
    `;

    if (node.type === 'decision') {
      html += '<div class="sim-choices">';
      node.choices.forEach((choice, idx) => {
        html += `
          <div class="sim-node" onclick="SimulationEngine.choose(${idx})" role="button" tabindex="0">
            <div style="font-family: var(--font-mono); font-size: var(--font-sm); color: var(--stroke-primary); margin-bottom: var(--space-2);">
              Option ${String.fromCharCode(65 + idx)}
            </div>
            <div style="color: var(--text-primary); font-size: var(--font-base);">${choice.label}</div>
            ${choice.hint ? `<div style="color: var(--text-secondary); font-size: var(--font-xs); margin-top: var(--space-2);">${choice.hint}</div>` : ''}
          </div>
        `;
      });
      html += '</div>';
    } else if (node.type === 'consequence') {
      const isGood = node.isGood !== false;
      html += `
        <div class="callout ${isGood ? '' : 'callout--error'}">
          <div class="callout__label">${isGood ? '&#10003; Good Choice' : '&#10007; Consequence'}</div>
          <div class="callout__text">${node.consequence}</div>
        </div>
      `;
      if (node.next) {
        html += `
          <div style="text-align: center; margin-top: var(--space-6);">
            <button class="btn btn--primary" onclick="SimulationEngine.goTo('${node.next}')">
              Continue &rarr;
            </button>
          </div>
        `;
      }
    } else if (node.type === 'result') {
      html += `
        <div class="score-card">
          <div class="score-card__value">${node.score || ''}</div>
          <div class="score-card__label">${node.scoreLabel || 'Simulation Complete'}</div>
        </div>
        <div style="color: var(--text-secondary); line-height: 1.7; margin-top: var(--space-4);">${node.summary || ''}</div>
      `;
    }

    html += '</div>';
    container.innerHTML = html;

    // Animate
    requestAnimationFrame(() => {
      container.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    });

    // Scroll to current
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },

  choose(choiceIdx) {
    const { config, currentNode } = this.active;
    const node = config.nodes[currentNode];
    const choice = node.choices[choiceIdx];

    this.active.history.push({
      nodeId: currentNode,
      choiceIdx,
      choiceLabel: choice.label,
      wasGood: choice.isGood !== false
    });

    this.active.choices[currentNode] = choiceIdx;
    this.active.currentNode = choice.next;
    this.render();
  },

  goTo(nodeId) {
    this.active.currentNode = nodeId;
    this.render();
  },

  reset() {
    if (!this.active) return;
    this.active.currentNode = 'start';
    this.active.history = [];
    this.active.choices = {};
    this.render();
  }
};

/* --- Styles injected for simulation --- */
const simStyles = document.createElement('style');
simStyles.textContent = `
  .sim-history {
    margin-bottom: var(--space-8);
    padding-left: var(--space-4);
    border-left: 2px dashed var(--stroke-dim);
  }
  .sim-history__step {
    padding: var(--space-3) var(--space-4);
    margin-bottom: var(--space-3);
    background: var(--bg-surface);
    border-radius: var(--border-radius);
  }
  .sim-history__step-label {
    font-family: var(--font-mono);
    font-size: var(--font-xs);
    color: var(--stroke-primary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .sim-history__step-title {
    color: var(--text-primary);
    font-size: var(--font-sm);
    margin: var(--space-1) 0;
  }
  .sim-history__step-choice {
    font-size: var(--font-xs);
    font-family: var(--font-mono);
  }
  .sim-history__step-choice.good { color: var(--accent-success); }
  .sim-history__step-choice.bad { color: var(--accent-error); }

  .sim-current {
    background: var(--bg-surface);
    border: 1px dashed var(--stroke-primary);
    border-radius: var(--border-radius-lg);
    padding: var(--space-8);
  }
  .sim-choices {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-4);
  }
`;
document.head.appendChild(simStyles);
