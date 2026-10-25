/*
 * Conexiunea la baza de date (Supabase).
 *
 * Dacă valorile sunt `null`, portalul funcționează doar în modul demo
 * (date exemplu, salvate în browser). După crearea proiectului Supabase,
 * completează URL-ul și cheia publică (anon / publishable) din
 * Project Settings → API. Cheia publică poate sta în repo: accesul la date
 * e protejat de politicile RLS din supabase/migrations.
 */
window.MOKUM_CONFIG = {
  supabaseUrl: "https://szldocedzoituueqlwaj.supabase.co",
  supabaseKey: "sb_publishable_O3BF4IJ8y7ZdtUL8vf4FBA_IDWTFx1X"
};
