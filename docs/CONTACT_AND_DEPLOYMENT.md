# Contact and deployment

This document covers the source project's contact form, environment variables, production build, hosting setup, and preserved owner-authentication integration. The project is a Next.js application with a Node.js mail API. Deployment is a separate step; no Netlify or Vercel deployment was performed as part of this source handoff.

## 1. Run the source locally

Use Node.js 22 or a newer compatible release; `package.json` requires Node `>=22.0.0`. Run these commands from the directory containing `package.json` and `package-lock.json`:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

On Windows, copy `.env.example` to `.env.local` using your file manager or the equivalent shell command. Open the address printed by Next.js, normally `http://localhost:3000`.

You can browse the portfolio with the SMTP values left blank. A valid contact submission will then return an honest unavailable state with a direct-email link. It will not pretend that an email was sent.

For a local production check:

```bash
npm run check
npm run build
npm start
```

`npm run check` runs TypeScript, ESLint, and the automated tests. `npm start` serves a completed production build; run `npm run build` again after changing source files or build-time environment variables. Stop the development server first if it is using the same port.

## 2. Environment variables

Configure local values in `.env.local`. Configure hosted values in the deployment provider's project environment settings. Keep mail credentials server-side; the only public variable below is `NEXT_PUBLIC_SITE_URL`.

| Variable               | Purpose                                                                                                                                    | When required                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | The site's complete public origin, for example `https://your-domain.example`. Used by metadata, canonical links, robots, and sitemap code. | Set before the production build.                                           |
| `EMAIL_USER`           | The authenticated SMTP account and outgoing `From` address.                                                                                | Required to send contact mail.                                             |
| `EMAIL_PASS`           | The account's app password or SMTP credential, according to the mail provider.                                                             | Required to send contact mail.                                             |
| `EMAIL_TO`             | The fixed recipient of contact inquiries. Visitors cannot override it.                                                                     | Optional; defaults to `EMAIL_USER`.               |
| `SMTP_HOST`            | Hostname of a custom SMTP service.                                                                                                         | Optional; an empty value selects the existing Gmail service configuration. |
| `SMTP_PORT`            | Custom SMTP port. The code defaults to `587`.                                                                                              | Use the port specified by a custom SMTP provider.                          |
| `SMTP_SECURE`          | Set to `true` for an immediate TLS connection, or `false` otherwise.                                                                       | Match the provider's configuration; set `true` when using port `465`.      |
| `BACKEND_URL`          | Base URL of the preserved, optional legacy owner-authentication API.                                                                       | Not needed for the public portfolio or contact form.                       |

The site-origin helper accepts an HTTP or HTTPS URL and uses its origin, discarding any path. A missing, malformed, or unsupported URL falls back to `https://zayed-portfolio-app.netlify.app`. Set `NEXT_PUBLIC_SITE_URL` explicitly when moving domains, then rebuild so the new canonical origin and sitemap are included.

### Existing Gmail configuration

Leave `SMTP_HOST` empty and supply the authenticated account and its provider-approved mail credential:

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-domain.example
EMAIL_USER=your-sending-address@example.com
EMAIL_PASS=replace-with-your-mail-credential
EMAIL_TO=your-inquiry-address@example.com
SMTP_HOST=
```

The addresses and password above are placeholders. Obtain the actual SMTP credential from your mail provider; this project does not create or recover credentials.

### Another SMTP provider

Use the hostname, port, and authentication details supplied by that provider. For a provider configured to use port `587`:

```dotenv
EMAIL_USER=your-sending-address@example.com
EMAIL_PASS=replace-with-your-smtp-credential
EMAIL_TO=your-inquiry-address@example.com
SMTP_HOST=smtp.your-provider.example
SMTP_PORT=587
SMTP_SECURE=false
```

For an immediate TLS connection on port `465`, set both `SMTP_PORT=465` and `SMTP_SECURE=true`. If `SMTP_SECURE` is omitted entirely, the route infers `true` only for port `465`; an explicit `false` in the environment overrides that inference.

The outgoing message uses `EMAIL_USER` as its authenticated sender. The visitor's name and email are placed in `Reply-To`, so replying to an inquiry goes to the visitor without impersonating their email address as the sender.

## 3. Contact form behavior

The form in `src/components/portfolio/ContactSection.tsx` posts JSON to `POST /api/send-mail`. Shared validation and email formatting live in `src/lib/contact.ts`; SMTP delivery lives in `src/app/api/send-mail/route.ts`.

| Outcome                                                             | HTTP status               | Visible behavior                                                    |
| ------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------- |
| SMTP accepts the message                                            | `200`                     | Shows the sent confirmation and clears the form.                    |
| Invalid JSON, invalid fields, unexpected fields, or filled honeypot | `400`                     | Shows validation feedback and retains the draft.                    |
| A browser marks the request as cross-site                           | `403`                     | Rejects the request and offers a direct-email alternative.          |
| Body exceeds 32,768 bytes                                           | `413`                     | Reports that the message is too large.                              |
| Content type is not JSON                                            | `415`                     | Rejects the request.                                                |
| Local rate limit is reached                                         | `429`                     | Asks the visitor to wait or use email; includes `Retry-After: 600`. |
| SMTP account/password missing or a configured port invalid          | `503`                     | Says the form is temporarily unavailable and offers direct email.   |
| SMTP throws an error or accepts no recipients                       | `502`                     | Reports failure, retains the draft, and offers direct email.        |
| Browser network failure or request timeout                          | No confirmed HTTP outcome | Keeps the draft and offers retry or direct email.                   |

Successful SMTP acceptance means the mail service accepted the message for delivery. It does not prove that the recipient's inbox has received it. A browser timeout also cannot establish whether a message reached the SMTP service.

The direct-email link reads the public email address from `src/content/profile.json`. Update that field when changing the contact address. If `EMAIL_TO` is configured separately, update it as well to keep the form's recipient and public contact details aligned.

### Validation and protections implemented

- Name: required after trimming, at most 100 characters, and no embedded header-control characters.
- Email: valid address, at most 254 characters.
- Message: 10–5,000 characters after trimming.
- Strict request shape: visitors cannot add recipients, attachments, or arbitrary SMTP options.
- A hidden field rejects simple automated submissions when filled.
- HTML content is escaped before it is inserted into the email, with a plain-text alternative included.
- SMTP credentials, server error details, and visitor message bodies are not returned in API errors.
- Connection and greeting timeouts are 8 seconds; socket timeout is 15 seconds. The browser aborts its wait after 22 seconds.

### Rate-limit scope

The route allows five validated, configured contact attempts per ten-minute window for each request key. It uses the first `x-forwarded-for` value, falls back to `x-real-ip`, and otherwise uses a shared `unavailable` key.

This is a bounded, in-memory safeguard for one running server instance, with at most 1,000 stored keys. It resets when the process restarts and is not shared across serverless instances. It is not a distributed rate limiter. Use trusted proxy headers and your hosting provider's abuse controls; if persistent cross-instance limiting becomes necessary, replace the in-memory store with a shared store rather than assuming this map covers every instance.

## 4. Mail tests and verification

Run all tests with:

```bash
npm test
```

Run just the contact tests with:

```bash
node --import tsx --test tests/contact.test.ts
```

Every route test calls `mailHarness` before invoking `POST`. The harness temporarily replaces mail environment values with blanks or test placeholders and intercepts `nodemailer.createTransport`. Its `sendMail` and `close` functions are mocks. The schema and email-formatting tests make no transport calls. These tests do not send mail or need real SMTP credentials.

Coverage includes malformed fields, header and HTML injection, the honeypot, recipient control, oversized requests, missing credentials, SMTP acceptance and rejection, safe errors, and request throttling. Live mailbox delivery has not been verified in this handoff; it requires your own configured mail service and an intentional test submission after deployment.

## 5. Deploy the source

Deploy the complete source with the committed lockfile and the hosting provider's Next.js integration. The `/api/send-mail` route needs a server runtime: a static HTML-only export or a drag-and-drop static upload cannot provide the current contact backend.

### Vercel

1. Put the source in your own Git repository, keeping `package.json` at the chosen project root.
2. Import that repository as a Next.js project.
3. Select a compatible Node.js runtime and use `npm ci` for a reproducible install and `npm run build` as the build command. Keep the Next.js framework's output handling rather than treating `.next` as a static folder.
4. Set `NEXT_PUBLIC_SITE_URL` to the final public origin. Add the server-side SMTP variables in the environment where the contact form should work.
5. Deploy the project through your account. Rebuild after changing the site origin or build-time configuration.
6. Open the deployed homepage, a project detail route, `/resume`, and the contact form. Check that image assets load and direct links resolve.

### Netlify

1. Import the source Git repository into a Netlify project using its Next.js integration.
2. Use the source directory containing `package.json` as the base directory. The build command is `npm run build`; the Next.js build output directory is `.next` when requested by the integration.
3. Configure a compatible Node.js runtime. Use the committed `package-lock.json` for installs and avoid adding `--legacy-peer-deps` to work around dependencies that the current source has already cleaned up.
4. Add `NEXT_PUBLIC_SITE_URL` and the SMTP variables to the project's applicable deployment environment.
5. Deploy using the Next.js integration so API routes are provisioned along with the pages. Do not publish the source ZIP as a static site.
6. Check the deployed pages and API behavior before replacing your existing portfolio domain.

The repository's `netlify.toml` controls settings that may override dashboard defaults. Keep its build command and Node version consistent with the chosen runtime and `package.json`. This guide describes the intended source deployment; it does not claim a hosted deployment has already been performed or that SMTP delivery has been tested on either platform.

### Files to include and exclude

Include source, `public`, documentation, package manifests, lockfile, and configuration. Keep credentials in local or provider environment settings. Do not put `.env.local`, actual SMTP credentials, `node_modules`, or generated `.next` build output into a source handoff or a public repository.

## 6. Images and configuration

`next.config.ts` intentionally restricts optimized portfolio images:

- Image files belong under `public/images/` and are referenced as `/images/...` in content JSON.
- Allowed local image paths match `/images/**` with no query string.
- Remote optimization patterns are empty; arbitrary external image URLs are not enabled.
- Allowed optimized image qualities are `75` and `90`; the configured output formats are AVIF and WebP.

When replacing a screenshot, keep the same local filename or update the corresponding `cover.src` in `src/content/projects.json`. Update its descriptive `alt` text at the same time. Rebuild after source asset changes. If you later choose a remote asset host, explicitly configure that host in `next.config.ts` instead of expecting the current local-only policy to accept it.

The same config enables React Strict Mode, removes the framework's powered-by response header, and sets `nosniff`, a strict-origin referrer policy, and a permissions policy that disables camera, microphone, and geolocation. The contact form does not require any of those device permissions.

## 7. Owner access and the original archive

The uploaded portfolio archive contained an owner-authentication service and dashboard layout, but no dashboard pages. It also contained a password-reset UI that displayed a success message without sending a reset request.

The current `/login` page is an honest owner-workspace status page. It does not collect credentials, promise a reset email, or redirect to a nonexistent dashboard. It is marked not to be indexed. The public portfolio does not require an account.

`src/Services/Login/index.ts` retains the legacy integration for future dashboard work. Its `Login` function validates credentials, posts to `<BACKEND_URL>/user/login`, uses a ten-second timeout, and stores a successful access token in an HttpOnly cookie. It keeps the legacy `NEXT_PUBLIC_BACKEND_URL` fallback for compatibility, but new server-side setup should use `BACKEND_URL`. Setting the URL alone does not recreate the missing dashboard or enable a login form.

The retained `UserInfo` function decodes display fields from a JWT and rejects expired or malformed data. Decoding is not signature verification and must not be used as an authorization gate. A future dashboard needs actual protected routes, backend authorization, and real password-reset endpoints before those flows are exposed again.

## 8. Practical troubleshooting

| Symptom                                       | Check                                                                                                                                                                 |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Form says it is temporarily unavailable       | Set `EMAIL_USER` and `EMAIL_PASS`; if using a custom host, verify that `SMTP_PORT` is an integer from 1 to 65,535.                                                    |
| Form reports delivery failure                 | Confirm the SMTP host, port, TLS setting, credentials, and permitted sender address with your provider. The UI intentionally does not expose internal SMTP responses. |
| Form says to wait                             | The per-instance five-attempt limit has been reached. Wait for the window to expire or use the direct-email link.                                                     |
| Form is not sending but the static page loads | Confirm you deployed with a Next.js server integration rather than a static-only export.                                                                              |
| New content is missing in production          | Confirm the deployed commit/source is the intended version and run a fresh build; `npm start` does not rebuild edited source.                                         |
| Canonical URLs still use the old domain       | Set `NEXT_PUBLIC_SITE_URL` before building and redeploy.                                                                                                              |
| An image fails after a URL change             | Keep it under `/images/` without a query string, or deliberately change the image policy and rebuild.                                                                 |
| `/login` does not show a sign-in form         | This is intentional: the original dashboard pages were absent from the archive. See the owner-access section above.                                                   |
