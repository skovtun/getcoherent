---
description: Add a new page to the prototype via Coherent CLI (requires ANTHROPIC_API_KEY)
argument-hint: [page-description]
allowed-tools: Bash(coherent chat *)
---
Run `coherent chat "add $ARGUMENTS"` in the project root.
This ensures the page goes through the full Coherent pipeline:
shared component reuse, validation, manifest update.

Note: this command calls the Anthropic API directly via `coherent chat` and
requires an API key. If you want to use your Claude Code subscription instead,
use `/coherent-chat` — same pipeline, but the generation happens in your
current Claude session.
