> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Reference

> Quick lookup for supported formats, models, splitter methods, statuses, and integrations

## Supported file formats

| Category     | Formats                                     |
| ------------ | ------------------------------------------- |
| Documents    | doc, docx, pdf, pptx, txt, md               |
| Spreadsheets | csv, xls, xlsx                              |
| Images       | JPEG, PNG, GIF, BMP, TIFF, WebP             |
| Audio        | MP3, WAV, OGG, FLAC, AAC, M4A, WMA          |
| Video        | MP4, MOV, AVI, WMV, FLV, MPEG, MKV, WebM    |
| Data         | JSON                                        |
| Archives     | ZIP (automatically extracted and processed) |

## Embedding models

Models are available from multiple providers: OpenAI, VoyageAI, Cohere, and Google. The default is **openai/text-embedding-3-small**, which works well for most use cases. The full list of available models is shown in the dropdown during knowledge base creation.

## Processing models

Choose the model that best handles your content type:

| Model         | Best for                                                            |
| ------------- | ------------------------------------------------------------------- |
| Default       | General purpose text extraction                                     |
| Llama Parse   | Structured documents with complex layouts                           |
| Textract      | Forms and tables (AWS-powered)                                      |
| Docling       | Layout-aware document understanding                                 |
| Mistral OCR   | Scanned documents and images with text                              |
| Contextual AI | Context-aware document processing                                   |
| Reducto       | High-fidelity document parsing with layout understanding            |
| Unstructured  | Flexible extraction for a wide range of unstructured document types |

## Splitter methods

Choose the method that matches your content structure:

| Method   | How it works                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------ |
| Sentence | Splits at sentence boundaries — best for unstructured text like emails and transcripts           |
| Markdown | Splits based on Markdown structure (headings, paragraphs, lists) — best for well-structured docs |
| Dynamic  | Adapts its splitting strategy to the content — best for mixed or varied formats                  |

<Note>For code files (Python, JavaScript, TypeScript, Go, Rust, SQL, YAML, Dockerfiles, and 100+ other code formats), VectorShift automatically applies a dedicated **Code** splitter regardless of the default splitter setting. This ensures code is split along meaningful boundaries like functions and classes.</Note>

## Document statuses

| Status     | What it means                                                                   |
| ---------- | ------------------------------------------------------------------------------- |
| Success    | Ready to search — fully processed and indexed                                   |
| Processing | In progress — being chunked, embedded, and indexed                              |
| Failed     | Something went wrong — retry from the document list                             |
| Warning    | Partial issues — shown for folders when one or more child items failed to index |

## Available integrations

**Suggested Apps**

OneDrive, Sharepoint, Google Drive, Box

**All Available Integrations**

| Integration        | Integration            |
| ------------------ | ---------------------- |
| Airtable           | Copper                 |
| Discord            | Gmail                  |
| Google Calendar    | Google Drive           |
| Google Docs        | Google Sheets          |
| Google BigQuery    | HubSpot                |
| Linear             | OneDrive               |
| Notion             | Salesforce             |
| Slack              | SugarCRM               |
| Typeform           | Dropbox                |
| Dropbox Teams      | AWS S3                 |
| Confluence Cloud   | Confluence Data Center |
| Zendesk            | Sharepoint             |
| Supabase S3        | Outlook                |
| Azure Blob Storage | Teams                  |
| GHL                | Clickup                |
| Box                | Trello                 |
| monday.com         | Shopify                |
