# JTBD output schema

## Core (always filled)

```json
{
  "name": "project-slug",
  "hook": "One sentence: what this is for whom, concretely.",
  "jtbd": {
    "situation": "When [specific context/trigger]...",
    "motivation": "I want to [action/goal]...",
    "outcome": "So I can [measurable result]..."
  },
  "problem": {
    "what_hurts": "Specific pain point with evidence."
  },
  "needs": {
    "functional": ["what it must do"],
    "emotional": ["how user wants to feel"]
  },
  "switch_forces": {
    "push": "What's frustrating about today.",
    "pull": "What's attractive about the new.",
    "habit": "What keeps them stuck.",
    "anxiety": "What they fear about switching."
  },
  "outputs": ["what the project produces/delivers"],
  "evidence": {
    "source": "interview | voice_transcript | reviews",
    "quotes": ["verbatim quotes if available"],
    "weaknesses": ["dimensions that scored 0 or 1 in granularity gate"]
  }
}
```

## Extended (include only when naturally surfaced)

```json
{
  "problem": { "cost_today": "What the pain costs (time, money, stress)." },
  "needs": { "social": ["relational/status needs"] },
  "before_after": {
    "before": "Visible + felt state before.",
    "after": "Visible + felt state after."
  },
  "scenarios": [{ "title": "Short label", "vignette": "1-2 sentence day-in-the-life story" }],
  "trigger": { "type": "manual | scheduled | event", "detail": "e.g. after every client call" },
  "version": 1,
  "guardrails": ["what it must NOT do"],
  "odi": {
    "outcomes": [
      { "statement": "Minimize the time it takes to...", "importance": 8.5, "satisfaction": 3.2, "opportunity_score": 13.8 }
    ]
  },
  "open_questions": ["follow-ups the interviewer didn't resolve"]
}
```
