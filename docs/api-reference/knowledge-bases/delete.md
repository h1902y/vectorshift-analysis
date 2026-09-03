> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete a knowledge base



## OpenAPI

````yaml api-reference/knowledge-bases/knowledge_base.json DELETE /knowledge-base/{id}
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
  /knowledge-base/{id}:
    delete:
      tags:
        - Knowledge Base
      summary: Delete a knowledge base
      operationId: deleteKnowledgeBase
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
          description: Knowledge base ID
      responses:
        '200':
          description: Knowledge base deleted successfully
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