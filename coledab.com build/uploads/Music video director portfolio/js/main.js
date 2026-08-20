/* ---------------------------------------------------------------
   PROJECTS — add a project by adding one object here.
   logo:  path to a monochrome/white SVG or PNG in /assets/logos
   vimeo: Vimeo video ID (the numbers at the end of the URL)
--------------------------------------------------------------- */
const PROJECTS = [
  { artist: "Jennifer Lopez",      title: "[TITLE]", logo: "assets/logos/jennifer-lopez.svg",      vimeo: "76979871" },
  { artist: "Kid Cudi",            title: "[TITLE]", logo: "assets/logos/kid-cudi.svg",            vimeo: "76979871" },
  { artist: "2 Chainz",            title: "[TITLE]", logo: "assets/logos/2-chainz.svg",            vimeo: "76979871" },
  { artist: "Juicy J",             title: "[TITLE]", logo: "assets/logos/juicy-j.svg",             vimeo: "76979871" },
  { artist: "David Guetta",        title: "[TITLE]", logo: "assets/logos/david-guetta.svg",        vimeo: "76979871" },
  { artist: "Rae Sremmurd",        title: "[TITLE]", logo: "assets/logos/rae-sremmurd.svg",        vimeo: "76979871" },
  { artist: "Macklemore",          title: "[TITLE]", logo: "assets/logos/macklemore.svg",          vimeo: "76979871" },
  { artist: "Pierce the Veil",     title: "[TITLE]", logo: "assets/logos/pierce-the-veil.svg",     vimeo: "76979871" },
  { artist: "Motionless in White", title: "[TITLE]", logo: "assets/logos/motionless-in-white.svg", vimeo: "76979871" },
  { artist: "A Day to Remember",   title: "[TITLE]", logo: "assets/logos/a-day-to-remember.svg",   vimeo: "76979871" },
  { artist: "Asking Alexandria",   title: "[TITLE]", logo: "assets/logos/asking-alexandria.svg",   vimeo: "76979871" },
  { artist: "$NOT",                title: "[TITLE]", logo: "assets/logos/not.svg",                 vimeo: "76979871" }
];

/* ------------------------------ helpers ----------------------- */
function vimeoIframe(id, title, autoplay) {
  const params = "title=0&byline=0&portrait=0&dnt=1" + (autoplay ? "&autoplay=1" : "");
  const f = document.createElement("iframe");
  f.src = "https://player.vimeo.com/video/" + id + "?" + params;
  f.title = title;
  f.allow = "autoplay; fullscreen; picture-in-picture";
  f.setAttribute("allowfullscreen", "");
  f.loading = "lazy";
  return f;
}

document.getElementById("year").textContent = new Date().getFullYear();

/* ------------------------------ hero reel ---------------------
   Autoplays muted + looping with Vimeo's chrome hidden; the two
   custom buttons (pause / sound) drive it through the player API. */
const heroPlayer = document.getElementById("hero-player");
const toggleBtn = document.getElementById("reel-toggle");
const soundBtn = document.getElementById("reel-sound");
const playPath = document.getElementById("rc-play-path");
const muteX = document.getElementById("rc-mute-x");
const waves = document.getElementById("rc-waves");
const wave2 = document.getElementById("rc-wave-2");
const volSlider = document.getElementById("reel-volume");
const PAUSE_D = "M7 5h3.2v14H7zM13.8 5H17v14h-3.2z";
const PLAY_D = "M7 4.5l12 7.5-12 7.5z";

const heroFrame = document.createElement("iframe");
heroFrame.src = "https://player.vimeo.com/video/" + heroPlayer.dataset.vimeo +
  "?background=1&autoplay=1&muted=1&loop=1&dnt=1";
heroFrame.title = heroPlayer.dataset.title;
heroFrame.allow = "autoplay; fullscreen; picture-in-picture";
heroFrame.setAttribute("allowfullscreen", "");
heroFrame.tabIndex = -1;
heroPlayer.insertBefore(heroFrame, heroPlayer.firstChild);

const heroApi = window.Vimeo ? new Vimeo.Player(heroFrame) : null;
let playing = true, muted = true, lastVolume = 0.7;

toggleBtn.addEventListener("click", () => {
  if (!heroApi) return;
  playing = !playing;
  playing ? heroApi.play() : heroApi.pause();
  playPath.setAttribute("d", playing ? PAUSE_D : PLAY_D);
  toggleBtn.setAttribute("aria-label", playing ? "Pause reel" : "Play reel");
  toggleBtn.setAttribute("aria-pressed", String(!playing));
});

soundBtn.addEventListener("click", () => {
  if (!heroApi) return;
  setVolume(muted ? (lastVolume || 0.7) : 0);
});

volSlider.addEventListener("input", () => setVolume(volSlider.value / 100));

function setVolume(v) {
  if (!heroApi) return;
  muted = v === 0;
  if (!muted) lastVolume = v;
  heroApi.setMuted(muted);
  heroApi.setVolume(v);
  volSlider.value = Math.round(v * 100);
  muteX.style.display = muted ? "" : "none";
  waves.style.display = muted ? "none" : "";
  wave2.style.display = v > 0.55 ? "" : "none";
  soundBtn.setAttribute("aria-label", muted ? "Unmute reel" : "Mute reel");
  soundBtn.setAttribute("aria-pressed", String(muted));
}

/* ------------------------------ logo grid --------------------- */
const grid = document.getElementById("logo-grid");
PROJECTS.forEach((p, i) => {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "tile";
  btn.setAttribute("aria-label", "Play " + p.title + " — " + p.artist);
  btn.dataset.index = i;
  const img = document.createElement("img");
  img.src = p.logo;
  img.alt = p.artist;
  img.loading = "lazy";
  btn.appendChild(img);
  li.appendChild(btn);
  grid.appendChild(li);
});

/* ------------------------------ modal ------------------------- */
const modal = document.getElementById("modal");
const dialog = modal.querySelector(".dialog");
const videoBox = document.getElementById("modal-video");
const titleEl = document.getElementById("modal-title");
const artistEl = document.getElementById("modal-artist");
let lastFocused = null;

function openModal(project) {
  lastFocused = document.activeElement;
  titleEl.textContent = project.title;
  artistEl.textContent = project.artist;
  videoBox.innerHTML = "";
  videoBox.appendChild(vimeoIframe(project.vimeo, project.title + " — " + project.artist, true));
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  dialog.focus();
  document.addEventListener("keydown", onKeydown);
}

function closeModal() {
  modal.hidden = true;
  videoBox.innerHTML = "";           // kills playback + audio
  document.body.style.overflow = "";
  document.removeEventListener("keydown", onKeydown);
  if (lastFocused) lastFocused.focus();
}

function focusables() {
  return [...dialog.querySelectorAll('button, a[href], iframe, [tabindex]:not([tabindex="-1"])')]
    .filter(el => el.offsetParent !== null || el.tagName === "IFRAME");
}

function onKeydown(e) {
  if (e.key === "Escape") { closeModal(); return; }
  if (e.key !== "Tab") return;
  const items = focusables();
  if (!items.length) { e.preventDefault(); dialog.focus(); return; }
  const first = items[0], last = items[items.length - 1];
  const active = document.activeElement;
  if (e.shiftKey && (active === first || active === dialog)) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
}

grid.addEventListener("click", e => {
  const btn = e.target.closest(".tile");
  if (btn) openModal(PROJECTS[Number(btn.dataset.index)]);
});

modal.addEventListener("click", e => {
  if (e.target.closest("[data-close]")) closeModal();
});
