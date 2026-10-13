(() => {
  const navToggle = document.querySelector('.menu-toggle');
  const navLinks = document.getElementById('site-nav-links');
  const yearNode = document.getElementById('year');

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.getAttribute('data-open') === 'true';
      navLinks.setAttribute('data-open', String(!isOpen));
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.setAttribute('data-open', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const searchInput = document.getElementById('resource-search');
  const topicFilter = document.getElementById('topic-filter');
  const resourceGrid = document.getElementById('resource-grid');
  const resources = resourceGrid ? [...resourceGrid.querySelectorAll('.resource-card')] : [];
  const status = document.getElementById('library-status');
  const loading = document.getElementById('library-loading');
  const emptyState = document.getElementById('library-empty');
  const clearFilters = document.getElementById('clear-filters');

  const filterResources = () => {
    if (!searchInput || !topicFilter || !resourceGrid || !status || !loading || !emptyState) {
      return;
    }

    try {
      loading.hidden = false;
      const query = searchInput.value.trim().toLowerCase();
      const topic = topicFilter.value;

      window.setTimeout(() => {
        let visibleCount = 0;

        resources.forEach((card) => {
          const topicMatch = topic === 'all' || card.dataset.topic === topic;
          const text = card.textContent ? card.textContent.toLowerCase() : '';
          const queryMatch = text.includes(query);
          const shouldShow = topicMatch && queryMatch;
          card.hidden = !shouldShow;
          if (shouldShow) {
            visibleCount += 1;
          }
        });

        loading.hidden = true;

        if (visibleCount === 0) {
          emptyState.hidden = false;
          status.textContent = 'No resources match your current filters.';
        } else {
          emptyState.hidden = true;
          status.textContent = `${visibleCount} resource${visibleCount > 1 ? 's' : ''} shown.`;
        }
      }, 120);
    } catch (_error) {
      loading.hidden = true;
      if (status) {
        status.textContent = 'Something went wrong while filtering. Please try again.';
      }
    }
  };

  if (searchInput && topicFilter) {
    searchInput.addEventListener('input', filterResources);
    topicFilter.addEventListener('change', filterResources);
    filterResources();
  }

  if (clearFilters && searchInput && topicFilter) {
    clearFilters.addEventListener('click', () => {
      searchInput.value = '';
      topicFilter.value = 'all';
      filterResources();
      searchInput.focus();
    });
  }

  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!(form instanceof HTMLFormElement)) {
        return;
      }

      if (!form.checkValidity()) {
        formFeedback.textContent = 'Please complete all required fields with valid information.';
        formFeedback.style.color = '#9d1f1f';
        form.reportValidity();
        return;
      }

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`,
      );

      const mailto = `mailto:?subject=${encodeURIComponent(
        `[The Midnight Cry] ${subject}`,
      )}&body=${body}`;

      formFeedback.textContent = 'Opening your email app to send this message.';
      formFeedback.style.color = '#1f4f26';
      window.location.href = mailto;
    });
  }
})();
