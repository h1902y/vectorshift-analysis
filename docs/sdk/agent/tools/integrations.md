> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Integrations tools

> Tools for connected third-party services.

Add these tools with `AgentTools.<tool>(tool_name="...", ...)` or `agent.add_tool.<tool>(tool_name="...", ...)`. Every tool requires a unique `tool_name=`. Each entry lists the tool's configuration parameters. See the [Agent reference](/sdk/agent/reference) for attaching and running tools.

<a id="integration_airtable" />

## `integration_airtable` — Airtable

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_airtable(tool_name="...", action="delete_record", base_id="...", integration=..., table_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `delete_record`, `get_bases`, `get_table_schema`, `new_record`, `read_row`, `read_table`, `search_records`, `update_records`, `write_list_to_column`
  </Expandable>
</ParamField>

<ParamField path="base_id" type="str" required>
  Name of the Airtable base
</ParamField>

<ParamField path="integration" type="Any" required />

<ParamField path="table_id" type="str" required>
  Name of the table in the selected base
</ParamField>

<ParamField path="record_id" type="str">
  ID of the record to retrieve
</ParamField>

<ParamField path="limit" type="int">
  Maximum number of records to return (0 for all)
</ParamField>

<ParamField path="permission_level" type="str">
  Filter bases by permission levels (comma-separated if multiple selected)
</ParamField>

<ParamField path="return_all" type="bool">
  Return all bases without pagination. If false, uses the limit parameter
</ParamField>

<ParamField path="download_attachments" type="str">
  Comma seperated values of attachment fields to download files from
</ParamField>

<ParamField path="filter_formula" type="str">
  Airtable formula to filter records (optional) integration (Any)
</ParamField>

<ParamField path="sort_ascending" type="str">
  Comma-separated field names to sort in ascending order (e.g., 'Name, Email')
</ParamField>

<ParamField path="sort_descending" type="str">
  Comma-separated field names to sort in descending order (e.g., 'Priority, Date')
</ParamField>

<ParamField path="condition" type="str">
  Conditional Operator
</ParamField>

<ParamField path="update_all_matches" type="bool">
  If enabled, updates all records matching the criteria. If disabled, updates only the first matching record
</ParamField>

<a id="integration_algolia" />

## `integration_algolia` — Algolia

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_algolia(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="index" type="str" default="''">
  An index where the data used by Algolia is stored
</ParamField>

<ParamField path="integration" type="Any">
  Connect to your account
</ParamField>

<ParamField path="query" type="str" default="''">
  Keyword to be searched in the index
</ParamField>

<ParamField path="return_mode" type="Any">
  Choose between returning as chunks or JSON
</ParamField>

<ParamField path="action" type="str" default="''">
  Select the action to perform
</ParamField>

<a id="integration_apify" />

## `integration_apify` — Apify

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_apify(tool_name="...", action="get_last_run", actor_id="...", integration=..., run_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `get_last_run`, `get_run`, `list_actor_runs`, `list_dataset_items`, `list_key_value_store_record`, `list_user_runs`, `run_actor`, `run_actor_and_list_dataset`, `run_task`, `run_task_and_list_dataset`, `scrape_single_url`
  </Expandable>
</ParamField>

<ParamField path="actor_id" type="str" required>
  Actor ID or a tilde-separated username and Actor name
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="run_id" type="str" required>
  The ID of the run to retrieve
</ParamField>

<ParamField path="desc" type="bool">
  Whether to sort by startedAt in descending order exact\_date (Dict\[str, Any])
</ParamField>

<ParamField path="offset" type="int">
  Number of items to skip at the start
</ParamField>

<ParamField path="status" type="str">
  Filter by run status
</ParamField>

<ParamField path="dataset_id" type="str" required>
  Dataset ID or username\~dataset-name date\_range (Dict\[str, Any])
</ParamField>

<ParamField path="key" type="str" required>
  The key of the record to be retrieved
</ParamField>

<ParamField path="store_id" type="str" required>
  The ID of the Key-Value Store
</ParamField>

<ParamField path="build" type="str">
  Actor build tag to run. Defaults to latest
</ParamField>

<ParamField path="input" type="str">
  JSON input for the Actor run. If empty, uses default run configuration
</ParamField>

<ParamField path="memory" type="int">
  Memory limit for the run, in megabytes. Example: 1024 (1GB), 2048 (2GB), 4096 (4GB)
</ParamField>

<ParamField path="timeout" type="int">
  Optional timeout for the run, in seconds. Example: 3600 (1 hour). Set to 0 or leave empty for no timeout (only sent to API if value > 0)
</ParamField>

<ParamField path="wait_for_finish" type="bool">
  Whether to wait for the run to finish before continuing
</ParamField>

<ParamField path="task_id" type="str" required>
  Task ID or a tilde-separated username and task name
</ParamField>

<ParamField path="url" type="str" required>
  URL to be scraped. Must start with http\:// or https\://
</ParamField>

<a id="integration_apollo" />

## `integration_apollo` — Apollo

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_apollo(tool_name="...", action="enrich_company", integration=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `enrich_company`, `enrich_contact`, `fetch_companies`
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="domain" type="str">
  Company domain
</ParamField>

<ParamField path="company_name" type="str">
  Name of the company to search
</ParamField>

<ParamField path="first_name_input" type="str">
  Contact's first name
</ParamField>

<ParamField path="last_name_input" type="str">
  Contact's last name
</ParamField>

<ParamField path="linkedin_url_input" type="str">
  Contact's LinkedIn URL
</ParamField>

<ParamField path="keywords" type="str">
  Comma separated list of keywords the company should be associated with
</ParamField>

<ParamField path="location" type="str">
  Location of the company headquarters
</ParamField>

<ParamField path="max_size" type="str">
  Maximum number of employees in the company
</ParamField>

<ParamField path="min_size" type="str">
  Minimum number of employees in the company
</ParamField>

<ParamField path="num_results" type="str">
  Limit number of results
</ParamField>

<a id="integration_asana" />

## `integration_asana` — Asana

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_asana(tool_name="...", action="add_task_comment", integration=..., parent="...", text="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_task_comment`, `add_task_project`, `add_task_tag`, `create_project`, `create_subtask`, `create_task`, `delete_project`, `delete_task`, `get_projects`, `get_subtasks`, `get_tasks`, `get_users`, `move_task`, `read_project`, `read_task`, `read_user`, `remove_task_comment`, `remove_task_project`, `remove_task_tag`, `search_tasks`, `update_project`, `update_task`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Asana account
</ParamField>

<ParamField path="parent" type="str" required>
  The task to create the subtask in
</ParamField>

<ParamField path="project" type="str">
  The project to create the task in
</ParamField>

<ParamField path="section" type="str">
  The section to create the task in
</ParamField>

<ParamField path="text" type="str" required>
  Text to search for in task names and descriptions
</ParamField>

<ParamField path="workspace" type="str">
  The Asana workspace
</ParamField>

<ParamField path="task" type="str">
  The task to get details from
</ParamField>

<ParamField path="tag" type="str" required>
  The tag to add
</ParamField>

<ParamField path="name" type="str">
  The name of the project to create
</ParamField>

<ParamField path="notes" type="str">
  Notes or description for the project
</ParamField>

<ParamField path="public" type="bool">
  Whether the project should be public
</ParamField>

<ParamField path="team" type="str">
  The team to create the project in
</ParamField>

<ParamField path="assignee" type="str">
  Email of the person to assign the task to
</ParamField>

<ParamField path="due_on" type="str">
  Due date for the task (YYYY-MM-DD format)
</ParamField>

<ParamField path="archived" type="bool">
  Whether to include archived projects in the results
</ParamField>

<ParamField path="limit" type="int">
  Maximum number of projects to return (1-100)
</ParamField>

<ParamField path="completed_since" type="str">
  Only return tasks completed after this time (optional)
</ParamField>

<ParamField path="target_project" type="str">
  The project to move the task to
</ParamField>

<ParamField path="target_section" type="str">
  The section within the project to move the task to (optional)
</ParamField>

<ParamField path="target_workspace" type="str">
  The Asana workspace to move the task to
</ParamField>

<ParamField path="user_gid" type="str" required>
  The global ID of the user to retrieve (optional, defaults to current user)
</ParamField>

<ParamField path="comment_gid" type="str" required>
  The global ID of the comment to remove
</ParamField>

<ParamField path="completed" type="bool">
  Whether to mark the task as completed
</ParamField>

<a id="integration_aws_s_3" />

## `integration_aws_s_3` — AWS S3

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_aws_s_3(tool_name="...", action="copy_file", destination_key="...", integration=..., source_key="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `copy_file`, `create_bucket`, `create_folder`, `delete_bucket`, `delete_file`, `delete_folder`, `download_file`, `list_buckets`, `list_files`, `list_folders`, `search_bucket`, `upload_file`
  </Expandable>
</ParamField>

<ParamField path="destination_key" type="str" required>
  Select the folder and enter the filename
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your AWS account
</ParamField>

<ParamField path="source_key" type="str" required>
  Select the source object
</ParamField>

<ParamField path="bucket_name" type="str" required>
  Enter the name of the bucket to create
</ParamField>

<ParamField path="region" type="str" required>
  AWS region for the bucket
</ParamField>

<ParamField path="public_read_access" type="bool">
  Allow public read access to objects
</ParamField>

<ParamField path="versioning_enabled" type="bool">
  Enable object versioning for this bucket
</ParamField>

<ParamField path="folder_name" type="str" required>
  Name of the new folder to create
</ParamField>

<ParamField path="parent_folder_id" type="str">
  Select the parent folder (optional - leave empty to create in bucket root)
</ParamField>

<ParamField path="object_key" type="str" required>
  Enter the key (path) for the object
</ParamField>

<ParamField path="force_delete" type="bool">
  Delete folder even if it contains files
</ParamField>

<ParamField path="max_keys" type="int">
  Maximum number of objects to return
</ParamField>

<ParamField path="prefix" type="str">
  Filter objects by prefix
</ParamField>

<ParamField path="delimiter" type="str">
  Delimiter for folder structure
</ParamField>

<ParamField path="search_query" type="str" required>
  Search for objects containing this text in their key
</ParamField>

<ParamField path="max_results" type="int">
  Maximum number of results to return
</ParamField>

<ParamField path="file" type="str" required>
  Select a file to upload
</ParamField>

<ParamField path="content_type" type="str">
  MIME type of the file (optional)
</ParamField>

<ParamField path="metadata" type="str">
  Custom metadata as JSON
</ParamField>

<ParamField path="storage_class" type="str">
  Select the storage class
</ParamField>

<a id="integration_bland_ai" />

## `integration_bland_ai` — Bland AI

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_bland_ai(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="first_sentence" type="str" default="''">
  The first sentence the AI should speak during the call
</ParamField>

<ParamField path="integration" type="Any">
  Connect to your account
</ParamField>

<ParamField path="model" type="Any">
  LLM model that the AI should use
</ParamField>

<ParamField path="pathway_id" type="str" default="''">
  This is the pathway ID for the pathway you have created on your dev portal.
</ParamField>

<ParamField path="phone_number" type="str" default="''">
  The phone number of the contact you want to call
</ParamField>

<ParamField path="task" type="str" default="''">
  The objective you want the AI to accomplish during the call
</ParamField>

<ParamField path="temperature" type="str" default="''">
  A value between 0 and 1 that controls the randomness of the LLM. 0 will cause more deterministic outputs while 1 will cause more random
</ParamField>

<ParamField path="transfer_number" type="str" default="''">
  A phone number that the agent can transfer to under specific conditions - such as being asked to speak to a human or supervisor
</ParamField>

<ParamField path="wait_for_greeting" type="bool" default="False">
  When checked, the agent will wait for the call recipient to speak first before responding
</ParamField>

<ParamField path="action" type="str" default="''">
  Select the action to perform
</ParamField>

<a id="integration_box" />

## `integration_box` — Box

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_box(tool_name="...", action="copy_file", destination_folder_id="...", file_id="...", integration=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `copy_file`, `create_folder`, `delete_file`, `delete_folder`, `download_file`, `list_folders`, `read_file`, `read_folder`, `search_files`, `search_files_and_folders`, `share_file`, `share_folder`, `update_folder`, `upload_files`
  </Expandable>
</ParamField>

<ParamField path="destination_folder_id" type="str" required>
  Select the destination folder
</ParamField>

<ParamField path="file_id" type="str" required>
  Select the file to copy
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="new_name" type="str">
  Name for the copied file (optional)
</ParamField>

<ParamField path="folder_name" type="str" required>
  Name of the folder to create
</ParamField>

<ParamField path="parent_folder_id" type="str" required>
  Select the parent folder where the new folder will be created
</ParamField>

<ParamField path="folder_id" type="str">
  Select the Folder to upload files to
</ParamField>

<ParamField path="recursive" type="bool">
  Delete folder and all its contents (use with caution)
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of results to return (default: 10)
</ParamField>

<ParamField path="query" type="str" required>
  Search query to find files
</ParamField>

<ParamField path="file_extensions" type="list[str]">
  Filter by file extensions (optional)
</ParamField>

<ParamField path="offset" type="int">
  Number of records to skip from the start. Must be a multiple of the limit value (e.g., if limit is 6, valid offsets are 0, 6, 12, ...)
</ParamField>

<ParamField path="type" type="str" required>
  Type of item to search for
</ParamField>

<ParamField path="access" type="str">
  Access level for the shared link
</ParamField>

<ParamField path="can_download" type="bool">
  Whether users can download the file
</ParamField>

<ParamField path="can_preview" type="bool">
  Whether users can preview the file
</ParamField>

<ParamField path="description" type="str">
  Description for the folder (optional)
</ParamField>

<ParamField path="files" type="list[str]" required>
  The number of files to be appended. Files will be appended in successive fashion (e.g., file-1 first, then file-2, etc.)
</ParamField>

<a id="integration_clickup" />

## `integration_clickup` — ClickUp

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_clickup(tool_name="...", action="add_task_tag", integration=..., tag_name="...", time_entry_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_task_tag`, `add_task_to_list`, `add_time_entry_tag`, `create_checklist`, `create_checklist_item`, `create_comment`, `create_folder`, `create_goal`, `create_goal_key_result`, `create_list`, `create_space`, `create_space_tag`, `create_task`, `create_task_dependency`, `create_time_entry`, `delete_checklist`, `delete_checklist_item`, `delete_comment`, `delete_folder`, `delete_goal`, `delete_goal_key_result`, `delete_list`, `delete_space`, `delete_space_tag`, `delete_task`, `delete_task_dependency`, `delete_time_entry`, `get_comments`, `get_custom_fields`, `get_folders`, `get_goals`, `get_list_members`, `get_lists`, `get_space_tags`, `get_task_members`, `get_tasks`, `get_time_entries`, `get_time_entry_tags`, `read_folder`, `read_goal`, `read_list`, `read_space`, `read_task`, `read_time_entry`, `remove_task_from_list`, `remove_task_tag`, `remove_time_entry_tag`, `set_custom_field`, `start_time_entry`, `stop_time_entry`, `update_checklist`, `update_checklist_item`, `update_comment`, `update_folder`, `update_goal`, `update_goal_key_result`, `update_list`, `update_space_tag`, `update_task`, `update_time_entry`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="tag_name" type="str" required>
  Name of the tag
</ParamField>

<ParamField path="task_id" type="str">
  The ID of the task to read
</ParamField>

<ParamField path="folder_id" type="str">
  The ID of the folder
</ParamField>

<ParamField path="list_id" type="str">
  The ID of the list where task will be created
</ParamField>

<ParamField path="space_id" type="str">
  The ID of the space
</ParamField>

<ParamField path="team_id" type="str">
  The ID of the team
</ParamField>

<ParamField path="time_entry_id" type="str" required>
  The ID of the time entry to delete
</ParamField>

<ParamField path="background_color" type="str">
  Background color for the tag(s) in hex format (applies to all tags if multiple)
</ParamField>

<ParamField path="foreground_color" type="str">
  Foreground (text) color for the tag(s) in hex format (applies to all tags if multiple)
</ParamField>

<ParamField path="checklist_name" type="str" required>
  Name of the checklist
</ParamField>

<ParamField path="checklist_id" type="str" required>
  The ID of the checklist to delete
</ParamField>

<ParamField path="checklist_item_name" type="str" required>
  Name of the checklist item
</ParamField>

<ParamField path="checklist_item_assignee" type="str">
  User ID to assign to this checklist item
</ParamField>

<ParamField path="comment_on" type="str" required>
  Select where to add the comment
</ParamField>

<ParamField path="comment_text" type="str" required>
  Content of the comment
</ParamField>

<ParamField path="assign_user" type="str">
  User ID to assign to this comment
</ParamField>

<ParamField path="notify_all" type="bool">
  Notify all members when task is created
</ParamField>

<ParamField path="view_id" type="str">
  The ID of the view to add comment to (required when Comment On is 'View')
</ParamField>

<ParamField path="folder_name" type="str" required>
  Name of the folder
</ParamField>

<ParamField path="goal_name" type="str" required>
  Name of the goal
</ParamField>

<ParamField path="goal_color" type="str">
  Color for the goal
</ParamField>

<ParamField path="goal_description" type="str">
  Description of the goal
</ParamField>

<ParamField path="goal_due_date" type="str">
  Due date for the goal (YYYY-MM-DD or RFC3339)
</ParamField>

<ParamField path="goal_multiple_owners" type="bool">
  Allow multiple owners
</ParamField>

<ParamField path="goal_owners" type="str">
  Comma-separated list of owner user IDs
</ParamField>

<ParamField path="goal_id" type="str" required>
  The ID of the goal to delete
</ParamField>

<ParamField path="key_result_name" type="str" required>
  Name of the key result
</ParamField>

<ParamField path="key_result_list_ids" type="str">
  Comma-separated list of list IDs
</ParamField>

<ParamField path="key_result_owners" type="str">
  Comma-separated list of owner user IDs
</ParamField>

<ParamField path="key_result_steps_end" type="int">
  Target value for the key result
</ParamField>

<ParamField path="key_result_steps_start" type="int">
  Starting value for the key result
</ParamField>

<ParamField path="key_result_task_ids" type="str">
  Comma-separated list of task IDs
</ParamField>

<ParamField path="key_result_type" type="str">
  Type of key result
</ParamField>

<ParamField path="key_result_unit" type="str">
  Unit for the key result
</ParamField>

<ParamField path="list_name" type="str" required>
  Name of the list
</ParamField>

<ParamField path="folderless" type="bool">
  If enabled, create list at space root level without a folder
</ParamField>

<ParamField path="list_content" type="str">
  Description of the list
</ParamField>

<ParamField path="space_name" type="str" required>
  Name of the space
</ParamField>

<ParamField path="enable_custom_fields" type="bool">
  Allow custom fields
</ParamField>

<ParamField path="enable_dependency_warnings" type="bool">
  Allow dependency warnings
</ParamField>

<ParamField path="enable_incomplete_warnings" type="bool">
  Allow incomplete warnings
</ParamField>

<ParamField path="enable_priority" type="bool">
  Allow priority
</ParamField>

<ParamField path="enable_tags" type="bool">
  Allow tags
</ParamField>

<ParamField path="enable_time_tracking" type="bool">
  Allow time tracking
</ParamField>

<ParamField path="space_multiple_assignees" type="bool">
  Allow multiple assignees
</ParamField>

<ParamField path="tag_background_color" type="str">
  Background color for the tag
</ParamField>

<ParamField path="tag_foreground_color" type="str">
  Foreground color for the tag
</ParamField>

<ParamField path="task_description" type="str" required>
  Description of the task
</ParamField>

<ParamField path="task_name" type="str" required>
  Name of the task
</ParamField>

<ParamField path="markdown_content" type="str">
  Task content in markdown format
</ParamField>

<ParamField path="parent_id" type="str">
  ID of the parent task (for subtasks)
</ParamField>

<ParamField path="task_assignees" type="str">
  List of assignee IDs
</ParamField>

<ParamField path="task_due_date" type="str">
  Due date for the task (timestamp)
</ParamField>

<ParamField path="task_priority" type="str">
  Priority of the task
</ParamField>

<ParamField path="task_start_date" type="str">
  Start date for the task (timestamp)
</ParamField>

<ParamField path="task_status" type="str">
  Status of the task
</ParamField>

<ParamField path="task_tags" type="str">
  List of tags for the task
</ParamField>

<ParamField path="time_estimate" type="int">
  Time estimate for the task in hours
</ParamField>

<ParamField path="depends_on_task_id" type="str" required>
  The ID of the task that this task depends on
</ParamField>

<ParamField path="duration_minutes" type="int" required>
  Duration in minutes
</ParamField>

<ParamField path="start_time" type="str" required>
  Start time for the time entry (ISO 8601 format)
</ParamField>

<ParamField path="time_entry_assignee" type="str">
  Assignee user ID for the time entry
</ParamField>

<ParamField path="time_entry_billable" type="bool">
  Mark time entry as billable
</ParamField>

<ParamField path="time_entry_description" type="str">
  Description of the time entry
</ParamField>

<ParamField path="time_entry_tags" type="str">
  Comma-separated list of tags or JSON objects
</ParamField>

<ParamField path="checklist_item_id" type="str" required>
  The ID of the checklist item to delete
</ParamField>

<ParamField path="comment_id" type="str" required>
  The ID of the comment to update (comment under task or list)
</ParamField>

<ParamField path="key_result_id" type="str" required>
  The ID of the key result to delete
</ParamField>

<ParamField path="archived" type="bool">
  Show archived tasks
</ParamField>

<ParamField path="limit" type="int">
  Maximum number of folders to retrieve
</ParamField>

<ParamField path="include_completed" type="bool">
  Include completed goals
</ParamField>

<ParamField path="custom_task_ids" type="bool">
  Use custom task IDs
</ParamField>

<ParamField path="assignees" type="str">
  Filter by assignee (requires Team, Space, Folder, and List to be selected first)
</ParamField>

<ParamField path="custom_fields" type="str">
  Custom field filters in JSON format: \{"field\_id": "value"}
</ParamField>

<ParamField path="date_updated_gt" type="str">
  Tasks updated after this date (YYYY-MM-DD)
</ParamField>

<ParamField path="date_updated_lt" type="str">
  Tasks updated before this date (YYYY-MM-DD)
</ParamField>

<ParamField path="due_date_gt" type="str">
  Tasks due after this date (YYYY-MM-DD)
</ParamField>

<ParamField path="due_date_lt" type="str">
  Tasks due before this date (YYYY-MM-DD)
</ParamField>

<ParamField path="include_closed" type="bool">
  Include closed tasks
</ParamField>

<ParamField path="include_markdown_description" type="bool">
  Include markdown description
</ParamField>

<ParamField path="order_by" type="str">
  Sort tasks by field (created, updated, due\_date, etc.)
</ParamField>

<ParamField path="reverse" type="bool">
  Reverse the sort order
</ParamField>

<ParamField path="statuses" type="str">
  Filter by specific task statuses (requires Team, Space, Folder, and List to be selected first)
</ParamField>

<ParamField path="subtasks" type="bool">
  Include subtasks
</ParamField>

<ParamField path="tags" type="str">
  Filter by tag names
</ParamField>

<ParamField path="assignee" type="str">
  Filter by assignee user ID
</ParamField>

<ParamField path="include_location_names" type="bool">
  Include location names
</ParamField>

<ParamField path="get_running" type="bool">
  Get currently running time entry
</ParamField>

<ParamField path="custom_field_id" type="str" required>
  The ID of the custom field
</ParamField>

<ParamField path="custom_field_value" type="str" required>
  The value to set for the custom field
</ParamField>

<ParamField path="update_checklist_name" type="str">
  New name for the checklist
</ParamField>

<ParamField path="update_checklist_position" type="int">
  New position for the checklist
</ParamField>

<ParamField path="update_checklist_item_assignee" type="str">
  New assignee for the checklist item
</ParamField>

<ParamField path="update_checklist_item_name" type="str">
  New name for the checklist item
</ParamField>

<ParamField path="update_checklist_item_parent" type="str">
  New parent for the checklist item
</ParamField>

<ParamField path="update_checklist_item_resolved" type="bool">
  Mark checklist item as resolved
</ParamField>

<ParamField path="update_comment_assignee" type="str">
  User ID to assign the comment to
</ParamField>

<ParamField path="update_comment_resolved" type="bool">
  Mark the comment as resolved
</ParamField>

<ParamField path="update_comment_text" type="str">
  New content for the comment
</ParamField>

<ParamField path="update_folder_name" type="str" required>
  New name for the folder
</ParamField>

<ParamField path="update_goal_add_owners" type="str">
  Comma-separated list of owner user IDs to add
</ParamField>

<ParamField path="update_goal_color" type="str">
  New color for the goal
</ParamField>

<ParamField path="update_goal_description" type="str">
  New description for the goal
</ParamField>

<ParamField path="update_goal_due_date" type="str">
  New due date for the goal (YYYY-MM-DD or RFC3339)
</ParamField>

<ParamField path="update_goal_name" type="str">
  New name for the goal
</ParamField>

<ParamField path="update_goal_remove_owners" type="str">
  Comma-separated list of owner user IDs to remove
</ParamField>

<ParamField path="update_key_result_name" type="str">
  New name for the key result
</ParamField>

<ParamField path="update_key_result_note" type="str">
  New note for the key result
</ParamField>

<ParamField path="update_key_result_steps_current" type="int">
  Current progress value
</ParamField>

<ParamField path="update_key_result_steps_end" type="int">
  New target value
</ParamField>

<ParamField path="update_key_result_steps_start" type="int">
  New starting value
</ParamField>

<ParamField path="update_key_result_unit" type="str">
  New unit for the key result
</ParamField>

<ParamField path="update_list_content" type="str">
  New description for the list
</ParamField>

<ParamField path="update_list_name" type="str">
  New name for the list
</ParamField>

<ParamField path="new_tag_name" type="str">
  New name for the tag
</ParamField>

<ParamField path="remove_all_assignees" type="bool">
  If enabled, all assignees will be removed from the task
</ParamField>

<ParamField path="update_markdown_content" type="str">
  Task content in markdown format
</ParamField>

<ParamField path="update_parent_id" type="str">
  New parent task ID (for subtasks)
</ParamField>

<ParamField path="update_task_assignees" type="str">
  New list of assignee IDs (will not work if remove\_assignees is enabled)
</ParamField>

<ParamField path="update_task_description" type="str">
  New description for the task
</ParamField>

<ParamField path="update_task_due_date" type="str">
  New due date for the task (timestamp)
</ParamField>

<ParamField path="update_task_name" type="str">
  New name for the task
</ParamField>

<ParamField path="update_task_priority" type="str">
  New priority for the task
</ParamField>

<ParamField path="update_task_start_date" type="str">
  New start date for the task (timestamp)
</ParamField>

<ParamField path="update_task_status" type="str">
  New status for the task
</ParamField>

<ParamField path="update_task_tags" type="str">
  New list of tags for the task
</ParamField>

<ParamField path="update_time_estimate" type="int">
  New time estimate for the task in hours
</ParamField>

<ParamField path="update_time_entry_billable" type="bool">
  Mark time entry as billable
</ParamField>

<ParamField path="update_time_entry_description" type="str">
  New description for the time entry
</ParamField>

<ParamField path="update_time_entry_duration_minutes" type="int">
  New duration in minutes
</ParamField>

<ParamField path="update_time_entry_start" type="str">
  New start time (RFC3339 format)
</ParamField>

<ParamField path="update_time_entry_task_id" type="str">
  New task ID for the time entry
</ParamField>

<a id="integration_cobalt" />

## `integration_cobalt` — Cobalt

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_cobalt(tool_name="...", action="create_cashflow", amount=0, classification_uid="...", integration=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `create_cashflow`, `create_company`, `create_custom_field_value`, `create_deal`, `create_fund`, `create_investment_update`, `create_portfolio`, `delete_cashflow`, `delete_company`, `delete_custom_field_value`, `delete_deal`, `delete_fund`, `delete_investment_update`, `delete_metric_value`, `delete_portfolio`, `get_calculated_values`, `get_cashflow`, `get_company`, `get_custom_field_values`, `get_deal`, `get_fund`, `get_investment_update`, `get_metric_values`, `get_portfolio`, `list_cashflows`, `list_companies`, `list_custom_fields`, `list_deals`, `list_funds`, `list_investment_update_types`, `list_investment_updates`, `list_metrics`, `list_portfolios`, `record_metric_value`
  </Expandable>
</ParamField>

<ParamField path="aggregation_type" type="str">
  gross requires deal\_id; net forbids it
</ParamField>

<ParamField path="amount" type="float" required>
  Cashflow amount (positive for distribution, negative for contribution)
</ParamField>

<ParamField path="classification_uid" type="str" required>
  Cobalt cashflow classification
</ParamField>

<ParamField path="date" type="str">
  Date the cashflow occurred
</ParamField>

<ParamField path="fund_id" type="str">
  Select a fund
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Cobalt account
</ParamField>

<ParamField path="deal_id" type="str">
  Select a deal under the chosen fund
</ParamField>

<ParamField path="investment_currency_amount" type="float">
  Amount in the deal's investment currency (optional)
</ParamField>

<ParamField path="note" type="str">
  Optional note attached to the cashflow
</ParamField>

<ParamField path="name" type="str" required>
  Name of the portfolio to create
</ParamField>

<ParamField path="currency" type="str">
  ISO currency code (e.g. USD)
</ParamField>

<ParamField path="fiscal_quarter_1" type="str">
  End date of fiscal Q1
</ParamField>

<ParamField path="fiscal_quarter_2" type="str">
  End date of fiscal Q2
</ParamField>

<ParamField path="fiscal_quarter_3" type="str">
  End date of fiscal Q3
</ParamField>

<ParamField path="fiscal_quarter_4" type="str">
  End date of fiscal Q4 (must equal Fiscal Year End)
</ParamField>

<ParamField path="fiscal_year_end" type="str">
  Optional. If supplied, all four fiscal quarters must also be supplied and fiscal\_year\_end must equal fiscal\_quarter\_4
</ParamField>

<ParamField path="custom_field_id" type="str" required>
  Custom field definition to record against
</ParamField>

<ParamField path="value" type="float | str" required>
  Numeric value to record
</ParamField>

<ParamField path="company_id" type="str">
  Select a company
</ParamField>

<ParamField path="acquisition_date" type="str">
  Date the deal was acquired
</ParamField>

<ParamField path="commitment" type="float">
  Total commitment amount in the selected currency
</ParamField>

<ParamField path="currency_symbol" type="str">
  ISO currency code (e.g. USD)
</ParamField>

<ParamField path="exit_date" type="str">
  Date the deal was exited (optional)
</ParamField>

<ParamField path="round_name" type="str">
  Funding round label
</ParamField>

<ParamField path="as_of_date" type="str">
  Snapshot date for the calculation (optional)
</ParamField>

<ParamField path="update_type_id" type="str" required>
  Cobalt investment update type
</ParamField>

<ParamField path="text" type="str">
  Plain text only — Cobalt rejects rich text via API
</ParamField>

<ParamField path="title" type="str">
  Title of the investment update
</ParamField>

<ParamField path="fund_ids" type="str">
  Select funds from dropdown, or enter fund IDs comma-separated. Cannot be modified after creation.
</ParamField>

<ParamField path="cashflow_id" type="str" required>
  Cobalt cashflow UID
</ParamField>

<ParamField path="custom_field_value_id" type="str" required>
  Cobalt UID of the custom field value to delete
</ParamField>

<ParamField path="update_id" type="str" required>
  Cobalt UID of the investment update
</ParamField>

<ParamField path="metric_value_id" type="str" required>
  Cobalt UID of the metric value to delete
</ParamField>

<ParamField path="portfolio_id" type="str">
  Select a portfolio
</ParamField>

<ParamField path="cashflow_type" type="str">
  Use net or gross cashflows in the calculation. Defaults to net.
</ParamField>

<ParamField path="start_date" type="str">
  Earliest date to include in the calculation (optional)
</ParamField>

<ParamField path="entity_id" type="str" required>
  Fund / Company / Deal / Cashflow UID. Accepts a single ID, a list, or a comma-separated string.
</ParamField>

<ParamField path="custom_field_ids" type="str">
  Accepts a single ID, a list, or a comma-separated string.
</ParamField>

<ParamField path="limit" type="int">
  Maximum number of portfolios to retrieve (ignored when Return All is on)
</ParamField>

<ParamField path="offset" type="int">
  Number of portfolios to skip (for paging)
</ParamField>

<ParamField path="metric_set_id" type="str" required>
  Cobalt UID of the metric set to record against
</ParamField>

<ParamField path="end_date" type="str">
  Latest date to include (when filter is enabled)
</ParamField>

<ParamField path="use_date" type="bool">
  Apply the start/end date filter
</ParamField>

<ParamField path="sort" type="str">
  Sort order for the returned portfolios
</ParamField>

<ParamField path="include_external" type="bool">
  Include deals from external funds/investors
</ParamField>

<ParamField path="update_type_ids" type="str">
  Update type UIDs to filter by. Accepts a single ID, a list, or a comma-separated string.
</ParamField>

<a id="integration_coda" />

## `integration_coda` — Coda

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_coda(tool_name="...", action="create_row", cells="...", doc_id="...", integration=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the Coda operation to perform

  <Expandable title="Allowed values">
    `create_row`, `delete_rows`, `delete_view_row`, `get_column`, `get_control`, `get_formula`, `get_row`, `get_view`, `list_columns`, `list_controls`, `list_formulas`, `list_rows`, `list_view_columns`, `list_view_rows`, `list_views`, `push_button`, `push_view_button`, `update_row`
  </Expandable>
</ParamField>

<ParamField path="cells" type="str" required>
  JSON object with column-value pairs to insert
</ParamField>

<ParamField path="doc_id" type="str" required>
  Choose the Coda document
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Coda account
</ParamField>

<ParamField path="table_id" type="str" required>
  Choose the table to insert into
</ParamField>

<ParamField path="key_columns" type="list[str]">
  Optional key columns for upsert behavior
</ParamField>

<ParamField path="row_ids" type="list[str]" required>
  List of row IDs to delete
</ParamField>

<ParamField path="row_id" type="str" required>
  The ID of the row to retrieve
</ParamField>

<ParamField path="view_id" type="str" required>
  Choose the view to retrieve
</ParamField>

<ParamField path="column_id" type="str" required>
  Choose the column to retrieve
</ParamField>

<ParamField path="control_id" type="str" required>
  The ID of the control to retrieve
</ParamField>

<ParamField path="formula_id" type="str" required>
  The ID of the formula to retrieve
</ParamField>

<ParamField path="use_column_names" type="bool">
  Return column names instead of IDs
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of controls to return
</ParamField>

<a id="integration_copper" />

## `integration_copper` — Copper

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_copper(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="email" type="str" default="''">
  The email of the lead
</ParamField>

<ParamField path="integration" type="Any">
  Connect to your account
</ParamField>

<ParamField path="name" type="str" default="''">
  The name of the lead
</ParamField>

<ParamField path="action" type="str" default="''">
  Select the action to perform
</ParamField>

<a id="integration_databricks" />

## `integration_databricks` — Databricks

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_databricks(tool_name="...", action="create_cluster", cluster_name="...", integration=..., node_type_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `create_cluster`, `create_directory`, `create_job`, `delete_cluster`, `delete_directory`, `delete_file`, `execute_query`, `get_clusters`, `get_directory_contents`, `get_groups`, `insert_row`, `read_cluster`, `upload_file`
  </Expandable>
</ParamField>

<ParamField path="cluster_name" type="str" required>
  Name of the cluster
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="node_type_id" type="str" required>
  Node type for cluster instances
</ParamField>

<ParamField path="num_workers" type="int" required>
  Number of worker nodes
</ParamField>

<ParamField path="spark_version" type="str" required>
  Spark version for the cluster
</ParamField>

<ParamField path="autotermination_minutes" type="int">
  Auto-termination time in minutes ( Set to 0 to disable auto-termination )
</ParamField>

<ParamField path="enable_elastic_disk" type="bool">
  Enable elastic disk for the cluster
</ParamField>

<ParamField path="path" type="str" required>
  Path of the directory to create
</ParamField>

<ParamField path="cluster_id" type="str" required>
  ID of the cluster to delete
</ParamField>

<ParamField path="job_name" type="str" required>
  Name of the job
</ParamField>

<ParamField path="notebook_path" type="str" required>
  Path to the notebook
</ParamField>

<ParamField path="max_concurrent_runs" type="int">
  Maximum number of concurrent runs
</ParamField>

<ParamField path="timeout_seconds" type="int">
  Timeout in seconds
</ParamField>

<ParamField path="recursive" type="bool">
  Delete directory recursively
</ParamField>

<ParamField path="catalog_name" type="str">
  Select the name of the Catalog
</ParamField>

<ParamField path="on_wait_timeout" type="str">
  Action to take when timeout is reached
</ParamField>

<ParamField path="query" type="str">
  SQL query to execute against the Databricks SQL Warehouse
</ParamField>

<ParamField path="schema_name" type="str">
  Select the name of the Schema
</ParamField>

<ParamField path="wait_timeout" type="str">
  Timeout for waiting for query completion (e.g., 30s, 1m, 5m)
</ParamField>

<ParamField path="warehouse_id" type="str">
  Select the ID of the Warehouse to perform the action
</ParamField>

<ParamField path="num_messages" type="int" required>
  Maximum number of clusters to retrieve
</ParamField>

<ParamField path="table_name" type="str" required>
  Select the name of Table to insert the row
</ParamField>

<ParamField path="file" type="str" required>
  File to upload
</ParamField>

<ParamField path="overwrite" type="bool">
  Overwrite existing file
</ParamField>

<a id="integration_datadog" />

## `integration_datadog` — Datadog

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_datadog(tool_name="...", action="delete", endpoint="...", integration=..., body="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the HTTP method to use
  One of: `delete`, `get`, `head`, `options`, `patch`, `post`, `put`
</ParamField>

<ParamField path="endpoint" type="str" required>
  The API endpoint path (e.g., /api/v1/dashboard)
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Datadog account
</ParamField>

<ParamField path="headers" type="str">
  Additional headers as JSON object (optional)
</ParamField>

<ParamField path="query_params" type="str">
  Query parameters as JSON object (optional)
</ParamField>

<ParamField path="data_path" type="str">
  JSON path to the array of results in the response (e.g., 'data', 'monitors', 'dashboards')
</ParamField>

<ParamField path="max_pages" type="int">
  Maximum number of pages to fetch (default: 10, set to 0 for unlimited)
</ParamField>

<ParamField path="page_size" type="int">
  Number of items per page (default: 100)
</ParamField>

<ParamField path="paginate" type="bool">
  Enable automatic pagination to fetch all results
</ParamField>

<ParamField path="pagination_type" type="str">
  Type of pagination: 'offset' (page\[offset]/page\[limit]) or 'cursor' (page\[cursor])
</ParamField>

<ParamField path="body" type="str" required>
  Request body as JSON
</ParamField>

<a id="integration_discord" />

## `integration_discord` — Discord

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_discord(tool_name="...", action="add_member_role", integration=..., role_id="...", user_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_member_role`, `create_channel`, `delete_channel`, `delete_message`, `get_channel`, `get_message`, `list_channels`, `list_members`, `list_messages`, `react_with_emoji`, `remove_member_role`, `send_message`, `update_channel`
  </Expandable>
</ParamField>

<ParamField path="guild_id" type="str">
  Select the Discord server
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="role_id" type="str" required>
  Select the role to add
</ParamField>

<ParamField path="user_id" type="str" required>
  ID of the user to add the role to
</ParamField>

<ParamField path="reason" type="str">
  Reason for adding the role (optional)
</ParamField>

<ParamField path="channel_name" type="str">
  Name of the channel to create
</ParamField>

<ParamField path="channel_type" type="str">
  Type of the channel to create
</ParamField>

<ParamField path="topic" type="str">
  Topic for the channel (optional)
</ParamField>

<ParamField path="channel_id" type="str" required>
  Select the channel to delete
</ParamField>

<ParamField path="message_id" type="str" required>
  ID of the message to delete
</ParamField>

<ParamField path="limit" type="int">
  Maximum number of channels to retrieve
</ParamField>

<ParamField path="after" type="str">
  Get messages after this message ID (optional)
</ParamField>

<ParamField path="before" type="str">
  Get messages before this message ID (optional)
</ParamField>

<ParamField path="emoji" type="str" required>
  Emoji to react with (unicode or :name:)
</ParamField>

<ParamField path="message" type="str" required>
  The message to send
</ParamField>

<ParamField path="tts" type="bool">
  Whether the message should be read aloud
</ParamField>

<a id="integration_docusign" />

## `integration_docusign` — DocuSign

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_docusign(tool_name="...", action="create_envelope", integration=..., envelope_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `create_envelope`, `get_envelope`, `list_envelopes`, `send_envelope`, `update_envelope`
</ParamField>

<ParamField path="email_subject" type="str">
  Subject line of the envelope email
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Docusign account
</ParamField>

<ParamField path="add_date_signed" type="bool">
  Add a date signed field next to signature
</ParamField>

<ParamField path="add_signature" type="bool">
  Add a signature field for the first signer
</ParamField>

<ParamField path="cc_emails" type="str">
  Email(s) to receive a copy (comma-separated)
</ParamField>

<ParamField path="cc_names" type="str">
  Name(s) of CC recipients (comma-separated, same order as emails) date\_range (Dict\[str, Any])
</ParamField>

<ParamField path="documents" type="list[str]">
  Files to be signed (PDF, Word, etc.)
</ParamField>

<ParamField path="email_blurb" type="str">
  Body text of the envelope email
</ParamField>

<ParamField path="expire_after" type="int">
  Number of days until envelope expires (0 = use account default)
</ParamField>

<ParamField path="expire_enabled" type="bool">
  Enable envelope expiration
</ParamField>

<ParamField path="expire_warn" type="int">
  Days before expiration to warn signers (0 = use account default)
</ParamField>

<ParamField path="reminder_delay" type="int">
  Days to wait before sending first reminder (0 = use account default)
</ParamField>

<ParamField path="reminder_enabled" type="bool">
  Send automatic reminders to signers
</ParamField>

<ParamField path="reminder_frequency" type="int">
  Days between reminder emails (0 = use account default)
</ParamField>

<ParamField path="signature_anchor" type="str">
  Text in document to place signature near (overrides position)
</ParamField>

<ParamField path="signature_position" type="str">
  Where to place the signature on the first page
</ParamField>

<ParamField path="signer_can_sign_on_mobile" type="bool">
  Allow signers to sign on mobile devices
</ParamField>

<ParamField path="signer_emails" type="str">
  Email address(es) of signers (comma-separated for multiple)
</ParamField>

<ParamField path="signer_names" type="str">
  Full name(s) of signers (comma-separated, same order as emails)
</ParamField>

<ParamField path="status" type="str">
  Send immediately or save as draft
</ParamField>

<ParamField path="template_id" type="str">
  Use a Docusign template instead of uploading documents
</ParamField>

<ParamField path="template_role_name" type="str">
  Role name from the template (e.g., Signer, Approver)
</ParamField>

<ParamField path="envelope_id" type="str" required>
  The envelope ID (UUID format) - get this from List Envelopes or Docusign exact\_date (Dict\[str, Any])
</ParamField>

<ParamField path="include" type="str">
  Additional data to include (comma-separated: recipients, documents, custom\_fields)
</ParamField>

<ParamField path="folder_ids" type="str">
  Filter by folder IDs (comma-separated)
</ParamField>

<ParamField path="order" type="str">
  Sort order
</ParamField>

<ParamField path="order_by" type="str">
  Field to sort by (e.g., created, sent, completed)
</ParamField>

<ParamField path="search_text" type="str">
  Search text to filter envelopes
</ParamField>

<ParamField path="add_cc_email" type="str">
  Add a new CC recipient
</ParamField>

<ParamField path="add_cc_name" type="str">
  Name of the new CC recipient
</ParamField>

<ParamField path="add_documents" type="list[str]">
  Add more documents to a draft envelope
</ParamField>

<ParamField path="add_signer_email" type="str">
  Add a new signer to a draft envelope
</ParamField>

<ParamField path="add_signer_name" type="str">
  Name of the new signer
</ParamField>

<ParamField path="purge_state" type="str">
  Purge documents from the envelope
</ParamField>

<ParamField path="resend_envelope" type="bool">
  Resend email notifications to recipients
</ParamField>

<ParamField path="voided_reason" type="str">
  Reason for voiding (required when status is voided)
</ParamField>

<a id="integration_dropbox" />

## `integration_dropbox` — Dropbox

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_dropbox(tool_name="...", action="add_file", file="...", folder_id="...", integration=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_file`, `copy_file`, `copy_folder`, `create_folder`, `delete_file`, `delete_folder`, `download_file_by_path`, `get_files`, `move_file`, `move_folder`, `read_file`, `read_folder`, `search`
  </Expandable>
</ParamField>

<ParamField path="file" type="str" required>
  Content of the file to upload
</ParamField>

<ParamField path="folder_id" type="str" required>
  Select the folder where you want to post the file to
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="destination_folder_id" type="str" required>
  Select the destination folder
</ParamField>

<ParamField path="source_file_id" type="str" required>
  Select the file to copy
</ParamField>

<ParamField path="new_file_name" type="str">
  Name for the copied file
</ParamField>

<ParamField path="new_folder_name" type="str">
  Name for the copied folder
</ParamField>

<ParamField path="source_folder_id" type="str">
  Select folder to copy
</ParamField>

<ParamField path="folder_name" type="str">
  Name of the folder to create
</ParamField>

<ParamField path="parent_folder_id" type="str">
  Select parent folder
</ParamField>

<ParamField path="delete_file_id" type="str">
  Select file to delete
</ParamField>

<ParamField path="file_path" type="str">
  Full path to the file. Personal folders: /folder/file.pdf | Shared folders: ns:namespace\_id/file.pdf (copy from search results or folder listings)
</ParamField>

<ParamField path="include_deleted" type="bool">
  Include deleted files
</ParamField>

<ParamField path="include_subfolders" type="bool">
  Include files from subfolders
</ParamField>

<ParamField path="limit" type="int">
  Number of files to retrieve
</ParamField>

<ParamField path="read_file_id" type="str">
  Select file to read
</ParamField>

<ParamField path="recursive" type="bool">
  Whether to list folder contents recursively
</ParamField>

<ParamField path="search_query" type="str" required>
  Query to search for files and folders
</ParamField>

<ParamField path="file_types" type="str">
  Filter by file types (comma-separated)
</ParamField>

<ParamField path="include_shared_folders" type="bool">
  Include shared/team folders in search. If disabled, only personal folders will be searched, even if you specify a shared folder ID.
</ParamField>

<ParamField path="search_folder_id" type="str">
  Optional: Restrict search to specific folder. Paste folder ID from search results or folder listings (format: id:XXXXX for personal folders, ns:XXXXX for shared folders). Leave blank to search everywhere.
</ParamField>

<ParamField path="search_limit" type="int">
  Maximum number of search results
</ParamField>

<a id="integration_elasticsearch" />

## `integration_elasticsearch` — Elasticsearch

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_elasticsearch(tool_name="...", action="create_document", document="...", integration=..., confirm_delete=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the operation to perform

  <Expandable title="Allowed values">
    `create_document`, `create_index`, `delete_document`, `delete_index`, `get_document`, `get_index`, `list_documents`, `list_indices`, `search_index`, `update_document`
  </Expandable>
</ParamField>

<ParamField path="document" type="str" required>
  JSON document to index
</ParamField>

<ParamField path="index" type="str">
  Elasticsearch index name
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Elasticsearch cluster
</ParamField>

<ParamField path="document_id" type="str">
  Unique identifier for the document (optional - will be auto-generated if empty)
</ParamField>

<ParamField path="mappings" type="str">
  Index mappings in JSON format (optional)
</ParamField>

<ParamField path="settings" type="str">
  Index settings in JSON format (optional)
</ParamField>

<ParamField path="confirm_delete" type="bool" required>
  Confirm that you want to delete this index and all its data
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of documents to return
</ParamField>

<ParamField path="from_" type="int" />

<ParamField path="query" type="str">
  Elasticsearch query in JSON format (optional - defaults to match\_all)
</ParamField>

<ParamField path="include_system" type="bool">
  Include system indices (starting with .)
</ParamField>

<ParamField path="pattern" type="str">
  Index pattern to match (use \* for all indices)
</ParamField>

<ParamField path="upsert" type="bool">
  Create document if it doesn't exist
</ParamField>

<a id="integration_figma" />

## `integration_figma` — Figma

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_figma(tool_name="...", action="create_comment", file_key="...", integration=..., message="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `create_comment`, `create_comment_reaction`, `delete_comment`, `delete_comment_reaction`, `get_comment_reactions`, `get_comments`, `get_file_details`, `get_file_node_details`, `get_images`
  </Expandable>
</ParamField>

<ParamField path="file_key" type="str" required>
  Paste the full Figma URL or just the file key. Node IDs will be auto-extracted from URL
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Figma account
</ParamField>

<ParamField path="message" type="str" required>
  The text content of your comment
</ParamField>

<ParamField path="comment_id" type="str">
  Optional: Enter an existing comment ID to reply to it. Leave empty to create a new comment thread
</ParamField>

<ParamField path="node_id" type="str">
  Optional: Node ID to attach comment to (auto-extracted from URL if provided)
</ParamField>

<ParamField path="x" type="float">
  Optional: Horizontal position on the canvas (in pixels). Only used if no Node ID is provided
</ParamField>

<ParamField path="y" type="float">
  Optional: Vertical position on the canvas (in pixels). Only used if no Node ID is provided
</ParamField>

<ParamField path="emoji" type="str" required>
  The emoji shortcode to use as a reaction
</ParamField>

<ParamField path="as_md" type="bool">
  Return comment messages as markdown
</ParamField>

<ParamField path="branch_data" type="bool">
  Include branch metadata if the file is a branch
</ParamField>

<ParamField path="depth" type="int">
  How deep to traverse the document tree (1 = Pages only, 2 = Pages + top-level objects, leave empty for full depth)
</ParamField>

<ParamField path="geometry" type="str">
  Set to 'paths' to include vector path data (leave empty to exclude)
</ParamField>

<ParamField path="ids" type="str">
  Comma-separated list of node IDs to retrieve (optional, auto-extracted from URL if provided)
</ParamField>

<ParamField path="plugin_data" type="str">
  Comma-separated list of plugin IDs to include data for (optional)
</ParamField>

<ParamField path="version" type="str">
  Specific version ID to retrieve (optional, defaults to latest)
</ParamField>

<ParamField path="node_ids" type="str" required>
  Comma-separated node IDs to retrieve (e.g., 0:1,1:2)
</ParamField>

<ParamField path="contents_only" type="bool">
  For PDF, omit surrounding empty space
</ParamField>

<ParamField path="download_images" type="bool">
  Download and return actual image files instead of just URLs
</ParamField>

<ParamField path="format" type="str">
  Image output format
</ParamField>

<ParamField path="scale" type="float">
  Scale factor for the image (0.01 to 4.0)
</ParamField>

<ParamField path="svg_include_id" type="bool">
  Include ID attributes in SVG output
</ParamField>

<ParamField path="svg_outline_text" type="bool">
  Convert text to outlines in SVG output
</ParamField>

<ParamField path="svg_simplify_stroke" type="bool">
  Simplify strokes in SVG output
</ParamField>

<ParamField path="use_absolute_bounds" type="bool">
  Use full dimensions of the node regardless of cropping
</ParamField>

<a id="integration_fred" />

## `integration_fred` — Fred

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_fred(tool_name="...", action="get_category", category_id="...", integration=..., release_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `get_category`, `get_release_info`, `get_series`, `get_series_release`, `get_series_search`, `get_source`, `list_category_children`, `list_category_related`, `list_category_related_tags`, `list_category_series`, `list_category_tags`, `list_related_tags`, `list_release_dates`, `list_release_related_tags`, `list_release_series`, `list_release_sources`, `list_release_tables`, `list_release_tags`, `list_releases`, `list_series_categories`, `list_series_observations`, `list_series_search_related_tags`, `list_series_search_tags`, `list_series_tags`, `list_series_updates`, `list_series_vintagedates`, `list_source_releases`, `list_sources`, `list_tags`, `list_tags_series`
  </Expandable>
</ParamField>

<ParamField path="category_id" type="str" required>
  The ID of the category to retrieve. Use 0 for root category date\_range (Dict\[str, Any])
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your FRED API account
</ParamField>

<ParamField path="release_id" type="str" required>
  The ID of the release to retrieve
</ParamField>

<ParamField path="series_id" type="str" required>
  The ID of the series to retrieve
</ParamField>

<ParamField path="search_text" type="str">
  Search for tags containing this text
</ParamField>

<ParamField path="exclude_tag_names" type="str">
  Exclude series with these tags (semicolon-separated)
</ParamField>

<ParamField path="filter_value" type="str">
  Value to filter by
</ParamField>

<ParamField path="filter_variable" type="str">
  Filter by attribute
</ParamField>

<ParamField path="order_by" type="str">
  Order results by attribute
</ParamField>

<ParamField path="search_type" type="str">
  Type of search to perform
</ParamField>

<ParamField path="sort_order" type="str">
  Sort order for results
</ParamField>

<ParamField path="tag_names" type="str">
  Filter by tag names (semicolon-separated)
</ParamField>

<ParamField path="source_id" type="str" required>
  The ID of the source to retrieve
</ParamField>

<ParamField path="tag_group_id" type="str">
  Filter by tag group
</ParamField>

<ParamField path="include_release_dates_with_no_data" type="bool">
  Include release dates with no data available
</ParamField>

<ParamField path="element_id" type="int">
  The element ID to filter tables (0 for all)
</ParamField>

<ParamField path="include_observation_values" type="bool">
  Include observation values in the response
</ParamField>

<ParamField path="observation_date" type="str">
  Date for observation values (format: YYYY-MM-DD)
</ParamField>

<ParamField path="aggregation_method" type="str">
  Method for frequency aggregation
</ParamField>

<ParamField path="frequency" type="str">
  Frequency aggregation
</ParamField>

<ParamField path="observation_end" type="str">
  End date for observations (format: YYYY-MM-DD)
</ParamField>

<ParamField path="observation_start" type="str">
  Start date for observations (format: YYYY-MM-DD)
</ParamField>

<ParamField path="output_type" type="str">
  Output type for observations
</ParamField>

<ParamField path="units" type="str">
  Data transformation
</ParamField>

<ParamField path="vintage_dates" type="str">
  Comma-separated vintage dates
</ParamField>

<ParamField path="series_search_text" type="str" required>
  Text to search for in series (required)
</ParamField>

<ParamField path="tag_search_text" type="str">
  Search for tags containing this text
</ParamField>

<ParamField path="end_time" type="str">
  End time for updates (format: HH:MM) exact\_date (Dict\[str, Any])
</ParamField>

<ParamField path="start_time" type="str">
  Start time for updates (format: HH:MM)
</ParamField>

<a id="integration_github" />

## `integration_github` — Github

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_github(tool_name="...", action="create_branch", integration=..., file_content="...", file_path="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `create_branch`, `create_file`, `create_issue`, `create_issue_comment`, `create_pull_request`, `create_release`, `create_repository`, `create_webhook`, `delete_branch`, `delete_file`, `delete_issue_comment`, `delete_release`, `delete_repository`, `delete_webhook`, `get_branches`, `get_issue_comments`, `get_issues`, `get_organization_members`, `get_pull_requests`, `get_releases`, `get_repositories`, `get_webhooks`, `merge_pull_request`, `ping_webhook`, `read_branch`, `read_file`, `read_issue`, `read_issue_comment`, `read_pull_request`, `read_release`, `read_repository`, `read_user`, `read_webhook`, `search_pull_requests`, `update_file`, `update_issue`, `update_issue_comment`, `update_pull_request`, `update_release`, `update_repository`, `update_webhook`
  </Expandable>
</ParamField>

<ParamField path="branch_name" type="str">
  Branch to create the file on
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="owner" type="str">
  Owner of the repository
</ParamField>

<ParamField path="repository_name" type="str">
  Name of the repository to create
</ParamField>

<ParamField path="source_branch" type="str">
  Source branch to create from
</ParamField>

<ParamField path="commit_message" type="str">
  Message for the merge commit
</ParamField>

<ParamField path="file_content" type="str" required>
  Content of the file
</ParamField>

<ParamField path="file_path" type="str" required>
  Path where the file will be created
</ParamField>

<ParamField path="author_email" type="str">
  Email of the author
</ParamField>

<ParamField path="author_name" type="str">
  Name of the author
</ParamField>

<ParamField path="committer_email" type="str">
  Email of the committer
</ParamField>

<ParamField path="committer_name" type="str">
  Name of the committer
</ParamField>

<ParamField path="issue_title" type="str" required>
  Title of the issue
</ParamField>

<ParamField path="assignees" type="str">
  Comma-separated list of assignee usernames
</ParamField>

<ParamField path="issue_body" type="str">
  Body content of the issue
</ParamField>

<ParamField path="labels" type="str">
  Comma-separated list of labels
</ParamField>

<ParamField path="milestone" type="int | str">
  Milestone number
</ParamField>

<ParamField path="comment_body" type="str" required>
  Body content of the comment
</ParamField>

<ParamField path="issue_number" type="int" required>
  Number of the issue to update
</ParamField>

<ParamField path="base" type="str">
  Base branch (target)
</ParamField>

<ParamField path="head" type="str">
  Head branch (source)
</ParamField>

<ParamField path="pull_request_title" type="str" required>
  Title of the pull request
</ParamField>

<ParamField path="draft" type="bool">
  Create as draft pull request
</ParamField>

<ParamField path="maintainer_can_modify" type="bool">
  Allow maintainer modifications
</ParamField>

<ParamField path="pull_request_body" type="str">
  Body content of the pull request
</ParamField>

<ParamField path="tag_name" type="str" required>
  Name of the tag for the release
</ParamField>

<ParamField path="generate_release_notes" type="bool">
  Auto-generate release notes
</ParamField>

<ParamField path="prerelease" type="bool">
  Mark as prerelease
</ParamField>

<ParamField path="release_body" type="str">
  Description of the release
</ParamField>

<ParamField path="release_name" type="str">
  Name of the release
</ParamField>

<ParamField path="target_commitish" type="str">
  Commitish value for the release
</ParamField>

<ParamField path="auto_init" type="bool">
  Initialize repository with a README
</ParamField>

<ParamField path="gitignore_template" type="str">
  GitIgnore template to use
</ParamField>

<ParamField path="homepage" type="str">
  Homepage URL for the repository
</ParamField>

<ParamField path="is_private" type="bool">
  Whether the repository should be private
</ParamField>

<ParamField path="license_template" type="str">
  License template to use
</ParamField>

<ParamField path="repository_description" type="str">
  Description of the repository
</ParamField>

<ParamField path="webhook_url" type="str" required>
  URL to send webhook payloads to
</ParamField>

<ParamField path="content_type" type="str">
  Content type for webhook payloads
</ParamField>

<ParamField path="insecure_ssl" type="bool">
  Allow insecure SSL
</ParamField>

<ParamField path="webhook_active" type="bool">
  Whether the webhook is active
</ParamField>

<ParamField path="webhook_events" type="str">
  Events to trigger webhook (comma-separated)
</ParamField>

<ParamField path="webhook_name" type="str">
  Name of the webhook
</ParamField>

<ParamField path="webhook_secret" type="str">
  Secret key for webhook security
</ParamField>

<ParamField path="delete_commit_message" type="str" required>
  Commit message for the file deletion
</ParamField>

<ParamField path="delete_file_sha" type="str" required>
  Current SHA of the file to delete
</ParamField>

<ParamField path="delete_author_email" type="str">
  Email of the author
</ParamField>

<ParamField path="delete_author_name" type="str">
  Name of the author
</ParamField>

<ParamField path="delete_branch_name" type="str">
  Branch to delete the file from
</ParamField>

<ParamField path="delete_committer_email" type="str">
  Email of the committer
</ParamField>

<ParamField path="delete_committer_name" type="str">
  Name of the committer
</ParamField>

<ParamField path="comment_id" type="int" required>
  ID of the comment to update
</ParamField>

<ParamField path="release_id" type="int" required>
  ID of the release to update
</ParamField>

<ParamField path="webhook_id" type="int" required>
  ID of the webhook to update
</ParamField>

<ParamField path="protected" type="bool">
  Filter by protected status
</ParamField>

<ParamField path="return_all" type="bool">
  Return all repositories, ignoring the number limit
</ParamField>

<ParamField path="direction" type="str">
  Sort direction
</ParamField>

<ParamField path="sort" type="str">
  Sort repositories by
</ParamField>

<ParamField path="assignee" type="str">
  Assignee filter
</ParamField>

<ParamField path="creator" type="str">
  Creator filter
</ParamField>

<ParamField path="mentioned" type="str">
  Mentioned user filter
</ParamField>

<ParamField path="state" type="str">
  Issue state filter
</ParamField>

<ParamField path="organization" type="str" required>
  Name of the organization
</ParamField>

<ParamField path="filter" type="str">
  Filter members by role
</ParamField>

<ParamField path="role" type="str">
  Filter by member role
</ParamField>

<ParamField path="affiliation" type="str">
  Affiliation filter
</ParamField>

<ParamField path="type" type="str">
  Repository type filter
</ParamField>

<ParamField path="visibility" type="str">
  Visibility filter
</ParamField>

<ParamField path="pull_request_number" type="int" required>
  Number of the pull request to update
</ParamField>

<ParamField path="commit_title" type="str">
  Title for the merge commit
</ParamField>

<ParamField path="merge_method" type="str">
  Merge method to use
</ParamField>

<ParamField path="sha" type="str">
  SHA that pull request head must match
</ParamField>

<ParamField path="ref" type="str">
  Branch, tag, or commit to read from
</ParamField>

<ParamField path="username" type="str" required>
  Username to read information for
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of pull requests to return
</ParamField>

<ParamField path="query" type="str" required>
  Search query for pull requests
</ParamField>

<ParamField path="file_sha" type="str" required>
  Current SHA of the file
</ParamField>

<ParamField path="update_commit_message" type="str" required>
  Commit message for the file update
</ParamField>

<ParamField path="update_file_content" type="str" required>
  New content of the file
</ParamField>

<ParamField path="update_author_email" type="str">
  Email of the author
</ParamField>

<ParamField path="update_author_name" type="str">
  Name of the author
</ParamField>

<ParamField path="update_branch_name" type="str">
  Branch to update the file on
</ParamField>

<ParamField path="update_committer_email" type="str">
  Email of the committer
</ParamField>

<ParamField path="update_committer_name" type="str">
  Name of the committer
</ParamField>

<ParamField path="update_assignees" type="str">
  New assignees for the issue
</ParamField>

<ParamField path="update_issue_body" type="str">
  New body for the issue
</ParamField>

<ParamField path="update_issue_state" type="str">
  New state for the issue
</ParamField>

<ParamField path="update_issue_title" type="str">
  New title for the issue
</ParamField>

<ParamField path="update_labels" type="str">
  New labels for the issue
</ParamField>

<ParamField path="update_milestone" type="int">
  New milestone for the issue
</ParamField>

<ParamField path="update_comment_body" type="str" required>
  New body for the comment
</ParamField>

<ParamField path="update_base" type="str">
  New base branch
</ParamField>

<ParamField path="update_maintainer_can_modify" type="bool">
  Update maintainer modification permission
</ParamField>

<ParamField path="update_pull_request_body" type="str">
  New body for the pull request
</ParamField>

<ParamField path="update_pull_request_state" type="str">
  New state for the pull request
</ParamField>

<ParamField path="update_pull_request_title" type="str">
  New title for the pull request
</ParamField>

<ParamField path="update_draft" type="bool">
  Update draft status
</ParamField>

<ParamField path="update_prerelease" type="bool">
  Update prerelease status
</ParamField>

<ParamField path="update_release_body" type="str">
  New description for the release
</ParamField>

<ParamField path="update_release_name" type="str">
  New name for the release
</ParamField>

<ParamField path="update_tag_name" type="str">
  New tag name for the release
</ParamField>

<ParamField path="update_target_commitish" type="str">
  New commitish value for the release
</ParamField>

<ParamField path="update_has_issues" type="bool">
  Enable/disable issues
</ParamField>

<ParamField path="update_has_projects" type="bool">
  Enable/disable projects
</ParamField>

<ParamField path="update_has_wiki" type="bool">
  Enable/disable wiki
</ParamField>

<ParamField path="update_homepage" type="str">
  New homepage URL
</ParamField>

<ParamField path="update_is_private" type="bool">
  Update privacy setting
</ParamField>

<ParamField path="update_repository_description" type="str">
  New description for the repository
</ParamField>

<ParamField path="update_repository_name" type="str">
  New name for the repository
</ParamField>

<ParamField path="update_content_type" type="str">
  New content type
</ParamField>

<ParamField path="update_insecure_ssl" type="bool">
  Update insecure SSL setting
</ParamField>

<ParamField path="update_webhook_active" type="bool">
  Update webhook active status
</ParamField>

<ParamField path="update_webhook_events" type="str">
  New events to trigger webhook
</ParamField>

<ParamField path="update_webhook_secret" type="str">
  New secret key for webhook
</ParamField>

<ParamField path="update_webhook_url" type="str">
  New URL for webhook payloads
</ParamField>

<a id="integration_gitlab" />

## `integration_gitlab` — Gitlab

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_gitlab(tool_name="...", action="create_comment", body="...", integration=..., issue_number="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `create_comment`, `create_file`, `create_issue`, `create_release`, `create_repository`, `delete_file`, `edit_file`, `edit_issue`, `get_file`, `get_issue`, `get_release`, `get_repository`, `get_user_repositories`, `list_files`, `list_issues`, `list_releases`, `lock_issue`, `update_release`
  </Expandable>
</ParamField>

<ParamField path="body" type="str" required>
  The comment body text
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="issue_number" type="str" required>
  The issue number (IID) to comment on
</ParamField>

<ParamField path="project_name" type="str" required>
  Name of the project
</ParamField>

<ParamField path="project_owner" type="str" required>
  Project owner username
</ParamField>

<ParamField path="commit_message" type="str" required>
  Commit message for the file creation
</ParamField>

<ParamField path="file" type="str" required>
  Please upload file
</ParamField>

<ParamField path="file_path" type="str" required>
  Path where the file will be created
</ParamField>

<ParamField path="author_email" type="str">
  Email of the author
</ParamField>

<ParamField path="author_name" type="str">
  Name of the author
</ParamField>

<ParamField path="branch" type="str">
  Branch to create the file on
</ParamField>

<ParamField path="committer_email" type="str">
  Email of the committer
</ParamField>

<ParamField path="committer_name" type="str">
  Name of the committer
</ParamField>

<ParamField path="encoding" type="str">
  Upload as text format or base64
</ParamField>

<ParamField path="title" type="str" required>
  Title of the issue
</ParamField>

<ParamField path="assignee_ids" type="str">
  Comma-separated list of assignee ids
</ParamField>

<ParamField path="description" type="str">
  A short project description (max 500 characters)
</ParamField>

<ParamField path="due_date" type="str">
  Due date in YYYY-MM-DD format
</ParamField>

<ParamField path="labels" type="str">
  Comma-separated list of labels
</ParamField>

<ParamField path="tag_name" type="str" required>
  The name of the Git tag this release will be created for (e.g., v1.2.3). This tag must exist in the repository or be created beforehand.
</ParamField>

<ParamField path="name" type="str">
  The release title. If omitted, it defaults to the Tag name.
</ParamField>

<ParamField path="ref" type="str">
  Branch, tag, or commit SHA to read from, default is main
</ParamField>

<ParamField path="repository_name" type="str" required>
  Project name
</ParamField>

<ParamField path="namespace_id" type="str">
  The ID of the group or user namespace where the project should be created. If not specified, it defaults to the authenticated user's personal namespace
</ParamField>

<ParamField path="path" type="str">
  Project slug (the URL path). If not provided, it's generated from the name
</ParamField>

<ParamField path="visibility" type="str">
  Visibility level of the project. Can be public, internal, or private. Default is private
</ParamField>

<ParamField path="start_branch" type="str">
  The base branch to start the commit from, useful for creating a new branch
</ParamField>

<ParamField path="issue_body" type="str">
  New body/description for the issue (supports Markdown)
</ParamField>

<ParamField path="state" type="str">
  Filter issues by state
</ParamField>

<ParamField path="project_id" type="str" required>
  The project ID (optional, can be used instead of project\_owner and project\_name)
</ParamField>

<ParamField path="list_file_path" type="str" required>
  The path to list files in the repository (required)
</ParamField>

<ParamField path="creator_username" type="str">
  Filter issues by creator username
</ParamField>

<ParamField path="issue_assignee_username" type="str">
  Filter issues by assignee username
</ParamField>

<ParamField path="order_by" type="str">
  Field to sort results by
</ParamField>

<ParamField path="search" type="str">
  Filter issues by title or description matching the search term
</ParamField>

<ParamField path="sort" type="str">
  Order of sorting (asc for ascending, desc for descending)
</ParamField>

<ParamField path="updated_after" type="str">
  Filter issues updated after a specific date/time (ISO 8601 format)
</ParamField>

<ParamField path="lock_reason" type="str">
  Optional message recorded before locking the issue
</ParamField>

<ParamField path="release_project_id" type="str" required>
  The project ID (optional, can be used instead of project\_owner and project\_name)
</ParamField>

<ParamField path="milestones" type="str">
  Comma-separated list of milestone titles assigned to the release
</ParamField>

<ParamField path="released_at" type="str">
  Date and time the release was made, in ISO 8601 format (e.g., 2025-11-19T10:00:00Z)
</ParamField>

<a id="integration_gmail" />

## `integration_gmail` — Gmail

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_gmail(tool_name="...", action="add_label_to_message", integration=..., message_id="...", thread_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_label_to_message`, `add_label_to_thread`, `create_draft`, `create_label`, `delete_draft`, `delete_label`, `delete_message`, `delete_thread`, `draft_reply`, `get_drafts`, `get_labels`, `get_threads`, `list_messages`, `mark_as_read`, `mark_as_unread`, `read_draft`, `read_label`, `read_message`, `read_thread`, `remove_label_from_message`, `remove_label_from_thread`, `reply_to_thread`, `send_email`, `send_reply`, `trash_draft`, `trash_message`, `trash_thread`, `untrash_thread`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="label_ids" type="str">
  Emails with all listed label IDs
</ParamField>

<ParamField path="message_id" type="str" required>
  The ID of the message to read
</ParamField>

<ParamField path="thread_id" type="str" required>
  The ID of the thread to read
</ParamField>

<ParamField path="body" type="str">
  The body of the email
</ParamField>

<ParamField path="format" type="str" required>
  Either html (to allow html content) or text (for plaintext content - default)
</ParamField>

<ParamField path="recipients" type="str" required>
  A single email or a comma-separated list of the recipients' emails, example: [john@company.com](mailto:john@company.com), [alex@company.com](mailto:alex@company.com)
</ParamField>

<ParamField path="subject" type="str">
  The subject of the email
</ParamField>

<ParamField path="attachments" type="list[str]">
  Attachments to be appended.
</ParamField>

<ParamField path="bcc" type="str">
  Blind carbon copy recipients. These addresses are hidden from other recipients (comma-separated)
</ParamField>

<ParamField path="cc" type="str">
  Carbon copy recipients who will receive a visible copy of the email (comma-separated)
</ParamField>

<ParamField path="reply_to" type="str">
  Alternative email address where replies should be sent instead of the sender's address
</ParamField>

<ParamField path="reply_to_sender_only" type="bool">
  When enabled, ensures that replies go only to the sender, excluding CC or group recipients
</ParamField>

<ParamField path="sender_name" type="str">
  Custom name to display as the sender in the recipient's inbox
</ParamField>

<ParamField path="label_list_visibility" type="str" required>
  The visibility of the label in the label list
</ParamField>

<ParamField path="message_list_visibility" type="str" required>
  The visibility of messages with this label
</ParamField>

<ParamField path="name" type="str" required>
  The name of the label to create
</ParamField>

<ParamField path="draft_id" type="str" required>
  The ID of the draft to read
</ParamField>

<ParamField path="label_id" type="str" required>
  The ID of the label to read, example: Label\_1, Label\_2
</ParamField>

<ParamField path="email_id" type="str" required>
  The ID of the email (often used in conjunction with a trigger where the email ID is received from the trigger) exact\_date (Dict\[str, Any])
</ParamField>

<ParamField path="category" type="str">
  Filter by tab (e.g. Primary, Social)
</ParamField>

<ParamField path="detailed_view" type="bool">
  Include full draft details in the response
</ParamField>

<ParamField path="filename" type="str">
  Find attachments by name or type
</ParamField>

<ParamField path="from_" type="str" />

<ParamField path="has" type="str">
  Filter by feature (e.g. attachment, drive)
</ParamField>

<ParamField path="has_attachment" type="str">
  Only emails with attachments
</ParamField>

<ParamField path="has_images" type="str">
  Emails containing images
</ParamField>

<ParamField path="has_links" type="str">
  Emails containing links
</ParamField>

<ParamField path="has_starred" type="str">
  Only starred emails
</ParamField>

<ParamField path="has_unread" type="str">
  Only unread emails
</ParamField>

<ParamField path="has_user_labels" type="str">
  Emails with custom labels
</ParamField>

<ParamField path="in_" type="str" />

<ParamField path="include_spam_trash" type="bool | str">
  Include spam and trash emails
</ParamField>

<ParamField path="is_" type="str" />

<ParamField path="label" type="str">
  Search emails with this label
</ParamField>

<ParamField path="larger" type="str">
  Emails larger than this size (e.g. 5M)
</ParamField>

<ParamField path="list" type="str">
  Emails from this mailing list
</ParamField>

<ParamField path="newer_than" type="str">
  Emails newer than a time (e.g. 7d, 2m)
</ParamField>

<ParamField path="older_than" type="str">
  Emails older than a time (e.g. 7d, 2m)
</ParamField>

<ParamField path="page_token" type="str">
  Use to fetch next page of results
</ParamField>

<ParamField path="query" type="str">
  Raw query string to use directly. If provided, overrides all other query parameters.
</ParamField>

<ParamField path="smaller" type="str">
  Emails smaller than this size (e.g. 5M)
</ParamField>

<ParamField path="to" type="str">
  Emails sent to this address
</ParamField>

<ParamField path="has_chat" type="str">
  Only chat threads
</ParamField>

<ParamField path="has_important" type="str">
  Only important threads
</ParamField>

<ParamField path="read_status" type="str">
  Filter by read status
</ParamField>

<ParamField path="received_after" type="str">
  RFC3339 timestamp (e.g. 2023-01-01T00:00:00Z)
</ParamField>

<ParamField path="received_before" type="str">
  RFC3339 timestamp (e.g. 2023-12-31T23:59:59Z)
</ParamField>

<ParamField path="custom_params" type="str">
  Extra filters as raw query date\_range (Dict\[str, Any])
</ParamField>

<ParamField path="msg_id" type="str">
  Search by message ID (ignores other filters)
</ParamField>

<ParamField path="projection" type="str">
  Select which fields to return
</ParamField>

<ParamField path="draft_message_id" type="str" required>
  The ID of the draft message to trash
</ParamField>

<a id="integration_gohighlevel" />

## `integration_gohighlevel` — GoHighLevel

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_gohighlevel(tool_name="...", action="create_contact", integration=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `create_contact`, `create_opportunity`
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="email" type="str">
  Email address of the contact
</ParamField>

<ParamField path="first_name" type="str">
  First name of the contact
</ParamField>

<ParamField path="last_name" type="str">
  Last name of the contact
</ParamField>

<ParamField path="phone" type="str">
  Phone number of the contact
</ParamField>

<ParamField path="contact_name" type="str">
  Name of the existing contact to link to the opportunity. One contact can only be linked to one opportunity.
</ParamField>

<ParamField path="name" type="str">
  Name of the opportunity
</ParamField>

<ParamField path="pipeline_name" type="str">
  Name of the existing pipeline to link to the opportunity
</ParamField>

<ParamField path="status" type="str">
  Status of the opportunity (must be one of: 'open', 'won', 'lost', 'abandoned')
</ParamField>

<ParamField path="value" type="str">
  Money value of the opportunity
</ParamField>

<a id="integration_google_ads" />

## `integration_google_ads` — Google Ads

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_google_ads(tool_name="...", action="get_campaigns", customer_id="...", integration=..., campaign_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `get_campaigns`, `read_campaign`
</ParamField>

<ParamField path="customer_id" type="str" required>
  The Google Ads customer account
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="campaign_status" type="str">
  Filter by campaign status (ENABLED, PAUSED, REMOVED)
</ParamField>

<ParamField path="campaign_type" type="str">
  Filter by campaign type (SEARCH, DISPLAY, VIDEO, etc.)
</ParamField>

<ParamField path="campaign_id" type="str" required>
  The campaign to retrieve details for
</ParamField>

<a id="integration_google_analytics" />

## `integration_google_analytics` — Google Analytics

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_google_analytics(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="currency_code" type="str" default="'USD'">
  Currency code for monetary metrics
</ParamField>

<ParamField path="date_range" type="dict" default="{}">
  pick the relative date range
</ParamField>

<ParamField path="dimensions" type="str" default="''">
  Comma-separated list of dimensions (e.g., date,country)
</ParamField>

<ParamField path="exact_date" type="dict" default="{}">
  Pick the start and end dates
</ParamField>

<ParamField path="integration" type="Any">
  Connect to your Google Analytics account
</ParamField>

<ParamField path="keep_empty_rows" type="bool" default="False">
  Include rows with all zero metrics
</ParamField>

<ParamField path="metric_aggregations" type="str" default="''">
  List of metric aggregations to apply
</ParamField>

<ParamField path="metrics" type="str" default="''">
  Comma-separated list of metrics (e.g., totalUsers,sessions)
</ParamField>

<ParamField path="num_messages" type="int" default="10">
  Specify the number of results to fetch
</ParamField>

<ParamField path="order_by" type="str" default="''">
  Order by configuration for results
</ParamField>

<ParamField path="property_id" type="str" default="''">
  Enter the GA4 property
</ParamField>

<ParamField path="return_all" type="bool" default="False">
  Return all results instead of limiting
</ParamField>

<ParamField path="return_property_quota" type="bool" default="False">
  Return property quota usage
</ParamField>

<ParamField path="simple" type="bool" default="True">
  Return simplified output format
</ParamField>

<ParamField path="action" type="str" default="''">
  Select the action to perform
</ParamField>

<ParamField path="use_date" type="bool" default="False">
  Toggle to use dates
</ParamField>

<ParamField path="use_exact_date" type="bool" default="False">
  Switch between exact date range and relative dates
</ParamField>

<a id="integration_google_big_query" />

## `integration_google_big_query` — Google BigQuery

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_google_big_query(tool_name="...", action="execute_query", integration=..., project_id="...", query="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `execute_query`, `insert_rows`
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="project_id" type="str" required>
  The Google Cloud project ID
</ParamField>

<ParamField path="query" type="str" required>
  SQL query to execute
</ParamField>

<ParamField path="dry_run" type="bool">
  Validate query without executing
</ParamField>

<ParamField path="timeout_ms" type="int">
  Query timeout in milliseconds
</ParamField>

<ParamField path="use_legacy_sql" type="bool">
  Use Legacy SQL syntax
</ParamField>

<ParamField path="bigquery_table_id" type="str" required>
  The ID of the table to insert data into
</ParamField>

<ParamField path="dataset_id" type="str" required>
  The ID of the dataset containing the table
</ParamField>

<ParamField path="ignore_unknown_values" type="bool">
  Ignore values that do not match the table schema
</ParamField>

<ParamField path="skip_invalid_rows" type="bool">
  Skip rows that contain invalid data
</ParamField>

<a id="integration_google_calendar" />

## `integration_google_calendar` — Google Calendar

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_google_calendar(tool_name="...", action="check_availability", end_date_and_time="...", integration=..., start_date_and_time="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `check_availability`, `delete_event`, `get_events`, `new_event`, `read_event`, `update_event`
</ParamField>

<ParamField path="end_date_and_time" type="str" required>
  The last date and end time for everyday to look for availability
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="start_date_and_time" type="str" required>
  The first date and start time for everyday to look for availability
</ParamField>

<ParamField path="calendar" type="str">
  Select the calendar to add the new event to date\_range (Dict\[str, Any])
</ParamField>

<ParamField path="slot_duration" type="int">
  The duration of an individual slot to look for (in minutes). Default: 30 (in minutes)
</ParamField>

<ParamField path="timezone" type="str">
  IANA Time Zone (e.g., US/Eastern). The available time slots in the output will be returned in this timezone.
</ParamField>

<ParamField path="event_id" type="str" required>
  The ID of the event to read
</ParamField>

<ParamField path="send_updates" type="str">
  Whether to send notifications about the update to attendees
</ParamField>

<ParamField path="query" type="str">
  Return only events that contain these keywords
</ParamField>

<ParamField path="event_name" type="str" required>
  The name of the calendar event exact\_date (Dict\[str, Any])
</ParamField>

<ParamField path="start_datetime" type="str" required>
  The start time of the calendar event (format: YYYY-MM-DD for full day event or YYYY-MM-DDTHH:MM:SS for specific time)
</ParamField>

<ParamField path="all_day_event" type="bool">
  Toggle to set the event as an all-day event
</ParamField>

<ParamField path="attendees" type="str">
  Email IDs of attendees (comma separated)
</ParamField>

<ParamField path="description" type="str">
  The description of the event
</ParamField>

<ParamField path="duration" type="int">
  The duration of the event (positive integer). Default: 30 (in minutes)
</ParamField>

<ParamField path="location" type="str">
  Physical location or the meeting location (like Zoom)
</ParamField>

<ParamField path="repeat_frequency" type="str">
  How often the event repeats (leave empty for non-recurring events)
</ParamField>

<ParamField path="repeat_how_many_times" type="int">
  Number of times the event should repeat (use either this or Repeat Until, not both)
</ParamField>

<ParamField path="repeat_until" type="str">
  End date for the recurring event (use either this or Repeat How Many Times, not both)
</ParamField>

<ParamField path="rrule" type="str">
  Advanced: Custom recurrence rule (overrides Repeat Frequency, Repeat How Many Times, and Repeat Until if set). Format: RFC 5545
</ParamField>

<ParamField path="end_time" type="str">
  New end time for the event (RFC3339 format)
</ParamField>

<ParamField path="send_notifications" type="bool">
  Whether to send notifications about the changes
</ParamField>

<ParamField path="start_time" type="str">
  New start time for the event (RFC3339 format)
</ParamField>

<ParamField path="update_attendees" type="str">
  New attendee list (comma-separated emails)
</ParamField>

<ParamField path="update_color_id" type="str">
  New color ID for the event (1-11)
</ParamField>

<ParamField path="update_description" type="str">
  New description for the event
</ParamField>

<ParamField path="update_guests_can_invite_others" type="bool">
  Whether guests can invite other attendees
</ParamField>

<ParamField path="update_guests_can_modify" type="bool">
  Whether guests can modify the event
</ParamField>

<ParamField path="update_guests_can_see_other_guests" type="bool">
  Whether guests can see other attendees
</ParamField>

<ParamField path="update_location" type="str">
  New location for the event
</ParamField>

<ParamField path="update_max_attendees" type="int">
  Maximum number of attendees
</ParamField>

<ParamField path="update_show_me_as" type="str">
  How to show the time slot (opaque=busy, transparent=free)
</ParamField>

<ParamField path="update_summary" type="str">
  New title/summary for the event
</ParamField>

<ParamField path="update_visibility" type="str">
  New visibility setting for the event
</ParamField>

<a id="integration_google_chat" />

## `integration_google_chat` — Google Chat

Integrate with Google Chat to send messages, manage spaces, and handle memberships

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_google_chat(tool_name="...", action="delete_message", integration=..., message_id="...", space_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `delete_message`, `get_memberships`, `get_spaces`, `read_membership`, `read_message`, `read_space`, `send_message`, `update_message`
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="message_id" type="str" required>
  The ID of the message to delete
</ParamField>

<ParamField path="space_id" type="str" required>
  The ID of the space
</ParamField>

<ParamField path="page_size" type="str">
  The number of memberships to return
</ParamField>

<ParamField path="filter" type="str">
  Filter for spaces
</ParamField>

<ParamField path="membership_id" type="str" required>
  The ID of the membership
</ParamField>

<ParamField path="message_text" type="str" required>
  The text of the message
</ParamField>

<ParamField path="thread_key" type="str">
  Thread key for threaded messages
</ParamField>

<ParamField path="update_mask" type="str">
  Update mask for the message
</ParamField>

<a id="integration_google_cloud_firestore" />

## `integration_google_cloud_firestore` — Google Cloud Firestore

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_google_cloud_firestore(tool_name="...", action="create_document", collection="...", database="...", fields="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `create_document`, `delete_document`, `get_collections`, `get_documents`, `query_documents`, `read_document`, `upsert_document`
</ParamField>

<ParamField path="collection" type="str" required>
  The collection name where the document will be created
</ParamField>

<ParamField path="database" type="str" required>
  The Firestore database name. Leave as (default) for the default database
</ParamField>

<ParamField path="fields" type="str" required>
  JSON object containing the document fields
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="project_id" type="str" required>
  The Google Cloud project ID
</ParamField>

<ParamField path="document_id" type="str">
  Optional document ID. If not provided, Firestore will generate one automatically
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of documents to retrieve
</ParamField>

<ParamField path="query" type="str" required>
  Firestore query in JSON format
</ParamField>

<ParamField path="update_key" type="str" required>
  The field name in the document that contains the document ID
</ParamField>

<a id="integration_google_cloud_storage" />

## `integration_google_cloud_storage` — Google Cloud Storage

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_google_cloud_storage(tool_name="...", action="create_bucket", bucket_name="...", integration=..., file="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `create_bucket`, `create_object`, `delete_bucket`, `delete_object`, `get_buckets`, `get_objects`, `read_bucket`, `read_object`, `update_bucket`, `update_object`
  </Expandable>
</ParamField>

<ParamField path="bucket_name" type="str" required>
  Enter the name of the bucket to create
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="project_id" type="str">
  Select your Google Cloud Project
</ParamField>

<ParamField path="storage_class" type="str">
  Select the storage class for the bucket
</ParamField>

<ParamField path="cors" type="str">
  Cross-Origin Resource Sharing configuration (JSON format)
</ParamField>

<ParamField path="lifecycle" type="str">
  Object lifecycle management rules (JSON format)
</ParamField>

<ParamField path="location" type="str">
  Enter the location for the bucket (e.g., US, EU, ASIA)
</ParamField>

<ParamField path="uniform_bucket_level_access" type="bool">
  Enable uniform bucket-level access
</ParamField>

<ParamField path="versioning" type="bool">
  Enable object versioning for this bucket
</ParamField>

<ParamField path="file" type="str" required>
  Select a file to upload
</ParamField>

<ParamField path="object_name" type="str" required>
  Enter the name for the object
</ParamField>

<ParamField path="cache_control" type="str">
  Cache control directives
</ParamField>

<ParamField path="content_disposition" type="str">
  How the object should be displayed
</ParamField>

<ParamField path="content_encoding" type="str">
  Content encoding of the object
</ParamField>

<ParamField path="content_language" type="str">
  Language of the content
</ParamField>

<ParamField path="metadata" type="str">
  Custom metadata for the object (JSON format)
</ParamField>

<ParamField path="generation" type="int">
  Specify object generation for versioned buckets
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of buckets to return
</ParamField>

<ParamField path="prefix" type="str">
  Filter results to buckets whose names begin with this prefix
</ParamField>

<ParamField path="projection" type="str">
  Select the level of detail to return
</ParamField>

<ParamField path="delimiter" type="str">
  Delimiter for directory-like listing
</ParamField>

<ParamField path="include_versions" type="bool">
  Include all versions of objects
</ParamField>

<ParamField path="alt" type="str">
  Alternative representation (json for metadata, media for content)
</ParamField>

<ParamField path="download_content" type="bool">
  Download file content instead of metadata
</ParamField>

<ParamField path="encryption_key" type="str">
  Customer-supplied encryption key (base64 encoded)
</ParamField>

<ParamField path="encryption_key_sha" type="str">
  SHA256 hash of the encryption key (base64 encoded)
</ParamField>

<ParamField path="encryption" type="str">
  Default encryption configuration (JSON format)
</ParamField>

<ParamField path="labels" type="str">
  Labels to apply to the bucket (JSON format)
</ParamField>

<ParamField path="logging" type="str">
  Access logging configuration (JSON format)
</ParamField>

<ParamField path="website" type="str">
  Static website hosting configuration (JSON format)
</ParamField>

<ParamField path="content_type" type="str">
  MIME type of the object
</ParamField>

<a id="integration_google_contacts" />

## `integration_google_contacts` — Google Contacts

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_google_contacts(tool_name="...", action="create_contact", integration=..., contact_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `create_contact`, `delete_contact`, `get_contacts`, `read_contact`, `update_contact`
</ParamField>

<ParamField path="given_name" type="str">
  First name of the contact
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="email" type="str">
  Email address of the contact
</ParamField>

<ParamField path="family_name" type="str">
  Last name of the contact
</ParamField>

<ParamField path="organization" type="str">
  Organization name of the contact
</ParamField>

<ParamField path="phone" type="str">
  Phone number of the contact
</ParamField>

<ParamField path="contact_id" type="str" required>
  Google Contacts resource ID to delete
</ParamField>

<ParamField path="limit" type="str">
  Maximum number of contacts to retrieve
</ParamField>

<ParamField path="query" type="str">
  Search query to filter contacts
</ParamField>

<a id="integration_google_docs" />

## `integration_google_docs` — Google Docs

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_google_docs(tool_name="...", action="create_document", integration=..., file_id="...", doc_url="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `create_document`, `delete_document`, `get_document_info`, `get_document_revisions`, `get_documents`, `read_doc`, `read_doc_url`, `update_document`, `write_to_doc`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Google Docs account
</ParamField>

<ParamField path="title" type="str">
  Title of the document
</ParamField>

<ParamField path="content" type="str">
  Initial content for the document (optional)
</ParamField>

<ParamField path="file_id" type="str" required>
  Select a File to read
</ParamField>

<ParamField path="folder_id" type="str">
  ID of the folder to search in (optional)
</ParamField>

<ParamField path="order_by" type="str">
  How to order the results
</ParamField>

<ParamField path="query" type="str">
  Search query to filter documents by name
</ParamField>

<ParamField path="shared_with_me" type="bool">
  Include documents shared with me
</ParamField>

<ParamField path="doc_url" type="str" required>
  Enter the public URL of the Google Doc
</ParamField>

<ParamField path="operation" type="str">
  How to handle the content (replace, append, prepend)
</ParamField>

<ParamField path="text" type="str" required>
  The text that will be added to the File
</ParamField>

<a id="integration_google_drive" />

## `integration_google_drive` — Google Drive

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_google_drive(tool_name="...", action="copy_file", file_id="...", integration=..., content="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `copy_file`, `create_file_from_text`, `create_folder`, `create_shared_drive`, `delete_file`, `delete_folder`, `delete_shared_drive`, `get_files`, `get_shared_drives`, `move_file`, `read_drive`, `read_file_url`, `read_shared_drive`, `save_drive`, `share_file`, `share_folder`, `update_file`, `update_shared_drive`
  </Expandable>
</ParamField>

<ParamField path="file_id" type="str" required>
  Select the file to read
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="copy_requires_writer_permission" type="bool">
  Whether the copy requires writer permission
</ParamField>

<ParamField path="description" type="str">
  Description for the file
</ParamField>

<ParamField path="name" type="str">
  Name of the file to create
</ParamField>

<ParamField path="parent_folder_id" type="str">
  Select the folder to create the file in
</ParamField>

<ParamField path="same_folder" type="bool">
  Keep the copy in the same folder as the original
</ParamField>

<ParamField path="content" type="str" required>
  Text content for the file
</ParamField>

<ParamField path="folder_color" type="str">
  Color for the folder (hex code)
</ParamField>

<ParamField path="color_rgb" type="str">
  Color for the shared drive (hex code)
</ParamField>

<ParamField path="hidden" type="bool">
  Whether the shared drive is hidden
</ParamField>

<ParamField path="delete_permanently" type="bool">
  Whether to delete the file permanently or move to trash
</ParamField>

<ParamField path="folder_id" type="str">
  Select the folder within your Google Drive to save the file
</ParamField>

<ParamField path="drive_id" type="str">
  ID of the shared drive to search
</ParamField>

<ParamField path="corpora" type="str">
  Scope to search in: 'user' (files owned/shared to user) or 'domain' (files shared to user's domain) date\_range (Dict\[str, Any])
</ParamField>

<ParamField path="fields" type="str">
  Comma-separated list of fields to include in the response
</ParamField>

<ParamField path="include_items_from_all_drives" type="bool">
  Whether to include items from all drives, including shared drives
</ParamField>

<ParamField path="include_labels" type="str">
  Comma-separated list of label IDs to include in the response
</ParamField>

<ParamField path="include_permissions_for_view" type="str">
  Additional view's permissions to include (only 'published' supported)
</ParamField>

<ParamField path="order_by" type="str">
  Sort order for files (e.g., 'folder,name,modifiedTime desc')
</ParamField>

<ParamField path="query" type="str">
  Search query for filtering files (see Drive API documentation for syntax)
</ParamField>

<ParamField path="recursive" type="bool">
  When enabled, fetches all files from nested folders recursively. Folders will be traversed and only files will be returned.
</ParamField>

<ParamField path="spaces" type="str">
  Comma-separated list of spaces to search ('drive', 'appDataFolder')
</ParamField>

<ParamField path="supports_all_drives" type="bool">
  Whether the application supports both My Drives and shared drives
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of shared drives to return (when not returning all)
</ParamField>

<ParamField path="return_all" type="bool">
  Whether to return all shared drives or limit the results
</ParamField>

<ParamField path="use_domain_admin_access" type="bool">
  Whether to use domain admin access
</ParamField>

<ParamField path="drive_file_url" type="str" required>
  The URL of the drive file to read.
</ParamField>

<ParamField path="file" type="str" required>
  Select or Upload a file
</ParamField>

<ParamField path="role" type="str" required>
  Role for the permission (reader, writer, commenter, owner)
</ParamField>

<ParamField path="type" type="str" required>
  Type of permission (user, group, domain, anyone)
</ParamField>

<ParamField path="domain" type="str">
  Domain for domain permissions
</ParamField>

<ParamField path="email_address" type="str">
  Email address for user/group permissions
</ParamField>

<ParamField path="email_message" type="str">
  Custom message for the notification email exact\_date (Dict\[str, Any])
</ParamField>

<ParamField path="send_notification_email" type="bool">
  Whether to send notification email
</ParamField>

<ParamField path="change_file_content" type="bool">
  Whether to update the file content
</ParamField>

<ParamField path="content_type" type="str">
  MIME type of the file content
</ParamField>

<ParamField path="file_data" type="str">
  New file content (when changing content)
</ParamField>

<ParamField path="file_name" type="str">
  New name for the file
</ParamField>

<ParamField path="starred" type="bool">
  Whether to star the file
</ParamField>

<ParamField path="trashed" type="bool">
  Whether to trash the file
</ParamField>

<a id="integration_google_firebase_realtime_db" />

## `integration_google_firebase_realtime_db` — Google Firebase Realtime DB

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_google_firebase_realtime_db(tool_name="...", action="create_record", data="...", database_url="...", integration=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `create_record`, `delete_record`, `push_to_list`, `read_record`, `update_record`
</ParamField>

<ParamField path="data" type="str" required>
  The data to write (JSON format)
</ParamField>

<ParamField path="database_url" type="str" required>
  Your Firebase Realtime Database URL (e.g., [https://your-project-id-default-rtdb.firebaseio.com](https://your-project-id-default-rtdb.firebaseio.com))
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="path" type="str" required>
  The path where you want to create/write data
</ParamField>

<ParamField path="update_data" type="str" required>
  The fields to update (JSON format)
</ParamField>

<a id="integration_google_perspective" />

## `integration_google_perspective` — Google Perspective

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_google_perspective(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="comment" type="str" default="''">
  The text content to analyze for various attributes
</ParamField>

<ParamField path="integration" type="Any">
  Connect to your account
</ParamField>

<ParamField path="language" type="str" default="''">
  Language code (e.g., en, es, fr). Leave empty for auto-detection
</ParamField>

<ParamField path="requested_attributes" type="str" default="'TOXICITY'">
  Select which attribute to analyze
</ParamField>

<ParamField path="score_threshold" type="float" default="''">
  Optional threshold (0-1) to filter results. Only scores above this value will be flagged
</ParamField>

<ParamField path="action" type="str" default="''">
  Select the action to perform
</ParamField>

<a id="integration_google_sheets" />

## `integration_google_sheets` — Google Sheets

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_google_sheets(tool_name="...", action="clear_sheet", integration=..., sheet_id="...", spreadsheet_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `clear_sheet`, `create_sheet`, `create_spreadsheet`, `delete_rows_columns`, `delete_sheet`, `delete_spreadsheet`, `delete_spreadsheet_url`, `extract_to_table`, `get_rows`, `read_sheet`, `read_sheet_url`, `update_rows`, `write_list_to_column`, `write_to_sheet`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required />

<ParamField path="sheet_id" type="str" required>
  Select the Sheet to read from
</ParamField>

<ParamField path="keep_first_row" type="bool">
  Whether to preserve the first row (only for whole sheet clearing)
</ParamField>

<ParamField path="range" type="str">
  Optional: Specify a range (e.g., A1:D10). Leave empty to read entire sheet
</ParamField>

<ParamField path="spreadsheet_id" type="str" required>
  Select the Spreadsheet to create sheet in
</ParamField>

<ParamField path="title" type="str" required>
  Title/name of the new sheet
</ParamField>

<ParamField path="hidden" type="bool">
  Whether the sheet should be hidden
</ParamField>

<ParamField path="index" type="int">
  Position index of the sheet (0 for end) integration (Any)
</ParamField>

<ParamField path="right_to_left" type="bool">
  Whether the sheet is RTL instead of LTR
</ParamField>

<ParamField path="sheet_id_number" type="int">
  Specific sheet ID number (must be unique, 0 for auto-generate)
</ParamField>

<ParamField path="tab_color" type="str">
  Hex color code for sheet tab (e.g., #ff0000)
</ParamField>

<ParamField path="auto_recalc" type="str">
  Frequency at which formulas should automatically recalculate
</ParamField>

<ParamField path="locale" type="str">
  Locale (e.g., en\_US)
</ParamField>

<ParamField path="sheets" type="str">
  Comma (,) separated list of sheet names
</ParamField>

<ParamField path="num_columns" type="int">
  Number of columns to delete (required when deleting columns)
</ParamField>

<ParamField path="num_rows" type="int">
  Number of rows to delete (required when deleting rows)
</ParamField>

<ParamField path="start_column" type="str">
  Starting column letter (required when deleting columns)
</ParamField>

<ParamField path="start_row" type="int">
  Starting row number (required when deleting rows)
</ParamField>

<ParamField path="spreadsheet_url" type="str" required>
  Enter or map the full URL of the Google Spreadsheet to be deleted
</ParamField>

<ParamField path="text_for_extraction" type="str" required>
  The text to extract the table from
</ParamField>

<ParamField path="additional_context" type="str">
  Additional context for the AI model to extract the table.
</ParamField>

<ParamField path="extract_multiple_rows" type="bool">
  If checked, it will extract multiple rows of data. If unchecked, it will extract a single row.
</ParamField>

<ParamField path="model" type="str">
  The model to use for the Google Sheets integration
</ParamField>

<ParamField path="provider" type="str">
  The provider to use for the Google Sheets integration
</ParamField>

<ParamField path="combine_filters" type="str">
  How to combine filter conditions
</ParamField>

<ParamField path="return_first_match" type="bool">
  Whether to return only the first matching row
</ParamField>

<ParamField path="sheet_url" type="str" required>
  Enter the URL of your Google Spreadsheet
</ParamField>

<ParamField path="condition" type="str">
  Conditional Operator
</ParamField>

<a id="integration_google_slides" />

## `integration_google_slides` — Google Slides

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_google_slides(tool_name="...", action="create_presentation", integration=..., title="...", presentation_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `create_presentation`, `get_slides`, `read_page`, `read_presentation`, `read_thumbnail`, `replace_text`
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="title" type="str" required>
  Title for the new presentation (defaults to 'Untitled Presentation')
</ParamField>

<ParamField path="presentation_id" type="str" required>
  Select a presentation to read
</ParamField>

<ParamField path="page_object_id" type="str" required>
  The object ID of the page/slide to read
</ParamField>

<ParamField path="mime_type" type="str">
  Format of the thumbnail
</ParamField>

<ParamField path="thumbnail_size" type="str">
  Size of the thumbnail
</ParamField>

<ParamField path="contains_text" type="str">
  The text to search for and replace
</ParamField>

<ParamField path="match_case" type="bool">
  Whether to match case when searching
</ParamField>

<ParamField path="replace_text" type="str">
  The text to replace with
</ParamField>

<ParamField path="revision_id" type="str">
  The revision ID of the presentation for version control. If specified, the request will only succeed if the presentation's current revision ID matches this value. Leave empty to apply changes without revision checking.
</ParamField>

<a id="integration_google_tasks" />

## `integration_google_tasks` — Google Tasks

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_google_tasks(tool_name="...", action="add_task", integration=..., task_list_id="...", task_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `add_task`, `delete_task`, `get_tasks`, `read_task`, `update_task`
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Google Tasks account
</ParamField>

<ParamField path="task_list_id" type="str" required>
  Select the task list
</ParamField>

<ParamField path="title" type="str">
  Task title
</ParamField>

<ParamField path="due" type="str">
  Due date
</ParamField>

<ParamField path="notes" type="str">
  Task notes
</ParamField>

<ParamField path="task_id" type="str" required>
  Select the task to delete
</ParamField>

<ParamField path="completed_max" type="str">
  Maximum completion time
</ParamField>

<ParamField path="completed_min" type="str">
  Minimum completion time
</ParamField>

<ParamField path="due_max" type="str">
  Maximum due date
</ParamField>

<ParamField path="due_min" type="str">
  Minimum due date
</ParamField>

<ParamField path="max_results" type="int">
  Maximum number of tasks to return
</ParamField>

<ParamField path="show_completed" type="bool">
  Include completed tasks
</ParamField>

<ParamField path="show_deleted" type="bool">
  Include deleted tasks
</ParamField>

<ParamField path="show_hidden" type="bool">
  Include hidden tasks
</ParamField>

<ParamField path="updated_min" type="str">
  Minimum update time
</ParamField>

<ParamField path="status" type="str">
  Task status
</ParamField>

<a id="integration_google_workspace_admin" />

## `integration_google_workspace_admin` — Google Workspace Admin

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_google_workspace_admin(tool_name="...", action="add_user_to_group", group_id="...", integration=..., user_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_user_to_group`, `change_chromeos_device_status`, `create_group`, `create_user`, `delete_group`, `delete_user`, `get_chromeos_devices`, `get_groups`, `get_users`, `read_chromeos_device`, `read_group`, `read_user`, `remove_user_from_group`, `update_chromeos_device`, `update_group`, `update_user`
  </Expandable>
</ParamField>

<ParamField path="group_id" type="str" required>
  The unique identifier or email of the group
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="user_id" type="str" required>
  The unique identifier or email of the user to delete
</ParamField>

<ParamField path="role" type="str">
  The role of the user in the group
</ParamField>

<ParamField path="device_action" type="str" required>
  The action to perform on the device
</ParamField>

<ParamField path="device_id" type="str" required>
  The unique identifier of the ChromeOS device
</ParamField>

<ParamField path="deprovision_reason" type="str">
  Provide a reason for deprovisioning (only required if the Device Action is set to 'Deprovision')
</ParamField>

<ParamField path="group_email" type="str">
  The email address of the group
</ParamField>

<ParamField path="group_name" type="str">
  The name of the group
</ParamField>

<ParamField path="description" type="str">
  The description of the group
</ParamField>

<ParamField path="first_name" type="str">
  The first name of the user
</ParamField>

<ParamField path="last_name" type="str">
  The last name of the user
</ParamField>

<ParamField path="password" type="str">
  The password for the user
</ParamField>

<ParamField path="primary_email" type="str">
  The primary email address of the user
</ParamField>

<ParamField path="change_password_at_next_login" type="bool">
  Force user to change password on next login
</ParamField>

<ParamField path="org_unit_path" type="str">
  Filter by organizational unit path
</ParamField>

<ParamField path="max_results" type="int" required>
  Maximum number of results to return (1-200)
</ParamField>

<ParamField path="asset_id" type="str">
  Filter by asset ID
</ParamField>

<ParamField path="ethernet_mac" type="str">
  Filter by Ethernet MAC address (no colons)
</ParamField>

<ParamField path="include_child_orgunits" type="bool">
  Include devices from child organizational units
</ParamField>

<ParamField path="location" type="str">
  Filter by annotated location
</ParamField>

<ParamField path="notes" type="str">
  Filter by device notes
</ParamField>

<ParamField path="order_by" type="str">
  Field to order results by
</ParamField>

<ParamField path="projection" type="str">
  What subset of fields to fetch
</ParamField>

<ParamField path="query" type="str">
  Raw query string for advanced filtering
</ParamField>

<ParamField path="register_date" type="str">
  Filter by registration date (YYYY-MM-DD)
</ParamField>

<ParamField path="serial_number" type="str">
  Filter by serial number (partial search, min 3 chars)
</ParamField>

<ParamField path="sort_order" type="str">
  Sort order for results
</ParamField>

<ParamField path="status" type="str">
  Filter by device status
</ParamField>

<ParamField path="sync_date" type="str">
  Filter by last sync date (YYYY-MM-DD)
</ParamField>

<ParamField path="user" type="str">
  Filter by annotated user
</ParamField>

<ParamField path="wifi_mac" type="str">
  Filter by WiFi MAC address (no colons)
</ParamField>

<ParamField path="domain" type="str">
  The domain name to filter users
</ParamField>

<ParamField path="search_group_email" type="str">
  Search by group email
</ParamField>

<ParamField path="search_group_name" type="str">
  Search by group name
</ParamField>

<ParamField path="user_key" type="str">
  Filter groups by user membership
</ParamField>

<ParamField path="email" type="str">
  Search by email address
</ParamField>

<ParamField path="email_prefix" type="str">
  Search by email prefix (e.g., admin\*)
</ParamField>

<ParamField path="family_name" type="str">
  Search by last name
</ParamField>

<ParamField path="given_name" type="str">
  Search by first name
</ParamField>

<ParamField path="is_admin" type="bool">
  Filter by admin status
</ParamField>

<ParamField path="is_archived" type="bool">
  Filter by archived status
</ParamField>

<ParamField path="is_delegated_admin" type="bool">
  Filter by delegated admin status
</ParamField>

<ParamField path="is_suspended" type="bool">
  Filter by suspension status
</ParamField>

<ParamField path="name" type="str">
  Search by name (given name, family name, or email)
</ParamField>

<ParamField path="show_deleted" type="bool">
  Include deleted users in results
</ParamField>

<ParamField path="view_type" type="str">
  View type for results
</ParamField>

<ParamField path="annotated_asset_id" type="str">
  The new annotated asset ID
</ParamField>

<ParamField path="annotated_location" type="str">
  The new annotated location
</ParamField>

<ParamField path="annotated_user" type="str">
  The new annotated user
</ParamField>

<ParamField path="suspended" type="bool">
  Whether to suspend the user
</ParamField>

<a id="integration_hubspot" />

## `integration_hubspot` — Hubspot

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_hubspot(tool_name="...", action="add_contact_to_list", integration=..., list_id="...", create_company_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_contact_to_list`, `create_company`, `create_contact`, `create_deal`, `create_engagement`, `create_ticket`, `delete_company`, `delete_contact`, `delete_deal`, `delete_engagement`, `delete_ticket`, `get_companies`, `get_contacts`, `get_deals`, `get_engagements`, `get_tickets`, `read_company`, `read_contact`, `read_deal`, `read_engagement`, `read_ticket`, `remove_contact_from_list`, `update_company`, `update_contact`, `update_deal`, `update_ticket`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="list_id" type="str" required>
  HubSpot list ID (required)
</ParamField>

<ParamField path="by" type="str">
  Method to identify contacts: email or Contact ID
</ParamField>

<ParamField path="contact_ids" type="str">
  Comma-separated contact IDs
</ParamField>

<ParamField path="emails" type="str">
  Comma-separated email addresses (e.g., [email1@example.com](mailto:email1@example.com),[email2@example.com](mailto:email2@example.com))
</ParamField>

<ParamField path="create_company_name" type="str" required>
  Required company name
</ParamField>

<ParamField path="about_us" type="str">
  About the company
</ParamField>

<ParamField path="annual_revenue" type="int | str">
  Annual revenue
</ParamField>

<ParamField path="city" type="str">
  City of residence
</ParamField>

<ParamField path="company_domain_name" type="str">
  Company's domain name
</ParamField>

<ParamField path="company_owner" type="str">
  Owner's user ID
</ParamField>

<ParamField path="country_region" type="str">
  Country or region
</ParamField>

<ParamField path="description" type="str">
  Company description
</ParamField>

<ParamField path="industry" type="str">
  Type of industry
</ParamField>

<ParamField path="lead_status" type="str">
  Filter by lead status
</ParamField>

<ParamField path="lifecycle" type="str">
  Lifecycle stage
</ParamField>

<ParamField path="number_of_employees" type="int | str">
  Employee count
</ParamField>

<ParamField path="phone_number" type="str">
  Main phone number
</ParamField>

<ParamField path="website_url" type="str">
  Contact's website
</ParamField>

<ParamField path="create_email" type="str" required>
  Required contact email
</ParamField>

<ParamField path="associated_company_id" type="str">
  ID of associated company
</ParamField>

<ParamField path="company" type="str">
  Name of the company
</ParamField>

<ParamField path="country" type="str">
  Country name
</ParamField>

<ParamField path="custom_properties" type="str">
  Custom properties to add to the contact
</ParamField>

<ParamField path="first_name" type="str">
  Contact's first name
</ParamField>

<ParamField path="job_title" type="str">
  Job title of the contact
</ParamField>

<ParamField path="last_name" type="str">
  Contact's last name
</ParamField>

<ParamField path="mobile_phone_number" type="str">
  Mobile number
</ParamField>

<ParamField path="postal_code" type="str">
  Postal or ZIP code
</ParamField>

<ParamField path="state_region" type="str">
  State or region
</ParamField>

<ParamField path="street_address" type="str">
  Street address
</ParamField>

<ParamField path="create_deal_stage" type="str" required>
  Required deal stage ID
</ParamField>

<ParamField path="amount" type="int | str">
  Deal amount
</ParamField>

<ParamField path="associated_company" type="str">
  Associated company IDs
</ParamField>

<ParamField path="associated_vids" type="str">
  Associated contact IDs
</ParamField>

<ParamField path="close_date" type="str">
  Deal close date (ISO 8601 format)
</ParamField>

<ParamField path="deal_name" type="str">
  Deal name
</ParamField>

<ParamField path="deal_owner" type="str">
  Deal owner ID
</ParamField>

<ParamField path="deal_type" type="str">
  Deal type
</ParamField>

<ParamField path="pipeline" type="Pipeline | str">
  Pipeline ID
</ParamField>

<ParamField path="create_engagement_type" type="str" required>
  Select Engagement type (required)
</ParamField>

<ParamField path="company_ids" type="str">
  Comma-separated company IDs
</ParamField>

<ParamField path="deal_ids" type="str">
  Comma-separated deal IDs
</ParamField>

<ParamField path="metadata" type="str">
  Type-specific metadata (JSON)
</ParamField>

<ParamField path="owner_id" type="str">
  Engagement owner ID
</ParamField>

<ParamField path="timestamp" type="str">
  Engagement timestamp (ISO 8601 format)
</ParamField>

<ParamField path="create_ticket_name" type="str" required>
  Ticket subject (required)
</ParamField>

<ParamField path="create_ticket_pipeline_id" type="str" required>
  Pipeline ID (required)
</ParamField>

<ParamField path="create_ticket_stage_id" type="str" required>
  Stage ID (required)
</ParamField>

<ParamField path="associated_company_ids" type="str">
  Associated companies
</ParamField>

<ParamField path="associated_contact_ids" type="str">
  Associated contacts
</ParamField>

<ParamField path="category" type="str">
  Ticket category
</ParamField>

<ParamField path="priority" type="str">
  Priority level
</ParamField>

<ParamField path="ticket_owner_id" type="str">
  Ticket owner ID
</ParamField>

<ParamField path="delete_company_id" type="str" required>
  HubSpot company ID to delete (required)
</ParamField>

<ParamField path="delete_contact_id" type="str" required>
  HubSpot contact ID to delete (required)
</ParamField>

<ParamField path="delete_deal_id" type="str" required>
  HubSpot deal ID to delete (required)
</ParamField>

<ParamField path="delete_engagement_id" type="str" required>
  HubSpot engagement ID to delete (required)
</ParamField>

<ParamField path="type" type="str">
  Filter by company type
</ParamField>

<ParamField path="delete_ticket_id" type="str" required>
  HubSpot ticket ID to delete (required)
</ParamField>

<ParamField path="created_date" type="str">
  Filter by creation date (ISO 8601 format)
</ParamField>

<ParamField path="domain" type="str">
  Search by domain
</ParamField>

<ParamField path="founded_year" type="str">
  Filter by founded year
</ParamField>

<ParamField path="hs_analytics_source" type="str">
  Filter by original source
</ParamField>

<ParamField path="hs_analytics_source_data_1" type="str">
  Filter by source data 1
</ParamField>

<ParamField path="hs_analytics_source_data_2" type="str">
  Filter by source data 2
</ParamField>

<ParamField path="hubspot_owner_id" type="str">
  Filter by contact owner ID
</ParamField>

<ParamField path="is_public" type="bool">
  Filter by public company status
</ParamField>

<ParamField path="last_modified_date" type="str">
  Filter by last modified date (ISO 8601 format)
</ParamField>

<ParamField path="lifecycle_stage" type="str">
  Filter by lifecycle stage
</ParamField>

<ParamField path="name" type="str">
  Search by company name
</ParamField>

<ParamField path="phone" type="str">
  Search by phone number
</ParamField>

<ParamField path="properties" type="str">
  Comma-separated properties to fetch
</ParamField>

<ParamField path="query" type="str">
  General search query
</ParamField>

<ParamField path="sort_by" type="str">
  Field to sort by
</ParamField>

<ParamField path="sort_order" type="str">
  Sort order (asc/desc)
</ParamField>

<ParamField path="state" type="str">
  Search by state
</ParamField>

<ParamField path="web_technologies" type="str">
  Filter by web technologies
</ParamField>

<ParamField path="zip" type="str">
  Search by zip code
</ParamField>

<ParamField path="company_name" type="str">
  Search by company name
</ParamField>

<ParamField path="email" type="str">
  Search by email address
</ParamField>

<ParamField path="hs_latest_source" type="str">
  Filter by latest source
</ParamField>

<ParamField path="hs_lead_status" type="str">
  Filter by HubSpot lead status
</ParamField>

<ParamField path="website" type="str">
  Search by website
</ParamField>

<ParamField path="deal_currency_code" type="str">
  Filter by currency code
</ParamField>

<ParamField path="deal_stage" type="str">
  Filter by deal stage
</ParamField>

<ParamField path="hs_date_entered_closed_lost" type="str">
  Filter by date entered closed lost (ISO 8601 format)
</ParamField>

<ParamField path="hs_date_entered_closed_won" type="str">
  Filter by date entered closed won (ISO 8601 format)
</ParamField>

<ParamField path="hs_deal_stage_probability" type="str">
  Filter by deal probability
</ParamField>

<ParamField path="hs_forecast_amount" type="str">
  Filter by forecast amount
</ParamField>

<ParamField path="hs_is_closed" type="bool">
  Filter by closed status
</ParamField>

<ParamField path="hs_is_deal_split" type="bool">
  Filter by deal split status
</ParamField>

<ParamField path="num_associated_contacts" type="str">
  Filter by number of associated contacts
</ParamField>

<ParamField path="num_contacted_notes" type="str">
  Filter by number of contact notes
</ParamField>

<ParamField path="company_id" type="str">
  Filter by associated company ID
</ParamField>

<ParamField path="contact_id" type="str">
  Filter by associated contact ID
</ParamField>

<ParamField path="deal_id" type="str">
  Filter by associated deal ID
</ParamField>

<ParamField path="engagement_type" type="str">
  Filter by engagement type (CALL, EMAIL, MEETING, TASK)
</ParamField>

<ParamField path="hs_activity_type" type="str">
  Filter by activity type
</ParamField>

<ParamField path="hs_communication_channel_type" type="str">
  Filter by communication channel type
</ParamField>

<ParamField path="hs_communication_logged_from" type="str">
  Filter by where engagement was logged from
</ParamField>

<ParamField path="closed_date" type="str">
  Filter by closed date (ISO 8601 format)
</ParamField>

<ParamField path="first_agent_reply_date" type="str">
  Filter by first agent reply date (ISO 8601 format)
</ParamField>

<ParamField path="hs_num_times_contacted" type="str">
  Filter by number of times contacted
</ParamField>

<ParamField path="hs_pipeline" type="str">
  Filter by pipeline
</ParamField>

<ParamField path="hs_pipeline_stage" type="str">
  Filter by pipeline stage
</ParamField>

<ParamField path="hs_resolution" type="str">
  Filter by ticket resolution
</ParamField>

<ParamField path="hs_ticket_category" type="str">
  Filter by ticket category
</ParamField>

<ParamField path="hs_ticket_priority" type="str">
  Filter by ticket priority
</ParamField>

<ParamField path="hs_time_to_close" type="str">
  Filter by time to close (milliseconds)
</ParamField>

<ParamField path="hs_time_to_first_agent_reply" type="str">
  Filter by time to first agent reply
</ParamField>

<ParamField path="source_type" type="str">
  Filter by source type
</ParamField>

<ParamField path="subject" type="str">
  Search by ticket subject
</ParamField>

<ParamField path="tags" type="str">
  Filter by tags (comma-separated)
</ParamField>

<ParamField path="read_company_id" type="str" required>
  HubSpot company ID to read (required)
</ParamField>

<ParamField path="include_merge_audits" type="bool">
  Include merge history if true
</ParamField>

<ParamField path="read_contact_id" type="str" required>
  HubSpot contact ID to read (required)
</ParamField>

<ParamField path="show_list_memberships" type="bool">
  Include list memberships
</ParamField>

<ParamField path="read_deal_id" type="str" required>
  HubSpot deal ID to read (required)
</ParamField>

<ParamField path="include_property_versions" type="bool">
  Include property history if true
</ParamField>

<ParamField path="read_engagement_id" type="str" required>
  HubSpot engagement ID to read (required)
</ParamField>

<ParamField path="read_ticket_id" type="str" required>
  HubSpot ticket ID to read (required)
</ParamField>

<ParamField path="update_company_id" type="str" required>
  HubSpot company ID to update (required)
</ParamField>

<ParamField path="update_about_us" type="str">
  About the company
</ParamField>

<ParamField path="update_annual_revenue" type="int">
  Annual revenue
</ParamField>

<ParamField path="update_city" type="str">
  City of residence
</ParamField>

<ParamField path="update_company_domain_name" type="str">
  Company domain
</ParamField>

<ParamField path="update_company_name" type="str">
  Company name
</ParamField>

<ParamField path="update_company_owner" type="str">
  Owner's user ID
</ParamField>

<ParamField path="update_country_region" type="str">
  Country or region
</ParamField>

<ParamField path="update_description" type="str">
  Company description
</ParamField>

<ParamField path="update_industry" type="str">
  Type of industry
</ParamField>

<ParamField path="update_lead_status" type="str">
  Lead status
</ParamField>

<ParamField path="update_lifecycle" type="str">
  Lifecycle stage
</ParamField>

<ParamField path="update_number_of_employees" type="int">
  Employee count
</ParamField>

<ParamField path="update_phone_number" type="str">
  Main phone number
</ParamField>

<ParamField path="update_website_url" type="str">
  Contact's website
</ParamField>

<ParamField path="update_contact_id" type="str" required>
  HubSpot contact ID to update (required)
</ParamField>

<ParamField path="update_company" type="str">
  Name of the company
</ParamField>

<ParamField path="update_country" type="str">
  Country name
</ParamField>

<ParamField path="update_custom_properties" type="str">
  Custom properties to add to the contact
</ParamField>

<ParamField path="update_email" type="str">
  Contact email
</ParamField>

<ParamField path="update_first_name" type="str">
  Contact's first name
</ParamField>

<ParamField path="update_job_title" type="str">
  Job title of the contact
</ParamField>

<ParamField path="update_last_name" type="str">
  Contact's last name
</ParamField>

<ParamField path="update_mobile_phone_number" type="str">
  Mobile number
</ParamField>

<ParamField path="update_postal_code" type="str">
  Postal or ZIP code
</ParamField>

<ParamField path="update_state_region" type="str">
  State or region
</ParamField>

<ParamField path="update_street_address" type="str">
  Street address
</ParamField>

<ParamField path="update_deal_id" type="str" required>
  HubSpot deal ID to update (required)
</ParamField>

<ParamField path="update_amount" type="int">
  Deal amount
</ParamField>

<ParamField path="update_close_date" type="str">
  Deal close date (ISO 8601 format)
</ParamField>

<ParamField path="update_deal_name" type="str">
  Deal name
</ParamField>

<ParamField path="update_deal_owner" type="str">
  Deal owner ID
</ParamField>

<ParamField path="update_deal_stage" type="str">
  Deal stage ID
</ParamField>

<ParamField path="update_deal_type" type="str">
  Deal type
</ParamField>

<ParamField path="update_pipeline" type="str">
  Pipeline ID
</ParamField>

<ParamField path="update_ticket_id" type="str" required>
  HubSpot ticket ID to update (required)
</ParamField>

<ParamField path="update_category" type="str">
  Ticket category
</ParamField>

<ParamField path="update_priority" type="str">
  Priority level
</ParamField>

<ParamField path="update_stage_id" type="str">
  Stage ID
</ParamField>

<ParamField path="update_ticket_name" type="str">
  Ticket subject
</ParamField>

<ParamField path="update_ticket_owner_id" type="str">
  Ticket owner ID
</ParamField>

<a id="integration_intercom" />

## `integration_intercom` — Intercom

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_intercom(tool_name="...", action="create_company", integration=..., id_value="...", identifier_type="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `create_company`, `create_lead`, `create_user`, `delete_lead`, `delete_user`, `get_company`, `get_lead`, `get_user`, `list_companies`, `list_company_users`, `list_leads`, `list_users`, `update_company`, `update_lead`, `update_user`
  </Expandable>
</ParamField>

<ParamField path="company_id" type="str">
  The unique identifier for the company in your system
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Intercom account
</ParamField>

<ParamField path="custom_attributes" type="str">
  Custom attributes as key:value pairs, comma-separated (e.g., plan:premium,tier:gold)
</ParamField>

<ParamField path="industry" type="str">
  The industry the company operates in
</ParamField>

<ParamField path="monthly_spend" type="int">
  The monthly revenue from this company
</ParamField>

<ParamField path="name" type="str">
  The name of the company
</ParamField>

<ParamField path="plan" type="str">
  The name of the plan the company is on
</ParamField>

<ParamField path="size" type="int">
  The number of employees
</ParamField>

<ParamField path="website" type="str">
  The company's website URL
</ParamField>

<ParamField path="email" type="str">
  The email address of the lead
</ParamField>

<ParamField path="avatar" type="str">
  URL of the lead's avatar image
</ParamField>

<ParamField path="companies" type="str">
  Select companies from dropdown, or enter company IDs comma-separated (e.g., company-1,company-2)
</ParamField>

<ParamField path="phone" type="str">
  The phone number of the lead
</ParamField>

<ParamField path="unsubscribed_from_emails" type="bool">
  Whether the lead has unsubscribed from emails
</ParamField>

<ParamField path="update_last_request_at" type="bool">
  Whether to update the last request timestamp
</ParamField>

<ParamField path="utm_campaign" type="str">
  UTM campaign parameter
</ParamField>

<ParamField path="utm_content" type="str">
  UTM content parameter
</ParamField>

<ParamField path="utm_medium" type="str">
  UTM medium parameter
</ParamField>

<ParamField path="utm_source" type="str">
  UTM source parameter
</ParamField>

<ParamField path="utm_term" type="str">
  UTM term parameter
</ParamField>

<ParamField path="id_value" type="str" required>
  The email or user ID for the user
</ParamField>

<ParamField path="identifier_type" type="str" required>
  How to identify the user
</ParamField>

<ParamField path="session_count" type="int">
  Number of sessions the user has had
</ParamField>

<ParamField path="value" type="str" required>
  The value to search for based on the selected field
</ParamField>

<ParamField path="delete_by" type="str">
  How to identify the lead to delete
</ParamField>

<ParamField path="select_by" type="str">
  How to identify the company
</ParamField>

<ParamField path="limit" type="int">
  Maximum number of companies to retrieve
</ParamField>

<ParamField path="segment_id" type="str">
  Filter by segment ID (optional)
</ParamField>

<ParamField path="tag_id" type="str">
  Filter by tag ID (optional)
</ParamField>

<ParamField path="list_by" type="str">
  How to identify the company
</ParamField>

<ParamField path="update_by" type="str">
  How to identify the lead to update
</ParamField>

<a id="integration_jira" />

## `integration_jira` — Jira

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_jira(tool_name="...", action="add_attachment", file="...", integration=..., issue_key="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_attachment`, `add_issue_comment`, `changelog`, `create_issue`, `create_user`, `delete_issue`, `get_attachments`, `get_issues`, `get_users`, `notify_issue`, `read_attachment`, `read_issue`, `read_issue_comments`, `read_user`, `remove_attachment`, `remove_comment`, `remove_user`, `status_transitions`, `update_comment`, `update_issue`
  </Expandable>
</ParamField>

<ParamField path="file" type="str" required>
  File to attach to the issue
</ParamField>

<ParamField path="integration" type="Any" required />

<ParamField path="issue_key" type="str" required>
  The key of the issue to get changelog for
</ParamField>

<ParamField path="project" type="str">
  The name of the project
</ParamField>

<ParamField path="site" type="str" required>
  The name of the Jira site
</ParamField>

<ParamField path="comment" type="str">
  Search in issue comments
</ParamField>

<ParamField path="visibility_role" type="str">
  Restrict comment visibility to a project role (leave empty for public comment)
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of changelog entries to return
</ParamField>

<ParamField path="issue_type" type="str">
  Type of issue (e.g. Task, Bug, Story)
</ParamField>

<ParamField path="summary" type="str" required>
  A brief title or summary of the issue
</ParamField>

<ParamField path="assignee_name" type="str">
  Account Name of the user to assign the issue to
</ParamField>

<ParamField path="description" type="str">
  Detailed description of the issue
</ParamField>

<ParamField path="parent_issue_key" type="str">
  Parent Issue Key (for subtasks)
</ParamField>

<ParamField path="email_address" type="str" required>
  Email address of the user exact\_date (Dict\[str, Any])
</ParamField>

<ParamField path="notification" type="bool">
  If enabled, sends an invitation email to the user
</ParamField>

<ParamField path="delete_subtasks" type="bool">
  Whether to delete subtasks along with the issue
</ParamField>

<ParamField path="download" type="bool">
  Whether to download the attachment content
</ParamField>

<ParamField path="affected_version" type="str">
  Filter by affected version
</ParamField>

<ParamField path="comment_exact" type="str">
  Match comment exactly
</ParamField>

<ParamField path="component" type="str">
  Filter by issue component
</ParamField>

<ParamField path="created" type="str">
  Issue creation (YYYY-MM-DD) date\_range (Dict\[str, Any])
</ParamField>

<ParamField path="description_exact" type="str">
  Match description exactly
</ParamField>

<ParamField path="due" type="str">
  Due (YYYY-MM-DD)
</ParamField>

<ParamField path="fix_version" type="str">
  Filter by fix version
</ParamField>

<ParamField path="issue_summary" type="str">
  Search by issue summary
</ParamField>

<ParamField path="labels" type="str">
  Filter by issue labels
</ParamField>

<ParamField path="query" type="str">
  The query to filter issues
</ParamField>

<ParamField path="reporter_name" type="str">
  Account Name of the user who reported the issue
</ParamField>

<ParamField path="resolution" type="str">
  Filter by resolution status
</ParamField>

<ParamField path="resolved" type="str">
  Resolution (YYYY-MM-DD)
</ParamField>

<ParamField path="status" type="str">
  The status of the issue (e.g. Open, Closed, In Progress)
</ParamField>

<ParamField path="summary_exact" type="str">
  Match summary exactly
</ParamField>

<ParamField path="text" type="str">
  Search in all text fields
</ParamField>

<ParamField path="text_exact" type="str">
  Match text exactly across fields
</ParamField>

<ParamField path="updated" type="str">
  Last update (YYYY-MM-DD)
</ParamField>

<ParamField path="group_names" type="str">
  Comma-separated list of group names to notify
</ParamField>

<ParamField path="html_body" type="str">
  HTML body of the notification integration (Any)
</ParamField>

<ParamField path="notify_assignee" type="bool">
  Send notification to the issue assignee (note: Jira prevents self-notification, so this will fail if you are the assignee)
</ParamField>

<ParamField path="notify_reporter" type="bool">
  Send notification to the issue reporter (note: Jira prevents self-notification, so this will fail if you are the reporter)
</ParamField>

<ParamField path="notify_voters" type="bool">
  Send notification to issue voters (note: Jira prevents self-notification, so this will fail if you are the only voter)
</ParamField>

<ParamField path="notify_watchers" type="bool">
  Send notification to issue watchers (note: Jira prevents self-notification, so this will fail if you are the only watcher)
</ParamField>

<ParamField path="subject" type="str">
  Subject of the email notification
</ParamField>

<ParamField path="text_body" type="str">
  Plain text body of the notification
</ParamField>

<ParamField path="user_account_ids" type="str">
  Comma-separated list of user account IDs to notify
</ParamField>

<ParamField path="attachment_id" type="str" required>
  The ID of the attachment to retrieve
</ParamField>

<ParamField path="account_id" type="str" required>
  The account ID of the user to retrieve
</ParamField>

<ParamField path="expand" type="str">
  Additional information to include
</ParamField>

<ParamField path="comment_id" type="str" required>
  The ID of the comment to remove
</ParamField>

<ParamField path="skip_remote_only_condition" type="bool">
  Include transitions with remote-only conditions
</ParamField>

<ParamField path="transition_id" type="str">
  ID of specific transition to get
</ParamField>

<ParamField path="use_wiki_markup" type="bool">
  Enable wiki markup parsing
</ParamField>

<ParamField path="update_assignee_name" type="str">
  Account Name of the user to assign the issue to
</ParamField>

<ParamField path="update_description" type="str">
  The new description for the issue
</ParamField>

<ParamField path="update_issue_type" type="str">
  Type of issue (e.g. Task, Bug, Story)
</ParamField>

<ParamField path="update_summary" type="str">
  The new summary for the issue
</ParamField>

<a id="integration_linear" />

## `integration_linear` — Linear

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_linear(tool_name="...", action="add_link", integration=..., issue_id="...", link="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `add_link`, `create_comment`, `create_new_issue`, `delete_issue`, `get_issue`, `list_issues`, `update_issue`
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="issue_id" type="str" required>
  The ID of the issue to update
</ParamField>

<ParamField path="link" type="str" required>
  The URL to attach to the issue
</ParamField>

<ParamField path="team_id" type="str">
  The team within Linear
</ParamField>

<ParamField path="comment" type="str" required>
  The comment text
</ParamField>

<ParamField path="parent_id" type="str">
  ID of parent comment for replies (optional)
</ParamField>

<ParamField path="title" type="str">
  The title of the issue
</ParamField>

<ParamField path="assignee_id" type="str">
  Assign the issue to a user
</ParamField>

<ParamField path="description" type="str">
  The description of the ticket
</ParamField>

<ParamField path="priority" type="str">
  Issue priority
</ParamField>

<ParamField path="state_id" type="str">
  Set the workflow state
</ParamField>

<ParamField path="return_all" type="bool">
  Return all matching issues regardless of count
</ParamField>

<ParamField path="update_team_id" type="str">
  Move to a different team
</ParamField>

<a id="integration_linkedin" />

## `integration_linkedin` — Linkedin

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_linkedin(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="integration" type="Any">
  Connect to your account
</ParamField>

<ParamField path="post_text" type="str" default="''">
  Content you wanted to post on your LinkedIn
</ParamField>

<ParamField path="action" type="str" default="''">
  Select the action to perform
</ParamField>

<a id="integration_mailchimp" />

## `integration_mailchimp` — Mailchimp

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_mailchimp(tool_name="...", action="add_member_tags", integration=..., list_id="...", member_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_member_tags`, `create_member`, `create_resend_campaign`, `delete_campaign`, `delete_member`, `get_campaign`, `get_member`, `list_campaigns`, `list_groups`, `list_members`, `remove_member_tags`, `replicate_campaign`, `send_campaign`, `update_member`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Mailchimp account
</ParamField>

<ParamField path="list_id" type="str" required>
  Choose the list to get groups from
</ParamField>

<ParamField path="member_id" type="str" required>
  Choose the member to retrieve
</ParamField>

<ParamField path="tags" type="list[str]" required>
  List of tags to add to the member
</ParamField>

<ParamField path="email_address" type="str">
  Email address of the new member
</ParamField>

<ParamField path="status" type="str">
  Filter campaigns by status
</ParamField>

<ParamField path="first_name" type="str">
  First name of the member (optional)
</ParamField>

<ParamField path="last_name" type="str">
  Last name of the member (optional)
</ParamField>

<ParamField path="campaign_id" type="str" required>
  Choose the campaign to retrieve
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of campaigns to return
</ParamField>

<ParamField path="type" type="str">
  Filter campaigns by type
</ParamField>

<a id="integration_mailgun" />

## `integration_mailgun` — Mailgun

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_mailgun(tool_name="...", action="add_contact_to_mailing_list", integration=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `add_contact_to_mailing_list`, `send_mail`
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="email" type="str">
  The email of the contact to be added to the list
</ParamField>

<ParamField path="list_name" type="str">
  The list the contact will be added to
</ParamField>

<ParamField path="name" type="str">
  The name of contact to be added to the list
</ParamField>

<ParamField path="bcc_recipients" type="str">
  The email(s) of the recipient(s) you want to BCC the email to
</ParamField>

<ParamField path="body" type="str">
  The body (message) of the email
</ParamField>

<ParamField path="cc_recipients" type="str">
  The email(s) of the recipient(s) you want to CC the email to
</ParamField>

<ParamField path="domain" type="str">
  Your Mailgun domain
</ParamField>

<ParamField path="from_email" type="str">
  The email of the sender of the email
</ParamField>

<ParamField path="from_name" type="str">
  The name of the sender of the email
</ParamField>

<ParamField path="recipients" type="str">
  The email of the recipient you want to send the email to, example: [john@company.com](mailto:john@company.com), [alex@company.com](mailto:alex@company.com)
</ParamField>

<ParamField path="subject" type="str">
  The subject of the email
</ParamField>

<a id="integration_microsoft" />

## `integration_microsoft` — OneDrive

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_microsoft(tool_name="...", action="add_file", integration=..., item_id="...", destination_folder_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_file`, `copy_file`, `create_file`, `create_file_share_link`, `create_folder`, `create_folder_share_link`, `delete_file`, `delete_folder`, `get_files`, `get_folders`, `read_file`, `read_folder`, `rename_file`, `rename_folder`, `search_file_folder`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="item_id" type="str" required>
  Select the folder within your OneDrive to add the file
</ParamField>

<ParamField path="file" type="str">
  Select or Upload a file
</ParamField>

<ParamField path="destination_folder_id" type="str" required>
  Select the destination folder
</ParamField>

<ParamField path="file_id" type="str" required>
  Select the file to read from OneDrive
</ParamField>

<ParamField path="new_name" type="str">
  New name for the copied file (optional)
</ParamField>

<ParamField path="file_content" type="str" required>
  Content of the file
</ParamField>

<ParamField path="file_name" type="str" required>
  Name of the file to create
</ParamField>

<ParamField path="folder_id" type="str" required>
  ID of the folder where the file will be created
</ParamField>

<ParamField path="content_type" type="str">
  MIME type of the file
</ParamField>

<ParamField path="link_scope" type="str" required>
  Scope of link
</ParamField>

<ParamField path="link_type" type="str" required>
  Type of link
</ParamField>

<ParamField path="expiration_date" type="str">
  Expiration date for the link (ISO 8601)
</ParamField>

<ParamField path="password" type="str">
  Password for the link (optional)
</ParamField>

<ParamField path="folder_name" type="str" required>
  Name of the folder to create
</ParamField>

<ParamField path="parent_folder_id" type="str" required>
  Select the parent folder
</ParamField>

<ParamField path="limit" type="int">
  Maximum number of files to return
</ParamField>

<ParamField path="search_folder_id" type="str">
  Select folder to search within (optional, leave empty to search all files)
</ParamField>

<ParamField path="search_query" type="str">
  Search query to filter files (searches within folder if selected, or across all files)
</ParamField>

<ParamField path="skip_token" type="str">
  Pagination token from next\_link output
</ParamField>

<ParamField path="order_by" type="str">
  Sort order
</ParamField>

<ParamField path="item_type" type="str">
  Filter results by type (business accounts only)
</ParamField>

<a id="integration_microsoft_calendar" />

## `integration_microsoft_calendar` — Outlook Calendar

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_microsoft_calendar(tool_name="...", action="check_availability", integration=..., event_id="...", attendee_emails=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `check_availability`, `create_calendar`, `delete_calendar`, `delete_event`, `find_meeting_times`, `get_calendar`, `get_event`, `get_user`, `list_calendars`, `list_events`, `list_people`, `list_users`, `new_event`, `update_calendar`, `update_event`
  </Expandable>
</ParamField>

<ParamField path="end_date_and_time" type="str">
  The last date and end time for everyday to look for availability
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="start_date_and_time" type="str">
  The first date and start time for everyday to look for availability
</ParamField>

<ParamField path="slot_duration" type="int">
  The duration of an individual slot to look for (in minutes). Default: 30 (in minutes)
</ParamField>

<ParamField path="timezone" type="str">
  IANA Time Zone code (e.g., US/Eastern)
</ParamField>

<ParamField path="calendar_name" type="str">
  The name of the calendar to create
</ParamField>

<ParamField path="color" type="str">
  Color for the calendar
</ParamField>

<ParamField path="calendar_id" type="str">
  The ID of the calendar to retrieve
</ParamField>

<ParamField path="event_id" type="str" required>
  The ID of the event to retrieve
</ParamField>

<ParamField path="attendee_emails" type="list[str]" required>
  List of attendee email addresses to find common available times.
</ParamField>

<ParamField path="meeting_duration" type="str" required>
  Duration of the meeting (e.g., 30, 60m, 1h, 90). Defaults to minutes if no suffix provided.
</ParamField>

<ParamField path="activity_domain" type="str">
  Controls which hours to consider for scheduling. 'Work' restricts suggestions to each attendee's individual work hours and timezone. 'Personal' extends to weekends. 'Unrestricted' allows any time of day.
</ParamField>

<ParamField path="attendee_types" type="list[str]">
  Type for each attendee (maps 1:1 with attendee emails). Values: 'required' (must attend), 'optional' (nice to have), 'resource' (room/equipment). Defaults to 'required' if not provided.
</ParamField>

<ParamField path="is_location_required" type="bool">
  Whether a meeting location is required for the suggestions.
</ParamField>

<ParamField path="is_organizer_optional" type="bool">
  Whether the organizer (you) is optional for the meeting
</ParamField>

<ParamField path="location_names" type="list[str]">
  Optional list of preferred meeting location names. Must be registered room resources in your organization (Exchange/Microsoft 365 room mailboxes). Graph API will attempt to resolve and verify room availability for each provided location.
</ParamField>

<ParamField path="max_suggestions" type="int">
  Maximum number of meeting time suggestions to return. Typical values: 5-20.
</ParamField>

<ParamField path="minimum_attendee_percentage" type="int">
  Minimum percentage of attendees that must be available for a slot to be suggested (0-100). Use 100 to require all attendees, or lower values (e.g., 50) for flexible scheduling where not everyone needs to attend.
</ParamField>

<ParamField path="suggest_location" type="bool">
  Whether the API should suggest available meeting rooms.
</ParamField>

<ParamField path="calendar_owner_email" type="str">
  Leave empty to use your own calendar. Enter someone else's email if you want to access their calendar and they have given you access.
</ParamField>

<ParamField path="user_identifier" type="str" required>
  The user's ID or organizational email (work/school accounts only, not personal @outlook.com/@hotmail.com)
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of calendars to retrieve
</ParamField>

<ParamField path="filter_query" type="str">
  Filter query to filter calendars. Examples: 'canShare eq true', 'canEdit eq true', 'isDefaultCalendar eq false'
</ParamField>

<ParamField path="order_by" type="str">
  Field to order results by
</ParamField>

<ParamField path="from_all_calendars" type="bool">
  Whether to list events from all calendars
</ParamField>

<ParamField path="has_attachments" type="bool">
  Filter for events with attachments
</ParamField>

<ParamField path="importance" type="str">
  Importance level of the event
</ParamField>

<ParamField path="is_all_day" type="bool">
  Filter for all-day events only
</ParamField>

<ParamField path="location_contains" type="str">
  Filter events by location
</ParamField>

<ParamField path="sensitivity" type="str">
  Sensitivity level of the event
</ParamField>

<ParamField path="show_as" type="str">
  How to show the time slot
</ParamField>

<ParamField path="subject_contains" type="str">
  Filter events by subject containing this text
</ParamField>

<ParamField path="search" type="str">
  Search users by display name or email
</ParamField>

<ParamField path="calendar" type="str" required>
  The ID of the calendar to create event in
</ParamField>

<ParamField path="duration" type="int" required>
  The duration of the event in minutes. Default: 30 (in minutes)
</ParamField>

<ParamField path="start_datetime" type="str">
  The start time of the event (RFC3339 format)
</ParamField>

<ParamField path="subject" type="str" required>
  The subject/title of the event
</ParamField>

<ParamField path="all_day_event" type="bool">
  Whether this is an all-day event
</ParamField>

<ParamField path="allow_new_time_proposals" type="bool">
  Whether attendees can propose new times
</ParamField>

<ParamField path="attachments" type="list[str]">
  Files to attach to the event. Files larger than 3 MB will be uploaded to OneDrive and a sharing link will be included in the event description.
</ParamField>

<ParamField path="attendees" type="str">
  Comma-separated list of attendee email addresses
</ParamField>

<ParamField path="body" type="str">
  Description/body of the event
</ParamField>

<ParamField path="categories" type="str">
  Comma-separated list of categories
</ParamField>

<ParamField path="hide_attendees" type="bool">
  Whether to hide attendees from each other
</ParamField>

<ParamField path="is_online_meeting" type="bool">
  Whether to create an online meeting
</ParamField>

<ParamField path="is_reminder_on" type="bool">
  Whether to enable reminder
</ParamField>

<ParamField path="location" type="str">
  Location of the event
</ParamField>

<ParamField path="online_meeting_provider" type="str">
  Provider for online meeting
</ParamField>

<ParamField path="reminder_minutes" type="int">
  Minutes before event to send reminder (default 15)
</ParamField>

<ParamField path="response_requested" type="bool">
  Whether responses are requested from attendees
</ParamField>

<ParamField path="description" type="str">
  New description/body of the event
</ParamField>

<ParamField path="end_datetime" type="str">
  New end time of the event (RFC3339 format)
</ParamField>

<ParamField path="event_subject" type="str">
  New subject/title of the event
</ParamField>

<a id="integration_microsoft_dynamics_crm" />

## `integration_microsoft_dynamics_crm` — Microsoft Dynamics CRM

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_microsoft_dynamics_crm(tool_name="...", action="create_account", create_account_name="...", integration=..., account_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `create_account`, `delete_account`, `get_account`, `list_accounts`, `update_account`
</ParamField>

<ParamField path="create_account_name" type="str" required>
  Name of the account (required)
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Microsoft Dynamics CRM account
</ParamField>

<ParamField path="account_number" type="str">
  Account number
</ParamField>

<ParamField path="additional_fields" type="str">
  Additional fields as JSON object
</ParamField>

<ParamField path="address_line1" type="str">
  Street address
</ParamField>

<ParamField path="city" type="str">
  City
</ParamField>

<ParamField path="country" type="str">
  Country
</ParamField>

<ParamField path="description" type="str">
  Description of the account
</ParamField>

<ParamField path="email" type="str">
  Primary email address
</ParamField>

<ParamField path="industry" type="str">
  Industry type
</ParamField>

<ParamField path="number_of_employees" type="int">
  Number of employees
</ParamField>

<ParamField path="phone" type="str">
  Primary phone number
</ParamField>

<ParamField path="postal_code" type="str">
  Postal or ZIP code
</ParamField>

<ParamField path="revenue" type="str">
  Annual revenue
</ParamField>

<ParamField path="state" type="str">
  State or Province
</ParamField>

<ParamField path="website" type="str">
  Website URL
</ParamField>

<ParamField path="account_id" type="str" required>
  Select the account to delete
</ParamField>

<ParamField path="expand" type="str">
  Related entities to expand (optional, e.g., primarycontactid)
</ParamField>

<ParamField path="select_fields" type="str">
  Comma-separated list of fields to return (optional, e.g., name,accountnumber,telephone1)
</ParamField>

<ParamField path="filter" type="str">
  OData filter expression (e.g., statecode eq 0)
</ParamField>

<ParamField path="order_by" type="str">
  Field to sort by (e.g., name asc, createdon desc)
</ParamField>

<ParamField path="name" type="str">
  Updated account name
</ParamField>

<a id="integration_microsoft_excel" />

## `integration_microsoft_excel` — Microsoft Excel 365

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_microsoft_excel(tool_name="...", action="add_worksheet", integration=..., workbook_id="...", worksheet_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_worksheet`, `append_table_rows`, `append_worksheet_rows`, `clear_worksheet`, `convert_table_to_range`, `create_table`, `delete_table`, `delete_workbook`, `delete_worksheet`, `get_table_columns`, `get_table_rows`, `get_worksheet_rows`, `list_workbooks`, `list_worksheets`, `lookup_table`, `update_worksheet`, `upsert_worksheet`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Microsoft Excel 365 account
</ParamField>

<ParamField path="workbook_id" type="str" required>
  Select the workbook
</ParamField>

<ParamField path="worksheet_name" type="str" required>
  Name for the new sheet
</ParamField>

<ParamField path="table_id" type="str" required>
  Select the table from your workbook
</ParamField>

<ParamField path="worksheet_id" type="str" required>
  Select the sheet from your workbook
</ParamField>

<ParamField path="range_address" type="str">
  The range address for the table (e.g., A1:D10)
</ParamField>

<ParamField path="has_headers" type="bool">
  Whether the range has header row
</ParamField>

<ParamField path="return_all" type="bool" required>
  When enabled, returns all columns (ignores limit)
</ParamField>

<ParamField path="limit" type="int">
  Maximum number of columns to return (default: 10)
</ParamField>

<ParamField path="fields" type="str">
  Comma-separated list of fields to include in response (e.g., id,name,position)
</ParamField>

<ParamField path="lookup_column" type="str" required>
  Column name to search in
</ParamField>

<ParamField path="lookup_value" type="str" required>
  Value to search for
</ParamField>

<ParamField path="row_data" type="str" required>
  JSON object or array of objects with column-value pairs (e.g., \{"Name": "John", "Age": 30} or \[\{"Name": "John"}, \{"Name": "Jane"}])
</ParamField>

<ParamField path="mode" type="str">
  Choose append or update mode
</ParamField>

<ParamField path="search_column" type="str">
  Column name to search for matching rows (used only in Update mode)
</ParamField>

<ParamField path="search_value" type="str">
  Value to search for in the search column (used only in Update mode)
</ParamField>

<a id="integration_microsoft_one_note" />

## `integration_microsoft_one_note` — Microsoft OneNote

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_microsoft_one_note(tool_name="...", action="copy_page", destination_section_id="...", integration=..., page_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `copy_page`, `create_notebook`, `create_page`, `create_section`, `create_section_group`, `delete_page`, `get_notebook`, `get_page`, `get_section`, `get_section_group`, `list_notebooks`, `list_pages`, `list_section_groups`, `list_sections`, `update_page`
  </Expandable>
</ParamField>

<ParamField path="destination_section_id" type="str" required>
  Select the section to copy the page to
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Microsoft OneNote account
</ParamField>

<ParamField path="page_id" type="str" required>
  Select a page
</ParamField>

<ParamField path="group_id" type="str">
  Optional group ID if copying to a group notebook
</ParamField>

<ParamField path="display_name" type="str" required>
  The name of the notebook to create
</ParamField>

<ParamField path="section_id" type="str">
  Select a section
</ParamField>

<ParamField path="content" type="str">
  Text content for the page body
</ParamField>

<ParamField path="file" type="str">
  Attach an image or file to the page (optional)
</ParamField>

<ParamField path="file_name" type="str">
  Name for the attached file (required if file is provided)
</ParamField>

<ParamField path="title" type="str">
  Title of the page
</ParamField>

<ParamField path="notebook_id" type="str" required>
  Select a notebook
</ParamField>

<ParamField path="section_group_id" type="str" required>
  Select a section group
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of notebooks to retrieve
</ParamField>

<ParamField path="order_by_field" type="str">
  Field to order results by
</ParamField>

<ParamField path="order_direction" type="str">
  The order to sort the data
</ParamField>

<ParamField path="query" type="str">
  Filter notebooks by name (leave empty to list all)
</ParamField>

<ParamField path="patch_action" type="str" required>
  The type of update to perform
</ParamField>

<ParamField path="position" type="str">
  For Insert: where to place content relative to target line
</ParamField>

<ParamField path="target_text" type="str">
  Find a line on the page to target. Leave empty to target the whole page body
</ParamField>

<a id="integration_microsoft_sql_server" />

## `integration_microsoft_sql_server` — Microsoft SQL Server

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_microsoft_sql_server(tool_name="...", action="create_rows", data="...", integration=..., table_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the database operation to perform
  One of: `create_rows`, `delete_rows`, `execute_query`, `get_tables`, `update_rows`
</ParamField>

<ParamField path="data" type="str" required>
  JSON array of objects or single object to insert into the table
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your SQL Server database
</ParamField>

<ParamField path="table_name" type="str" required>
  Name of the table to insert data into
</ParamField>

<ParamField path="batch_size" type="int">
  Number of rows to insert per batch
</ParamField>

<ParamField path="columns" type="list[str]">
  Specific columns to insert (optional - uses all if empty)
</ParamField>

<ParamField path="confirm_delete" type="bool" required>
  Confirm that you want to delete the specified records
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of rows to return
</ParamField>

<ParamField path="where_clause" type="str" required>
  WHERE condition to identify records to update
</ParamField>

<ParamField path="sql_query" type="str" required>
  SQL query to execute
</ParamField>

<ParamField path="parameters" type="list[str]">
  Query parameters for prepared statements
</ParamField>

<a id="integration_monday" />

## `integration_monday` — Monday

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_monday(tool_name="...", action="add_item_update", column_item_id="...", integration=..., update_text="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_item_update`, `archive_board`, `change_column_value`, `change_multiple_column_values`, `create_board`, `create_board_column`, `create_board_group`, `create_item`, `delete_board_group`, `delete_item`, `get_board`, `get_item`, `get_items_by_column_value`, `list_board_columns`, `list_board_groups`, `list_boards`, `list_items`, `move_item`
  </Expandable>
</ParamField>

<ParamField path="column_item_id" type="str" required>
  ID of the item to retrieve
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="update_text" type="str" required>
  Content of the update
</ParamField>

<ParamField path="board_id" type="str">
  The board to retrieve
</ParamField>

<ParamField path="workspace_id" type="str">
  The workspace to retrieve boards from
</ParamField>

<ParamField path="column_id" type="str" required>
  The column to update
</ParamField>

<ParamField path="value" type="str" required>
  New value for the column
</ParamField>

<ParamField path="name" type="str" required>
  Name of the board to create
</ParamField>

<ParamField path="board_kind" type="str">
  Type of board to create
</ParamField>

<ParamField path="description" type="str">
  Optional description for the board
</ParamField>

<ParamField path="template_id" type="str">
  Board ID of a saved template in your account.Only account-level templates are supported, not marketplace templates.
</ParamField>

<ParamField path="column_type" type="str" required>
  Type of column to create
</ParamField>

<ParamField path="title" type="str" required>
  Title of the column to create
</ParamField>

<ParamField path="defaults" type="str">
  Default values for the column. For Status/Dropdown: comma-separated labels (e.g. 'Working on it, Done, Stuck'). For Text: default text value. For Number: default number.
</ParamField>

<ParamField path="group_name" type="str" required>
  Name of the group to create
</ParamField>

<ParamField path="color" type="str">
  Select a color from the dropdown or provide a HEX code directly (e.g. #579bfc). Must include #.
</ParamField>

<ParamField path="position" type="str">
  Position of the group
</ParamField>

<ParamField path="group_id" type="str">
  The group to delete
</ParamField>

<ParamField path="item_name" type="str" required>
  Name of the item to create
</ParamField>

<ParamField path="column_value" type="str" required>
  Value to search for in the column
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of boards to return
</ParamField>

<ParamField path="include_archived" type="bool">
  Whether to include archived groups
</ParamField>

<ParamField path="state" type="str">
  Filter boards by state
</ParamField>

<ParamField path="filter_column_id" type="str">
  Column to filter by. Select a single column from the dropdown, or type comma-separated column names for multi-column filtering (e.g. 'Status,Priority').
</ParamField>

<ParamField path="filter_value" type="str">
  Value to match in the filter column. For multi-column filtering, use comma-separated values matching the order of columns (e.g. 'Done,High').
</ParamField>

<ParamField path="return_all" type="bool">
  When enabled, fetches all items from the board (ignores limit). Use with caution on large boards.
</ParamField>

<ParamField path="search_by_name" type="str">
  Search for items by item name. When provided, returns only items whose name matches the search term.
</ParamField>

<ParamField path="sort_by" type="str">
  Column to order results by. Use column name, column ID, or special values: **creation\_log** (created date), **last\_updated** (last modified).
</ParamField>

<ParamField path="sort_direction" type="str">
  Order of sorted results
</ParamField>

<ParamField path="target_group_id" type="str" required>
  ID of the group to move the item to
</ParamField>

<a id="integration_mongodb" />

## `integration_mongodb` — MongoDB

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_mongodb(tool_name="...", action="aggregate", integration=..., filter="...", replacement="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `aggregate`, `delete`, `find`, `find_and_replace`, `find_and_update`, `find_one`, `insert`, `mongodb_nl`, `mongodb_nl_aggregation`, `update`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="collection" type="str">
  The collection on which to perform the query
</ParamField>

<ParamField path="query" type="str">
  The MongoDB query to find all matching records
</ParamField>

<ParamField path="filter" type="str" required>
  The filter to select documents to update (JSON format)
</ParamField>

<ParamField path="replacement" type="str" required>
  The replacement document (JSON format)
</ParamField>

<ParamField path="update" type="str" required>
  The update operation (JSON format)
</ParamField>

<ParamField path="document" type="str" required>
  The document to insert (JSON format)
</ParamField>

<a id="integration_mysql" />

## `integration_mysql` — MySQL

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_mysql(tool_name="...", action="delete_table", delete_command="...", integration=..., table_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `delete_table`, `execute_query`, `insert`, `nl`, `nl_agent`, `raw_sql`, `select`, `update`, `upsert`
  </Expandable>
</ParamField>

<ParamField path="delete_command" type="str" required>
  Delete command to execute (truncate, delete, or drop)
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="table_name" type="str" required>
  Choose the table to insert into
</ParamField>

<ParamField path="connection_limit" type="int">
  Maximum number of connections (default: 10)
</ParamField>

<ParamField path="connection_timeout" type="int">
  Connection timeout in seconds (default: 30)
</ParamField>

<ParamField path="where_clause" type="str">
  Optional WHERE condition (without WHERE keyword)
</ParamField>

<ParamField path="sql_query" type="str" required>
  SQL query to execute
</ParamField>

<ParamField path="parameters" type="str">
  Comma-separated parameters for parameterized queries (optional)
</ParamField>

<ParamField path="data" type="str" required>
  JSON object with column-value pairs to insert
</ParamField>

<ParamField path="query" type="str">
  Natural language query to be converted to SQL query\_agent\_model (str) query\_type (str) sql\_generation\_model (str)
</ParamField>

<ParamField path="query_agent_model" type="str" />

<ParamField path="query_type" type="str" />

<ParamField path="sql_generation_model" type="str" />

<ParamField path="limit" type="int" required>
  Maximum number of rows to return
</ParamField>

<ParamField path="columns" type="str">
  Choose specific columns (comma-separated or select multiple)
</ParamField>

<ParamField path="order_by" type="str">
  Optional ORDER BY clause
</ParamField>

<ParamField path="column_to_match_on" type="str" required>
  Column used to find the row to update
</ParamField>

<ParamField path="value" type="str" required>
  Value in the match column to identify the row
</ParamField>

<a id="integration_notion" />

## `integration_notion` — Notion

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_notion(tool_name="...", action="archive_page", integration=..., page_id="...", item_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `archive_page`, `create_new_block`, `create_new_page`, `get_child_blocks`, `get_database_pages`, `get_databases`, `get_users`, `read_database`, `read_database_page`, `read_page`, `read_user`, `search_databases`, `search_pages`, `update_database`, `update_database_page`, `write_to_database`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="page_id" type="str" required>
  Select the page to archive
</ParamField>

<ParamField path="item_id" type="str" required>
  Select Notion Database
</ParamField>

<ParamField path="blocks" type="list[str]">
  Array of block objects. Each block should be a JSON string with 'type' (paragraph, heading\_1, heading\_2, heading\_3, toggle, to\_do, bulleted\_list\_item, numbered\_list\_item, image) and 'content' fields. Use checked for to\_do blocks to indicate if the task is completed. Content will not be used if blocks are provided. Example: \{"type":"paragraph","content":"Hello"}
</ParamField>

<ParamField path="icon" type="str">
  Icon emoji (e.g., 😀) or external file URL if type is 'file'
</ParamField>

<ParamField path="icon_type" type="str">
  Type of icon: emoji or external file URL
</ParamField>

<ParamField path="block_id" type="str" required>
  The ID of the parent block to get children from
</ParamField>

<ParamField path="limit" type="int">
  Maximum number of databases to return
</ParamField>

<ParamField path="return_all" type="bool">
  If true, returns all databases regardless of limit
</ParamField>

<ParamField path="database_id" type="str" required>
  Select Notion Database
</ParamField>

<ParamField path="user_id" type="str" required>
  The ID of the user to read
</ParamField>

<ParamField path="text" type="str" required>
  Text to search for in database names and content
</ParamField>

<ParamField path="get_page_content" type="bool">
  If true, fetches the text content of each matching page
</ParamField>

<ParamField path="condition" type="str">
  Conditional Operator
</ParamField>

<ParamField path="properties" type="str" required>
  JSON object containing properties to update
</ParamField>

<ParamField path="archived" type="bool">
  Whether to archive the page
</ParamField>

<a id="integration_openweathermap" />

## `integration_openweathermap` — Open Weather Map

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_openweathermap(tool_name="...", action="get_5_day_forecast", integration=..., units="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `get_5_day_forecast`, `get_current_weather`
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your OpenWeatherMap account
</ParamField>

<ParamField path="units" type="str" required>
  Temperature units
</ParamField>

<ParamField path="count" type="int">
  Number of forecast entries to return (max 40, each represents 3 hours)
</ParamField>

<ParamField path="language" type="str">
  Language code for weather descriptions (e.g., 'en', 'es', 'fr')
</ParamField>

<a id="integration_oracle_database" />

## `integration_oracle_database` — Oracle Database

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_oracle_database(tool_name="...", action="delete_table", delete_command="...", integration=..., schema="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `delete_table`, `execute_query`, `insert`, `select`, `update`, `upsert`
</ParamField>

<ParamField path="delete_command" type="str" required>
  Delete command to execute (truncate, delete, or drop)
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Oracle Database account
</ParamField>

<ParamField path="schema" type="str" required>
  Choose the schema
</ParamField>

<ParamField path="table_name" type="str" required>
  Choose the table to insert into
</ParamField>

<ParamField path="where_clause" type="str">
  Optional WHERE condition (without WHERE keyword)
</ParamField>

<ParamField path="sql_query" type="str" required>
  SQL query to execute (use :1, :2, etc. for parameters)
</ParamField>

<ParamField path="bind_variable_placeholder_values" type="str">
  Comma-separated values for bind variables (:1, :2, etc.) in the query
</ParamField>

<ParamField path="output_numbers_as_string" type="bool">
  Convert numeric values to strings in the output
</ParamField>

<ParamField path="data" type="list[str]" required>
  JSON objects with column-value pairs to insert (one per row)
</ParamField>

<ParamField path="auto_commit" type="bool">
  Automatically commit after each insert. If false, all inserts are wrapped in a transaction.
</ParamField>

<ParamField path="order_by" type="str">
  Optional ORDER BY clause
</ParamField>

<ParamField path="match_columns" type="str" required>
  Column(s) to match on for update (comma-separated). Rows matching these column values will be updated.
</ParamField>

<a id="integration_outlook" />

## `integration_outlook` — Outlook

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_outlook(tool_name="...", action="add_message_attachment", attachment="...", integration=..., message_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_message_attachment`, `create_contact`, `create_draft`, `create_folder`, `delete_contact`, `delete_draft`, `delete_folder`, `delete_message`, `download_message_attachment`, `draft_reply`, `get_contact`, `get_draft`, `get_folder`, `get_message`, `get_message_attachment`, `get_user`, `list_contacts`, `list_folder_messages`, `list_folders`, `list_message_attachments`, `list_people`, `list_users`, `move_message`, `read_email`, `send_draft`, `send_email`, `send_reply`, `update_contact`, `update_draft`, `update_folder`, `update_message`
  </Expandable>
</ParamField>

<ParamField path="attachment" type="str" required>
  The file to attach to the message
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="message_id" type="str" required>
  Select the message to get
</ParamField>

<ParamField path="first_name" type="str" required>
  The first name of the contact
</ParamField>

<ParamField path="last_name" type="str" required>
  The last name of the contact
</ParamField>

<ParamField path="birthday" type="str">
  Birthday date
</ParamField>

<ParamField path="business_address_city" type="str">
  Business address city
</ParamField>

<ParamField path="business_address_country" type="str">
  Business address country
</ParamField>

<ParamField path="business_address_postal_code" type="str">
  Business address postal/ZIP code
</ParamField>

<ParamField path="business_address_state" type="str">
  Business address state/province
</ParamField>

<ParamField path="business_address_street" type="str">
  Business street address
</ParamField>

<ParamField path="business_home_page" type="str">
  Company or business website URL
</ParamField>

<ParamField path="business_phones" type="str">
  Comma-separated list of business phone numbers
</ParamField>

<ParamField path="categories" type="str">
  Comma-separated list of categories
</ParamField>

<ParamField path="children" type="str">
  Comma-separated list of children's names
</ParamField>

<ParamField path="company_name" type="str">
  The company name
</ParamField>

<ParamField path="department" type="str">
  The department
</ParamField>

<ParamField path="display_name" type="str">
  The name of the folder to create
</ParamField>

<ParamField path="email_addresses" type="str">
  Comma-separated list of email addresses
</ParamField>

<ParamField path="file_as" type="str">
  How to file the contact
</ParamField>

<ParamField path="home_address_city" type="str">
  Home address city
</ParamField>

<ParamField path="home_address_country" type="str">
  Home address country
</ParamField>

<ParamField path="home_address_postal_code" type="str">
  Home address postal/ZIP code
</ParamField>

<ParamField path="home_address_state" type="str">
  Home address state/province
</ParamField>

<ParamField path="home_address_street" type="str">
  Home street address
</ParamField>

<ParamField path="home_phones" type="str">
  Comma-separated list of home phone numbers
</ParamField>

<ParamField path="im_addresses" type="str">
  Comma-separated list of instant messaging addresses
</ParamField>

<ParamField path="initials" type="str">
  Initials of the contact
</ParamField>

<ParamField path="job_title" type="str">
  The job title
</ParamField>

<ParamField path="manager" type="str">
  Manager's name
</ParamField>

<ParamField path="middle_name" type="str">
  The middle name of the contact
</ParamField>

<ParamField path="mobile_phone" type="str">
  The mobile phone number
</ParamField>

<ParamField path="nickname" type="str">
  Nickname of the contact
</ParamField>

<ParamField path="notes" type="str">
  Personal notes about the contact
</ParamField>

<ParamField path="office_location" type="str">
  The office location
</ParamField>

<ParamField path="other_address_city" type="str">
  Other address city
</ParamField>

<ParamField path="other_address_country" type="str">
  Other address country
</ParamField>

<ParamField path="other_address_postal_code" type="str">
  Other address postal/ZIP code
</ParamField>

<ParamField path="other_address_state" type="str">
  Other address state/province
</ParamField>

<ParamField path="other_address_street" type="str">
  Other street address
</ParamField>

<ParamField path="profession" type="str">
  The profession
</ParamField>

<ParamField path="spouse_name" type="str">
  Name of the spouse
</ParamField>

<ParamField path="title" type="str">
  Title of the contact (e.g., Mr., Mrs., Dr.)
</ParamField>

<ParamField path="body" type="str">
  The body of the email
</ParamField>

<ParamField path="recipients" type="str" required>
  A single email or a comma-separated list of the recipients' emails
</ParamField>

<ParamField path="subject" type="str">
  The subject of the email
</ParamField>

<ParamField path="attachments" type="list[str]">
  Attachments to be appended.
</ParamField>

<ParamField path="bcc_recipients" type="str">
  A single email or a comma-separated list of the BCC recipients' emails
</ParamField>

<ParamField path="cc_recipients" type="str">
  A single email or a comma-separated list of the CC recipients' emails
</ParamField>

<ParamField path="format" type="str">
  Either html (to allow html content) or text (for plaintext content - default)
</ParamField>

<ParamField path="parent_folder_id" type="str">
  ID of the parent folder (optional, creates in root if not provided)
</ParamField>

<ParamField path="contact_id" type="str" required>
  Select the contact to retrieve
</ParamField>

<ParamField path="folder_id" type="str" required>
  Select a mailbox to read
</ParamField>

<ParamField path="attachment_id" type="str" required>
  The ID of the attachment to retrieve
</ParamField>

<ParamField path="email_id" type="str" required>
  The ID of the email to reply to
</ParamField>

<ParamField path="output" type="str">
  Output format for the message data
</ParamField>

<ParamField path="fields" type="str">
  Comma-separated list of additional fields to return
</ParamField>

<ParamField path="user_identifier" type="str" required>
  The user's ID or organizational email (work/school accounts only, not personal @outlook.com/@hotmail.com)
</ParamField>

<ParamField path="contact_limit" type="int">
  Maximum number of contacts to return
</ParamField>

<ParamField path="email_address" type="str">
  Filter by specific email address
</ParamField>

<ParamField path="filter_query" type="str">
  OData filter expression to filter contacts (e.g., startswith(displayName,'John'))
</ParamField>

<ParamField path="return_all" type="bool">
  Whether to return all folders (ignores limit)
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of folders to return (0 for no limit)
</ParamField>

<ParamField path="filter" type="str">
  OData filter expression
</ParamField>

<ParamField path="search" type="str">
  Search term to filter messages
</ParamField>

<ParamField path="order_by" type="str">
  Field to sort results by (e.g. displayName). By default results are sorted by relevance.
</ParamField>

<ParamField path="destination_folder_id" type="str">
  ID of the folder to move the message to (leave empty to keep in current folder)
</ParamField>

<ParamField path="from_" type="str" />

<ParamField path="has_attachment" type="str">
  Filter by attachment presence
</ParamField>

<ParamField path="importance" type="str">
  Filter by importance level
</ParamField>

<ParamField path="is_read" type="bool | str">
  Filter by read/unread status
</ParamField>

<ParamField path="item_id" type="str">
  Select a mailbox to read emails from (optional - searches all messages if not specified)
</ParamField>

<ParamField path="query" type="str">
  Search using KQL syntax. Examples: '[xyz@email.com](mailto:xyz@email.com)' (searches everywhere), 'cc:[xyz@email.com](mailto:xyz@email.com)' (specific field). Supported fields: subject:, cc:, bcc:. Use AND/OR to combine. Prefer using the from, to, and subject input fields instead of this raw query when filtering by those fields — raw query uses \$search which cannot sort by date, so results are ranked by relevance, not recency.
</ParamField>

<ParamField path="to" type="str">
  Filter emails sent to this address
</ParamField>

<ParamField path="reply_to" type="str">
  Alternative email address where replies should be sent instead of the sender's address
</ParamField>

<ParamField path="reply_to_sender_only" type="bool">
  When enabled, ensures that replies go only to the sender, excluding CC or group recipients
</ParamField>

<ParamField path="sender_name" type="str">
  Custom name to display as the sender in the recipient's inbox
</ParamField>

<ParamField path="body_content_type" type="str">
  Content type for the body
</ParamField>

<ParamField path="is_read_receipt_requested" type="bool">
  Request a read receipt for this message
</ParamField>

<ParamField path="to_recipients" type="str">
  Comma-separated list of recipient emails
</ParamField>

<a id="integration_pager_duty" />

## `integration_pager_duty` — Pager Duty

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_pager_duty(tool_name="...", action="create_incident", integration=..., service_id="...", content="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `create_incident`, `create_incident_note`, `get_incident`, `get_log_entry`, `get_user`, `list_incident_notes`, `list_incidents`, `list_log_entries`, `update_incident`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Pager Duty account
</ParamField>

<ParamField path="service_id" type="str" required>
  The service the incident is associated with
</ParamField>

<ParamField path="title" type="str">
  A brief description of the incident
</ParamField>

<ParamField path="assignees" type="str">
  User to assign to the incident. Note: Ignored if Escalation Policy is set (PagerDuty API constraint)
</ParamField>

<ParamField path="conference_number" type="str">
  Conference bridge phone number (optional)
</ParamField>

<ParamField path="conference_url" type="str">
  Conference bridge URL (optional)
</ParamField>

<ParamField path="details" type="str">
  Additional details about the incident (optional)
</ParamField>

<ParamField path="escalation_policy_id" type="str">
  The escalation policy for the incident. Note: If set, assignees will be ignored (PagerDuty API constraint)
</ParamField>

<ParamField path="incident_key" type="str">
  A unique identifier for the incident (optional)
</ParamField>

<ParamField path="priority_id" type="str">
  The priority of the incident (optional)
</ParamField>

<ParamField path="urgency" type="str">
  The urgency of the incident
</ParamField>

<ParamField path="content" type="str" required>
  The content of the note
</ParamField>

<ParamField path="incident_id" type="str" required>
  Select the incident to retrieve
</ParamField>

<ParamField path="log_entry_id" type="str" required>
  The ID of the log entry to retrieve
</ParamField>

<ParamField path="include" type="str">
  Additional resources to include
</ParamField>

<ParamField path="time_zone" type="str">
  Time zone for timestamps
</ParamField>

<ParamField path="user_id" type="str" required>
  The ID of the user to retrieve
</ParamField>

<ParamField path="return_all" type="bool">
  Fetch all incidents matching the criteria (ignores limit)
</ParamField>

<ParamField path="service_ids" type="str">
  Filter by service IDs (comma-separated, optional)
</ParamField>

<ParamField path="sort_by" type="str">
  Field to sort by (created\_at, incident\_number, resolved\_at, urgency)
</ParamField>

<ParamField path="sort_order" type="str">
  Sort order (asc/desc)
</ParamField>

<ParamField path="statuses" type="str">
  Filter by incident statuses (comma-separated: triggered, acknowledged, resolved)
</ParamField>

<ParamField path="urgencies" type="str">
  Filter by urgency (comma-separated: high, low)
</ParamField>

<ParamField path="user_ids" type="str">
  Filter by assigned user IDs (comma-separated, optional)
</ParamField>

<ParamField path="is_overview" type="bool">
  Return only overview log entries
</ParamField>

<ParamField path="resolution" type="str">
  Resolution notes (when resolving)
</ParamField>

<ParamField path="status" type="str">
  New status for the incident
</ParamField>

<a id="integration_peopledatalabs" />

## `integration_peopledatalabs` — PeopleDataLabs

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_peopledatalabs(tool_name="...", action="enrich_company", integration=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `enrich_company`, `enrich_person`, `search_companies`, `search_companies_query`, `search_people`, `search_people_query`
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="name" type="str">
  The name of the company
</ParamField>

<ParamField path="profile" type="str">
  Company social media profile URL
</ParamField>

<ParamField path="website" type="str">
  Company website URL
</ParamField>

<ParamField path="company" type="str">
  The name, website, or social URL of a company where the person has worked
</ParamField>

<ParamField path="email" type="str">
  Email address of the person
</ParamField>

<ParamField path="first_name" type="str">
  First name of the person
</ParamField>

<ParamField path="last_name" type="str">
  Last name of the person
</ParamField>

<ParamField path="location" type="str">
  The location where a person lives (can be address, city, country, etc.)
</ParamField>

<ParamField path="profile_url" type="str">
  Social media profile URLs for the contact (LinkedIn, Twitter, Facebook, etc.)
</ParamField>

<ParamField path="company_size_ranges" type="str">
  Comma-separated list of company size ranges. The value should be one of the ones mentioned here: [https://docs.peopledatalabs.com/docs/company-sizes](https://docs.peopledatalabs.com/docs/company-sizes)
</ParamField>

<ParamField path="country" type="str">
  Name of the country
</ParamField>

<ParamField path="founded_year_range" type="str">
  A range representing the founding year of the company
</ParamField>

<ParamField path="industries" type="str">
  Comma-separated list of industries
</ParamField>

<ParamField path="number_of_results" type="int | str">
  Number of results to return
</ParamField>

<ParamField path="tags" type="str">
  Comma-separated tags associated with the company
</ParamField>

<ParamField path="es_query" type="str">
  A valid Elasticsearch query. Available Fields: [https://docs.peopledatalabs.com/docs/elasticsearch-mapping](https://docs.peopledatalabs.com/docs/elasticsearch-mapping)
</ParamField>

<ParamField path="sql" type="str">
  A valid SQL query
</ParamField>

<ParamField path="job_company_names" type="str">
  Comma-separated list of company names to search within
</ParamField>

<ParamField path="job_titles" type="str">
  Comma-separated list of job titles
</ParamField>

<ParamField path="skills" type="str">
  Comma-separated list of skills to search for
</ParamField>

<a id="integration_pinecone" />

## `integration_pinecone` — Pinecone

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_pinecone(tool_name="...", action="get_vector", index="...", integration=..., vectors="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the Pinecone operation to perform
  One of: `get_vector`, `insert_documents`, `list_vectors`, `query_pinecone`, `retrieve_documents`, `update_documents`
</ParamField>

<ParamField path="index" type="str" required>
  The Pinecone index to query
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Pinecone account
</ParamField>

<ParamField path="include_metadata" type="bool">
  Include metadata in the response
</ParamField>

<ParamField path="include_values" type="bool">
  Include vector values in the response
</ParamField>

<ParamField path="namespace" type="str">
  Select the namespace to query (queries across all namespaces if left empty)
</ParamField>

<ParamField path="vectors" type="str" required>
  JSON array of vectors to insert with id, values, and optional metadata
</ParamField>

<ParamField path="batch_size" type="int">
  Number of vectors to upsert in each batch
</ParamField>

<ParamField path="ids" type="list[str]" required>
  List of vector IDs to retrieve (required - Pinecone doesn't support listing all vectors)
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of vectors to return
</ParamField>

<ParamField path="query" type="str" required>
  Vector values as JSON array to query for similar vectors
</ParamField>

<ParamField path="embedding_model" type="str">
  Select the embedding model to use to embed the query
</ParamField>

<ParamField path="filter" type="str">
  JSON filter to apply to metadata (optional)
</ParamField>

<ParamField path="metadata" type="str">
  New metadata as JSON object (optional)
</ParamField>

<ParamField path="set_metadata" type="bool">
  Replace all metadata (true) or merge with existing (false)
</ParamField>

<ParamField path="values" type="str">
  New vector values as JSON array (optional)
</ParamField>

<a id="integration_postgres" />

## `integration_postgres` — Postgres

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_postgres(tool_name="...", action="delete", confirm_delete=True, integration=..., limit=0)
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `delete`, `describe_table`, `execute_query`, `insert`, `insert_or_update`, `nl`, `nl_agent`, `raw_sql`, `select`, `update`
  </Expandable>
</ParamField>

<ParamField path="confirm_delete" type="bool" required>
  Confirm that you want to delete the specified records
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of rows to return
</ParamField>

<ParamField path="table_name" type="str" required>
  Choose the table to query
</ParamField>

<ParamField path="delete_entire_table" type="bool">
  WARNING: This will drop the entire table
</ParamField>

<ParamField path="where_clause" type="str">
  Optional WHERE condition (without WHERE keyword)
</ParamField>

<ParamField path="sql_query" type="str" required>
  SQL query to execute
</ParamField>

<ParamField path="parameters" type="list[str]">
  Parameters for parameterized queries (optional)
</ParamField>

<ParamField path="data" type="str" required>
  JSON object with column-value pairs to insert
</ParamField>

<ParamField path="return_id" type="bool">
  Return the ID of the inserted record sql\_generation\_model (str)
</ParamField>

<ParamField path="conflict_columns" type="str" required>
  Comma-separated column names that define uniqueness constraint
</ParamField>

<ParamField path="query" type="str">
  Natural language query to be converted to SQL query\_agent\_model (str) query\_type (str)
</ParamField>

<ParamField path="query_agent_model" type="str" />

<ParamField path="query_type" type="str" />

<ParamField path="sql_generation_model" type="str" />

<ParamField path="columns" type="str" required>
  Choose specific columns
</ParamField>

<ParamField path="order_by" type="str">
  Optional ORDER BY clause
</ParamField>

<a id="integration_powerbi" />

## `integration_powerbi` — Power BI

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_powerbi(tool_name="...", action="add_rows", dataset_id="...", integration=..., rows_data="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_rows`, `execute_dax_query`, `export_report`, `get_dashboard`, `get_dashboard_tiles`, `get_dataflow`, `get_dataflow_datasources`, `get_dataflow_transactions`, `get_dataset`, `get_datasource_status`, `get_datasource_users`, `get_gateway`, `get_gateway_datasource`, `get_gateway_datasources`, `get_refresh_history`, `get_report`, `get_report_pages`, `get_scan_result`, `get_tables`, `get_workspace`, `get_workspace_dashboards`, `get_workspace_datasets`, `get_workspace_info`, `get_workspace_reports`, `list_dashboards`, `list_dataflows`, `list_datasets`, `list_gateways`, `list_reports`, `list_workspaces`, `refresh_dataflow`, `refresh_dataset`
  </Expandable>
</ParamField>

<ParamField path="dataset_id" type="str" required>
  Select the dataset (required)
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Power BI account
</ParamField>

<ParamField path="rows_data" type="str" required>
  JSON array of row objects to add
</ParamField>

<ParamField path="table_name" type="str" required>
  Select the table to add rows to (required)
</ParamField>

<ParamField path="workspace_id" type="str" required>
  Select a workspace (required)
</ParamField>

<ParamField path="dax_query" type="str" required>
  DAX query to execute (e.g., EVALUATE VALUES(TableName))
</ParamField>

<ParamField path="impersonated_user" type="str">
  UPN of user to impersonate (for RLS)
</ParamField>

<ParamField path="include_nulls" type="bool">
  Whether to include null values in results
</ParamField>

<ParamField path="report_id" type="str" required>
  Select the report to retrieve (required)
</ParamField>

<ParamField path="export_format" type="str">
  Format to export (PDF, PPTX, PNG)
</ParamField>

<ParamField path="wait_for_completion" type="bool">
  Wait for export to complete before returning
</ParamField>

<ParamField path="dashboard_id" type="str" required>
  Select the dashboard to retrieve (required)
</ParamField>

<ParamField path="dataflow_id" type="str" required>
  Select the dataflow to retrieve (required)
</ParamField>

<ParamField path="datasource_id" type="str" required>
  Select the datasource to retrieve (required)
</ParamField>

<ParamField path="gateway_id" type="str" required>
  Select the gateway to retrieve (required)
</ParamField>

<ParamField path="top" type="int">
  Maximum number of refresh entries to return
</ParamField>

<ParamField path="scan_id" type="str" required>
  Select scan ID (initiates a new scan for the workspace)
</ParamField>

<ParamField path="artifact_users" type="bool">
  Include users for each artifact
</ParamField>

<ParamField path="dataset_expressions" type="bool">
  Include M and DAX expressions
</ParamField>

<ParamField path="dataset_schema" type="bool">
  Include dataset schema
</ParamField>

<ParamField path="datasource_details" type="bool">
  Include datasource details
</ParamField>

<ParamField path="lineage" type="bool">
  Include lineage information
</ParamField>

<ParamField path="limit" type="int">
  Maximum number of datasets to return
</ParamField>

<ParamField path="notify_option" type="str">
  Notification option after refresh completes
</ParamField>

<a id="integration_quickbooks" />

## `integration_quickbooks` — QuickBooks

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_quickbooks(tool_name="...", action="create_bill", integration=..., line_items=..., vendor_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `create_bill`, `create_customer`, `create_employee`, `create_estimate`, `create_invoice`, `create_payment`, `create_vendor`, `delete_bill`, `delete_estimate`, `delete_invoice`, `delete_payment`, `get_bill`, `get_customer`, `get_employee`, `get_estimate`, `get_invoice`, `get_item`, `get_payment`, `get_purchase`, `get_vendor`, `list_bills`, `list_customers`, `list_employees`, `list_estimates`, `list_invoices`, `list_items`, `list_payments`, `list_purchases`, `list_transactions`, `list_vendors`, `send_estimate`, `send_invoice`, `send_payment`, `update_bill`, `update_customer`, `update_employee`, `update_estimate`, `update_invoice`, `update_payment`, `update_vendor`, `void_invoice`, `void_payment`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your QuickBooks account
</ParamField>

<ParamField path="line_items" type="list[str]" required>
  Line items for the bill. Each item should be a JSON object with: account\_id (required), amount (required), description (optional), detail\_type (optional), item\_id (optional), position (optional)
</ParamField>

<ParamField path="vendor_id" type="str" required>
  QuickBooks ID of the vendor
</ParamField>

<ParamField path="ap_account_id" type="str">
  Accounts Payable account ID
</ParamField>

<ParamField path="doc_number" type="str">
  Document/Reference number
</ParamField>

<ParamField path="due_date" type="str">
  Due date for the bill
</ParamField>

<ParamField path="private_note" type="str">
  Private note/memo for internal use
</ParamField>

<ParamField path="sales_term_id" type="str">
  Sales term ID (e.g., Net 30)
</ParamField>

<ParamField path="txn_date" type="str">
  Transaction date
</ParamField>

<ParamField path="display_name" type="str">
  Customer display name
</ParamField>

<ParamField path="active" type="bool">
  Whether the customer is active
</ParamField>

<ParamField path="balance" type="float">
  Opening balance
</ParamField>

<ParamField path="company_name" type="str">
  Legal or trade name of the customer's business
</ParamField>

<ParamField path="family_name" type="str">
  Customer's last name
</ParamField>

<ParamField path="fully_qualified_name" type="str">
  Fully qualified name (hierarchical)
</ParamField>

<ParamField path="given_name" type="str">
  Customer's first name
</ParamField>

<ParamField path="middle_name" type="str">
  Customer's middle name
</ParamField>

<ParamField path="notes" type="str">
  Internal notes about the customer
</ParamField>

<ParamField path="parent_customer_id" type="str">
  Parent customer ID for sub-customers (leave empty for standalone customer)
</ParamField>

<ParamField path="preferred_delivery_method" type="str">
  Preferred delivery method (Email, Print, or None)
</ParamField>

<ParamField path="primary_email_address" type="str">
  Main email address for the customer
</ParamField>

<ParamField path="primary_phone" type="str">
  Customer's main phone number
</ParamField>

<ParamField path="print_on_check_name" type="str">
  Name to print on checks
</ParamField>

<ParamField path="suffix" type="str">
  Suffix of the name (e.g., Jr., Sr., III)
</ParamField>

<ParamField path="taxable" type="bool">
  Whether the customer is taxable
</ParamField>

<ParamField path="title" type="str">
  Title of the person (e.g., Mr., Mrs., Dr.)
</ParamField>

<ParamField path="billable_time" type="bool">
  Whether employee time is billable
</ParamField>

<ParamField path="ssn" type="str">
  Social Security Number
</ParamField>

<ParamField path="customer_id" type="str" required>
  QuickBooks ID of the customer to retrieve
</ParamField>

<ParamField path="apply_tax_after_discount" type="bool">
  Apply tax after discount
</ParamField>

<ParamField path="billing_address_city" type="str">
  City
</ParamField>

<ParamField path="billing_address_country" type="str">
  Country
</ParamField>

<ParamField path="billing_address_line" type="str">
  Street address line
</ParamField>

<ParamField path="billing_address_postal_code" type="str">
  Postal/ZIP code
</ParamField>

<ParamField path="billing_address_state" type="str">
  State or province code
</ParamField>

<ParamField path="billing_email" type="str">
  Billing email address
</ParamField>

<ParamField path="custom_fields" type="list[str]">
  Custom fields for the estimate. Each item should be a JSON object with: id (required - the custom field ID), value (required)
</ParamField>

<ParamField path="customer_memo" type="str">
  Message to customer
</ParamField>

<ParamField path="email_status" type="str">
  Email status
</ParamField>

<ParamField path="print_status" type="str">
  Print status
</ParamField>

<ParamField path="shipping_address_city" type="str">
  Shipping city
</ParamField>

<ParamField path="shipping_address_country" type="str">
  Shipping country
</ParamField>

<ParamField path="shipping_address_line" type="str">
  Shipping street address
</ParamField>

<ParamField path="shipping_address_postal_code" type="str">
  Shipping postal code
</ParamField>

<ParamField path="shipping_address_state" type="str">
  Shipping state/province
</ParamField>

<ParamField path="total_amount" type="float" required>
  Total payment amount
</ParamField>

<ParamField path="account_number" type="str">
  Account number
</ParamField>

<ParamField path="vendor_1099" type="bool">
  Whether the vendor receives 1099
</ParamField>

<ParamField path="bill_id" type="str" required>
  QuickBooks ID of the bill to retrieve
</ParamField>

<ParamField path="estimate_id" type="str" required>
  QuickBooks ID of the estimate to retrieve
</ParamField>

<ParamField path="invoice_id" type="str" required>
  QuickBooks ID of the invoice to retrieve
</ParamField>

<ParamField path="payment_id" type="str" required>
  QuickBooks ID of the payment to retrieve
</ParamField>

<ParamField path="employee_id" type="str" required>
  QuickBooks ID of the employee to retrieve
</ParamField>

<ParamField path="quickbooks_item_id" type="str" required>
  QuickBooks ID of the item to retrieve
</ParamField>

<ParamField path="purchase_id" type="str" required>
  QuickBooks ID of the purchase to retrieve
</ParamField>

<ParamField path="query" type="str">
  Optional filter condition (e.g., Balance > 0 or DueDate > '2024-01-01')
</ParamField>

<ParamField path="accounts_payable_paid" type="str">
  Filter by Accounts Payable payment status
</ParamField>

<ParamField path="accounts_receivable_paid" type="str">
  Filter by Accounts Receivable payment status
</ParamField>

<ParamField path="bothamount" type="float">
  Monetary amount to filter results by (exact match)
</ParamField>

<ParamField path="cleared_status" type="str">
  Filter by cleared status
</ParamField>

<ParamField path="creation_date_from" type="str">
  Creation date from (YYYY-MM-DD)
</ParamField>

<ParamField path="creation_date_predefined" type="str">
  Predefined date range for creation date
</ParamField>

<ParamField path="creation_date_to" type="str">
  Creation date to (YYYY-MM-DD)
</ParamField>

<ParamField path="customer_ids" type="str">
  Customer IDs (comma-separated for multiple)
</ParamField>

<ParamField path="date_range_from" type="str">
  Transaction date from (YYYY-MM-DD)
</ParamField>

<ParamField path="date_range_predefined" type="str">
  Predefined date range for transaction date
</ParamField>

<ParamField path="date_range_to" type="str">
  Transaction date to (YYYY-MM-DD)
</ParamField>

<ParamField path="department_ids" type="str">
  Department IDs (comma-separated for multiple)
</ParamField>

<ParamField path="document_number" type="str">
  Document/Reference number
</ParamField>

<ParamField path="due_date_from" type="str">
  Due date from (YYYY-MM-DD)
</ParamField>

<ParamField path="due_date_predefined" type="str">
  Predefined date range for due date
</ParamField>

<ParamField path="due_date_to" type="str">
  Due date to (YYYY-MM-DD)
</ParamField>

<ParamField path="group_by" type="str">
  Field to group results by
</ParamField>

<ParamField path="memo_ids" type="str">
  Search text in private notes/memos
</ParamField>

<ParamField path="modification_date_from" type="str">
  Modification date from (YYYY-MM-DD)
</ParamField>

<ParamField path="modification_date_predefined" type="str">
  Predefined date range for modification date
</ParamField>

<ParamField path="modification_date_to" type="str">
  Modification date to (YYYY-MM-DD)
</ParamField>

<ParamField path="payment_method" type="str">
  Payment method
</ParamField>

<ParamField path="printed_status" type="str">
  Filter by print status
</ParamField>

<ParamField path="quick_zoom_url" type="bool">
  Include Quick Zoom URL in results
</ParamField>

<ParamField path="sort_by" type="str">
  Field to sort by
</ParamField>

<ParamField path="sort_order" type="str">
  Sort order
</ParamField>

<ParamField path="source_account_type" type="str">
  Source account type
</ParamField>

<ParamField path="term_ids" type="str">
  Term IDs (comma-separated for multiple)
</ParamField>

<ParamField path="transaction_type" type="str">
  Type of transaction to query
</ParamField>

<ParamField path="vendor_ids" type="str">
  Vendor IDs (comma-separated for multiple)
</ParamField>

<ParamField path="email" type="str" required>
  Email address to send the estimate to
</ParamField>

<ParamField path="ap_account_name" type="str">
  Accounts Payable account name
</ParamField>

<ParamField path="sales_term_name" type="str">
  Sales term name
</ParamField>

<a id="integration_reddit" />

## `integration_reddit` — Reddit

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_reddit(tool_name="...", action="create_comment", comment_text="...", integration=..., post_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `create_comment`, `create_post`, `delete_comment`, `delete_post`, `get_post`, `get_profile`, `get_subreddit`, `get_user`, `list_comments`, `list_posts`, `list_subreddits`, `reply_comment`, `search_posts`
  </Expandable>
</ParamField>

<ParamField path="comment_text" type="str" required>
  Text content of the comment
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Reddit account
</ParamField>

<ParamField path="post_id" type="str" required>
  ID of the post to delete
</ParamField>

<ParamField path="post_type" type="str" required>
  Type of post to create
</ParamField>

<ParamField path="subreddit" type="str">
  Name of the subreddit to post to
</ParamField>

<ParamField path="title" type="str" required>
  Title of the post
</ParamField>

<ParamField path="nsfw" type="bool">
  Mark post as NSFW
</ParamField>

<ParamField path="spoiler" type="bool">
  Mark post as spoiler
</ParamField>

<ParamField path="text_content" type="str">
  Text content for text posts
</ParamField>

<ParamField path="url" type="str">
  URL for link posts
</ParamField>

<ParamField path="comment_id" type="str" required>
  ID of the comment to delete
</ParamField>

<ParamField path="subreddit_name" type="str" required>
  Name of the subreddit to get information about
</ParamField>

<ParamField path="username" type="str" required>
  Username of the Reddit user
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of posts to retrieve (1-100)
</ParamField>

<ParamField path="sort_type" type="str">
  How to sort the posts
</ParamField>

<ParamField path="time_filter" type="str">
  Time filter for top posts
</ParamField>

<ParamField path="category" type="str">
  Category of subreddits to retrieve
</ParamField>

<ParamField path="reply_text" type="str" required>
  Text content of the reply
</ParamField>

<ParamField path="query" type="str" required>
  Search terms to look for
</ParamField>

<a id="integration_salesforce" />

## `integration_salesforce` — Salesforce

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_salesforce(tool_name="...", action="add_account_note", body="...", integration=..., case_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_account_note`, `add_case_comment`, `add_contact_note`, `add_contact_to_campaign`, `add_lead_note`, `add_lead_to_campaign`, `add_opportunity_note`, `create_account`, `create_attachment`, `create_case`, `create_contact`, `create_custom_object`, `create_lead`, `create_opportunity`, `create_task`, `delete_account`, `delete_attachment`, `delete_case`, `delete_contact`, `delete_custom_object`, `delete_lead`, `delete_opportunity`, `delete_task`, `get_account_summary`, `get_accounts`, `get_attachment_summary`, `get_attachments`, `get_case_summary`, `get_cases`, `get_contact_summary`, `get_contacts`, `get_custom_objects`, `get_lead_summary`, `get_leads`, `get_opportunities`, `get_opportunity_summary`, `get_task_summary`, `get_tasks`, `get_users`, `invoke_flow`, `read_account`, `read_attachment`, `read_case`, `read_contact`, `read_custom_object`, `read_lead`, `read_opportunity`, `read_task`, `read_user`, `run_sql_query`, `update_account`, `update_attachment`, `update_case`, `update_contact`, `update_custom_object`, `update_lead`, `update_opportunity`, `update_task`, `upload_document`, `upsert_account`, `upsert_contact`, `upsert_custom_object`, `upsert_lead`, `upsert_opportunity`
  </Expandable>
</ParamField>

<ParamField path="account_id" type="str">
  ID of the associated account
</ParamField>

<ParamField path="body" type="str" required>
  Content of the note
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="title" type="str">
  Job title of the lead
</ParamField>

<ParamField path="is_private" type="bool | str">
  Whether the note is private
</ParamField>

<ParamField path="case_id" type="str" required>
  ID of the case to update
</ParamField>

<ParamField path="comment_body" type="str" required>
  Content of the comment
</ParamField>

<ParamField path="contact_id" type="str">
  ID of the contact to update
</ParamField>

<ParamField path="campaign_id" type="str">
  ID of the campaign to add the lead to
</ParamField>

<ParamField path="has_responded" type="bool">
  Whether the lead has responded
</ParamField>

<ParamField path="status" type="str">
  Status of the lead
</ParamField>

<ParamField path="lead_id" type="str" required>
  ID of the lead to update
</ParamField>

<ParamField path="opportunity_id" type="str" required>
  ID of the opportunity to update
</ParamField>

<ParamField path="name" type="str">
  Name of the account
</ParamField>

<ParamField path="annual_revenue" type="int | str">
  Annual revenue of the company
</ParamField>

<ParamField path="billing_city" type="str">
  Billing city
</ParamField>

<ParamField path="billing_country" type="str">
  Billing country
</ParamField>

<ParamField path="billing_postal_code" type="str">
  Billing postal code
</ParamField>

<ParamField path="billing_state" type="str">
  Billing state
</ParamField>

<ParamField path="billing_street" type="str">
  Billing street address
</ParamField>

<ParamField path="custom_fields" type="str">
  Custom fields in JSON format
</ParamField>

<ParamField path="description" type="str">
  Description of the lead
</ParamField>

<ParamField path="industry" type="str">
  Industry of the company
</ParamField>

<ParamField path="number_of_employees" type="int | str">
  Number of employees in the company
</ParamField>

<ParamField path="owner" type="str">
  Owner ID of the lead
</ParamField>

<ParamField path="phone" type="str">
  Phone number of the lead
</ParamField>

<ParamField path="type" type="str">
  Type of account
</ParamField>

<ParamField path="website" type="str">
  Company website
</ParamField>

<ParamField path="attachments" type="list[str]" required>
  Files to attach
</ParamField>

<ParamField path="parent_id" type="str">
  ID of the parent record (Lead, Contact, Account, etc.)
</ParamField>

<ParamField path="subject" type="str">
  Subject of the case
</ParamField>

<ParamField path="origin" type="str">
  Origin of the case
</ParamField>

<ParamField path="priority" type="str">
  Priority of the case
</ParamField>

<ParamField path="reason" type="str">
  Reason for the case
</ParamField>

<ParamField path="record_type_id" type="str">
  Record type ID for the lead
</ParamField>

<ParamField path="lastname" type="str">
  Last name of the lead
</ParamField>

<ParamField path="assistant_name" type="str">
  Name of the contact's assistant
</ParamField>

<ParamField path="assistant_phone" type="str">
  Phone number of the contact's assistant
</ParamField>

<ParamField path="birthdate" type="str">
  Birth date of the contact
</ParamField>

<ParamField path="department" type="str">
  Department of the contact
</ParamField>

<ParamField path="email" type="str">
  Email address of the lead
</ParamField>

<ParamField path="fax" type="str">
  Fax number of the lead
</ParamField>

<ParamField path="first_name" type="str">
  First name of the lead
</ParamField>

<ParamField path="home_phone" type="str">
  Home phone number of the contact
</ParamField>

<ParamField path="lead_source" type="str">
  Source of the lead
</ParamField>

<ParamField path="mailing_city" type="str">
  Mailing city
</ParamField>

<ParamField path="mailing_country" type="str">
  Mailing country
</ParamField>

<ParamField path="mailing_postal_code" type="str">
  Mailing postal code
</ParamField>

<ParamField path="mailing_state" type="str">
  Mailing state
</ParamField>

<ParamField path="mailing_street" type="str">
  Mailing street address
</ParamField>

<ParamField path="mobile_phone" type="str">
  Mobile phone number of the lead
</ParamField>

<ParamField path="other_city" type="str">
  Other city
</ParamField>

<ParamField path="other_country" type="str">
  Other country
</ParamField>

<ParamField path="other_phone" type="str">
  Other phone number of the contact
</ParamField>

<ParamField path="other_postal_code" type="str">
  Other postal code
</ParamField>

<ParamField path="other_state" type="str">
  Other state
</ParamField>

<ParamField path="other_street" type="str">
  Other street address
</ParamField>

<ParamField path="salutation" type="str">
  Salutation for the lead
</ParamField>

<ParamField path="custom_object" type="str" required>
  API name of the custom object
</ParamField>

<ParamField path="company" type="str">
  Company name for the lead
</ParamField>

<ParamField path="city" type="str">
  City of the lead
</ParamField>

<ParamField path="country" type="str">
  Country of the lead
</ParamField>

<ParamField path="is_unread_by_owner" type="bool">
  Whether the lead is unread by owner
</ParamField>

<ParamField path="postal_code" type="str">
  Postal code of the lead
</ParamField>

<ParamField path="rating" type="str">
  Rating of the lead
</ParamField>

<ParamField path="state" type="str">
  State of the lead
</ParamField>

<ParamField path="street" type="str">
  Street address of the lead
</ParamField>

<ParamField path="close_date" type="str">
  Expected close date (YYYY-MM-DD)
</ParamField>

<ParamField path="stage_name" type="str">
  Stage of the opportunity
</ParamField>

<ParamField path="amount" type="float | int | str">
  Amount of the opportunity
</ParamField>

<ParamField path="forecast_category_name" type="str">
  Forecast category
</ParamField>

<ParamField path="has_opportunity_line_item" type="str">
  Whether the opportunity has line items
</ParamField>

<ParamField path="next_step" type="str">
  Next step in the sales process
</ParamField>

<ParamField path="probability" type="float | int | str">
  Probability percentage (0-100)
</ParamField>

<ParamField path="activity_date" type="str">
  Due date for the task (YYYY-MM-DD)
</ParamField>

<ParamField path="is_reminder_set" type="bool | str">
  Whether reminder is set
</ParamField>

<ParamField path="task_subtype" type="str">
  Subtype of task (Call, Email, etc.)
</ParamField>

<ParamField path="what_id" type="str">
  Related record ID (Account, Opportunity, etc.)
</ParamField>

<ParamField path="who_id" type="str">
  Related contact or lead ID
</ParamField>

<ParamField path="attachment_id" type="str" required>
  ID of the attachment to update
</ParamField>

<ParamField path="record_id" type="str" required>
  ID of the record to update
</ParamField>

<ParamField path="task_id" type="str" required>
  ID of the task to update
</ParamField>

<ParamField path="condition" type="str">
  Condition operator for multiple filters (AND/OR)
</ParamField>

<ParamField path="created_date" type="str">
  Filter by creation date (YYYY-MM-DD)
</ParamField>

<ParamField path="fields" type="str">
  Custom fields to retrieve (comma-separated)
</ParamField>

<ParamField path="modified_date" type="str">
  Filter by modification date (YYYY-MM-DD)
</ParamField>

<ParamField path="owner_id" type="str">
  Filter by owner ID
</ParamField>

<ParamField path="query" type="str">
  Search query to filter leads
</ParamField>

<ParamField path="content_type" type="str">
  Filter by content type
</ParamField>

<ParamField path="case_number" type="str">
  Filter by case number
</ParamField>

<ParamField path="closed_date" type="str">
  Filter by closed date (YYYY-MM-DD)
</ParamField>

<ParamField path="engineering_req_number" type="str">
  Filter by engineering req number
</ParamField>

<ParamField path="is_closed" type="str">
  Filter by is closed
</ParamField>

<ParamField path="is_escalated" type="str">
  Filter by is escalated
</ParamField>

<ParamField path="last_referenced_date" type="str">
  Filter by last referenced date (YYYY-MM-DD)
</ParamField>

<ParamField path="last_viewed_date" type="str">
  Filter by last viewed date (YYYY-MM-DD)
</ParamField>

<ParamField path="potential_liability" type="str">
  Filter by potential liability
</ParamField>

<ParamField path="product" type="str">
  Filter by product
</ParamField>

<ParamField path="sla_violation" type="str">
  Filter by SLA violation
</ParamField>

<ParamField path="supplied_company" type="str">
  Filter by supplied company
</ParamField>

<ParamField path="supplied_email" type="str">
  Filter by supplied email
</ParamField>

<ParamField path="supplied_name" type="str">
  Filter by supplied name
</ParamField>

<ParamField path="supplied_phone" type="str">
  Filter by supplied phone
</ParamField>

<ParamField path="last_name" type="str">
  Filter by last name
</ParamField>

<ParamField path="created_by_id" type="str">
  Filter by created by ID
</ParamField>

<ParamField path="last_modified_by_id" type="str">
  Filter by last modified by ID
</ParamField>

<ParamField path="system_mod_stamp" type="str">
  Filter by system modification stamp
</ParamField>

<ParamField path="expected_revenue" type="str">
  Filter by expected revenue
</ParamField>

<ParamField path="forecast_category" type="str">
  Filter by forecast category
</ParamField>

<ParamField path="is_won" type="str">
  Filter by is won
</ParamField>

<ParamField path="total_opportunity_quantity" type="str">
  Filter by total opportunity quantity
</ParamField>

<ParamField path="is_recurrence" type="str">
  Filter by recurrence status
</ParamField>

<ParamField path="recurrence_activity_id" type="str">
  Filter by recurrence activity ID
</ParamField>

<ParamField path="reminder_date_time" type="str">
  Filter by reminder date time
</ParamField>

<ParamField path="subject_line" type="str">
  Filter by subject line
</ParamField>

<ParamField path="is_active" type="str">
  Filter by active status
</ParamField>

<ParamField path="username" type="str">
  Filter by username
</ParamField>

<ParamField path="api_name" type="str" required>
  API name of the flow to invoke
</ParamField>

<ParamField path="json_parameters" type="bool">
  Whether to use JSON parameters
</ParamField>

<ParamField path="variables" type="str">
  Flow variables in array format
</ParamField>

<ParamField path="variables_json" type="str">
  Flow variables in JSON format
</ParamField>

<ParamField path="user_id" type="str" required>
  ID of the user to read
</ParamField>

<ParamField path="sql_query" type="str" required>
  SQL query to execute
</ParamField>

<ParamField path="file" type="str" required>
  File to upload
</ParamField>

<ParamField path="link_to_object_id" type="str" required>
  ID of the folder to link the document to
</ParamField>

<ParamField path="file_extension" type="str">
  File extension (e.g., pdf, doc, txt)
</ParamField>

<ParamField path="external_id" type="str" required>
  External ID field name
</ParamField>

<ParamField path="external_id_value" type="str" required>
  Value for the external ID
</ParamField>

<a id="integration_sec_edgar" />

## `integration_sec_edgar` — SEC EDGAR

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_sec_edgar(tool_name="...", action="get_company_filings", cik="...", integration=..., concept="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `get_company_filings`, `get_company_xbrl_concept`, `get_company_xbrl_facts`, `get_xbrl_frame`, `lookup_company`
</ParamField>

<ParamField path="cik" type="str" required>
  Central Index Key (CIK) of the company. Can be with or without leading zeros (e.g., '320193' or '0000320193')
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to SEC EDGAR
</ParamField>

<ParamField path="concept" type="str" required>
  The XBRL concept/tag name (e.g., 'Revenues', 'AccountsPayableCurrent', 'Assets')
</ParamField>

<ParamField path="taxonomy" type="str" required>
  The taxonomy (e.g., 'us-gaap', 'dei', 'ifrs-full')
</ParamField>

<ParamField path="period" type="str" required>
  Period identifier (e.g., 'CY2023' for annual, 'CY2023Q1I' for Q1 2023 instantaneous)
</ParamField>

<ParamField path="unit" type="str" required>
  Unit of measure (e.g., 'USD', 'shares', 'pure')
</ParamField>

<ParamField path="company" type="str" required>
  Select a company from the dropdown or provide a CIK (e.g., '0000320193' for Apple)
</ParamField>

<a id="integration_servicenow" />

## `integration_servicenow` — ServiceNow

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_servicenow(tool_name="...", action="create_incident", integration=..., table_name="...", attachment_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the Servicenow operation to perform

  <Expandable title="Allowed values">
    `create_incident`, `create_table_record`, `create_user`, `delete_attachment`, `delete_incident`, `delete_table_record`, `delete_user`, `get_attachment`, `get_incident`, `get_table_record`, `get_user`, `list_attachments`, `list_business_services`, `list_configuration_items`, `list_departments`, `list_dictionary_entries`, `list_incidents`, `list_table_records`, `list_user_groups`, `list_user_roles`, `list_users`, `update_incident`, `update_table_record`, `update_user`, `upload_attachment`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Servicenow account
</ParamField>

<ParamField path="short_description" type="str">
  Short description of the incident
</ParamField>

<ParamField path="assigned_to" type="str">
  sys\_id of the user to assign the incident to
</ParamField>

<ParamField path="assignment_group" type="str">
  sys\_id of the assignment group
</ParamField>

<ParamField path="business_service" type="str">
  sys\_id of the business service
</ParamField>

<ParamField path="caller_id" type="str">
  sys\_id of the incident caller
</ParamField>

<ParamField path="category" type="str">
  Category of the incident
</ParamField>

<ParamField path="close_code" type="str">
  Code for incident resolution
</ParamField>

<ParamField path="close_notes" type="str">
  Notes for incident closure
</ParamField>

<ParamField path="cmdb_ci" type="str">
  sys\_id of the configuration item
</ParamField>

<ParamField path="contact_type" type="str">
  How the incident was reported (phone, email, self-service, walk-in)
</ParamField>

<ParamField path="description" type="str">
  Detailed description of the incident
</ParamField>

<ParamField path="exclude_reference_link" type="bool">
  Exclude the reference link (URI) for reference fields
</ParamField>

<ParamField path="impact" type="str">
  Impact level
</ParamField>

<ParamField path="state" type="str">
  State
</ParamField>

<ParamField path="subcategory" type="str">
  Subcategory of the incident
</ParamField>

<ParamField path="sysparm_display_value" type="str">
  Choose which values to return for reference fields
</ParamField>

<ParamField path="urgency" type="str">
  Urgency level
</ParamField>

<ParamField path="table_name" type="str" required>
  Name of the ServiceNow table
</ParamField>

<ParamField path="data_json" type="str">
  JSON object with field-value pairs for the new record. Leave as \{} for empty
</ParamField>

<ParamField path="user_name" type="str">
  Unique username for the user (required)
</ParamField>

<ParamField path="active" type="bool">
  Whether the user account should be active
</ParamField>

<ParamField path="building" type="str">
  Building address
</ParamField>

<ParamField path="city" type="str">
  City
</ParamField>

<ParamField path="company" type="str">
  Company name
</ParamField>

<ParamField path="country" type="str">
  Country
</ParamField>

<ParamField path="department" type="str">
  User's department
</ParamField>

<ParamField path="email" type="str">
  User's email address
</ParamField>

<ParamField path="first_name" type="str">
  User's first name
</ParamField>

<ParamField path="gender" type="str">
  User's gender
</ParamField>

<ParamField path="home_phone" type="str">
  Home phone number
</ParamField>

<ParamField path="last_name" type="str">
  User's last name
</ParamField>

<ParamField path="location" type="str">
  User's work location
</ParamField>

<ParamField path="manager" type="str">
  sys\_id of the user's manager
</ParamField>

<ParamField path="middle_name" type="str">
  User's middle name
</ParamField>

<ParamField path="mobile_phone" type="str">
  User's mobile phone number
</ParamField>

<ParamField path="password_needs_reset" type="bool">
  Whether to require a password reset when the user logs in
</ParamField>

<ParamField path="phone" type="str">
  User's phone number
</ParamField>

<ParamField path="roles" type="str">
  Comma-separated list of role names or sys\_ids
</ParamField>

<ParamField path="source" type="str">
  Source of the user record
</ParamField>

<ParamField path="street" type="str">
  Street information separated by comma
</ParamField>

<ParamField path="time_zone" type="str">
  User's time zone
</ParamField>

<ParamField path="title" type="str">
  User's job title
</ParamField>

<ParamField path="user_password" type="str">
  User's password
</ParamField>

<ParamField path="zip" type="str">
  Zip code
</ParamField>

<ParamField path="attachment_id" type="str" required>
  Sys\_id value of the attachment to retrieve
</ParamField>

<ParamField path="incident_id" type="str" required>
  The sys\_id of the incident to retrieve
</ParamField>

<ParamField path="record_id" type="str" required>
  Sys ID of the record to retrieve
</ParamField>

<ParamField path="user_id" type="str" required>
  The sys\_id of the user to fetch
</ParamField>

<ParamField path="download" type="bool">
  Whether to download the actual file content
</ParamField>

<ParamField path="sysparm_fields" type="str">
  Comma-separated list of field names to return. Leave empty to return all fields.
</ParamField>

<ParamField path="return_all" type="bool" required>
  If all results should be returned or only up to the limit
</ParamField>

<ParamField path="limit" type="int">
  The maximum number of records to return. Ignored if Return All is enabled.
</ParamField>

<ParamField path="sysparm_query" type="str">
  An encoded query string to filter results (e.g., active=true^department=IT)
</ParamField>

<ParamField path="query" type="str">
  An encoded query string to filter results (e.g., active=true^priority=1)
</ParamField>

<ParamField path="file_content" type="str" required>
  File to upload
</ParamField>

<ParamField path="table_sys_id" type="str" required>
  Sys\_id of the record in the table to attach the file to
</ParamField>

<ParamField path="content_type" type="str">
  MIME type of the file
</ParamField>

<ParamField path="file_name" type="str">
  Name to give the attachment
</ParamField>

<a id="integration_sharepoint" />

## `integration_sharepoint` — SharePoint

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_sharepoint(tool_name="...", action="copy_file", integration=..., file_content="...", file_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `copy_file`, `create_file`, `create_folder`, `create_item`, `create_or_update_item`, `delete_file`, `delete_folder`, `delete_item`, `get_file`, `get_files`, `get_folder`, `get_item`, `get_list`, `list_folders`, `list_items`, `list_lists`, `move_file`, `move_folder`, `rename_folder`, `search`, `update_file`, `update_item`, `upload_file`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your SharePoint account
</ParamField>

<ParamField path="new_name" type="str">
  New name for the file including extension (optional)
</ParamField>

<ParamField path="file_content" type="str" required>
  Text content for the new file
</ParamField>

<ParamField path="file_name" type="str" required>
  Name of the file to create (e.g. notes.txt)
</ParamField>

<ParamField path="folder_name" type="str" required>
  Name of the new folder
</ParamField>

<ParamField path="fields" type="str" required>
  JSON string of field values
</ParamField>

<ParamField path="list_id" type="str" required>
  SharePoint list ID
</ParamField>

<ParamField path="site_id" type="str" required>
  SharePoint site ID
</ParamField>

<ParamField path="matching_fields" type="str" required>
  JSON string of fields to match for existing items
</ParamField>

<ParamField path="list_item_id" type="str" required>
  ID of the item to retrieve
</ParamField>

<ParamField path="download_file" type="bool" required>
  If enabled, fetches downloadable file object along with metadata
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of files to return
</ParamField>

<ParamField path="expand_fields" type="bool">
  Whether to expand item fields
</ParamField>

<ParamField path="expand_columns" type="bool">
  Whether to expand list columns
</ParamField>

<ParamField path="filter" type="str">
  OData filter expression
</ParamField>

<ParamField path="order_by" type="str">
  Field to order results by
</ParamField>

<ParamField path="select_fields" type="str">
  Comma-separated list of fields to select
</ParamField>

<ParamField path="skip_token" type="str">
  Skip token for pagination
</ParamField>

<ParamField path="search_query" type="str" required>
  Search query to find files and folders
</ParamField>

<ParamField path="description" type="str">
  New description for the file (optional)
</ParamField>

<ParamField path="file" type="str">
  New file content (optional if renaming or updating description only)
</ParamField>

<a id="integration_slack" />

## `integration_slack` — Slack

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_slack(tool_name="...", action="add_reaction", integration=..., usergroup="...", limit=0)
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_reaction`, `add_star`, `archive_channel`, `close_dm`, `create_channel`, `create_user_group`, `delete_message`, `disable_user_group`, `enable_user_group`, `get_channel_history`, `get_channel_members`, `get_channel_replies`, `get_channels`, `get_files`, `get_message_permalink`, `get_stars`, `get_user_groups`, `get_user_profile`, `get_users`, `invite_to_channel`, `join_channel`, `kick_from_channel`, `leave_channel`, `open_dm`, `read_channel`, `read_file`, `read_message`, `read_reactions`, `read_user`, `remove_reaction`, `remove_star`, `rename_channel`, `search_messages`, `send_message`, `send_message_as_user`, `send_message_to_user`, `set_channel_purpose`, `set_channel_topic`, `unarchive_channel`, `update_message`, `update_user_group`, `update_user_profile`, `upload_file`
  </Expandable>
</ParamField>

<ParamField path="channel" type="str">
  The channel to kick user from
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="name" type="str">
  Name of the channel to create
</ParamField>

<ParamField path="timestamp" type="str">
  Timestamp of the message to update(ISO 8601 or timestamp)
</ParamField>

<ParamField path="team" type="str">
  The team workspace (optional, only needed for Enterprise Grid)
</ParamField>

<ParamField path="file" type="str">
  File ID (if target is file)
</ParamField>

<ParamField path="file_comment" type="str">
  File comment ID
</ParamField>

<ParamField path="is_private" type="bool">
  Whether the channel should be private
</ParamField>

<ParamField path="handle" type="str">
  Handle for the user group
</ParamField>

<ParamField path="description" type="str">
  Description of the user group
</ParamField>

<ParamField path="include_count" type="bool">
  Include member count
</ParamField>

<ParamField path="as_user" type="bool">
  Update as user
</ParamField>

<ParamField path="usergroup" type="str" required>
  User group ID to enable
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of channels to return
</ParamField>

<ParamField path="thread_ts" type="str">
  Timestamp of the parent message(ISO 8601 or Unix timestamp)
</ParamField>

<ParamField path="exclude_archived" type="bool">
  Exclude archived channels
</ParamField>

<ParamField path="types" type="str">
  Types of channels to include (comma-separated)
</ParamField>

<ParamField path="show_files_hidden_by_limit" type="bool">
  Show files hidden by limit
</ParamField>

<ParamField path="ts_from" type="str">
  Files created after this timestamp(ISO 8601 or Unix timestamp)
</ParamField>

<ParamField path="ts_to" type="str">
  Files created before this timestamp(ISO 8601 or Unix timestamp)
</ParamField>

<ParamField path="user" type="str">
  The user to kick from the channel
</ParamField>

<ParamField path="include_disabled" type="bool">
  Include disabled user groups
</ParamField>

<ParamField path="include_users" type="bool">
  Include user list
</ParamField>

<ParamField path="include_labels" type="bool">
  Include field labels
</ParamField>

<ParamField path="include_locale" type="bool">
  Include locale information for users
</ParamField>

<ParamField path="team_id" type="str">
  The team workspace
</ParamField>

<ParamField path="users" type="str" required>
  Select user or enter comma-separated user IDs (e.g., U123,U456) to invite
</ParamField>

<ParamField path="return_im" type="bool">
  Return IM channel
</ParamField>

<ParamField path="count" type="int" required>
  Number of comments to include
</ParamField>

<ParamField path="page" type="int">
  Page of comments
</ParamField>

<ParamField path="full" type="bool">
  Get full reaction details
</ParamField>

<ParamField path="query" type="str" required>
  Search query
</ParamField>

<ParamField path="highlight" type="bool">
  Highlight search terms
</ParamField>

<ParamField path="sort" type="str">
  Sort by (score or timestamp)
</ParamField>

<ParamField path="sort_dir" type="str">
  Sort direction (asc or desc)
</ParamField>

<ParamField path="message" type="str" required>
  The message text to send
</ParamField>

<ParamField path="attachments" type="list[str]">
  Attachments to be appended.
</ParamField>

<ParamField path="auto_invite_bot" type="bool">
  Automatically invite the bot to the channel if it is not already a member. Disable if you do not want the bot to be added automatically.
</ParamField>

<ParamField path="user_ids" type="str" required>
  Select user or enter comma-separated user IDs (e.g., U123,U456)
</ParamField>

<ParamField path="purpose" type="str" required>
  Purpose for the channel
</ParamField>

<ParamField path="topic" type="str" required>
  Topic for the channel
</ParamField>

<ParamField path="blocks" type="str">
  Block kit blocks (JSON)
</ParamField>

<ParamField path="profile" type="str">
  Profile fields to update (JSON)
</ParamField>

<ParamField path="value" type="str">
  Value for single field update
</ParamField>

<ParamField path="files" type="list[str]" required>
  File to upload
</ParamField>

<ParamField path="filename" type="str">
  Name for the uploaded file
</ParamField>

<ParamField path="initial_comment" type="str">
  Initial comment for the file
</ParamField>

<ParamField path="select_team" type="str">
  The team workspace (for filtering channels)
</ParamField>

<ParamField path="share_file_with_channels" type="str">
  Comma separated list of channel IDs to share with
</ParamField>

<ParamField path="title" type="str">
  Title for the file
</ParamField>

<a id="integration_smartsheet" />

## `integration_smartsheet` — Smartsheet

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_smartsheet(tool_name="...", action="add_columns", integration=..., sheet_id="...", column_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_columns`, `add_image_to_cell`, `add_rows`, `attach_file_or_url`, `copy_folder`, `copy_rows`, `copy_sheet`, `create_comment`, `create_discussion`, `create_folder`, `create_sheet`, `create_workspace`, `delete_column`, `delete_comment`, `delete_folder`, `delete_rows`, `delete_sheet`, `edit_comment`, `get_attachment`, `get_column`, `get_columns`, `get_comment`, `get_discussion`, `get_folder_children`, `get_row`, `get_sheet`, `get_workspace_children`, `list_discussion_attachments`, `list_discussions`, `list_sheets`, `list_workspaces`, `move_folder`, `move_rows`, `move_sheet`, `search_everything`, `search_sheet`, `sort_rows`, `update_column`, `update_folder`, `update_rows`, `update_sheet`, `update_workspace`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Smartsheet account
</ParamField>

<ParamField path="sheet_id" type="str" required>
  Select the sheet to retrieve
</ParamField>

<ParamField path="title" type="str">
  Title of the new column
</ParamField>

<ParamField path="description" type="str">
  Description of the column
</ParamField>

<ParamField path="index" type="int">
  Position to insert the column (0 = first column)
</ParamField>

<ParamField path="options" type="str">
  Comma-separated options for Dropdown List or Multi-Select Dropdown types
</ParamField>

<ParamField path="type" type="str">
  Type of the column
</ParamField>

<ParamField path="width" type="int">
  Width of the column in pixels
</ParamField>

<ParamField path="column_id" type="str" required>
  Select the column to sort by
</ParamField>

<ParamField path="file" type="str" required>
  Upload an image file (PNG, JPG, JPEG, or GIF) to add to the cell
</ParamField>

<ParamField path="row_id" type="str">
  Select the row to retrieve
</ParamField>

<ParamField path="alt_text" type="str">
  Alternative text for the image for accessibility
</ParamField>

<ParamField path="name" type="str" required>
  Name of the new sheet
</ParamField>

<ParamField path="url" type="str" required>
  URL to attach (can be a regular link or a link to Google Drive, Dropbox, OneDrive, etc.)
</ParamField>

<ParamField path="attachment_subtype" type="str">
  Subtype for Google Drive attachments (DOCUMENT, SPREADSHEET, PRESENTATION, PDF, DRAWING)
</ParamField>

<ParamField path="attachment_type" type="str">
  Type of attachment
</ParamField>

<ParamField path="folder_id" type="str" required>
  Select the folder to retrieve
</ParamField>

<ParamField path="new_name" type="str" required>
  Name for the copied sheet
</ParamField>

<ParamField path="destination_id" type="str">
  Select a workspace or folder to create the sheet in (leave empty for Home)
</ParamField>

<ParamField path="include" type="str">
  Comma-separated list of elements to copy: attachments, cellLinks, data, discussions, filters, forms, ruleRecipients, rules, shares
</ParamField>

<ParamField path="destination_sheet_id" type="str" required>
  Select the sheet to copy rows to
</ParamField>

<ParamField path="row_ids" type="str" required>
  Comma-separated list of row IDs to delete
</ParamField>

<ParamField path="discussion_id" type="str" required>
  ID of the discussion to retrieve
</ParamField>

<ParamField path="text" type="str" required>
  Text of the comment
</ParamField>

<ParamField path="comment_text" type="str" required>
  Initial comment text for the discussion
</ParamField>

<ParamField path="primary_column_title" type="str">
  Title of the primary column (required for every sheet)
</ParamField>

<ParamField path="comment_id" type="str" required>
  ID of the comment to retrieve
</ParamField>

<ParamField path="ignore_rows_not_found" type="bool">
  If true, don't error if some row IDs don't exist
</ParamField>

<ParamField path="attachment_id" type="str" required>
  ID of the attachment to retrieve
</ParamField>

<ParamField path="workspace_id" type="str" required>
  Select the workspace to retrieve
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of sheets to return
</ParamField>

<ParamField path="include_all" type="bool" required>
  If true, includes all comments in each discussion
</ParamField>

<ParamField path="query" type="str" required>
  Text to search for in the sheet
</ParamField>

<ParamField path="descending" type="bool">
  Sort in descending order (Z to A, newest first)
</ParamField>

<ParamField path="hidden" type="bool">
  Hide this column
</ParamField>

<ParamField path="locked" type="bool">
  Lock this column
</ParamField>

<a id="integration_snowflake" />

## `integration_snowflake` — Snowflake

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_snowflake(tool_name="...", action="insert", data="...", integration=..., table_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `insert`, `nl`, `nl_agent`, `raw_sql`, `update`
</ParamField>

<ParamField path="data" type="str" required>
  JSON object with column-value pairs to insert
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Snowflake account
</ParamField>

<ParamField path="table_name" type="str" required>
  Choose the table to insert into
</ParamField>

<ParamField path="warehouse" type="str">
  Select the SQL Warehouse which will perform the operation
</ParamField>

<ParamField path="database" type="str">
  Select the Database on which to perform the query
</ParamField>

<ParamField path="return_id" type="bool">
  Return the ID of the inserted record (if available)
</ParamField>

<ParamField path="schema" type="str">
  Select the schema to be used in the query sql\_generation\_model (str)
</ParamField>

<ParamField path="query" type="str">
  SQL Query to execute query\_agent\_model (str) query\_type (str)
</ParamField>

<ParamField path="query_agent_model" type="str" />

<ParamField path="query_type" type="str" />

<ParamField path="sql_generation_model" type="str" />

<ParamField path="where_clause" type="str" required>
  WHERE condition to identify records to update
</ParamField>

<ParamField path="limit" type="int">
  Maximum number of rows to update (0 for no limit)
</ParamField>

<a id="integration_stripe" />

## `integration_stripe` — Stripe

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_stripe(tool_name="...", action="add_customer_card", card_customer_id="...", card_token="...", integration=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_customer_card`, `create_charge`, `create_coupon`, `create_customer`, `create_source`, `create_token`, `delete_customer`, `delete_source`, `get_balance`, `get_charges`, `get_coupons`, `get_customers`, `read_charge`, `read_customer`, `read_customer_card`, `read_source`, `remove_customer_card`, `update_charge`, `update_customer`
  </Expandable>
</ParamField>

<ParamField path="card_customer_id" type="str" required>
  ID of the customer to add card to
</ParamField>

<ParamField path="card_token" type="str" required>
  Token representing the card information
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="charge_amount" type="int" required>
  Amount to charge in cents
</ParamField>

<ParamField path="charge_currency" type="str" required>
  Three-letter currency code
</ParamField>

<ParamField path="charge_source" type="str" required>
  Payment source ID or token
</ParamField>

<ParamField path="customer_id" type="str" required>
  ID of the customer to retrieve
</ParamField>

<ParamField path="charge_description" type="str">
  Description of the charge
</ParamField>

<ParamField path="coupon_duration" type="str" required>
  Duration of the coupon
</ParamField>

<ParamField path="coupon_amount_off" type="int">
  Fixed amount off in cents
</ParamField>

<ParamField path="coupon_currency" type="str">
  Currency for amount\_off coupons
</ParamField>

<ParamField path="coupon_duration_in_months" type="int">
  Duration in months for repeating coupons
</ParamField>

<ParamField path="coupon_max_redemptions" type="int">
  Maximum number of redemptions
</ParamField>

<ParamField path="coupon_name" type="str">
  Name of the coupon
</ParamField>

<ParamField path="coupon_percent_off" type="float">
  Percentage off
</ParamField>

<ParamField path="customer_name" type="str" required>
  Full name of the customer
</ParamField>

<ParamField path="customer_description" type="str">
  Description of the customer
</ParamField>

<ParamField path="customer_email" type="str">
  Email address of the customer
</ParamField>

<ParamField path="customer_phone" type="str">
  Phone number of the customer
</ParamField>

<ParamField path="source_amount" type="int" required>
  Amount in cents for this source
</ParamField>

<ParamField path="source_currency" type="str" required>
  Three-letter currency code
</ParamField>

<ParamField path="source_customer_id" type="str" required>
  ID of the customer to attach the source to
</ParamField>

<ParamField path="source_type" type="str" required>
  Type of source to create
</ParamField>

<ParamField path="source_statement_descriptor" type="str">
  Text to display on customer's statement
</ParamField>

<ParamField path="token_card_number" type="str" required>
  Card number
</ParamField>

<ParamField path="token_cvc" type="str" required>
  Card security code
</ParamField>

<ParamField path="token_exp_month" type="str" required>
  Expiration month
</ParamField>

<ParamField path="token_exp_year" type="str" required>
  Expiration year
</ParamField>

<ParamField path="delete_source_customer_id" type="str" required>
  ID of the customer whose source to delete
</ParamField>

<ParamField path="delete_source_id" type="str" required>
  ID of the source to delete
</ParamField>

<ParamField path="limit" type="int">
  Number of customers to retrieve
</ParamField>

<ParamField path="charge_id" type="str">
  ID of the charge to retrieve
</ParamField>

<ParamField path="read_card_customer_id" type="str" required>
  ID of the customer whose card to retrieve
</ParamField>

<ParamField path="read_card_source_id" type="str" required>
  ID of the card/source to retrieve
</ParamField>

<ParamField path="read_source_id" type="str" required>
  ID of the source to retrieve
</ParamField>

<ParamField path="remove_card_customer_id" type="str" required>
  ID of the customer whose card to remove
</ParamField>

<ParamField path="remove_card_id" type="str" required>
  ID of the card to remove
</ParamField>

<ParamField path="update_charge_description" type="str">
  New description for the charge
</ParamField>

<ParamField path="update_customer_description" type="str">
  New description for the customer
</ParamField>

<ParamField path="update_customer_email" type="str">
  New email for the customer
</ParamField>

<ParamField path="update_customer_name" type="str">
  New name for the customer
</ParamField>

<ParamField path="update_customer_phone" type="str">
  New phone for the customer
</ParamField>

<a id="integration_sugar_crm" />

## `integration_sugar_crm` — SugarCRM

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_sugar_crm(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="filter" type="str" default="''">
  To filter records within module
</ParamField>

<ParamField path="integration" type="Any">
  Connect to your account
</ParamField>

<ParamField path="module" type="str" default="''">
  Your existing module on SugarCRM
</ParamField>

<ParamField path="action" type="str" default="''">
  Select the action to perform
</ParamField>

<a id="integration_supabase" />

## `integration_supabase` — Supabase

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_supabase(tool_name="...", action="delete_row", integration=..., table_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform build\_manually (bool)
  One of: `delete_row`, `get_row`, `insert_row`, `list_rows`, `update_row`
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="table_name" type="str" required>
  The name or ID of the table
</ParamField>

<ParamField path="filter" type="str">
  PostgREST filter string. Use '&' for multiple conditions. Example: id=eq.1\&name=like.*test*
</ParamField>

<a id="integration_teams" />

## `integration_teams` — Teams

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_teams(tool_name="...", action="create_channel", integration=..., chat_id="...", message_content="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `create_channel`, `create_chat_message`, `create_task`, `delete_channel`, `delete_task`, `get_channel`, `get_chat_message`, `get_task`, `get_user`, `list_channel_messages`, `list_channels`, `list_chat_messages`, `list_tasks`, `list_users`, `send_message`, `update_channel`, `update_task`
  </Expandable>
</ParamField>

<ParamField path="channel_name" type="str">
  Name of the channel to create
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="team_id" type="str">
  Select the team where you want to create the channel
</ParamField>

<ParamField path="channel_description" type="str">
  Optional description for the channel
</ParamField>

<ParamField path="channel_type" type="str">
  Type of channel (standard or private)
</ParamField>

<ParamField path="chat_id" type="str" required>
  Select the chat to send message to
</ParamField>

<ParamField path="message_content" type="str" required>
  The message content to post
</ParamField>

<ParamField path="content_type" type="str">
  Type of message content
</ParamField>

<ParamField path="bucket_id" type="str" required>
  Select the bucket to create the task in
</ParamField>

<ParamField path="plan_id" type="str">
  Select the planner plan to create the task in
</ParamField>

<ParamField path="task_title" type="str">
  Title of the task
</ParamField>

<ParamField path="assigned_to" type="str">
  Select a user to assign the task to
</ParamField>

<ParamField path="due_date" type="str">
  Due date for the task (YYYY-MM-DD format)
</ParamField>

<ParamField path="percent_complete" type="int">
  Completion percentage (0-100)
</ParamField>

<ParamField path="channel_id" type="str" required>
  Select the channel to delete
</ParamField>

<ParamField path="task_id" type="str" required>
  Select the task to delete
</ParamField>

<ParamField path="message_id" type="str" required>
  ID of the message to retrieve
</ParamField>

<ParamField path="user_identifier" type="str" required>
  Choose a user to fetch their profile
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of messages to retrieve
</ParamField>

<ParamField path="select_fields" type="str">
  Comma-separated list of fields to return. Leave empty for all fields
</ParamField>

<ParamField path="reply_to_message_id" type="str">
  ID of message to reply to (optional)
</ParamField>

<ParamField path="new_bucket_id" type="str">
  New bucket ID to move task to
</ParamField>

<a id="integration_telegram" />

## `integration_telegram` — Telegram

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_telegram(tool_name="...", action="delete_message", integration=..., text="...", user_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `delete_message`, `edit_message_text`, `get_chat`, `get_file`, `get_member`, `get_updates`, `leave_chat`, `list_administrators`, `pin_message`, `send_animation`, `send_audio`, `send_document`, `send_location`, `send_media_group`, `send_message`, `send_photo`, `send_sticker`, `send_video`, `unpin_message`, `update_description`, `update_title`
  </Expandable>
</ParamField>

<ParamField path="chat_id" type="str">
  ID of the chat to get information about
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="message_id" type="str">
  ID of the message to delete
</ParamField>

<ParamField path="text" type="str" required>
  New text of the message (1-4096 characters)
</ParamField>

<ParamField path="parse_mode" type="str">
  Mode for parsing entities in the message text
</ParamField>

<ParamField path="telegram_file_id" type="str">
  File identifier to get info about
</ParamField>

<ParamField path="user_id" type="str" required>
  ID of the user to get member details for
</ParamField>

<ParamField path="limit" type="int">
  Number of updates to retrieve (1-100, default: 10)
</ParamField>

<ParamField path="offset" type="int">
  Offset for pagination (default: 0)
</ParamField>

<ParamField path="disable_notification" type="bool">
  Pass true if it is not necessary to send a notification to all chat members about the new pinned message
</ParamField>

<ParamField path="animation" type="str" required>
  Animation to send (file\_id, HTTP URL, or file path)
</ParamField>

<ParamField path="caption" type="str">
  Animation caption (0-1024 characters, optional)
</ParamField>

<ParamField path="audio" type="str" required>
  Audio file to send (file\_id, HTTP URL, or file path)
</ParamField>

<ParamField path="duration" type="int">
  Duration of the audio in seconds (optional)
</ParamField>

<ParamField path="performer" type="str">
  Performer of the audio (optional)
</ParamField>

<ParamField path="title" type="str">
  New title for the chat (1-255 characters)
</ParamField>

<ParamField path="document" type="str" required>
  Document to send (file\_id, HTTP URL, or file path)
</ParamField>

<ParamField path="latitude" type="str" required>
  Latitude of the location
</ParamField>

<ParamField path="longitude" type="str" required>
  Longitude of the location
</ParamField>

<ParamField path="heading" type="int">
  Direction in which the user is moving (1-360 degrees, optional)
</ParamField>

<ParamField path="live_period" type="int">
  Period in seconds for which the location will be updated (60-86400, optional)
</ParamField>

<ParamField path="media" type="str" required>
  JSON array of InputMedia objects (2-10 items). Send with type(type of media) and value(url) keys.
</ParamField>

<ParamField path="disable_web_page_preview" type="bool">
  Disables link previews for links in this message
</ParamField>

<ParamField path="photo" type="str" required>
  Photo to send (file\_id, HTTP URL, or file path)
</ParamField>

<ParamField path="sticker" type="str" required>
  Sticker to send (file\_id, HTTP URL, or file path)
</ParamField>

<ParamField path="video" type="str" required>
  Video to send (file\_id, HTTP URL, or file path)
</ParamField>

<ParamField path="height" type="int">
  Video height (optional)
</ParamField>

<ParamField path="width" type="int">
  Video width (optional)
</ParamField>

<ParamField path="description" type="str" required>
  New description for the chat (0-255 characters)
</ParamField>

<a id="integration_trello" />

## `integration_trello` — Trello

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_trello(tool_name="...", action="add_board_member", integration=..., member_id="...", label_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_board_member`, `add_label_to_card`, `archive_unarchive_list`, `create_attachment`, `create_board`, `create_card`, `create_card_comment`, `create_checklist`, `create_checklist_item`, `create_label`, `create_list`, `delete_attachment`, `delete_board`, `delete_card`, `delete_card_comment`, `delete_checklist`, `delete_checklist_item`, `delete_label`, `get_attachment`, `get_board`, `get_card`, `get_checklist`, `get_checklist_item`, `get_completed_checklist_items`, `get_label`, `get_list`, `invite_board_member`, `list_attachments`, `list_board_members`, `list_cards_in_list`, `list_checklists`, `list_labels`, `list_lists`, `remove_board_member`, `remove_label_from_card`, `update_board`, `update_card`, `update_card_comment`, `update_checklist_item`, `update_label`, `update_list`
  </Expandable>
</ParamField>

<ParamField path="board_id" type="str">
  The ID of the board to retrieve
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="member_id" type="str" required>
  The ID of the member to add
</ParamField>

<ParamField path="allow_billable_guest" type="bool">
  Allow adding this member as a billable guest (important for billing control - prevents accidental charges)
</ParamField>

<ParamField path="member_type" type="str">
  Type of membership. Normal: Standard board member. Admin: Board administrator (restricted - only available if you have permission to assign admin roles). Observer: View-only access (requires Trello Premium/Enterprise). Note: Changing an admin to normal cannot be reversed. Warning: Adding an existing member will update their role.
</ParamField>

<ParamField path="organization_id" type="str">
  The organization to create the board in
</ParamField>

<ParamField path="card_id" type="str">
  The ID of the card to retrieve
</ParamField>

<ParamField path="label_id" type="str" required>
  The ID of the label to retrieve
</ParamField>

<ParamField path="list_id" type="str">
  The ID of the list to retrieve
</ParamField>

<ParamField path="closed" type="bool">
  Whether the board should be closed (archived)
</ParamField>

<ParamField path="name" type="str">
  The name of the new board
</ParamField>

<ParamField path="url" type="str" required>
  The URL of the attachment
</ParamField>

<ParamField path="mime_type" type="str">
  The MIME type of the attachment
</ParamField>

<ParamField path="set_cover" type="bool">
  Set the attachment as the cover of the card
</ParamField>

<ParamField path="default_labels" type="bool">
  Whether to create default labels for the board
</ParamField>

<ParamField path="default_lists" type="bool">
  Whether to create default lists (To Do, Doing, Done) for the board
</ParamField>

<ParamField path="description" type="str">
  Optional description for the board
</ParamField>

<ParamField path="id_board_source" type="str">
  ID of an existing board to copy settings from (optional)
</ParamField>

<ParamField path="keep_from_source" type="str">
  Comma-separated list of items to keep from source board (optional)
</ParamField>

<ParamField path="power_ups" type="str">
  Comma-separated list of power-ups to enable (optional)
</ParamField>

<ParamField path="prefs_background" type="str">
  Background color or image for the board
</ParamField>

<ParamField path="prefs_card_aging" type="str">
  Card aging visual style
</ParamField>

<ParamField path="prefs_comments" type="str">
  Who can comment on cards
</ParamField>

<ParamField path="prefs_invitations" type="str">
  Who can invite members to the board
</ParamField>

<ParamField path="prefs_permission_level" type="str">
  Permission level for the board
</ParamField>

<ParamField path="prefs_voting" type="str">
  Who can vote on cards
</ParamField>

<ParamField path="address" type="str">
  Physical address for the card location (optional)
</ParamField>

<ParamField path="coordinates" type="str">
  Coordinates in latitude,longitude format (optional)
</ParamField>

<ParamField path="due_complete" type="bool">
  Mark the due date as complete (optional)
</ParamField>

<ParamField path="due_date" type="str">
  Due date in ISO format (optional)
</ParamField>

<ParamField path="id_card_source" type="str">
  Copy details from an existing card (optional)
</ParamField>

<ParamField path="id_labels" type="str">
  Add labels to the card - comma-separated IDs or use dropdown (optional)
</ParamField>

<ParamField path="id_members" type="str">
  Assign members to the card - comma-separated IDs or use dropdown (optional)
</ParamField>

<ParamField path="location_name" type="str">
  Name of the location (optional)
</ParamField>

<ParamField path="position" type="str">
  Position of the list on the board
</ParamField>

<ParamField path="start_date" type="str">
  Start date in ISO format (optional)
</ParamField>

<ParamField path="url_source" type="str">
  Create card from URL - Trello will fetch details from this URL (optional)
</ParamField>

<ParamField path="text" type="str" required>
  The text content of the comment
</ParamField>

<ParamField path="id_checklist_source" type="str">
  Copy items from an existing checklist (optional - leave blank to create empty checklist)
</ParamField>

<ParamField path="pos" type="int">
  Change the position of the list on the board (optional)
</ParamField>

<ParamField path="checklist_id" type="str">
  The ID of the checklist to retrieve
</ParamField>

<ParamField path="checked" type="bool">
  Whether the item is checked
</ParamField>

<ParamField path="due" type="str">
  Due date for the checklist item in ISO format (optional)
</ParamField>

<ParamField path="id_member" type="str">
  ID of the member to assign to this checklist item (optional)
</ParamField>

<ParamField path="color" type="str">
  The color of the label (e.g., blue, green, yellow, etc)
</ParamField>

<ParamField path="attachment_id" type="str" required>
  The ID of the attachment to retrieve
</ParamField>

<ParamField path="comment_id" type="str" required>
  The ID of the comment to update
</ParamField>

<ParamField path="checklist_item_id" type="str" required>
  The ID of the checklist item to get
</ParamField>

<ParamField path="download_file" type="bool">
  Whether to download the attachment file
</ParamField>

<ParamField path="fields" type="str">
  Optional: Additional board properties to include (e.g., prefs, labelNames, powerUps). Basic fields (id, name, desc, url, etc.) are always returned
</ParamField>

<ParamField path="actions" type="str">
  Optional: Include board activity/actions. Options: all, createCard, updateCard, commentCard, etc. Leave empty to exclude
</ParamField>

<ParamField path="board_stars" type="str">
  Optional: Include board stars. Use 'mine' for current user's stars or 'none' to exclude
</ParamField>

<ParamField path="card_plugin_data" type="bool">
  Optional: Include plugin data for cards (requires cards to be included)
</ParamField>

<ParamField path="cards" type="str">
  Optional: Include cards from the board. Options: all, open, closed, visible. Leave empty to exclude cards
</ParamField>

<ParamField path="checklists" type="str">
  Optional: Include checklists. Options: all, none. Leave empty to exclude
</ParamField>

<ParamField path="custom_fields" type="bool">
  Optional: Include custom field definitions for the board
</ParamField>

<ParamField path="labels" type="str">
  Optional: Include labels from the board. Options: all, none. Leave empty to exclude
</ParamField>

<ParamField path="lists" type="str">
  Optional: Include lists from the board. Options: all, open, closed. Leave empty to exclude
</ParamField>

<ParamField path="members" type="bool | str">
  Optional: Include board members. Options: all, admins, normal, owners. Leave empty to exclude
</ParamField>

<ParamField path="memberships" type="str">
  Optional: Include membership details. Options: all, active, admin, deactivated, me, normal. Leave empty to exclude
</ParamField>

<ParamField path="organization" type="bool">
  Optional: Include organization details that owns this board
</ParamField>

<ParamField path="organization_plugin_data" type="bool">
  Optional: Include Power-Up/plugin data for the organization
</ParamField>

<ParamField path="plugin_data" type="bool">
  Optional: Include Power-Up/plugin data for the board
</ParamField>

<ParamField path="tags" type="bool">
  Optional: Include board tags
</ParamField>

<ParamField path="attachment_fields" type="str">
  Optional: Specify which attachment properties to include (e.g., name, url, mimeType). Only applies when attachments are included
</ParamField>

<ParamField path="attachments" type="bool">
  Optional: Include attachments from this card
</ParamField>

<ParamField path="board" type="bool">
  Optional: Include parent board information in the response
</ParamField>

<ParamField path="board_fields" type="str">
  Optional: Specify which board properties to include (e.g., name, desc, url). Only applies when board is included
</ParamField>

<ParamField path="check_item_states" type="bool">
  Optional: Include the state of all checklist items (complete/incomplete counts)
</ParamField>

<ParamField path="custom_field_items" type="bool">
  Optional: Include custom field values for this card
</ParamField>

<ParamField path="list" type="bool">
  Optional: Include parent list information for this card
</ParamField>

<ParamField path="member_fields" type="str">
  Optional: Specify which member properties to include (e.g., fullName, username). Only applies when members are included
</ParamField>

<ParamField path="member_voted_fields" type="str">
  Optional: Specify which properties to include for voting members. Only applies when members\_voted is enabled
</ParamField>

<ParamField path="members_voted" type="bool">
  Optional: Include members who voted on this card
</ParamField>

<ParamField path="sticker_fields" type="str">
  Optional: Specify which sticker properties to include. Only applies when stickers are included
</ParamField>

<ParamField path="stickers" type="bool">
  Optional: Include stickers attached to this card
</ParamField>

<ParamField path="card_fields" type="str">
  Optional: Specify which card properties to include (e.g., name, due, labels). Only applies when cards are included
</ParamField>

<ParamField path="email" type="str" required>
  Email address of the person to invite
</ParamField>

<ParamField path="full_name" type="str">
  Full name of the person to invite
</ParamField>

<ParamField path="filter" type="str">
  Filter attachments
</ParamField>

<ParamField path="id_organization" type="str">
  Move board to a different organization (optional)
</ParamField>

<ParamField path="label_names_blue" type="str">
  Name for blue label
</ParamField>

<ParamField path="label_names_green" type="str">
  Name for green label
</ParamField>

<ParamField path="label_names_orange" type="str">
  Name for orange label
</ParamField>

<ParamField path="label_names_purple" type="str">
  Name for purple label
</ParamField>

<ParamField path="label_names_red" type="str">
  Name for red label
</ParamField>

<ParamField path="label_names_yellow" type="str">
  Name for yellow label
</ParamField>

<ParamField path="prefs_card_covers" type="bool">
  Whether card covers are enabled
</ParamField>

<ParamField path="prefs_hide_votes" type="bool">
  Whether to hide voting results
</ParamField>

<ParamField path="prefs_self_join" type="bool">
  Whether members can join the board themselves
</ParamField>

<ParamField path="id_attachment_cover" type="str">
  ID of attachment to use as card cover (optional)
</ParamField>

<ParamField path="new_list_id" type="str">
  Move card to this list (optional)
</ParamField>

<ParamField path="subscribed" type="bool">
  Subscribe/unsubscribe to list notifications (optional)
</ParamField>

<ParamField path="new_board_id" type="str">
  Move this list to a different board (optional)
</ParamField>

<a id="integration_twilio" />

## `integration_twilio` — Twilio

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_twilio(tool_name="...", action="make_call", integration=..., language="...", message="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the Twilio operation to perform
  One of: `make_call`, `send_message`
</ParamField>

<ParamField path="integration" type="Any" required>
  Provide your Twilio API Key SID and Secret
</ParamField>

<ParamField path="language" type="str" required>
  Language for text-to-speech
</ParamField>

<ParamField path="message" type="str" required>
  Enter the message content to send
</ParamField>

<ParamField path="to" type="str" required>
  Enter the recipient's phone number (include country code)
</ParamField>

<ParamField path="voice" type="str" required>
  Select the voice for text-to-speech
</ParamField>

<ParamField path="message_type" type="str" required>
  Select the type of message to send
</ParamField>

<ParamField path="media_url" type="str">
  URL of media to send (for MMS only)
</ParamField>

<a id="integration_typeform" />

## `integration_typeform` — Typeform

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_typeform(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="form_id" type="str" default="''">
  Select the form from which to get the responses
</ParamField>

<ParamField path="integration" type="Any">
  Connect to your account
</ParamField>

<ParamField path="number_of_responses" type="str" default="''">
  The number of responses to fetch
</ParamField>

<ParamField path="action" type="str" default="''">
  Select the action to perform
</ParamField>

<a id="integration_weaviate" />

## `integration_weaviate` — Weaviate

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_weaviate(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="collection" type="str" default="''">
  Select the Weaviate collection to query
</ParamField>

<ParamField path="embedding_model" type="str" default="''">
  Select the embedding model to use to embed the query
</ParamField>

<ParamField path="integration" type="Any">
  Connect to your account
</ParamField>

<ParamField path="properties" type="str" default="''">
  Comma-separated list of keywords to use
</ParamField>

<ParamField path="query" type="str" default="''">
  Natural Language Query
</ParamField>

<ParamField path="action" type="str" default="''">
  Select the action to perform
</ParamField>

<a id="integration_wordpress" />

## `integration_wordpress` — Wordpress

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_wordpress(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="integration" type="Any">
  Connect to your account
</ParamField>

<ParamField path="post_content" type="str" default="''">
  The content of the post
</ParamField>

<ParamField path="post_title" type="str" default="''">
  The title of the post
</ParamField>

<ParamField path="wordpress_url" type="Any">
  Wordpress domain URL
</ParamField>

<ParamField path="action" type="str" default="''">
  Select the action to perform
</ParamField>

<a id="integration_x" />

## `integration_x` — X

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_x(tool_name="...", action="add_list_member", integration=..., list_id="...", tweet_text="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `add_list_member`, `create_post`, `create_thread`, `create_tweet`, `delete_tweet`, `get_user`, `retweet_tweet`, `search_tweets`
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your X account
</ParamField>

<ParamField path="list_id" type="str" required>
  ID of the list to add member to
</ParamField>

<ParamField path="user_id" type="str">
  Alternative: User ID instead of username
</ParamField>

<ParamField path="username" type="str">
  Username to get information for (without @)
</ParamField>

<ParamField path="text" type="str">
  The text of the post
</ParamField>

<ParamField path="tweet_text" type="str" required>
  The tweet content (max 280 characters)
</ParamField>

<ParamField path="media_urls" type="list[str]">
  Optional: URLs of media to attach (up to 4)
</ParamField>

<ParamField path="quote_tweet_id" type="str">
  Optional: ID of tweet to quote
</ParamField>

<ParamField path="reply_to_tweet_id" type="str">
  Optional: ID of tweet to reply to
</ParamField>

<ParamField path="tweet_id" type="str" required>
  ID of the tweet to delete
</ParamField>

<ParamField path="max_results" type="int" required>
  Maximum number of tweets to return (10-100)
</ParamField>

<ParamField path="query" type="str" required>
  Search query using X search operators
</ParamField>

<ParamField path="end_time" type="str">
  Optional: Search tweets before this time
</ParamField>

<ParamField path="include_retweets" type="bool">
  Whether to include retweets in results
</ParamField>

<ParamField path="sort_order" type="str">
  Sort tweets by recency or relevancy
</ParamField>

<ParamField path="start_time" type="str">
  Optional: Search tweets after this time
</ParamField>

<a id="integration_youtube" />

## `integration_youtube` — YouTube

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_youtube(tool_name="...", action="add_playlist_item", integration=..., playlist_item_id="...", max_results=0)
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `add_playlist_item`, `create_playlist`, `delete_playlist`, `delete_playlist_item`, `delete_video`, `get_channel`, `get_playlist`, `get_playlist_item`, `get_video`, `list_channels`, `list_playlist_items`, `list_playlists`, `list_video_categories`, `list_videos`, `rate_video`, `update_channel`, `update_playlist`, `update_video`, `upload_channel_banner`, `upload_video`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="playlist_id" type="str">
  The ID of the playlist to delete
</ParamField>

<ParamField path="video_id" type="str">
  The ID of the video to add
</ParamField>

<ParamField path="end_at" type="str">
  End time (PT2M30S format)
</ParamField>

<ParamField path="note" type="str">
  Note about the playlist item
</ParamField>

<ParamField path="position" type="int">
  Position in the playlist
</ParamField>

<ParamField path="start_at" type="str">
  Start time (PT1M30S format)
</ParamField>

<ParamField path="title" type="str">
  New title for the channel
</ParamField>

<ParamField path="default_language" type="str">
  Default language of the playlist
</ParamField>

<ParamField path="description" type="str">
  New description for the channel
</ParamField>

<ParamField path="privacy_status" type="str">
  Privacy status of the playlist
</ParamField>

<ParamField path="tags" type="str">
  Tags for the playlist (comma-separated)
</ParamField>

<ParamField path="playlist_item_id" type="str" required>
  The ID of the playlist item to delete
</ParamField>

<ParamField path="max_results" type="int" required>
  Maximum number of results to return
</ParamField>

<ParamField path="channel_ids" type="str">
  Comma-separated list of channel IDs
</ParamField>

<ParamField path="managed_by_me" type="bool">
  Get channels managed by you
</ParamField>

<ParamField path="mine" type="bool">
  Get your own channels
</ParamField>

<ParamField path="page_token" type="str">
  Page token for pagination
</ParamField>

<ParamField path="username" type="str">
  Username of the channel
</ParamField>

<ParamField path="fetch_all" type="bool">
  Fetch all playlists
</ParamField>

<ParamField path="playlist_ids" type="str">
  Comma-separated list of playlist IDs
</ParamField>

<ParamField path="language" type="str">
  Language for category names
</ParamField>

<ParamField path="region_code" type="str">
  Region code for results
</ParamField>

<ParamField path="category_id" type="str">
  Get videos by category
</ParamField>

<ParamField path="chart" type="str">
  Chart to retrieve
</ParamField>

<ParamField path="video_ids" type="str">
  Comma-separated list of video IDs
</ParamField>

<ParamField path="rating" type="str" required>
  Rating to give the video
</ParamField>

<ParamField path="default_tab" type="str">
  Default tab for the channel
</ParamField>

<ParamField path="featured_channels_title" type="str">
  Title for the featured channels section
</ParamField>

<ParamField path="featured_channels_urls" type="str">
  URLs for the featured channels
</ParamField>

<ParamField path="keywords" type="str">
  Keywords for the channel
</ParamField>

<ParamField path="moderate_comments" type="str">
  Whether to moderate comments on the channel
</ParamField>

<ParamField path="show_browse_view" type="str">
  Whether to show the browse view on the channel
</ParamField>

<ParamField path="show_related_channels" type="str">
  Whether to show related channels on the channel
</ParamField>

<ParamField path="show_sponsor_list" type="str">
  Whether to show the sponsor list on the channel
</ParamField>

<ParamField path="tracking_analytics_account_id" type="str">
  Tracking analytics account ID for the channel
</ParamField>

<ParamField path="unsubscribed_trailer" type="str">
  Unsubscribed trailer video ID for the channel
</ParamField>

<ParamField path="embeddable" type="bool">
  Whether the video can be embedded
</ParamField>

<ParamField path="license" type="str">
  License of the video
</ParamField>

<ParamField path="made_for_kids" type="bool">
  Whether the video is made for kids
</ParamField>

<ParamField path="public_stats_viewable" type="bool">
  Whether the video's stats are viewable
</ParamField>

<ParamField path="publish_at" type="str">
  Publish date and time of the video
</ParamField>

<ParamField path="recording_date" type="str">
  Recording date of the video
</ParamField>

<ParamField path="banner_image" type="str" required>
  Banner image file to upload
</ParamField>

<ParamField path="video_file" type="str" required>
  Video file to upload
</ParamField>

<a id="integration_zendesk" />

## `integration_zendesk` — Zendesk

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_zendesk(tool_name="...", action="count_organizations", integration=..., ticket_body="...", ticket_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform

  <Expandable title="Allowed values">
    `count_organizations`, `create_comment`, `create_organization`, `create_ticket`, `create_user`, `delete_organization`, `delete_ticket`, `delete_user`, `get_organization`, `get_organization_related_data`, `get_ticket_field`, `get_tickets`, `get_user`, `get_user_organizations`, `get_user_related_data`, `list_organizations`, `list_ticket_fields`, `list_users`, `read_ticket`, `read_ticket_comments`, `recover_ticket`, `search_users`, `update_organization`, `update_ticket`, `update_user`
  </Expandable>
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your account
</ParamField>

<ParamField path="ticket_body" type="str" required>
  Body content of the ticket
</ParamField>

<ParamField path="ticket_id" type="str" required>
  Select the Zendesk ticket to update
</ParamField>

<ParamField path="public" type="bool">
  Whether the comment should be public
</ParamField>

<ParamField path="organization_name" type="str">
  Name of the organization
</ParamField>

<ParamField path="organization_details" type="str">
  Additional details about the organization
</ParamField>

<ParamField path="organization_domain_names" type="str">
  Domain names for the organization (comma-separated)
</ParamField>

<ParamField path="organization_external_id" type="str">
  External ID for the organization
</ParamField>

<ParamField path="organization_group_id" type="str">
  Group ID for the organization
</ParamField>

<ParamField path="organization_notes" type="str">
  Notes about the organization
</ParamField>

<ParamField path="organization_shared_comments" type="bool">
  Whether the organization has shared comments
</ParamField>

<ParamField path="organization_shared_tickets" type="bool">
  Whether the organization has shared tickets
</ParamField>

<ParamField path="organization_tags" type="str">
  Tags for the organization
</ParamField>

<ParamField path="requester_email" type="str" required>
  Email of the requester
</ParamField>

<ParamField path="ticket_priority" type="str">
  Priority of the ticket
</ParamField>

<ParamField path="ticket_status" type="str">
  Status of the ticket
</ParamField>

<ParamField path="ticket_subject" type="str" required>
  Subject content of the ticket
</ParamField>

<ParamField path="ticket_type" type="str">
  Type of the ticket
</ParamField>

<ParamField path="requester_name" type="str">
  Name of the requester (Required if requester email is not already registered)
</ParamField>

<ParamField path="ticket_group_id" type="str">
  Select the group to assign the ticket to
</ParamField>

<ParamField path="user_email" type="str">
  Email address of the user
</ParamField>

<ParamField path="user_name" type="str">
  Name of the user
</ParamField>

<ParamField path="user_alias" type="str">
  Alias for the user
</ParamField>

<ParamField path="user_custom_role_id" type="str">
  Custom role ID for the user
</ParamField>

<ParamField path="user_details" type="str">
  Details for the user
</ParamField>

<ParamField path="user_external_id" type="str">
  External ID for the user
</ParamField>

<ParamField path="user_locale" type="str">
  Locale for the user
</ParamField>

<ParamField path="user_moderator" type="bool">
  Whether the user is a moderator
</ParamField>

<ParamField path="user_notes" type="str">
  Notes for the user
</ParamField>

<ParamField path="user_only_private_comments" type="bool">
  Whether the user only has private comments
</ParamField>

<ParamField path="user_organization_id" type="str">
  Organization ID for the user
</ParamField>

<ParamField path="user_phone" type="str">
  Phone number of the user
</ParamField>

<ParamField path="user_report_csv" type="bool">
  Whether the user can generate reports in CSV format
</ParamField>

<ParamField path="user_restricted_agent" type="bool">
  Whether the user is a restricted agent
</ParamField>

<ParamField path="user_role" type="str">
  Role of the user
</ParamField>

<ParamField path="user_signature" type="str">
  Signature for the user
</ParamField>

<ParamField path="user_suspended" type="bool">
  Whether the user is suspended
</ParamField>

<ParamField path="user_tags" type="str">
  Tags for the user
</ParamField>

<ParamField path="user_ticket_restriction" type="str">
  Ticket restriction for the user
</ParamField>

<ParamField path="user_timezone" type="str">
  Timezone for the user
</ParamField>

<ParamField path="organization_id" type="str" required>
  Select the Zendesk organization to delete
</ParamField>

<ParamField path="user_id" type="str" required>
  Select the Zendesk user to delete
</ParamField>

<ParamField path="ticket_field_id" type="str" required>
  ID of the ticket field to retrieve
</ParamField>

<ParamField path="assignee" type="str">
  Assignee of the ticket
</ParamField>

<ParamField path="body" type="str">
  Search in the full ticket content
</ParamField>

<ParamField path="brand" type="str">
  Filter by brand
</ParamField>

<ParamField path="comment" type="str">
  Search in ticket comments
</ParamField>

<ParamField path="comment_exact" type="str">
  Match comment exactly
</ParamField>

<ParamField path="description" type="str">
  Search in the ticket description
</ParamField>

<ParamField path="due" type="str">
  Tickets due on this date
</ParamField>

<ParamField path="external_id" type="str">
  Search by external ID
</ParamField>

<ParamField path="group" type="str">
  Filter by assigned group
</ParamField>

<ParamField path="include" type="str">
  Include related data (e.g. users)
</ParamField>

<ParamField path="organization" type="str">
  Organization of the ticket
</ParamField>

<ParamField path="priority" type="str">
  Priority of the ticket
</ParamField>

<ParamField path="requester" type="str">
  Requester of the ticket
</ParamField>

<ParamField path="satisfaction" type="str">
  Customer satisfaction rating
</ParamField>

<ParamField path="solved" type="str">
  Tickets solved on this date
</ParamField>

<ParamField path="sort_by" type="str">
  Field to sort results by
</ParamField>

<ParamField path="sort_order" type="str">
  Order of sorting (asc/desc)
</ParamField>

<ParamField path="status" type="str">
  Status of the ticket
</ParamField>

<ParamField path="subject" type="str">
  Search tickets by subject
</ParamField>

<ParamField path="subject_exact" type="str">
  Match subject exactly
</ParamField>

<ParamField path="ticket_form" type="str">
  Filter by ticket form
</ParamField>

<ParamField path="updated" type="str">
  Tickets updated on this date
</ParamField>

<ParamField path="limit" type="int" required>
  Maximum number of ticket fields to retrieve
</ParamField>

<ParamField path="return_all" type="bool">
  Whether to return all organizations
</ParamField>

<ParamField path="role" type="str">
  Filter users by role
</ParamField>

<ParamField path="email" type="str">
  Email of the user to search for
</ParamField>

<ParamField path="name" type="str">
  Name of the user to search for
</ParamField>

<ParamField path="phone" type="str">
  Phone number of the user to search for
</ParamField>

<ParamField path="search_query" type="str">
  Search query for users
</ParamField>

<ParamField path="update_ticket_assignee_id" type="str">
  The ID of the assignee to update the ticket to (only staff members can be assigned to tickets)
</ParamField>

<ParamField path="update_ticket_body" type="str">
  Body content of the ticket
</ParamField>

<ParamField path="update_ticket_group_id" type="str">
  Select the group to assign the ticket to
</ParamField>

<ParamField path="update_ticket_subject" type="str">
  Subject content of the ticket
</ParamField>

<a id="integration_zoho" />

## `integration_zoho` — Zoho CRM

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_zoho(tool_name="...", action="create_account", integration=..., product_name="...", vendor_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the Zoho CRM operation to perform

  <Expandable title="Allowed values">
    `create_account`, `create_contact`, `create_deal`, `create_invoice`, `create_lead`, `create_product`, `create_purchase_order`, `create_quote`, `create_sales_order`, `create_vendor`, `delete_account`, `delete_contact`, `delete_deal`, `delete_invoice`, `delete_lead`, `delete_product`, `delete_purchase_order`, `delete_quote`, `delete_sales_order`, `delete_vendor`, `get_account`, `get_contact`, `get_deal`, `get_invoice`, `get_lead`, `get_lead_fields`, `get_product`, `get_purchase_order`, `get_quote`, `get_sales_order`, `get_vendor`, `list_accounts`, `list_contacts`, `list_deals`, `list_invoices`, `list_leads`, `list_products`, `list_purchase_orders`, `list_quotes`, `list_sales_orders`, `list_vendors`, `update_account`, `update_contact`, `update_deal`, `update_invoice`, `update_lead`, `update_product`, `update_purchase_order`, `update_quote`, `update_sales_order`, `update_vendor`, `upsert_account`, `upsert_contact`, `upsert_deal`, `upsert_invoice`, `upsert_lead`, `upsert_product`, `upsert_purchase_order`, `upsert_quote`, `upsert_sales_order`, `upsert_vendor`
  </Expandable>
</ParamField>

<ParamField path="account_name" type="str">
  Name of the account (required)
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Zoho CRM account
</ParamField>

<ParamField path="account_number" type="str">
  Account number/identifier
</ParamField>

<ParamField path="account_site" type="str">
  Account site or location name
</ParamField>

<ParamField path="account_type" type="str">
  Type of account (e.g., Customer, Partner, Prospect, Distributor, or custom type)
</ParamField>

<ParamField path="annual_revenue" type="float">
  Annual revenue of the account
</ParamField>

<ParamField path="billing_city" type="str">
  Billing city
</ParamField>

<ParamField path="billing_code" type="str">
  Billing postal/zip code
</ParamField>

<ParamField path="billing_country" type="str">
  Billing country
</ParamField>

<ParamField path="billing_state" type="str">
  Billing state/province
</ParamField>

<ParamField path="billing_street" type="str">
  Billing street address
</ParamField>

<ParamField path="contact_details" type="str">
  Additional contact details
</ParamField>

<ParamField path="currency" type="str">
  ISO 4217 currency code (e.g., USD, EUR, GBP). Note: Only use currencies that are enabled in your Zoho CRM Settings → Company Details → Currencies
</ParamField>

<ParamField path="custom_fields" type="str">
  Custom fields as JSON using API names, not display names (e.g., \{"Custom\_Rating\_\_c": "Hot", "Account\_Source": "Web"})
</ParamField>

<ParamField path="description" type="str">
  Description of the account
</ParamField>

<ParamField path="employees" type="int">
  Number of employees
</ParamField>

<ParamField path="exchange_rate" type="float">
  Exchange rate for currency conversion
</ParamField>

<ParamField path="fax" type="str">
  Account fax number
</ParamField>

<ParamField path="industry" type="str">
  Industry of the account
</ParamField>

<ParamField path="phone" type="str">
  Account phone number
</ParamField>

<ParamField path="shipping_city" type="str">
  Shipping city
</ParamField>

<ParamField path="shipping_code" type="str">
  Shipping postal/zip code
</ParamField>

<ParamField path="shipping_country" type="str">
  Shipping country
</ParamField>

<ParamField path="shipping_state" type="str">
  Shipping state/province
</ParamField>

<ParamField path="shipping_street" type="str">
  Shipping street address
</ParamField>

<ParamField path="ticker_symbol" type="str">
  Stock ticker symbol
</ParamField>

<ParamField path="website" type="str">
  Account website URL
</ParamField>

<ParamField path="last_name" type="str">
  Last name of the contact (required)
</ParamField>

<ParamField path="assistant" type="str">
  Name of the contact's assistant
</ParamField>

<ParamField path="asst_phone" type="str">
  Assistant's phone number
</ParamField>

<ParamField path="date_of_birth" type="str">
  Date of birth (YYYY-MM-DD format)
</ParamField>

<ParamField path="department" type="str">
  Department the contact belongs to
</ParamField>

<ParamField path="email" type="str">
  Primary email address
</ParamField>

<ParamField path="first_name" type="str">
  First name
</ParamField>

<ParamField path="full_name" type="str">
  Full name of the contact
</ParamField>

<ParamField path="home_phone" type="str">
  Home phone number
</ParamField>

<ParamField path="mailing_city" type="str">
  Mailing city
</ParamField>

<ParamField path="mailing_country" type="str">
  Mailing country
</ParamField>

<ParamField path="mailing_state" type="str">
  Mailing state/province
</ParamField>

<ParamField path="mailing_street" type="str">
  Mailing street address
</ParamField>

<ParamField path="mailing_zip" type="str">
  Mailing postal/zip code
</ParamField>

<ParamField path="mobile" type="str">
  Mobile number
</ParamField>

<ParamField path="other_city" type="str">
  Other city
</ParamField>

<ParamField path="other_country" type="str">
  Other country
</ParamField>

<ParamField path="other_phone" type="str">
  Other phone number
</ParamField>

<ParamField path="other_state" type="str">
  Other state/province
</ParamField>

<ParamField path="other_street" type="str">
  Other street address
</ParamField>

<ParamField path="other_zip" type="str">
  Other postal/zip code
</ParamField>

<ParamField path="salutation" type="str">
  Salutation (Mr., Mrs., Ms., Dr., etc.)
</ParamField>

<ParamField path="secondary_email" type="str">
  Secondary email address
</ParamField>

<ParamField path="skype_id" type="str">
  Skype ID
</ParamField>

<ParamField path="title" type="str">
  Job title
</ParamField>

<ParamField path="twitter" type="str">
  Twitter handle
</ParamField>

<ParamField path="deal_name" type="str">
  Name of the deal (required)
</ParamField>

<ParamField path="stage" type="str">
  Deal stage (e.g., Qualification, Needs Analysis, Value Proposition, Identify Decision Makers, Proposal/Price Quote, Negotiation/Review, Closed Won, Closed Lost, or custom stage) (required)
</ParamField>

<ParamField path="amount" type="float">
  Monetary amount of the deal
</ParamField>

<ParamField path="closing_date" type="str">
  Expected closing date (YYYY-MM-DD format)
</ParamField>

<ParamField path="lead_conversion_time" type="int">
  Days to convert lead to deal
</ParamField>

<ParamField path="next_step" type="str">
  Next step in the sales process
</ParamField>

<ParamField path="overall_sales_duration" type="int">
  Total days from lead to closed deal
</ParamField>

<ParamField path="probability" type="int">
  Probability of deal closure (0-100)
</ParamField>

<ParamField path="sales_cycle_duration" type="int">
  Days to win the deal
</ParamField>

<ParamField path="product_ids" type="list[str]">
  Comma-separated list of product IDs (required, one per product)
</ParamField>

<ParamField path="subject" type="str">
  Subject of the invoice (required)
</ParamField>

<ParamField path="account_id" type="str">
  The ID of the account to retrieve (required)
</ParamField>

<ParamField path="adjustment" type="float">
  Adjustment in grand total
</ParamField>

<ParamField path="due_date" type="str">
  Payment due date (YYYY-MM-DD)
</ParamField>

<ParamField path="invoice_date" type="str">
  Invoice date (YYYY-MM-DD)
</ParamField>

<ParamField path="invoice_number" type="str">
  Invoice number
</ParamField>

<ParamField path="product_descriptions" type="list[str]">
  Comma-separated list of product descriptions (one per product)
</ParamField>

<ParamField path="product_list_prices" type="list[str]">
  Comma-separated list of list prices (one per product)
</ParamField>

<ParamField path="product_quantities" type="list[str]">
  Comma-separated list of quantities (one per product, default: 1)
</ParamField>

<ParamField path="product_taxes" type="list[str]">
  Comma-separated list of tax amounts (one per product)
</ParamField>

<ParamField path="sales_commission" type="float">
  Sales commission amount (actual monetary value, not percentage)
</ParamField>

<ParamField path="status" type="str">
  Invoice status
</ParamField>

<ParamField path="terms_and_conditions" type="str">
  Terms and conditions
</ParamField>

<ParamField path="company" type="str">
  Company name (required)
</ParamField>

<ParamField path="city" type="str">
  City
</ParamField>

<ParamField path="country" type="str">
  Country
</ParamField>

<ParamField path="designation" type="str">
  Job title/designation
</ParamField>

<ParamField path="email_opt_out" type="bool">
  Whether the lead has opted out of emails
</ParamField>

<ParamField path="industry_type" type="str">
  Type of industry
</ParamField>

<ParamField path="lead_source" type="str">
  Source of the lead
</ParamField>

<ParamField path="lead_status" type="str">
  Status of the lead
</ParamField>

<ParamField path="no_of_employees" type="int">
  Number of employees in the lead's company
</ParamField>

<ParamField path="state" type="str">
  State
</ParamField>

<ParamField path="street" type="str">
  Street address
</ParamField>

<ParamField path="zip_code" type="str">
  Postal code
</ParamField>

<ParamField path="product_name" type="str" required>
  Name of the product (required)
</ParamField>

<ParamField path="commission_rate" type="float">
  Commission rate amount (actual monetary value, not percentage)
</ParamField>

<ParamField path="manufacturer" type="str">
  Manufacturer name
</ParamField>

<ParamField path="product_active" type="bool">
  Whether the product is active
</ParamField>

<ParamField path="product_category" type="str">
  Category of the product
</ParamField>

<ParamField path="qty_in_demand" type="float">
  Quantity in demand
</ParamField>

<ParamField path="qty_in_stock" type="float">
  Quantity available in stock
</ParamField>

<ParamField path="taxable" type="bool">
  Whether the product is taxable
</ParamField>

<ParamField path="unit_price" type="float">
  Unit price of the product
</ParamField>

<ParamField path="vendor_id" type="str" required>
  Associated vendor (required)
</ParamField>

<ParamField path="carrier" type="str">
  Carrier name
</ParamField>

<ParamField path="discount" type="float">
  Discount amount (actual monetary value, not percentage)
</ParamField>

<ParamField path="po_date" type="str">
  Purchase order date (YYYY-MM-DD)
</ParamField>

<ParamField path="po_number" type="str">
  Purchase order number
</ParamField>

<ParamField path="tracking_number" type="str">
  Tracking number
</ParamField>

<ParamField path="quote_stage" type="str">
  Quote stage (e.g., Draft, Negotiation, Delivered, On Hold, Confirmed, Closed Won, Closed Lost, or custom stage)
</ParamField>

<ParamField path="team" type="str">
  Team for the quote
</ParamField>

<ParamField path="valid_till" type="str">
  Quote validity date (YYYY-MM-DD)
</ParamField>

<ParamField path="contact_id" type="str">
  The ID of the contact to retrieve
</ParamField>

<ParamField path="deal_id" type="str">
  The ID of the deal to retrieve
</ParamField>

<ParamField path="so_number" type="str">
  Sales order number
</ParamField>

<ParamField path="vendor_name" type="str">
  Name of the vendor (required)
</ParamField>

<ParamField path="category" type="str">
  Vendor category
</ParamField>

<ParamField path="invoice_id" type="str" required>
  The ID of the invoice to retrieve
</ParamField>

<ParamField path="lead_id" type="str" required>
  The ID of the lead to retrieve
</ParamField>

<ParamField path="product_id" type="str" required>
  The ID of the product to retrieve
</ParamField>

<ParamField path="purchase_order_id" type="str" required>
  The ID of the purchase order to retrieve
</ParamField>

<ParamField path="quote_id" type="str" required>
  The ID of the quote to retrieve
</ParamField>

<ParamField path="sales_order_id" type="str" required>
  The ID of the sales order to retrieve
</ParamField>

<ParamField path="approved" type="bool">
  Whether to retrieve only approved records
</ParamField>

<ParamField path="converted" type="bool">
  Whether to retrieve only converted records
</ParamField>

<ParamField path="fields" type="str">
  Comma-separated list of specific fields to return
</ParamField>

<ParamField path="include_child" type="bool">
  Whether to retrieve records from child territories
</ParamField>

<ParamField path="limit" type="int">
  Maximum number of accounts to return (max 200 per page)
</ParamField>

<ParamField path="return_all" type="bool">
  Whether to return all accounts or only up to a given limit
</ParamField>

<ParamField path="sort_by" type="str">
  Field to sort records by (e.g., Account\_Name, Created\_Time, Modified\_Time)
</ParamField>

<ParamField path="sort_order" type="str">
  Sort order: ascending or descending
</ParamField>

<ParamField path="territory_id" type="str">
  Filter by territory ID
</ParamField>

<a id="integration_zoom" />

## `integration_zoom` — Zoom

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.integration_zoom(tool_name="...", action="create_meeting", integration=..., meeting_id="...", limit=0)
  ```
</CodeGroup>

**Parameters**

<ParamField path="action" type="str" required>
  Select the action to perform
  One of: `create_meeting`, `delete_meeting`, `get_meeting`, `list_meetings`, `update_meeting`
</ParamField>

<ParamField path="integration" type="Any" required>
  Connect to your Zoom account
</ParamField>

<ParamField path="topic" type="str">
  Topic of the meeting
</ParamField>

<ParamField path="agenda" type="str">
  Meeting agenda
</ParamField>

<ParamField path="alternative_hosts" type="str">
  Alternative hosts email IDs (comma separated)
</ParamField>

<ParamField path="audio" type="str">
  How participants can join the audio portion of the meeting
</ParamField>

<ParamField path="auto_recording" type="str">
  Automatic recording setting
</ParamField>

<ParamField path="cn_meeting" type="bool">
  Host this meeting in China
</ParamField>

<ParamField path="duration" type="int">
  Meeting duration in minutes
</ParamField>

<ParamField path="host_video" type="bool">
  Start video when host joins the meeting
</ParamField>

<ParamField path="in_meeting" type="bool">
  Host this meeting in India
</ParamField>

<ParamField path="join_before_host" type="bool">
  Allow participants to join the meeting before host starts it
</ParamField>

<ParamField path="mute_upon_entry" type="bool">
  Mute participants upon entry
</ParamField>

<ParamField path="participant_video" type="bool">
  Start video when participants join the meeting
</ParamField>

<ParamField path="password" type="str">
  Meeting password (max 10 characters)
</ParamField>

<ParamField path="registration_type" type="str">
  Registration type for recurring meetings with fixed time
</ParamField>

<ParamField path="schedule_for" type="str">
  Schedule meeting for another user's email
</ParamField>

<ParamField path="start_time" type="str">
  Start time for the meeting
</ParamField>

<ParamField path="timezone" type="str">
  Timezone for the meeting
</ParamField>

<ParamField path="type" type="str">
  Meeting type
</ParamField>

<ParamField path="waiting_room" type="bool">
  Enable waiting room
</ParamField>

<ParamField path="watermark" type="bool">
  Add watermark when viewing a shared screen
</ParamField>

<ParamField path="meeting_id" type="str" required>
  Meeting ID to retrieve
</ParamField>

<ParamField path="occurrence_id" type="str">
  Occurrence ID for recurring meetings
</ParamField>

<ParamField path="schedule_for_reminder" type="bool">
  Send cancellation email to host and alternative hosts
</ParamField>

<ParamField path="show_previous_occurrences" type="bool">
  Show past occurrences of recurring meetings
</ParamField>

<ParamField path="limit" type="int" required>
  Number of meetings to return (1-300)
</ParamField>

<ParamField path="return_all" type="bool">
  Return all meetings
</ParamField>
