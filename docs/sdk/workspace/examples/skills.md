> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Skills

> Create reusable skills and run them as an agent's instructions

A skill is a reusable prompt template you can save once and reuse anywhere. This
shows how to create, find, update, and run one.

```python theme={"languages":{}}
import time
from vectorshift import Skill
from vectorshift.workspace import Portal

name = f"Report Summary {int(time.time())}"

# --- 1. Create a reusable skill ---
skill = Skill.new(
    name=name,
    content="Summarize this report into a one-page memo: summary, findings, risks.",
    description="One-page report memo template",
)
print(f"1. Created skill: {skill.name} (id={skill.id})")

# --- 2. Fetch by name / id ---
print(f"2. Fetched by name: {Skill.fetch(name=name).id}")

# --- 3. List ---
print(f"3. Listed skills: {len(Skill.list(limit=20)['skills'])}")

# --- 4. Update; get_or_create returns the existing skill instead of duplicating ---
skill.update(content="...refined prompt...")
again = Skill.get_or_create(name=name, content="...")
print(f"4. Updated; get_or_create returned same id: {again.id == skill.id}")

# --- 5. Skills available on a portal, used as an agent's instructions ---
portal = Portal.fetch(name="Acme Research")
print(f"5. Portal skills: {[s.name for s in portal.skills()]}")
analyst = portal.agent(name="Report Analyst")
analyst.run("Summarize the Q3 report", skill=skill)
print("   Ran the analyst agent with the skill as instructions.")

# --- 6. Cleanup ---
skill.delete()
print("6. Deleted skill.\n\nDone.")
```

<Tip>
  Source: `examples/workspaces/04_skills.py` in the SDK repo.
</Tip>
