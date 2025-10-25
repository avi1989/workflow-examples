# bun-workflow-test

A demonstration of the [Workflow SDK](https://useworkflow.dev/) using Bun runtime. This project showcases how to build durable, long-running workflows with automatic retries and state persistence.

## Features

- **Durable Workflows**: Define multi-step workflows that can survive server restarts
- **Automatic Retries**: Built-in error handling and step-level retries
- **Type-Safe**: Full TypeScript support with type inference
- **Bun Runtime**: Fast execution using Bun's optimized JavaScript runtime
- **SWC Transform**: Custom plugin transforms workflow code at build time

## Project Structure

```
├── server.ts              # HTTP server with workflow endpoints
├── workflow-plugin.ts     # SWC plugin for transforming workflow code
├── workflow.config.json   # Workflow SDK configuration
└── workflows/
    └── user-signup.ts     # Example: User signup workflow
```

## Installation

Install dependencies:

```bash
bun install
```

## Usage

Start the development server:

```bash
bun run dev
```

The server will start on `http://localhost:3152`.

### Trigger a Workflow

Make a GET request to start the user signup workflow:

```bash
curl http://localhost:3152
```

This will return a response with the workflow run ID:

```json
{
  "message": "User signup workflow started",
  "runId": "..."
}
```

## How It Works

### Workflow Definition

Workflows are defined using the `"use workflow"` directive:

```typescript
export async function handleUserSignup(email: string) {
  "use workflow";

  const user = await createUser(email);
  await sendWelcomeEmail(user);
  await sendOnboardingEmail(user);

  return { userId: user.id, status: "onboarded" };
}
```

### Steps

Individual steps are marked with the `"use step"` directive:

```typescript
async function createUser(email: string) {
  "use step";

  return { id: crypto.randomUUID(), email };
}
```

### Workflow Endpoints

The server exposes two required endpoints:

- `POST /.well-known/workflow/v1/flow` - Execute workflow functions
- `POST /.well-known/workflow/v1/step` - Execute individual steps

## API Reference

### Starting a Workflow

```typescript
import { start } from "workflow/api";
import { handleUserSignup } from "./workflows/user-signup.js";

const run = await start(handleUserSignup, [email]);
console.log(run.runId);
```

### Workflow Utilities

- `sleep(duration)` - Pause execution (e.g., "5s", "1m", "1h")
- `FatalError` - Throw to permanently fail a workflow

## Built With

- [Bun](https://bun.sh) - Fast all-in-one JavaScript runtime
- [Workflow SDK](https://workflow.vercel.app/) - Durable execution framework
- [SWC](https://swc.rs/) - Fast TypeScript/JavaScript compiler

## Learn More

- [Workflow SDK Documentation](https://useworkflow.dev)
- [Bun Documentation](https://bun.sh/docs)
