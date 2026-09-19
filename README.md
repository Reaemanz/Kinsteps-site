# kinsteps.app

The public site for Kin: a landing page, the privacy policy Google Play requires, a page for
anyone who opens a pairing invite without the app, and the file that makes pairing links
open the app instead of a browser.

Publish this directory — not the repository it lives in, which also holds internal docs.

## What each file is for

| File | Why it exists |
|---|---|
| `.well-known/assetlinks.json` | Android App Links verification. Must be served at `https://kinsteps.app/.well-known/assetlinks.json`, over https, **with no redirect**, as `application/json`. |
| `.nojekyll` | Without it GitHub Pages runs Jekyll, which strips directories beginning with a dot — `.well-known` would silently never publish. |
| `CNAME` | Binds the Pages site to the apex domain. |
| `404.html` | A static host has no file at `/pair/<code>`, so that path lands here. It carries the pairing page and reads the code out of the URL. |
| `pair/index.html` | The same page for a bare `/pair/` with no code. |

## Keeping assetlinks.json correct

It currently lists one SHA-256 fingerprint, the **debug** signing key, which is enough to
test verification. Before release it must also list the **release** key and the **Play App
Signing** key, or a tapped link opens a browser for every real user. The procedure, and how
to check verification from a device, is in `docs/app_links.md` in the app repository.

## Deploying

GitHub Pages: push this directory to the root of a public repo, then Settings → Pages →
source `main` / root, custom domain `kinsteps.app`, and tick Enforce HTTPS once the
certificate is issued. DNS is four `A` records on `@` pointing at GitHub Pages, plus a
`CNAME` on `www`. There must be no URL-redirect record left on the apex.

`privacy@kinsteps.app` appears in the privacy policy and must actually receive mail — a free
Namecheap Email Redirect to a real inbox is enough.
