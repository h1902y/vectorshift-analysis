> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Run a transformation



## OpenAPI

````yaml api-reference/transformations/transformation.json POST /transformation/{id}/run
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
  /transformation/{id}/run:
    post:
      summary: Run a transformation
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TransformationRunRequest'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/TransformationRunRequest'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/TransformationRunRequest'
      responses:
        '200':
          description: Transformation executed successfully
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
                  result:
                    type: object
                required:
                  - status
                  - result
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
    TransformationRunRequest:
      type: object
      properties:
        inputs:
          $ref: '#/components/schemas/TransformationInput'
      required:
        - inputs
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
    TransformationInput:
      type: object
      additionalProperties:
        oneOf:
          - type: string
          - type: number
          - type: boolean
          - type: array
          - type: object
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