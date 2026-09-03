> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Run a pipeline

> Execute a pipeline with the specified inputs and configuration



## OpenAPI

````yaml api-reference/pipelines/pipeline.json POST /pipeline/{id}/run
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
  /pipeline/{id}/run:
    post:
      summary: Run a pipeline
      description: Execute a pipeline with the specified inputs and configuration
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
              $ref: '#/components/schemas/PipelineRunRequest'
          multipart/form-data:
            schema:
              type: object
              properties:
                inputs:
                  type: string
                  format: json
                conversation_id:
                  type: string
                inputs.*:
                  type: string
                  format: binary
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PipelineRunRequest'
      responses:
        '200':
          description: Pipeline run successful
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
                  run_id:
                    type: string
                  outputs:
                    type: object
                    additionalProperties:
                      $ref: '#/components/schemas/DataType'
                required:
                  - status
                  - run_id
                  - outputs
            text/event-stream:
              schema:
                $ref: '#/components/schemas/PipelineStreamEvent'
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
    PipelineRunRequest:
      type: object
      properties:
        inputs:
          $ref: '#/components/schemas/InputsMap'
          description: Map of input names to their values
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
    PipelineStreamEvent:
      type: object
      properties:
        type:
          type: string
          enum:
            - stream
            - result
        run_id:
          type: string
        output_name:
          type: string
        output_value:
          type: object
      required:
        - type
        - run_id
        - output_name
        - output_value
    InputsMap:
      type: object
      description: Map of input names to their values
      additionalProperties:
        $ref: '#/components/schemas/DataType'
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