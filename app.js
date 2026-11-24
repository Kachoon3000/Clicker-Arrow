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

const MONSTER_NAMES = [
  "Mannequin de Paille",
  "Gobelin du Pas de Tir",
  "Loup des Bois",
  "Golem de Cible",
  "Chevalier d'Acier",
  "Gardien du Blason",
  "Dragon du Pas de Tir"
];

const AI_DUEL_OPPONENTS = {
  lvl1: {
    id: "lvl1",
    name: "IA Niveau 1",
    targetScore: 233, //[cite: 6]
    volleys: [
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "9", pts: 9 }], //[cite: 6]
      [{ label: "6", pts: 6 }, { label: "5", pts: 5 }, { label: "5", pts: 5 }], //[cite: 6]
      [{ label: "10", pts: 10 }, { label: "9", pts: 9 }, { label: "8", pts: 8 }], //[cite: 6]
      [{ label: "8", pts: 8 }, { label: "7", pts: 7 }, { label: "5", pts: 5 }], //[cite: 6]
      [{ label: "10", pts: 10 }, { label: "9", pts: 9 }, { label: "8", pts: 8 }], //[cite: 6]
      [{ label: "7", pts: 7 }, { label: "7", pts: 7 }, { label: "6", pts: 6 }], //[cite: 6]
      [{ label: "8", pts: 8 }, { label: "8", pts: 8 }, { label: "8", pts: 8 }], //[cite: 6]
      [{ label: "7", pts: 7 }, { label: "7", pts: 7 }, { label: "7", pts: 7 }], //[cite: 6]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "9", pts: 9 }], //[cite: 6]
      [{ label: "8", pts: 8 }, { label: "8", pts: 8 }, { label: "8", pts: 8 }] //[cite: 6]
    ]
  },
  lvl2: {
    id: "lvl2",
    name: "IA Niveau 2",
    targetScore: 234, //[cite: 7]
    volleys: [
      [{ label: "10", pts: 10 }, { label: "9", pts: 9 }, { label: "8", pts: 8 }], //[cite: 7]
      [{ label: "8", pts: 8 }, { label: "7", pts: 7 }, { label: "6", pts: 6 }], //[cite: 7]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "8", pts: 8 }], //[cite: 7]
      [{ label: "8", pts: 8 }, { label: "7", pts: 7 }, { label: "5", pts: 5 }], //[cite: 7]
      [{ label: "10", pts: 10 }, { label: "9", pts: 9 }, { label: "8", pts: 8 }], //[cite: 7]
      [{ label: "7", pts: 7 }, { label: "6", pts: 6 }, { label: "6", pts: 6 }], //[cite: 7]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "8", pts: 8 }], //[cite: 7]
      [{ label: "8", pts: 8 }, { label: "7", pts: 7 }, { label: "7", pts: 7 }], //[cite: 7]
      [{ label: "10", pts: 10 }, { label: "8", pts: 8 }, { label: "8", pts: 8 }], //[cite: 7]
      [{ label: "7", pts: 7 }, { label: "7", pts: 7 }, { label: "6", pts: 6 }] //[cite: 7]
    ]
  },
  lvl3: {
    id: "lvl3",
    name: "IA Niveau 3",
    targetScore: 260, //[cite: 8]
    volleys: [
      [{ label: "10", pts: 10 }, { label: "10", pts: 10 }, { label: "9", pts: 9 }], //[cite: 8]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "9", pts: 9 }], //[cite: 8]
      [{ label: "10", pts: 10 }, { label: "9", pts: 9 }, { label: "9", pts: 9 }], //[cite: 8]
      [{ label: "8", pts: 8 }, { label: "7", pts: 7 }, { label: "7", pts: 7 }], //[cite: 8]
      [{ label: "10", pts: 10 }, { label: "10", pts: 10 }, { label: "9", pts: 9 }], //[cite: 8]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "3", pts: 3 }], //[cite: 8]
      [{ label: "10", pts: 10 }, { label: "9", pts: 9 }, { label: "9", pts: 9 }], //[cite: 8]
      [{ label: "8", pts: 8 }, { label: "7", pts: 7 }, { label: "5", pts: 5 }], //[cite: 8]
      [{ label: "10", pts: 10 }, { label: "10", pts: 10 }, { label: "9", pts: 9 }], //[cite: 8]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "8", pts: 8 }] //[cite: 8]
    ]
  },
  lvl4: {
    id: "lvl4",
    name: "IA Niveau 4",
    targetScore: 269, //[cite: 5]
    volleys: [
      [{ label: "10", pts: 10 }, { label: "10", pts: 10 }, { label: "10", pts: 10 }], //[cite: 5]
      [{ label: "9", pts: 9 }, { label: "8", pts: 8 }, { label: "7", pts: 7 }], //[cite: 5]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "9", pts: 9 }], //[cite: 5]
      [{ label: "9", pts: 9 }, { label: "8", pts: 8 }, { label: "6", pts: 6 }], //[cite: 5]
      [{ label: "10", pts: 10 }, { label: "9", pts: 9 }, { label: "9", pts: 9 }], //[cite: 5]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "8", pts: 8 }], //[cite: 5]
      [{ label: "10", pts: 10 }, { label: "10", pts: 10 }, { label: "9", pts: 9 }], //[cite: 5]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "8", pts: 8 }], //[cite: 5]
      [{ label: "10", pts: 10 }, { label: "10", pts: 10 }, { label: "10", pts: 10 }], //[cite: 5]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "8", pts: 8 }] //[cite: 5]
    ]
  },
  lvl5: {
    id: "lvl5",
    name: "IA Niveau 5",
    targetScore: 269, //[cite: 9]
    volleys: [
      [{ label: "10", pts: 10 }, { label: "10", pts: 10 }, { label: "9", pts: 9 }], //[cite: 9]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "8", pts: 8 }], //[cite: 9]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "9", pts: 9 }], //[cite: 9]
      [{ label: "9", pts: 9 }, { label: "8", pts: 8 }, { label: "8", pts: 8 }], //[cite: 9]
      [{ label: "10", pts: 10 }, { label: "10", pts: 10 }, { label: "10", pts: 10 }], //[cite: 9]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "7", pts: 7 }], //[cite: 9]
      [{ label: "10", pts: 10 }, { label: "9", pts: 9 }, { label: "9", pts: 9 }], //[cite: 9]
      [{ label: "9", pts: 9 }, { label: "8", pts: 8 }, { label: "8", pts: 8 }], //[cite: 9]
      [{ label: "10", pts: 10 }, { label: "10", pts: 10 }, { label: "10", pts: 10 }], //[cite: 9]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "6", pts: 6 }] //[cite: 9]
    ]
  },
  lvl6: {
    id: "lvl6",
    name: "IA Niveau 6",
    targetScore: 272, //[cite: 10]
    volleys: [
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "9", pts: 9 }], //[cite: 10]
      [{ label: "9", pts: 9 }, { label: "8", pts: 8 }, { label: "7", pts: 7 }], //[cite: 10]
      [{ label: "10", pts: 10 }, { label: "10", pts: 10 }, { label: "10", pts: 10 }], //[cite: 10]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "9", pts: 9 }], //[cite: 10]
      [{ label: "10", pts: 10 }, { label: "10", pts: 10 }, { label: "9", pts: 9 }], //[cite: 10]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "5", pts: 5 }], //[cite: 10]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "9", pts: 9 }], //[cite: 10]
      [{ label: "9", pts: 9 }, { label: "9", pts: 9 }, { label: "9", pts: 9 }], //[cite: 10]
      [{ label: "10", pts: 10 }, { label: "10", pts: 10 }, { label: "10", pts: 10 }], //[cite: 10]
      [{ label: "10", pts: 10 }, { label: "9", pts: 9 }, { label: "9", pts: 9 }] //[cite: 10]
    ]
  }
};

const MONSTER_FIXED_HP = 30;
const GOLD_PER_MONSTER = 30;
const DUEL_MAX_ARROWS = 30;
const STORAGE_KEY = "archer_xp_prototype_v1";

let state = loadState();
let currentVolley = [];
let sessionArrows = [];
let combatArrows = [];
let combatMode = "monsters";
let selectedOpponentKey = "lvl1";
let duelCurrentVolley = [];
let duelCompletedVolleys = [];
let claimBannerText = "";

function getLastMondayResetTimestamp(now = new Date()) {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 1, 0, 0);
  const day = d.getDay();
  const diffFromMonday = (day + 6) % 7;
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
    bestCombatKills: 0,
    duelWins: 0,
    goalMode: "prev",
    currentWeekArrows: 0,
    prevWeekArrows: 0,
    logs: []
  };
}

function getTodayDate() {
  return new Date().toLocaleDateString("fr-FR");
}

function getCurrentMonthKey(dateStr = getTodayDate()) {
  const parts = String(dateStr).split("/");
  if (parts.length === 3) {
    return `${parts[1]}/${parts[2]}`;
  }
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  return `${mm}/${now.getFullYear()}`;
}

function getYearKey(dateStr = getTodayDate()) {
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
    merged.bestCombatKills = Number(merged.bestCombatKills) || 0;
    merged.duelWins = Number(merged.duelWins) || 0;
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

function awardXpAndQueueGold(xpAmount, extraGold = 0) {
  const cleanXp = Math.max(0, Math.round(xpAmount));
  const cleanExtraGold = Math.max(0, Math.round(extraGold));
  state.xp += cleanXp;
  state.pendingGold += cleanXp + cleanExtraGold;
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

  awardXpAndQueueGold(xpGained, 0);
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

  awardXpAndQueueGold(xpGained, 0);
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

function setCombatMode(mode) {
  combatMode = mode;
  renderCombat();
}

function computeCombatState() {
  let hp = MONSTER_FIXED_HP;
  let kills = 0;

  for (const arrow of combatArrows) {
    hp -= arrow.pts;
    if (hp <= 0) {
      kills += 1;
      hp = MONSTER_FIXED_HP;
    }
  }

  const monsterName = MONSTER_NAMES[kills % MONSTER_NAMES.length];
  const monsterGoldEarned = kills * GOLD_PER_MONSTER;

  return {
    arrowsCount: combatArrows.length,
    kills,
    currentHp: hp,
    maxHp: MONSTER_FIXED_HP,
    monsterName,
    monsterGoldEarned
  };
}

function addCombatArrow(label, pts) {
  if (combatArrows.length >= 60) return;

  const before = computeCombatState();
  combatArrows.push({ label, pts });
  const after = computeCombatState();

  const feedback = document.getElementById("combatFeedbackMsg");
  if (after.arrowsCount === 60) {
    feedback.textContent = `🏁 60/60 flèches tirées ! ${after.kills} monstre(s) vaincu(s) (+${after.monsterGoldEarned} 🪙). Cliquez sur « Terminer Défi ».`;
  } else if (after.kills > before.kills) {
    feedback.textContent = `💥 Monstre vaincu (+30 🪙) ! ${after.monsterName} #${after.kills + 1} apparaît avec 30 PV.`;
  } else {
    feedback.textContent = `🎯 Flèche ${label} (-${pts} PV) — Il reste ${after.currentHp} / 30 PV au monstre.`;
  }

  renderCombat();
}

function undoCombatArrow() {
  if (combatArrows.length === 0) return;
  combatArrows.pop();
  const current = computeCombatState();
  document.getElementById("combatFeedbackMsg").textContent =
    current.arrowsCount === 0
      ? "Chaque monstre a 30 PV. Chaque monstre vaincu = +30 🪙 en attente. Max 60 flèches !"
      : `Flèche annulée — ${current.currentHp} / 30 PV restants (${current.kills} vaincu(s)).`;
  renderCombat();
}

function finishCombatRun() {
  checkWeeklyMondayReset(new Date(), false);
  const count = combatArrows.length;
  if (count === 0) return;

  claimPendingGoldForNewSession();

  const combatStats = computeCombatState();
  const totalPts = combatArrows.reduce((sum, a) => sum + a.pts, 0);
  const mult = getMultiplier(state.lastCompScore);
  const xpGained = Math.round(count * mult);
  const monsterGoldBonus = combatStats.kills * GOLD_PER_MONSTER;
  const totalQueuedGold = xpGained + monsterGoldBonus;

  if (combatStats.kills > state.bestCombatKills) {
    state.bestCombatKills = combatStats.kills;
  }

  awardXpAndQueueGold(xpGained, monsterGoldBonus);
  state.currentWeekArrows += count;

  upsertDailyLog({
    type: "Combat",
    arrows: count,
    pts: totalPts,
    xpGained,
    note: `Combat : ${combatStats.kills} monstre(s) battu(s) (+${monsterGoldBonus} 🪙 monstres, +${totalQueuedGold} 🪙 en attente)`
  });

  combatArrows = [];
  document.getElementById("combatFeedbackMsg").textContent =
    "Chaque monstre a 30 PV. Chaque monstre vaincu = +30 🪙 en attente. Max 60 flèches !";

  saveState();
  renderAll();
  switchTab("accueil");
}

function getActiveOpponent() {
  return AI_DUEL_OPPONENTS[selectedOpponentKey] || AI_DUEL_OPPONENTS.lvl1;
}

function getAiVolleyForOpponent(opponent, volleyIndex) {
  const template = opponent.volleys[volleyIndex % opponent.volleys.length];
  return template.map(shot => ({ ...shot }));
}

function changeDuelOpponent(key) {
  if (!AI_DUEL_OPPONENTS[key]) return;
  selectedOpponentKey = key;
  duelCurrentVolley = [];
  duelCompletedVolleys = [];
  const opp = getActiveOpponent();
  const firstVolleyStr = opp.volleys[0].map(a => a.label).join(", ");
  const firstVolleySum = opp.volleys[0].reduce((s, a) => s + a.pts, 0);
  document.getElementById("duelStatusMsg").textContent =
    `Volée 1 : saisissez vos 3 flèches, ${opp.name} tirera ${firstVolleyStr} (${firstVolleySum} pts). Score final IA : ${opp.targetScore} pts.`;
  renderDuel();
}

function computeDuelTotals() {
  const completedPlayerSum = duelCompletedVolleys.reduce((s, v) => s + v.playerSum, 0);
  const currentPlayerSum = duelCurrentVolley.reduce((s, a) => s + a.pts, 0);
  const playerTotal = completedPlayerSum + currentPlayerSum;

  const aiTotal = duelCompletedVolleys.reduce((s, v) => s + v.aiSum, 0);
  const totalArrows = duelCompletedVolleys.length * 3 + duelCurrentVolley.length;

  return {
    totalArrows,
    playerTotal,
    aiTotal
  };
}

function addDuelArrow(label, pts) {
  const stats = computeDuelTotals();
  if (stats.totalArrows >= DUEL_MAX_ARROWS) return;

  const opp = getActiveOpponent();
  duelCurrentVolley.push({ label, pts });

  if (duelCurrentVolley.length === 3) {
    const volleyIdx = duelCompletedVolleys.length;
    const playerArrows = [...duelCurrentVolley];
    const playerSum = playerArrows.reduce((s, a) => s + a.pts, 0);
    const aiArrows = getAiVolleyForOpponent(opp, volleyIdx);
    const aiSum = aiArrows.reduce((s, a) => s + a.pts, 0);
    const prevAiCumul = volleyIdx > 0 ? duelCompletedVolleys[volleyIdx - 1].aiCumul : 0;
    const aiCumul = prevAiCumul + aiSum;

    duelCompletedVolleys.push({
      index: volleyIdx + 1,
      playerArrows,
      playerSum,
      aiArrows,
      aiSum,
      aiCumul
    });
    duelCurrentVolley = [];

    const after = computeDuelTotals();
    const statusEl = document.getElementById("duelStatusMsg");
    if (after.totalArrows >= DUEL_MAX_ARROWS) {
      let verdict = `Égalité (${opp.targetScore} pts) !`;
      if (after.playerTotal > opp.targetScore) {
        verdict = `🏆 Bravo ! Vous battez ${opp.name} (${after.playerTotal} vs ${opp.targetScore}) !`;
      } else if (after.playerTotal < opp.targetScore) {
        verdict = `🤖 ${opp.name} gagne (${opp.targetScore} vs ${after.playerTotal}).`;
      }
      statusEl.textContent = `🏁 30/30 flèches jouées ! ${verdict} Cliquez sur « Valider Duel ».`;
    } else {
      const nextAiVolley = getAiVolleyForOpponent(opp, volleyIdx + 1).map(a => a.label).join(", ");
      statusEl.textContent = `Volée ${volleyIdx + 1}/10 : Vous ${playerSum} pts vs IA ${aiSum} pts (cumul IA ${aiCumul}). Volée ${volleyIdx + 2} IA : ${nextAiVolley}.`;
    }
  } else {
    document.getElementById("duelStatusMsg").textContent =
      `Volée ${duelCompletedVolleys.length + 1}/10 en cours (${duelCurrentVolley.length}/3 flèches).`;
  }

  renderDuel();
}

function undoDuelArrow() {
  if (duelCurrentVolley.length > 0) {
    duelCurrentVolley.pop();
    document.getElementById("duelStatusMsg").textContent =
      `Flèche annulée dans la volée ${duelCompletedVolleys.length + 1}/10.`;
  } else if (duelCompletedVolleys.length > 0) {
    const lastVolley = duelCompletedVolleys.pop();
    duelCurrentVolley = lastVolley.playerArrows.slice(0, 2);
    document.getElementById("duelStatusMsg").textContent =
      `Volée ${lastVolley.index} annulée — 2 flèches conservées pour correction.`;
  }
  renderDuel();
}

function finishDuelMatch() {
  checkWeeklyMondayReset(new Date(), false);
  const stats = computeDuelTotals();
  if (stats.totalArrows === 0) return;

  claimPendingGoldForNewSession();

  const opp = getActiveOpponent();
  const mult = getMultiplier(state.lastCompScore);
  const xpGained = Math.round(stats.totalArrows * mult);

  let duelBonusGold = 0;
  let outcomeLabel = "Match nul";

  if (stats.playerTotal > opp.targetScore) {
    duelBonusGold = 30;
    outcomeLabel = "Victoire";
    state.duelWins += 1;
  } else if (stats.playerTotal === opp.targetScore) {
    duelBonusGold = 10;
    outcomeLabel = "Égalité";
  } else {
    outcomeLabel = "Défaite";
  }

  const totalQueuedGold = xpGained + duelBonusGold;
  awardXpAndQueueGold(xpGained, duelBonusGold);
  state.currentWeekArrows += stats.totalArrows;

  upsertDailyLog({
    type: `Duel ${opp.name}`,
    arrows: stats.totalArrows,
    pts: stats.playerTotal,
    xpGained,
    note: `Duel ${opp.name} : ${outcomeLabel} (${stats.playerTotal} vs ${opp.targetScore} pts, +${totalQueuedGold} 🪙 en attente)`
  });

  duelCurrentVolley = [];
  duelCompletedVolleys = [];
  const firstVolleyStr = opp.volleys[0].map(a => a.label).join(", ");
  const firstVolleySum = opp.volleys[0].reduce((s, a) => s + a.pts, 0);
  document.getElementById("duelStatusMsg").textContent =
    `Volée 1 : saisissez vos 3 flèches, ${opp.name} tirera ${firstVolleyStr} (${firstVolleySum} pts). Score final IA : ${opp.targetScore} pts.`;

  saveState();
  renderAll();
  switchTab("accueil");
}

function renderDuel() {
  const stats = computeDuelTotals();
  const opp = getActiveOpponent();

  document.getElementById("duelOpponentSelect").value = opp.id;
  document.getElementById("duelRecordLabel").textContent = `Victoires : ${state.duelWins}`;
  document.getElementById("duelPlayerScore").textContent = stats.playerTotal;
  document.getElementById("duelAiScore").textContent = stats.aiTotal;
  document.getElementById("duelAiLabel").textContent = `${opp.name} (Cumul)`;
  document.getElementById("duelPlayerTargetInfo").textContent = `À battre : ${opp.targetScore} pts`;
  document.getElementById("duelAiTargetInfo").textContent = `Final IA : ${opp.targetScore} pts`;

  const currentUnfinishedPlayer = duelCurrentVolley.reduce((s, a) => s + a.pts, 0);
  document.getElementById("duelVolleyProgress").textContent = `${duelCurrentVolley.length}/3`;
  document.getElementById("duelArrowsCount").textContent = `${stats.totalArrows} / ${DUEL_MAX_ARROWS}`;

  const slots = document.getElementById("duelCurrentSlots");
  slots.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const div = document.createElement("div");
    div.className = "arrow-slot";
    div.textContent = duelCurrentVolley[i] ? duelCurrentVolley[i].label : "-";
    slots.appendChild(div);
  }
  const sumSlot = document.createElement("div");
  sumSlot.className = "arrow-slot arrow-sum";
  sumSlot.textContent = `=${currentUnfinishedPlayer}`;
  slots.appendChild(sumSlot);

  const historyEl = document.getElementById("duelVolleysHistory");
  if (duelCompletedVolleys.length === 0) {
    historyEl.innerHTML = `<p class="muted">Aucune volée terminée pour l'instant (10 volées / 30 flèches).</p>`;
  } else {
    historyEl.innerHTML = duelCompletedVolleys.map(v => `
      <div class="duel-volley-row">
        <span><strong>V${v.index}</strong> : Vous <strong>${v.playerSum}</strong> (${v.playerArrows.map(a => a.label).join("-")})</span>
        <span>IA <strong>${v.aiSum}</strong> (${v.aiArrows.map(a => a.label).join("-")}) • Cumul ${v.aiCumul}</span>
      </div>
    `).join("");
  }
}

function renderCombat() {
  const isMonsters = combatMode === "monsters";
  document.getElementById("btnCombatModeMonsters").classList.toggle("active", isMonsters);
  document.getElementById("btnCombatModeDuel").classList.toggle("active", !isMonsters);
  document.getElementById("combat-subview-monsters").classList.toggle("hidden", !isMonsters);
  document.getElementById("combat-subview-duel").classList.toggle("hidden", isMonsters);

  const stats = computeCombatState();
  document.getElementById("combatBestRecordLabel").textContent = `Record : ${state.bestCombatKills} vaincus`;
  document.getElementById("combatArrowsCountLabel").textContent = `${stats.arrowsCount} / 60`;
  document.getElementById("combatKillsLabel").textContent = `${stats.kills} (+${stats.monsterGoldEarned} 🪙)`;
  document.getElementById("monsterNameLabel").textContent = `🐉 ${stats.monsterName} #${stats.kills + 1}`;
  document.getElementById("monsterHpLabel").textContent = `${stats.currentHp} / ${stats.maxHp} PV`;

  const pct = Math.max(0, Math.min(100, Math.round((stats.currentHp / stats.maxHp) * 100)));
  document.getElementById("monsterHpBar").style.width = `${pct}%`;

  renderDuel();
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

function renderCarnetSummary() {
  const container = document.getElementById("carnetSummaryGrid");
  if (!container) return;

  const today = getTodayDate();
  const currentMonthKey = getCurrentMonthKey(today);
  const currentYearKey = getYearKey(today);

  const lastSession = state.logs[0] || null;
  const lastSessionMain = lastSession
    ? `🏹 ${lastSession.arrows} flèches • +${lastSession.xpGained || 0} XP`
    : "Aucune séance";
  const lastSessionSub = lastSession
    ? `${lastSession.date} — ${lastSession.scoreText || "Non noté"}`
    : "Ajoutez une séance pour démarrer";

  const mult = getMultiplier(state.lastCompScore);
  const lastCompMain = state.lastCompScore !== null
    ? `🏆 ${state.lastCompScore} / 600`
    : "Aucune compétition";
  const lastCompSub = state.lastCompScore !== null
    ? `${state.lastCompDate ? `${state.lastCompDate} • ` : ""}Bonus ×${mult.toFixed(1)}`
    : "Seuil minimum : 380 / 600";

  const lastWeekArrows = Number(state.prevWeekArrows) || 0;
  const currentWeekArrows = Number(state.currentWeekArrows) || 0;

  const monthLogs = state.logs.filter(item => getCurrentMonthKey(item.date) === currentMonthKey);
  const monthArrows = monthLogs.reduce((sum, item) => sum + (Number(item.arrows) || 0), 0);
  const monthPts = monthLogs.reduce((sum, item) => sum + (Number(item.totalPts) || 0), 0);
  const monthScoredArrows = monthLogs.reduce((sum, item) => sum + (Number(item.scoredArrows) || 0), 0);
  const monthSub = monthScoredArrows > 0
    ? `Moy. ${(monthPts / monthScoredArrows).toFixed(2)} pts/flèche`
    : `${monthLogs.length} jour(s) sur ${currentMonthKey}`;

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
  renderCombat();
}

function resetData() {
  const confirmed = window.confirm(
    "Attention : voulez-vous vraiment effacer toute votre progression (XP, pièces d'or, scores, records de combat/duel, carnet et volumes) ?"
  );
  if (!confirmed) return;

  localStorage.removeItem(STORAGE_KEY);
  state = defaultState();
  currentVolley = [];
  sessionArrows = [];
  combatArrows = [];
  duelCurrentVolley = [];
  duelCompletedVolleys = [];
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
