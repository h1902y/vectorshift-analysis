> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> Turn any Agent or workflow into a conversational interface your users can chat with

A chatbot is a conversational interface powered by one of your Agents or workflows. You build the logic once, connect it to a chatbot, and your users get a familiar chat experience (complete with conversation history, follow-up questions, and file uploads) without ever seeing the Agent or workflow behind it.

<Tip>
  If you are completely new to VectorShift, head to the [Quickstart](/quickstart) first. This chapter assumes you have already built at least one Agent or workflow.
</Tip>

## What is a chatbot?

A chatbot is an interface that takes in user input, runs the underlying engine — either an Agent or a workflow — and gives back a response, while maintaining a persistent conversation history. Once you build a chatbot, you choose how people reach it: a shareable link, an embedded widget on your website, a Slack bot, a WhatsApp or SMS number, or a programmatic API call.

Every chatbot has three parts:

1. **An Agent or workflow as the engine.** An Agent autonomously decides which tools to call and in what order based on the user's message. A workflow runs a fixed sequence of nodes you define. Either way, when a user sends a message, VectorShift runs the underlying engine and returns the output as the chatbot's reply.

2. **Conversation history.** For Agent-based chatbots, conversation history is managed automatically. For workflow-based chatbots, include a [Chat Memory node](/platform/pipelines/chat/chat-memory) in your workflow to pass prior messages into the LLM so it can reference what was said earlier.

3. **A deployment channel.** Once the chatbot is built, you choose how people reach it: a shareable link, an embedded widget on your website, a Slack bot, a WhatsApp or SMS number, or a programmatic API call.

## Two types of chatbots

VectorShift supports two distinct types of chatbots, each designed for different levels of autonomy and control.

| Aspect               | Agentic chatbot                                                                                         | Workflow chatbot                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Definition**       | An autonomous chatbot that decides which tools to call and in what order, based on the user's message   | A chatbot backed by a fixed workflow where you define every step of the logic explicitly                      |
| **Nature**           | Autonomous flow: the agent selects tools, retrieves data, and chains actions on its own                 | Deliberate flow: the workflow runs the same sequence of nodes every time                                      |
| **Best for**         | Open-ended tasks where the user's intent varies widely (scheduling, multi-system lookups, dynamic Q\&A) | Predictable tasks where every conversation follows a known pattern (order support, FAQ, document search)      |
| **How you build it** | Select an agent as the source, add tools, and let the agent figure out the execution path               | Build a workflow with Input, LLM, Chat Memory, Knowledge Base, and Output nodes, then connect it to a chatbot |
| **Deployment**       | Same five channels: share link, embed, Slack, WhatsApp/SMS, API                                         | Same five channels: share link, embed, Slack, WhatsApp/SMS, API                                               |

## Ready to build?

<CardGroup cols={2}>
  <Card title="Build an Agentic Chatbot" icon="robot" href="/platform/interfaces/chatbots/agentic">
    Create an autonomous chatbot powered by an Agent that picks its own tools — the recommended way to get started
  </Card>

  <Card title="Build a Workflow Chatbot" icon="diagram-project" href="/platform/interfaces/chatbots/workflow">
    Create a chatbot backed by a step-by-step workflow where you control every stage of the logic
  </Card>
</CardGroup>

## Already have a chatbot?

<CardGroup cols={2}>
  <Card title="Chat Assistant vs Website Chatbot" icon="browser" href="/platform/interfaces/chatbots/assistant-vs-website">
    Choose how your chatbot appears to your users — full-page assistant or embedded widget
  </Card>

  <Card title="Deploy to Slack" icon="slack" href="/platform/interfaces/chatbots/slack">
    Let your team chat with the bot directly in your Slack workspace
  </Card>

  <Card title="Deploy via WhatsApp / SMS" icon="phone" href="/platform/interfaces/chatbots/whatsapp">
    Connect your chatbot to WhatsApp or SMS through Twilio
  </Card>

  <Card title="Chat via API" icon="terminal" href="/platform/interfaces/chatbots/api">
    Integrate chatbot functionality into your own application using the REST API
  </Card>

  <Card title="Analytics" icon="chart-line" href="/platform/interfaces/chatbots/analytics">
    Track usage, review conversations, and export data to improve performance
  </Card>
</CardGroup>
