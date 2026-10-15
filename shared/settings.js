/*
 * TubeList — the distraction-hiding switches (saving and loading)
 * ============================================================================
 * Used by the popup (where you flip the switches) and by the YouTube pages
 * (which hide things according to the switches).
 * Saved in the browser's extension storage, like your topics.
 */
const TubeListSettings = (() => {
  const STORAGE_KEY = 'settings';

  // All switches are ON the first time.
  const DEFAULTS = {
    hideShorts: true,    // Hide Shorts everywhere
    hideSidebar: true,   // Hide recommended videos next to the video you watch
    hideEndCards: true,  // Hide the suggestion cards at the end of videos
    hideHomeFeed: true,  // Hide the home feed (also after "Go to normal YouTube")
  };

  async function load() {
    const data = await chrome.storage.local.get(STORAGE_KEY);
    return { ...DEFAULTS, ...data[STORAGE_KEY] };
  }

  async function set(name, value) {
    const settings = await load();
    settings[name] = value;
    await chrome.storage.local.set({ [STORAGE_KEY]: settings });
  }

  // Run `callback(newSettings)` whenever a switch is flipped.
  function onChange(callback) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes[STORAGE_KEY]) {
        callback({ ...DEFAULTS, ...changes[STORAGE_KEY].newValue });
      }
    });
  }

  return { DEFAULTS, load, set, onChange };
})();
