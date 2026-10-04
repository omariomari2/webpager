# Static hosting

The landing page can run without Express. EJS is used only to assemble the partials
at build time; Webflow, jQuery, GSAP, and ScrollTrigger still run in the browser.

```sh
npm ci
npm test
npm run build
```

Publish the **contents of `docs/`**: `index.html`, `inline/`, `external/`, and
`.nojekyll`. This works at a domain root or a GitHub Pages project URL such as
`https://omariomari2.github.io/webpager/`. Preview through a local HTTP server,
not by double-clicking the HTML file: the page includes protocol-relative services
and Lottie resources fetched over HTTP.

For GitHub Pages, open **Settings → Pages**, select **Deploy from a branch**,
then choose **main** and **/docs**. The generated HTML and assets are committed,
so no build workflow is required.

For a Render **Static Site**, use `npm ci && npm run build` as the build command
and `docs` as the publish directory. The existing `npm start` EJS server remains
available. Changing hosting does not happen automatically when you run the build.

## Animation preservation

- The export renders the original template and preserves Webflow page/site IDs,
  `data-w-id` attributes, scroll-toggle markup, inline initial styles, and script order.
- Root-relative local asset URLs become relative so they resolve under `/webpager/`.
- The copied jQuery file is checked against its existing SHA-256 integrity value.
  Windows CRLF line endings are normalized only when that restores the pinned hash.
  Other mismatches fail the build rather than silently disabling integrity checks.
- Images, fonts, Lottie JSON, analytics, and the chat widget retain their current
  external hosts. This is a static export, not an offline bundle.

Keep editing `views/` and `public/`, then rebuild and commit the updated `docs/`
alongside the source changes. No runtime template engine or Node server is needed
on the static host.
