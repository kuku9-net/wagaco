export function languageTable(t){
  const lang = document.documentElement.lang
  return t[lang] || t["ja"];
}
