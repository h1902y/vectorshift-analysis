> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Run a pipeline in bulk

> Execute multiple instances of the same pipeline in parallel



## OpenAPI

````yaml api-reference/pipelines/pipeline.json POST /pipeline/{id}/bulk_run
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
  /pipeline/{id}/bulk_run:
    post:
      summary: Run multiple pipeline instances
      description: Execute multiple instances of the same pipeline in parallel
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
              $ref: '#/components/schemas/PipelineBulkRunRequest'
          multipart/form-data:
            schema:
              type: object
              properties:
                runs:
                  type: string
                  format: json
                runs.*.inputs:
                  type: string
                  format: json
                runs.*.conversation_id:
                  type: string
                runs.*.inputs.*:
                  type: string
                  format: binary
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PipelineBulkRunRequest'
      responses:
        '200':
          description: Bulk pipeline run successful
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
                  run_outputs:
                    type: array
                    items:
                      type: object
                      properties:
                        run_id:
                          type: string
                        outputs:
                          type: object
                          additionalProperties:
                            $ref: '#/components/schemas/DataType'
                      required:
                        - run_id
                        - outputs
                required:
                  - status
                  - run_outputs
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
    PipelineBulkRunRequest:
      type: object
      properties:
        runs:
          type: array
          items:
            $ref: '#/components/schemas/PipelineRunRequest'
      required:
        - runs
    DataType:
      description: Represents any valid input/output data type
      discriminator:
        propertyName: type
        mapping:
          map: '#/components/schemas/DataType/oneOf/5'
          file: '#/components/schemas/DataType/oneOf/6'
      oneOf:
        - type: string
        - type: integer
        - type: number
        - type: boolean
        - type: array
          items:
            $ref: '#/components/schemas/DataType'
        - type: object
          properties:
            type:
              type: string
              enum:
                - map
            items:
              type: object
              additionalProperties:
                $ref: '#/components/schemas/DataType'
          required:
            - type
            - items
          additionalProperties: false
        - type: object
          properties:
            type:
              type: string
              enum:
                - file
            raw_bytes:
              type: string
              format: base64
            metadata:
              type: object
              properties:
                name:
                  type: string
                path:
                  type: string
                mime_type:
                  type: string
          required:
            - type
            - raw_bytes
          additionalProperties: false
        - type: 'null'
    PipelineRunRequest:
      type: object
      properties:
        inputs:
          $ref: '#/components/schemas/InputsMap'
          description: Map of input names to their values
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
    InputsMap:
      type: object
      description: Map of input names to their values
      additionalProperties:
        $ref: '#/components/schemas/DataType'
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