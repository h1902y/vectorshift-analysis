> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Share and publish

> Example: Sharing, publishing, and managing pipeline visibility

```python theme={"languages":{}}
from vectorshift.pipeline import Pipeline

# Create a simple pipeline to demonstrate sharing/publishing
PIPELINE_NAME = "share_publish_example"
try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")
inp = pipeline.add(name="input_0").input(input_type="string")
out = pipeline.add(name="output_0").output(
    output_type="string", value=inp.text
)
pipeline.save(deploy=True)

print(f"Pipeline ID: {pipeline.id}")

# Share with a user by user_id
try:
    pipeline.share(user_id="your-user-id-here", role="editor", name="User Name")
    print("Shared with user as editor")
except Exception as e:
    print(f"Failed to share with user: {e}")

# Share with an organization by org_id
try:
    pipeline.share(org_id="your-org-id-here", role="viewer", name="Team Name")
    print("Shared with org as viewer")
except Exception as e:
    print(f"Failed to share with org: {e}")

# Unshare a user
# pipeline.unshare(user_id="user_abc123")
# print("Unshared user")

# Unshare an org
# pipeline.unshare(org_id="org_xyz456")
# print("Unshared org")

# Publish to marketplace
pub = pipeline.publish(
    title="Share Publish Example",
    description="A demo pipeline for sharing and publishing",
    tags=["demo", "example"],
)
print(f"Published: marketplace_id={pub['id']}")

# Unpublish
pipeline.unpublish(marketplace_id=pub["id"])
print("Unpublished")
```

<Tip>
  Source: `examples/pipelines/share_and_publish.py` in the SDK repo.
</Tip>
