# Mokum × Around The Corner: portalul owner-ului

Locul din care owner-ul Mokum conduce cafeneaua și în care se regăsește toată
munca Around The Corner (ATC) pentru rebranding.

| Grup | Secțiuni |
| --- | --- |
| Conducere | Panou (rezumat), Plan de acțiune (board), P&L lunar cu marje, prime cost și EBITDA, KPI-uri cu ținte |
| Oameni | Echipa & punctajul overall al fiecărui barista, Organigramă, RACI, Fișele posturilor |
| Experiența Mokum | Direcția de ospitalitate, Customer Journey Map, Playbook |
| Academia ATC | Cursurile ATC și cine le-a absolvit |
| Operațiuni | Echipamente (cu service programat), Contacte |

Totul se poate edita din pagină: activezi comutatorul **Editare** și modificările
se salvează automat. În **Setări & backup** ai export/import JSON.

## Calcule

- **P&L**: venituri − COGS = marjă brută; − cheltuieli operaționale = EBITDA;
  − amortizare/impozite = profit net. Liniile de opex bifate „personal” intră în
  costul de personal și în **prime cost** = (COGS + personal) / venituri.
- **KPI-uri**: verde dacă ținta e atinsă, galben în limita a 5%, roșu peste.
  KPI-urile „din P&L” (COGS %, personal %, prime cost %, EBITDA %) se calculează
  singure din luna respectivă.
- **Punctaj barista**: note 1–5 pe criterii ponderate →
  `Σ(notă × pondere) / Σ(5 × pondere) × 100`. ≥ 85 excelent, ≥ 70 solid,
  ≥ 55 în dezvoltare, sub 55 necesită plan.

## Moduri de funcționare

1. **Demo**: fără bază de date; date exemplu fictive, salvate doar în browser.
2. **Online (Supabase)**: login cu email + parolă; datele stau în tabela
   `portal_docs` (un rând JSON per secțiune), protejate prin RLS. Doar emailurile
   din `portal_members` au acces. Fiecare salvare se păstrează și în
   `portal_history`, ca să putem reveni la o versiune anterioară.

Repo-ul poate fi public: în cod nu există date reale. Cheia Supabase din
`assets/config.js` este cea publică (anon), iar accesul e impus de politicile RLS.

## Configurarea Supabase

1. Rulează în ordine `supabase/migrations/0001_portal.sql` și `0002_actions.sql`.
2. **Authentication → Providers → Email**: activ; **Sign-ups**: dezactivat
   (conturile se creează doar din dashboard, prin *Invite user*).
3. **Authentication → URL Configuration**: Site URL = adresa portalului.
4. Dă acces din SQL Editor:
   ```sql
   insert into public.portal_members (email, role, name)
   values ('email-owner@…', 'owner', 'Owner Mokum');
   ```
5. Completează `supabaseUrl` și `supabaseKey` în `assets/config.js`.

## Rulare locală

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Publicare: GitHub Pages (Settings → Pages → branch-ul dorit, root).

## Branding

Urmează Mokum Brandbook v2.0: paleta (Espresso, Cacao, Prăjire, Caramel, Nisip,
Cărbune, Alb) cu Nisip dominant și Caramel doar ca accent, logo-ul vectorial
original (`assets/mokum-logo.svg`, extras din brandbook, nemodificat) și
lockup-ul de co-branding Mokum × Around The Corner (Mokum primul, „×”,
partenerul la înălțimea x, spațiu 1x).

**Tipografie:** Heading Pro Bold și Book. Fișierele cu licență web se pun în
`assets/fonts/` (`HeadingPro-Bold.woff2`, `HeadingPro-Book.woff2`) și se
activează blocul `@font-face` din `assets/style.css`. Până atunci portalul
folosește Arial, substitutul de sistem prevăzut de brandbook. Versiunile
„Trial” nu se publică: licența lor permite doar uz personal, necomercial.
