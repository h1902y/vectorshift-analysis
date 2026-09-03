> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Revert and manage versions

> Example: Version management and pipeline operations

```python theme={"languages":{}}
import os

from vectorshift.pipeline import BumpLevel, Pipeline

pipeline = Pipeline.new(name="revert-manage-example")
inp = pipeline.add(name="input_0").input(input_type="string")
pipeline.add(name="output_0").output(output_type="string", value=inp.text)
print(pipeline.save(deploy=True))

print(pipeline.save(bump=BumpLevel.MINOR, description="first minor bump"))
print(pipeline.save(bump=BumpLevel.MINOR, description="second minor bump"))

result = pipeline.revert(version="0.2.0")
print(f"Revert: {result}")

# Folder ids are env-specific, so only demonstrate the move when one is provided.
folder_id = os.environ.get("VECTORSHIFT_TEST_FOLDER_ID")
if folder_id:
    print(pipeline.move_to_folder(folder_id=folder_id))
else:
    print("Skipping folder move (set VECTORSHIFT_TEST_FOLDER_ID to enable)")

result = pipeline.remove_node(node_name="output_0")
print(f"Remove node: {result}")
```

<Tip>
  Source: `examples/pipelines/revert_and_manage.py` in the SDK repo.
</Tip>
