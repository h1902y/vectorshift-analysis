> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Fetch an existing chatbot



## OpenAPI

````yaml api-reference/chatbots/chatbot.json GET /chatbot
openapi: 3.1.0
info:
  title: Chatbot API
  version: 1.0.0
  description: |
    API for managing and interacting with chatbots.
    Authentication is required for all endpoints using Bearer token.

    Example: `Authorization: Bearer your-api-key-here`
servers:
  - url: https://api.vectorshift.ai/v1
security:
  - BearerAuth: []
paths:
  /chatbot:
    get:
      summary: Fetch a chatbot
      parameters:
        - name: id
          in: query
          required: false
          schema:
            type: string
          description: Optional chatbot ID. If not provided, name parameter is required
        - name: name
          in: query
          required: false
          schema:
            type: string
          description: Name of the chatbot. Required if id is not provided
        - name: username
          in: query
          required: false
          schema:
            type: string
          description: Optional username for name-based search
        - name: org_name
          in: query
          required: false
          schema:
            type: string
          description: Optional organization name for name-based search
      responses:
        '200':
          description: Chatbot details
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
                    additionalProperties: true
                required:
                  - status
                  - object
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '404':
          description: Chatbot not found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '500':
          description: Internal server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
      security:
        - BearerAuth: []
components:
  schemas:
    Error:
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