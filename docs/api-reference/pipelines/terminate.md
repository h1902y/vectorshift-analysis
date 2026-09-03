> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Terminate a pipeline run

> Stop a currently running pipeline instance



## OpenAPI

````yaml api-reference/pipelines/pipeline.json POST /pipeline/{id}/terminate
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
  /pipeline/{id}/terminate:
    post:
      summary: Terminate a running pipeline
      description: Stop a currently running pipeline instance
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
          description: Pipeline ID
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PipelineTerminateRequest'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PipelineTerminateRequest'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PipelineTerminateRequest'
      responses:
        '200':
          description: Pipeline terminated successfully
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
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '500':
          $ref: '#/components/responses/InternalError'
      security:
        - BearerAuth: []
components:
  schemas:
    PipelineTerminateRequest:
      type: object
      properties:
        run_id:
          type: string
      required:
        - run_id
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
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: Bearer token authentication using API key

````