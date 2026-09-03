> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a new transformation



## OpenAPI

````yaml api-reference/transformations/transformation.json POST /transformation
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
    post:
      summary: Create a new transformation
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TransformationCreate'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/TransformationCreate'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/TransformationCreate'
      responses:
        '200':
          description: Transformation created successfully
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
    TransformationCreate:
      type: object
      properties:
        name:
          type: string
        description:
          type: string
        function_name:
          type: string
        function:
          type: string
        input_schema:
          $ref: '#/components/schemas/TransformationSchema'
        output_schema:
          $ref: '#/components/schemas/TransformationSchema'
      required:
        - name
        - description
        - function_name
        - function
        - input_schema
        - output_schema
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
    TransformationSchema:
      type: object
      additionalProperties:
        type: string
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