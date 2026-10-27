/*
 * Structurile de pornire ale portalului: liniile P&L, definițiile KPI,
 * criteriile de evaluare, RACI și fișele posturilor pe rolurile Mokum,
 * etapele Customer Journey. Direcția de ospitalitate și capitolul
 * „Cine suntem” sunt preluate din Mokum Brandbook v2.0.
 * Fără cifre și fără date personale: acestea stau doar în baza de date.
 */
window.MOKUM_TEMPLATES = {
  "plLines": [
    {
      "id": "r1",
      "group": "rev",
      "name": "Cafea & băuturi",
      "labor": false
    },
    {
      "id": "r2",
      "group": "rev",
      "name": "Patiserie & food",
      "labor": false
    },
    {
      "id": "r3",
      "group": "rev",
      "name": "Retail (boabe, accesorii)",
      "labor": false
    },
    {
      "id": "r4",
      "group": "rev",
      "name": "Evenimente & altele",
      "labor": false
    },
    {
      "id": "c1",
      "group": "cogs",
      "name": "Cafea boabe",
      "labor": false
    },
    {
      "id": "c2",
      "group": "cogs",
      "name": "Lapte & alternative vegetale",
      "labor": false
    },
    {
      "id": "c3",
      "group": "cogs",
      "name": "Patiserie & food (achiziție)",
      "labor": false
    },
    {
      "id": "c4",
      "group": "cogs",
      "name": "Marfă retail",
      "labor": false
    },
    {
      "id": "c5",
      "group": "cogs",
      "name": "Ambalaje & consumabile",
      "labor": false
    },
    {
      "id": "o1",
      "group": "opex",
      "name": "Salarii & contribuții",
      "labor": true
    },
    {
      "id": "o2",
      "group": "opex",
      "name": "Chirie",
      "labor": false
    },
    {
      "id": "o3",
      "group": "opex",
      "name": "Utilități",
      "labor": false
    },
    {
      "id": "o4",
      "group": "opex",
      "name": "Marketing & social media",
      "labor": false
    },
    {
      "id": "o5",
      "group": "opex",
      "name": "POS, software & abonamente",
      "labor": false
    },
    {
      "id": "o6",
      "group": "opex",
      "name": "Mentenanță & service",
      "labor": false
    },
    {
      "id": "o7",
      "group": "opex",
      "name": "Contabilitate & juridic",
      "labor": false
    },
    {
      "id": "o8",
      "group": "opex",
      "name": "Consultanță Around The Corner",
      "labor": false
    },
    {
      "id": "o9",
      "group": "opex",
      "name": "Comisioane card & livrare",
      "labor": false
    },
    {
      "id": "o10",
      "group": "opex",
      "name": "Alte cheltuieli",
      "labor": false
    },
    {
      "id": "d1",
      "group": "below",
      "name": "Amortizare",
      "labor": false
    },
    {
      "id": "d2",
      "group": "below",
      "name": "Impozit & dobânzi",
      "labor": false
    }
  ],
  "plTargets": {
    "cogsPct": 30,
    "laborPct": 28,
    "primePct": 58,
    "ebitdaPct": 15
  },
  "kpi": [
    {
      "id": "k1",
      "name": "Bon mediu",
      "unit": "RON",
      "target": 32,
      "better": "up",
      "owner": "Manager",
      "auto": ""
    },
    {
      "id": "k2",
      "name": "Bonuri pe zi",
      "unit": "buc",
      "target": 140,
      "better": "up",
      "owner": "Manager",
      "auto": ""
    },
    {
      "id": "k3",
      "name": "Vânzări pe oră de muncă",
      "unit": "RON",
      "target": 210,
      "better": "up",
      "owner": "Manager",
      "auto": ""
    },
    {
      "id": "k4",
      "name": "Cost marfă (COGS %)",
      "unit": "%",
      "target": 30,
      "better": "down",
      "owner": "Manager",
      "auto": "cogsPct"
    },
    {
      "id": "k5",
      "name": "Cost personal (%)",
      "unit": "%",
      "target": 28,
      "better": "down",
      "owner": "Owner",
      "auto": "laborPct"
    },
    {
      "id": "k6",
      "name": "Prime cost (%)",
      "unit": "%",
      "target": 58,
      "better": "down",
      "owner": "Owner",
      "auto": "primePct"
    },
    {
      "id": "k7",
      "name": "EBITDA (%)",
      "unit": "%",
      "target": 15,
      "better": "up",
      "owner": "Owner",
      "auto": "ebitdaPct"
    },
    {
      "id": "k8",
      "name": "Rată upsell patiserie",
      "unit": "%",
      "target": 25,
      "better": "up",
      "owner": "Head barista",
      "auto": ""
    },
    {
      "id": "k9",
      "name": "Rating Google",
      "unit": "★",
      "target": 4.8,
      "better": "up",
      "owner": "Manager",
      "auto": ""
    },
    {
      "id": "k10",
      "name": "Timp mediu de servire",
      "unit": "min",
      "target": 4,
      "better": "down",
      "owner": "Head barista",
      "auto": ""
    },
    {
      "id": "k11",
      "name": "Pierderi (waste) din COGS",
      "unit": "%",
      "target": 3,
      "better": "down",
      "owner": "Head barista",
      "auto": ""
    },
    {
      "id": "k12",
      "name": "Clienți care revin",
      "unit": "%",
      "target": 40,
      "better": "up",
      "owner": "Manager",
      "auto": ""
    },
    {
      "id": "k13",
      "name": "Calibrări zilnice efectuate",
      "unit": "%",
      "target": 100,
      "better": "up",
      "owner": "Head barista",
      "auto": ""
    }
  ],
  "criteria": [
    {
      "id": "c1",
      "name": "Espresso & calibrare",
      "weight": 20,
      "desc": "Rețeta respectată, calibrare la deschidere și la fiecare schimbare, gust verificat."
    },
    {
      "id": "c2",
      "name": "Lapte & latte art",
      "weight": 15,
      "desc": "Textură constantă, temperatură corectă, desen curat pe toate dimensiunile."
    },
    {
      "id": "c3",
      "name": "Ospitalitate",
      "weight": 20,
      "desc": "Salut în primele 10 secunde, contact vizual, recomandare personalizată, ritualul Mokum."
    },
    {
      "id": "c4",
      "name": "Viteză & flux la bar",
      "weight": 15,
      "desc": "Workflow ordonat, comenzile ies în ordine, sub 4 minute în vârf."
    },
    {
      "id": "c5",
      "name": "Curățenie & HACCP",
      "weight": 10,
      "desc": "Stația curată în orice moment, checklist-uri completate, temperaturi notate."
    },
    {
      "id": "c6",
      "name": "Produs & upsell",
      "weight": 10,
      "desc": "Cunoaște originile, notele de gust și recomandă pairing-uri."
    },
    {
      "id": "c7",
      "name": "Atitudine & echipă",
      "weight": 10,
      "desc": "Punctualitate, ajută colegii, primește feedback."
    }
  ],
  "raci": {
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
  },
  "jobs": {
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
  },
  "hospitality": [
    {
      "id": "h1",
      "title": "Misiune și promisiune",
      "body": "### Misiune\n**Master the basics. Raise the level.**\n\nUn espresso bine extras este o afirmație pe care oaspetele trebuie să o creadă pe cuvânt. Munca noastră este să o demonstrăm: prin metodă, prin oameni, prin spațiu și prin felul în care primim.\n\n### Promisiune\n> Oricine intră la Mokum pleacă știind ceva ce nu știa la intrare: despre cafea sau despre cum se simte să fii bine primit."
    },
    {
      "id": "h2",
      "title": "Cine este Mokum",
      "body": "Arhetipurile sunt busola care decide ton, vizual, limbaj și comportament pe toate canalele, în această ordine.\n\n### 1. Expertul (primar)\n„Cunoașterea este formă. Tehnica este respectul.” Cea mai veche cafenea de specialitate din oraș: capital de competență, nu nostalgie.\n- **Cum:** conținut care educă: origine, extracție, profil de gust. Niciodată „cel mai bun”, mereu „iată de ce”.\n\n### 2. Creatorul (secundar)\n„Forma contează la fel de mult ca fondul.” Audiența are ochi exersat.\n- **Cum:** documentarea deciziilor de design. Nu „am renovat”, ci „iată de ce am ales această finisare”.\n\n### 3. Omul Comunității (terțiar)\n„Locul unde te simți bine primit în mod firesc.”\n- **Cum:** recunoașterea oaspetelui fidel. Evenimente mici, recurente. Ospitalitate fără rezerve."
    },
    {
      "id": "h3",
      "title": "Principiile serviciului",
      "body": "1. **Demonstrăm, nu declarăm.** Orice afirmație este susținută de context sau proces. Fără superlative nefondate.\n2. **Forma contează cât fondul.** Un pahar, o etichetă, un caption se tratează cu aceeași seriozitate ca extracția.\n3. **Ospitalitate firească.** Calmă, atentă, fără efuziune. Oaspetele este recunoscut, nu procesat.\n4. **Timpul este un ingredient.** 16 ani de practică, un Nel Drip de 4 minute, o tăcere calibrată înainte de un anunț. Nu grăbim nimic din ce contează."
    },
    {
      "id": "h4",
      "title": "Cum vorbește Mokum",
      "body": "Tonul derivă direct din arhetipuri. Nu există un ton „de marketing” separat de cum vorbesc oamenii din bar.\n\n- **Calm, precis:** „Cafeaua asta vine din Etiopia, procesată natural. O să simți echilibru în ceașcă.” Niciodată: „Cea mai bună cafea din oraș!”\n- **Informat, fără aroganță:** „Am schimbat sitele din portafiltre pentru extracții mai precise și mai curate.” Niciodată: „Noi știm cel mai bine.”\n- **Cald, fără efuziune:** „Ne bucurăm că ești din nou pe la noi.” Niciodată: „Familia Mokum te iubește!”\n- **Direct, fără umpluturi:** „Deschidem la 8. Noul bar, luna viitoare.” Niciodată: „Suntem încântați să anunțăm că în curând…”\n\n### Reguli\n- Propoziții scurte. Mokum nu explică, arată.\n- Fără superlative.\n- Același ton peste tot: postare, DM, meniu, conversația de la bar.\n- Fără emoji în titluri."
    },
    {
      "id": "h5",
      "title": "Ce păstrăm, ce actualizăm",
      "body": "**Mokum nu se reinventează. Se actualizează.** Orice mesaj care sugerează că „totul era greșit înainte” este greșit.\n\n### Ce păstrăm\n- Numele și locul\n- Comunitatea existentă\n- Calitatea reală ca singur argument\n- Paleta de culori\n\n### Ce actualizăm\n- Logo-ul, tipografia, spațiul, barul, metoda\n- Felul în care comunicăm\n\n### Ce nu facem niciodată\n- Hype, superlative, exces\n- Nostalgie ca argument\n- Comunicare „de marketing” separată de cum vorbesc oamenii din bar"
    }
  ],
  "playbook": [
    {
      "id": "p1",
      "title": "Cine suntem",
      "body": "Mokum a fost fondată în 2010, pe strada Eugeniu de Savoia, în Piața Unirii. A fost prima cafenea de specialitate din Timișoara și printre primele din România care a introdus cafeaua to-go ca un concept, nu ca un compromis.\n\nComunitatea formată în jurul ei, preponderent arhitecți și designeri, este o audiență cu ochi exersat, care evaluează înainte să consume. Nu trebuie construită de la zero: trebuie reactivată și onorată.\n\n> Master the basics. Raise the level.\n\nDetaliile despre ton și serviciu sunt în **Direcția de ospitalitate**."
    }
  ],
  "cjmStages": [
    {
      "id": "s1",
      "name": "Descoperire",
      "emotion": 0
    },
    {
      "id": "s2",
      "name": "Sosire",
      "emotion": 0
    },
    {
      "id": "s3",
      "name": "Comandă",
      "emotion": 0
    },
    {
      "id": "s4",
      "name": "Așteptare",
      "emotion": 0
    },
    {
      "id": "s5",
      "name": "Servire",
      "emotion": 0
    },
    {
      "id": "s6",
      "name": "La masă",
      "emotion": 0
    },
    {
      "id": "s7",
      "name": "Plecare",
      "emotion": 0
    },
    {
      "id": "s8",
      "name": "Revenire",
      "emotion": 0
    }
  ],
  "cjmRows": [
    {
      "id": "r1",
      "name": "Ce face clientul"
    },
    {
      "id": "r2",
      "name": "Touchpoints"
    },
    {
      "id": "r3",
      "name": "Ce simte / gândește"
    },
    {
      "id": "r4",
      "name": "Puncte de durere"
    },
    {
      "id": "r5",
      "name": "Standard Mokum / oportunitate"
    },
    {
      "id": "r6",
      "name": "Responsabil"
    }
  ]
};
