> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Fetch an existing transformation



## OpenAPI

````yaml api-reference/transformations/transformation.json GET /transformation
openapi: 3.1.0
info:
  title: Transformation API
  version: 1.0.0
  description: |
    API for managing and executing transformations.
    Authentication is required for all endpoints using Bearer token.

    Example: `Authorization: Bearer your-api-key-here`
servers:
  - url: https://api.vectorshift.ai/v1
security: []
paths:
  /transformation:
    get:
      summary: Fetch a transformation
      parameters:
        - name: id
          in: query
          required: false
          schema:
            type: string
          description: Transformation ID. Either id or name is required
        - name: name
          in: query
          required: false
          schema:
            type: string
          description: Name of the transformation. Required if id is not provided
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
          description: Transformation not found
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