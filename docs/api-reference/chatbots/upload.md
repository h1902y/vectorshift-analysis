> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Upload files to a chatbot



## OpenAPI

````yaml api-reference/chatbots/chatbot.json POST /chatbot/{id}/upload
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
  /chatbot/{id}/upload:
    post:
      summary: Upload files to a chatbot
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
              $ref: '#/components/schemas/ChatbotFileUploadRequest'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/ChatbotFileUploadRequest'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/ChatbotFileUploadRequest'
      responses:
        '200':
          description: Files uploaded successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ChatbotFileUploadResponse'
      security:
        - BearerAuth: []
components:
  schemas:
    ChatbotFileUploadRequest:
      type: object
      properties:
        files:
          type: array
          items:
            $ref: '#/components/schemas/FileType'
        conversation_id:
          type: string
      required:
        - files
    ChatbotFileUploadResponse:
      type: object
      properties:
        status:
          type: string
          enum:
            - success
            - failed
        errors:
          type: array
          items:
            type: string
        conversation_id:
          type: string
        knowledge_base_id:
          type: string
        uploaded_files:
          type: array
          items:
            type: string
      required:
        - status
    FileType:
      type: object
      properties:
        type:
          type: string
          const: file
        raw_bytes:
          type: string
          format: base64
      required:
        - type
        - raw_bytes
      additionalProperties: false
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: Bearer token authentication using API key

````