Explicit rules (~/.claude/settings.json)

┌─────────────────────┬───────────────────────────────────────────────────────┐
│        Tier         │                       Commands                        │
├─────────────────────┼───────────────────────────────────────────────────────┤
│ Allow (runs without │ cat, awk, ls, grep, git show, git status, git diff,   │
│  asking)            │ git log, gh pr view, gh pr diff                       │
├─────────────────────┼───────────────────────────────────────────────────────┤
│ Ask (always asks)   │ git commit, git push, rm                              │
├─────────────────────┼───────────────────────────────────────────────────────┤
│ Deny                │ none                                                  │
└─────────────────────┴───────────────────────────────────────────────────────┘

What I can do in practice

┌─────────────────────────────────────────┬───────────────────────────────────┐
│                  Area                   │             Behavior              │
├─────────────────────────────────────────┼───────────────────────────────────┤
│ Read files and search                   │ Free                              │
├─────────────────────────────────────────┼───────────────────────────────────┤
│ Edit or write files in the project      │ Auto-approved by auto mode        │
├─────────────────────────────────────────┼───────────────────────────────────┤
│ Other shell commands (build, test,      │ Auto mode decides. Risky or       │
│ install)                                │ destructive ones get a prompt.    │
├─────────────────────────────────────────┼───────────────────────────────────┤
│ Commit, push, delete files              │ Always asks, because of your ask  │
│                                         │ list                              │
├─────────────────────────────────────────┼───────────────────────────────────┤
│ Scratchpad                              │ Free                              │
│ (/private/tmp/claude-501/...)           │                                   │
├─────────────────────────────────────────┼───────────────────────────────────┤
│ Web fetch or search                     │ Available, auto mode decides      │
├─────────────────────────────────────────┼───────────────────────────────────┤
│ MCP tools (Figma, Canva, Drive, Claude  │ Available. Actions that publish   │
│ Docs, and others)                       │ or share outside get confirmed    │
│                                         │ first.                            │
├─────────────────────────────────────────┼───────────────────────────────────┤
│ LSP (TypeScript, Pyright)               │ Enabled through plugins           │
└─────────────────────────────────────────┴───────────────────────────────────┘

Suggested Antigravity setup to match

Check these setting names against your Antigravity version, because they can change.

┌────────────────┬──────────────────────────────┬─────────────────────────────┐
│  Antigravity   │            Value             │             Why             │
│    setting     │                              │                             │
├────────────────┼──────────────────────────────┼─────────────────────────────┤
│ Terminal       │                              │ Same as auto mode: the      │
│ execution      │ Auto (not Turbo)             │ agent runs safe commands    │
│ policy         │                              │ and asks for risky ones     │
├────────────────┼──────────────────────────────┼─────────────────────────────┤
│                │ The 10 allow commands above, │                             │
│ Allow list     │  plus your test and build    │ Read-only commands never    │
│                │ commands (for example npm    │ prompt                      │
│                │ test, npm run *)             │                             │
├────────────────┼──────────────────────────────┼─────────────────────────────┤
│ Deny list, or  │ git commit, git push, rm     │ Same as your ask tier       │
│ keep it asking │                              │                             │
├────────────────┼──────────────────────────────┼─────────────────────────────┤
│                │                              │ Same as auto-approving      │
│ Review policy  │ Agent Decides                │ edits while it still flags  │
│                │                              │ big changes                 │
└────────────────┴──────────────────────────────┴─────────────────────────────┘