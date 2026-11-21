# Portfolio hosting

The same React components, styles and content power both deployments.

- On a Node-compatible host, `npm run build` builds the Next.js app. Its `/api/send-mail` route sends through Nodemailer using server-side `EMAIL_USER`, `EMAIL_PASS`, and optionally `EMAIL_TO`. Set `NEXT_PUBLIC_SITE_URL` to the deployment's public origin.
- ChatGPT Sites renders the same inline form. Its Worker checks the existing Netlify Nodemailer endpoint with an empty validation request before forwarding a message. If that check fails before any visitor data is sent, the browser submits the JSON body directly to the same endpoint while staying on the portfolio. The legacy endpoint does not expose a cross-origin delivery receipt, so this path retains the draft and displays “Submission requested.” A failed or ambiguous attempt to send a real message is never automatically replayed.

The downloadable source is archived from the same commit as the Sites release. Update the shared source before building either target.
