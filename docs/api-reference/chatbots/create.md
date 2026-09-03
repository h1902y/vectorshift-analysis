> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a new chatbot



## OpenAPI

````yaml api-reference/chatbots/chatbot.json POST /chatbot
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
    post:
      summary: Create a new chatbot
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                pipeline:
                  type: object
                  properties:
                    id:
                      type: string
                    version:
                      oneOf:
                        - type: string
                          enum:
                            - latest
                        - type: object
                          properties:
                            major:
                              type: integer
                            minor:
                              type: integer
                            patch:
                              type: integer
                          required:
                            - major
                            - minor
                            - patch
                  required:
                    - id
                name:
                  type: string
                description:
                  type: string
                deployment_options:
                  type: object
                  additionalProperties: true
                access_config:
                  type: object
                  additionalProperties: true
                twilio_config:
                  type: object
                  additionalProperties: true
                slack_config:
                  type: object
                  additionalProperties: true
                deployed:
                  type: boolean
                input:
                  type: string
                output:
                  type: string
              required:
                - pipeline
                - name
                - description
                - deployment_options
                - access_config
                - twilio_config
                - slack_config
                - deployed
                - input
                - output
          multipart/form-data:
            schema:
              type: object
              properties:
                pipeline:
                  type: object
                  properties:
                    id:
                      type: string
                    version:
                      oneOf:
                        - type: string
                          enum:
                            - latest
                        - type: object
                          properties:
                            major:
                              type: integer
                            minor:
                              type: integer
                            patch:
                              type: integer
                          required:
                            - major
                            - minor
                            - patch
                  required:
                    - id
                name:
                  type: string
                description:
                  type: string
                deployment_options:
                  type: object
                  additionalProperties: true
                access_config:
                  type: object
                  additionalProperties: true
                twilio_config:
                  type: object
                  additionalProperties: true
                slack_config:
                  type: object
                  additionalProperties: true
                deployed:
                  type: boolean
                input:
                  type: string
                output:
                  type: string
              required:
                - pipeline
                - name
                - description
                - deployment_options
                - access_config
                - twilio_config
                - slack_config
                - deployed
                - input
                - output
          application/x-www-form-urlencoded:
            schema:
              type: object
              properties:
                pipeline:
                  type: object
                  properties:
                    id:
                      type: string
                    version:
                      oneOf:
                        - type: string
                          enum:
                            - latest
                        - type: object
                          properties:
                            major:
                              type: integer
                            minor:
                              type: integer
                            patch:
                              type: integer
                          required:
                            - major
                            - minor
                            - patch
                  required:
                    - id
                name:
                  type: string
                description:
                  type: string
                deployment_options:
                  type: object
                  additionalProperties: true
                access_config:
                  type: object
                  additionalProperties: true
                twilio_config:
                  type: object
                  additionalProperties: true
                slack_config:
                  type: object
                  additionalProperties: true
                deployed:
                  type: boolean
                input:
                  type: string
                output:
                  type: string
              required:
                - pipeline
                - name
                - description
                - deployment_options
                - access_config
                - twilio_config
                - slack_config
                - deployed
                - input
                - output
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
                  id:
                    type: string
                required:
                  - status
                  - id
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