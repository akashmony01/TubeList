/*
 * TubeList — content script
 * ============================================================================
 * The browser runs this file on every youtube.com page. Its jobs:
 *   1. Notice when you are on the YouTube home page, and show the TubeList
 *      panel there (the feed is hidden underneath).
 *   2. Notice when you move to another page, and take the panel away.
 *   3. Apply your distraction-hiding switches (Shorts, sidebar, ...).
 *
 * The panel is built inside a "Shadow DOM": a sealed box on the page where
 * YouTube's styles can't reach in and ours can't leak out.
 *
 * How hiding works: this script only adds "switch" classes to the page's
 * <html> element (e.g. tubelist-hide-shorts). The actual hiding rules are in
 * content/youtube-selectors.css.
 */
(() => {
  'use strict';

  // ===== YouTube-specific bits ===============================================
  // These depend on how YouTube works internally. If YouTube changes, look
  // here and in content/youtube-selectors.css.

  // YouTube is a "single-page app": clicking the logo or Back doesn't load a
  // fresh page, it just swaps the content. When it finishes swapping, it
  // fires this event, which we listen for.
  const YT_NAVIGATE_EVENT = 'yt-navigate-finish';

  // The home page is simply youtube.com/ (its path is "/").
  function isHomePage() {
    return location.pathname === '/';
  }

  // ===== Names we use ========================================================
  const HOST_ID = 'tubelist-host';           // the element holding the panel
  const OPEN_CLASS = 'tubelist-panel-open';  // on <html> while the panel shows

  // Each switch in the popup turns one class on <html> on or off.
  const SWITCH_CLASSES = {
    hideShorts: 'tubelist-hide-shorts',
    hideSidebar: 'tubelist-hide-sidebar',
    hideEndCards: 'tubelist-hide-endcards',
    hideHomeFeed: 'tubelist-hide-home-feed',
  };

  // The keyboard shortcut opens YouTube with this at the end of the address,
  // meaning "put the cursor in the add box".
  const FOCUS_ADD_HASH = '#tubelist-add';

  // ===== State ===============================================================
  // Becomes true when you click "Go to normal YouTube". It resets the next
  // time you navigate (e.g. click the YouTube logo), so the panel comes back.
  let dismissed = false;
  let settings = TubeListSettings.DEFAULTS; // replaced once loaded
  let focusAddBoxPending = location.hash === FOCUS_ADD_HASH;

  // Parts of the panel, once it has been built.
  let host = null;
  let addInput = null;
  let messageEl = null;
  let topicList = null;
  let topics = null; // your saved topics (null until loaded)

  // ===== Show or hide things =================================================
  // Called whenever the page might have changed. It's cheap, so it's also
  // called regularly as a safety check.
  function update() {
    const root = document.documentElement;
    const show = isHomePage() && !dismissed;

    // youtube-selectors.css reacts to these classes.
    root.classList.toggle(OPEN_CLASS, show);
    for (const [name, className] of Object.entries(SWITCH_CLASSES)) {
      root.classList.toggle(className, Boolean(settings[name]));
    }

    if (show && document.body) {
      try {
        buildPanel();
      } catch (error) {
        // Safety net: if the panel ever fails to build (for example after a
        // YouTube change), give you normal YouTube back instead of a blank page.
        console.error('TubeList: could not show the panel', error);
        root.classList.remove(OPEN_CLASS);
      }
    }
  }

  function dismiss() {
    dismissed = true;
    update();
  }

  // ===== Build the panel (only once) =========================================
  function buildPanel() {
    if (host && host.isConnected) return; // already on the page

    host = document.createElement('div');
    host.id = HOST_ID;
    const shadow = host.attachShadow({ mode: 'open' });

    // Load our panel styles inside the sealed box.
    const styles = el('link', {
      rel: 'stylesheet',
      href: chrome.runtime.getURL('content/panel.css'),
    });

    // The "add a topic" box.
    addInput = el('input', {
      class: 'add-input',
      type: 'text',
      placeholder: 'Add a topic you want to explore…',
      maxlength: String(TubeListTopics.MAX_LENGTH),
      autocomplete: 'off',
      'aria-label': 'New topic',
    });
    const addForm = el('form', { class: 'add' }, [
      addInput,
      el('button', { class: 'btn btn-primary', type: 'submit' }, ['Add']),
    ]);
    connectAddForm(addForm, addInput, showMessage);

    messageEl = el('p', { class: 'message', role: 'status' });
    const listEl = el('ul', { class: 'topics' });
    const emptyEl = el('p', { class: 'empty', hidden: '' }, [
      'Your list is empty. Add your first topic above.',
    ]);

    const panel = el('div', { class: 'panel' }, [
      el('div', { class: 'inner' }, [
        el('header', { class: 'header' }, [
          el('div', {}, [
            el('h1', { class: 'title' }, ['TubeList']),
            el('p', { class: 'subtitle' }, ['What do you want to learn today?']),
          ]),
          el('button', { class: 'btn escape', type: 'button', onclick: dismiss }, [
            'Go to normal YouTube',
          ]),
        ]),
        addForm,
        messageEl,
        listEl,
        emptyEl,
      ]),
    ]);

    // While you type in the panel, don't let YouTube treat your key presses
    // as its own keyboard shortcuts.
    for (const type of ['keydown', 'keypress', 'keyup']) {
      panel.addEventListener(type, (event) => {
        if (event.target.matches('input')) event.stopPropagation();
      });
    }

    topicList = createTopicList({ listEl, emptyEl, showMessage, renderLabel: topicLink });
    if (topics) topicList.setTopics(topics);

    shadow.append(styles, panel);
    document.body.append(host);

    if (focusAddBoxPending) {
      focusAddBoxPending = false;
      focusAddBox();
    }
  }

  function showMessage(text) {
    if (messageEl) messageEl.textContent = text;
  }

  // A topic in the panel: a link that opens YouTube search for it.
  // Because it's a normal link, middle-click / Ctrl+click opens a new tab.
  function topicLink(topic) {
    return el('a', { class: 'topic', href: searchUrl(topic.text) }, [
      searchIcon(),
      el('span', { class: 'topic-text' }, [topic.text]),
    ]);
  }

  function searchUrl(text) {
    return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(text);
  }

  // A small magnifying-glass icon, drawn as SVG.
  function searchIcon() {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'topic-icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('aria-hidden', 'true');
    const circle = document.createElementNS(ns, 'circle');
    circle.setAttribute('cx', '10');
    circle.setAttribute('cy', '10');
    circle.setAttribute('r', '6');
    const line = document.createElementNS(ns, 'path');
    line.setAttribute('d', 'M15 15l5 5');
    svg.append(circle, line);
    return svg;
  }

  // (The el(), createTopicList() and connectAddForm() helpers used above
  // live in the shared/ folder.)

  // ===== Keyboard shortcut: put the cursor in the add box ====================
  // A new tab may still be loading when the panel appears, so try a few
  // times — but never take the cursor away from something you clicked.
  function focusAddBox() {
    for (const delay of [0, 250, 750, 1500, 3000]) {
      setTimeout(() => {
        const nothingFocused =
          !document.activeElement || document.activeElement === document.body;
        if (nothingFocused && addInput && addInput.isConnected) {
          addInput.focus();
        }
      }, delay);
    }
  }

  // ===== Watch for page changes ==============================================
  let lastUrl = location.href;

  function onNavigate() {
    lastUrl = location.href;
    dismissed = false; // a new navigation brings the panel back on Home
    update();
  }

  // Main signal: YouTube's own "page changed" event.
  document.addEventListener(YT_NAVIGATE_EVENT, onNavigate);

  // Fallback and safety check, twice a second: catch page changes even if
  // YouTube renames that event, and put our classes/panel back if YouTube
  // ever removed them. These are tiny, cheap checks.
  setInterval(() => {
    if (location.href !== lastUrl) {
      onNavigate();
    } else {
      update();
    }
  }, 500);

  // ===== Your topics and switches ============================================
  // Load your saved topics and switches, and react whenever they change
  // (for example when you edit them in the toolbar popup).
  TubeListTopics.load().then((saved) => {
    topics = saved;
    if (topicList) topicList.setTopics(topics);
  });
  TubeListTopics.onChange((newTopics) => {
    topics = newTopics;
    if (topicList) topicList.setTopics(topics);
  });

  TubeListSettings.load().then((saved) => {
    settings = saved;
    update();
  });
  TubeListSettings.onChange((newSettings) => {
    settings = newSettings;
    update();
  });

  // ===== Start ===============================================================
  // This script runs very early, before the page is built. Adding the classes
  // now (with all switches ON until your settings load) means hidden things
  // never flash on screen.
  update();
  // Then build the panel as soon as the page's <body> exists.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', update);
  }
})();
