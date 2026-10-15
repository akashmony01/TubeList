# TubeList

**Replace YouTube's home feed with your own list of things you want to learn.**

When you open YouTube, instead of the algorithm's recommendations you see
*your* list of topics, like "video editing basics" or "how to build a browser
extension". Click one, and YouTube searches for it. Your goals replace the
recommendations.

![TubeList icon](icons/icon-128.png)

## Why this exists

It's easy to open YouTube with some free time and no plan, and end up
watching random videos for hours. Hiding recommendations helps, but then you
still don't know *what* to watch, so you drift back to random entertainment.

TubeList makes free time on YouTube intentional. Keep a list of topics you'd
like to explore (fun is fine, but ideally things that grow your skills or
career), and let that list be the first thing you see.

The whole idea is one smooth flow:
**open YouTube → see your list → click a topic → start watching.**

## Features

- **Your topic list** on the YouTube home page, in a clean full-page panel
  that follows YouTube's light and dark mode.
- **Click a topic to search** YouTube for it.
- **Add, edit and delete topics** right on the panel (Edit/Delete appear when
  you hover over a topic) or from the toolbar popup.
- **"Go to normal YouTube"** button, so you're never locked out.
- **Keyboard shortcut** (default **Alt+Shift+Y**) that opens a new YouTube tab
  with the cursor already in the "add a topic" box, plus instructions for an
  optional system-wide shortcut that works from any app.
- **Distraction-hiding switches** (all on by default): Shorts, sidebar
  recommendations, end-of-video suggestion cards, and the home feed.
- **Private by design:** no server, no account, no tracking, no network
  requests. Your list is stored only in your browser.

## What it supports (and what it doesn't)

| ✅ Works | ❌ Not supported |
|---|---|
| **Chrome, Edge, Brave** on Windows, macOS and Linux | **Safari** (Mac, iPhone, iPad) |
| **Firefox** 121 or newer (see the Firefox notes below) | **Phones and tablets**, including the **YouTube app**: apps can't run browser extensions |
| Other Chromium browsers (Opera, Vivaldi, …) should work too, but aren't tested | **m.youtube.com** (mobile site), **music.youtube.com**, YouTube Kids, and YouTube videos embedded on other websites |
| **www.youtube.com** in a desktop browser | **Syncing** your list between browsers or computers: each browser keeps its own list |
| Light and dark mode | Installing from the Chrome Web Store or Firefox Add-ons site (not published there) |

TubeList has been tested on Linux in Chrome and Firefox.

---

## Installing

TubeList isn't in the extension stores, so you install it from GitHub.
It takes about a minute.

### Step 1: Download

1. Open the **[latest release](https://github.com/akashmony01/TubeList/releases/latest)**.
2. Under **Assets**, download **`TubeList-v1.0.0.zip`**
   (the version number may be higher).
3. Unzip it into a folder you'll keep, for example `Documents/TubeList`.
   The folder should directly contain `manifest.json`.

> **Keep this folder where it is.** The browser runs TubeList straight from
> it. If you move, rename or delete the folder, TubeList stops working, and
> in Chrome/Edge/Brave your topic list is tied to the folder's location.

(Alternatively, on the GitHub page click **Code → Download ZIP**. That works
too; it just includes a few extra project files.)

### Step 2a: Chrome, Edge, Brave (and other Chromium browsers)

1. Open the extensions page by typing this in the address bar:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
   - Brave: `brave://extensions`
2. Turn on **Developer mode** (top right in Chrome/Brave; left side in Edge).
3. Click **Load unpacked** and choose your TubeList folder (click the folder
   once, don't open it, then click **Select**).
4. Click the **puzzle-piece icon** next to the address bar and **pin**
   TubeList so its icon is always visible.
5. Open [youtube.com](https://www.youtube.com). Your TubeList panel appears.

TubeList stays installed when you restart the browser.

You may see warnings about `browser_specific_settings` or
`'background.scripts' requires manifest version of 2 or lower`. Both are
harmless: those lines are there for Firefox, and Chromium browsers simply
ignore them. (Keeping them lets one folder work in every browser without a
build step.)

### Step 2b: Firefox

Regular Firefox only installs add-ons permanently once Mozilla has signed
them, and TubeList isn't signed yet. You have two options:

**Option 1: Temporary (any Firefox, simplest)**

1. Type `about:debugging#/runtime/this-firefox` in the address bar.
2. Click **Load Temporary Add-on…** and select the downloaded
   **`TubeList-v1.0.0.zip`** file (or `manifest.json` inside the unzipped
   folder).
3. Open YouTube. If the panel doesn't appear, click the **puzzle-piece icon**,
   find TubeList, choose **Always allow on www.youtube.com**, and refresh.

Firefox removes temporary add-ons when it closes (and your list with it),
so repeat these steps after each restart.

**Option 2: Permanent (Firefox Developer Edition, Nightly or ESR only)**

These versions of Firefox can install unsigned add-ons:

1. Type `about:config` in the address bar and accept the warning.
2. Search for `xpinstall.signatures.required` and set it to **false**.
3. Make a copy of `TubeList-v1.0.0.zip` and rename the copy to
   `TubeList.xpi`.
4. Open `about:addons`, click the **gear icon ⚙** →
   **Install Add-on From File…**, and choose `TubeList.xpi`.

(This setting has no effect in regular Firefox.)

### Updating to a new version

1. Download the new zip from the
   [releases page](https://github.com/akashmony01/TubeList/releases).
2. Unzip it **into the same folder**, replacing the old files.
3. **Chrome / Edge / Brave:** on the extensions page, click the round
   **reload** arrow on the TubeList card, then refresh your YouTube tabs.
   Your list is kept.
   **Firefox:** load it again as described above.

### Removing TubeList

On the extensions page (or `about:addons` in Firefox), click **Remove** on
TubeList. This also deletes your saved list and switch settings. You can
then delete the folder.

---

## Using your topic list

- **Open YouTube's home page** (youtube.com) and your list appears.
- **Click a topic** to search YouTube for it. Middle-click or Ctrl+click opens
  it in a new tab.
- **Add a topic:** type it in the box at the top of the panel (or in the
  popup) and press Enter. New topics go to the top.
- **Edit or delete:** hover over a topic on the panel (or open the popup) and
  use **Edit** / **Delete**. While editing, Enter saves and Escape cancels.
- **Duplicates** aren't added: "Python" and "python" count as the same.
- **Go to normal YouTube** hides the panel for this visit. It comes back the
  next time you go to Home (for example by clicking the YouTube logo).

The first time, your list starts with two example topics. Delete them
whenever you like.

## Keyboard shortcut

Press **Alt+Shift+Y** (anywhere in the browser) to open a new YouTube tab
with the TubeList panel, with the cursor already in the "add a topic" box.

### Changing the shortcut

- **Chrome:** open `chrome://extensions/shortcuts`
- **Brave:** open `brave://extensions/shortcuts`
- **Edge:** open `edge://extensions/shortcuts`
- **Firefox:** open `about:addons`, click the gear icon ⚙ →
  **Manage Extension Shortcuts**

Find TubeList, click in the shortcut box, and press the new keys. Browsers
only accept combinations of **Ctrl** or **Alt** (optionally with **Shift**)
plus a letter, number, or a few named keys. Keys like Caps Lock can't be used.

**If the shortcut doesn't work:**
- Check the shortcuts page above. If another extension uses the same keys,
  the browser may leave TubeList's shortcut empty. Set a different one.
- On Linux, some desktops use **Alt+Shift** to switch keyboard languages,
  which can swallow the shortcut. Choose a different shortcut if so.

### Optional: a shortcut that works from anywhere

The shortcut above only works **while your browser window is in front**.
That's a browser rule: extensions can't listen to keys in other apps, and
they can't create system-wide shortcuts.

You can get a shortcut that works from *any* app by creating one in your
computer's own settings. It opens this link in your **default browser**:

```
https://www.youtube.com/#tubelist-add
```

If the browser is closed it starts; if it's already open, a new tab opens.
The `#tubelist-add` part tells TubeList to put the cursor in the
"add a topic" box. (Depending on the browser, the cursor may land in the
address bar instead; then just click the box.)

You can even use the same keys as the browser shortcut (e.g. Alt+Shift+Y):
the system shortcut then works everywhere, including inside the browser.

#### Linux: Ubuntu / GNOME

1. Open **Settings** → **Keyboard**.
2. Scroll down to **View and Customize Shortcuts** → **Custom Shortcuts**.
3. Click **+** (or **Add Shortcut**) and fill in:
   - **Name:** `TubeList`
   - **Command:** `xdg-open "https://www.youtube.com/#tubelist-add"`
   - **Shortcut:** click **Set Shortcut…** and press your keys.
4. Click **Add**.

#### Linux: KDE Plasma

1. Open **System Settings** → **Keyboard** → **Shortcuts**.
2. Click **Add New** → **Command or Script…**.
3. Command: `xdg-open "https://www.youtube.com/#tubelist-add"`
4. Name it `TubeList`, then click **Add custom shortcut** and press your keys.

(Other Linux desktops have a similar "custom shortcut" setting; use the same
`xdg-open` command. `xdg-open` means "open with the default app".)

#### Windows

1. Right-click an empty spot on the **desktop** → **New** → **Shortcut**.
2. For the location, paste `https://www.youtube.com/#tubelist-add` →
   **Next**, name it `TubeList` → **Finish**.
3. Right-click the new shortcut → **Properties**.
4. Click in the **Shortcut key** box and press a letter, e.g. **Y**.
   Windows turns it into **Ctrl+Alt+Y**. Click **OK**.

The shortcut file must stay on the desktop (or in the Start menu folder) for
the keys to work.

#### macOS

1. Open the **Shortcuts** app and click **+** to make a new shortcut.
2. Search the actions for **Open URLs** and add it.
3. Paste `https://www.youtube.com/#tubelist-add` as the URL.
4. Name it `TubeList`. Then click the **ⓘ (Shortcut Details)** button →
   **Add Keyboard Shortcut** and press your keys.

**To use a specific browser** instead of the default one, replace the
command with that browser's own command, for example on Linux
`firefox --new-tab "https://www.youtube.com/#tubelist-add"` or
`google-chrome "https://www.youtube.com/#tubelist-add"`.

## Hiding distractions

Click the TubeList icon in the toolbar. Under **Hide distractions** there are
four switches, all ON by default. Changes apply immediately, even in open
tabs.

| Switch | What it hides |
|---|---|
| Hide Shorts everywhere | Shorts shelves and Shorts in lists (Home, Subscriptions, Search, next to videos), the Shorts button in the left menu, and the Shorts tab on channels |
| Hide recommended videos in the sidebar | The recommended videos next to (or below) the video you're watching. Playlists and live chat stay visible. |
| Hide end-of-video suggestion cards | The cards that pop up at the end of a video, the grid of videos after it ends, and the "more videos" grid in full screen |
| Hide the home feed | YouTube's recommended videos on Home. The TubeList panel always covers them; with this ON they also stay hidden after you click "Go to normal YouTube". |

Note: opening a Shorts link directly (for example from a chat message) still
plays it. TubeList hides Shorts on YouTube's pages; it doesn't block them.

### Using TubeList together with Unhook

TubeList and Unhook both just hide parts of YouTube, so they work side by
side. If both hide the same thing, nothing breaks. One thing to watch: if
Unhook is set to **redirect the home page** (for example to Subscriptions),
you'll never land on Home, so you won't see the TubeList panel. Turn that
Unhook option off to use TubeList.

---

## Fixing things when YouTube changes its layout

YouTube sometimes renames the pieces of its pages. When that happens, a
switch may stop hiding something, or the panel may look off. All of
YouTube's page names that TubeList relies on are in one file:

**`content/youtube-selectors.css`**

It's split into numbered, commented sections, one for the panel and one per
switch. (Two more YouTube-specific things, the "page changed" event name and
how the home page is recognised, are at the top of `content/content.js`.)

To fix a selector:

1. On YouTube, **right-click** the thing that should be hidden and choose
   **Inspect**. The browser's developer tools open with that part of the page
   highlighted.
2. Look at the highlighted line and the lines above it for a tag name
   (like `<ytd-reel-shelf-renderer>`) or an attribute that clearly belongs to
   that part (like `is-shorts`). Prefer names over random-looking ids.
3. Open `content/youtube-selectors.css`, find the section for that switch,
   and add or replace a line, keeping the switch class at the start, e.g.:
   ```css
   html.tubelist-hide-shorts ytd-new-shorts-thing,
   ```
   (Every line in a group ends with a comma except the last one, which is
   followed by `{ display: none !important; }`.)
4. Reload the extension (on the extensions page, the round **reload** arrow
   on the TubeList card; in Firefox, **Reload** on `about:debugging`) and
   refresh YouTube.

Tip: in the developer tools you can test a rule first: in the **Styles**
panel, click **+** to add a rule with your selector and `display: none`, and
watch whether the right thing disappears.

The "Shorts" tab on channel pages is matched by its English label, so in
other YouTube languages that one tab may stay visible.

If you fix something, a pull request on GitHub is very welcome.

---

## Privacy

- TubeList makes **no network requests** of its own. It has no server, no
  account, no analytics and no tracking.
- Your topics and switch settings are saved only in your browser's extension
  storage on your computer.
- Permissions: only `storage` (to save your list and switches), plus access
  to `www.youtube.com` so the panel can appear there.
- Clicking a topic simply opens a normal YouTube search, exactly as if you
  had typed it into YouTube's search box.

---

## Troubleshooting

- **The panel doesn't appear on YouTube.** Make sure you're on
  `www.youtube.com` (the home page). Refresh the tab. In Firefox, allow
  TubeList on YouTube via the puzzle-piece icon. Check that TubeList is
  switched on in the extensions page.
- **Something isn't hidden anymore / the panel looks wrong.** YouTube
  probably changed its layout; see
  [Fixing things when YouTube changes its layout](#fixing-things-when-youtube-changes-its-layout).
- **My list disappeared.** In Firefox with a temporary add-on, the list is
  removed when Firefox closes. In Chrome/Edge/Brave, the list is tied to the
  folder's location; moving the folder makes the browser treat it as a new
  extension.
- **The shortcut does nothing.** See
  [If the shortcut doesn't work](#changing-the-shortcut).

---

## How it's built

Plain JavaScript, HTML and CSS: no frameworks, no build step. Manifest V3.

```
manifest.json               the extension's "ID card"
background.js               handles the keyboard shortcut
content/content.js          shows the panel on YouTube, applies the switches
content/panel.css           how the panel looks (inside a Shadow DOM)
content/youtube-selectors.css   ALL YouTube-specific selectors
popup/                      the toolbar popup (topics + switches)
shared/topics.js            saving/loading your topics
shared/settings.js          saving/loading the switches
shared/topic-list.js        the editable list, shared by panel and popup
shared/dom.js               small helper for building page elements
icons/                      the icon (icon.svg is the source drawing)
PLAN.md                     project plan, decisions and future ideas
```

### Making a release (for maintainers)

1. Raise `"version"` in `manifest.json` (e.g. `1.0.1`).
2. From the project folder, create the zip with only the extension files:
   ```
   zip -r TubeList-v1.0.1.zip manifest.json background.js content popup shared icons LICENSE README.md
   ```
3. Commit, tag (`git tag v1.0.1`), push, and attach the zip to a new
   release on GitHub.

## License

[MIT](LICENSE) © 2026 akashmony01
