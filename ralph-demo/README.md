# Ralph Wiggum Technique Demo

This demo showcases the **Ralph Wiggum technique** - an iterative AI development methodology where Claude repeatedly receives the same prompt and sees its own previous work, enabling self-correcting development loops.

## What is Ralph Wiggum?

Named after the Simpsons character and pioneered by [Geoffrey Huntley](https://ghuntley.com/ralph/), the technique works like this:

```
┌─────────────────────────────────────────────────────┐
│                   Ralph Loop                         │
│                                                      │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐     │
│   │  Prompt  │───▶│  Claude  │───▶│  Files   │     │
│   │  (same)  │    │  works   │    │ modified │     │
│   └──────────┘    └──────────┘    └──────────┘     │
│        ▲                               │            │
│        │                               ▼            │
│        │         ┌──────────────────────────┐      │
│        └─────────│ Claude sees prev work in │      │
│                  │ files + git history      │      │
│                  └──────────────────────────┘      │
└─────────────────────────────────────────────────────┘
```

The key insight: Claude doesn't receive its previous output - it sees its previous **work** persisted in files. This enables iterative refinement.

## Demo Contents

```
ralph-demo/
├── README.md              # This file
├── RALPH-PROMPT.md        # The task definition for Ralph
├── src/
│   └── string-utils.ts    # Code with intentional bugs
└── __tests__/
    └── string-utils.test.ts  # Tests that reveal the bugs
```

## Running the Demo

### Option 1: Interactive Mode (Recommended)

Run this command in Claude Code:

```bash
/ralph-loop "See RALPH-PROMPT.md in ralph-demo/ directory. Fix all bugs until tests pass." --completion-promise "ALL TESTS PASS" --max-iterations 15
```

Watch Claude:
1. Run tests, see failures
2. Analyze what's wrong
3. Fix bugs
4. Re-run tests
5. Iterate until all pass

### Option 2: Cancel the Loop

If you need to stop:

```bash
/cancel-ralph
```

## The Bugs to Fix

The `string-utils.ts` file contains 7 functions with bugs that cause **10 test failures**:

| Function | Bug | Failing Tests |
|----------|-----|---------------|
| `truncate` | Always adds `...` even for short strings | 4 |
| `slugify` | Doesn't remove special chars or collapse hyphens | 3 |
| `isValidEmail` | Accepts invalid emails with double dots | 1 |
| `countOccurrences` | Returns wrong value for empty substring | 1 |
| `padString` | Crashes on negative length, wrong multi-char padding | 2 |

## Why Ralph Works Here

This demo is **ideal** for Ralph because:

1. **Clear success criteria** - Tests either pass or fail
2. **Measurable progress** - Each test is a checkpoint
3. **Bounded problem** - 7 functions, known bugs
4. **Self-correcting** - Test output tells Claude exactly what's broken

## When Ralph Shines

| Good For | Not Good For |
|----------|--------------|
| Bug fixes with tests | Open-ended design work |
| Greenfield features | Production debugging |
| Code with clear specs | Subjective decisions |
| Iterative refinement | One-shot operations |

## Benefits of Ralph

### 1. Predictable Failures
> "Deterministically bad in an undeterministic world"

When Ralph fails, it fails consistently. This makes prompt tuning systematic rather than guesswork.

### 2. Incremental Progress
Each iteration builds on the last. Claude sees what it already tried (in files and git history) and can adjust.

### 3. Reduced Human Intervention
For well-defined tasks, Ralph can run autonomously until completion, freeing you for other work.

### 4. Natural Checkpointing
Every iteration is a checkpoint. If something goes wrong, you have a clear history to review.

## Learn More

- [Original technique by Geoffrey Huntley](https://ghuntley.com/ralph/)
- [Ralph Orchestrator](https://github.com/mikeyobrien/ralph-orchestrator)
