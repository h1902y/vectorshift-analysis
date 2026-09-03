> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Gmail node

> Send an email from a pipeline using a Gmail integration node

A string input (the email body) feeds an `integration_gmail` node that
sends a `send_email` action through a connected Gmail integration. Replace
the integration id with one from your account.

```python theme={"languages":{}}
from vectorshift import Pipeline
from vectorshift.integrations import Integration

# Fetch the pipeline if it already exists, otherwise create it
PIPELINE_NAME = "gmail-pipeline"
try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")

input_node = pipeline.add(name="input_0").input(
    input_type="string", description="Gmail Message to Send"
)

# Use a real integration id from a connected Gmail account
integration = Integration(object_id="your integration id")
pipeline.add(name="gmail_node").integration_gmail(
    integration=integration,
    action="send_email",
    recipients="recipient@gmail.com",
    subject="Test Email from Pipeline",
    body=input_node.text,
    format="text",
)

pipeline.save()
```

<Tip>
  Source: `examples/pipelines/gmail_node.py` in the SDK repo.
</Tip>
