> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Triggers nodes

> Event triggers that start a pipeline.

Add these nodes with the pipeline builder: `pipeline.add(name="...").<node>(...)`. Each entry lists the node's configuration parameters. See the [Pipeline reference](/sdk/pipeline/reference) for `add`, `run`, and lifecycle methods.

<a id="trigger" />

## `trigger` — Trigger

Run the Pipeline when "something" happens (e.g., new email comes into your inbox).

<Info>Platform docs: [Trigger](/nodes/trigger/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").trigger()
  ```
</CodeGroup>

**Parameters**

<ParamField path="sub_type" type="str" default="''" />

<a id="trigger_airtable" />

## `trigger_airtable` — Airtable Trigger

Airtable Trigger

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").trigger_airtable(integration=..., item_id="...", trigger_enabled=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="event" type="str" default="''">
  One of: `new_row`, `updated_row`
</ParamField>

<ParamField path="integration" type="AcceptsIntegration" required />

<ParamField path="item_id" type="str" required>
  Select the table to watch for new rows
</ParamField>

<ParamField path="trigger_enabled" type="bool" required>
  Enable/Disable Automation
</ParamField>

<a id="trigger_cron" />

## `trigger_cron` — Cron Trigger

Cron Trigger

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").trigger_cron(integration=..., item_id="...", trigger_enabled=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="event" type="str" default="'custom'">
  One of: `custom`, `daily`, `monthly`, `weekly`
</ParamField>

<ParamField path="integration" type="AcceptsIntegration" required />

<ParamField path="item_id" type="str" required>
  Custom cron expression
</ParamField>

<ParamField path="timezone" type="str" default="'UTC'">
  Timezone for the cron trigger

  <Expandable title="Allowed values">
    `Africa/Abidjan`, `Africa/Accra`, `Africa/Addis_Ababa`, `Africa/Algiers`, `Africa/Asmara`, `Africa/Asmera`, `Africa/Bamako`, `Africa/Bangui`, `Africa/Banjul`, `Africa/Bissau`, `Africa/Blantyre`, `Africa/Brazzaville`, `Africa/Bujumbura`, `Africa/Cairo`, `Africa/Casablanca`, `Africa/Ceuta`, `Africa/Conakry`, `Africa/Dakar`, `Africa/Dar_es_Salaam`, `Africa/Djibouti`, `Africa/Douala`, `Africa/El_Aaiun`, `Africa/Freetown`, `Africa/Gaborone`, `Africa/Harare`, `Africa/Johannesburg`, `Africa/Juba`, `Africa/Kampala`, `Africa/Khartoum`, `Africa/Kigali`, `Africa/Kinshasa`, `Africa/Lagos`, `Africa/Libreville`, `Africa/Lome`, `Africa/Luanda`, `Africa/Lubumbashi`, `Africa/Lusaka`, `Africa/Malabo`, `Africa/Maputo`, `Africa/Maseru`, `Africa/Mbabane`, `Africa/Mogadishu`, `Africa/Monrovia`, `Africa/Nairobi`, `Africa/Ndjamena`, `Africa/Niamey`, `Africa/Nouakchott`, `Africa/Ouagadougou`, `Africa/Porto-Novo`, `Africa/Sao_Tome`, `Africa/Timbuktu`, `Africa/Tripoli`, `Africa/Tunis`, `Africa/Windhoek`, `America/Adak`, `America/Anchorage`, `America/Anguilla`, `America/Antigua`, `America/Araguaina`, `America/Argentina/Buenos_Aires`, `America/Argentina/Catamarca`, `America/Argentina/ComodRivadavia`, `America/Argentina/Cordoba`, `America/Argentina/Jujuy`, `America/Argentina/La_Rioja`, `America/Argentina/Mendoza`, `America/Argentina/Rio_Gallegos`, `America/Argentina/Salta`, `America/Argentina/San_Juan`, `America/Argentina/San_Luis`, `America/Argentina/Tucuman`, `America/Argentina/Ushuaia`, `America/Aruba`, `America/Asuncion`, `America/Atikokan`, `America/Atka`, `America/Bahia`, `America/Bahia_Banderas`, `America/Barbados`, `America/Belem`, `America/Belize`, `America/Blanc-Sablon`, `America/Boa_Vista`, `America/Bogota`, `America/Boise`, `America/Buenos_Aires`, `America/Cambridge_Bay`, `America/Campo_Grande`, `America/Cancun`, `America/Caracas`, `America/Catamarca`, `America/Cayenne`, `America/Cayman`, `America/Chicago`, `America/Chihuahua`, `America/Ciudad_Juarez`, `America/Coral_Harbour`, `America/Cordoba`, `America/Costa_Rica`, `America/Creston`, `America/Cuiaba`, `America/Curacao`, `America/Danmarkshavn`, `America/Dawson`, `America/Dawson_Creek`, `America/Denver`, `America/Detroit`, `America/Dominica`, `America/Edmonton`, `America/Eirunepe`, `America/El_Salvador`, `America/Ensenada`, `America/Fort_Nelson`, `America/Fort_Wayne`, `America/Fortaleza`, `America/Glace_Bay`, `America/Godthab`, `America/Goose_Bay`, `America/Grand_Turk`, `America/Grenada`, `America/Guadeloupe`, `America/Guatemala`, `America/Guayaquil`, `America/Guyana`, `America/Halifax`, `America/Havana`, `America/Hermosillo`, `America/Indiana/Indianapolis`, `America/Indiana/Knox`, `America/Indiana/Marengo`, `America/Indiana/Petersburg`, `America/Indiana/Tell_City`, `America/Indiana/Vevay`, `America/Indiana/Vincennes`, `America/Indiana/Winamac`, `America/Indianapolis`, `America/Inuvik`, `America/Iqaluit`, `America/Jamaica`, `America/Jujuy`, `America/Juneau`, `America/Kentucky/Louisville`, `America/Kentucky/Monticello`, `America/Knox_IN`, `America/Kralendijk`, `America/La_Paz`, `America/Lima`, `America/Los_Angeles`, `America/Louisville`, `America/Lower_Princes`, `America/Maceio`, `America/Managua`, `America/Manaus`, `America/Marigot`, `America/Martinique`, `America/Matamoros`, `America/Mazatlan`, `America/Mendoza`, `America/Menominee`, `America/Merida`, `America/Metlakatla`, `America/Mexico_City`, `America/Miquelon`, `America/Moncton`, `America/Monterrey`, `America/Montevideo`, `America/Montreal`, `America/Montserrat`, `America/Nassau`, `America/New_York`, `America/Nipigon`, `America/Nome`, `America/Noronha`, `America/North_Dakota/Beulah`, `America/North_Dakota/Center`, `America/North_Dakota/New_Salem`, `America/Nuuk`, `America/Ojinaga`, `America/Panama`, `America/Pangnirtung`, `America/Paramaribo`, `America/Phoenix`, `America/Port-au-Prince`, `America/Port_of_Spain`, `America/Porto_Acre`, `America/Porto_Velho`, `America/Puerto_Rico`, `America/Punta_Arenas`, `America/Rainy_River`, `America/Rankin_Inlet`, `America/Recife`, `America/Regina`, `America/Resolute`, `America/Rio_Branco`, `America/Rosario`, `America/Santa_Isabel`, `America/Santarem`, `America/Santiago`, `America/Santo_Domingo`, `America/Sao_Paulo`, `America/Scoresbysund`, `America/Shiprock`, `America/Sitka`, `America/St_Barthelemy`, `America/St_Johns`, `America/St_Kitts`, `America/St_Lucia`, `America/St_Thomas`, `America/St_Vincent`, `America/Swift_Current`, `America/Tegucigalpa`, `America/Thule`, `America/Thunder_Bay`, `America/Tijuana`, `America/Toronto`, `America/Tortola`, `America/Vancouver`, `America/Virgin`, `America/Whitehorse`, `America/Winnipeg`, `America/Yakutat`, `America/Yellowknife`, `Antarctica/Casey`, `Antarctica/Davis`, `Antarctica/DumontDUrville`, `Antarctica/Macquarie`, `Antarctica/Mawson`, `Antarctica/McMurdo`, `Antarctica/Palmer`, `Antarctica/Rothera`, `Antarctica/South_Pole`, `Antarctica/Syowa`, `Antarctica/Troll`, `Antarctica/Vostok`, `Arctic/Longyearbyen`, `Asia/Aden`, `Asia/Almaty`, `Asia/Amman`, `Asia/Anadyr`, `Asia/Aqtau`, `Asia/Aqtobe`, `Asia/Ashgabat`, `Asia/Ashkhabad`, `Asia/Atyrau`, `Asia/Baghdad`, `Asia/Bahrain`, `Asia/Baku`, `Asia/Bangkok`, `Asia/Barnaul`, `Asia/Beirut`, `Asia/Bishkek`, `Asia/Brunei`, `Asia/Calcutta`, `Asia/Chita`, `Asia/Choibalsan`, `Asia/Chongqing`, `Asia/Chungking`, `Asia/Colombo`, `Asia/Dacca`, `Asia/Damascus`, `Asia/Dhaka`, `Asia/Dili`, `Asia/Dubai`, `Asia/Dushanbe`, `Asia/Famagusta`, `Asia/Gaza`, `Asia/Harbin`, `Asia/Hebron`, `Asia/Ho_Chi_Minh`, `Asia/Hong_Kong`, `Asia/Hovd`, `Asia/Irkutsk`, `Asia/Istanbul`, `Asia/Jakarta`, `Asia/Jayapura`, `Asia/Jerusalem`, `Asia/Kabul`, `Asia/Kamchatka`, `Asia/Karachi`, `Asia/Kashgar`, `Asia/Kathmandu`, `Asia/Katmandu`, `Asia/Khandyga`, `Asia/Kolkata`, `Asia/Krasnoyarsk`, `Asia/Kuala_Lumpur`, `Asia/Kuching`, `Asia/Kuwait`, `Asia/Macao`, `Asia/Macau`, `Asia/Magadan`, `Asia/Makassar`, `Asia/Manila`, `Asia/Muscat`, `Asia/Nicosia`, `Asia/Novokuznetsk`, `Asia/Novosibirsk`, `Asia/Omsk`, `Asia/Oral`, `Asia/Phnom_Penh`, `Asia/Pontianak`, `Asia/Pyongyang`, `Asia/Qatar`, `Asia/Qostanay`, `Asia/Qyzylorda`, `Asia/Rangoon`, `Asia/Riyadh`, `Asia/Saigon`, `Asia/Sakhalin`, `Asia/Samarkand`, `Asia/Seoul`, `Asia/Shanghai`, `Asia/Singapore`, `Asia/Srednekolymsk`, `Asia/Taipei`, `Asia/Tashkent`, `Asia/Tbilisi`, `Asia/Tehran`, `Asia/Tel_Aviv`, `Asia/Thimbu`, `Asia/Thimphu`, `Asia/Tokyo`, `Asia/Tomsk`, `Asia/Ujung_Pandang`, `Asia/Ulaanbaatar`, `Asia/Ulan_Bator`, `Asia/Urumqi`, `Asia/Ust-Nera`, `Asia/Vientiane`, `Asia/Vladivostok`, `Asia/Yakutsk`, `Asia/Yangon`, `Asia/Yekaterinburg`, `Asia/Yerevan`, `Atlantic/Azores`, `Atlantic/Bermuda`, `Atlantic/Canary`, `Atlantic/Cape_Verde`, `Atlantic/Faeroe`, `Atlantic/Faroe`, `Atlantic/Jan_Mayen`, `Atlantic/Madeira`, `Atlantic/Reykjavik`, `Atlantic/South_Georgia`, `Atlantic/St_Helena`, `Atlantic/Stanley`, `Australia/ACT`, `Australia/Adelaide`, `Australia/Brisbane`, `Australia/Broken_Hill`, `Australia/Canberra`, `Australia/Currie`, `Australia/Darwin`, `Australia/Eucla`, `Australia/Hobart`, `Australia/LHI`, `Australia/Lindeman`, `Australia/Lord_Howe`, `Australia/Melbourne`, `Australia/NSW`, `Australia/North`, `Australia/Perth`, `Australia/Queensland`, `Australia/South`, `Australia/Sydney`, `Australia/Tasmania`, `Australia/Victoria`, `Australia/West`, `Australia/Yancowinna`, `Brazil/Acre`, `Brazil/DeNoronha`, `Brazil/East`, `Brazil/West`, `CET`, `CST6CDT`, `Canada/Atlantic`, `Canada/Central`, `Canada/Eastern`, `Canada/Mountain`, `Canada/Newfoundland`, `Canada/Pacific`, `Canada/Saskatchewan`, `Canada/Yukon`, `Chile/Continental`, `Chile/EasterIsland`, `Cuba`, `EET`, `EST`, `EST5EDT`, `Egypt`, `Eire`, `Etc/GMT`, `Etc/GMT+0`, `Etc/GMT+1`, `Etc/GMT+10`, `Etc/GMT+11`, `Etc/GMT+12`, `Etc/GMT+2`, `Etc/GMT+3`, `Etc/GMT+4`, `Etc/GMT+5`, `Etc/GMT+6`, `Etc/GMT+7`, `Etc/GMT+8`, `Etc/GMT+9`, `Etc/GMT-0`, `Etc/GMT-1`, `Etc/GMT-10`, `Etc/GMT-11`, `Etc/GMT-12`, `Etc/GMT-13`, `Etc/GMT-14`, `Etc/GMT-2`, `Etc/GMT-3`, `Etc/GMT-4`, `Etc/GMT-5`, `Etc/GMT-6`, `Etc/GMT-7`, `Etc/GMT-8`, `Etc/GMT-9`, `Etc/GMT0`, `Etc/Greenwich`, `Etc/UCT`, `Etc/UTC`, `Etc/Universal`, `Etc/Zulu`, `Europe/Amsterdam`, `Europe/Andorra`, `Europe/Astrakhan`, `Europe/Athens`, `Europe/Belfast`, `Europe/Belgrade`, `Europe/Berlin`, `Europe/Bratislava`, `Europe/Brussels`, `Europe/Bucharest`, `Europe/Budapest`, `Europe/Busingen`, `Europe/Chisinau`, `Europe/Copenhagen`, `Europe/Dublin`, `Europe/Gibraltar`, `Europe/Guernsey`, `Europe/Helsinki`, `Europe/Isle_of_Man`, `Europe/Istanbul`, `Europe/Jersey`, `Europe/Kaliningrad`, `Europe/Kiev`, `Europe/Kirov`, `Europe/Kyiv`, `Europe/Lisbon`, `Europe/Ljubljana`, `Europe/London`, `Europe/Luxembourg`, `Europe/Madrid`, `Europe/Malta`, `Europe/Mariehamn`, `Europe/Minsk`, `Europe/Monaco`, `Europe/Moscow`, `Europe/Nicosia`, `Europe/Oslo`, `Europe/Paris`, `Europe/Podgorica`, `Europe/Prague`, `Europe/Riga`, `Europe/Rome`, `Europe/Samara`, `Europe/San_Marino`, `Europe/Sarajevo`, `Europe/Saratov`, `Europe/Simferopol`, `Europe/Skopje`, `Europe/Sofia`, `Europe/Stockholm`, `Europe/Tallinn`, `Europe/Tirane`, `Europe/Tiraspol`, `Europe/Ulyanovsk`, `Europe/Uzhgorod`, `Europe/Vaduz`, `Europe/Vatican`, `Europe/Vienna`, `Europe/Vilnius`, `Europe/Volgograd`, `Europe/Warsaw`, `Europe/Zagreb`, `Europe/Zaporozhye`, `Europe/Zurich`, `GB`, `GB-Eire`, `GMT`, `GMT+0`, `GMT-0`, `GMT0`, `Greenwich`, `HST`, `Hongkong`, `Iceland`, `Indian/Antananarivo`, `Indian/Chagos`, `Indian/Christmas`, `Indian/Cocos`, `Indian/Comoro`, `Indian/Kerguelen`, `Indian/Mahe`, `Indian/Maldives`, `Indian/Mauritius`, `Indian/Mayotte`, `Indian/Reunion`, `Iran`, `Israel`, `Jamaica`, `Japan`, `Kwajalein`, `Libya`, `MET`, `MST`, `MST7MDT`, `Mexico/BajaNorte`, `Mexico/BajaSur`, `Mexico/General`, `NZ`, `NZ-CHAT`, `Navajo`, `PRC`, `PST8PDT`, `Pacific/Apia`, `Pacific/Auckland`, `Pacific/Bougainville`, `Pacific/Chatham`, `Pacific/Chuuk`, `Pacific/Easter`, `Pacific/Efate`, `Pacific/Enderbury`, `Pacific/Fakaofo`, `Pacific/Fiji`, `Pacific/Funafuti`, `Pacific/Galapagos`, `Pacific/Gambier`, `Pacific/Guadalcanal`, `Pacific/Guam`, `Pacific/Honolulu`, `Pacific/Johnston`, `Pacific/Kanton`, `Pacific/Kiritimati`, `Pacific/Kosrae`, `Pacific/Kwajalein`, `Pacific/Majuro`, `Pacific/Marquesas`, `Pacific/Midway`, `Pacific/Nauru`, `Pacific/Niue`, `Pacific/Norfolk`, `Pacific/Noumea`, `Pacific/Pago_Pago`, `Pacific/Palau`, `Pacific/Pitcairn`, `Pacific/Pohnpei`, `Pacific/Ponape`, `Pacific/Port_Moresby`, `Pacific/Rarotonga`, `Pacific/Saipan`, `Pacific/Samoa`, `Pacific/Tahiti`, `Pacific/Tarawa`, `Pacific/Tongatapu`, `Pacific/Truk`, `Pacific/Wake`, `Pacific/Wallis`, `Pacific/Yap`, `Poland`, `Portugal`, `ROC`, `ROK`, `Singapore`, `Turkey`, `UCT`, `US/Alaska`, `US/Aleutian`, `US/Arizona`, `US/Central`, `US/East-Indiana`, `US/Eastern`, `US/Hawaii`, `US/Indiana-Starke`, `US/Michigan`, `US/Mountain`, `US/Pacific`, `US/Samoa`, `UTC`, `Universal`, `W-SU`, `WET`, `Zulu`
  </Expandable>
</ParamField>

<ParamField path="trigger_enabled" type="bool" required>
  Enable/Disable Automation
</ParamField>

<ParamField path="time_of_day" type="str" default="'00:00'">
  Time of day to trigger (HH:MM)
</ParamField>

<ParamField path="trigger_on_weekends" type="bool" default="False">
  Trigger on weekends
</ParamField>

<ParamField path="day_of_month" type="int" default="1">
  Day of the month to trigger
</ParamField>

<ParamField path="day_of_week" type="str" default="'Monday'">
  Day of the week to trigger
  One of: `Friday`, `Monday`, `Saturday`, `Sunday`, `Thursday`, `Tuesday`, `Wednesday`
</ParamField>

<a id="trigger_github" />

## `trigger_github` — GitHub Trigger

GitHub Trigger

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").trigger_github(integration=..., item_id="...", trigger_enabled=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="event" type="str" default="''">
  <Expandable title="Allowed values">
    `delete`, `deployment`, `dev_pr_merged_to_main`, `issue_comment`, `issues`, `pull_request`, `pull_request_review`, `push`, `release`, `repository`, `workflow_run`
  </Expandable>
</ParamField>

<ParamField path="integration" type="AcceptsIntegration" required />

<ParamField path="item_id" type="str" required>
  Select the repository to watch for new commits
</ParamField>

<ParamField path="trigger_enabled" type="bool" required>
  Enable/Disable Automation
</ParamField>

<a id="trigger_gmail" />

## `trigger_gmail` — Gmail Trigger

Gmail Trigger

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").trigger_gmail(integration=..., item_id="...", trigger_enabled=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="event" type="str" default="''">
  One of: `new_email`
</ParamField>

<ParamField path="integration" type="AcceptsIntegration" required />

<ParamField path="item_id" type="str" required>
  Select the Trigger
</ParamField>

<ParamField path="trigger_enabled" type="bool" required>
  Enable/Disable Automation
</ParamField>

<a id="trigger_google_docs" />

## `trigger_google_docs` — Google Docs Trigger

Google Docs Trigger

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").trigger_google_docs(integration=..., item_id="...", trigger_enabled=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="event" type="str" default="''">
  One of: `new_document_in_folder`, `updated_document_in_folder`
</ParamField>

<ParamField path="integration" type="AcceptsIntegration" required />

<ParamField path="item_id" type="str" required>
  Select the folder to watch for new documents
</ParamField>

<ParamField path="trigger_enabled" type="bool" required>
  Enable/Disable Automation
</ParamField>

<a id="trigger_google_drive" />

## `trigger_google_drive` — Google Drive Trigger

Google Drive Trigger

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").trigger_google_drive(integration=..., item_id="...", trigger_enabled=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="event" type="str" default="''">
  One of: `new_file`, `new_folder`, `updated_file`
</ParamField>

<ParamField path="integration" type="AcceptsIntegration" required />

<ParamField path="item_id" type="str" required>
  Select the folder to watch
</ParamField>

<ParamField path="trigger_enabled" type="bool" required>
  Enable/Disable Automation
</ParamField>

<a id="trigger_google_sheets" />

## `trigger_google_sheets` — Google Sheets Trigger

Google Sheets Trigger

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").trigger_google_sheets(integration=..., item_id="...", trigger_enabled=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="event" type="str" default="''">
  One of: `row_added`
</ParamField>

<ParamField path="integration" type="AcceptsIntegration" required />

<ParamField path="item_id" type="str" required>
  Select the sheet to watch for new rows
</ParamField>

<ParamField path="trigger_enabled" type="bool" required>
  Enable/Disable Automation
</ParamField>

<a id="trigger_linear" />

## `trigger_linear` — Linear Trigger

Linear Trigger

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").trigger_linear(integration=..., item_id="...", trigger_enabled=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="event" type="str" default="''">
  <Expandable title="Allowed values">
    `comment_created`, `comment_removed`, `comment_updated`, `cycle_created`, `cycle_removed`, `cycle_updated`, `issue_created`, `issue_label_created`, `issue_label_removed`, `issue_label_updated`, `issue_removed`, `issue_updated`, `project_created`, `project_removed`, `project_updated`, `reaction_created`, `reaction_removed`
  </Expandable>
</ParamField>

<ParamField path="integration" type="AcceptsIntegration" required />

<ParamField path="item_id" type="str" required>
  Select the Linear team to watch
</ParamField>

<ParamField path="trigger_enabled" type="bool" required>
  Enable/Disable Automation
</ParamField>

<a id="trigger_microsoft" />

## `trigger_microsoft` — OneDrive Trigger

OneDrive Trigger

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").trigger_microsoft(integration=..., item_id="...", trigger_enabled=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="event" type="str" default="''">
  <Expandable title="Allowed values">
    `new_file_direct`, `new_file_recursive`, `new_folder_direct`, `new_folder_recursive`, `updated_file_direct`, `updated_file_recursive`, `updated_file_specific`, `updated_folder_direct`, `updated_folder_recursive`
  </Expandable>
</ParamField>

<ParamField path="integration" type="AcceptsIntegration" required />

<ParamField path="item_id" type="str" required>
  Select a folder to watch for new files (direct children only)
</ParamField>

<ParamField path="trigger_enabled" type="bool" required>
  Enable/Disable Automation
</ParamField>

<a id="trigger_monday" />

## `trigger_monday` — Trigger Monday

Automate workflows when item events occur on a Monday board.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").trigger_monday(board_id="...", integration=..., status_column_id="...", status_value_index="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="event" type="str" default="''">
  One of: `change_column_value`, `change_status_column_value`, `create_item`, `create_subitem`
</ParamField>

<ParamField path="board_id" type="str" required>
  The board to watch
</ParamField>

<ParamField path="integration" type="AcceptsIntegration" required />

<ParamField path="status_column_id" type="str" required>
  Select the status column to watch
</ParamField>

<ParamField path="status_value_index" type="str" required>
  Select the status value to trigger on
</ParamField>

<ParamField path="trigger_enabled" type="bool" required>
  Toggle to enable or disable this automation
</ParamField>

<ParamField path="workspace_id" type="str" default="''">
  The workspace containing the board
</ParamField>

<ParamField path="item_id" type="str" required>
  The board to watch
</ParamField>

<a id="trigger_outlook" />

## `trigger_outlook` — Outlook Trigger

Outlook Trigger

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").trigger_outlook(integration=..., item_id="...", trigger_enabled=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="event" type="str" default="''">
  One of: `new_email`
</ParamField>

<ParamField path="integration" type="AcceptsIntegration" required />

<ParamField path="item_id" type="str" required>
  Select the Trigger
</ParamField>

<ParamField path="trigger_enabled" type="bool" required>
  Enable/Disable Automation
</ParamField>

<a id="trigger_sharepoint" />

## `trigger_sharepoint` — SharePoint Trigger

SharePoint Trigger

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").trigger_sharepoint(integration=..., item_id="...", trigger_enabled=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="event" type="str" default="''">
  One of: `new_file`, `updated_file`
</ParamField>

<ParamField path="integration" type="AcceptsIntegration" required />

<ParamField path="item_id" type="str" required>
  Select a SharePoint site or folder to monitor for new files
</ParamField>

<ParamField path="trigger_enabled" type="bool" required>
  Enable/Disable Automation
</ParamField>

<a id="trigger_slack" />

## `trigger_slack` — Slack Trigger

Slack Trigger

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").trigger_slack(channel="...", integration=..., item_id="...", team="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="event" type="str" default="''">
  One of: `new_channel`, `new_channel_member`, `new_file`, `new_mention`, `new_message`, `new_user`
</ParamField>

<ParamField path="channel" type="str" required>
  The name of the Slack channel
</ParamField>

<ParamField path="integration" type="AcceptsIntegration" required />

<ParamField path="item_id" type="str" required />

<ParamField path="team" type="str" required>
  The name of the Slack team
</ParamField>

<ParamField path="trigger_enabled" type="bool" required>
  Enable/Disable Automation
</ParamField>

<a id="trigger_teams" />

## `trigger_teams` — Trigger Teams

Automate workflows when message events occur in Microsoft Teams.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").trigger_teams(integration=..., item_id="...", trigger_enabled=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="event" type="str" default="'new_channel_message'">
  Choose which message event should activate this trigger
  One of: `new_channel`, `new_channel_message`, `new_chat`, `new_chat_message`, `new_chat_message_all_chats`, `new_team_member`
</ParamField>

<ParamField path="integration" type="AcceptsIntegration" required />

<ParamField path="item_id" type="str" required>
  Select the Microsoft Teams chat to watch for new messages
</ParamField>

<ParamField path="trigger_enabled" type="bool" required>
  Toggle to enable or disable this automation
</ParamField>

<ParamField path="team_id" type="str" default="''">
  Select the Microsoft Teams team containing the channel
</ParamField>

<a id="trigger_typeform" />

## `trigger_typeform` — Typeform Trigger

Typeform Trigger

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").trigger_typeform(integration=..., item_id="...", trigger_enabled=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="event" type="str" default="''">
  One of: `entry_submitted`
</ParamField>

<ParamField path="integration" type="AcceptsIntegration" required />

<ParamField path="item_id" type="str" required>
  Select the form to watch for new submissions
</ParamField>

<ParamField path="trigger_enabled" type="bool" required>
  Enable/Disable Automation
</ParamField>

<a id="trigger_zendesk" />

## `trigger_zendesk` — Trigger Zendesk

Automate workflows when ticket events occur in your Zendesk account.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").trigger_zendesk(integration=..., item_id="...", trigger_enabled=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="event" type="str" default="'ticket_created'">
  Choose which ticket event should activate this trigger
  One of: `ticket_created`, `ticket_updated`
</ParamField>

<ParamField path="integration" type="AcceptsIntegration" required />

<ParamField path="item_id" type="str" required />

<ParamField path="trigger_enabled" type="bool" required>
  Toggle to enable or disable this automation
</ParamField>
