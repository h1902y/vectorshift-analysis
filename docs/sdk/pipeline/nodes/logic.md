> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Logic nodes

> Branch, route, merge, time, and run code.

Add these nodes with the pipeline builder: `pipeline.add(name="...").<node>(...)`. Each entry lists the node's configuration parameters. See the [Pipeline reference](/sdk/pipeline/reference) for `add`, `run`, and lifecycle methods.

<a id="add_node" />

## `add_node` — Add Node

Add a new node to the conversation.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").add_node()
  ```
</CodeGroup>

<a id="ai_routing" />

## `ai_routing` — AI Routing

Route the execution flow to different paths based on the value of the conditions.

<Info>Platform docs: [AI Routing](/nodes/ai-routing/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").ai_routing(provider="anthropic", input_query="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="provider" type="str" required>
  The model provider

  <Expandable title="Allowed values">
    `anthropic`, `azure`, `bedrock`, `cohere`, `custom`, `fireworks`, `google`, `groq`, `openai`, `perplexity`, `together`, `xai`
  </Expandable>
</ParamField>

<ParamField path="enable_shared_memory" type="bool" default="False">
  If enabled, Shared Memory will be included as context for routing decisions
</ParamField>

<ParamField path="model" type="str" default="''">
  The specific model for categorization

  <Expandable title="Allowed values">
    `MiniMaxAI/MiniMax-M2.5`, `MiniMaxAI/MiniMax-M2.7`, `Qwen/QwQ-32B-Preview`, `Qwen/Qwen2.5-72B-Instruct-Turbo-lora`, `Qwen/Qwen2.5-7B-Instruct-Turbo`, `Qwen/Qwen3-235B-A22B-Instruct-2507-tput`, `Qwen/Qwen3-235B-A22B-fp8-tput`, `Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8`, `Qwen/Qwen3-VL-8B-Instruct`, `Qwen/Qwen3.5-397B-A17B`, `Qwen/Qwen3.5-9B`, `Qwen/Qwen3.6-Plus`, `accounts/fireworks/models/deepseek-v4-pro`, `accounts/fireworks/models/glm-5p1`, `accounts/fireworks/models/gpt-oss-120b`, `accounts/fireworks/models/kimi-k2p5`, `accounts/fireworks/models/kimi-k2p6`, `accounts/fireworks/models/minimax-m2p7`, `accounts/fireworks/models/qwen3-235b-a22b`, `accounts/fireworks/models/qwen3p5-397b-a17b`, `accounts/fireworks/models/qwen3p6-plus`, `amazon.nova-lite-v1:0`, `amazon.nova-micro-v1:0`, `amazon.nova-pro-v1:0`, `amazon.titan-text-express-v1`, `amazon.titan-text-lite-v1`, `chatgpt-4o-latest`, `claude-3-5-haiku-20241022`, `claude-3-7-sonnet-20250219`, `claude-3-haiku-20240307`, `claude-haiku-4-5-20251001`, `claude-opus-4-1-20250805`, `claude-opus-4-20250514`, `claude-opus-4-5-20251101`, `claude-opus-4-6`, `claude-opus-4-7`, `claude-opus-4-8`, `claude-sonnet-4-20250514`, `claude-sonnet-4-5`, `claude-sonnet-4-6`, `command-nightly`, `command-r-08-2024`, `command-r-plus-08-2024`, `deepcogito/cogito-v2-1-671b`, `deepseek-ai/DeepSeek-R1-Distill-Llama-70B`, `deepseek-ai/DeepSeek-V3`, `deepseek-ai/DeepSeek-V4-Pro`, `deepseek-ai/deepseek-llm-67b-chat`, `gemini-2.0-flash-001`, `gemini-2.0-flash-lite-preview-02-05`, `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-3-flash-preview`, `gemini-3-pro-preview`, `gemini-3.1-flash-lite-preview`, `gemini-3.1-pro-preview`, `gemini-3.5-flash`, `gemma2-9b-it`, `google/gemma-2-27b-it`, `google/gemma-2-9b-it`, `google/gemma-2b-it`, `google/gemma-3n-E4B-it`, `google/gemma-4-31B-it`, `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4-turbo-2024-04-09`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4o`, `gpt-4o-2024-08-06`, `gpt-4o-mini`, `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `gpt-5.1`, `gpt-5.1-codex`, `gpt-5.1-codex-mini`, `gpt-5.2`, `gpt-5.3-codex`, `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.5`, `grok-2`, `grok-2-vision`, `grok-3-beta`, `grok-3-fast-beta`, `grok-3-mini-beta`, `grok-3-mini-fast-beta`, `grok-4`, `grok-4-0629`, `grok-4-0709`, `grok-4-fast-non-reasoning`, `grok-4-fast-reasoning`, `grok-4-latest`, `llama-3.1-8b-instant`, `llama-3.3-70b-versatile`, `meta-llama/Llama-3-70b-chat-hf`, `meta-llama/Llama-3-8b-chat-hf`, `meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.2-3B-Instruct-Turbo`, `meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.3-70B-Instruct-Turbo`, `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`, `meta-llama/Llama-4-Scout-17B-16E-Instruct`, `meta-llama/Meta-Llama-3-70B-Instruct-Lite`, `meta-llama/Meta-Llama-3-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3-8B-Instruct-Lite`, `meta-llama/Meta-Llama-3-8B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo`, `meta.llama3-8b-instruct-v1:0`, `mistralai/Mistral-7B-Instruct-v0.1`, `mistralai/Mistral-7B-Instruct-v0.2`, `mistralai/Mistral-7B-Instruct-v0.3`, `mistralai/Mixtral-8x22B-Instruct-v0.1`, `mistralai/Mixtral-8x7B-Instruct-v0.1`, `mixtral-8x7b-32768`, `moonshotai/Kimi-K2-Instruct`, `moonshotai/Kimi-K2.5`, `moonshotai/Kimi-K2.6`, `o1`, `o3`, `o3-mini`, `o4-mini`, `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `perplexity-ai/r1-1776`, `r1-1776`, `sonar`, `sonar-deep-research`, `sonar-pro`, `sonar-reasoning-pro`, `us.anthropic.claude-haiku-4-5-20251001-v1:0`, `us.anthropic.claude-opus-4-1-20250805-v1:0`, `us.anthropic.claude-opus-4-5-20251101-v1:0`, `us.anthropic.claude-opus-4-6-v1`, `us.anthropic.claude-sonnet-4-20250514-v1:0`, `us.anthropic.claude-sonnet-4-5-20250929-v1:0`, `us.anthropic.claude-sonnet-4-6`, `us.meta.llama3-1-70b-instruct-v1:0`, `us.meta.llama3-1-8b-instruct-v1:0`, `us.meta.llama3-2-11b-instruct-v1:0`, `us.meta.llama3-2-1b-instruct-v1:0`, `us.meta.llama3-2-3b-instruct-v1:0`, `us.meta.llama3-2-90b-instruct-v1:0`, `zai-org/GLM-4.5-Air-FP8`, `zai-org/GLM-5`, `zai-org/GLM-5.1`
  </Expandable>
</ParamField>

<ParamField path="conditions" type="list[str]" default="[]" />

<ParamField path="input_query" type="str" required>
  Specify the message that the AI router will classify
</ParamField>

<ParamField path="outputs" type="dict" default="{}" />

<ParamField path="shared_memory" type="str" default="''">
  The shared memory that will be used as context for AI to determine the routing
</ParamField>

<ParamField path="sampling" type="SamplingConfig" />

<ParamField path="max_tokens" type="int">
  The maximum number of tokens to generate
</ParamField>

<ParamField path="temperature" type="float">
  The temperature of the model
</ParamField>

<ParamField path="top_p" type="float">
  The top-p value
</ParamField>

<a id="code_execution" />

## `code_execution` — Code Execution

Execute code in the language of your choice.

<Info>Platform docs: [Code Execution](/nodes/code/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").code_execution(code="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="code" type="str" required />

<ParamField path="function_name" type="str" default="'main'" />

<ParamField path="input_schema" type="ListType | list[NameTypeValueAny]" default="[]" />

<ParamField path="language" type="int" default="0" />

<ParamField path="output_schema" type="ListType | list[NameType]" default="[]" />

<ParamField path="processed_inputs" type="dict" default="{}" />

<ParamField path="processed_outputs" type="dict" default="{}" />

<a id="code_interpreter" />

## `code_interpreter` — Code Interpreter

Execute Python code in a sandboxed environment with file I/O support. Supports spreadsheet analysis, data visualization, and generating artifacts. To read or edit uploaded files, pass them in the files input as an actual array of file references; those files are mounted at /work/inputs/\{filename} (curly braces shown for clarity; replace with the exact filename). Continued sessions restore prior inputs and generated files, so work can resume even if Python memory reset. Save output files to /work/outputs/ to have them collected as artifacts; call save\_file(...) for durable/versioned user-visible files. Example: files=\["\$history.69dd11a49033ae4d8e65ab33"] and pd.read\_csv('/work/inputs/data.csv'); plt.savefig('/work/outputs/chart.png'). You will see stdout and stderr outputs after each execution step. Include an existing session id to keep executing code within the same session.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").code_interpreter(code="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="code" type="str" required />

<ParamField path="files" type="AcceptsFileList" default="[]" />

<a id="condition" />

## `condition` — Condition

<Info>Platform docs: [Condition](/nodes/condition/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").condition()
  ```
</CodeGroup>

**Parameters**

<ParamField path="conditions" type="list[ConditionGroup]" />

<ParamField path="paths" type="list[str]" />

<ParamField path="outputs" type="dict" />

<a id="convert_type" />

## `convert_type` — Convert Type

Convert value from source type to target type.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").convert_type(source_type="string", value="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="target_type" type="str" default="'int32'">
  The type to convert the value to.
  One of: `bool`, `float`, `int32`, `timestamp`
</ParamField>

<ParamField path="source_type" type="str" required>
  The type of the value to convert.
  One of: `string`
</ParamField>

<ParamField path="value" type="str" required>
  The value to convert
</ParamField>

<a id="custom_group" />

## `custom_group` — Group multiple nodes together

Group multiple nodes together

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").custom_group()
  ```
</CodeGroup>

<a id="merge" />

## `merge` — Merge

Recombine paths created by a condition node. Note: if you are not using a condition node, you shouldn’t use a merge node

<Info>Platform docs: [Merge](/nodes/merge-pick-first/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").merge(fields=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="function" type="str" default="'first'">
  The function to apply to the input fields
  One of: `first`, `join`
</ParamField>

<ParamField path="type" type="str" default="'string'">
  The expected type of the input and output fields

  <Expandable title="Allowed values">
    `agent`, `any`, `audio`, `bool`, `dataframe`, `file`, `float`, `image`, `int32`, `json`, `knowledge_base`, `path`, `string`, `timestamp`, `vec&lt;file&gt;`, `vec&lt;string&gt;`
  </Expandable>
</ParamField>

<ParamField path="fields" type="ListType | list[Any]" required />

<a id="nl_to_sql" />

## `nl_to_sql` — NL To SQL

Convert natural language queries to SQL queries.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").nl_to_sql(text="...", db_dialect="MySQL", schema="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="model" type="str" default="'gpt-4o'" />

<ParamField path="text" type="str" required />

<ParamField path="db_dialect" type="str" required>
  One of: `MySQL`, `PostgreSQL`, `SQLite3`, `Snowflake`
</ParamField>

<ParamField path="schema" type="str" required />

<a id="set_variable" />

## `set_variable` — Set Variable

Set a variable to a new value

<Info>Platform docs: [Set Variable](/nodes/set-variable/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").set_variable(variable_set=..., scope="...", variable_id="...", value="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="variable_set" type="AcceptsVariableSet" required />

<ParamField path="scope" type="str" required />

<ParamField path="variable_id" type="str" required />

<ParamField path="value" type="str" required />

<a id="time" />

## `time` — Time

Outputs the current time (often connected to LLM node)

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").time()
  ```
</CodeGroup>

**Parameters**

<ParamField path="delta_time_unit" type="str" default="'Seconds'">
  One of: `days`, `hours`, `minutes`, `seconds`, `weeks`
</ParamField>

<ParamField path="delta_value" type="int" default="0" />

<ParamField path="is_positive" type="str" default="'+'">
  One of: `+`, `-`
</ParamField>

<ParamField path="is_positive_delta" type="bool" default="True" />

<ParamField path="output_format" type="str" default="'MM/DD/YYYY'">
  One of: `MM-DD-YYYY / HH:MM:SS`, `MM/DD/YYYY`, `Timestamp`
</ParamField>

<ParamField path="time_node_zone" type="str" default="'America/New_York'">
  <Expandable title="Allowed values">
    `Africa/Abidjan`, `Africa/Accra`, `Africa/Addis_Ababa`, `Africa/Algiers`, `Africa/Asmara`, `Africa/Asmera`, `Africa/Bamako`, `Africa/Bangui`, `Africa/Banjul`, `Africa/Bissau`, `Africa/Blantyre`, `Africa/Brazzaville`, `Africa/Bujumbura`, `Africa/Cairo`, `Africa/Casablanca`, `Africa/Ceuta`, `Africa/Conakry`, `Africa/Dakar`, `Africa/Dar_es_Salaam`, `Africa/Djibouti`, `Africa/Douala`, `Africa/El_Aaiun`, `Africa/Freetown`, `Africa/Gaborone`, `Africa/Harare`, `Africa/Johannesburg`, `Africa/Juba`, `Africa/Kampala`, `Africa/Khartoum`, `Africa/Kigali`, `Africa/Kinshasa`, `Africa/Lagos`, `Africa/Libreville`, `Africa/Lome`, `Africa/Luanda`, `Africa/Lubumbashi`, `Africa/Lusaka`, `Africa/Malabo`, `Africa/Maputo`, `Africa/Maseru`, `Africa/Mbabane`, `Africa/Mogadishu`, `Africa/Monrovia`, `Africa/Nairobi`, `Africa/Ndjamena`, `Africa/Niamey`, `Africa/Nouakchott`, `Africa/Ouagadougou`, `Africa/Porto-Novo`, `Africa/Sao_Tome`, `Africa/Timbuktu`, `Africa/Tripoli`, `Africa/Tunis`, `Africa/Windhoek`, `America/Adak`, `America/Anchorage`, `America/Anguilla`, `America/Antigua`, `America/Araguaina`, `America/Argentina/Buenos_Aires`, `America/Argentina/Catamarca`, `America/Argentina/ComodRivadavia`, `America/Argentina/Cordoba`, `America/Argentina/Jujuy`, `America/Argentina/La_Rioja`, `America/Argentina/Mendoza`, `America/Argentina/Rio_Gallegos`, `America/Argentina/Salta`, `America/Argentina/San_Juan`, `America/Argentina/San_Luis`, `America/Argentina/Tucuman`, `America/Argentina/Ushuaia`, `America/Aruba`, `America/Asuncion`, `America/Atikokan`, `America/Atka`, `America/Bahia`, `America/Bahia_Banderas`, `America/Barbados`, `America/Belem`, `America/Belize`, `America/Blanc-Sablon`, `America/Boa_Vista`, `America/Bogota`, `America/Boise`, `America/Buenos_Aires`, `America/Cambridge_Bay`, `America/Campo_Grande`, `America/Cancun`, `America/Caracas`, `America/Catamarca`, `America/Cayenne`, `America/Cayman`, `America/Chicago`, `America/Chihuahua`, `America/Ciudad_Juarez`, `America/Coral_Harbour`, `America/Cordoba`, `America/Costa_Rica`, `America/Creston`, `America/Cuiaba`, `America/Curacao`, `America/Danmarkshavn`, `America/Dawson`, `America/Dawson_Creek`, `America/Denver`, `America/Detroit`, `America/Dominica`, `America/Edmonton`, `America/Eirunepe`, `America/El_Salvador`, `America/Ensenada`, `America/Fort_Nelson`, `America/Fort_Wayne`, `America/Fortaleza`, `America/Glace_Bay`, `America/Godthab`, `America/Goose_Bay`, `America/Grand_Turk`, `America/Grenada`, `America/Guadeloupe`, `America/Guatemala`, `America/Guayaquil`, `America/Guyana`, `America/Halifax`, `America/Havana`, `America/Hermosillo`, `America/Indiana/Indianapolis`, `America/Indiana/Knox`, `America/Indiana/Marengo`, `America/Indiana/Petersburg`, `America/Indiana/Tell_City`, `America/Indiana/Vevay`, `America/Indiana/Vincennes`, `America/Indiana/Winamac`, `America/Indianapolis`, `America/Inuvik`, `America/Iqaluit`, `America/Jamaica`, `America/Jujuy`, `America/Juneau`, `America/Kentucky/Louisville`, `America/Kentucky/Monticello`, `America/Knox_IN`, `America/Kralendijk`, `America/La_Paz`, `America/Lima`, `America/Los_Angeles`, `America/Louisville`, `America/Lower_Princes`, `America/Maceio`, `America/Managua`, `America/Manaus`, `America/Marigot`, `America/Martinique`, `America/Matamoros`, `America/Mazatlan`, `America/Mendoza`, `America/Menominee`, `America/Merida`, `America/Metlakatla`, `America/Mexico_City`, `America/Miquelon`, `America/Moncton`, `America/Monterrey`, `America/Montevideo`, `America/Montreal`, `America/Montserrat`, `America/Nassau`, `America/New_York`, `America/Nipigon`, `America/Nome`, `America/Noronha`, `America/North_Dakota/Beulah`, `America/North_Dakota/Center`, `America/North_Dakota/New_Salem`, `America/Nuuk`, `America/Ojinaga`, `America/Panama`, `America/Pangnirtung`, `America/Paramaribo`, `America/Phoenix`, `America/Port-au-Prince`, `America/Port_of_Spain`, `America/Porto_Acre`, `America/Porto_Velho`, `America/Puerto_Rico`, `America/Punta_Arenas`, `America/Rainy_River`, `America/Rankin_Inlet`, `America/Recife`, `America/Regina`, `America/Resolute`, `America/Rio_Branco`, `America/Rosario`, `America/Santa_Isabel`, `America/Santarem`, `America/Santiago`, `America/Santo_Domingo`, `America/Sao_Paulo`, `America/Scoresbysund`, `America/Shiprock`, `America/Sitka`, `America/St_Barthelemy`, `America/St_Johns`, `America/St_Kitts`, `America/St_Lucia`, `America/St_Thomas`, `America/St_Vincent`, `America/Swift_Current`, `America/Tegucigalpa`, `America/Thule`, `America/Thunder_Bay`, `America/Tijuana`, `America/Toronto`, `America/Tortola`, `America/Vancouver`, `America/Virgin`, `America/Whitehorse`, `America/Winnipeg`, `America/Yakutat`, `America/Yellowknife`, `Antarctica/Casey`, `Antarctica/Davis`, `Antarctica/DumontDUrville`, `Antarctica/Macquarie`, `Antarctica/Mawson`, `Antarctica/McMurdo`, `Antarctica/Palmer`, `Antarctica/Rothera`, `Antarctica/South_Pole`, `Antarctica/Syowa`, `Antarctica/Troll`, `Antarctica/Vostok`, `Arctic/Longyearbyen`, `Asia/Aden`, `Asia/Almaty`, `Asia/Amman`, `Asia/Anadyr`, `Asia/Aqtau`, `Asia/Aqtobe`, `Asia/Ashgabat`, `Asia/Ashkhabad`, `Asia/Atyrau`, `Asia/Baghdad`, `Asia/Bahrain`, `Asia/Baku`, `Asia/Bangkok`, `Asia/Barnaul`, `Asia/Beirut`, `Asia/Bishkek`, `Asia/Brunei`, `Asia/Calcutta`, `Asia/Chita`, `Asia/Choibalsan`, `Asia/Chongqing`, `Asia/Chungking`, `Asia/Colombo`, `Asia/Dacca`, `Asia/Damascus`, `Asia/Dhaka`, `Asia/Dili`, `Asia/Dubai`, `Asia/Dushanbe`, `Asia/Famagusta`, `Asia/Gaza`, `Asia/Harbin`, `Asia/Hebron`, `Asia/Ho_Chi_Minh`, `Asia/Hong_Kong`, `Asia/Hovd`, `Asia/Irkutsk`, `Asia/Istanbul`, `Asia/Jakarta`, `Asia/Jayapura`, `Asia/Jerusalem`, `Asia/Kabul`, `Asia/Kamchatka`, `Asia/Karachi`, `Asia/Kashgar`, `Asia/Kathmandu`, `Asia/Katmandu`, `Asia/Khandyga`, `Asia/Kolkata`, `Asia/Krasnoyarsk`, `Asia/Kuala_Lumpur`, `Asia/Kuching`, `Asia/Kuwait`, `Asia/Macao`, `Asia/Macau`, `Asia/Magadan`, `Asia/Makassar`, `Asia/Manila`, `Asia/Muscat`, `Asia/Nicosia`, `Asia/Novokuznetsk`, `Asia/Novosibirsk`, `Asia/Omsk`, `Asia/Oral`, `Asia/Phnom_Penh`, `Asia/Pontianak`, `Asia/Pyongyang`, `Asia/Qatar`, `Asia/Qostanay`, `Asia/Qyzylorda`, `Asia/Rangoon`, `Asia/Riyadh`, `Asia/Saigon`, `Asia/Sakhalin`, `Asia/Samarkand`, `Asia/Seoul`, `Asia/Shanghai`, `Asia/Singapore`, `Asia/Srednekolymsk`, `Asia/Taipei`, `Asia/Tashkent`, `Asia/Tbilisi`, `Asia/Tehran`, `Asia/Tel_Aviv`, `Asia/Thimbu`, `Asia/Thimphu`, `Asia/Tokyo`, `Asia/Tomsk`, `Asia/Ujung_Pandang`, `Asia/Ulaanbaatar`, `Asia/Ulan_Bator`, `Asia/Urumqi`, `Asia/Ust-Nera`, `Asia/Vientiane`, `Asia/Vladivostok`, `Asia/Yakutsk`, `Asia/Yangon`, `Asia/Yekaterinburg`, `Asia/Yerevan`, `Atlantic/Azores`, `Atlantic/Bermuda`, `Atlantic/Canary`, `Atlantic/Cape_Verde`, `Atlantic/Faeroe`, `Atlantic/Faroe`, `Atlantic/Jan_Mayen`, `Atlantic/Madeira`, `Atlantic/Reykjavik`, `Atlantic/South_Georgia`, `Atlantic/St_Helena`, `Atlantic/Stanley`, `Australia/ACT`, `Australia/Adelaide`, `Australia/Brisbane`, `Australia/Broken_Hill`, `Australia/Canberra`, `Australia/Currie`, `Australia/Darwin`, `Australia/Eucla`, `Australia/Hobart`, `Australia/LHI`, `Australia/Lindeman`, `Australia/Lord_Howe`, `Australia/Melbourne`, `Australia/NSW`, `Australia/North`, `Australia/Perth`, `Australia/Queensland`, `Australia/South`, `Australia/Sydney`, `Australia/Tasmania`, `Australia/Victoria`, `Australia/West`, `Australia/Yancowinna`, `Brazil/Acre`, `Brazil/DeNoronha`, `Brazil/East`, `Brazil/West`, `CET`, `CST6CDT`, `Canada/Atlantic`, `Canada/Central`, `Canada/Eastern`, `Canada/Mountain`, `Canada/Newfoundland`, `Canada/Pacific`, `Canada/Saskatchewan`, `Canada/Yukon`, `Chile/Continental`, `Chile/EasterIsland`, `Cuba`, `EET`, `EST`, `EST5EDT`, `Egypt`, `Eire`, `Etc/GMT`, `Etc/GMT+0`, `Etc/GMT+1`, `Etc/GMT+10`, `Etc/GMT+11`, `Etc/GMT+12`, `Etc/GMT+2`, `Etc/GMT+3`, `Etc/GMT+4`, `Etc/GMT+5`, `Etc/GMT+6`, `Etc/GMT+7`, `Etc/GMT+8`, `Etc/GMT+9`, `Etc/GMT-0`, `Etc/GMT-1`, `Etc/GMT-10`, `Etc/GMT-11`, `Etc/GMT-12`, `Etc/GMT-13`, `Etc/GMT-14`, `Etc/GMT-2`, `Etc/GMT-3`, `Etc/GMT-4`, `Etc/GMT-5`, `Etc/GMT-6`, `Etc/GMT-7`, `Etc/GMT-8`, `Etc/GMT-9`, `Etc/GMT0`, `Etc/Greenwich`, `Etc/UCT`, `Etc/UTC`, `Etc/Universal`, `Etc/Zulu`, `Europe/Amsterdam`, `Europe/Andorra`, `Europe/Astrakhan`, `Europe/Athens`, `Europe/Belfast`, `Europe/Belgrade`, `Europe/Berlin`, `Europe/Bratislava`, `Europe/Brussels`, `Europe/Bucharest`, `Europe/Budapest`, `Europe/Busingen`, `Europe/Chisinau`, `Europe/Copenhagen`, `Europe/Dublin`, `Europe/Gibraltar`, `Europe/Guernsey`, `Europe/Helsinki`, `Europe/Isle_of_Man`, `Europe/Istanbul`, `Europe/Jersey`, `Europe/Kaliningrad`, `Europe/Kiev`, `Europe/Kirov`, `Europe/Kyiv`, `Europe/Lisbon`, `Europe/Ljubljana`, `Europe/London`, `Europe/Luxembourg`, `Europe/Madrid`, `Europe/Malta`, `Europe/Mariehamn`, `Europe/Minsk`, `Europe/Monaco`, `Europe/Moscow`, `Europe/Nicosia`, `Europe/Oslo`, `Europe/Paris`, `Europe/Podgorica`, `Europe/Prague`, `Europe/Riga`, `Europe/Rome`, `Europe/Samara`, `Europe/San_Marino`, `Europe/Sarajevo`, `Europe/Saratov`, `Europe/Simferopol`, `Europe/Skopje`, `Europe/Sofia`, `Europe/Stockholm`, `Europe/Tallinn`, `Europe/Tirane`, `Europe/Tiraspol`, `Europe/Ulyanovsk`, `Europe/Uzhgorod`, `Europe/Vaduz`, `Europe/Vatican`, `Europe/Vienna`, `Europe/Vilnius`, `Europe/Volgograd`, `Europe/Warsaw`, `Europe/Zagreb`, `Europe/Zaporozhye`, `Europe/Zurich`, `GB`, `GB-Eire`, `GMT`, `GMT+0`, `GMT-0`, `GMT0`, `Greenwich`, `HST`, `Hongkong`, `Iceland`, `Indian/Antananarivo`, `Indian/Chagos`, `Indian/Christmas`, `Indian/Cocos`, `Indian/Comoro`, `Indian/Kerguelen`, `Indian/Mahe`, `Indian/Maldives`, `Indian/Mauritius`, `Indian/Mayotte`, `Indian/Reunion`, `Iran`, `Israel`, `Jamaica`, `Japan`, `Kwajalein`, `Libya`, `MET`, `MST`, `MST7MDT`, `Mexico/BajaNorte`, `Mexico/BajaSur`, `Mexico/General`, `NZ`, `NZ-CHAT`, `Navajo`, `PRC`, `PST8PDT`, `Pacific/Apia`, `Pacific/Auckland`, `Pacific/Bougainville`, `Pacific/Chatham`, `Pacific/Chuuk`, `Pacific/Easter`, `Pacific/Efate`, `Pacific/Enderbury`, `Pacific/Fakaofo`, `Pacific/Fiji`, `Pacific/Funafuti`, `Pacific/Galapagos`, `Pacific/Gambier`, `Pacific/Guadalcanal`, `Pacific/Guam`, `Pacific/Honolulu`, `Pacific/Johnston`, `Pacific/Kanton`, `Pacific/Kiritimati`, `Pacific/Kosrae`, `Pacific/Kwajalein`, `Pacific/Majuro`, `Pacific/Marquesas`, `Pacific/Midway`, `Pacific/Nauru`, `Pacific/Niue`, `Pacific/Norfolk`, `Pacific/Noumea`, `Pacific/Pago_Pago`, `Pacific/Palau`, `Pacific/Pitcairn`, `Pacific/Pohnpei`, `Pacific/Ponape`, `Pacific/Port_Moresby`, `Pacific/Rarotonga`, `Pacific/Saipan`, `Pacific/Samoa`, `Pacific/Tahiti`, `Pacific/Tarawa`, `Pacific/Tongatapu`, `Pacific/Truk`, `Pacific/Wake`, `Pacific/Wallis`, `Pacific/Yap`, `Poland`, `Portugal`, `ROC`, `ROK`, `Singapore`, `Turkey`, `UCT`, `US/Alaska`, `US/Aleutian`, `US/Arizona`, `US/Central`, `US/East-Indiana`, `US/Eastern`, `US/Hawaii`, `US/Indiana-Starke`, `US/Michigan`, `US/Mountain`, `US/Pacific`, `US/Samoa`, `UTC`, `Universal`, `W-SU`, `WET`, `Zulu`
  </Expandable>
</ParamField>

<ParamField path="use_delta" type="bool" default="False" />

<a id="wait_node" />

## `wait_node` — Wait Node

Pause Pipeline execution for a specified duration

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").wait_node(wait_time=0, wait_time_type="micros")
  ```
</CodeGroup>

**Parameters**

<ParamField path="wait_time" type="int" required />

<ParamField path="wait_time_type" type="str" required>
  One of: `micros`, `milliseconds`, `nanos`, `seconds`
</ParamField>
