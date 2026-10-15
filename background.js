/*
 * TubeList — background script
 * ============================================================================
 * Runs quietly in the background. Its only job: when you press the TubeList
 * keyboard shortcut (Alt+Shift+Y by default), open a new YouTube tab.
 *
 * The "#tubelist-add" at the end of the address tells the panel to put the
 * cursor in the "add a topic" box, so you can start typing right away.
 */
chrome.commands.onCommand.addListener((command) => {
  if (command === 'open-tubelist') {
    chrome.tabs.create({ url: 'https://www.youtube.com/#tubelist-add' });
  }
});
