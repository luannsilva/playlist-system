# Official MUI MCP — manual installation guide

The skill attempts to connect the official MUI MCP automatically on bootstrap. If it fails (network, registry, offline environment), follow the steps here. It's not blocking — the fallback `references/mui-llms-index.md` covers common cases.

## What it is

MCP (Model Context Protocol) server maintained by the MUI team that exposes documentation as tools for LLMs. Allows Claude to query props, variants, and updated examples without relying on training or scraping.

## Step 1 — Check if already connected

In Cowork, run in chat:

```
search_mcp_registry(["mui", "material-ui"])
```

If `"connected": true` appears in the result, you're ready and the other steps aren't necessary.

## Step 2 — Connect via Cowork registry

```
suggest_connectors(uuids=[<uuid returned in step 1>])
```

This opens the connection card in chat. Click **Connect** and follow the browser flow.

## Step 3 — Manual installation (outside Cowork)

When the user is using Claude Code or another local MCP client:

### Claude Code

Edit `~/.claude/mcp.json` (or your client's config file):

```json
{
  "mcpServers": {
    "mui": {
      "command": "npx",
      "args": ["-y", "@mui/mcp@latest"]
    }
  }
}
```

Restart Claude Code. Verify with `/mcp` — the `mui` server should appear as `connected`.

### Cursor / Windsurf

Settings → MCP → add server:

- **Command:** `npx`
- **Args:** `-y @mui/mcp@latest`
- **Name:** `mui`

## Step 4 — Validate

Once connected, ask Claude:

> Use the MUI MCP to describe the props of the `Autocomplete` component in v6.

If Claude returns a response citing the official docs, it works.

## Troubleshooting

- **`npx` not found** → install Node 20 LTS (`nvm install 20 && nvm use 20`).
- **Timeout on start** → check corporate firewall; MCP needs to fetch docs.
- **Wrong version** → pin version: `"args": ["-y", "@mui/mcp@<specific-version>"]`.

## When MCP is unavailable

The skill continues to work:

1. `references/mui-web-components.md` covers ~90% of cases.
2. `references/mui-icons.md` covers icons.
3. `references/mui-llms-index.md` lists canonical URLs for manual lookup.
4. `references/patterns.md` has recurring patterns ready to go.

Red flag: if you (Claude) are making up props, stop and warn the user that you need the MCP or network access to confirm the API before proceeding.
