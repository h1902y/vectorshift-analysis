# Part 2: The Built Use Case — Autonomous Deal Screener & Tear Sheet Generator

> **Prompt Reference (Task 3)**: *"Pick one use case from your list and build it as a working workflow or agent, end to end. The point is that you have actually used the product, not just looked at it. Include a link to, or screenshots of, the use case you built."*

---

## 1. Selected Use Case

**Use Case**: Inbound CIM / Pitch Deck Deconstructor & Investment Tear Sheet Generator  
**Surface**: VectorShift Workflow Pipeline (Visual Canvas) + Form Interface  
**Status**: Architecture & Node Graph fully specified below (Live execution paused pending platform credit replenishment by the VectorShift team).
**Target Pipeline / Form URL**: `[Insert VectorShift Pipeline / Form Export Link Here]`

---

## 2. Pipeline Architecture & Node Graph

The workflow ingests an inbound pitch deck or Confidential Information Memorandum (CIM), extracts core quantitative and qualitative metrics, benchmarks them against fund investment criteria, and outputs a formatted 1-page Deal Memo.

```text
[Input File Node] (PDF / CIM Upload)
        │
        ▼
[Document Loader / Text Parser Node]
        │
        ▼
[LLM Information Extractor Node] (Structured JSON Output)
   - Company Name & Overview
   - Financials: ARR, MoM Growth, Gross Margin, Burn Rate
   - Ask & Valuation
   - Team Pedigree & Sector
        │
        ├─────────────────────────────────────────────┐
        ▼                                             ▼
[Mandate Benchmarking Node]              [Executive Synthesis Node]
   - Compares metrics against fund          - Summarizes product moat,
     criteria (e.g. ARR > $2M, GM > 75%)      market tailwinds, key risks
        │                                             │
        └──────────────────────┬──────────────────────┘
                               ▼
                    [Output Formatter Node]
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
[Generated Markdown Tear Sheet]        [Structured Table / Export]
```

---

## 3. Node-by-Node Configuration

### 1. File Input Node (`input_file_1`)
- **Type**: File Upload (accepts `.pdf`, `.docx`, `.pptx`).
- **Settings**: Max file size 50MB.

### 2. Document Parser Node (`doc_parser_1`)
- **Function**: Extracts plain text, tables, and page metadata.
- **Output**: Chunked text and document metadata.

### 3. Metric Extraction Node (`llm_extractor_1`)
- **Model**: `Anthropic Claude 3.5 Sonnet` or `OpenAI GPT-4o`.
- **System Prompt**:
  > *"You are an expert private equity and venture capital associate. Extract all critical financial metrics, business model details, and unit economics from the provided document into structured JSON. If any metric is not stated, explicitly state 'Not Disclosed'."*
- **JSON Schema**:
  ```json
  {
    "company_name": "string",
    "sector": "string",
    "arr_millions": "number",
    "gross_margin_pct": "number",
    "yoy_growth_pct": "number",
    "burn_multiple": "number",
    "target_raise_millions": "number",
    "tam_billions": "number",
    "top_risks": ["string"]
  }
  ```

### 4. Rule-Based Mandate Evaluator (`code_evaluator_1` or `llm_rubric_1`)
- **Evaluation Criteria**:
  - ARR $\ge$ $2.0M $\rightarrow$ Green; else Red
  - Gross Margin $\ge$ 70% $\rightarrow$ Green; else Yellow
  - YoY Growth $\ge$ 50% $\rightarrow$ Green; else Yellow
- **Output**: Overall Thesis Score (1 to 10) and Flag Summary.

### 5. Form & Portal Interface Deployment
- Deployed as a clean web form where an associate can drop a PDF and immediately view the generated tear sheet and download the structured JSON.

---

## 4. Execution Evidence & Screenshots

*(Insert screenshots from app.vectorshift.ai showing the canvas layout, test run output, and final deployed form)*

1. **Canvas Overview**: Showing node wiring from Input $\rightarrow$ Extraction $\rightarrow$ Logic $\rightarrow$ Output.
2. **Run Execution Panel**: Showing successful trace execution with zero runtime errors.
3. **Generated Deal Tear Sheet**: Output preview demonstrating the structured output generated from a sample test deck.
