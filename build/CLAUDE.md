# coledab.com — build rules

## Export requirements (apply every single time this site is exported)

1. **Homepage must be named exactly `index.html`** (all lowercase). The current
   source file is `Cole Dabney Portfolio.dc.html` — it becomes `index.html` in
   the export, and every link that points at it must be rewritten to `index.html`
   (or `/`).

2. **Include `wrangler.toml` at the root of the export** with exactly this content:

   ```toml
   name = "coledab-website"
   compatibility_date = "2026-08-20"

   [assets]
   directory = "."
   ```

3. **No spaces or special characters in any exported filename or path.**
   No `&`, `%`, `#`, `(`, `)`, `,`, `=`, or accented letters — use hyphens or
   underscores. Rename files AND update every reference to them (this includes
   asset paths inside HTML/JS). Exported page names: `index.html`,
   `about.html`, `contact.html`, `filmed-in-map.html`.
   Nothing from `uploads/` ships — it holds source material with unsafe names.
