# TubeList — Project Plan & Progress

This file tracks what we're building, what's done, and what's been tested.

**Legend:** `[ ]` not started · `[~]` built, waiting for your test · `[x]` done and tested by you

---

## Goal

Make free time on YouTube intentional. When you open YouTube's home page,
show **your own list of topics** instead of the algorithm's feed. Click a
topic → YouTube searches for it → you start watching.

**Main flow to keep smooth:** open YouTube → see my list → click a topic → watch.

## Decisions (agreed)

| Topic | Decision |
|---|---|
| Name | TubeList |
| Extension type | Manifest V3 |
| Code | Plain JavaScript, HTML, CSS. No frameworks, no build tools. |
| Browsers | Chrome, Brave, Edge (priority) + Firefox. Safari out of scope. |
| Your setup | Linux; uses Chrome, Brave, Edge and Firefox |
| Project folder | `/home/mhmd1/Documents/TubeList` |
| Data | Stored only in the browser's extension storage. No server, no account, no tracking, no network requests. |
| License | MIT, copyright `akashmony01` |
| Default shortcut | **Alt+Shift+Y** (Ctrl+Shift+Caps Lock isn't allowed by browsers) |
| "Go to normal YouTube" | Hides the panel until you navigate again (e.g. click the YouTube logo, or come back to Home), then the panel returns. |
| Topic order | New topics are added at the **top** of the list |
| Clicking a topic | Opens the search in the **same tab** (middle-click / Ctrl+click still opens a new tab) |
| "Hide the home feed" switch OFF | Panel still shows; after "Go to normal YouTube" you see the normal feed. When ON, Home stays empty even after dismissing. |
| Duplicate topics | Blocked with a short "Already in your list" note (ignores capital letters) |
| Where to manage topics | Both: the toolbar popup **and** the YouTube panel (edit/delete buttons appear on hover) |
| First-time list | Starts with 2 example topics you can delete |
| YouTube selectors | All in `content/youtube-selectors.css` (+ a marked section at the top of `content/content.js`) |

## Stages

### Stage 1 — Panel on the home page (sample list)
- [x] Full-page panel appears on youtube.com home, feed hidden underneath
- [~] Panel also appears when clicking the YouTube logo / going back to Home (no reload)
- [~] Panel disappears on other pages (videos, search, channels)
- [~] Clicking a topic opens YouTube search for it
- [~] "Go to normal YouTube" button dismisses the panel
- [~] Matches YouTube light & dark mode
- [~] Panel is inside a Shadow DOM

### Stage 2 — Saved topic list + popup
- [~] Topics saved in extension storage (replace the sample list)
- [~] Toolbar popup: add, edit, delete topics
- [~] Panel updates live when the list changes
- [~] Duplicate topics blocked with a note; new topics go to the top

### Stage 3 — Manage topics in the panel
- [~] Type a topic in the panel and press Enter to add it
- [~] Edit and delete buttons on each topic (appear on hover)
- [~] Typing in the panel doesn't trigger YouTube's own keyboard shortcuts

### Stage 4 — Keyboard shortcut
- [~] Alt+Shift+Y opens a new YouTube tab with the panel and the add box focused
- [x] Instructions to change the shortcut in each browser

### Stage 5 — Distraction-hiding toggles (popup switches, all ON by default)
- [~] Hide Shorts everywhere
- [~] Hide recommended videos in the sidebar while watching
- [~] Hide end-of-video suggestion cards
- [~] Hide the home feed (the panel replaces it)
- [~] Check TubeList and Unhook work together (reviewed in code; needs your real-browser check)

### Finish
- [x] Simple icon
- [x] README (what/why, install per browser, usage, shortcut, toggles, fixing selectors, license)
- [x] LICENSE (MIT, akashmony01)
- [x] .gitignore
- [x] git repository with a clean first commit

## Not in version 1
"Done" checkboxes (planned v1.1), sync across devices, categories/tags,
AI suggestions, timers/stats, store publishing, Safari, OS-wide shortcut.

## Future tasks (after version 1)

### v1.1
- [ ] **"Done" checkboxes**: mark a topic as finished.
- [ ] **Remember dates for each topic**: the day it was added and the last
      time it was clicked. Stored invisibly, only in the browser. Needed for
      the reminder below.
- [ ] **Reminder for untouched topics**: gently highlight topics that haven't
      been searched or done for a while (e.g. 1–2 weeks). Decide later:
      how long counts as "a while", and how it looks (badge, colour, note).
      Depends on the two items above.

### Maybe later
- [ ] Permanent Firefox install (signing the add-on through Mozilla as a
      private, unlisted add-on, without publishing it in the store).

## Notes / issues found during testing
_(We'll add anything that comes up here.)_
