> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Run a chatbot



## OpenAPI

````yaml api-reference/chatbots/chatbot.json POST /chatbot/{id}/run
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
  /chatbot/{id}/run:
    post:
      summary: Run a chatbot
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
          description: Chatbot ID
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ChatbotRunRequest'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/ChatbotRunMultipartRequest'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/ChatbotRunRequest'
      responses:
        '200':
          description: >-
            Successful response. Returns regular JSON response or SSE stream
            based on 'stream' parameter.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ChatbotRunResponse'
            text/event-stream:
              schema:
                $ref: '#/components/schemas/ChatbotStreamEvent'
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
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
    ChatbotRunRequest:
      type: object
      properties:
        text:
          type: string
        audio:
          type: string
          format: base64
          description: Base64 encoded audio data
        conversation_id:
          type: string
        stream:
          type: boolean
          default: false
      oneOf:
        - required:
            - text
          not:
            required:
              - audio
        - required:
            - audio
          not:
            required:
              - text
    ChatbotRunMultipartRequest:
      type: object
      properties:
        text:
          type: string
        audio:
          type: file
          description: Audio file upload
        conversation_id:
          type: string
        stream:
          type: boolean
          default: false
        filter:
          $ref: '#/components/schemas/Filter'
        generate_follow_up_questions:
          type: boolean
          default: false
        number_of_follow_up_questions:
          type: integer
        slack_channel_id:
          type: string
      oneOf:
        - required:
            - text
          not:
            required:
              - audio
        - required:
            - audio
          not:
            required:
              - text
    ChatbotRunResponse:
      type: object
      properties:
        status:
          type: string
          enum:
            - success
            - failed
        conversation_id:
          type: string
        output_message:
          type: string
        follow_up_questions:
          type: array
          items:
            type: string
      required:
        - status
        - conversation_id
        - output_message
    ChatbotStreamEvent:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - stream
            output_value:
              type: string
          required:
            - type
            - output_value
        - type: object
          properties:
            status:
              type: string
              enum:
                - success
                - failed
            conversation_id:
              type: string
            output_message:
              type: string
            follow_up_questions:
              type: array
              items:
                type: string
            error:
              type: string
          required:
            - status
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
    Filter:
      type: object
      properties:
        filter_items:
          type: array
          items:
            type: object
            properties:
              object_id:
                type: string
              item_id:
                type: string
              document_id:
                type: string
            oneOf:
              - required:
                  - object_id
              - required:
                  - item_id
              - required:
                  - document_id
        selection_mode:
          type: string
          enum:
            - ALL
            - ANY
      required:
        - filter_items
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