> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Query a knowledge base



## OpenAPI

````yaml api-reference/knowledge-bases/knowledge_base.json POST /knowledge-base/{id}/query
openapi: 3.0.0
info:
  title: Knowledge Base API
  version: 1.0.0
  description: |
    API for managing knowledge bases and their documents.
    Authentication is required for all endpoints using Bearer token.

    Example: `Authorization: Bearer your-api-key-here`
servers:
  - url: https://api.vectorshift.ai/v1
security:
  - BearerAuth: []
paths:
  /knowledge-base/{id}/query:
    post:
      tags:
        - Knowledge Base
      summary: Query a knowledge base
      operationId: queryKnowledgeBase
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
          description: Knowledge base ID
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/QueryRequest'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/QueryRequest'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/QueryRequest'
      responses:
        '200':
          description: Query results
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
      security:
        - BearerAuth: []
components:
  schemas:
    QueryRequest:
      type: object
      required:
        - queries
      properties:
        queries:
          type: array
          items:
            type: string
        context:
          type: string
        search_metadata:
          type: object
          properties:
            filter:
              type: string
            opensearch_filter:
              type: string
            top_k:
              type: integer
            group_by_key:
              type: string
        config:
          type: object
          properties:
            rerank_documents:
              type: boolean
            generate_metadata_filters:
              type: boolean
            transform_query:
              type: boolean
            answer_multi_query:
              type: boolean
            expand_query:
              type: boolean
            do_advanced_qa:
              type: boolean
            format_context_for_llm:
              type: boolean
            generate_ai_doc_summaries:
              type: boolean
            retrieval_unit:
              type: string
            retrieval_config:
              type: object
              properties:
                max_documents:
                  type: integer
                data_fusion_method:
                  type: string
            reranking_config:
              type: object
              properties:
                reranking_model:
                  type: string
                api_key:
                  type: string
                num_chunks_to_rerank:
                  type: integer
            question_answering_config:
              type: object
              properties:
                qa_model:
                  type: string
                advanced_qa_mode:
                  type: string
            hybrid_search_config:
              type: object
              properties:
                alpha:
                  type: number
                  format: float
                fusion_method:
                  type: string
            score_cutoff:
              type: number
              format: float
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: Bearer token authentication using API key

````