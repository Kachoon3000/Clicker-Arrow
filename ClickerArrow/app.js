// Barème niveaux 1 à 10 (écart renforcé entre Régulier 750 et Confirmé 1500)
const LEVELS = [
  { lvl: 1, title: "Archer Débutant", xp: 100, reward: "Couleur de base poignée" },
  { lvl: 2, title: "Archer Prometteur", xp: 300, reward: "Palette / Décocheur" },
  { lvl: 3, title: "Archer Régulier", xp: 750, reward: "Stand extérieur 50m" },
  { lvl: 4, title: "Archer Confirmé", xp: 1500, reward: "Stabilisateurs carbone" },
  { lvl: 5, title: "Archer Expert", xp: 2800, reward: "Viseur + Titre Maître" },
  { lvl: 6, title: "Archer Élite", xp: 4800, reward: "Mode Campagne & 3D" },
  { lvl: 7, title: "Maître Archer", xp: 7500, reward: "Branches & corde custom" },
  { lvl: 8, title: "Archer d'Exception", xp: 11000, reward: "Badge doré profil" },
  { lvl: 9, title: "Légende du Club", xp: 15500, reward: "Duels Match-Play IA" },
  { lvl: 10, title: "Grand Maître International", xp: 21000, reward: "Couronne suprême" }
];

const STORAGE_KEY = "archer_xp_prototype_v1";

let state = loadState();
let currentVolley = []; // [{ label, pts }]
let sessionArrows = []; // [{ label, pts }]
let claimBannerText = "";

// Retourne le timestamp (en ms) du dernier Lundi à 00:01:00 passé par rapport à une date donnée
function getLastMondayResetTimestamp(now = new Date()) {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 1, 0, 0);
  const day = d.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  const diffFromMonday = (day + 6) % 7; // Lundi -> 0, Mardi -> 1, ..., Dimanche -> 6
  d.setDate(d.getDate() - diffFromMonday);

  if (now.getTime() < d.getTime()) {
    d.setDate(d.getDate() - 7);
  }
  return d.getTime();
}

function defaultState() {
  return {
    xp: 0,
    gold: 0,
    pendingGold: 0,
    lastSessionDate: null,
    lastOpenDate: getTodayDate(),
    lastWeekResetTs: getLastMondayResetTimestamp(new Date()),
    lastCompScore: null,
    lastCompDate: null,
    goalMode: "prev", // "prev" ou "999"
    currentWeekArrows: 0,
    prevWeekArrows: 0,
    logs: []
  };
}

function getTodayDate() {
  return new Date().toLocaleDateString("fr-FR");
}

function getCurrentMonthKey(dateStr = getTodayDate()) {
  // Format FR attendu : JJ/MM/AAAA -> retourne MM/AAAA
  const parts = String(dateStr).split("/");
  if (parts.length === 3) {
    return `${parts[1]}/${parts[2]}`;
  }
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  return `${mm}/${now.getFullYear()}`;
}

function getYearKey(dateStr = getTodayDate()) {
  // Format FR attendu : JJ/MM/AAAA -> retourne AAAA
  const parts = String(dateStr).split("/");
  if (parts.length === 3) {
    return parts[2];
  }
  return String(new Date().getFullYear());
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const merged = { ...defaultState(), ...parsed };
    merged.gold = Number(merged.gold) || 0;
    merged.pendingGold = Number(merged.pendingGold) || 0;
    merged.currentWeekArrows = Number(merged.currentWeekArrows) || 0;
    merged.prevWeekArrows = Number(merged.prevWeekArrows) || 0;
    if (typeof merged.lastWeekResetTs !== "number" || Number.isNaN(merged.lastWeekResetTs)) {
      merged.lastWeekResetTs = getLastMondayResetTimestamp(new Date());
    }
    if (Array.isArray(merged.logs)) {
      merged.logs = normalizeLogsByDay(merged.logs);
    } else {
      merged.logs = [];
    }
    return merged;
  } catch {
    return defaultState();
  }
}

function checkWeeklyMondayReset(now = new Date(), shouldRender = false) {
  const currentMondayResetTs = getLastMondayResetTimestamp(now);

  if (currentMondayResetTs > state.lastWeekResetTs) {
    state.prevWeekArrows = state.currentWeekArrows;
    state.currentWeekArrows = 0;
    state.lastWeekResetTs = currentMondayResetTs;
    saveState();
    if (shouldRender) {
      renderAll();
    }
  }
}

function checkDailyLoginReward() {
  const today = getTodayDate();
  if (
    state.pendingGold > 0 &&
    state.lastSessionDate &&
    state.lastSessionDate !== today
  ) {
    const claimed = state.pendingGold;
    state.gold += claimed;
    state.pendingGold = 0;
    claimBannerText = `🪙 Récompense du lendemain : +${claimed} pièces d'or reçues pour votre dernière séance !`;
  }
  state.lastOpenDate = today;
  saveState();
}

function claimPendingGoldForNewSession() {
  if (state.pendingGold > 0) {
    const claimed = state.pendingGold;
    state.gold += claimed;
    state.pendingGold = 0;
    claimBannerText = `🪙 +${claimed} pièces d'or de votre séance précédente ajoutées à votre bourse !`;
  }
}

function awardXpAndQueueGold(xpAmount) {
  const cleanXp = Math.max(0, Math.round(xpAmount));
  state.xp += cleanXp;
  state.pendingGold += cleanXp;
  state.lastSessionDate = getTodayDate();
}

function normalizeLogsByDay(rawLogs) {
  const byDate = new Map();

  for (const item of rawLogs) {
    const date = item.date || getTodayDate();
    const arrows = Number(item.arrows) || 0;
    const xpGained = Number(item.xpGained) || 0;
    const types = Array.isArray(item.types)
      ? [...item.types]
      : (item.type ? [item.type] : ["Séance"]);
    const batches = Number(item.batches) || 1;
    const note = item.note || "";

    let totalPts = typeof item.totalPts === "number" ? item.totalPts : 0;
    let scoredArrows = typeof item.scoredArrows === "number" ? item.scoredArrows : 0;
    let scoreText = item.scoreText || "Non noté";

    if (typeof item.totalPts !== "number" && typeof item.scoreText === "string") {
      const matchPts = item.scoreText.match(/(\d+)\s*pts/);
      if (matchPts) {
        totalPts = Number(matchPts[1]);
        scoredArrows = arrows;
      }
    }

    if (!byDate.has(date)) {
      byDate.set(date, {
        date,
        types,
        batches,
        arrows,
        totalPts,
        scoredArrows,
        scoreText: scoredArrows > 0
          ? `${totalPts} pts (moy. ${(totalPts / scoredArrows).toFixed(2)})`
          : scoreText,
        note
      });
    } else {
      const existing = byDate.get(date);
      existing.arrows += arrows;
      existing.batches += batches;
      existing.totalPts += totalPts;
      existing.scoredArrows += scoredArrows;

      for (const t of types) {
        if (!existing.types.includes(t)) existing.types.push(t);
      }

      if (existing.scoredArrows > 0) {
        existing.scoreText = `${existing.totalPts} pts (moy. ${(existing.totalPts / existing.scoredArrows).toFixed(2)})`;
      } else if (scoreText !== "Non noté") {
        existing.scoreText = scoreText;
      }

      if (note && !existing.note.includes(note)) {
        existing.note = existing.note ? `${existing.note} • ${note}` : note;
      }
    }

    byDate.get(date).xpGained = (byDate.get(date).xpGained || 0) + xpGained;
  }

  return Array.from(byDate.values());
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function upsertDailyLog({ type, arrows, pts = null, customScoreText = null, xpGained = 0, note = "" }) {
  const today = getTodayDate();
  const existingIndex = state.logs.findIndex(item => item.date === today);

  if (existingIndex !== -1) {
    const entry = state.logs[existingIndex];
    entry.arrows += arrows;
    entry.xpGained += xpGained;
    entry.batches = (entry.batches || 1) + 1;

    if (typeof pts === "number") {
      entry.totalPts = (entry.totalPts || 0) + pts;
      entry.scoredArrows = (entry.scoredArrows || 0) + arrows;
      const avg = entry.scoredArrows > 0 ? (entry.totalPts / entry.scoredArrows).toFixed(2) : "0.00";
      entry.scoreText = `${entry.totalPts} pts (moy. ${avg})`;
    } else if (customScoreText) {
      entry.scoreText = customScoreText;
    }

    if (!Array.isArray(entry.types)) {
      entry.types = entry.type ? [entry.type] : ["Séance"];
    }
    if (type && !entry.types.includes(type)) {
      entry.types.push(type);
    }

    if (note && !(entry.note || "").includes(note)) {
      entry.note = entry.note ? `${entry.note} • ${note}` : note;
    }
  } else {
    const hasNumericPts = typeof pts === "number";
    const avg = hasNumericPts && arrows > 0 ? (pts / arrows).toFixed(2) : "0.00";

    state.logs.unshift({
      date: today,
      types: type ? [type] : ["Séance"],
      batches: 1,
      arrows,
      totalPts: hasNumericPts ? pts : 0,
      scoredArrows: hasNumericPts ? arrows : 0,
      scoreText: hasNumericPts
        ? `${pts} pts (moy. ${avg})`
        : (customScoreText || "Non noté"),
      xpGained,
      note
    });
  }
}

// Multiplicateur actif à partir de 380 / 600
function getMultiplier(score) {
  if (score === null || score === undefined || isNaN(score) || score < 380) return 1.0;
  if (score < 450) return 1.2;
  if (score <= 500) return 1.4;
  if (score < 550) return 1.7;
  if (score < 580) return 2.0;
  return 2.5;
}

function saveCompetitionScore() {
  checkWeeklyMondayReset(new Date(), false);
  const input = document.getElementById("compScoreInput");
  const val = Number(input.value);
  if (input.value === "" || isNaN(val) || val < 0 || val > 600) return;

  const today = getTodayDate();
  state.lastCompScore = val;
  state.lastCompDate = today;
  const mult = getMultiplier(val);

  upsertDailyLog({
    type: "Concours officiel",
    arrows: 60,
    customScoreText: `${val} / 600`,
    xpGained: 0,
    note: `Bonus ×${mult.toFixed(1)}`
  });

  state.currentWeekArrows += 60;
  input.value = "";
  saveState();
  renderAll();
}

function addArrow(label, pts) {
  if (currentVolley.length >= 3) {
    currentVolley = [];
  }
  const item = { label, pts };
  currentVolley.push(item);
  sessionArrows.push(item);
  renderSaisie();
}

function undoArrow() {
  if (currentVolley.length > 0) {
    currentVolley.pop();
    sessionArrows.pop();
  } else if (sessionArrows.length > 0) {
    sessionArrows.pop();
  }
  renderSaisie();
}

function finishSession() {
  checkWeeklyMondayReset(new Date(), false);
  const count = sessionArrows.length;
  if (count === 0) return;

  claimPendingGoldForNewSession();

  const totalPts = sessionArrows.reduce((acc, a) => acc + a.pts, 0);
  const mult = getMultiplier(state.lastCompScore);
  const xpGained = Math.round(count * mult);

  awardXpAndQueueGold(xpGained);
  state.currentWeekArrows += count;

  upsertDailyLog({
    type: "Clavier",
    arrows: count,
    pts: totalPts,
    xpGained,
    note: `Bonus ×${mult.toFixed(1)} (+${xpGained} 🪙 en attente)`
  });

  currentVolley = [];
  sessionArrows = [];
  saveState();
  renderAll();
  switchTab("accueil");
}

function addQuickSession() {
  checkWeeklyMondayReset(new Date(), false);
  const arrowsInput = document.getElementById("quickArrows");
  const scoreInput = document.getElementById("quickScore");
  const noteInput = document.getElementById("quickNote");

  const arrows = Number(arrowsInput.value);
  if (!arrows || arrows < 1) return;

  claimPendingGoldForNewSession();

  const rawScore = scoreInput.value.trim();
  const baseNote = noteInput.value.trim() || "Entraînement";
  const mult = getMultiplier(state.lastCompScore);
  const xpGained = Math.round(arrows * mult);

  awardXpAndQueueGold(xpGained);
  state.currentWeekArrows += arrows;

  const numericScore = rawScore !== "" && !isNaN(Number(rawScore)) ? Number(rawScore) : null;

  upsertDailyLog({
    type: "Saisie rapide",
    arrows,
    pts: numericScore,
    customScoreText: numericScore === null ? (rawScore || "Non noté") : null,
    xpGained,
    note: `${baseNote} (+${xpGained} 🪙 en attente)`
  });

  arrowsInput.value = "";
  scoreInput.value = "";
  noteInput.value = "";

  saveState();
  renderAll();
}

function closeCurrentWeek() {
  const confirmed = window.confirm(
    `Clôturer la semaine (${state.currentWeekArrows} flèches) ? Ce total deviendra votre référence Semaine N-1.`
  );
  if (!confirmed) return;

  state.prevWeekArrows = state.currentWeekArrows;
  state.currentWeekArrows = 0;
  state.lastWeekResetTs = getLastMondayResetTimestamp(new Date());
  saveState();
  renderAll();
  switchTab("accueil");
}

function setGoalMode(mode) {
  state.goalMode = mode;
  saveState();
  renderAll();
}

function switchTab(tab) {
  checkWeeklyMondayReset(new Date(), false);
  document.querySelectorAll(".tab-view").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(el => el.classList.remove("active"));
  document.getElementById(`view-${tab}`).classList.add("active");
  document.getElementById(`nav-${tab}`).classList.add("active");
  renderAll();
}

function renderSaisie() {
  const slots = document.getElementById("volleySlots");
  slots.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const div = document.createElement("div");
    div.className = "arrow-slot";
    div.textContent = currentVolley[i] ? currentVolley[i].label : "-";
    slots.appendChild(div);
  }

  const volleySum = currentVolley.reduce((s, a) => s + a.pts, 0);
  const sumSlot = document.createElement("div");
  sumSlot.className = "arrow-slot arrow-sum";
  sumSlot.textContent = `=${volleySum}`;
  slots.appendChild(sumSlot);

  const totalSessionPts = sessionArrows.reduce((s, a) => s + a.pts, 0);
  document.getElementById("sessionScoreLabel").textContent = totalSessionPts;
  document.getElementById("sessionArrowsLabel").textContent = sessionArrows.length;
  document.getElementById("volleyCountLabel").textContent = `Volée : ${currentVolley.length}/3`;

  const banner = document.getElementById("zoneBanner");
  if (sessionArrows.length > 0 && state.lastCompScore) {
    const refAvg = state.lastCompScore / 60;
    const curAvg = totalSessionPts / sessionArrows.length;
    const diff = curAvg - refAvg;

    if (diff >= 0.25) {
      banner.className = "zone-banner zone-green";
      banner.textContent = `🟢 Zone Verte : +${diff.toFixed(2)} pts/flèche au-dessus de votre dernier concours (${state.lastCompScore}/600).`;
    } else if (diff >= -0.35) {
      banner.className = "zone-banner zone-blue";
      banner.textContent = `🔵 Zone Bleue : dans votre rythme de référence (${curAvg.toFixed(2)} vs ${refAvg.toFixed(2)} pts/flèche).`;
    } else {
      banner.className = "zone-banner zone-warn";
      banner.textContent = `🔴 Zone Vigilance : ${diff.toFixed(2)} pts/flèche sous votre dernier concours. Revenez sur vos bases.`;
    }
  } else if (sessionArrows.length > 0) {
    banner.className = "zone-banner zone-blue";
    banner.textContent = `Moyenne actuelle : ${(totalSessionPts / sessionArrows.length).toFixed(2)} pts/flèche (ajoutez un score concours pour la zone).`;
  } else {
    banner.className = "zone-banner zone-blue";
    banner.textContent = "Zone de réussite : saisissez des flèches pour comparer à votre dernier concours.";
  }
}

// Synthèse Carnet : Dernière séance, Dernière compétition, Dernière semaine, Mois en cours, Flèches à l'année
function renderCarnetSummary() {
  const container = document.getElementById("carnetSummaryGrid");
  if (!container) return;

  const today = getTodayDate();
  const currentMonthKey = getCurrentMonthKey(today);
  const currentYearKey = getYearKey(today);

  // 1. Dernière séance
  const lastSession = state.logs[0] || null;
  const lastSessionMain = lastSession
    ? `🏹 ${lastSession.arrows} flèches • +${lastSession.xpGained || 0} XP`
    : "Aucune séance";
  const lastSessionSub = lastSession
    ? `${lastSession.date} — ${lastSession.scoreText || "Non noté"}`
    : "Ajoutez une séance pour démarrer";

  // 2. Dernière compétition
  const mult = getMultiplier(state.lastCompScore);
  const lastCompMain = state.lastCompScore !== null
    ? `🏆 ${state.lastCompScore} / 600`
    : "Aucune compétition";
  const lastCompSub = state.lastCompScore !== null
    ? `${state.lastCompDate ? `${state.lastCompDate} • ` : ""}Bonus ×${mult.toFixed(1)}`
    : "Seuil minimum : 380 / 600";

  // 3. Dernière semaine (Semaine N-1)
  const lastWeekArrows = Number(state.prevWeekArrows) || 0;
  const currentWeekArrows = Number(state.currentWeekArrows) || 0;

  // 4. Mois en cours (MM/AAAA)
  const monthLogs = state.logs.filter(item => getCurrentMonthKey(item.date) === currentMonthKey);
  const monthArrows = monthLogs.reduce((sum, item) => sum + (Number(item.arrows) || 0), 0);
  const monthPts = monthLogs.reduce((sum, item) => sum + (Number(item.totalPts) || 0), 0);
  const monthScoredArrows = monthLogs.reduce((sum, item) => sum + (Number(item.scoredArrows) || 0), 0);
  const monthSub = monthScoredArrows > 0
    ? `Moy. ${(monthPts / monthScoredArrows).toFixed(2)} pts/flèche`
    : `${monthLogs.length} jour(s) sur ${currentMonthKey}`;

  // 5. Flèches à l'année (AAAA)
  const yearLogs = state.logs.filter(item => getYearKey(item.date) === currentYearKey);
  const yearArrowsFromLogs = yearLogs.reduce((sum, item) => sum + (Number(item.arrows) || 0), 0);
  const yearArrows = Math.max(yearArrowsFromLogs, currentWeekArrows + lastWeekArrows);

  container.innerHTML = `
    <div class="summary-box">
      <div class="summary-box-title">Dernière séance</div>
      <div class="summary-box-main">${lastSessionMain}</div>
      <div class="summary-box-sub">${lastSessionSub}</div>
    </div>

    <div class="summary-box">
      <div class="summary-box-title">Dernière compétition</div>
      <div class="summary-box-main">${lastCompMain}</div>
      <div class="summary-box-sub">${lastCompSub}</div>
    </div>

    <div class="summary-box">
      <div class="summary-box-title">Dernière semaine (Semaine N-1)</div>
      <div class="summary-box-main">🏹 ${lastWeekArrows} flèches</div>
      <div class="summary-box-sub">Semaine en cours : ${currentWeekArrows} flèches</div>
    </div>

    <div class="summary-box">
      <div class="summary-box-title">Mois en cours (${currentMonthKey})</div>
      <div class="summary-box-main">🏹 ${monthArrows} flèches</div>
      <div class="summary-box-sub">${monthSub}</div>
    </div>

    <div class="summary-box">
      <div class="summary-box-title">Flèches à l'année (${currentYearKey})</div>
      <div class="summary-box-main">🏹 ${yearArrows} flèches</div>
      <div class="summary-box-sub">${yearLogs.length} jour(s) enregistré(s) en ${currentYearKey}</div>
    </div>
  `;
}

function renderAll() {
  const mult = getMultiplier(state.lastCompScore);
  document.getElementById("multBadge").textContent = `Bonus ×${mult.toFixed(1)}`;
  document.getElementById("goldBadge").textContent = `🪙 ${state.gold}`;
  document.getElementById("pendingGoldLabel").textContent =
    `Pièces en attente (prochaine connexion / séance) : ${state.pendingGold} 🪙 (1 XP = 1 pièce)`;

  const rewardBanner = document.getElementById("rewardBanner");
  if (claimBannerText) {
    rewardBanner.textContent = claimBannerText;
    rewardBanner.classList.remove("hidden");
  } else {
    rewardBanner.classList.add("hidden");
  }

  let currentLvl = LEVELS[0];
  let nextLvl = LEVELS[LEVELS.length - 1];
  let prevXp = 0;

  for (let i = 0; i < LEVELS.length; i++) {
    if (state.xp >= LEVELS[i].xp) {
      currentLvl = LEVELS[i];
      prevXp = LEVELS[i].xp;
      nextLvl = LEVELS[i + 1] || LEVELS[i];
    } else {
      nextLvl = LEVELS[i];
      break;
    }
  }

  document.getElementById("levelTitle").textContent = `Niv. ${currentLvl.lvl} — ${currentLvl.title}`;
  document.getElementById("xpTotalLabel").textContent = `${state.xp} / ${nextLvl.xp} XP`;
  document.getElementById("nextUnlockLabel").textContent = `Débloque : ${currentLvl.reward}`;

  const span = Math.max(1, nextLvl.xp - prevXp);
  const pctXp = state.xp >= LEVELS[LEVELS.length - 1].xp
    ? 100
    : Math.min(100, Math.max(0, Math.round(((state.xp - prevXp) / span) * 100)));
  document.getElementById("xpBar").style.width = `${pctXp}%`;

  const target = state.goalMode === "999"
    ? 999
    : (state.prevWeekArrows > 0 ? state.prevWeekArrows : 100);

  document.getElementById("btnModePrev").classList.toggle("active", state.goalMode === "prev");
  document.getElementById("btnMode999").classList.toggle("active", state.goalMode === "999");
  document.getElementById("weekGoalModeLabel").textContent =
    state.goalMode === "999" ? "Mode : 999 flèches" : "Mode : Semaine N-1";

  document.getElementById("weekVolumeText").textContent = `${state.currentWeekArrows} / ${target} flèches`;
  document.getElementById("weekCompareText").textContent = `Semaine N-1 : ${state.prevWeekArrows}`;

  const pctWeek = Math.min(100, Math.round((state.currentWeekArrows / Math.max(1, target)) * 100));
  document.getElementById("weekBar").style.width = `${pctWeek}%`;

  if (state.lastCompScore !== null) {
    document.getElementById("lastCompScoreLabel").textContent = `${state.lastCompScore} / 600`;
    document.getElementById("compStatusMsg").textContent =
      state.lastCompScore >= 380
        ? `Actif : multiplicateur ×${mult.toFixed(1)} sur vos flèches.`
        : `Score < 380 : multiplicateur ×1.0 (seuil non atteint).`;
  } else {
    document.getElementById("lastCompScoreLabel").textContent = "Aucun (min. 380)";
    document.getElementById("compStatusMsg").textContent = "En dessous de 380/600 : multiplicateur ×1.0.";
  }

  renderCarnetSummary();

  const logList = document.getElementById("logList");
  if (state.logs.length === 0) {
    logList.innerHTML = `<p class="muted">Aucune séance enregistrée pour l'instant.</p>`;
  } else {
    logList.innerHTML = state.logs.map(l => {
      const typesLabel = Array.isArray(l.types) ? l.types.join(" + ") : (l.type || "Séance");
      const batchInfo = (l.batches || 1) > 1 ? ` • ${l.batches} séries` : "";
      return `
        <div class="entry">
          <div class="entry-top">
            <span>${l.date} • ${typesLabel}${batchInfo}</span>
            <span>+${l.xpGained} XP</span>
          </div>
          <div>🏹 ${l.arrows} flèches — 🎯 ${l.scoreText}</div>
          <div class="muted">${l.note || ""}</div>
        </div>
      `;
    }).join("");
  }

  renderSaisie();
}

function resetData() {
  const confirmed = window.confirm(
    "Attention : voulez-vous vraiment effacer toute votre progression (XP, pièces d'or, scores, carnet et volumes) ?"
  );
  if (!confirmed) return;

  localStorage.removeItem(STORAGE_KEY);
  state = defaultState();
  currentVolley = [];
  sessionArrows = [];
  claimBannerText = "";
  renderAll();
  switchTab("accueil");
}

checkWeeklyMondayReset(new Date(), false);
checkDailyLoginReward();
renderAll();

setInterval(() => {
  checkWeeklyMondayReset(new Date(), true);
}, 60000);