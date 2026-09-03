> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Terminate a chatbot session



## OpenAPI

````yaml api-reference/chatbots/chatbot.json POST /chatbot/{id}/terminate
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
  /chatbot/{id}/terminate:
    post:
      summary: Terminate a chatbot session
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                pipeline_run_id:
                  type: string
              required:
                - pipeline_run_id
          multipart/form-data:
            schema:
              type: object
              properties:
                pipeline_run_id:
                  type: string
              required:
                - pipeline_run_id
          application/x-www-form-urlencoded:
            schema:
              type: object
              properties:
                pipeline_run_id:
                  type: string
              required:
                - pipeline_run_id
      responses:
        '200':
          description: Successful response
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
                required:
                  - status
        '400':
          description: Bad request
          content:
            application/json:
              schema:
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
        '401':
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
        '500':
          description: Internal server error
          content:
            application/json:
              schema:
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
      security:
        - BearerAuth: []
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: Bearer token authentication using API key

````