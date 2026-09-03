> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Add data to a knowledge base



## OpenAPI

````yaml api-reference/knowledge-bases/knowledge_base.json POST /knowledge-base/{id}/index
openapi: 3.0.0
info:
  title: Knowledge Base API
  version: 1.0.0
  description: |
    API for managing knowledge bases and their documents.
    Authentication is required for all endpoints using Bearer token.

    Example: `Authorization: Bearer your-api-key-here`
servers:
  - url: https://api.vectorshift.ai/v1
security:
  - BearerAuth: []
paths:
  /knowledge-base/{id}/index:
    post:
      tags:
        - Knowledge Base
      summary: Index documents in a knowledge base
      operationId: indexDocuments
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
          description: Knowledge base ID
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/IndexingRequestJSON'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/IndexingRequestMultipart'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/IndexingRequestForm'
      responses:
        '200':
          description: Document indexed successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    enum:
                      - success
                      - failed
                  document_ids:
                    type: array
                    items:
                      type: string
        '400':
          description: Invalid request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Internal server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
      security:
        - BearerAuth: []
components:
  schemas:
    IndexingRequestJSON:
      type: object
      properties:
        file_data:
          type: object
          properties:
            file:
              type: object
              required:
                - type
                - raw_bytes
              properties:
                type:
                  type: string
                  enum:
                    - file
                raw_bytes:
                  type: string
                  format: base64
                metadata:
                  type: object
                  properties:
                    name:
                      type: string
                    path:
                      type: string
                    mime_type:
                      type: string
            custom_metadata:
              type: object
              additionalProperties: true
          required:
            - file
        url_data:
          type: object
          required:
            - request
            - rescrape_frequency
          properties:
            request:
              type: object
              required:
                - url
                - recursive
                - return_type
              properties:
                url:
                  type: string
                recursive:
                  type: boolean
                return_type:
                  type: string
                  enum:
                    - CHUNKS
                    - CONTENT
                url_limit:
                  type: integer
                ai_enhance_content:
                  type: boolean
                apify_key:
                  type: string
            rescrape_frequency:
              type: string
        wikipedia:
          type: string
        youtube:
          type: string
        arxiv:
          type: string
        config:
          type: object
          properties:
            index_tables:
              type: boolean
              default: false
            analyze_documents:
              type: boolean
              default: false
            enrichment_tasks:
              type: array
              items:
                type: string
                enum:
                  - Vision
                  - Oneshot
                  - Summary
                  - Spreadsheet
            file_processing_implementation:
              type: string
              enum:
                - Default
                - Textract
                - Unstructured
                - LlamaParse
                - Other
              default: Default
            chunk_size:
              type: integer
            chunk_overlap:
              type: integer
            apify_api_key:
              type: string
      oneOf:
        - required:
            - file_data
        - required:
            - url_data
        - required:
            - wikipedia
        - required:
            - youtube
        - required:
            - arxiv
    IndexingRequestMultipart:
      type: object
      oneOf:
        - required:
            - file_data
          properties:
            file_data:
              type: object
              properties:
                file:
                  type: string
                  format: binary
                custom_metadata:
                  type: object
                  additionalProperties: true
              required:
                - file
        - required:
            - url_data
        - required:
            - wikipedia
        - required:
            - youtube
        - required:
            - arxiv
      properties:
        file_data:
          type: object
          properties:
            file:
              type: string
              format: binary
            custom_metadata:
              type: object
              additionalProperties: true
          required:
            - file
        url_data:
          type: object
          required:
            - request
            - rescrape_frequency
          properties:
            request:
              type: object
              required:
                - url
                - recursive
                - return_type
              properties:
                url:
                  type: string
                recursive:
                  type: boolean
                return_type:
                  type: string
                  enum:
                    - CHUNKS
                    - CONTENT
                url_limit:
                  type: integer
                ai_enhance_content:
                  type: boolean
                apify_key:
                  type: string
            rescrape_frequency:
              type: string
        wikipedia:
          type: string
        youtube:
          type: string
        arxiv:
          type: string
        config:
          type: object
          properties:
            index_tables:
              type: boolean
              default: false
            analyze_documents:
              type: boolean
              default: false
            enrichment_tasks:
              type: array
              items:
                type: string
                enum:
                  - Vision
                  - Oneshot
                  - Summary
                  - Spreadsheet
            file_processing_implementation:
              type: string
              enum:
                - Default
                - Textract
                - Unstructured
                - LlamaParse
                - Other
              default: Default
            chunk_size:
              type: integer
            chunk_overlap:
              type: integer
            apify_api_key:
              type: string
    IndexingRequestForm:
      type: object
      oneOf:
        - required:
            - file_data
          properties:
            file_data:
              type: object
              properties:
                file:
                  type: object
                  required:
                    - type
                    - raw_bytes
                  properties:
                    type:
                      type: string
                      enum:
                        - file
                    raw_bytes:
                      type: string
                      format: base64
                    metadata:
                      type: object
                      properties:
                        name:
                          type: string
                        path:
                          type: string
                        mime_type:
                          type: string
                custom_metadata:
                  type: object
                  additionalProperties: true
              required:
                - file
        - required:
            - url_data
        - required:
            - wikipedia
        - required:
            - youtube
        - required:
            - arxiv
      properties:
        file_data:
          type: object
          properties:
            file:
              type: string
              format: binary
            custom_metadata:
              type: object
              additionalProperties: true
          required:
            - file
        url_data:
          type: object
          required:
            - request
            - rescrape_frequency
          properties:
            request:
              type: object
              required:
                - url
                - recursive
                - return_type
              properties:
                url:
                  type: string
                recursive:
                  type: boolean
                return_type:
                  type: string
                  enum:
                    - CHUNKS
                    - CONTENT
                url_limit:
                  type: integer
                ai_enhance_content:
                  type: boolean
                apify_key:
                  type: string
            rescrape_frequency:
              type: string
        wikipedia:
          type: string
        youtube:
          type: string
        arxiv:
          type: string
        config:
          type: object
          properties:
            index_tables:
              type: boolean
              default: false
            analyze_documents:
              type: boolean
              default: false
            enrichment_tasks:
              type: array
              items:
                type: string
                enum:
                  - Vision
                  - Oneshot
                  - Summary
                  - Spreadsheet
            file_processing_implementation:
              type: string
              enum:
                - Default
                - Textract
                - Unstructured
                - LlamaParse
                - Other
              default: Default
            chunk_size:
              type: integer
            chunk_overlap:
              type: integer
            apify_api_key:
              type: string
    ErrorResponse:
      type: object
      properties:
        status:
          type: string
          enum:
            - failed
        error:
          type: string
      required:
        - status
        - error
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: Bearer token authentication using API key

````