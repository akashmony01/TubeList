/*
 * TubeList — the editable topic list (shared by the panel and the popup)
 * ============================================================================
 * Both the YouTube panel and the toolbar popup show your topics with Edit and
 * Delete buttons, and both have an "add a topic" box. This file holds that
 * shared behaviour so the two always work the same way.
 * (It uses el() from shared/dom.js and TubeListTopics from shared/topics.js.)
 */

/*
 * Draws your topics into `listEl`, each with Edit and Delete buttons.
 *   emptyEl      a note shown when the list is empty
 *   showMessage  function to show a short note, e.g. "Already in your list."
 *   renderLabel  function(topic) that returns how the topic itself looks
 *                (a search link in the panel, plain text in the popup)
 * Returns an object with setTopics(list) to (re)draw the list.
 */
function createTopicList({ listEl, emptyEl, showMessage, renderLabel }) {
  let topics = null;      // null until loaded
  let editingId = null;   // the topic currently being edited, if any

  function setTopics(newTopics) {
    topics = newTopics;
    render();
  }

  function render() {
    const list = topics || [];
    listEl.replaceChildren(...list.map((topic) =>
      topic.id === editingId ? editRow(topic) : normalRow(topic)
    ));
    // Only say "empty" once we've actually loaded the list.
    emptyEl.hidden = topics === null || list.length > 0;
  }

  // A topic with its Edit and Delete buttons.
  function normalRow(topic) {
    return el('li', { class: 'row' }, [
      renderLabel(topic),
      el('span', { class: 'actions' }, [
        el('button', {
          class: 'btn btn-small',
          type: 'button',
          'aria-label': `Edit "${topic.text}"`,
          onclick: () => startEditing(topic.id),
        }, ['Edit']),
        el('button', {
          class: 'btn btn-small btn-danger',
          type: 'button',
          'aria-label': `Delete "${topic.text}"`,
          onclick: () => {
            showMessage('');
            TubeListTopics.remove(topic.id);
          },
        }, ['Delete']),
      ]),
    ]);
  }

  // A topic being edited: a text box with Save and Cancel.
  // Enter saves, Escape cancels.
  function editRow(topic) {
    const input = el('input', {
      class: 'edit-input',
      type: 'text',
      maxlength: String(TubeListTopics.MAX_LENGTH),
      'aria-label': 'Edit topic',
    });
    input.value = topic.text;
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault(); // in the popup, Escape would close it
        stopEditing();
      }
    });

    const form = el('form', {
      class: 'row edit-row',
      onsubmit: async (event) => {
        event.preventDefault(); // don't reload the page
        const result = await TubeListTopics.rename(topic.id, input.value);
        if (result.ok) {
          stopEditing();
        } else {
          showMessage(result.message);
        }
      },
    }, [
      input,
      el('button', { class: 'btn btn-small btn-primary', type: 'submit' }, ['Save']),
      el('button', { class: 'btn btn-small', type: 'button', onclick: stopEditing }, ['Cancel']),
    ]);
    return el('li', {}, [form]);
  }

  function startEditing(id) {
    editingId = id;
    showMessage('');
    render();
    // Put the cursor in the edit box, with the old text selected.
    const input = listEl.querySelector('.edit-input');
    if (input) {
      input.focus();
      input.select();
    }
  }

  function stopEditing() {
    editingId = null;
    showMessage('');
    render();
  }

  return { setTopics };
}

/*
 * Connects an "add a topic" form: pressing Enter or clicking Add saves the
 * text as a new topic at the top of the list, or shows why it couldn't.
 */
function connectAddForm(form, input, showMessage) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // don't reload the page
    const result = await TubeListTopics.add(input.value);
    if (result.ok) {
      input.value = '';
      showMessage('');
    } else {
      showMessage(result.message);
    }
    input.focus();
  });
}
