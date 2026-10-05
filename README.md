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

## Product structure prototype

The workspace navigation sketches the main product concepts:

- **Workspace overview** summarizes projects and attention needed.
- **Projects** group related scripts, workflows, and runs. The current example project is a psychology YouTube channel.
- **Workflows** are reusable recipes made of ordered or independent steps. The YouTube production workflow is the first example.
- **Runs** are individual workflow executions with their own input, step status, progress, and run history.
- **Human Pings** collect decisions that block a step while independent work can continue.
- **Presets** hold reusable defaults such as voice, visual style, and export settings.

These screens still use sample data and in-memory state. The sample counts and the second project/run shown in the overview are illustrative, not backed by stored data. The next architectural decision is how to represent parallel steps and their dependencies in a workflow definition. Real execution will also need durable storage, a job queue and worker, retry/idempotency rules, provider integrations, and a notification channel.
