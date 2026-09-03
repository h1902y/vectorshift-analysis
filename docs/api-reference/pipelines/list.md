> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# List all available pipelines



## OpenAPI

````yaml api-reference/pipelines/pipeline.json GET /pipelines
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
  /pipelines:
    get:
      summary: List pipelines
      parameters:
        - name: include_shared
          in: query
          required: false
          schema:
            type: boolean
            default: false
          description: Include shared pipelines in the results
        - name: verbose
          in: query
          required: false
          schema:
            type: boolean
            default: false
          description: Include full pipeline objects in the response
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
                  object_ids:
                    type: array
                    items:
                      type: string
                  objects:
                    type: array
                    description: Only included when verbose=true in the request
                    items:
                      type: object
                      additionalProperties: true
                required:
                  - status
                  - object_ids
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