/* ============================================
   NAVIGATION & SCROLL OBSERVER
   ============================================ */

// Mark body as JS-loaded IMMEDIATELY so animations can safely hide elements
document.body.classList.add('js-loaded');

const Nav = {
  initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal, .draw-line, .unfold, .node-appear, .stagger-children').forEach(el => {
      observer.observe(el);
    });

    // Force-reveal anything already in view after a short delay
    setTimeout(() => {
      document.querySelectorAll('.reveal, .node-appear').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) el.classList.add('visible');
      });
    }, 100);
  },

  initCollapsibles() {
    document.querySelectorAll('.collapsible__header').forEach(header => {
      header.addEventListener('click', () => header.parentElement.classList.toggle('open'));
    });
  },

  initScrollProgress() {
    const bar = document.querySelector('.progress-bar__fill');
    if (!bar) return;
    Progress.updateProgressBar();
  },

  initCompletionTrigger(pageId) {
    if (!pageId) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          Progress.markCompleted(pageId);
          Progress.updateProgressBar();
        }
      });
    }, { threshold: 0.5 });
    const pageNav = document.querySelector('.page-nav');
    if (pageNav) observer.observe(pageNav);
  },

  initBadgePopovers() {
    let activeBadge = null, activePop = null;
    function closePopover() {
      if (activePop) { activePop.remove(); activePop = null; activeBadge = null; }
    }
    document.querySelectorAll('.badge[data-tip]').forEach(function(badge) {
      badge.addEventListener('click', function(e) {
        e.stopPropagation();
        if (activeBadge === this) { closePopover(); return; }
        closePopover();
        var pop = document.createElement('div');
        pop.className = 'tag-popover';
        pop.innerHTML = '<div class="tag-popover__title">' + this.textContent + '</div>' + this.dataset.tip;
        pop.addEventListener('click', ev => ev.stopPropagation());
        this.appendChild(pop);
        activePop = pop; activeBadge = this;
      });
    });
    document.addEventListener('click', closePopover);
  },

  init(pageId) {
    // Run immediately if DOM is ready, otherwise wait
    const run = () => {
      this.initScrollReveal();
      this.initCollapsibles();
      this.initScrollProgress();
      this.initCompletionTrigger(pageId);
      this.initBadgePopovers();
      const content = document.querySelector('.page-content');
      if (content) content.classList.add('page-enter');
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run(); // DOM already ready
    }
  }
};
