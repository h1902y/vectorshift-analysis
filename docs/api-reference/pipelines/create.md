> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a new pipeline

> Create a new pipeline with the specified configuration



## OpenAPI

````yaml api-reference/pipelines/pipeline.json POST /pipeline
openapi: 3.1.0
info:
  title: Pipeline API
  version: 1.0.0
  description: |
    API for managing and executing pipelines.
    Authentication is required for all endpoints using Bearer token.

    Example: `Authorization: Bearer your-api-key-here`
servers:
  - url: https://api.vectorshift.ai/v1
security:
  - BearerAuth: []
paths:
  /pipeline:
    post:
      summary: Create a new pipeline
      description: Create a new pipeline with the specified configuration
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                description:
                  type: string
              required:
                - name
                - config
          multipart/form-data:
            schema:
              type: object
              properties:
                name:
                  type: string
                description:
                  type: string
              required:
                - name
                - config
          application/x-www-form-urlencoded:
            schema:
              type: object
              properties:
                name:
                  type: string
                description:
                  type: string
              required:
                - name
                - config
      responses:
        '200':
          description: Pipeline created successfully
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
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '500':
          $ref: '#/components/responses/InternalError'
      security:
        - BearerAuth: []
components:
  responses:
    BadRequest:
      description: Bad request
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
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
    InternalError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
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
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: Bearer token authentication using API key

````