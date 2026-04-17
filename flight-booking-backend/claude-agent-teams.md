## Documentation Index
> Fetch the complete documentation index at: https://code.claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Orchestrate teams of Claude Code sessions

> Coordinate multiple Claude Code instances working together as a team, with shared tasks, inter-agent messaging, and centralized management.

<Warning>
  Agent teams are experimental and disabled by default. Enable them by adding `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` to your [settings.json](/en/settings) or environment. Agent teams have [known limitations](#limitations) around session resumption, task coordination, and shutdown behavior.
</Warning>

Agent teams let you coordinate multiple Claude Code instances working together. One session acts as the team lead, coordinating work, assigning tasks, and synthesizing results. Teammates work independently, each in its own context window, and communicate directly with each other.

Unlike [subagents](/en/sub-agents), which run within a single session and can only report back to the main agent, you can also interact with individual teammates directly without going through the lead.

<Note>
  Agent teams require Claude Code v2.1.32 or later. Check your version with `claude --version`.
</Note>

## Enable agent teams

Agent teams are disabled by default. Enable them by setting the `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` environment variable to `1`, either in your shell environment or through [settings.json](/en/settings):

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

## Start your first agent team

After enabling agent teams, tell Claude to create an agent team and describe the task and the team structure you want in natural language. Claude creates the team, spawns teammates, and coordinates work based on your prompt.

## Control your agent team

Tell the lead what you want in natural language. It handles team coordination, task assignment, and delegation based on your instructions.

### Choose a display mode

Agent teams support two display modes:

* **In-process**: all teammates run inside your main terminal.
* **Split panes**: each teammate gets its own pane. 

The default is `"auto"`. To override, set `teammateMode` in your global config at `~/.claude.json`:

```json
{
  "teammateMode": "in-process"
}
```
