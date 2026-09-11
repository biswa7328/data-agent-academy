/* ============================================
   NAVIGATION & SCROLL OBSERVER
   ============================================ */

// Mark body as JS-loaded IMMEDIATELY
document.body.classList.add('js-loaded');

const Nav = {
  initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll('.reveal, .draw-line, .unfold, .node-appear, .stagger-children').forEach(el => {
      observer.observe(el);
    });

    // Force-reveal anything already in viewport
    setTimeout(() => {
      document.querySelectorAll('.reveal, .node-appear, .stagger-children').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 50) el.classList.add('visible');
      });
    }, 50);
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
    // Append popover to BODY with fixed positioning — never clipped by any parent
    let activePop = null;
    let activeBadge = null;

    function closePopover() {
      if (activePop) { activePop.remove(); activePop = null; activeBadge = null; }
    }

    function positionPopover(pop, badge) {
      const rect = badge.getBoundingClientRect();
      const popWidth = 280;
      let left = rect.left + rect.width / 2 - popWidth / 2;
      let top = rect.top - 10; // will be adjusted after measuring

      // Keep within viewport horizontally
      if (left < 8) left = 8;
      if (left + popWidth > window.innerWidth - 8) left = window.innerWidth - popWidth - 8;

      // Position above badge first, then check if it fits
      pop.style.left = left + 'px';
      pop.style.top = '0px';
      pop.style.visibility = 'hidden';
      pop.style.display = 'block';
      document.body.appendChild(pop);

      const popHeight = pop.offsetHeight;
      pop.style.visibility = '';

      if (rect.top - popHeight - 16 > 0) {
        // Show above
        pop.style.top = (rect.top + window.scrollY - popHeight - 12) + 'px';
        pop.style.position = 'fixed';
        pop.style.top = (rect.top - popHeight - 12) + 'px';
      } else {
        // Show below
        pop.style.top = (rect.bottom + 12) + 'px';
      }
    }

    document.querySelectorAll('.badge[data-tip]').forEach(function(badge) {
      badge.addEventListener('click', function(e) {
        e.stopPropagation();
        if (activeBadge === this) { closePopover(); return; }
        closePopover();

        const pop = document.createElement('div');
        pop.className = 'tag-popover';

        // Inherit colour variant from badge
        if (this.classList.contains('badge--teal'))  pop.classList.add('badge--teal');
        if (this.classList.contains('badge--amber')) pop.classList.add('badge--amber');
        if (this.classList.contains('badge--green')) pop.classList.add('badge--green');

        pop.innerHTML = '<div class="tag-popover__title">' + this.textContent.trim() + '</div>' + this.dataset.tip;
        pop.addEventListener('click', ev => ev.stopPropagation());

        activePop = pop;
        activeBadge = this;
        positionPopover(pop, this);
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
      const content = document.querySelector('.page-content');
      if (content) content.classList.add('page-enter');
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
  }
};
