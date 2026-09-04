/* ==========================================================================
   DevFun - Code Window Interactive Engine
   Handles Line Numbers, Alternating Row Striping, Clipboard Copying & Prism
   ========================================================================== */

(function () {
  'use strict';

  /**
   * Highlights code with Prism and wraps each line with line numbers & alternating row classes
   */
  function renderNumberedCodeLines(codeElement, rawCode, language) {
    if (!codeElement) return;

    // Save clean raw code for the copy button
    codeElement.dataset.rawCode = rawCode;

    // Run Prism highlighting to get tokenized HTML
    let highlightedHtml = rawCode;
    if (window.Prism && window.Prism.languages[language]) {
      highlightedHtml = window.Prism.highlight(rawCode, window.Prism.languages[language], language);
    } else {
      // Fallback escape
      highlightedHtml = rawCode
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    // Split highlighted HTML into individual lines
    const lines = highlightedHtml.split('\n');
    
    // Build numbered lines markup
    const linesHtml = lines.map((lineContent, index) => {
      const lineNum = index + 1;
      const content = lineContent === '' ? '&nbsp;' : lineContent;
      return `<div class="code-line"><span class="line-num">${lineNum}</span><span class="line-code">${content}</span></div>`;
    }).join('');

    codeElement.innerHTML = linesHtml;
  }

  // Clipboard Copy Logic (Copies raw unformatted code cleanly)
  function initCopyButtons() {
    document.querySelectorAll('.copy-code-btn').forEach((btn) => {
      if (btn.dataset.initialized) return;
      btn.dataset.initialized = 'true';

      btn.addEventListener('click', async () => {
        const windowContainer = btn.closest('.code-window');
        const codeElement = windowContainer ? windowContainer.querySelector('code') : null;
        if (!codeElement) return;

        // Get the pure raw code without line numbers
        let codeText = codeElement.dataset.rawCode;
        if (!codeText) {
          // Fallback: extract from .line-code spans
          const lineEls = codeElement.querySelectorAll('.line-code');
          if (lineEls.length > 0) {
            codeText = Array.from(lineEls).map(el => el.innerText).join('\n');
          } else {
            codeText = codeElement.innerText;
          }
        }

        try {
          await navigator.clipboard.writeText(codeText);
          showCopiedState(btn);
        } catch (err) {
          const textarea = document.createElement('textarea');
          textarea.value = codeText;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showCopiedState(btn);
        }
      });
    });
  }

  function showCopiedState(btn) {
    btn.classList.add('copied');
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span>Copied!</span>
    `;

    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
        <span>Copy code</span>
      `;
    }, 2000);
  }

  // Process all existing static code windows on the page
  function processAllCodeWindows() {
    document.querySelectorAll('.code-window').forEach((win) => {
      const codeEl = win.querySelector('code');
      if (codeEl && !codeEl.querySelector('.code-line')) {
        const langMatch = codeEl.className.match(/language-([a-z0-9_-]+)/i);
        const lang = langMatch ? langMatch[1] : 'text';
        const rawCode = codeEl.textContent.trim();
        renderNumberedCodeLines(codeEl, rawCode, lang);
      }
    });
  }

  // disable copy
  function disableCopy() {
    const b = document.getElementById('noCopy');
    if (b) {
      // disable copy
      b.addEventListener('copy', function(e) {
        e.preventDefault();
        e.clipboardData.setData('text/plain', 'Copying is not allowed for this lesson.');
      });

      // disable selection
      document.querySelectorAll('.code-window').forEach(el => {
        el.addEventListener('selectstart', function(e) {
          e.preventDefault();
        });
      });
    }
  }

  processAllCodeWindows();
  initCopyButtons();
  disableCopy();
})();
