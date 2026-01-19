# Ralph Wiggum Demo Task

## Objective

Fix all bugs in `src/string-utils.ts` so that all tests in `__tests__/string-utils.test.ts` pass.

## Success Criteria

All tests must pass when running:

```bash
cd ralph-demo && npx jest
```

## Instructions

1. **Run the tests** to see which ones fail
2. **Analyze the failures** to understand the bugs
3. **Fix the bugs** in `src/string-utils.ts`
4. **Re-run tests** to verify fixes
5. **Iterate** until all tests pass

## Constraints

- Only modify `src/string-utils.ts`
- Do not modify the test file
- Maintain the existing function signatures (API compatibility)
- Handle edge cases properly (empty strings, null, undefined, etc.)

## Completion Promise

When ALL tests pass, output:

```
<promise>ALL TESTS PASS</promise>
```

## How to Run This Demo

### Interactive Mode (in current session)

```bash
/ralph-loop "See RALPH-PROMPT.md in ralph-demo/ directory. Fix all bugs until tests pass." --completion-promise "ALL TESTS PASS" --max-iterations 15
```

### Background Mode (classic approach)

```bash
while :; do
  cat ralph-demo/RALPH-PROMPT.md | claude-code --continue
done
```

## What This Demo Shows

This demo illustrates how Ralph Wiggum excels at **well-defined tasks with clear success criteria**:

1. **Concrete goal**: Make tests pass
2. **Measurable progress**: Test results show exactly what's working
3. **Incremental fixes**: Each iteration can build on previous attempts
4. **Self-correcting**: Failed approaches are visible in git history

The technique works because Claude can see:
- Previous code changes in the files
- Test output showing remaining failures
- Git history of what was already tried
