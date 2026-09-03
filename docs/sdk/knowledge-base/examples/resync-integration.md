> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Resync integration

> Trigger an integration resync globally or scoped to a Knowledge Base, with typed errors for unattached ids.

**What this builds.** Two resync paths — the standalone `Integration.resync()` and the KB-scoped `kb.resync_integration(...)` — plus the negative path that raises `KbIntegrationNotFound`.
**You'll end up with.** A dispatched (async) resync on the integrations service and a demonstrated typed error when an id isn't attached to the KB.

```python theme={"languages":{}}
"""
Example 11: Resync an integration.

Two ways to trigger an integration resync via the SDK:

1. ``Integration.resync()`` — call directly on any Integration object
   you fetched from your account. Triggers a global resync of every
   vectorstore that uses the integration.

2. ``kb.resync_integration(integration_id)`` — the KB-aware sugar.
   Lists integrations attached to the KB, validates the id is among
   them, and dispatches the same global resync. Raises
   ``KbIntegrationNotFound`` if the id isn't attached.

Both paths trigger an asynchronous resync that refreshes metadata and
re-syncs vectorstore content. The methods return immediately.
"""

from vectorshift.integrations.integration import Integration
from vectorshift.knowledge_base import KnowledgeBase, KbIntegrationNotFound


# Pick any connected integration from your account. Edit the type if
# you don't have a Box integration handy — works for any "revamped"
# type (Notion, Slack, all Google products, all Microsoft products,
# Hubspot, Linear, etc.).
INTEGRATION_TYPE = "Box"

candidates = [i for i in Integration.list() if i.type == INTEGRATION_TYPE]
if not candidates:
    print(
        f"No connected {INTEGRATION_TYPE!r} integrations on this account. "
        "Connect one in the dashboard or change INTEGRATION_TYPE."
    )
    raise SystemExit(0)

integration = candidates[-1]
print(f"0. Using integration id={integration.object_id} name={integration.name}")

# -- Path 1: standalone Integration.resync() --------------------------
# No KB needed — works on any Integration you can fetch.
integration.resync()
print("1. Integration.resync() dispatched (global, fire-and-forget).")


# -- Path 2: kb.resync_integration() ---------------------------------
# Wraps the same call but first validates the id is attached to the KB.
# Integrations must be attached to the KB via the dashboard.
kb = KnowledgeBase.new(name="SDK resync demo")
print(f"2. Created KB id={kb.id}")

active = kb.integrations()
print(f"3. KB has {len(active)} attached integration(s).")

if active:
    target_id = active[0].integration_id
    kb.resync_integration(target_id)
    print(f"4. kb.resync_integration({target_id!r}) dispatched.")
else:
    # No integrations attached server-side — exercise the negative
    # path instead so the example is still illustrative.
    print("4. (None attached; demonstrating the negative path below.)")

# -- Negative path: KbIntegrationNotFound -----------------------------
# Pass an id that isn't attached to the KB. The SDK catches it before
# any network round-trip and raises a typed error with the list of
# actually-attached ids so the caller can correct the typo.
try:
    kb.resync_integration("not-a-real-integration-id")
except KbIntegrationNotFound as exc:
    print(f"5. ✅ Caught KbIntegrationNotFound: {exc}")

kb.delete()
print("6. Deleted KB.")
```

## Expected output

```text theme={"languages":{}}
0. Using integration id=... name=...
1. Integration.resync() dispatched (global, fire-and-forget).
2. Created KB id=...
3. KB has ... attached integration(s).
4. ...
5. ✅ Caught KbIntegrationNotFound: ...
6. Deleted KB.
```

Both paths trigger the same resync — `kb.resync_integration` just validates the id is attached to the KB first, returning a typed error instead of a server-side miss.

## See also

<Columns cols={3}>
  <Card title="Add URLs" icon="link" href="/sdk/knowledge-base/examples/add-urls">
    Ingest URLs with scheduled rescrapes.
  </Card>

  <Card title="Items and folders" icon="list" href="/sdk/knowledge-base/examples/items-and-folders">
    Manage items synced from integrations.
  </Card>

  <Card title="KB reference" icon="book-open" href="/sdk/knowledge-base/reference">
    Every public method.
  </Card>
</Columns>
