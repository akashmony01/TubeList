/*
 * TubeList — toolbar popup logic
 * ============================================================================
 * Shows your topics (add / edit / delete) and the distraction-hiding
 * switches. The list behaviour itself is shared with the YouTube panel and
 * lives in shared/topic-list.js.
 */
(() => {
  'use strict';

  const message = document.getElementById('message');
  const addInput = document.getElementById('add-input');

  function showMessage(text) {
    message.textContent = text;
  }

  // ===== Your topics =========================================================
  connectAddForm(document.getElementById('add-form'), addInput, showMessage);

  const topicList = createTopicList({
    listEl: document.getElementById('topic-list'),
    emptyEl: document.getElementById('empty'),
    showMessage,
    // In the popup, a topic is just its text (long ones end in "…").
    renderLabel: (topic) => el('span', { class: 'text', title: topic.text }, [topic.text]),
  });

  TubeListTopics.load().then(topicList.setTopics);
  TubeListTopics.onChange(topicList.setTopics);

  // ===== Hide-distraction switches ===========================================
  const switches = document.querySelectorAll('.switch');

  function showSwitches(settings) {
    for (const input of switches) {
      input.checked = Boolean(settings[input.dataset.setting]);
    }
  }

  for (const input of switches) {
    input.addEventListener('change', () => {
      TubeListSettings.set(input.dataset.setting, input.checked);
    });
  }

  TubeListSettings.load().then(showSwitches);
  TubeListSettings.onChange(showSwitches);

  // Ready to type a new topic as soon as the popup opens.
  addInput.focus();
})();
