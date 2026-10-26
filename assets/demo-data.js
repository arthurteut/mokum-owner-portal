/*
 * Date exemplu pentru scheletul portalului.
 * Cifrele, numele și contactele de aici sunt fictive și se înlocuiesc cu
 * materialele reale ATC. Excepție: Direcția de ospitalitate și capitolul
 * „Cine suntem” sunt preluate din Mokum Brandbook v2.0.
 */
window.MOKUM_DEMO = function () {
  "use strict";

  // Sezonalitate ian–sep; oct–dec rămân goale (luni neînchise).
  var season = [0.82, 0.86, 0.95, 1.0, 1.06, 1.04, 0.97, 0.9, 1.08, 0, 0, 0];
  function months(base, jitter) {
    return season.map(function (f, i) {
      if (!f) return null;
      var j = jitter ? 1 + (((i * 37) % 7) - 3) / 100 : 1;
      return Math.round((base * f * j) / 10) * 10;
    });
  }
  function fixed(v) {
    return season.map(function (f) { return f ? v : null; });
  }
  function pctOf(arr, pct) {
    return arr.map(function (v) { return v == null ? null : Math.round((v * pct) / 10) * 10; });
  }

  var coffee = months(84000, true);
  var food = months(31000, true);
  var retail = months(6200, true);
  var events = months(2400, false);
  var revenue = coffee.map(function (v, i) {
    return v == null ? null : v + food[i] + retail[i] + events[i];
  });

  var pl = {
    currency: "RON",
    targets: { cogsPct: 30, laborPct: 28, primePct: 58, ebitdaPct: 15 },
    years: {
      "2026": {
        lines: [
          { id: "r1", group: "rev", name: "Cafea & băuturi", values: coffee },
          { id: "r2", group: "rev", name: "Patiserie & food", values: food },
          { id: "r3", group: "rev", name: "Retail (boabe, accesorii)", values: retail },
          { id: "r4", group: "rev", name: "Evenimente & altele", values: events },
          { id: "c1", group: "cogs", name: "Cafea boabe", values: pctOf(coffee, 0.095) },
          { id: "c2", group: "cogs", name: "Lapte & alternative vegetale", values: pctOf(coffee, 0.085) },
          { id: "c3", group: "cogs", name: "Patiserie & food (achiziție)", values: pctOf(food, 0.46) },
          { id: "c4", group: "cogs", name: "Marfă retail", values: pctOf(retail, 0.55) },
          { id: "c5", group: "cogs", name: "Ambalaje & consumabile", values: pctOf(revenue, 0.028) },
          { id: "o1", group: "opex", name: "Salarii & contribuții", labor: true, values: pctOf(revenue, 0.27) },
          { id: "o2", group: "opex", name: "Chirie", values: fixed(14500) },
          { id: "o3", group: "opex", name: "Utilități", values: months(4300, true) },
          { id: "o4", group: "opex", name: "Marketing & social media", values: fixed(2500) },
          { id: "o5", group: "opex", name: "POS, software & abonamente", values: fixed(950) },
          { id: "o6", group: "opex", name: "Mentenanță & service", values: months(1300, true) },
          { id: "o7", group: "opex", name: "Contabilitate & juridic", values: fixed(1600) },
          { id: "o8", group: "opex", name: "Consultanță Around The Corner", values: fixed(3000) },
          { id: "o9", group: "opex", name: "Comisioane card & livrare", values: pctOf(revenue, 0.014) },
          { id: "o10", group: "opex", name: "Alte cheltuieli", values: months(1200, true) },
          { id: "d1", group: "below", name: "Amortizare", values: fixed(2800) },
          { id: "d2", group: "below", name: "Impozit & dobânzi", values: pctOf(revenue, 0.01) }
        ]
      }
    }
  };

  function kv(arr) {
    var o = {};
    arr.forEach(function (v, i) {
      if (v != null) o["2026-" + (i < 9 ? "0" : "") + (i + 1)] = v;
    });
    return o;
  }

  var kpi = {
    items: [
      { id: "k1", name: "Bon mediu", unit: "RON", target: 32, better: "up", owner: "Manager", values: kv([28.4, 28.9, 29.6, 30.1, 30.8, 31.2, 31.0, 30.6, 32.3]) },
      { id: "k2", name: "Bonuri pe zi", unit: "buc", target: 140, better: "up", owner: "Manager", values: kv([112, 116, 124, 128, 133, 131, 122, 116, 136]) },
      { id: "k3", name: "Vânzări pe oră de muncă", unit: "RON", target: 210, better: "up", owner: "Manager", values: kv([176, 181, 192, 198, 207, 204, 193, 185, 211]) },
      { id: "k4", name: "Cost marfă (COGS %)", unit: "%", target: 30, better: "down", owner: "Manager", auto: "cogsPct", values: {} },
      { id: "k5", name: "Cost personal (%)", unit: "%", target: 28, better: "down", owner: "Owner", auto: "laborPct", values: {} },
      { id: "k6", name: "Prime cost (%)", unit: "%", target: 58, better: "down", owner: "Owner", auto: "primePct", values: {} },
      { id: "k7", name: "EBITDA (%)", unit: "%", target: 15, better: "up", owner: "Owner", auto: "ebitdaPct", values: {} },
      { id: "k8", name: "Rată upsell patiserie", unit: "%", target: 25, better: "up", owner: "Head barista", values: kv([17, 18, 19, 21, 22, 22, 21, 20, 24]) },
      { id: "k9", name: "Rating Google", unit: "★", target: 4.8, better: "up", owner: "Manager", values: kv([4.6, 4.6, 4.6, 4.7, 4.7, 4.7, 4.7, 4.7, 4.8]) },
      { id: "k10", name: "Timp mediu de servire", unit: "min", target: 4, better: "down", owner: "Head barista", values: kv([5.6, 5.4, 5.1, 4.9, 4.8, 4.6, 4.4, 4.3, 4.2]) },
      { id: "k11", name: "Pierderi (waste) din COGS", unit: "%", target: 3, better: "down", owner: "Head barista", values: kv([5.2, 4.9, 4.6, 4.1, 3.9, 3.6, 3.8, 3.5, 3.2]) },
      { id: "k12", name: "Clienți care revin", unit: "%", target: 40, better: "up", owner: "Manager", values: kv([31, 32, 33, 34, 36, 37, 36, 35, 38]) },
      { id: "k13", name: "Calibrări zilnice efectuate", unit: "%", target: 100, better: "up", owner: "Head barista", values: kv([71, 78, 84, 88, 93, 95, 92, 94, 97]) }
    ]
  };

  var criteria = [
    { id: "c1", name: "Espresso & calibrare", weight: 20, desc: "Rețeta respectată, calibrare la deschidere și la fiecare schimbare, gust verificat." },
    { id: "c2", name: "Lapte & latte art", weight: 15, desc: "Textură constantă, temperatură corectă, desen curat pe toate dimensiunile." },
    { id: "c3", name: "Ospitalitate", weight: 20, desc: "Salut în primele 10 secunde, contact vizual, recomandare personalizată, ritualul Mokum." },
    { id: "c4", name: "Viteză & flux la bar", weight: 15, desc: "Workflow ordonat, comenzile ies în ordine, sub 4 minute în vârf." },
    { id: "c5", name: "Curățenie & HACCP", weight: 10, desc: "Stația curată în orice moment, checklist-uri completate, temperaturi notate." },
    { id: "c6", name: "Produs & upsell", weight: 10, desc: "Cunoaște originile, notele de gust și recomandă pairing-uri." },
    { id: "c7", name: "Atitudine & echipă", weight: 10, desc: "Punctualitate, ajută colegii, primește feedback." }
  ];
  function sc(a) {
    var o = {};
    criteria.forEach(function (c, i) { o[c.id] = a[i]; });
    return o;
  }

  var team = {
    criteria: criteria,
    members: [
      { id: "m1", name: "Andrei Pop", role: "Head barista / Manager", since: "2023-03-01", lastReview: "2026-09-15", scores: sc([5, 5, 4, 5, 4, 5, 4]), courses: ["k1", "k2", "k3", "k4", "k5", "k6", "k7", "k8", "k9", "k10", "k11"], notes: "Pregătit pentru rolul de trainer intern. Următorul pas: cursul de leadership la bar finalizat cu proiect." },
      { id: "m2", name: "Ioana Marin", role: "Barista", since: "2024-05-10", lastReview: "2026-09-15", scores: sc([4, 5, 5, 4, 4, 4, 5]), courses: ["k1", "k2", "k3", "k4", "k7", "k8", "k9"], notes: "Cea mai bună la ospitalitate; o folosim ca exemplu la onboarding." },
      { id: "m3", name: "Vlad Stoica", role: "Barista", since: "2024-11-01", lastReview: "2026-09-16", scores: sc([4, 3, 3, 5, 4, 3, 4]), courses: ["k1", "k2", "k3", "k5", "k9"], notes: "Foarte rapid; de lucrat pe recomandări și interacțiune." },
      { id: "m4", name: "Maria Dumitru", role: "Barista", since: "2025-06-15", lastReview: "2026-09-16", scores: sc([3, 4, 4, 3, 5, 3, 4]), courses: ["k1", "k3", "k7", "k9"], notes: "Plan: calibrare cu Andrei, 2 sesiuni pe săptămână în octombrie." },
      { id: "m5", name: "Radu Ilie", role: "Barista", since: "2026-02-01", lastReview: "2026-09-17", scores: sc([3, 3, 4, 3, 3, 3, 4]), courses: ["k1", "k7"], notes: "În perioada de dezvoltare; are nevoie de cursul de lapte până la final de noiembrie." },
      { id: "m6", name: "Elena Toma", role: "Runner", since: "2025-09-01", lastReview: "2026-09-17", scores: sc([2, 2, 5, 4, 4, 4, 5]), courses: ["k7", "k8", "k9"], notes: "Vrea să treacă la bar: începe traseul de barista în ianuarie." }
    ]
  };

  var courses = {
    items: [
      { id: "k1", title: "Fundamentele espresso", module: "Bar", level: "Bază", duration: "4 h", link: "", desc: "Rețeta, doza, randamentul, timpul; cum arată și cum gustă un shot corect." },
      { id: "k2", title: "Calibrare & extracție (TDS / EY)", module: "Bar", level: "Avansat", duration: "3 h", link: "", desc: "Refractometru, fereastra 18–22%, cum corectăm sub- și supra-extracția." },
      { id: "k3", title: "Lapte & latte art I", module: "Bar", level: "Bază", duration: "4 h", link: "", desc: "Textura microspumei, temperaturi, inimă și rozetă." },
      { id: "k4", title: "Latte art II", module: "Bar", level: "Avansat", duration: "3 h", link: "", desc: "Lalele, swan, constanță pe toate dimensiunile de cană." },
      { id: "k5", title: "Metode alternative & batch brew", module: "Bar", level: "Intermediar", duration: "3 h", link: "", desc: "V60, Aeropress, batch brew; rețetele Mokum pentru filtru." },
      { id: "k6", title: "Apa în cafea", module: "Bar", level: "Avansat", duration: "2 h", link: "", desc: "Duritate, alcalinitate, filtrare și impactul în ceașcă." },
      { id: "k7", title: "Ospitalitate Mokum: ritualul de primire", module: "Ospitalitate", level: "Bază", duration: "3 h", link: "", desc: "Cei 7 pași ai serviciului Mokum, tonul vocii, recuperarea serviciului." },
      { id: "k8", title: "Recomandare & upsell natural", module: "Ospitalitate", level: "Intermediar", duration: "2 h", link: "", desc: "Cum recomanzi fără să vinzi agresiv; pairing cafea + patiserie." },
      { id: "k9", title: "Curățenie, întreținere & HACCP", module: "Operațiuni", level: "Bază", duration: "2 h", link: "", desc: "Backflush, râșnițe, frigidere, registre de temperatură." },
      { id: "k10", title: "Senzorial & cupping", module: "Bar", level: "Avansat", duration: "3 h", link: "", desc: "Roata aromelor, protocol de cupping, cum descriem o cafea clientului." },
      { id: "k11", title: "Leadership la bar", module: "Leadership", level: "Avansat", duration: "6 h", link: "", desc: "Pentru head barista: ture, feedback, onboarding, standarde." }
    ]
  };

  var org = {
    nodes: [
      { id: "n1", title: "Owner", person: "Proprietar", parent: "", external: false },
      { id: "n2", title: "Head barista / Manager", person: "Andrei Pop", parent: "n1", external: false },
      { id: "n3", title: "Barista", person: "Ioana, Vlad, Maria, Radu", parent: "n2", external: false },
      { id: "n4", title: "Runner", person: "Elena Toma", parent: "n2", external: false },
      { id: "n5", title: "The Underdog", person: "prăjitoria parteneră, Atena", parent: "n2", external: true },
      { id: "n6", title: "Around The Corner", person: "consultanță & training", parent: "n1", external: true }
    ]
  };

  var raci = {
    "roles": [
      {
        "id": "ro-owner",
        "name": "Owner"
      },
      {
        "id": "ro-hb",
        "name": "Head barista / Manager"
      },
      {
        "id": "ro-bar",
        "name": "Barista"
      },
      {
        "id": "ro-run",
        "name": "Runner"
      },
      {
        "id": "ro-ud",
        "name": "The Underdog"
      },
      {
        "id": "ro-atc",
        "name": "ATC"
      }
    ],
    "tasks": [
      {
        "id": "t1",
        "area": "Financiar",
        "name": "Buget anual & P&L",
        "cells": {
          "ro-owner": "A",
          "ro-hb": "R",
          "ro-bar": "",
          "ro-run": "",
          "ro-ud": "",
          "ro-atc": "C"
        }
      },
      {
        "id": "t2",
        "area": "Financiar",
        "name": "Închidere lunară & raportare",
        "cells": {
          "ro-owner": "A",
          "ro-hb": "R",
          "ro-bar": "",
          "ro-run": "",
          "ro-ud": "",
          "ro-atc": "C"
        }
      },
      {
        "id": "t3",
        "area": "Financiar",
        "name": "Prețuri & meniu",
        "cells": {
          "ro-owner": "A",
          "ro-hb": "R",
          "ro-bar": "C",
          "ro-run": "I",
          "ro-ud": "C",
          "ro-atc": "C"
        }
      },
      {
        "id": "t4",
        "area": "Cafea",
        "name": "Selecția cafelelor (oferta The Underdog)",
        "cells": {
          "ro-owner": "C",
          "ro-hb": "A",
          "ro-bar": "C",
          "ro-run": "",
          "ro-ud": "R",
          "ro-atc": "C"
        }
      },
      {
        "id": "t5",
        "area": "Cafea",
        "name": "Comenzi de cafea",
        "cells": {
          "ro-owner": "I",
          "ro-hb": "A",
          "ro-bar": "I",
          "ro-run": "",
          "ro-ud": "I",
          "ro-atc": ""
        }
      },
      {
        "id": "t6",
        "area": "Cafea",
        "name": "Rețete & profiluri de extracție",
        "cells": {
          "ro-owner": "I",
          "ro-hb": "A",
          "ro-bar": "C",
          "ro-run": "",
          "ro-ud": "C",
          "ro-atc": "C"
        }
      },
      {
        "id": "t7",
        "area": "Cafea",
        "name": "Calibrare zilnică espresso",
        "cells": {
          "ro-owner": "",
          "ro-hb": "A",
          "ro-bar": "R",
          "ro-run": "",
          "ro-ud": "",
          "ro-atc": "C"
        }
      },
      {
        "id": "t8",
        "area": "Operațiuni",
        "name": "Comenzi lapte & consumabile",
        "cells": {
          "ro-owner": "I",
          "ro-hb": "A",
          "ro-bar": "",
          "ro-run": "R",
          "ro-ud": "",
          "ro-atc": ""
        }
      },
      {
        "id": "t9",
        "area": "Operațiuni",
        "name": "Inventar lunar",
        "cells": {
          "ro-owner": "I",
          "ro-hb": "A",
          "ro-bar": "R",
          "ro-run": "R",
          "ro-ud": "",
          "ro-atc": ""
        }
      },
      {
        "id": "t10",
        "area": "Operațiuni",
        "name": "Mentenanță echipamente",
        "cells": {
          "ro-owner": "I",
          "ro-hb": "A",
          "ro-bar": "R",
          "ro-run": "",
          "ro-ud": "",
          "ro-atc": "C"
        }
      },
      {
        "id": "t11",
        "area": "Operațiuni",
        "name": "Curățenie & HACCP",
        "cells": {
          "ro-owner": "I",
          "ro-hb": "A",
          "ro-bar": "R",
          "ro-run": "R",
          "ro-ud": "",
          "ro-atc": ""
        }
      },
      {
        "id": "t12",
        "area": "Sală",
        "name": "Standardul de ospitalitate",
        "cells": {
          "ro-owner": "A",
          "ro-hb": "R",
          "ro-bar": "R",
          "ro-run": "R",
          "ro-ud": "",
          "ro-atc": "C"
        }
      },
      {
        "id": "t13",
        "area": "Sală",
        "name": "Flux sală, debarasare, vitrină",
        "cells": {
          "ro-owner": "",
          "ro-hb": "A",
          "ro-bar": "C",
          "ro-run": "R",
          "ro-ud": "",
          "ro-atc": ""
        }
      },
      {
        "id": "t14",
        "area": "Oameni",
        "name": "Recrutare",
        "cells": {
          "ro-owner": "A",
          "ro-hb": "R",
          "ro-bar": "",
          "ro-run": "",
          "ro-ud": "",
          "ro-atc": "C"
        }
      },
      {
        "id": "t15",
        "area": "Oameni",
        "name": "Onboarding & training",
        "cells": {
          "ro-owner": "I",
          "ro-hb": "A",
          "ro-bar": "I",
          "ro-run": "I",
          "ro-ud": "C",
          "ro-atc": "R"
        }
      },
      {
        "id": "t16",
        "area": "Oameni",
        "name": "Evaluări trimestriale",
        "cells": {
          "ro-owner": "I",
          "ro-hb": "A",
          "ro-bar": "I",
          "ro-run": "I",
          "ro-ud": "",
          "ro-atc": "C"
        }
      },
      {
        "id": "t17",
        "area": "Oameni",
        "name": "Programul turelor",
        "cells": {
          "ro-owner": "I",
          "ro-hb": "A",
          "ro-bar": "I",
          "ro-run": "I",
          "ro-ud": "",
          "ro-atc": ""
        }
      },
      {
        "id": "t18",
        "area": "Comunitate",
        "name": "Social media & comunicare",
        "cells": {
          "ro-owner": "A",
          "ro-hb": "R",
          "ro-bar": "",
          "ro-run": "",
          "ro-ud": "C",
          "ro-atc": "C"
        }
      },
      {
        "id": "t19",
        "area": "Comunitate",
        "name": "Evenimente Mokum × The Underdog",
        "cells": {
          "ro-owner": "A",
          "ro-hb": "R",
          "ro-bar": "I",
          "ro-run": "I",
          "ro-ud": "C",
          "ro-atc": "C"
        }
      }
    ]
  };

  var jobs = {
    "items": [
      {
        "id": "j-hb",
        "title": "Head barista / Manager",
        "reportsTo": "Owner",
        "schedule": "Normă întreagă",
        "purpose": "Conduce barul și operațiunile zilnice Mokum: calitatea fiecărei cești, echipa și relația cu The Underdog, astfel încât cafeneaua să-și atingă țintele.",
        "responsibilities": "- Calibrarea zilnică și rețetele barului, împreună cu profilurile recomandate de The Underdog\n- Comenzi de cafea, lapte și consumabile; controlul stocurilor și al pierderilor\n- Programul turelor, onboarding și training, împreună cu Around The Corner\n- Mentenanța echipamentelor și standardele HACCP\n- Urmărirea P&L și a KPI-urilor cu owner-ul; închiderea lunară\n- Evaluarea trimestrială a echipei",
        "skills": "- Experiență solidă ca barista în specialty coffee\n- Cursurile ATC de bar, nivel avansat, și leadership la bar\n- Organizare, comunicare calmă, feedback clar",
        "kpis": "- Prime cost ≤ 58%\n- Calibrări efectuate 100%\n- Waste ≤ 3% din COGS\n- Media echipei ≥ 75 puncte"
      },
      {
        "id": "j-bar",
        "title": "Barista",
        "reportsTo": "Head barista / Manager",
        "schedule": "Ture rotative",
        "purpose": "Prepară băuturile la standardul Mokum și primește fiecare oaspete firesc: calm, atent, fără efuziune.",
        "responsibilities": "- Prepararea băuturilor după rețetele barului\n- Calibrarea la deschidere și la schimbarea cafelei\n- Primirea oaspeților după principiile din Direcția de ospitalitate\n- Recomandări despre cafelele The Underdog: origine, proces, note de gust\n- Curățenia stației și checklist-urile HACCP",
        "skills": "- Pasiune pentru cafea și oameni\n- Cursurile ATC de bază: espresso, lapte, ospitalitate, HACCP\n- Atenție la detalii, lucru în echipă",
        "kpis": "- Punctaj overall ≥ 70\n- Rată upsell ≥ 25%\n- Zero abateri HACCP"
      },
      {
        "id": "j-run",
        "title": "Runner",
        "reportsTo": "Head barista / Manager",
        "schedule": "Ture de vârf",
        "purpose": "Ține fluxul sălii fluid: comenzi, livrare la masă, debarasare și vitrină, ca barul să se poată concentra pe cafea.",
        "responsibilities": "- Preluarea comenzilor și încasarea\n- Livrarea la masă și debarasarea\n- Vitrina aranjată și etichetată\n- Comenzi de lapte și consumabile, la cererea head barista\n- Sprijin pentru bar în vârf",
        "skills": "- Comunicare caldă și rapidă\n- Cursurile ATC de ospitalitate și HACCP",
        "kpis": "- Masa debarasată în < 3 min\n- Upsell patiserie ≥ 25%"
      }
    ]
  };

  var playbook = {
    chapters: [
      { id: "p1", title: "Cine suntem", body: "Mokum a fost fondată în 2010, pe strada Eugeniu de Savoia, în Piața Unirii. A fost prima cafenea de specialitate din Timișoara și printre primele din România care a introdus cafeaua to-go ca un concept, nu ca un compromis.\n\nComunitatea formată în jurul ei, preponderent arhitecți și designeri, este o audiență cu ochi exersat, care evaluează înainte să consume. Nu trebuie construită de la zero: trebuie reactivată și onorată.\n\n> Mutăm autoritatea din discurs în ceașcă.\n\nDetaliile despre ton și serviciu sunt în **Direcția de ospitalitate**." },
      { id: "p2", title: "O zi la Mokum", body: "### Deschidere (07:00–07:45)\n1. Pornește espressorul și râșnițele (minim 30 min încălzire).\n2. Backflush cu apă, purjă la toate grupurile.\n3. Calibrare: 18 g → 38 g în 27–30 s; gustă și notează în registru.\n4. Verifică frigiderele (≤ 4 °C) și notează temperaturile.\n5. Vitrina: patiseria aranjată, etichete cu prețuri și alergeni.\n\n### În timpul zilei\n- Recalibrează la fiecare 2 ore sau când se schimbă cafeaua.\n- Stația curată după fiecare val de comenzi.\n\n### Închidere\n1. Backflush cu detergent, curățarea grupurilor și a portafiltrelor.\n2. Golește și curăță râșnițele.\n3. Inventar rapid lapte și patiserie; notează pierderile.\n4. Checklist de închidere semnat." },
      { id: "p3", title: "Standardele barului", body: "### Rețetele de bază\n- **Espresso**: 18 g → 38 g, 27–30 s\n- **Flat white**: dublu espresso + 140 ml lapte, 60–62 °C\n- **Cappuccino**: espresso + 150 ml lapte, spumă 1,5 cm\n- **Filtru (V60)**: 15 g / 250 g apă, 93 °C, 3:00\n\n### Reguli\n- Nu servim nimic ce nu am fi mândri să bem noi.\n- Orice băutură ratată se reface, fără discuție." },
      { id: "p4", title: "Curățenie & siguranța alimentară", body: "- Registrele de temperatură se completează de 2 ori pe zi.\n- Lapte deschis: maxim 48 h, etichetat cu data.\n- Lavete separate pe culori: bar, sală, toaletă.\n- Plan de curățenie săptămânal afișat în zona de spălare." },
      { id: "p5", title: "Situații dificile", body: "### Client nemulțumit: modelul ASCULT\n1. **Ascultă** până la capăt.\n2. **Scuză-te** sincer.\n3. **Corectează**: refaci băutura sau oferi o alternativă.\n4. **Urmărește** dacă acum e ok.\n\n### Cozi lungi\n- Runner-ul preia comenzi la coadă, head barista trece pe espresso dedicat." }
    ]
  };

  // Direcția de ospitalitate: conținut real, preluat din Mokum Brandbook v2.0.
  var hospitality = {
    chapters: [
      { id: "h1", title: "Misiune și promisiune", body: "### Misiune\n**Mutăm autoritatea din discurs în ceașcă.**\n\nUn espresso bine extras este o afirmație pe care oaspetele trebuie să o creadă pe cuvânt. Munca noastră este să o demonstrăm: prin metodă, prin oameni, prin spațiu și prin felul în care primim.\n\n### Promisiune\n> Oricine intră la Mokum pleacă știind ceva ce nu știa la intrare: despre cafea sau despre cum se simte să fii bine primit." },
      { id: "h2", title: "Cine este Mokum", body: "Arhetipurile sunt busola care decide ton, vizual, limbaj și comportament pe toate canalele, în această ordine.\n\n### 1. Expertul (primar)\n„Cunoașterea este formă. Tehnica este respectul.” Cea mai veche cafenea de specialitate din oraș: capital de competență, nu nostalgie.\n- **Cum:** conținut care educă: origine, extracție, profil de gust. Niciodată „cel mai bun”, mereu „iată de ce”.\n\n### 2. Creatorul (secundar)\n„Forma contează la fel de mult ca fondul.” Audiența are ochi exersat.\n- **Cum:** documentarea deciziilor de design. Nu „am renovat”, ci „iată de ce am ales această finisare”.\n\n### 3. Omul Comunității (terțiar)\n„Locul unde te simți bine primit în mod firesc.”\n- **Cum:** recunoașterea oaspetelui fidel. Evenimente mici, recurente. Ospitalitate fără rezerve." },
      { id: "h3", title: "Principiile serviciului", body: "1. **Demonstrăm, nu declarăm.** Orice afirmație este susținută de context sau proces. Fără superlative nefondate.\n2. **Forma contează cât fondul.** Un pahar, o etichetă, un caption se tratează cu aceeași seriozitate ca extracția.\n3. **Ospitalitate firească.** Calmă, atentă, fără efuziune. Oaspetele este recunoscut, nu procesat.\n4. **Timpul este un ingredient.** 16 ani de practică, un Nel Drip de 4 minute, o tăcere calibrată înainte de un anunț. Nu grăbim nimic din ce contează." },
      { id: "h4", title: "Cum vorbește Mokum", body: "Tonul derivă direct din arhetipuri. Nu există un ton „de marketing” separat de cum vorbesc oamenii din bar.\n\n- **Calm, precis:** „Cafeaua asta vine din Etiopia, procesată natural. O să simți echilibru în ceașcă.” Niciodată: „Cea mai bună cafea din oraș!”\n- **Informat, fără aroganță:** „Am schimbat sitele din portafiltre pentru extracții mai precise și mai curate.” Niciodată: „Noi știm cel mai bine.”\n- **Cald, fără efuziune:** „Ne bucurăm că ești din nou pe la noi.” Niciodată: „Familia Mokum te iubește!”\n- **Direct, fără umpluturi:** „Deschidem la 8. Noul bar, luna viitoare.” Niciodată: „Suntem încântați să anunțăm că în curând…”\n\n### Reguli\n- Propoziții scurte. Mokum nu explică, arată.\n- Fără superlative.\n- Același ton peste tot: postare, DM, meniu, conversația de la bar.\n- Fără emoji în titluri." },
      { id: "h5", title: "Ce păstrăm, ce actualizăm", body: "**Mokum nu se reinventează. Se actualizează.** Orice mesaj care sugerează că „totul era greșit înainte” este greșit.\n\n### Ce păstrăm\n- Numele și locul\n- Comunitatea existentă\n- Calitatea reală ca singur argument\n- Paleta de culori\n\n### Ce actualizăm\n- Logo-ul, tipografia, spațiul, barul, metoda\n- Felul în care comunicăm\n\n### Ce nu facem niciodată\n- Hype, superlative, exces\n- Nostalgie ca argument\n- Comunicare „de marketing” separată de cum vorbesc oamenii din bar" }
    ]
  };

  var cjm = {
    stages: [
      { id: "s1", name: "Descoperire", emotion: 1 },
      { id: "s2", name: "Sosire", emotion: 0 },
      { id: "s3", name: "Comandă", emotion: 1 },
      { id: "s4", name: "Așteptare", emotion: -1 },
      { id: "s5", name: "Servire", emotion: 2 },
      { id: "s6", name: "La masă", emotion: 1 },
      { id: "s7", name: "Plecare", emotion: 1 },
      { id: "s8", name: "Revenire", emotion: 2 }
    ],
    rows: [
      { id: "r1", name: "Ce face clientul" },
      { id: "r2", name: "Touchpoints" },
      { id: "r3", name: "Ce simte / gândește" },
      { id: "r4", name: "Puncte de durere" },
      { id: "r5", name: "Standard Mokum / oportunitate" },
      { id: "r6", name: "Responsabil" }
    ],
    cells: {
      "r1|s1": "Vede Mokum pe Instagram sau trece pe stradă.", "r2|s1": "Instagram, Google Maps, vitrina, recomandări", "r3|s1": "„Arată bine, oare e bună cafeaua?”", "r4|s1": "Program și meniu greu de găsit online", "r5|s1": "Profil Google complet, meniu actualizat, poze reale", "r6|s1": "Manager",
      "r1|s2": "Intră, caută din priviri unde să comande.", "r2|s2": "Ușa, mirosul, muzica, barul", "r3|s2": "„Unde mă așez? Pe cine întreb?”", "r4|s2": "Nimeni nu salută în vârf", "r5|s2": "Salut în 10 secunde, indiferent de coadă", "r6|s2": "Toată echipa",
      "r1|s3": "Citește meniul, întreabă, comandă.", "r2|s3": "Meniul de la bar, barista, POS", "r3|s3": "„Nu știu ce să aleg”", "r4|s3": "Meniu prea lung, termeni tehnici", "r5|s3": "O întrebare + o recomandare personală", "r6|s3": "Barista",
      "r1|s4": "Așteaptă la bar sau la masă.", "r2|s4": "Zona de ridicare, barul", "r3|s4": "„Cât mai durează?”", "r4|s4": "Peste 5 minute în vârf, fără informare", "r5|s4": "Sub 4 minute; anunțăm proactiv întârzierile", "r6|s4": "Head barista",
      "r1|s5": "Primește băutura.", "r2|s5": "Cana, latte art, barista", "r3|s5": "„Wow, arată superb”", "r4|s5": "Băutura strigată de la bar fără nume", "r5|s5": "Livrare pe nume + o propoziție despre cafea", "r6|s5": "Barista / Runner",
      "r1|s6": "Stă, lucrează sau socializează.", "r2|s6": "Mese, Wi-Fi, prize, toaletă", "r3|s6": "„Mă simt bine aici”", "r4|s6": "Mese nedebarasate, toaleta neverificată", "r5|s6": "Check-in după 2–3 min, debarasare < 3 min", "r6|s6": "Runner",
      "r1|s7": "Pleacă.", "r2|s7": "Ușa, echipa", "r3|s7": "„Revin mâine”", "r4|s7": "Plecare neobservată", "r5|s7": "La revedere pe nume", "r6|s7": "Toată echipa",
      "r1|s8": "Revine, recomandă, lasă recenzie.", "r2|s8": "Card de fidelitate, Google, Instagram", "r3|s8": "„E cafeneaua mea”", "r4|s8": "Fără motiv clar să revină mai des", "r5|s8": "Program de fidelitate, răspuns la toate recenziile în 24 h", "r6|s8": "Manager"
    }
  };

  var equipment = {
    items: [
      { id: "e1", name: "Espressor 2 grupuri", brand: "La Marzocco Linea PB", serial: "LM-000000", bought: "2023-02-10", supplier: "Service espressor (exemplu)", lastService: "2026-04-12", nextService: "2026-10-12", warranty: "2025-02-10", status: "Funcțional", notes: "Schimb garnituri grup la următorul service." },
      { id: "e2", name: "Râșniță espresso", brand: "Mahlkönig E65S GbW", serial: "MK-000000", bought: "2023-02-10", supplier: "Service espressor (exemplu)", lastService: "2026-06-01", nextService: "2026-12-01", warranty: "2025-02-10", status: "Funcțional", notes: "Discuri schimbate la 1.200 kg." },
      { id: "e3", name: "Râșniță decaf", brand: "Eureka Mignon Specialita", serial: "EU-000000", bought: "2024-03-02", supplier: "Distribuitor (exemplu)", lastService: "2026-03-02", nextService: "2027-03-02", warranty: "2026-03-02", status: "Funcțional", notes: "" },
      { id: "e4", name: "Râșniță filtru", brand: "Mahlkönig EK43", serial: "EK-000000", bought: "2023-02-10", supplier: "Service espressor (exemplu)", lastService: "2026-02-20", nextService: "2026-11-05", warranty: "2025-02-10", status: "Funcțional", notes: "" },
      { id: "e5", name: "Batch brewer", brand: "Moccamaster KBG", serial: "MC-000000", bought: "2024-09-01", supplier: "Distribuitor (exemplu)", lastService: "2026-05-15", nextService: "2026-11-15", warranty: "2029-09-01", status: "Funcțional", notes: "Decalcifiere lunară." },
      { id: "e6", name: "Sistem filtrare apă", brand: "BWT bestmax PREMIUM M", serial: "BW-000000", bought: "2023-02-10", supplier: "Filtre apă (exemplu)", lastService: "2026-04-01", nextService: "2026-10-01", warranty: "", status: "De verificat", notes: "Cartușul se schimbă la 6 luni sau la 2.400 l." },
      { id: "e7", name: "Frigider sub-blat bar", brand: "Liebherr", serial: "LB-000000", bought: "2023-02-10", supplier: "", lastService: "", nextService: "", warranty: "2025-02-10", status: "Funcțional", notes: "" },
      { id: "e8", name: "Mașină de spălat vase", brand: "Winterhalter UC-M", serial: "WH-000000", bought: "2023-02-10", supplier: "Service HoReCa (exemplu)", lastService: "2026-07-20", nextService: "2027-01-20", warranty: "2025-02-10", status: "Funcțional", notes: "" },
      { id: "e9", name: "Vitrină patiserie refrigerată", brand: "—", serial: "", bought: "2023-02-10", supplier: "Service HoReCa (exemplu)", lastService: "2026-01-10", nextService: "2027-01-10", warranty: "", status: "Funcțional", notes: "" },
      { id: "e10", name: "POS + imprimantă bonuri", brand: "—", serial: "", bought: "2023-02-10", supplier: "Furnizor POS (exemplu)", lastService: "", nextService: "", warranty: "", status: "Funcțional", notes: "Abonament lunar inclus în P&L." }
    ]
  };

  var contacts = {
    items: [
      { id: "ct1", name: "The Underdog", category: "Prăjitorie parteneră", person: "", phone: "", email: "", web: "https://www.underdog.gr", notes: "Prăjitorie de specialitate din Atena, din 2015. Ofertă și prețuri wholesale prin formularul: https://www.underdog.gr/contact/" },
      { id: "ct2", name: "Ferma de lapte (exemplu)", category: "Furnizor lapte", person: "Nume Prenume", phone: "0700 000 002", email: "", notes: "Livrare zilnică 07:00." },
      { id: "ct3", name: "Distribuitor lapte vegetal (exemplu)", category: "Furnizor lapte", person: "", phone: "0700 000 003", email: "office@exemplu.ro", notes: "Ovăz barista, migdale, soia." },
      { id: "ct4", name: "Patiseria (exemplu)", category: "Furnizor food", person: "Nume Prenume", phone: "0700 000 004", email: "", notes: "Comandă cu o zi înainte până la 16:00." },
      { id: "ct5", name: "Service espressor (exemplu)", category: "Service", person: "Tehnician", phone: "0700 000 005", email: "service@exemplu.ro", notes: "Urgențe: răspuns în 24 h." },
      { id: "ct6", name: "Filtre apă (exemplu)", category: "Service", person: "", phone: "0700 000 006", email: "", notes: "" },
      { id: "ct7", name: "Cabinet contabilitate (exemplu)", category: "Contabilitate & juridic", person: "Contabil", phone: "0700 000 007", email: "contabil@exemplu.ro", notes: "Documentele lunii până pe 5." },
      { id: "ct8", name: "Around The Corner", category: "Consultanță", person: "Arthur", phone: "", email: "", notes: "Training, standarde, evaluări, P&L." },
      { id: "ct9", name: "Proprietar spațiu (exemplu)", category: "Spațiu", person: "", phone: "0700 000 009", email: "", notes: "Chiria se plătește până pe 10." },
      { id: "ct10", name: "Electrician (exemplu)", category: "Service", person: "", phone: "0700 000 010", email: "", notes: "" }
    ]
  };

  var actions = {
    items: [
      { id: "a1", title: "Licență web Heading Pro", desc: "Licența comercială desktop + web pe numele Mokum, înainte de primul material tipărit.", area: "Brand", owner: "ATC", due: "2026-10-31", status: "doing", priority: true },
      { id: "a2", title: "Pahar The Rise 8 / 12 oz", desc: "Dieline final la furnizor, print flexo într-o singură culoare.", area: "Brand", owner: "Owner", due: "2026-11-10", status: "review", priority: false },
      { id: "a3", title: "Pungă 250 g: migrare la Heading Pro", desc: "Dieline-ul v1 folosește încă Montserrat și Fraunces; se migrează la următorul tiraj.", area: "Brand", owner: "ATC", due: "2026-11-20", status: "todo", priority: false },
      { id: "a4", title: "Tasting cards Mokum × The Underdog", desc: "85 × 135 mm, carton negru 350 gsm; câte un card la fiecare lot nou.", area: "Bar", owner: "Head barista", due: "2026-11-05", status: "doing", priority: false },
      { id: "a5", title: "Meniu v2 la tipar", desc: "A4 landscape, Nisip, fără fotografii; categoria Breakthrough verificată.", area: "Sală", owner: "Manager", due: "2026-10-28", status: "review", priority: false },
      { id: "a6", title: "Training: ospitalitate firească", desc: "Sesiune cu toată echipa pe principii și tonul vocii din brandbook.", area: "Oameni", owner: "ATC", due: "2026-11-12", status: "todo", priority: true },
      { id: "a7", title: "Service espressor depășit", desc: "Programare la service; schimb garnituri grup.", area: "Operațiuni", owner: "Head barista", due: "2026-10-20", status: "todo", priority: false },
      { id: "a8", title: "Evaluări trimestriale Q4", desc: "Punctaje pe criteriile ATC pentru toți bariștii.", area: "Oameni", owner: "Manager", due: "2026-12-15", status: "todo", priority: false },
      { id: "a9", title: "Sesiune foto: lumină naturală", desc: "Produs, bariști, spațiu. Fără stocuri, fără filtre.", area: "Brand", owner: "Owner", due: "2026-11-25", status: "todo", priority: false },
      { id: "a10", title: "Buget 2027 și ținte P&L", desc: "Prime cost ≤ 58%, EBITDA ≥ 15%.", area: "Financiar", owner: "Owner", due: "2026-12-05", status: "doing", priority: false },
      { id: "a11", title: "Profil Google actualizat", desc: "Program, meniu, fotografii reale.", area: "Sală", owner: "Manager", due: "2026-10-15", status: "done", priority: false },
      { id: "a12", title: "Brandbook v2.0 aprobat", desc: "Identitate, caracter și sistem vizual.", area: "Brand", owner: "ATC", due: "2026-10-01", status: "done", priority: false }
    ]
  };

  return {
    actions: actions,
    pl: pl, kpi: kpi, team: team, courses: courses, org: org, raci: raci, jobs: jobs,
    playbook: playbook, hospitality: hospitality, cjm: cjm, equipment: equipment, contacts: contacts
  };
};
