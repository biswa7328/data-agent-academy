/* ============================================
   NAVIGATION & SCROLL OBSERVER
   ============================================ */

const Nav = {
  // Scroll-reveal observer
  initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .draw-line, .unfold, .node-appear, .stagger-children').forEach(el => {
      observer.observe(el);
    });
  },

  // Collapsible toggles
  initCollapsibles() {
    document.querySelectorAll('.collapsible__header').forEach(header => {
      header.addEventListener('click', () => {
        header.parentElement.classList.toggle('open');
      });
    });
  },

  // Page scroll progress (within current page)
  initScrollProgress() {
    const bar = document.querySelector('.progress-bar__fill');
    if (!bar) return;

    // Use module progress, not scroll progress
    Progress.updateProgressBar();
  },

  // Mark current page complete when reaching bottom
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

  // Clickable badge popovers
  initBadgePopovers() {
    let activeBadge = null;
    let activePop = null;

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
        pop.addEventListener('click', function(ev) { ev.stopPropagation(); });
        this.appendChild(pop);
        activePop = pop;
        activeBadge = this;
      });
    });

    document.addEventListener('click', closePopover);
  },

  // Initialize everything
  init(pageId) {
    document.addEventListener('DOMContentLoaded', () => {
      this.initScrollReveal();
      this.initCollapsibles();
      this.initScrollProgress();
      this.initCompletionTrigger(pageId);
      this.initBadgePopovers();

      // Page enter animation
      const content = document.querySelector('.page-content');
      if (content) content.classList.add('page-enter');
    });
  }
};
