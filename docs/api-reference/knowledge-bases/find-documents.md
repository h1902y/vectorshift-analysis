> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Find documents in a knowledge base



## OpenAPI

````yaml api-reference/knowledge-bases/knowledge_base.json GET /knowledge-base/{id}/documents
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
  /knowledge-base/{id}/documents:
    get:
      tags:
        - Knowledge Base
      summary: Find documents in a knowledge base
      operationId: findDocuments
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
          description: Knowledge base ID
        - name: title
          in: query
          required: false
          schema:
            type: string
          description: Title of the document
        - name: integration_id
          in: query
          required: false
          schema:
            type: string
          description: Integration ID
        - name: folder_id
          in: query
          required: false
          schema:
            type: string
          description: Folder ID
      responses:
        '200':
          description: Documents found successfully
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