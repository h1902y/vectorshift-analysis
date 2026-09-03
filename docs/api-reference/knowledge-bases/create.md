> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a knowledge base



## OpenAPI

````yaml api-reference/knowledge-bases/knowledge_base.json POST /knowledge-base
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
  /knowledge-base:
    post:
      tags:
        - Knowledge Base
      summary: Create a new knowledge base
      operationId: createKnowledgeBase
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/KnowledgeBaseCreateRequest'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/KnowledgeBaseCreateRequest'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/KnowledgeBaseCreateRequest'
      responses:
        '200':
          description: Knowledge base created successfully
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
                  id:
                    type: string
                    description: ID of the created knowledge base
        '400':
          description: Invalid request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
      security:
        - BearerAuth: []
components:
  schemas:
    KnowledgeBaseCreateRequest:
      type: object
      required:
        - name
      properties:
        name:
          type: string
          description: Name of the knowledge base
        description:
          type: string
        file_processing_implementation:
          type: string
          enum:
            - Default
            - Textract
            - Unstructured
            - LlamaParse
            - Other
        chunk_size:
          type: integer
        chunk_overlap:
          type: integer
        analyze_documents:
          type: boolean
        apify_key:
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