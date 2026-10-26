/* Mokum × Around The Corner — portalul owner-ului */
(function () {
  "use strict";

  var CFG = window.MOKUM_CONFIG || {};
  var THEME_KEY = "mokum-portal-theme";
  var SECTIONS = ["actions", "pl", "kpi", "team", "courses", "org", "raci", "jobs", "playbook", "hospitality", "cjm", "equipment", "contacts"];
  var MONTHS = ["ian", "feb", "mar", "apr", "mai", "iun", "iul", "aug", "sep", "oct", "nov", "dec"];
  var MONTHS_LONG = ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"];

  var ICONS = {
    home: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
    pl: "M4 19V5M4 19h16M8 15l4-4 3 3 5-6",
    kpi: "M12 14l4-4M4 18a8 8 0 1 1 16 0",
    team: "M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6M21 19v-1a4 4 0 0 0-3-3.9M15.5 4.1a3 3 0 0 1 0 5.8",
    org: "M9 3h6v5H9zM12 8v3M5 11h14M5 11v3M19 11v3M12 11v3M3 14h4v5H3zM10 14h4v5h-4zM17 14h4v5h-4z",
    raci: "M3 4h18v16H3zM3 10h18M3 15h18M9 4v16M15 4v16",
    jobs: "M9 3h6v3H9zM7 4.5H5V21h14V4.5h-2M8 11h8M8 15h5",
    heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
    cjm: "M5 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4M19 16a2 2 0 1 1 0 4 2 2 0 0 1 0-4M7 6h7a3 3 0 0 1 0 6h-4a3 3 0 0 0 0 6h7",
    book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7",
    cap: "M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6",
    cup: "M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6zM17 10h1.5a2.5 2.5 0 0 1 0 5H16M8 2v3M12 2v3",
    phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
    board: "M4 4h4v16H4zM10 4h4v10h-4zM16 4h4v13h-4z"
  };

  var NAV = [
    { name: "Conducere", items: [
      { id: "panou", title: "Panou", icon: "home" },
      { id: "plan", title: "Plan de acțiune", icon: "board" },
      { id: "pl", title: "P&L", icon: "pl" },
      { id: "kpi", title: "KPI-uri", icon: "kpi" }
    ] },
    { name: "Oameni", items: [
      { id: "echipa", title: "Echipa & punctaje", icon: "team" },
      { id: "organigrama", title: "Organigramă", icon: "org" },
      { id: "raci", title: "RACI", icon: "raci" },
      { id: "fise", title: "Fișele posturilor", icon: "jobs" }
    ] },
    { name: "Experiența Mokum", items: [
      { id: "ospitalitate", title: "Direcția de ospitalitate", icon: "heart" },
      { id: "cjm", title: "Customer Journey Map", icon: "cjm" },
      { id: "playbook", title: "Playbook", icon: "book" }
    ] },
    { name: "Academia ATC", items: [
      { id: "cursuri", title: "Cursuri ATC", icon: "cap" }
    ] },
    { name: "Operațiuni", items: [
      { id: "echipamente", title: "Echipamente", icon: "cup" },
      { id: "contacte", title: "Contacte", icon: "phone" }
    ] }
  ];

  // Fotografiile Mokum (assets/photos/…). Cât timp o cale e goală, se afișează
  // zona de culoare din brandbook (lumini, umbre sau tonuri medii).
  var PHOTOS = {
    gate: "assets/photos/latte-turnare.jpg",
    hero: "assets/photos/bar-randare-front.jpg",
    ospitalitate: "assets/photos/espresso-masa.jpg",
    playbook: "assets/photos/bar-randare-strada.jpg",
    cursuri: "assets/photos/latte-turnare.jpg",
    cjm: "assets/photos/bar-randare-strada.jpg",
    organigrama: "", raci: "", fise: "", contacte: ""
  };
  function photo(key, tone, extraCls, inner) {
    var src = PHOTOS[key];
    return '<div class="photo ' + (tone || "ph-shadow") + (src ? " has-img" : "") + (extraCls ? " " + extraCls : "") + '"' +
      (src ? ' style="background-image:url(\'' + esc(src) + '\')"' : "") + ">" + (inner || "") + "</div>";
  }

  var state = {
    mode: null,          // "live" după autentificare
    user: null,
    data: {},
    meta: {},            // section -> { updated_at, updated_by }
    edit: false,
    route: "panou",
    ui: {}
  };
  var sb = null;

  // Linkurile din emailurile Supabase (invitație, resetare parolă) aduc
  // token-ul sau eroarea în hash; le citim înainte să le consume clientul.
  var AUTH_HASH = /access_token=|error_description=/.test(location.hash) ? location.hash : "";
  var needsPassword = /type=(invite|recovery)/.test(AUTH_HASH);

  // ---------- Utilitare ----------
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function uid(p) { return (p || "x") + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* fără stocare locală */ } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) { /* fără stocare locală */ } }
  function isNum(v) { return typeof v === "number" && isFinite(v); }
  function sum(arr) { return arr.reduce(function (a, b) { return a + (isNum(b) ? b : 0); }, 0); }

  var nf0 = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 });
  var nf1 = new Intl.NumberFormat("ro-RO", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  var nf2 = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 2 });
  function money(v) { return isNum(v) ? nf0.format(v) : "—"; }
  function moneyC(v) { return isNum(v) ? nf0.format(v) + " " + esc(cur()) : "—"; }
  function pct(v) { return isNum(v) ? nf1.format(v) + "%" : "—"; }
  function compact(v) {
    if (!isNum(v)) return "";
    var a = Math.abs(v);
    if (a >= 1e6) return nf1.format(v / 1e6) + "M";
    if (a >= 1e3) return nf0.format(v / 1e3) + "k";
    return nf0.format(v);
  }
  function compactMoney(v) {
    if (!isNum(v)) return "—";
    return (Math.abs(v) >= 1e5 ? nf0.format(v / 1e3) + "k" : nf0.format(v)) + " " + esc(cur());
  }
  function cur() { return (state.data.pl && state.data.pl.currency) || "RON"; }
  function parseNum(s) {
    s = String(s == null ? "" : s).trim().replace(/\s/g, "").replace(/%$/, "");
    if (!s) return null;
    if (s.indexOf(",") !== -1 && s.indexOf(".") !== -1) s = s.replace(/\./g, "").replace(",", ".");
    else if (s.indexOf(",") !== -1) s = s.replace(",", ".");
    var n = Number(s);
    return isFinite(n) ? n : null;
  }
  function getPath(o, path) {
    var parts = String(path).split(".");
    for (var i = 0; i < parts.length; i++) {
      if (o == null) return undefined;
      o = o[parts[i]];
    }
    return o;
  }
  function setPath(o, path, val) {
    var parts = String(path).split(".");
    for (var i = 0; i < parts.length - 1; i++) {
      if (o[parts[i]] == null || typeof o[parts[i]] !== "object") o[parts[i]] = {};
      o = o[parts[i]];
    }
    o[parts[parts.length - 1]] = val;
  }
  function todayISO() { return new Date().toISOString().slice(0, 10); }
  function daysUntil(iso) {
    if (!iso) return null;
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return null;
    var t = new Date(todayISO() + "T00:00:00");
    return Math.round((d - t) / 86400000);
  }
  function fmtDate(iso) {
    if (!iso) return "—";
    var p = String(iso).slice(0, 10).split("-");
    if (p.length !== 3) return esc(iso);
    return Number(p[2]) + " " + MONTHS[Number(p[1]) - 1] + " " + p[0];
  }
  function monthLabel(key) {
    var p = String(key).split("-");
    return MONTHS_LONG[Number(p[1]) - 1] + " " + p[0];
  }
  function initials(name) {
    return String(name || "?").trim().split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0).toUpperCase(); }).join("");
  }
  function icon(name) {
    return '<svg class="nav-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + ICONS[name] + '"/></svg>';
  }

  // Markdown simplu: titluri, liste, citate, **bold**, *italic*, linkuri http(s).
  function inlineMd(t) {
    return esc(t)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }
  function md(src) {
    var lines = String(src || "").replace(/\r/g, "").split("\n");
    var out = [], para = [], list = null;
    function flushPara() { if (para.length) { out.push("<p>" + para.map(inlineMd).join("<br>") + "</p>"); para = []; } }
    function closeList() { if (list) { out.push("</" + list + ">"); list = null; } }
    lines.forEach(function (raw) {
      var line = raw.trim(), m;
      if (!line) { flushPara(); closeList(); return; }
      if ((m = line.match(/^(#{1,3})\s+(.*)$/))) {
        flushPara(); closeList();
        var tag = m[1].length >= 3 ? "h4" : "h3";
        out.push("<" + tag + ">" + inlineMd(m[2]) + "</" + tag + ">");
        return;
      }
      if ((m = line.match(/^[-*•]\s+(.*)$/)) || (m = line.match(/^\d+[.)]\s+(.*)$/))) {
        flushPara();
        var want = /^\d/.test(line) ? "ol" : "ul";
        if (list !== want) { closeList(); out.push("<" + want + ">"); list = want; }
        out.push("<li>" + inlineMd(m[1]) + "</li>");
        return;
      }
      if ((m = line.match(/^>\s?(.*)$/))) {
        flushPara(); closeList();
        out.push("<blockquote>" + inlineMd(m[1]) + "</blockquote>");
        return;
      }
      closeList();
      para.push(line);
    });
    flushPara(); closeList();
    return out.join("");
  }

  // ---------- Câmpuri editabile ----------
  // Fiecare câmp poartă secțiunea și calea în date; un singur handler le salvează.
  function field(sec, path, val, o) {
    o = o || {};
    var attrs = ' data-sec="' + sec + '" data-bind="' + esc(path) + '"' +
      (o.label ? ' aria-label="' + esc(o.label) + '"' : "") +
      (o.placeholder ? ' placeholder="' + esc(o.placeholder) + '"' : "");
    var type = o.type || "text";
    if (type === "textarea") {
      return '<textarea class="inp" rows="' + (o.rows || 4) + '"' + attrs + '>' + esc(val) + "</textarea>";
    }
    if (type === "select") {
      return '<select class="inp"' + attrs + (o.kind ? ' data-kind="' + o.kind + '"' : "") + ">" + o.options.map(function (op) {
        var v = typeof op === "object" ? op.v : op, l = typeof op === "object" ? op.l : op;
        return '<option value="' + esc(v) + '"' + (String(v) === String(val == null ? "" : val) ? " selected" : "") + ">" + esc(l) + "</option>";
      }).join("") + "</select>";
    }
    if (type === "check") {
      return '<input type="checkbox" data-kind="bool"' + attrs + (val ? " checked" : "") + ">";
    }
    if (type === "num") {
      return '<input class="inp num" type="text" inputmode="decimal" data-kind="num"' + attrs +
        ' value="' + esc(val == null ? "" : val) + '">';
    }
    return '<input class="inp" type="' + type + '"' + attrs + ' value="' + esc(val == null ? "" : val) + '">';
  }
  function btn(act, label, data, cls) {
    var attrs = "";
    Object.keys(data || {}).forEach(function (k) { attrs += " data-" + k + '="' + esc(data[k]) + '"'; });
    return '<button type="button" class="btn btn-sm ' + (cls || "btn-ghost") + '" data-act="' + act + '"' + attrs + ">" + label + "</button>";
  }
  function delBtn(sec, path, idx, what) {
    return '<button type="button" class="iconbtn" data-act="del" data-sec="' + sec + '" data-path="' + esc(path) +
      '" data-idx="' + idx + '" data-what="' + esc(what || "rândul") + '" aria-label="Șterge" title="Șterge">✕</button>';
  }
  function moveBtns(sec, path, idx) {
    return '<button type="button" class="iconbtn" data-act="move" data-dir="-1" data-sec="' + sec + '" data-path="' + esc(path) + '" data-idx="' + idx + '" aria-label="Mută în sus" title="Mută în sus">↑</button> ' +
      '<button type="button" class="iconbtn" data-act="move" data-dir="1" data-sec="' + sec + '" data-path="' + esc(path) + '" data-idx="' + idx + '" aria-label="Mută în jos" title="Mută în jos">↓</button>';
  }
  function uiSelect(key, val, options, label) {
    return '<select class="inp" data-ui="' + key + '" aria-label="' + esc(label || key) + '">' + options.map(function (op) {
      return '<option value="' + esc(op.v) + '"' + (String(op.v) === String(val) ? " selected" : "") + ">" + esc(op.l) + "</option>";
    }).join("") + "</select>";
  }

  // ---------- Date: șabloane & normalizare ----------
  function emptyData() {
    var T = window.MOKUM_TEMPLATES;
    var y = String(new Date().getFullYear());
    var years = {};
    years[y] = { lines: T.plLines.map(function (l) { return { id: l.id, group: l.group, name: l.name, labor: !!l.labor, values: blank12() }; }) };
    return {
      actions: { items: [] },
      pl: { currency: "RON", targets: clone(T.plTargets), years: years },
      kpi: { items: T.kpi.map(function (k) { var c = clone(k); c.values = {}; return c; }) },
      team: { criteria: clone(T.criteria), members: [] },
      courses: { items: [] },
      org: { nodes: [] },
      raci: clone(T.raci),
      jobs: clone(T.jobs),
      playbook: { chapters: clone(T.playbook) },
      hospitality: { chapters: clone(T.hospitality) },
      cjm: { stages: clone(T.cjmStages), rows: clone(T.cjmRows), cells: {} },
      equipment: { items: [] },
      contacts: { items: [] }
    };
  }
  function blank12() { return [null, null, null, null, null, null, null, null, null, null, null, null]; }
  function normalize(all) {
    var base = emptyData();
    SECTIONS.forEach(function (s) {
      if (!all[s] || typeof all[s] !== "object") all[s] = base[s];
      Object.keys(base[s]).forEach(function (k) {
        if (all[s][k] == null) all[s][k] = base[s][k];
      });
    });
    return all;
  }

  var NEW = {
    action: function () { return { id: uid("a"), title: "", desc: "", area: "Operațiuni", owner: "", due: "", status: "todo", priority: false }; },
    kpi: function () { return { id: uid("k"), name: "KPI nou", unit: "", target: null, better: "up", owner: "", values: {} }; },
    criterion: function () { return { id: uid("c"), name: "Criteriu nou", weight: 10, desc: "" }; },
    member: function () { return { id: uid("m"), name: "Nume Prenume", role: "Barista", since: todayISO(), lastReview: "", scores: {}, courses: [], notes: "" }; },
    course: function () { return { id: uid("k"), title: "Curs nou", module: "Bar", level: "Bază", duration: "", link: "", desc: "" }; },
    node: function () { return { id: uid("n"), title: "Rol nou", person: "", parent: "", external: false }; },
    task: function () {
      var roles = state.data.raci.roles, cells = {};
      roles.forEach(function (r) { cells[r.id] = ""; });
      return { id: uid("t"), area: "General", name: "Activitate nouă", cells: cells };
    },
    role: function () { return { id: uid("ro"), name: "Rol nou" }; },
    job: function () { return { id: uid("j"), title: "Post nou", reportsTo: "", schedule: "", purpose: "", responsibilities: "", skills: "", kpis: "" }; },
    chapter: function () { return { id: uid("p"), title: "Capitol nou", body: "" }; },
    stage: function () { return { id: uid("s"), name: "Etapă nouă", emotion: 0 }; },
    cjmrow: function () { return { id: uid("r"), name: "Rând nou" }; },
    equipment: function () { return { id: uid("e"), name: "Echipament nou", brand: "", serial: "", bought: "", supplier: "", lastService: "", nextService: "", warranty: "", status: "Funcțional", notes: "" }; },
    contact: function () { return { id: uid("ct"), name: "Contact nou", category: "Furnizor", person: "", phone: "", email: "", web: "", notes: "" }; }
  };

  // ---------- Stocare ----------
  var timers = {}, pending = {}, saving = 0;
  function setSaveState(text, err) {
    var el = $("save-state");
    el.textContent = text;
    el.classList.toggle("err", !!err);
  }
  function markDirty(sec) {
    pending[sec] = true;
    setSaveState("Se salvează…");
    clearTimeout(timers[sec]);
    timers[sec] = setTimeout(function () { flush(sec); }, 600);
  }
  function flush(sec) {
    if (!pending[sec]) return Promise.resolve();
    pending[sec] = false;
    saving++;
    var row = {
      section: sec,
      data: state.data[sec],
      updated_at: new Date().toISOString(),
      updated_by: state.user && state.user.email
    };
    return sb.from("portal_docs").upsert(row).then(function (res) {
      saving--;
      if (res.error) {
        pending[sec] = true;
        setSaveState("Nu s-a salvat: " + res.error.message, true);
        return;
      }
      state.meta[sec] = { updated_at: row.updated_at, updated_by: row.updated_by };
      if (!saving) setSaveState("Salvat ✓");
    });
  }
  function flushAll() {
    return Promise.all(SECTIONS.map(function (s) { clearTimeout(timers[s]); return flush(s); }));
  }
  window.addEventListener("beforeunload", function (e) {
    var dirty = SECTIONS.some(function (s) { return pending[s]; });
    if (dirty) { flushAll(); e.preventDefault(); e.returnValue = ""; }
  });

  function loadLive(user) {
    state.user = user;
    return sb.from("portal_members").select("email, role, name").eq("email", (user.email || "").toLowerCase()).maybeSingle()
      .then(function (res) {
        if (res.error) throw res.error;
        if (!res.data) {
          gateMsg("Contul " + user.email + " nu are acces la portal. Cere acces de la Around The Corner.");
          return sb.auth.signOut().then(function () { showGate(); });
        }
        state.member = res.data;
        return sb.from("portal_docs").select("section, data, updated_at, updated_by").then(function (r) {
          if (r.error) throw r.error;
          var all = {};
          (r.data || []).forEach(function (row) {
            all[row.section] = row.data;
            state.meta[row.section] = { updated_at: row.updated_at, updated_by: row.updated_by };
          });
          state.data = normalize(all);
          state.mode = "live";
          startApp();
        });
      })
      .catch(function (err) {
        showGate();
        gateMsg("Nu s-a putut încărca portalul: " + (err.message || err));
      });
  }

  // ---------- Gate & autentificare ----------
  function gateMsg(t, ok) {
    var el = $("gate-msg");
    el.textContent = t || "";
    el.classList.toggle("ok", !!ok);
  }
  function showGate() {
    if (PHOTOS.gate) { $("gate-photo").classList.add("has-img"); $("gate-photo").style.backgroundImage = "url('" + PHOTOS.gate + "')"; }
    $("app").classList.add("hidden");
    $("gate").classList.remove("hidden");
    var live = !!sb;
    $("login-form").classList.toggle("hidden", !live);
    $("setpass-form").classList.add("hidden");
    $("no-backend").classList.toggle("hidden", live);
  }
  function showSetPassword() {
    showGate();
    $("login-form").classList.add("hidden");
    $("setpass-form").classList.remove("hidden");
    $("new-pass").focus();
  }
  function clearAuthHash() {
    if (window.history && history.replaceState) history.replaceState(null, "", location.pathname + location.search);
  }

  function initAuth() {
    if (CFG.supabaseUrl && CFG.supabaseKey && window.supabase && window.supabase.createClient) {
      sb = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseKey);
    }
    if (!sb) { showGate(); return; }

    $("login-form").addEventListener("submit", function (e) {
      e.preventDefault();
      gateMsg("");
      sb.auth.signInWithPassword({ email: $("login-email").value.trim(), password: $("login-pass").value })
        .then(function (res) { if (res.error) gateMsg(authError(res.error)); });
    });
    $("forgot").addEventListener("click", function (e) {
      e.preventDefault();
      var email = $("login-email").value.trim();
      if (!email) { gateMsg("Scrie întâi emailul în câmpul de mai sus."); return; }
      sb.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname })
        .then(function (res) {
          if (res.error) gateMsg(authError(res.error));
          else gateMsg("Ți-am trimis un email cu linkul de resetare a parolei.", true);
        });
    });

    $("setpass-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var p1 = $("new-pass").value, p2 = $("new-pass2").value;
      if (p1.length < 8) { gateMsg("Parola trebuie să aibă minimum 8 caractere."); return; }
      if (p1 !== p2) { gateMsg("Cele două parole nu coincid."); return; }
      gateMsg("");
      sb.auth.updateUser({ password: p1 }).then(function (res) {
        if (res.error) { gateMsg(authError(res.error)); return; }
        needsPassword = false;
        loadLive(res.data.user);
      });
    });

    if (/error_description=/.test(AUTH_HASH)) {
      clearAuthHash();
      showGate();
      gateMsg(/expired|invalid/i.test(decodeURIComponent(AUTH_HASH))
        ? "Linkul din email a expirat sau a fost deja folosit. Cere o invitație nouă sau folosește „Ai uitat parola?”."
        : "Linkul din email nu a funcționat. Cere unul nou.");
    }

    var started = false;
    sb.auth.onAuthStateChange(function (event, session) {
      if (event === "PASSWORD_RECOVERY") needsPassword = true;
      if (session && session.user && !started) {
        started = true;
        // ieșim din callback înainte de alte apeluri Supabase
        setTimeout(function () {
          clearAuthHash();
          if (needsPassword) showSetPassword();
          else loadLive(session.user);
        }, 0);
      }
      if (!session && event === "SIGNED_OUT") { started = false; }
    });
    sb.auth.getSession().then(function (res) {
      if (!res.data || !res.data.session) showGate();
    });
  }
  function authError(err) {
    var m = String(err && err.message || "");
    if (/invalid login/i.test(m)) return "Email sau parolă greșite.";
    if (/rate limit|too many/i.test(m)) return "Prea multe încercări, așteaptă puțin.";
    return "Nu a mers: " + m;
  }

  // ---------- Pornirea aplicației ----------
  function startApp() {
    $("gate").classList.add("hidden");
    $("app").classList.remove("hidden");
    var badge = $("mode-badge");
    badge.textContent = "Online";
    badge.className = "badge live";
    var who = (state.member && state.member.name) || state.user.email;
    $("user-name").textContent = who;
    $("user-avatar").textContent = initials(who);
    setSaveState("");
    buildNav();
    route();
  }

  function buildNav() {
    $("nav").innerHTML = NAV.map(function (g) {
      return '<div class="nav-group"><h4 class="eyebrow">' + esc(g.name) + "</h4>" + g.items.map(function (it) {
        return '<button type="button" class="nav-item" data-route="' + it.id + '">' + icon(it.icon) + "<span>" + esc(it.title) +
          '</span><span class="nav-count hidden" data-count="' + it.id + '"></span></button>';
      }).join("") + "</div>";
    }).join("");
  }

  // Contoarele din meniu și echipa din bara laterală urmăresc datele curente.
  function refreshSidebar() {
    var counts = {
      plan: state.data.actions.items.filter(function (a) { return a.status === "doing"; }).length,
      echipamente: state.data.equipment.items.filter(function (e) { var c = serviceStatus(e).c; return c === "bad" || c === "warn"; }).length
    };
    var els = document.querySelectorAll("[data-count]");
    for (var i = 0; i < els.length; i++) {
      var n = counts[els[i].getAttribute("data-count")];
      els[i].textContent = n || "";
      els[i].classList.toggle("hidden", !n);
    }
    var crit = state.data.team.criteria;
    var list = state.data.team.members.map(function (m) { return { m: m, s: overall(m, crit) }; })
      .sort(function (a, b) { return (isNum(b.s) ? b.s : -1) - (isNum(a.s) ? a.s : -1); });
    $("sb-members").innerHTML = list.length ? '<h4 class="eyebrow"><span>Echipa</span><a href="#/echipa" class="small" style="letter-spacing:0;text-transform:none">Toți</a></h4>' +
      list.slice(0, 6).map(function (x) {
        return '<a class="sb-member" href="#/echipa"><span class="avatar avatar-sm">' + esc(initials(x.m.name)) + '</span><span><div class="n">' + esc(x.m.name) +
          '</div><div class="r">' + esc(x.m.role) + '</div></span><span class="s">' + (isNum(x.s) ? nf0.format(x.s) : "–") + "</span></a>";
      }).join("") : "";
  }

  function findNav(id) {
    for (var i = 0; i < NAV.length; i++) {
      for (var j = 0; j < NAV[i].items.length; j++) {
        if (NAV[i].items[j].id === id) return { group: NAV[i].name, item: NAV[i].items[j] };
      }
    }
    if (id === "setari") return { group: "Portal", item: { id: "setari", title: "Setări & backup" } };
    return null;
  }

  function route() {
    var id = (location.hash || "").replace(/^#\/?/, "") || "panou";
    if (!findNav(id) || !VIEWS[id]) id = "panou";
    state.route = id;
    document.body.setAttribute("data-page", id);
    var nav = findNav(id);
    $("page-title").textContent = nav.item.title;
    $("page-group").textContent = nav.group;
    document.title = nav.item.title + " · Mokum";
    var items = document.querySelectorAll(".nav-item");
    for (var i = 0; i < items.length; i++) {
      if (items[i].getAttribute("data-route") === id) items[i].setAttribute("aria-current", "page");
      else items[i].removeAttribute("aria-current");
    }
    document.body.classList.remove("nav-open");
    render();
    window.scrollTo(0, 0);
  }

  function render() {
    var html = "";
    if (state.edit && state.route !== "panou" && state.route !== "plan") {
      html += '<div class="edit-banner">Mod editare: modificările se salvează automat' +
        " pentru toți cei cu acces.</div>";
    }
    try {
      html += VIEWS[state.route]();
    } catch (err) {
      html += '<div class="empty">Secțiunea nu a putut fi afișată: ' + esc(err.message) + "</div>";
      if (window.console) console.error(err);
    }
    $("view").innerHTML = html;
    refreshSidebar();
  }

  // Re-randare după o modificare, păstrând câmpul în care lucrează utilizatorul.
  function keyOf(el) {
    if (!el || !el.getAttribute) return null;
    if (el.getAttribute("data-bind")) return el.getAttribute("data-sec") + "|" + el.getAttribute("data-bind");
    if (el.getAttribute("data-ui")) return "ui|" + el.getAttribute("data-ui");
    return null;
  }
  var rerenderQueued = false;
  function rerender() {
    if (rerenderQueued) return;
    rerenderQueued = true;
    setTimeout(function () {
      rerenderQueued = false;
      var a = document.activeElement, key = keyOf(a), selS = null, selE = null;
      try { selS = a.selectionStart; selE = a.selectionEnd; } catch (e) { /* nu e câmp text */ }
      var y = window.scrollY;
      render();
      window.scrollTo(0, y);
      if (key) {
        var els = $("view").querySelectorAll("[data-bind],[data-ui]");
        for (var i = 0; i < els.length; i++) {
          if (keyOf(els[i]) === key) {
            els[i].focus({ preventScroll: true });
            try { if (selS != null) els[i].setSelectionRange(selS, selE); } catch (e) { /* nu e câmp text */ }
            break;
          }
        }
      }
    }, 0);
  }

  // ---------- Evenimente ----------
  function onFieldChange(el) {
    var sec = el.getAttribute("data-sec"), path = el.getAttribute("data-bind");
    var kind = el.getAttribute("data-kind"), v;
    if (kind === "bool") v = el.checked;
    else if (kind === "num") v = parseNum(el.value);
    else v = el.value;
    setPath(state.data[sec], path, v);
    markDirty(sec);
    rerender();
  }

  var ACTIONS = {
    add: function (d) {
      var arr = getPath(state.data[d.sec], d.path);
      if (!Array.isArray(arr)) { arr = []; setPath(state.data[d.sec], d.path, arr); }
      arr.push(NEW[d.tpl]());
      return d.sec;
    },
    del: function (d) {
      var arr = getPath(state.data[d.sec], d.path);
      var item = arr[Number(d.idx)];
      var name = item && (item.name || item.title) ? " „" + (item.name || item.title) + "”" : "";
      if (!window.confirm("Ștergi " + d.what + name + "?")) return null;
      arr.splice(Number(d.idx), 1);
      return d.sec;
    },
    move: function (d) {
      var arr = getPath(state.data[d.sec], d.path), i = Number(d.idx), j = i + Number(d.dir);
      if (j < 0 || j >= arr.length) return null;
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
      return d.sec;
    },
    "pl-add-line": function (d) {
      plYearData().lines.push({ id: uid("l"), group: d.group, name: "Linie nouă", labor: false, values: blank12() });
      return "pl";
    },
    "pl-add-year": function () {
      var pl = state.data.pl, years = Object.keys(pl.years).sort();
      var next = String(Number(years[years.length - 1] || new Date().getFullYear() - 1) + 1);
      var src = pl.years[years[years.length - 1]];
      pl.years[next] = { lines: (src ? src.lines : []).map(function (l) {
        return { id: uid("l"), group: l.group, name: l.name, labor: !!l.labor, values: blank12() };
      }) };
      state.ui.plYear = next;
      return "pl";
    },
    "kpi-del": function (d) {
      var items = state.data.kpi.items, it = items[Number(d.idx)];
      if (!window.confirm("Ștergi KPI-ul „" + it.name + "”?")) return null;
      items.splice(Number(d.idx), 1);
      return "kpi";
    },
    score: function (d) {
      var m = state.data.team.members[Number(d.idx)];
      if (!m.scores) m.scores = {};
      var v = Number(d.val);
      m.scores[d.crit] = m.scores[d.crit] === v ? null : v;
      return "team";
    },
    "course-toggle": function (d, el) {
      var m = state.data.team.members[Number(d.idx)];
      if (!Array.isArray(m.courses)) m.courses = [];
      var i = m.courses.indexOf(d.course);
      if (el.checked && i === -1) m.courses.push(d.course);
      if (!el.checked && i !== -1) m.courses.splice(i, 1);
      return "team";
    },
    "raci-cycle": function (d) {
      var t = state.data.raci.tasks[Number(d.idx)];
      var order = ["", "R", "A", "C", "I"];
      var cur = t.cells[d.role] || "";
      t.cells[d.role] = order[(order.indexOf(cur) + 1) % order.length];
      return "raci";
    },
    "raci-del-role": function (d) {
      var r = state.data.raci.roles[Number(d.idx)];
      if (!window.confirm("Ștergi rolul „" + r.name + "” din matrice?")) return null;
      state.data.raci.roles.splice(Number(d.idx), 1);
      state.data.raci.tasks.forEach(function (t) { delete t.cells[r.id]; });
      return "raci";
    },
    "cjm-del-stage": function (d) {
      var s = state.data.cjm.stages[Number(d.idx)];
      if (!window.confirm("Ștergi etapa „" + s.name + "”?")) return null;
      state.data.cjm.stages.splice(Number(d.idx), 1);
      Object.keys(state.data.cjm.cells).forEach(function (k) { if (k.split("|")[1] === s.id) delete state.data.cjm.cells[k]; });
      return "cjm";
    },
    "cjm-del-row": function (d) {
      var r = state.data.cjm.rows[Number(d.idx)];
      if (!window.confirm("Ștergi rândul „" + r.name + "”?")) return null;
      state.data.cjm.rows.splice(Number(d.idx), 1);
      Object.keys(state.data.cjm.cells).forEach(function (k) { if (k.split("|")[0] === r.id) delete state.data.cjm.cells[k]; });
      return "cjm";
    },
    "set-ui": function (d) { state.ui[d.key] = d.val; return ""; },
    "action-new": function (d) { openAction(null, d.status); return null; },
    "action-open": function (d) { openAction(d.id); return null; },
    export: function () { exportJSON(); return null; },
    import: function () { $("import-file") && $("import-file").click(); return null; },
    "clear-examples": function () {
      var list = "Plan de acțiune, P&L, valorile KPI, cursuri, echipamente, Playbook și Customer Journey Map";
      if (!window.confirm("Golești datele exemplu din: " + list + "?\n\nEchipa, organigrama, RACI, fișele posturilor, contactele și Direcția de ospitalitate rămân neatinse.")) return null;
      var base = emptyData();
      ["actions", "pl", "courses", "equipment", "playbook", "cjm"].forEach(function (k) { state.data[k] = base[k]; markDirty(k); });
      state.data.kpi.items.forEach(function (k) { k.values = {}; });
      markDirty("kpi");
      return "";
    }
  };

  function bindEvents() {
    document.addEventListener("click", function (e) {
      var r = e.target.closest("[data-route]");
      if (r) {
        var id = r.getAttribute("data-route");
        if (location.hash === "#/" + id) route(); else location.hash = "#/" + id;
        return;
      }
      var a = e.target.closest("[data-act]");
      if (a && $("app").contains(a)) {
        var d = {};
        for (var i = 0; i < a.attributes.length; i++) {
          var at = a.attributes[i];
          if (at.name.indexOf("data-") === 0) d[at.name.slice(5)] = at.value;
        }
        var sec = ACTIONS[d.act](d, a);
        if (sec === null) return;
        if (sec) markDirty(sec);
        rerender();
      }
    });
    $("view").addEventListener("change", function (e) {
      var el = e.target;
      if (el.hasAttribute("data-bind")) onFieldChange(el);
      else if (el.hasAttribute("data-ui")) { state.ui[el.getAttribute("data-ui")] = el.value; rerender(); }
      else if (el.id === "import-file") importJSON(el.files && el.files[0]);
      else if (el.id === "theme-select") setTheme(el.value);
    });
    $("view").addEventListener("input", function (e) {
      var el = e.target;
      if (el.hasAttribute("data-ui") && el.hasAttribute("data-live")) { state.ui[el.getAttribute("data-ui")] = el.value; rerender(); }
    });
    $("edit-toggle").addEventListener("change", function (e) {
      state.edit = e.target.checked;
      document.body.classList.toggle("editing", state.edit);
      render();
    });
    $("menu-btn").addEventListener("click", function () { document.body.classList.toggle("nav-open"); });
    $("scrim").addEventListener("click", function () { document.body.classList.remove("nav-open"); });
    $("logout-btn").addEventListener("click", function () {
      flushAll().then(function () {
        if (state.mode === "live" && sb) return sb.auth.signOut();
      }).then(function () { location.hash = ""; location.reload(); });
    });
    window.addEventListener("hashchange", function () { if (state.mode) route(); });
    bindBoardDrag();
    bindSearch();
  }

  // ---------- Temă, export, import ----------
  function setTheme(v) {
    if (v === "light" || v === "dark") { document.documentElement.setAttribute("data-theme", v); lsSet(THEME_KEY, v); }
    else { document.documentElement.removeAttribute("data-theme"); lsDel(THEME_KEY); }
  }
  function exportJSON() {
    var blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), data: state.data }, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "mokum-portal-" + todayISO() + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function importJSON(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      var parsed;
      try { parsed = JSON.parse(reader.result); } catch (e) { alert("Fișierul nu e un JSON valid."); return; }
      var data = parsed && parsed.data ? parsed.data : parsed;
      var found = SECTIONS.filter(function (s) { return data && data[s]; });
      if (!found.length) { alert("Fișierul nu conține secțiuni ale portalului."); return; }
      if (!window.confirm("Importul înlocuiește " + found.length + " secțiuni. Continui?")) return;
      found.forEach(function (s) { state.data[s] = data[s]; markDirty(s); });
      normalize(state.data);
      render();
    };
    reader.readAsText(file);
  }

  // ---------- Calcule P&L ----------
  function plYears() { return Object.keys(state.data.pl.years || {}).sort(); }
  function plYear() {
    var ys = plYears();
    if (!state.ui.plYear || ys.indexOf(state.ui.plYear) === -1) state.ui.plYear = ys[ys.length - 1];
    return state.ui.plYear;
  }
  function plYearData(y) { return state.data.pl.years[y || plYear()]; }

  function plCalc(lines) {
    var r = { rev: [], cogs: [], opex: [], labor: [], below: [], gross: [], ebitda: [], net: [], has: [] };
    for (var m = 0; m < 12; m++) {
      var has = lines.some(function (l) { return l.group === "rev" && isNum(l.values[m]); });
      function tot(pred) {
        return has ? sum(lines.filter(pred).map(function (l) { return l.values[m]; })) : null;
      }
      r.has[m] = has;
      r.rev[m] = tot(function (l) { return l.group === "rev"; });
      r.cogs[m] = tot(function (l) { return l.group === "cogs"; });
      r.opex[m] = tot(function (l) { return l.group === "opex"; });
      r.labor[m] = tot(function (l) { return l.group === "opex" && l.labor; });
      r.below[m] = tot(function (l) { return l.group === "below"; });
      r.gross[m] = has ? r.rev[m] - r.cogs[m] : null;
      r.ebitda[m] = has ? r.gross[m] - r.opex[m] : null;
      r.net[m] = has ? r.ebitda[m] - r.below[m] : null;
    }
    ["rev", "cogs", "opex", "labor", "below", "gross", "ebitda", "net"].forEach(function (k) {
      r[k + "T"] = r.has.some(Boolean) ? sum(r[k]) : null;
    });
    return r;
  }
  function ratio(a, b) { return isNum(a) && isNum(b) && b !== 0 ? (a / b) * 100 : null; }
  function plRatios(c, m) {
    var g = function (k) { return m == null ? c[k + "T"] : c[k][m]; };
    return {
      rev: g("rev"), gross: g("gross"), ebitda: g("ebitda"), net: g("net"),
      cogsPct: ratio(g("cogs"), g("rev")),
      grossPct: ratio(g("gross"), g("rev")),
      laborPct: ratio(g("labor"), g("rev")),
      primePct: ratio(isNum(g("cogs")) ? g("cogs") + g("labor") : null, g("rev")),
      ebitdaPct: ratio(g("ebitda"), g("rev")),
      netPct: ratio(g("net"), g("rev"))
    };
  }
  // Ultima lună cu venituri introduse, în cel mai recent an cu date.
  function lastPlMonth() {
    var ys = plYears();
    for (var i = ys.length - 1; i >= 0; i--) {
      var c = plCalc(plYearData(ys[i]).lines);
      for (var m = 11; m >= 0; m--) if (c.has[m]) return { year: ys[i], m: m, calc: c };
    }
    return null;
  }
  function plRatiosForKey(key) {
    var p = String(key).split("-"), yd = state.data.pl.years[p[0]];
    if (!yd) return null;
    var c = plCalc(yd.lines), m = Number(p[1]) - 1;
    return c.has[m] ? plRatios(c, m) : null;
  }

  // ---------- Grafice SVG ----------
  function barChart(labels, series, opts) {
    opts = opts || {};
    var W = opts.w || 720, H = opts.h || 230, L = 46, R = 8, T = 12, B = 28;
    var all = [];
    series.forEach(function (s) { s.values.forEach(function (v) { if (isNum(v)) all.push(v); }); });
    if (!all.length) return '<div class="empty">Nu există încă date pentru grafic.</div>';
    var max = Math.max.apply(null, all.concat([0])), min = Math.min.apply(null, all.concat([0]));
    var step = niceStep((max - min) / 4 || 1);
    max = Math.ceil(max / step) * step; min = Math.floor(min / step) * step;
    var y = function (v) { return T + (H - T - B) * (1 - (v - min) / (max - min || 1)); };
    var gw = (W - L - R) / labels.length, bw = Math.min(opts.bar || 18, (gw * 0.7) / series.length);
    var pid = "h" + (++patternSeq);
    var out = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Grafic">' + hatchDef(pid);
    for (var t = min; t <= max + step / 2; t += step) {
      out += '<line class="axis" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(t) + '" y2="' + y(t) + '"/>' +
        '<text x="' + (L - 8) + '" y="' + (y(t) + 4) + '" text-anchor="end">' + compact(t) + "</text>";
    }
    labels.forEach(function (lb, i) {
      var gx = L + gw * i + (gw - bw * series.length) / 2;
      series.forEach(function (s, j) {
        var v = s.values[i];
        if (!isNum(v)) return;
        var y0 = y(0), y1 = y(v);
        out += '<rect x="' + (gx + j * bw) + '" y="' + Math.min(y0, y1) + '" width="' + (bw - 2) + '" height="' + Math.max(1, Math.abs(y1 - y0)) +
          '" rx="3" fill="' + (s.hatch ? "url(#" + pid + ")" : s.color) + '" style="color:' + s.color + '"><title>' + esc(s.name + " " + lb + ": " + money(v)) + "</title></rect>";
      });
      out += '<text x="' + (L + gw * i + gw / 2) + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(lb) + "</text>";
    });
    out += "</svg>";
    out += '<div class="legend">' + series.map(function (s) {
      return '<span><i style="background:' + (s.hatch ? "repeating-linear-gradient(45deg," + s.color + " 0 2px,transparent 2px 5px)" : s.color) + '"></i>' + esc(s.name) + "</span>";
    }).join("") + "</div>";
    return '<div class="chart">' + out + "</div>";
  }
  var patternSeq = 0;
  function hatchDef(id) {
    return '<defs><pattern id="' + id + '" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
      '<rect width="2.4" height="6" fill="currentColor"/></pattern></defs>';
  }
  // Semicerc din liniuțe, ca în referință: liniuțele pline arată procentul.
  function gauge(value, label) {
    var n = 44, cx = 140, cy = 132, r1 = 104, r2 = 124, out = "";
    var filled = isNum(value) ? Math.round((value / 100) * n) : 0;
    for (var i = 0; i <= n; i++) {
      var a = Math.PI - (Math.PI * i) / n, long = i % 4 === 0;
      var ri = long ? r1 - 6 : r1;
      out += '<line x1="' + (cx + ri * Math.cos(a)).toFixed(1) + '" y1="' + (cy - ri * Math.sin(a)).toFixed(1) +
        '" x2="' + (cx + r2 * Math.cos(a)).toFixed(1) + '" y2="' + (cy - r2 * Math.sin(a)).toFixed(1) +
        '" stroke="' + (i < filled ? "var(--ink)" : "var(--line-strong)") + '" stroke-width="' + (long ? 2.2 : 1.6) + '" stroke-linecap="round"/>';
    }
    return '<div class="gauge"><svg viewBox="0 0 280 150" role="img" aria-label="' + esc(label + ": " + pct(value)) + '">' + out +
      '<text x="140" y="112" text-anchor="middle" font-size="36" font-weight="700" fill="var(--ink)" font-family="var(--font)">' + (isNum(value) ? nf0.format(value) + "%" : "—") + "</text>" +
      '<text x="140" y="140" text-anchor="middle" font-size="15" fill="var(--ink-soft)" font-family="var(--font)">' + esc(label) + "</text></svg></div>";
  }
  function niceStep(raw) {
    var p = Math.pow(10, Math.floor(Math.log10(raw))), n = raw / p;
    return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p;
  }
  function sparkline(vals, target) {
    var pts = vals.map(function (v, i) { return { i: i, v: v }; }).filter(function (p) { return isNum(p.v); });
    if (pts.length < 2) return "";
    var W = 200, H = 40, all = pts.map(function (p) { return p.v; });
    if (isNum(target)) all.push(target);
    var max = Math.max.apply(null, all), min = Math.min.apply(null, all), span = max - min || 1;
    var x = function (i) { return 2 + (W - 4) * i / (vals.length - 1); };
    var y = function (v) { return 4 + (H - 8) * (1 - (v - min) / span); };
    var d = pts.map(function (p, k) { return (k ? "L" : "M") + x(p.i).toFixed(1) + " " + y(p.v).toFixed(1); }).join(" ");
    return '<svg class="spark" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none" aria-hidden="true" style="width:100%;height:40px">' +
      (isNum(target) ? '<line x1="0" x2="' + W + '" y1="' + y(target) + '" y2="' + y(target) + '"/>' : "") +
      '<path d="' + d + '"/></svg>';
  }

  // ---------- KPI ----------
  function kpiValue(k, key) {
    if (k.auto) {
      var r = plRatiosForKey(key);
      return r ? r[k.auto] : null;
    }
    var v = k.values ? k.values[key] : null;
    return isNum(v) ? v : null;
  }
  function kpiStatus(k, v) {
    if (!isNum(v) || !isNum(k.target)) return "neutral";
    var t = k.target;
    if (k.better === "down") return v <= t ? "good" : v <= t * 1.05 ? "warn" : "bad";
    return v >= t ? "good" : v >= t * 0.95 ? "warn" : "bad";
  }
  var STATUS_LABEL = { good: "În țintă", warn: "Aproape", bad: "Sub țintă", neutral: "Fără date" };
  function kpiFmt(k, v) {
    if (!isNum(v)) return "—";
    if (k.unit === "%") return nf1.format(v) + "%";
    if (k.unit === "RON" || k.unit === "lei") return nf0.format(v) + " " + esc(k.unit);
    return nf2.format(v) + (k.unit ? " " + esc(k.unit) : "");
  }
  function kpiMonthKeys() {
    var keys = {};
    state.data.kpi.items.forEach(function (k) { Object.keys(k.values || {}).forEach(function (key) { keys[key] = true; }); });
    plYears().forEach(function (y) {
      var c = plCalc(plYearData(y).lines);
      c.has.forEach(function (h, m) { if (h) keys[y + "-" + (m < 9 ? "0" : "") + (m + 1)] = true; });
    });
    var now = new Date(), cur = now.getFullYear() + "-" + (now.getMonth() < 9 ? "0" : "") + (now.getMonth() + 1);
    keys[cur] = true;
    return Object.keys(keys).sort();
  }
  function latestKpiMonth() {
    var keys = kpiMonthKeys().filter(function (key) {
      return state.data.kpi.items.some(function (k) { return isNum(kpiValue(k, key)); });
    });
    return keys.length ? keys[keys.length - 1] : kpiMonthKeys().slice(-1)[0];
  }
  function prevKeys(key, n) {
    var p = key.split("-"), y = Number(p[0]), m = Number(p[1]), out = [];
    for (var i = n - 1; i >= 0; i--) {
      var mm = m - i, yy = y;
      while (mm < 1) { mm += 12; yy--; }
      out.push(yy + "-" + (mm < 10 ? "0" : "") + mm);
    }
    return out;
  }

  // ---------- Echipa ----------
  function overall(member, criteria) {
    var got = 0, max = 0;
    criteria.forEach(function (c) {
      var s = member.scores ? member.scores[c.id] : null, w = Number(c.weight) || 0;
      if (isNum(s)) { got += s * w; max += 5 * w; }
    });
    return max ? (got / max) * 100 : null;
  }
  function level(score) {
    if (!isNum(score)) return { l: "Neevaluat", c: "neutral" };
    if (score >= 85) return { l: "Excelent", c: "good" };
    if (score >= 70) return { l: "Solid", c: "good" };
    if (score >= 55) return { l: "În dezvoltare", c: "warn" };
    return { l: "Necesită plan", c: "bad" };
  }
  function barCls(score) { return !isNum(score) ? "" : score >= 70 ? "good" : score >= 55 ? "warn" : "bad"; }

  // ---------- Echipamente ----------
  function serviceStatus(e) {
    var d = daysUntil(e.nextService);
    if (d == null) return { c: "neutral", l: "Neprogramat", d: null };
    if (d < 0) return { c: "bad", l: "Depășit cu " + (-d) + " zile", d: d };
    if (d <= 30) return { c: "warn", l: "În " + d + " zile", d: d };
    return { c: "good", l: fmtDate(e.nextService), d: d };
  }

  function statCard(label, value, sub) {
    return '<div class="card stat"><div class="label">' + label + '</div><div class="value">' + value + "</div>" +
      (sub ? '<div class="sub">' + sub + "</div>" : "") + "</div>";
  }
  function pill(c, text) { return '<span class="pill pill-' + c + '">' + text + "</span>"; }
  function vsTarget(v, t, lowerBetter) {
    if (!isNum(v) || !isNum(t)) return "";
    var ok = lowerBetter ? v <= t : v >= t;
    return '<span class="' + (ok ? "delta-good" : "delta-bad") + '">țintă ' + (lowerBetter ? "≤ " : "≥ ") + nf0.format(t) + "%</span>";
  }

  // ---------- Plan de acțiune (board) ----------
  var COLUMNS = [
    { id: "todo", name: "De făcut" },
    { id: "doing", name: "În lucru" },
    { id: "review", name: "De verificat" },
    { id: "done", name: "Gata" }
  ];
  var AREAS = ["Brand", "Bar", "Sală", "Oameni", "Operațiuni", "Financiar"];
  var CAL = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>';
  function shortDate(iso) {
    if (!iso) return "Fără termen";
    var p = String(iso).split("-");
    return Number(p[2]) + " " + MONTHS[Number(p[1]) - 1];
  }
  function actionCard(a) {
    var d = daysUntil(a.due), late = a.status !== "done" && d != null && d < 0;
    var cls = "acard" + (a.status === "done" ? " done" : a.priority ? " prio" : "");
    return '<div role="button" tabindex="0" class="' + cls + '" draggable="true" data-id="' + esc(a.id) + '" data-act="action-open">' +
      '<div class="top"><span class="area">' + esc(a.area || "") + "</span>" + (a.priority && a.status !== "done" ? '<span class="area">Prioritar</span>' : "") + "</div>" +
      "<h4>" + esc(a.title || "Fără titlu") + "</h4>" + (a.desc ? "<p>" + esc(a.desc) + "</p>" : "") +
      '<div class="meta"><span class="chip' + (late ? " late" : "") + '">' + CAL + esc(shortDate(a.due)) + "</span>" +
      (a.owner ? '<span class="who"><span class="avatar avatar-xs">' + esc(initials(a.owner)) + "</span>" + esc(a.owner) + "</span>" : "") + "</div></div>";
  }
  function boardHtml() {
    var items = state.data.actions.items;
    return '<div class="board">' + COLUMNS.map(function (c) {
      var list = items.filter(function (a) { return (a.status || "todo") === c.id; });
      if (c.id !== "done") list.sort(function (a, b) { return (b.priority ? 1 : 0) - (a.priority ? 1 : 0) || String(a.due || "9999").localeCompare(String(b.due || "9999")); });
      return '<section class="col" data-col="' + c.id + '" aria-label="' + esc(c.name) + '"><div class="col-head"><h3>' + c.name + '</h3><span class="col-count">' + list.length + "</span></div>" +
        list.map(actionCard).join("") +
        '<button type="button" class="col-add" data-act="action-new" data-status="' + c.id + '">+ Adaugă</button></section>';
    }).join("") + "</div>";
  }

  function openAction(id, status) {
    var items = state.data.actions.items;
    var a = id ? items.filter(function (x) { return x.id === id; })[0] : null;
    var v = a ? clone(a) : NEW.action();
    if (!a && status) v.status = status;
    var people = {};
    state.data.team.members.forEach(function (m) { people[m.name] = true; });
    ["Owner", "Manager", "Head barista", "ATC"].forEach(function (r) { people[r] = true; });
    var m = $("modal");
    m.innerHTML = '<form method="dialog" id="action-form"><h2 id="modal-title">' + (a ? "Acțiune" : "Acțiune nouă") + "</h2>" +
      '<label class="field"><span>Titlu</span><input id="af-title" required maxlength="120" value="' + esc(v.title) + '"></label>' +
      '<label class="field"><span>Detalii</span><textarea id="af-desc" class="inp" rows="3">' + esc(v.desc) + "</textarea></label>" +
      '<div class="row2"><label class="field"><span>Zonă</span><select id="af-area">' + AREAS.map(function (x) { return "<option" + (x === v.area ? " selected" : "") + ">" + x + "</option>"; }).join("") + "</select></label>" +
      '<label class="field"><span>Stadiu</span><select id="af-status">' + COLUMNS.map(function (c) { return '<option value="' + c.id + '"' + (c.id === v.status ? " selected" : "") + ">" + c.name + "</option>"; }).join("") + "</select></label></div>" +
      '<div class="row2"><label class="field"><span>Responsabil</span><input id="af-owner" list="af-people" value="' + esc(v.owner) + '"><datalist id="af-people">' +
      Object.keys(people).map(function (p) { return '<option value="' + esc(p) + '">'; }).join("") + "</datalist></label>" +
      '<label class="field"><span>Termen</span><input type="date" id="af-due" value="' + esc(v.due) + '"></label></div>' +
      '<label class="small" style="display:flex;gap:8px;align-items:center;margin:2px 0 14px"><input type="checkbox" id="af-prio"' + (v.priority ? " checked" : "") + "> Prioritar (apare evidențiat pe board)</label>" +
      '<div class="actions">' + (a ? '<button type="button" class="btn btn-ghost btn-danger" id="af-del">Șterge</button><span class="spacer"></span>' : "") +
      '<button type="button" class="btn btn-ghost" id="af-cancel">Anulează</button><button type="submit" class="btn btn-primary">Salvează</button></div></form>';
    $("af-cancel").onclick = function () { m.close(); };
    if (a) $("af-del").onclick = function () {
      if (!window.confirm("Ștergi acțiunea „" + a.title + "”?")) return;
      items.splice(items.indexOf(a), 1);
      markDirty("actions"); m.close(); render();
    };
    $("action-form").onsubmit = function (e) {
      e.preventDefault();
      var t = $("af-title").value.trim();
      if (!t) return;
      var target = a || v;
      target.title = t;
      target.desc = $("af-desc").value.trim();
      target.area = $("af-area").value;
      target.status = $("af-status").value;
      target.owner = $("af-owner").value.trim();
      target.due = $("af-due").value;
      target.priority = $("af-prio").checked;
      if (!a) items.push(target);
      markDirty("actions"); m.close(); render();
    };
    if (m.showModal) m.showModal(); else m.setAttribute("open", "");
    $("af-title").focus();
  }

  function bindBoardDrag() {
    var view = $("view"), dragId = null;
    view.addEventListener("keydown", function (e) {
      var c = e.target.closest && e.target.closest('.acard[role="button"]');
      if (c && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openAction(c.getAttribute("data-id")); }
    });
    view.addEventListener("dragstart", function (e) {
      var c = e.target.closest && e.target.closest(".acard");
      if (!c) return;
      dragId = c.getAttribute("data-id");
      c.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
      try { e.dataTransfer.setData("text/plain", dragId); } catch (err) { /* Safari vechi */ }
    });
    view.addEventListener("dragend", function () {
      dragId = null;
      var els = view.querySelectorAll(".dragging, .drop");
      for (var i = 0; i < els.length; i++) els[i].classList.remove("dragging", "drop");
    });
    view.addEventListener("dragover", function (e) {
      var col = dragId && e.target.closest && e.target.closest("[data-col]");
      if (!col) return;
      e.preventDefault();
      var els = view.querySelectorAll(".col.drop");
      for (var i = 0; i < els.length; i++) if (els[i] !== col) els[i].classList.remove("drop");
      col.classList.add("drop");
    });
    view.addEventListener("drop", function (e) {
      var col = dragId && e.target.closest && e.target.closest("[data-col]");
      if (!col) return;
      e.preventDefault();
      var a = state.data.actions.items.filter(function (x) { return x.id === dragId; })[0];
      var to = col.getAttribute("data-col");
      if (a && a.status !== to) { a.status = to; markDirty("actions"); }
      dragId = null;
      render();
    });
  }

  // ---------- Căutare globală ----------
  function searchIndex() {
    var d = state.data, out = [];
    function add(title, where, routeId, extra) { out.push({ t: title || "", w: where, r: routeId, x: (extra || "").toLowerCase() }); }
    NAV.forEach(function (g) { g.items.forEach(function (it) { add(it.title, "Secțiune", it.id); }); });
    d.actions.items.forEach(function (a) { add(a.title, "Plan de acțiune", "plan", a.desc + " " + a.owner + " " + a.area); });
    d.team.members.forEach(function (m) { add(m.name, "Echipa", "echipa", m.role); });
    d.contacts.items.forEach(function (c) { add(c.name, "Contacte", "contacte", [c.person, c.category, c.phone, c.email, c.notes].join(" ")); });
    d.equipment.items.forEach(function (e) { add(e.name, "Echipamente", "echipamente", e.brand + " " + e.supplier); });
    d.courses.items.forEach(function (c) { add(c.title, "Cursuri ATC", "cursuri", c.module + " " + c.desc); });
    d.kpi.items.forEach(function (k) { add(k.name, "KPI-uri", "kpi", k.owner); });
    d.jobs.items.forEach(function (j) { add(j.title, "Fișele posturilor", "fise", j.purpose); });
    d.playbook.chapters.forEach(function (c) { add(c.title, "Playbook", "playbook", c.body); });
    d.hospitality.chapters.forEach(function (c) { add(c.title, "Ospitalitate", "ospitalitate", c.body); });
    d.raci.tasks.forEach(function (t) { add(t.name, "RACI", "raci", t.area); });
    return out;
  }
  function bindSearch() {
    var input = $("search"), box = $("search-results"), active = -1, hits = [];
    function close() { box.classList.add("hidden"); active = -1; }
    function go(h) { input.value = ""; close(); location.hash = "#/" + h.r; if (state.route === h.r) route(); }
    function paint() {
      box.innerHTML = hits.length ? hits.map(function (h, i) {
        return '<a href="#/' + h.r + '" data-i="' + i + '"' + (i === active ? ' class="active"' : "") + "><span>" + esc(h.t) + '</span><span class="where">' + esc(h.w) + "</span></a>";
      }).join("") : '<div class="small muted" style="padding:10px 12px">Niciun rezultat.</div>';
      box.classList.remove("hidden");
    }
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      if (q.length < 2) { close(); return; }
      hits = searchIndex().filter(function (h) { return h.t.toLowerCase().indexOf(q) !== -1 || h.x.indexOf(q) !== -1; })
        .sort(function (a, b) { return (b.t.toLowerCase().indexOf(q) === 0) - (a.t.toLowerCase().indexOf(q) === 0); }).slice(0, 10);
      active = hits.length ? 0 : -1;
      paint();
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { input.value = ""; close(); input.blur(); }
      else if (e.key === "ArrowDown" && hits.length) { e.preventDefault(); active = (active + 1) % hits.length; paint(); }
      else if (e.key === "ArrowUp" && hits.length) { e.preventDefault(); active = (active - 1 + hits.length) % hits.length; paint(); }
      else if (e.key === "Enter" && hits[active]) { e.preventDefault(); go(hits[active]); }
    });
    box.addEventListener("mousedown", function (e) {
      var a = e.target.closest("a[data-i]");
      if (a) { e.preventDefault(); go(hits[Number(a.getAttribute("data-i"))]); }
    });
    input.addEventListener("blur", function () { setTimeout(close, 120); });
  }

  // ================= VIEWS =================
  var VIEWS = {};

  VIEWS.panou = function () {
    var d = state.data, h = "";
    var last = lastPlMonth(), tg = d.pl.targets || {};

    // Banda de sus: venituri pe ultimele 6 luni, KPI-uri în țintă, acțiuni în lucru, venitul lunii
    var key = latestKpiMonth(), counts = { good: 0, warn: 0, bad: 0, neutral: 0 }, attention = [];
    d.kpi.items.forEach(function (k) {
      var v = kpiValue(k, key), st = kpiStatus(k, v);
      counts[st]++;
      if (st === "bad" || st === "warn") attention.push({ k: k, v: v, s: st });
    });
    var withData = counts.good + counts.warn + counts.bad;
    var kpiPct = withData ? (counts.good / withData) * 100 : null;
    var doing = d.actions.items.filter(function (a) { return a.status === "doing"; }).length;
    var labels = [], rev = [], ebitda = [];
    if (last) {
      for (var i = 5; i >= 0; i--) {
        var m = last.m - i;
        if (m < 0) continue;
        labels.push(MONTHS[m]); rev.push(last.calc.rev[m]); ebitda.push(last.calc.ebitda[m]);
      }
    }
    var r = last ? plRatios(last.calc, last.m) : null;
    var dueEq = d.equipment.items.filter(function (e) { var c = serviceStatus(e).c; return c === "bad" || c === "warn"; }).length;
    var monthName = last ? MONTHS_LONG[last.m].charAt(0).toUpperCase() + MONTHS_LONG[last.m].slice(1) + " " + last.year : "Luna aceasta";
    var lead = r
      ? "EBITDA " + pct(r.ebitdaPct) + ", prime cost " + pct(r.primePct) + ". " + doing + (doing === 1 ? " acțiune în lucru" : " acțiuni în lucru") +
        (dueEq ? ", " + dueEq + (dueEq === 1 ? " echipament de verificat." : " echipamente de verificat.") : ".")
      : "Încă nu există cifre în P&L. Completează prima lună și panoul prinde viață.";
    h += '<div class="hero"><div class="hero-text">' +
      '<span class="eyebrow dotted">Mokum · Timișoara · Est. 2010</span>' +
      '<h2 class="display"><span class="b">' + esc(monthName) + '</span><br><span class="l">în cifre și oameni</span></h2>' +
      '<p class="hero-lead">' + esc(lead) + "</p>" +
      '<div class="hero-stats">' +
      '<a class="hs" href="#/pl"><span class="hs-v">' + (r ? nf0.format(r.rev / 1e3) + "k<small> " + esc(cur()) + "</small>" : "—") + '</span><span class="hs-l">Venituri</span></a>' +
      '<a class="hs" href="#/pl"><span class="hs-v">' + (r ? pct(r.ebitdaPct) : "—") + '</span><span class="hs-l">EBITDA</span></a>' +
      '<a class="hs" href="#/kpi"><span class="hs-v">' + (isNum(kpiPct) ? nf0.format(kpiPct) + "%" : "—") + '</span><span class="hs-l">KPI în țintă</span></a>' +
      '<a class="hs" href="#/plan"><span class="hs-v">' + doing + '</span><span class="hs-l">Acțiuni în lucru</span></a>' +
      "</div></div>" +
      photo("hero", "ph-shadow", "hero-photo", '<span class="photo-tag">Noul bar Mokum</span>') +
      "</div>";

    // Planul de acțiune
    h += '<div class="card-head"><div><span class="eyebrow dotted">Împreună cu Around The Corner</span><h2 class="title-split" style="margin-top:6px"><span class="b">Plan</span> <span class="l">de acțiune</span></h2></div><a href="#/plan">Deschide planul</a></div>' + boardHtml();

    // Luna în cifre
    if (r) {
      h += '<div class="section"><span class="eyebrow dotted">P&L</span><h2 class="title-split" style="margin:6px 0 16px"><span class="b">' + esc(monthName) + '</span> <span class="l">în detaliu</span></h2>';
      h += '<div class="grid split-21">' +
        '<div class="card"><div class="card-head"><h3>Venituri și EBITDA</h3><a href="#/pl">P&L</a></div>' +
        barChart(labels, [{ name: "Venituri", color: "var(--chart-1)", values: rev }, { name: "EBITDA", color: "var(--chart-1)", values: ebitda, hatch: true }], { w: 640, h: 230, bar: 26 }) + "</div>" +
        '<div class="card" style="display:flex;flex-direction:column;justify-content:center">' + gauge(kpiPct, "KPI-uri în țintă") + "</div></div>";
      h += '<div class="grid grid-4" style="margin-top:18px">' +
        statCard("Marjă brută", pct(r.grossPct), "COGS " + pct(r.cogsPct) + " · " + vsTarget(r.cogsPct, tg.cogsPct, true)) +
        statCard("EBITDA", moneyC(r.ebitda), pct(r.ebitdaPct) + " din venituri · " + vsTarget(r.ebitdaPct, tg.ebitdaPct, false)) +
        statCard("Prime cost", pct(r.primePct), "personal " + pct(r.laborPct) + " · " + vsTarget(r.primePct, tg.primePct, true)) +
        statCard("Profit net", moneyC(r.net), pct(r.netPct) + " din venituri") +
        "</div></div>";
    }

    // Ce cere atenție
    var kpiCard = '<div class="card"><div class="card-head"><h3>KPI-uri · ' + esc(monthLabel(key)) + '</h3><a href="#/kpi">Toate</a></div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">' + pill("good", counts.good + " în țintă") + pill("warn", counts.warn + " aproape") + pill("bad", counts.bad + " sub țintă") + "</div>" +
      (attention.length ? '<table class="tbl"><tbody>' + attention.slice(0, 5).map(function (b) {
        return "<tr><td>" + esc(b.k.name) + '</td><td class="num">' + kpiFmt(b.k, b.v) + '</td><td class="num">' + pill(b.s, STATUS_LABEL[b.s]) + "</td></tr>";
      }).join("") + "</tbody></table>" : '<p class="muted small">Toate KPI-urile cu date sunt în țintă.</p>') + "</div>";
    var due = d.equipment.items.map(function (e) { return { e: e, s: serviceStatus(e) }; })
      .filter(function (x) { return x.s.c === "bad" || x.s.c === "warn"; })
      .sort(function (a, b) { return a.s.d - b.s.d; });
    var eqCard = '<div class="card"><div class="card-head"><h3>Service echipamente</h3><a href="#/echipamente">Lista</a></div>' +
      (due.length ? '<table class="tbl"><tbody>' + due.map(function (x) {
        return "<tr><td>" + esc(x.e.name) + '<div class="small muted">' + esc(x.e.brand) + '</div></td><td class="num">' + pill(x.s.c, x.s.l) + "</td></tr>";
      }).join("") + "</tbody></table>" : '<p class="muted small">Nimic programat în următoarele 30 de zile.</p>') + "</div>";
    var courseIds = d.courses.items.map(function (c) { return c.id; });
    var possible = courseIds.length * d.team.members.length, done = 0;
    d.team.members.forEach(function (m) { (m.courses || []).forEach(function (c) { if (courseIds.indexOf(c) !== -1) done++; }); });
    var acPct = possible ? (done / possible) * 100 : null;
    var crit = d.team.criteria, scored = d.team.members.map(function (m) { return overall(m, crit); }).filter(isNum);
    var avg = scored.length ? sum(scored) / scored.length : null;
    var acCard = '<div class="card"><div class="card-head"><h3>Echipa & Academia ATC</h3><a href="#/cursuri">Cursuri</a></div>' +
      '<div class="grid" style="grid-template-columns:1fr 1fr">' +
      '<div class="stat"><div class="label">Media echipei</div><div class="value">' + (isNum(avg) ? nf0.format(avg) : "—") + '<small class="muted" style="font-size:14px;font-weight:400"> /100</small></div></div>' +
      '<div class="stat"><div class="label">Training finalizat</div><div class="value">' + (isNum(acPct) ? nf0.format(acPct) + "%" : "—") + "</div></div></div>" +
      '<div class="bar" style="margin-top:14px"><span style="width:' + (acPct || 0) + '%"></span></div>' +
      '<div class="small muted" style="margin-top:6px">' + done + " din " + possible + " cursuri × oameni</div></div>";
    h += '<div class="section"><span class="eyebrow dotted">Operațiuni</span><h2 class="title-split" style="margin:6px 0 16px"><span class="b">Ce cere</span> <span class="l">atenție</span></h2><div class="grid grid-3">' + kpiCard + eqCard + acCard + "</div></div>";

    // Documentele Mokum
    var quick = [["ospitalitate", "Direcția de ospitalitate", d.hospitality.chapters.length + " capitole", "ph-shadow"], ["playbook", "Playbook", d.playbook.chapters.length + " capitole", "ph-mid"],
      ["cjm", "Customer Journey Map", d.cjm.stages.length + " etape", "ph-light"], ["cursuri", "Cursuri ATC", d.courses.items.length + " cursuri", "ph-shadow"],
      ["organigrama", "Organigramă", d.org.nodes.length + " roluri", "ph-mid"], ["raci", "RACI", d.raci.tasks.length + " activități", "ph-light"],
      ["fise", "Fișele posturilor", d.jobs.items.length + " posturi", "ph-shadow"], ["contacte", "Contacte", d.contacts.items.length + " contacte", "ph-mid"]];
    h += '<div class="section"><span class="eyebrow dotted">Biblioteca</span><h2 class="title-split" style="margin:6px 0 16px"><span class="b">Documentele</span> <span class="l">Mokum</span></h2><div class="doc-grid">' + quick.map(function (q) {
      return '<a class="doc-card" href="#/' + q[0] + '">' + photo(q[0], q[3]) + '<span class="label-caps">' + esc(q[2]) + "</span><h3>" + esc(q[1]) + "</h3></a>";
    }).join("") + "</div></div>";
    return h;
  };

  VIEWS.plan = function () {
    var items = state.data.actions.items;
    var late = items.filter(function (a) { var x = daysUntil(a.due); return a.status !== "done" && x != null && x < 0; }).length;
    return '<p class="intro">Tot ce avem de făcut împreună pentru Mokum. Trage un card dintr-o coloană în alta ca să-i schimbi stadiul; apasă pe el ca să-l editezi.</p>' +
      (late ? '<p>' + pill("bad", late + (late === 1 ? " acțiune depășită" : " acțiuni depășite")) + "</p>" : "") +
      boardHtml();
  };

  VIEWS.pl = function () {
    var pl = state.data.pl, y = plYear(), yd = plYearData(y), ed = state.edit;
    if (!yd) return '<div class="empty">Nu există niciun an în P&L.</div>';
    var lines = yd.lines, c = plCalc(lines), tot = plRatios(c, null), tg = pl.targets || {};
    var base = "years." + y + ".lines";
    var h = '<p class="intro">Contul de profit și pierdere al Mokum, lună de lună. Totalurile, marjele și prime cost-ul se calculează automat; țintele sunt cele stabilite cu Around The Corner.</p>';

    h += '<div class="toolbar">' + uiSelect("plYear", y, plYears().map(function (v) { return { v: v, l: "Anul " + v }; }), "An") +
      (ed ? btn("pl-add-year", "+ An nou") : "") + '<span class="spacer"></span>' +
      (ed ? '<label class="small">Monedă ' + field("pl", "currency", pl.currency, { label: "Monedă" }).replace('class="inp"', 'class="inp" style="width:80px"') + "</label>" : "") + "</div>";

    h += '<div class="grid grid-4">' +
      statCard("Venituri " + esc(y), moneyC(tot.rev), "") +
      statCard("Marjă brută", pct(tot.grossPct), "COGS " + pct(tot.cogsPct) + " · " + vsTarget(tot.cogsPct, tg.cogsPct, true)) +
      statCard("EBITDA", moneyC(tot.ebitda), pct(tot.ebitdaPct) + " · " + vsTarget(tot.ebitdaPct, tg.ebitdaPct, false)) +
      statCard("Prime cost", pct(tot.primePct), "personal " + pct(tot.laborPct) + " · " + vsTarget(tot.primePct, tg.primePct, true)) +
      "</div>";

    if (ed) {
      h += '<div class="card" style="margin-top:16px"><h3>Ținte (% din venituri)</h3><div class="grid grid-4">' +
        [["cogsPct", "COGS maxim"], ["laborPct", "Personal maxim"], ["primePct", "Prime cost maxim"], ["ebitdaPct", "EBITDA minim"]].map(function (t) {
          return '<label class="field"><span>' + t[1] + "</span>" + field("pl", "targets." + t[0], tg[t[0]], { type: "num", label: t[1] }) + "</label>";
        }).join("") + "</div></div>";
    }

    h += '<div class="card" style="margin-top:16px"><h3>Venituri și EBITDA pe luni</h3>' +
      barChart(MONTHS, [{ name: "Venituri", color: "var(--chart-1)", values: c.rev }, { name: "EBITDA", color: "var(--chart-2)", values: c.ebitda }]) + "</div>";

    // Tabelul
    var head = "<thead><tr><th>Linie</th>" + MONTHS.map(function (m) { return '<th class="num">' + m + "</th>"; }).join("") + '<th class="num total">Total</th>' + (ed ? "<th></th>" : "") + "</tr></thead>";
    var cols = 14 + (ed ? 1 : 0);
    function lineRows(group) {
      return lines.map(function (l, i) {
        if (l.group !== group) return "";
        var name = ed ? '<div class="line-name">' + field("pl", base + "." + i + ".name", l.name, { label: "Denumire linie" }) +
          (group === "opex" ? '<label class="small" title="Linie de cost de personal (intră în labor % și prime cost)">' + field("pl", base + "." + i + ".labor", l.labor, { type: "check" }) + " personal</label>" : "") + "</div>"
          : esc(l.name) + (l.labor ? ' <span class="tag-labor">personal</span>' : "");
        var cells = l.values.map(function (v, m) {
          return '<td class="num">' + (ed ? field("pl", base + "." + i + ".values." + m, v, { type: "num", label: l.name + " " + MONTHS[m] }) : money(v)) + "</td>";
        }).join("");
        var t = l.values.some(isNum) ? sum(l.values) : null;
        return "<tr><td>" + name + "</td>" + cells + '<td class="num total">' + money(t) + "</td>" + (ed ? '<td class="act">' + delBtn("pl", base, i, "linia") + "</td>" : "") + "</tr>";
      }).join("");
    }
    function grp(label, group) {
      return '<tr class="grp"><td colspan="' + cols + '">' + label + (ed ? " &nbsp;" + btn("pl-add-line", "+ linie", { group: group }) : "") + "</td></tr>";
    }
    function sumRow(label, arr, total, cls) {
      return '<tr class="' + (cls || "sum") + '"><td>' + label + "</td>" + arr.map(function (v) { return '<td class="num">' + money(v) + "</td>"; }).join("") +
        '<td class="num total">' + money(total) + "</td>" + (ed ? "<td></td>" : "") + "</tr>";
    }
    function pctRow(label, num, den, cls) {
      var arr = num.map(function (v, m) { return ratio(v, den[m]); });
      return '<tr class="' + (cls || "ratio") + '"><td>' + label + "</td>" + arr.map(function (v) { return '<td class="num">' + pct(v) + "</td>"; }).join("") +
        '<td class="num total">' + pct(ratio(sum(num), sum(den))) + "</td>" + (ed ? "<td></td>" : "") + "</tr>";
    }
    var prime = c.cogs.map(function (v, m) { return isNum(v) ? v + c.labor[m] : null; });
    var body = "<tbody>" +
      grp("Venituri", "rev") + lineRows("rev") + sumRow("Total venituri", c.rev, c.revT) +
      grp("Cost marfă (COGS)", "cogs") + lineRows("cogs") + sumRow("Total COGS", c.cogs, c.cogsT) + pctRow("COGS % din venituri", c.cogs, c.rev) +
      sumRow("Marjă brută", c.gross, c.grossT, "sum key") + pctRow("Marjă brută %", c.gross, c.rev) +
      grp("Cheltuieli operaționale", "opex") + lineRows("opex") + sumRow("Total cheltuieli operaționale", c.opex, c.opexT) + pctRow("Personal % din venituri", c.labor, c.rev) +
      sumRow("EBITDA", c.ebitda, c.ebitdaT, "sum key") + pctRow("EBITDA %", c.ebitda, c.rev) + pctRow("Prime cost % (COGS + personal)", prime, c.rev) +
      grp("Sub EBITDA", "below") + lineRows("below") +
      sumRow("Profit net", c.net, c.netT, "sum key") + pctRow("Marjă netă %", c.net, c.rev) +
      "</tbody>";
    h += '<div class="section"><h2>Detaliat pe luni (' + esc(cur()) + ')</h2><div class="table-wrap"><table class="tbl pl-table">' + head + body + "</table></div></div>";
    return h;
  };

  VIEWS.kpi = function () {
    var items = state.data.kpi.items, ed = state.edit;
    var keys = kpiMonthKeys();
    if (!state.ui.kpiMonth || keys.indexOf(state.ui.kpiMonth) === -1) state.ui.kpiMonth = latestKpiMonth();
    var key = state.ui.kpiMonth;
    var h = '<p class="intro">Indicatorii cu care conducem Mokum. Cei marcați „din P&L” se calculează automat din cifrele lunii; restul se completează lunar, în modul editare.</p>';
    h += '<div class="toolbar">' + uiSelect("kpiMonth", key, keys.slice().reverse().map(function (k) { return { v: k, l: monthLabel(k) }; }), "Luna") +
      '<span class="spacer"></span>' + (ed ? btn("add", "+ KPI", { sec: "kpi", path: "items", tpl: "kpi" }) : "") + "</div>";

    if (!items.length) return h + '<div class="empty">Niciun KPI definit. Activează editarea și adaugă primul.</div>';

    h += '<div class="grid grid-3">' + items.map(function (k) {
      var v = kpiValue(k, key), s = kpiStatus(k, v), hist = prevKeys(key, 9).map(function (kk) { return kpiValue(k, kk); });
      return '<div class="card kpi-card"><div class="kpi-top"><div class="kpi-name">' + esc(k.name) + "</div>" + pill(s, STATUS_LABEL[s]) + "</div>" +
        '<div class="kpi-val">' + kpiFmt(k, v) + "</div>" +
        '<div class="kpi-meta">Țintă ' + (k.better === "down" ? "≤ " : "≥ ") + kpiFmt(k, k.target) + (k.owner ? " · " + esc(k.owner) : "") + (k.auto ? " · din P&L" : "") + "</div>" +
        sparkline(hist, k.target) + "</div>";
    }).join("") + "</div>";

    if (ed) {
      h += '<div class="section"><h2>Definiții și valori pentru ' + esc(monthLabel(key)) + '</h2><div class="table-wrap"><table class="tbl"><thead><tr>' +
        "<th>KPI</th><th>Unitate</th><th>Țintă</th><th>Mai bine</th><th>Responsabil</th><th>Calcul</th><th>Valoare " + esc(monthLabel(key)) + "</th><th></th></tr></thead><tbody>" +
        items.map(function (k, i) {
          var p = "items." + i;
          return "<tr><td>" + field("kpi", p + ".name", k.name, { label: "Nume KPI" }) + "</td>" +
            "<td>" + field("kpi", p + ".unit", k.unit, { label: "Unitate" }) + "</td>" +
            "<td>" + field("kpi", p + ".target", k.target, { type: "num", label: "Țintă" }) + "</td>" +
            "<td>" + field("kpi", p + ".better", k.better, { type: "select", options: [{ v: "up", l: "mai mare" }, { v: "down", l: "mai mic" }] }) + "</td>" +
            "<td>" + field("kpi", p + ".owner", k.owner, { label: "Responsabil" }) + "</td>" +
            "<td>" + field("kpi", p + ".auto", k.auto || "", { type: "select", options: [{ v: "", l: "manual" }, { v: "cogsPct", l: "P&L: COGS %" }, { v: "laborPct", l: "P&L: personal %" }, { v: "primePct", l: "P&L: prime cost %" }, { v: "ebitdaPct", l: "P&L: EBITDA %" }] }) + "</td>" +
            "<td>" + (k.auto ? '<span class="muted small">' + kpiFmt(k, kpiValue(k, key)) + "</span>" : field("kpi", p + ".values." + key, k.values ? k.values[key] : null, { type: "num", label: "Valoare" })) + "</td>" +
            '<td class="act">' + btn("kpi-del", "✕", { idx: i }, "btn-ghost btn-danger") + "</td></tr>";
        }).join("") + "</tbody></table></div></div>";
    }
    return h;
  };

  VIEWS.echipa = function () {
    var t = state.data.team, ed = state.edit, crit = t.criteria;
    var totalW = sum(crit.map(function (c) { return Number(c.weight) || 0; }));
    var courses = state.data.courses.items;
    var h = '<p class="intro">Punctajul overall al fiecărui barista se calculează din criteriile de mai jos (note 1–5, ponderate). Scorul e pe 100: ≥ 85 excelent, ≥ 70 solid, ≥ 55 în dezvoltare.</p>';

    // Criterii
    h += '<div class="card"><div class="card-head"><h3>Criteriile de evaluare</h3>' + (ed ? btn("add", "+ criteriu", { sec: "team", path: "criteria", tpl: "criterion" }) : "") + "</div>";
    if (ed) {
      h += '<div class="table-wrap"><table class="tbl"><thead><tr><th>Criteriu</th><th class="num">Pondere</th><th>Ce urmărim</th><th></th></tr></thead><tbody>' +
        crit.map(function (c, i) {
          return "<tr><td>" + field("team", "criteria." + i + ".name", c.name, { label: "Criteriu" }) + "</td><td>" + field("team", "criteria." + i + ".weight", c.weight, { type: "num", label: "Pondere" }) +
            "</td><td>" + field("team", "criteria." + i + ".desc", c.desc, { label: "Descriere" }) + '</td><td class="act">' + delBtn("team", "criteria", i, "criteriul") + "</td></tr>";
        }).join("") + '</tbody></table></div><p class="hint">Suma ponderilor: ' + nf0.format(totalW) + (totalW !== 100 ? " (recomandat 100, dar scorul se normalizează oricum)" : "") + "</p>";
    } else {
      h += '<div class="grid grid-3">' + crit.map(function (c) {
        return '<div><div style="display:flex;justify-content:space-between;gap:8px"><strong>' + esc(c.name) + "</strong>" + pill("neutral", nf0.format(totalW ? (c.weight / totalW) * 100 : 0) + "%") + '</div><div class="small muted">' + esc(c.desc) + "</div></div>";
      }).join("") + "</div>";
    }
    h += "</div>";

    // Membri
    var list = t.members.map(function (m, i) { return { m: m, i: i, s: overall(m, crit) }; });
    if (!ed) list.sort(function (a, b) { return (isNum(b.s) ? b.s : -1) - (isNum(a.s) ? a.s : -1); });
    h += '<div class="section"><div class="card-head"><h2 style="font-family:var(--font-display);font-size:19px">Bariștii</h2>' + (ed ? btn("add", "+ persoană", { sec: "team", path: "members", tpl: "member" }) : "") + "</div>";
    if (!list.length) h += '<div class="empty">Nicio persoană în echipă încă.</div>';
    h += '<div class="grid grid-2">' + list.map(function (x) {
      var m = x.m, i = x.i, lv = level(x.s), p = "members." + i;
      var done = (m.courses || []).filter(function (cid) { return courses.some(function (c) { return c.id === cid; }); }).length;
      var out = '<div class="card">';
      out += '<div class="member"><div class="avatar">' + esc(initials(m.name)) + "</div><div>" +
        (ed ? field("team", p + ".name", m.name, { label: "Nume" }) + '<div style="margin-top:6px">' + field("team", p + ".role", m.role, { label: "Rol" }) + "</div>"
          : "<strong>" + esc(m.name) + '</strong><div class="small muted">' + esc(m.role) + (m.since ? " · din " + fmtDate(m.since) : "") + "</div>") +
        '</div><div class="score">' + (isNum(x.s) ? nf0.format(x.s) : "—") + "<small> /100</small><div>" + pill(lv.c, lv.l) + "</div></div></div>";
      out += '<div class="bar ' + barCls(x.s) + '" style="margin-top:12px"><span style="width:' + (x.s || 0) + '%"></span></div>';
      out += crit.map(function (c) {
        var sc = m.scores ? m.scores[c.id] : null;
        var right;
        if (ed) {
          right = '<div class="dots" role="group" aria-label="' + esc(c.name) + '">' + [1, 2, 3, 4, 5].map(function (n) {
            return '<button type="button" data-act="score" data-idx="' + i + '" data-crit="' + esc(c.id) + '" data-val="' + n + '" aria-pressed="' + (sc === n) + '">' + n + "</button>";
          }).join("") + "</div>";
        } else {
          right = '<div class="bar ' + barCls(isNum(sc) ? sc * 20 : null) + '"><span style="width:' + (isNum(sc) ? sc * 20 : 0) + '%"></span></div>';
        }
        return '<div class="crit-row"><span>' + esc(c.name) + "</span>" + right + '<span class="num muted">' + (isNum(sc) ? sc : "–") + "</span></div>";
      }).join("");
      out += '<details class="more"' + (ed ? " open" : "") + "><summary>Cursuri ATC: " + done + "/" + courses.length + " · ultima evaluare " + fmtDate(m.lastReview) + "</summary>";
      if (ed) {
        out += '<div class="grid" style="grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:8px 0">' +
          '<label class="field"><span>În echipă din</span>' + field("team", p + ".since", m.since, { type: "date" }) + "</label>" +
          '<label class="field"><span>Ultima evaluare</span>' + field("team", p + ".lastReview", m.lastReview, { type: "date" }) + "</label></div>";
        out += '<div class="small" style="display:grid;gap:4px">' + courses.map(function (c) {
          var has = (m.courses || []).indexOf(c.id) !== -1;
          return '<label><input type="checkbox" data-act="course-toggle" data-idx="' + i + '" data-course="' + esc(c.id) + '"' + (has ? " checked" : "") + "> " + esc(c.title) + "</label>";
        }).join("") + "</div>";
        out += '<label class="field" style="margin-top:10px"><span>Note & plan de dezvoltare</span>' + field("team", p + ".notes", m.notes, { type: "textarea", rows: 3 }) + "</label>";
        out += '<div style="text-align:right">' + btn("del", "Șterge persoana", { sec: "team", path: "members", idx: i, what: "persoana" }, "btn-ghost btn-danger") + "</div>";
      } else {
        out += '<ul class="small" style="margin:6px 0;padding-left:18px">' + courses.filter(function (c) { return (m.courses || []).indexOf(c.id) !== -1; })
          .map(function (c) { return "<li>" + esc(c.title) + "</li>"; }).join("") + "</ul>" +
          (m.notes ? '<p class="small"><strong>Note:</strong> ' + esc(m.notes) + "</p>" : "");
      }
      out += "</details></div>";
      return out;
    }).join("") + "</div></div>";
    return h;
  };

  VIEWS.organigrama = function () {
    var nodes = state.data.org.nodes, ed = state.edit;
    var h = '<p class="intro">Cine răspunde în fața cui. Partenerii externi apar separat, cu chenar punctat.</p>';
    var internal = nodes.filter(function (n) { return !n.external; });
    var ids = {}; internal.forEach(function (n) { ids[n.id] = true; });
    var roots = internal.filter(function (n) { return !n.parent || !ids[n.parent]; });
    var seen = {};
    function tree(list, depth) {
      if (!list.length || depth > 12) return "";
      return "<ul>" + list.map(function (n) {
        if (seen[n.id]) return "";
        seen[n.id] = true;
        var kids = internal.filter(function (k) { return k.parent === n.id; });
        return '<li><div class="org-node' + (depth === 0 ? " top" : "") + '"><div class="t">' + esc(n.title) + '</div><div class="p">' + esc(n.person) + "</div></div>" + tree(kids, depth + 1) + "</li>";
      }).join("") + "</ul>";
    }
    if (!nodes.length) h += '<div class="empty">Organigrama e goală. Activează editarea și adaugă primul rol.</div>';
    else {
      h += '<div class="card"><div class="org">' + tree(roots, 0) + "</div>";
      var ext = nodes.filter(function (n) { return n.external; });
      if (ext.length) {
        h += '<h3 style="text-align:center;margin-top:10px" class="muted">Parteneri externi</h3><div class="org-ext">' + ext.map(function (n) {
          var parent = nodes.filter(function (p) { return p.id === n.parent; })[0];
          return '<div class="org-node ext"><div class="t">' + esc(n.title) + '</div><div class="p">' + esc(n.person) + (parent ? " · lucrează cu " + esc(parent.title) : "") + "</div></div>";
        }).join("") + "</div>";
      }
      h += "</div>";
    }
    if (ed) {
      var opts = [{ v: "", l: "— (vârf)" }].concat(nodes.map(function (n) { return { v: n.id, l: n.title }; }));
      h += '<div class="section"><div class="card-head"><h2 style="font-family:var(--font-display);font-size:19px">Editează rolurile</h2>' + btn("add", "+ rol", { sec: "org", path: "nodes", tpl: "node" }) + "</div>" +
        '<div class="table-wrap"><table class="tbl"><thead><tr><th>Rol</th><th>Persoană</th><th>Raportează la</th><th>Extern</th><th></th></tr></thead><tbody>' +
        nodes.map(function (n, i) {
          var p = "nodes." + i;
          return "<tr><td>" + field("org", p + ".title", n.title, { label: "Rol" }) + "</td><td>" + field("org", p + ".person", n.person, { label: "Persoană" }) + "</td><td>" +
            field("org", p + ".parent", n.parent, { type: "select", options: opts.filter(function (o) { return o.v !== n.id; }) }) + "</td><td>" + field("org", p + ".external", n.external, { type: "check" }) +
            '</td><td class="act">' + delBtn("org", "nodes", i, "rolul") + "</td></tr>";
        }).join("") + "</tbody></table></div></div>";
    }
    return h;
  };

  VIEWS.raci = function () {
    var r = state.data.raci, ed = state.edit, roles = r.roles;
    var h = '<p class="intro"><strong>R</strong> = execută · <strong>A</strong> = răspunde final (unul singur) · <strong>C</strong> = consultat · <strong>I</strong> = informat.' +
      (ed ? " În modul editare, apasă pe o celulă ca să schimbi litera." : "") + "</p>";
    h += '<div class="toolbar"><span class="raci-btn raci-R" style="display:inline-grid;place-items:center">R</span> Execută ' +
      '<span class="raci-btn raci-A" style="display:inline-grid;place-items:center">A</span> Răspunde ' +
      '<span class="raci-btn raci-C" style="display:inline-grid;place-items:center">C</span> Consultat ' +
      '<span class="raci-btn raci-I" style="display:inline-grid;place-items:center">I</span> Informat' +
      '<span class="spacer"></span>' + (ed ? btn("add", "+ rol", { sec: "raci", path: "roles", tpl: "role" }) + " " + btn("add", "+ activitate", { sec: "raci", path: "tasks", tpl: "task" }) : "") + "</div>";
    if (!r.tasks.length) return h + '<div class="empty">Nicio activitate în matrice.</div>';
    var head = "<thead><tr><th>Activitate</th>" + roles.map(function (ro, i) {
      return '<th class="cell">' + (ed ? field("raci", "roles." + i + ".name", ro.name, { label: "Rol" }) + btn("raci-del-role", "✕", { idx: i }, "btn-ghost btn-danger") : esc(ro.name)) + "</th>";
    }).join("") + "<th>Verificare</th>" + (ed ? "<th></th>" : "") + "</tr></thead>";
    var lastArea = null, cols = roles.length + 2 + (ed ? 1 : 0);
    var body = "<tbody>" + r.tasks.map(function (t, i) {
      var row = "";
      if (!ed && t.area !== lastArea) { row += '<tr class="area"><td colspan="' + cols + '">' + esc(t.area) + "</td></tr>"; lastArea = t.area; }
      var a = 0, rr = 0;
      roles.forEach(function (ro) { var v = t.cells[ro.id]; if (v === "A") a++; if (v === "R") rr++; });
      // Un singur „A”; dacă nu e niciun „R”, cel cu „A” execută singur.
      var check = a === 1 ? pill("good", rr ? "OK" : "OK · A execută") : pill("warn", a === 0 ? "Lipsește A" : a + "× A");
      row += "<tr><td>" + (ed ? '<div style="display:grid;gap:4px">' + field("raci", "tasks." + i + ".area", t.area, { label: "Zonă" }) + field("raci", "tasks." + i + ".name", t.name, { label: "Activitate" }) + "</div>" : esc(t.name)) + "</td>" +
        roles.map(function (ro) {
          var v = t.cells[ro.id] || "";
          return '<td class="cell"><button type="button" class="raci-btn' + (v ? " raci-" + v : "") + '"' + (ed ? ' data-act="raci-cycle" data-idx="' + i + '" data-role="' + esc(ro.id) + '"' : " disabled") +
            ' aria-label="' + esc(ro.name + ": " + (v || "nimic")) + '">' + (v || "·") + "</button></td>";
        }).join("") + "<td>" + check + "</td>" + (ed ? '<td class="act">' + delBtn("raci", "tasks", i, "activitatea") + "</td>" : "") + "</tr>";
      return row;
    }).join("") + "</tbody>";
    h += '<div class="table-wrap"><table class="tbl raci">' + head + body + "</table></div>";
    return h;
  };

  VIEWS.fise = function () {
    var items = state.data.jobs.items, ed = state.edit;
    var h = '<p class="intro">Fișele posturilor din echipa Mokum: scop, responsabilități, competențe și indicatorii după care se evaluează fiecare rol.</p>';
    h += '<div class="toolbar"><span class="spacer"></span>' + (ed ? btn("add", "+ post", { sec: "jobs", path: "items", tpl: "job" }) : "") + "</div>";
    if (!items.length) return h + '<div class="empty">Nicio fișă de post încă.</div>';
    h += items.map(function (j, i) {
      var p = "items." + i;
      if (ed) {
        return '<div class="card job"><div class="card-head"><h3>' + esc(j.title) + "</h3><div>" + moveBtns("jobs", "items", i) + " " + delBtn("jobs", "items", i, "fișa") + "</div></div>" +
          '<div class="grid grid-3">' +
          '<label class="field"><span>Post</span>' + field("jobs", p + ".title", j.title) + "</label>" +
          '<label class="field"><span>Raportează la</span>' + field("jobs", p + ".reportsTo", j.reportsTo) + "</label>" +
          '<label class="field"><span>Program</span>' + field("jobs", p + ".schedule", j.schedule) + "</label></div>" +
          '<label class="field"><span>Scopul postului</span>' + field("jobs", p + ".purpose", j.purpose, { type: "textarea", rows: 2 }) + "</label>" +
          '<div class="grid grid-3">' +
          '<label class="field"><span>Responsabilități</span>' + field("jobs", p + ".responsibilities", j.responsibilities, { type: "textarea", rows: 7 }) + "</label>" +
          '<label class="field"><span>Competențe & cerințe</span>' + field("jobs", p + ".skills", j.skills, { type: "textarea", rows: 7 }) + "</label>" +
          '<label class="field"><span>KPI-uri</span>' + field("jobs", p + ".kpis", j.kpis, { type: "textarea", rows: 7 }) + "</label></div>" +
          '<p class="hint">Câte un punct pe linie, începând cu „- ”.</p></div>';
      }
      return '<details class="card job"' + (i === 0 ? " open" : "") + "><summary><div><h3>" + esc(j.title) + '</h3><div class="small muted">Raportează la ' + esc(j.reportsTo || "—") + " · " + esc(j.schedule || "") + '</div></div><span class="muted">▾</span></summary>' +
        '<p class="prose">' + esc(j.purpose) + '</p><div class="cols prose">' +
        "<div><h4>Responsabilități</h4>" + md(j.responsibilities) + "</div>" +
        "<div><h4>Competențe & cerințe</h4>" + md(j.skills) + "</div>" +
        "<div><h4>KPI-uri</h4>" + md(j.kpis) + "</div></div></details>";
    }).join("");
    return h;
  };

  function docView(sec, intro, quote, photoKey) {
    var chs = state.data[sec].chapters, ed = state.edit;
    var h = photo(photoKey, "ph-shadow", "doc-hero", "<blockquote>" + esc(quote) + "</blockquote>") + '<p class="intro">' + intro + "</p>";
    h += '<div class="toolbar"><span class="spacer"></span>' + (ed ? btn("add", "+ capitol", { sec: sec, path: "chapters", tpl: "chapter" }) : "") +
      ' <button type="button" class="btn btn-sm btn-ghost" onclick="window.print()">Printează</button></div>';
    if (!chs.length) return h + '<div class="empty">Niciun capitol încă.</div>';
    var toc = '<nav class="toc" aria-label="Cuprins">' + chs.map(function (c, i) {
      return '<a href="#" data-scroll="ch-' + sec + "-" + i + '">' + (i + 1) + ". " + esc(c.title) + "</a>";
    }).join("") + "</nav>";
    var body = chs.map(function (c, i) {
      var id = "ch-" + sec + "-" + i;
      if (ed) {
        return '<div class="card chapter" id="' + id + '"><div class="chapter-edit">' +
          '<div style="display:flex;gap:8px;align-items:center">' + field(sec, "chapters." + i + ".title", c.title, { label: "Titlu capitol" }) + moveBtns(sec, "chapters", i) + delBtn(sec, "chapters", i, "capitolul") + "</div>" +
          field(sec, "chapters." + i + ".body", c.body, { type: "textarea", rows: 12, label: "Conținut" }) +
          '<p class="hint">Formatare: „### Titlu”, „- listă”, „1. pași”, „**îngroșat**”, „> citat”, [text](https://link).</p></div></div>';
      }
      return '<article class="card chapter prose" id="' + id + '"><h2>' + (i + 1) + ". " + esc(c.title) + "</h2>" + md(c.body) + "</article>";
    }).join("");
    return h + '<div class="doc-layout">' + toc + "<div>" + body + "</div></div>";
  }
  VIEWS.playbook = function () {
    return docView("playbook", "Playbook-ul operațional Mokum: cum arată o zi bună, standardele barului și cum gestionăm situațiile dificile.", "Timpul este un ingredient. Nu grăbim nimic din ce contează.", "playbook");
  };
  VIEWS.ospitalitate = function () {
    return docView("hospitality", "Direcția de ospitalitate stabilită împreună cu Around The Corner, din Mokum Brandbook v2.0: misiunea, arhetipurile, principiile și tonul vocii.", "Ospitalitate firească. Calmă, atentă, fără efuziune.", "ospitalitate");
  };

  VIEWS.cjm = function () {
    var c = state.data.cjm, ed = state.edit, st = c.stages;
    var h = '<p class="intro">Drumul clientului Mokum, de la prima impresie până la revenire: ce face, ce simte, unde ne pierde și ce standard punem în fiecare etapă.</p>';
    h += '<div class="toolbar"><span class="spacer"></span>' + (ed ? btn("add", "+ etapă", { sec: "cjm", path: "stages", tpl: "stage" }) + " " + btn("add", "+ rând", { sec: "cjm", path: "rows", tpl: "cjmrow" }) : "") + "</div>";
    if (!st.length) return h + '<div class="empty">Nicio etapă definită.</div>';

    // Curba emoțională
    var W = Math.max(640, st.length * 120), H = 150, padX = 50;
    var x = function (i) { return padX + (W - 2 * padX) * (st.length === 1 ? 0.5 : i / (st.length - 1)); };
    var y = function (e) { return 20 + (H - 50) * (1 - ((Number(e) || 0) + 2) / 4); };
    var pts = st.map(function (s, i) { return x(i).toFixed(1) + "," + y(s.emotion).toFixed(1); }).join(" ");
    var faces = { "-2": "Frustrat", "-1": "Nemulțumit", "0": "Neutru", "1": "Mulțumit", "2": "Încântat" };
    var svg = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Curba emoțională a clientului">' +
      '<line class="axis" x1="' + padX + '" x2="' + (W - padX) + '" y1="' + y(0) + '" y2="' + y(0) + '" stroke-dasharray="4 4"/>' +
      '<polyline points="' + pts + '" fill="none" stroke="var(--mokum)" stroke-width="2.5" stroke-linejoin="round"/>' +
      st.map(function (s, i) {
        var e = Number(s.emotion) || 0;
        return '<circle cx="' + x(i) + '" cy="' + y(e) + '" r="6" fill="' + (e < 0 ? "var(--bad)" : e > 0 ? "var(--good)" : "var(--ink-soft)") + '"><title>' + esc(s.name + ": " + faces[String(e)]) + "</title></circle>" +
          '<text x="' + x(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(s.name) + "</text>";
      }).join("") + "</svg>";
    h += '<div class="card"><h3>Curba emoțională</h3><div class="chart" style="overflow-x:auto"><div style="min-width:' + W + 'px">' + svg + "</div></div></div>";

    var head = '<thead><tr><th class="row-h"></th>' + st.map(function (s, i) {
      return '<th class="stage-h">' + (ed ? field("cjm", "stages." + i + ".name", s.name, { label: "Etapă" }) +
        '<div style="display:flex;gap:4px;margin-top:4px">' + field("cjm", "stages." + i + ".emotion", s.emotion, { type: "select", kind: "num", options: [2, 1, 0, -1, -2].map(function (e) { return { v: e, l: faces[String(e)] }; }) }) +
        btn("cjm-del-stage", "✕", { idx: i }, "btn-ghost btn-danger") + "</div>" : (i + 1) + ". " + esc(s.name)) + "</th>";
    }).join("") + "</tr></thead>";
    var body = "<tbody>" + c.rows.map(function (r, ri) {
      return '<tr><th class="row-h">' + (ed ? field("cjm", "rows." + ri + ".name", r.name, { label: "Rând" }) + btn("cjm-del-row", "✕", { idx: ri }, "btn-ghost btn-danger") : esc(r.name)) + "</th>" +
        st.map(function (s) {
          var k = r.id + "|" + s.id, v = c.cells[k] || "";
          return "<td>" + (ed ? field("cjm", "cells." + k, v, { type: "textarea", rows: 3, label: r.name + " · " + s.name }) : esc(v)) + "</td>";
        }).join("") + "</tr>";
    }).join("") + "</tbody>";
    h += '<div class="section"><div class="table-wrap"><table class="tbl cjm">' + head + body + "</table></div></div>";
    return h;
  };

  VIEWS.cursuri = function () {
    var items = state.data.courses.items, members = state.data.team.members, ed = state.edit;
    var mods = {}; items.forEach(function (c) { if (c.module) mods[c.module] = true; });
    var mod = state.ui.courseModule || "";
    var h = '<p class="intro">Programul de training Around The Corner pentru Mokum. Bifele de absolvire se fac din pagina Echipa, pe fiecare persoană.</p>';
    h += '<div class="toolbar">' + uiSelect("courseModule", mod, [{ v: "", l: "Toate modulele" }].concat(Object.keys(mods).map(function (m) { return { v: m, l: m }; })), "Modul") +
      '<span class="spacer"></span>' + (ed ? btn("add", "+ curs", { sec: "courses", path: "items", tpl: "course" }) : "") + "</div>";
    var shown = items.map(function (c, i) { return { c: c, i: i }; }).filter(function (x) { return !mod || x.c.module === mod; });
    if (!shown.length) return h + '<div class="empty">Niciun curs încă.</div>';
    h += '<div class="grid grid-3">' + shown.map(function (x) {
      var c = x.c, i = x.i, p = "items." + i;
      var who = members.filter(function (m) { return (m.courses || []).indexOf(c.id) !== -1; });
      var share = members.length ? (who.length / members.length) * 100 : 0;
      if (ed) {
        return '<div class="card course"><div style="display:grid;gap:6px">' + field("courses", p + ".title", c.title, { label: "Titlu" }) +
          '<div class="grid" style="grid-template-columns:repeat(3,minmax(0,1fr));gap:6px">' + field("courses", p + ".module", c.module, { label: "Modul", placeholder: "Modul" }) +
          field("courses", p + ".level", c.level, { type: "select", options: ["Bază", "Intermediar", "Avansat"] }) + field("courses", p + ".duration", c.duration, { label: "Durată", placeholder: "Durată" }) + "</div>" +
          field("courses", p + ".desc", c.desc, { type: "textarea", rows: 3, label: "Descriere" }) +
          field("courses", p + ".link", c.link, { type: "url", label: "Link material", placeholder: "https://… (PDF, video, Drive)" }) +
          '<div style="text-align:right">' + delBtn("courses", "items", i, "cursul") + "</div></div></div>";
      }
      return '<div class="card course"><h3>' + esc(c.title) + '</h3><div class="meta">' + pill("neutral", esc(c.module || "—")) + pill(c.level === "Avansat" ? "bad" : c.level === "Intermediar" ? "warn" : "good", esc(c.level || "")) +
        (c.duration ? pill("neutral", esc(c.duration)) : "") + "</div><p>" + esc(c.desc) + "</p>" +
        '<div class="small muted" style="display:flex;justify-content:space-between"><span>Absolvit de ' + who.length + "/" + members.length + "</span><span>" + nf0.format(share) + "%</span></div>" +
        '<div class="bar" style="margin:4px 0 10px"><span style="width:' + share + '%"></span></div>' +
        (who.length ? '<div class="small muted">' + who.map(function (m) { return esc(m.name.split(" ")[0]); }).join(", ") + "</div>" : "") +
        (/^https?:\/\//.test(c.link || "") ? '<a class="btn btn-sm btn-ghost" style="margin-top:10px" target="_blank" rel="noopener" href="' + esc(c.link) + '">Deschide materialul</a>' : "") +
        "</div>";
    }).join("") + "</div>";
    return h;
  };

  VIEWS.echipamente = function () {
    var items = state.data.equipment.items, ed = state.edit;
    var st = items.map(serviceStatus);
    var over = st.filter(function (s) { return s.c === "bad"; }).length, soon = st.filter(function (s) { return s.c === "warn"; }).length;
    var warr = items.filter(function (e) { var d = daysUntil(e.warranty); return d != null && d >= 0; }).length;
    var h = '<p class="intro">Inventarul echipamentelor Mokum, cu service-ul programat. Ce e depășit sau în următoarele 30 de zile apare și pe Panou.</p>';
    h += '<div class="grid grid-4">' + statCard("Echipamente", items.length, "") + statCard("Service depășit", over, over ? '<span class="delta-bad">de programat urgent</span>' : "") +
      statCard("Service în 30 de zile", soon, "") + statCard("În garanție", warr, "") + "</div>";
    h += '<div class="section"><div class="toolbar"><span class="spacer"></span>' + (ed ? btn("add", "+ echipament", { sec: "equipment", path: "items", tpl: "equipment" }) : "") + "</div>";
    if (!items.length) return h + '<div class="empty">Niciun echipament înregistrat.</div></div>';
    var cols = [["name", "Echipament"], ["brand", "Marcă / model"], ["serial", "Serie"], ["bought", "Achiziție", "date"], ["supplier", "Service / furnizor"],
      ["lastService", "Ultimul service", "date"], ["nextService", "Următorul service", "date"], ["warranty", "Garanție până la", "date"], ["status", "Stare", "status"], ["notes", "Note"]];
    h += '<div class="table-wrap"><table class="tbl"><thead><tr>' + cols.map(function (c) { return "<th>" + c[1] + "</th>"; }).join("") + (ed ? "<th></th>" : "") + "</tr></thead><tbody>" +
      items.map(function (e, i) {
        return "<tr>" + cols.map(function (c) {
          var v = e[c[0]], p = "items." + i + "." + c[0];
          if (ed) {
            if (c[2] === "status") return "<td>" + field("equipment", p, v, { type: "select", options: ["Funcțional", "De verificat", "În service", "Defect", "Scos din uz"] }) + "</td>";
            return "<td>" + field("equipment", p, v, { type: c[2] === "date" ? "date" : "text", label: c[1] }) + "</td>";
          }
          if (c[0] === "nextService") return "<td>" + pill(st[i].c, st[i].l) + "</td>";
          if (c[2] === "date") return '<td style="white-space:nowrap">' + fmtDate(v) + "</td>";
          if (c[2] === "status") return "<td>" + pill(v === "Funcțional" ? "good" : v === "Defect" ? "bad" : v === "Scos din uz" ? "neutral" : "warn", esc(v)) + "</td>";
          return "<td>" + (c[0] === "name" ? "<strong>" + esc(v) + "</strong>" : esc(v)) + "</td>";
        }).join("") + (ed ? '<td class="act">' + delBtn("equipment", "items", i, "echipamentul") + "</td>" : "") + "</tr>";
      }).join("") + "</tbody></table></div></div>";
    return h;
  };

  VIEWS.contacte = function () {
    var items = state.data.contacts.items, ed = state.edit;
    var cats = {}; items.forEach(function (c) { if (c.category) cats[c.category] = true; });
    var q = (state.ui.contactQ || "").toLowerCase(), cat = state.ui.contactCat || "";
    var h = '<p class="intro">Furnizori, service, contabilitate și toți oamenii de care are nevoie Mokum ca să funcționeze.</p>';
    h += '<div class="toolbar"><input class="inp" type="search" placeholder="Caută…" data-ui="contactQ" data-live value="' + esc(state.ui.contactQ || "") + '" aria-label="Caută contacte" style="max-width:240px">' +
      uiSelect("contactCat", cat, [{ v: "", l: "Toate categoriile" }].concat(Object.keys(cats).sort().map(function (c) { return { v: c, l: c }; })), "Categorie") +
      '<span class="spacer"></span>' + (ed ? btn("add", "+ contact", { sec: "contacts", path: "items", tpl: "contact" }) : "") + "</div>";
    var shown = items.map(function (c, i) { return { c: c, i: i }; }).filter(function (x) {
      if (cat && x.c.category !== cat) return false;
      if (!q) return true;
      return [x.c.name, x.c.category, x.c.person, x.c.phone, x.c.email, x.c.web, x.c.notes].join(" ").toLowerCase().indexOf(q) !== -1;
    });
    if (!shown.length) return h + '<div class="empty">Niciun contact găsit.</div>';
    var cols = [["name", "Nume"], ["category", "Categorie"], ["person", "Persoană / rol"], ["phone", "Telefon", "tel"], ["email", "Email", "email"], ["web", "Web", "url"], ["notes", "Note"]];
    h += '<div class="table-wrap"><table class="tbl"><thead><tr>' + cols.map(function (c) { return "<th>" + c[1] + "</th>"; }).join("") + (ed ? "<th></th>" : "") + "</tr></thead><tbody>" +
      shown.map(function (x) {
        var c = x.c, i = x.i;
        return "<tr>" + cols.map(function (col) {
          var v = c[col[0]];
          if (ed) return "<td>" + field("contacts", "items." + i + "." + col[0], v, { type: col[2] || "text", label: col[1] }) + "</td>";
          if (col[2] === "tel" && v) return '<td style="white-space:nowrap"><a href="tel:' + esc(String(v).replace(/[^\d+]/g, "")) + '">' + esc(v) + "</a></td>";
          if (col[2] === "email" && v) return '<td><a href="mailto:' + esc(v) + '">' + esc(v) + "</a></td>";
          if (col[2] === "url" && /^https?:\/\//.test(v || "")) return '<td><a href="' + esc(v) + '" target="_blank" rel="noopener">' + esc(String(v).replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")) + "</a></td>";
          return "<td>" + (col[0] === "name" ? "<strong>" + esc(v) + "</strong>" : esc(v)) + "</td>";
        }).join("") + (ed ? '<td class="act">' + delBtn("contacts", "items", i, "contactul") + "</td>" : "") + "</tr>";
      }).join("") + "</tbody></table></div>";
    return h;
  };

  VIEWS.setari = function () {
    var theme = lsGet(THEME_KEY) || "auto";
    var h = '<div class="grid grid-2">';
    h += '<div class="card"><h3>Cont</h3><p class="small">' +
      "Conectat ca <strong>" + esc(state.user.email) + "</strong>" + (state.member && state.member.role ? " (" + esc(state.member.role) + ")" : "") + ". Modificările se salvează în baza de date a portalului.</p>" +
      '<label class="field"><span>Temă</span><select class="inp" id="theme-select">' +
      [["auto", "Automat (ca sistemul)"], ["light", "Luminos"], ["dark", "Întunecat"]].map(function (o) { return '<option value="' + o[0] + '"' + (theme === o[0] ? " selected" : "") + ">" + o[1] + "</option>"; }).join("") +
      "</select></label></div>";
    h += '<div class="card"><h3>Backup & import</h3><p class="small muted">Exportă tot conținutul portalului într-un fișier JSON sau importă un backup.</p>' +
      '<div class="toolbar">' + btn("export", "Exportă JSON") + " " + btn("import", "Importă JSON") +
      '<input type="file" id="import-file" accept="application/json,.json" class="hidden"></div>' +
      '<p class="small muted" style="margin-top:14px">Dacă în portal au rămas date exemplu (cifre P&L, echipamente, cursuri, acțiuni fictive), le poți goli de aici.</p>' +
      btn("clear-examples", "Golește datele exemplu", {}, "btn-ghost btn-danger") + "</div>";
    h += "</div>";
    var labels = { actions: "Plan de acțiune", pl: "P&L", kpi: "KPI-uri", team: "Echipa", courses: "Cursuri", org: "Organigramă", raci: "RACI", jobs: "Fișe post", playbook: "Playbook", hospitality: "Ospitalitate", cjm: "Customer Journey", equipment: "Echipamente", contacts: "Contacte" };
    h += '<div class="section"><h2>Ultimele actualizări</h2><div class="table-wrap"><table class="tbl"><thead><tr><th>Secțiune</th><th>Actualizat</th><th>De</th></tr></thead><tbody>' +
      SECTIONS.map(function (s) {
        var m = state.meta[s];
        return "<tr><td>" + labels[s] + "</td><td>" + (m ? esc(new Date(m.updated_at).toLocaleString("ro-RO")) : "—") + "</td><td>" + (m ? esc(m.updated_by || "") : "—") + "</td></tr>";
      }).join("") + "</tbody></table></div></div>";
    return h;
  };

  // Cuprinsul documentelor: derulare fără a schimba ruta.
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-scroll]");
    if (!a) return;
    e.preventDefault();
    var el = document.getElementById(a.getAttribute("data-scroll"));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // ---------- Start ----------
  setTheme(lsGet(THEME_KEY) || "auto");
  bindEvents();
  initAuth();
})();
