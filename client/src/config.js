// `server/` never serves `client/build/` (no `express.static` wiring in
// server/index.js) - the client's production build only exists to be
// hosted statically, with no live Express/MongoDB API alongside it (see the
// GitHub Pages deploy documented in the README). `npm start` (development)
// always talks to a real backend through the CRA dev proxy in
// package.json, and CRA sets NODE_ENV accordingly, so it doubles as an
// honest, zero-config signal for "is there a backend to call?" without any
// runtime network probing or extra build flags to remember.
//
// This only changes what visitors are steered toward (CTA targets, an
// informational banner) - it never touches the real axios/API code paths,
// which behave identically in every environment.
export const IS_STATIC_BUILD = process.env.NODE_ENV === 'production';

// The GitHub Pages project-site path this static build is deployed under
// (https://vanshika1302.github.io/mediclick/). react-router needs this as
// an explicit Router `basename` - without it, every navigation (redirects,
// <Link>) resolves against the site root and drops the "/mediclick"
// prefix, which breaks both in-app navigation (URLs silently lose the
// prefix) and a hard/direct load of a sub-route served via the
// docs/404.html fallback (nothing matches, so it falls through to the
// "not logged in" redirect instead of the requested route).
//
// `process.env.PUBLIC_URL` can't be reused for this: `homepage: "."` in
// package.json makes it resolve to "." (a relative token, deliberately
// subpath-agnostic so built asset URLs stay portable) rather than an
// absolute path react-router can use as a basename. In local development
// the app is always served from "/", so no basename is needed there.
export const ROUTER_BASENAME = IS_STATIC_BUILD ? '/mediclick' : undefined;
