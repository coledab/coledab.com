# coledab.com — build rules

The project root **is** the deployable site. Downloading the project from Share
must produce a folder that deploys to Cloudflare with no post-processing.

## Layout

| File | Role |
|---|---|
| `index.html` / `about.html` / `contact.html` | the site's pages — plain HTML, edited directly |
| `filmed-in-map.html` | map iframe |
| `support.js`, `image-slot.js` | runtime, must ship |
| `assets/` | covers, about photos, `logos/seen`, `logos/label` |
| `wrangler.toml` | Cloudflare config, must stay at root |

There are **no `.dc.html` files in this project** — deliberately. The pages are
self-contained HTML (markup + `support.js` + an inline `<script type="text/x-dc"
data-dc-script>` logic class) and are edited in place with `str_replace_edit` /
`write_file`. Do not reintroduce `.dc.html` sources or twin copies; a single file
per page is the whole point.

## Rules — apply on EVERY change, without being asked

1. **Edit the `.html` pages directly.** No duplicate sources, no twins to sync.

2. **Inter-page links use the bare page names** — `index.html`, `about.html`,
   `contact.html`.

3. **`wrangler.toml` at the root**, exactly:

   ```toml
   name = "coledab-website"
   compatibility_date = "2026-08-20"

   [assets]
   directory = "."
   ```

4. **No spaces or special characters in any filename or path** — no `&`, `%`,
   `#`, `(`, `)`, `,`, `=`, or accented letters. Hyphens or underscores only.
   This applies to new assets too: when processing an upload, write the output
   to a clean name under `assets/`.

5. **Nothing stays in `uploads/`.** User-supplied files get processed into
   clean-named copies under `assets/`, and the uploads are deleted in the same
   turn so they never reach the deploy root.

6. **No scratch files at the root** — no contact sheets, screenshots, or
   temporary output. Delete them in the same turn they're created.
