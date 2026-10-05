# HumanPing

HumanPing runs the predictable steps in a multi-stage workflow and asks for human judgment only when it is useful. This repository currently contains the first product prototype: a YouTube production run dashboard.

## Run locally

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

## Prototype interactions

- Choose a visual direction and approve the Human Ping. The run updates, progress recalculates, and the next step starts.
- Pause and resume the run.
- Edit the source script title inline.
- Open the preset library and review the example voice, visual, and export defaults.
- Resize to see the compact tablet and mobile layouts.

The run data and preset values in this prototype are in-memory examples. Real workflow execution still needs a durable run store, a job queue and worker, retry/idempotency rules, provider integrations, and a notification channel. The UI intentionally distinguishes running, waiting for a person, queued, and completed steps so those states can map cleanly to that backend.
