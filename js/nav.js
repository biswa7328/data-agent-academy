/* ============================================
   NAVIGATION — Data Agent Academy
   ============================================ */

const Nav = {
  initScrollReveal() {
    // Only animate elements that are below the fold
    const allReveal = document.querySelectorAll('.reveal, .draw-line, .unfold, .node-appear, .stagger-children');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Only animate below-fold elements
          if (entry.target.classList.contains('reveal')) {
            const rect = entry.target.getBoundingClientRect();
            if (rect.top > 100) {
              entry.target.classList.add('animate-on-scroll');
            }
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    allReveal.forEach(el => observer.observe(el));

    // Immediately mark everything already in viewport as visible
    allReveal.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('visible');
    });
  },

  initCollapsibles() {
    document.querySelectorAll('.collapsible__header').forEach(header => {
      header.addEventListener('click', () => header.parentElement.classList.toggle('open'));
    });
  },

  initScrollProgress() {
    if (typeof Progress !== 'undefined') Progress.updateProgressBar();
  },

  initCompletionTrigger(pageId) {
    if (!pageId || typeof Progress === 'undefined') return;
    const pageNav = document.querySelector('.page-nav');
    if (!pageNav) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          Progress.markCompleted(pageId);
          Progress.updateProgressBar();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(pageNav);
  },

  initBadgePopovers() {
    let activePop = null;
    let activeBadge = null;

    function closePopover() {
      if (activePop) { activePop.remove(); activePop = null; activeBadge = null; }
    }

    document.querySelectorAll('.badge[data-tip]').forEach(function(badge) {
      badge.addEventListener('click', function(e) {
        e.stopPropagation();
        if (activeBadge === this) { closePopover(); return; }
        closePopover();

        // Build popover
        const pop = document.createElement('div');
        pop.className = 'tag-popover';
        if (this.classList.contains('badge--teal'))  pop.classList.add('badge--teal');
        if (this.classList.contains('badge--amber')) pop.classList.add('badge--amber');
        if (this.classList.contains('badge--green')) pop.classList.add('badge--green');
        pop.innerHTML = '<div class="tag-popover__title">' + this.textContent.trim() + '</div>' + this.dataset.tip;
        pop.addEventListener('click', ev => ev.stopPropagation());

        // Append to body with fixed positioning — never clipped
        document.body.appendChild(pop);
        activePop = pop;
        activeBadge = this;

        // Position it
        const badgeRect = this.getBoundingClientRect();
        const pw = 280;
        let left = badgeRect.left + badgeRect.width / 2 - pw / 2;
        if (left < 8) left = 8;
        if (left + pw > window.innerWidth - 8) left = window.innerWidth - pw - 8;

        const ph = pop.offsetHeight;
        const spaceAbove = badgeRect.top;
        const spaceBelow = window.innerHeight - badgeRect.bottom;

        pop.style.left = left + 'px';
        pop.style.width = pw + 'px';

        if (spaceAbove > ph + 20 || spaceAbove > spaceBelow) {
          pop.style.top = (badgeRect.top - ph - 10) + 'px';
        } else {
          pop.style.top = (badgeRect.bottom + 10) + 'px';
        }
      });
    });

    document.addEventListener('click', closePopover);
    window.addEventListener('scroll', closePopover, { passive: true });
    window.addEventListener('resize', closePopover, { passive: true });
  },

  init(pageId) {
    const run = () => {
      this.initScrollReveal();
      this.initCollapsibles();
      this.initScrollProgress();
      this.initCompletionTrigger(pageId);
      this.initBadgePopovers();
      document.querySelector('.page-content')?.classList.add('page-enter');
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
  }
};
