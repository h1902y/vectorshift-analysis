> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Fetch an existing knowledge base



## OpenAPI

````yaml api-reference/knowledge-bases/knowledge_base.json GET /knowledge-base
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
    get:
      tags:
        - Knowledge Base
      summary: Fetch a knowledge base
      operationId: fetchKnowledgeBase
      parameters:
        - name: id
          in: query
          required: false
          schema:
            type: string
          description: Knowledge base ID. Either id or name must be provided
        - name: name
          in: query
          required: false
          schema:
            type: string
          description: Name of the knowledge base. Either id or name must be provided
        - name: username
          in: query
          required: false
          schema:
            type: string
          description: >-
            Optional username for name-based search. Only valid when using name
            parameter
        - name: org_name
          in: query
          required: false
          schema:
            type: string
          description: >-
            Optional organization name for name-based search. Only valid when
            using name parameter
      responses:
        '200':
          description: Knowledge base details
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
                  object:
                    type: object
                required:
                  - status
                  - object
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '404':
          description: Knowledge base not found
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
  responses:
    UnauthorizedError:
      description: Authentication failed
      content:
        application/json:
          schema:
            type: object
            properties:
              error:
                type: string
                enum:
                  - Missing authorization header
                  - Invalid authorization header format
                  - Invalid API key
            required:
              - error
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: Bearer token authentication using API key

````