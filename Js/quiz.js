/* ============================================
   QUIZ ENGINE — MCQ, True/False, Scenario
   ============================================ */

const QuizEngine = {
  activeQuizzes: {},

  init(containerId, questions) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const state = {
      questions,
      answers: {},
      submitted: false,
      containerId
    };
    this.activeQuizzes[containerId] = state;
    this.render(state);
  },

  render(state) {
    const container = document.getElementById(state.containerId);
    let html = '';

    state.questions.forEach((q, qIdx) => {
      html += `
        <div class="quiz-block reveal" id="quiz-q-${qIdx}">
          <div class="quiz-block__question">
            <span class="quiz-block__question-number">Q${qIdx + 1}.</span>
            ${q.question}
          </div>
          <div class="quiz-block__options">
      `;

      q.options.forEach((opt, oIdx) => {
        const letter = String.fromCharCode(65 + oIdx);
        const isSelected = state.answers[qIdx] === oIdx;
        const classes = ['quiz-option'];

        if (state.submitted) {
          if (oIdx === q.correct) classes.push('correct');
          else if (isSelected && oIdx !== q.correct) classes.push('incorrect');
        } else if (isSelected) {
          classes.push('selected');
        }

        html += `
          <div class="${classes.join(' ')}"
               onclick="QuizEngine.selectAnswer('${state.containerId}', ${qIdx}, ${oIdx})"
               role="button" tabindex="0">
            <span class="quiz-option__marker">${letter}</span>
            <span>${opt}</span>
          </div>
        `;
      });

      html += '</div>';

      // Feedback area
      if (state.submitted) {
        const isCorrect = state.answers[qIdx] === q.correct;
        html += `
          <div class="quiz-block__feedback show quiz-block__feedback--${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect ? '&#10003; Correct!' : '&#10007; Incorrect.'} ${q.explanation || ''}
          </div>
        `;
      }

      html += '</div>';
    });

    // Submit / Results
    if (!state.submitted) {
      const allAnswered = Object.keys(state.answers).length === state.questions.length;
      html += `
        <div style="text-align: center; margin-top: var(--space-8);">
          <button class="btn btn--primary btn--large ${allAnswered ? '' : 'btn--disabled'}"
                  onclick="QuizEngine.submit('${state.containerId}')">
            Check Answers
          </button>
        </div>
      `;
    } else {
      const score = this.getScore(state);
      html += `
        <div class="score-card reveal">
          <div class="score-card__value">${score.correct}/${score.total}</div>
          <div class="score-card__label">Questions Correct</div>
          <div style="margin-top: var(--space-4); color: var(--text-secondary);">
            ${score.percent >= 80 ? 'Excellent understanding!' :
              score.percent >= 60 ? 'Good foundation — review highlighted areas.' :
              'Consider revisiting the material above.'}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;

    // Trigger reveal animations
    requestAnimationFrame(() => {
      container.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    });
  },

  selectAnswer(containerId, qIdx, oIdx) {
    const state = this.activeQuizzes[containerId];
    if (!state || state.submitted) return;
    state.answers[qIdx] = oIdx;
    this.render(state);
  },

  submit(containerId) {
    const state = this.activeQuizzes[containerId];
    if (!state) return;
    if (Object.keys(state.answers).length < state.questions.length) return;
    state.submitted = true;
    this.render(state);

    // Save score
    const score = this.getScore(state);
    Progress.saveQuizScore(containerId, score.correct, score.total);
    Progress.updateProgressBar();
  },

  getScore(state) {
    let correct = 0;
    state.questions.forEach((q, idx) => {
      if (state.answers[idx] === q.correct) correct++;
    });
    return {
      correct,
      total: state.questions.length,
      percent: Math.round((correct / state.questions.length) * 100)
    };
  }
};
