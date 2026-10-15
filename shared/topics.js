/*
 * TubeList — your topic list (saving and loading)
 * ============================================================================
 * Used by both the YouTube panel and the toolbar popup, so they always agree.
 *
 * Your topics are saved with the browser's extension storage
 * (chrome.storage.local). They stay inside your browser on this computer and
 * are never sent anywhere.
 *
 * Each topic is saved like this:  { id: "a-unique-id", text: "Video editing basics" }
 * The list is saved newest first.
 */
const TubeListTopics = (() => {
  const STORAGE_KEY = 'topics';
  const MAX_LENGTH = 200; // longest topic allowed, in characters

  // What a brand-new list starts with, so the panel isn't empty the first
  // time. You can delete these.
  const STARTER_TOPICS = ['Video editing basics', 'How to build a browser extension'];

  // Tidy up typed text: remove extra spaces and cut very long text.
  function clean(text) {
    return String(text).replace(/\s+/g, ' ').trim().slice(0, MAX_LENGTH);
  }

  // "Python" and "python" count as the same topic.
  function sameText(a, b) {
    return a.toLowerCase() === b.toLowerCase();
  }

  function newId() {
    return crypto.randomUUID();
  }

  // Get the saved list. The very first time, save the starter topics.
  async function load() {
    const data = await chrome.storage.local.get(STORAGE_KEY);
    const saved = data[STORAGE_KEY];
    if (Array.isArray(saved)) return saved;

    const starter = STARTER_TOPICS.map((text) => ({ id: newId(), text }));
    await save(starter);
    return starter;
  }

  async function save(topics) {
    await chrome.storage.local.set({ [STORAGE_KEY]: topics });
  }

  // Add a topic at the top of the list.
  // Returns { ok: true } or { ok: false, message: "why not" }.
  async function add(text) {
    const value = clean(text);
    if (!value) return { ok: false, message: 'Type a topic first.' };

    const topics = await load();
    if (topics.some((t) => sameText(t.text, value))) {
      return { ok: false, message: 'Already in your list.' };
    }
    topics.unshift({ id: newId(), text: value });
    await save(topics);
    return { ok: true };
  }

  // Change the text of an existing topic.
  async function rename(id, text) {
    const value = clean(text);
    if (!value) return { ok: false, message: 'A topic can\'t be empty.' };

    const topics = await load();
    const topic = topics.find((t) => t.id === id);
    if (!topic) return { ok: false, message: 'That topic no longer exists.' };
    if (topics.some((t) => t.id !== id && sameText(t.text, value))) {
      return { ok: false, message: 'Already in your list.' };
    }
    topic.text = value;
    await save(topics);
    return { ok: true };
  }

  async function remove(id) {
    const topics = await load();
    await save(topics.filter((t) => t.id !== id));
  }

  // Run `callback(newList)` whenever the list changes anywhere
  // (in the popup, in the panel, or in another YouTube tab).
  function onChange(callback) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes[STORAGE_KEY]) {
        callback(changes[STORAGE_KEY].newValue || []);
      }
    });
  }

  return { MAX_LENGTH, load, add, rename, remove, onChange };
})();
