> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Agents

> Build intelligent, conversational AI assistants that reason, remember context, and take actions autonomously

Agents are intelligent, conversational AI assistants you can build, customize, and deploy without writing code. Unlike Workflows, which follow a fixed sequence of steps, Agents can reason, remember context within a conversation, and decide which tools to use on their own to get things done.

At their core, Agents work like a knowledgeable team member who can hold a conversation, look things up, take actions on your behalf, and remember what you talked about. You give them instructions, connect them to your data and tools, and deploy them as a chatbot that your users or team can interact with.

## What agents can do

Agents are flexible and can handle a wide range of tasks. Here are some of the things they can do:

* **Answer questions from your data:** Connect your documents, PDFs, spreadsheets, and web content to a Knowledge Base, and the Agent will search through them to give grounded, accurate answers.
* **Search the web:** Pull in real-time information from the internet using web search tools like Google Search, Exa AI, or Perplexity.
* **Generate and modify media:** Create images from text descriptions, modify existing images, convert text to speech, and transcribe audio to text.
* **Read and process files:** Extract text from uploaded documents, read Excel files, and convert between file formats.
* **Run code:** Execute Python code in a sandboxed environment to analyze data, process spreadsheets, create charts, and generate files.
* **Connect to external apps:** Interact with third-party services like Airtable, Slack, Google Sheets, Asana, Salesforce, and dozens more through integration tools.
* **Generate charts and visualizations:** Turn data into bar charts, line graphs, pie charts, scatter plots, and donut charts directly in the chat.
* **Delegate to other Agents:** Call specialized sub-agents for specific tasks, creating multi-agent workflows where different Agents handle different domains.
* **Run Workflows:** Trigger VectorShift Workflows from within a conversation to execute complex, multi-step automations. You can build any custom automation as a workflow and give your Agent access to it as a tool — something very few platforms support.
* **Connect to MCP Servers:** Access external services through the Model Context Protocol for custom integrations.

## Common use cases

**Portfolio research assistant:** Search the web for market news and financial research, then deliver sourced summaries so analysts skip manual searching.

**Financial document analyst:** Upload spreadsheets and reports, then ask questions and get auto-generated charts and data insights directly in the chat.

**Compliance assistant:** Answer natural-language policy questions instantly by grounding responses in your uploaded regulatory guidelines and audit checklists.

**Client onboarding assistant:** Guide relationship managers step-by-step through onboarding by pulling CRM records and referencing your internal playbooks.

**Risk assessment assistant:** Combine real-time market data with your internal risk frameworks to help analysts draft risk reports faster.

**Multi-desk routing:** Route questions to specialized sub-agents for different domains like equities, compliance, and operations — all from one main Agent.

## When to use an Agent vs. a Workflow

Agents and Workflows are both powerful, but they're designed for different situations. Here's how to decide which one to use:

**Use an Agent when:**

* A user needs to interact through a conversation and the next step depends on what they say.
* The task requires judgment, reasoning, or deciding between multiple possible actions.
* You want to deploy a chatbot that users can talk to directly.
* The path to the answer isn't fixed and may vary from question to question.
* You need the AI to search through documents, decide which tool to use, and compose a response.

**Use a Workflow when:**

* The task follows a fixed, predictable sequence of steps every time.
* You need to process data in bulk without human interaction.
* The automation should run on a schedule or be triggered by an event.
* You want deterministic, repeatable results where the same input always produces the same output.
* The process involves chaining multiple nodes together in a workflow.

**Use both together when:**

* You have a conversational Agent that needs to trigger a complex automation. The Agent can use the Run Workflow tool to kick off a Workflow from within a chat.
* You have a workflow that needs AI reasoning at one step. A Workflow agent can be embedded as a node inside a larger Workflow.

For example, a portfolio research Agent might chat with an analyst to understand their query, then use the Run Workflow tool to trigger a "Fetch and Normalize Market Data" Workflow that follows a fixed sequence: pull data from APIs, clean it, and return a structured dataset for the Agent to summarize.

## How agents work under the hood

When a user sends a message, the Agent follows this general process:

1. The Agent reads its instructions to understand its role and guidelines.
2. It looks at the conversation history (if Session Memory is enabled) to understand context.
3. It decides whether it needs to use any tools to answer the question, based on the tool descriptions and its instructions.
4. If it decides to use a tool, it executes the tool (or asks the user for approval, depending on the execution mode).
5. It takes the tool's output and uses it to compose a response.
6. It may repeat steps 3 through 5 multiple times if the question requires multiple tool calls.
7. It sends the final response back to the user.

This reasoning loop is what makes Agents different from simple chatbots. They don't just generate text; they actively decide what actions to take and use the results to inform their answers.

## Building blocks of an Agent

An Agent is made up of five core building blocks that you configure from a single builder:

* **Instructions** tell the Agent who it is and how it should behave. Think of this as the Agent's job description.
* **AI Model** powers the Agent's reasoning. You can choose from providers like OpenAI, Anthropic, Google, and Groq, and select a specific model from each.
* **Tools** are the actions the Agent can take autonomously. These range from web search and image generation to code execution and third-party app integrations. Crucially, you can also build custom Workflows and use them as tools inside your Agent — giving you a platform-native way to turn any multi-step automation into an Agent capability.
* **Knowledge Base** gives the Agent access to your documents and data so it can ground its answers in real information rather than relying on general knowledge alone.
* **Session Memory** lets the Agent remember what was said earlier in the same conversation, enabling coherent multi-turn dialogue.

The rest of this document walks through how to create and configure each of these building blocks, customize the chatbot interface, monitor usage, and share your Agent with teammates.
