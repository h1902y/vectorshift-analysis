> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# File Ops tools

> Read, write, and process files and spreadsheets.

Add these tools with `AgentTools.<tool>(tool_name="...", ...)` or `agent.add_tool.<tool>(tool_name="...", ...)`. Every tool requires a unique `tool_name=`. Each entry lists the tool's configuration parameters. See the [Agent reference](/sdk/agent/reference) for attaching and running tools.

<a id="append_files" />

## `append_files` — Append Files

Append files together in successive fashion

<Info>Platform docs: [Append Files](https://docs.vectorshift.ai/platform/pipelines/data-transformation/file/append-files)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.append_files(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="file_type" type="str" default="'PDF'">
  The type of file to append.
</ParamField>

<ParamField path="selected_files" type="list[str]" default="['']">
  The number of files to be appended. Files will be appended in successive fashion (e.g., file-1 first, then file-2, etc.).
</ParamField>

<a id="excel_cell_reader" />

## `excel_cell_reader` — Excel Cell Reader

Read data from an Excel cell.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.excel_cell_reader(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="cell_index" type="Any">
  The cell to read from.
</ParamField>

<ParamField path="read_formatting" type="Any">
  Whether to read the formatting of the cell.
</ParamField>

<ParamField path="selected_file" type="str">
  The file to read from.
</ParamField>

<ParamField path="sheet" type="Any">
  The sheet to read from.
</ParamField>

<a id="excel_cell_writer" />

## `excel_cell_writer` — Excel Cell Writer

Write data to an Excel cell.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.excel_cell_writer(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="cell_index" type="Any">
  The cell to read from.
</ParamField>

<ParamField path="cell_value" type="Any">
  The value to write to the cell.
</ParamField>

<ParamField path="fill_color" type="Any">
  The fill color of the cell.
</ParamField>

<ParamField path="horizontal_alignment" type="Any">
  The horizontal alignment of the cell.
</ParamField>

<ParamField path="selected_file" type="str">
  The file to read from.
</ParamField>

<ParamField path="sheet" type="Any">
  The sheet to read from.
</ParamField>

<ParamField path="vertical_alignment" type="Any">
  The vertical alignment of the cell.
</ParamField>

<ParamField path="set_vertical_alignment" type="Any">
  Whether to set the vertical alignment of the cell.
</ParamField>

<ParamField path="set_horizontal_alignment" type="Any">
  Whether to set the horizontal alignment of the cell.
</ParamField>

<ParamField path="set_fill_color" type="Any">
  Whether to set the fill color of the cell.
</ParamField>

<a id="excel_file_reader" />

## `excel_file_reader` — Excel File Reader

Read data from an Excel file.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.excel_file_reader(tool_name="...", read_single_sheet=True, selected_file="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="read_single_sheet" type="bool" required>
  Whether to read a single sheet from the Excel file.
</ParamField>

<ParamField path="selected_file" type="str" required>
  The file to read from.
</ParamField>

<ParamField path="read_formatting" type="bool">
  Whether to read the formatting of the cell.
</ParamField>

<ParamField path="read_formula" type="bool">
  Whether to read the formula of the cell.
</ParamField>

<ParamField path="sheet" type="str">
  The sheet to read from.
</ParamField>

<a id="excel_writer" />

## `excel_writer` — Excel Writer

Write data to an Excel sheet.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.excel_writer(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="cell_start_index" type="Any">
  The cell to start writing from.
</ParamField>

<ParamField path="cell_values" type="Any">
  The values to write to the cells.
</ParamField>

<ParamField path="fill_color" type="Any">
  The fill color of the cells.
</ParamField>

<ParamField path="horizontal_alignment" type="Any">
  The horizontal alignment of the cells.
</ParamField>

<ParamField path="selected_file" type="str">
  The file to write to.
</ParamField>

<ParamField path="sheet" type="Any">
  The sheet to write to.
</ParamField>

<ParamField path="vertical_alignment" type="Any">
  The vertical alignment of the cells.
</ParamField>

<ParamField path="set_vertical_alignment" type="Any">
  Whether to set the vertical alignment of the cells.
</ParamField>

<ParamField path="set_horizontal_alignment" type="Any">
  Whether to set the horizontal alignment of the cells.
</ParamField>

<ParamField path="set_fill_color" type="Any">
  Whether to set the fill color of the cells.
</ParamField>

<a id="file_save" />

## `file_save` — File Save

Save a file on the VectorShift platform (under the 'Files' tab).

<Info>Platform docs: [File Save](https://docs.vectorshift.ai/platform/pipelines/general/file-save)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.file_save(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="files" type="list[str]" default="['']">
  The files to be saved
</ParamField>

<ParamField path="name" type="str" default="''">
  The name of the file
</ParamField>

<a id="file_to_text" />

## `file_to_text` — File to Text

Convert data from type File to type Text

<Info>Platform docs: [File to Text](https://docs.vectorshift.ai/platform/pipelines/data-transformation/file/file-to-text)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.file_to_text(tool_name="...", chunk_text=True, file="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="chunk_text" type="bool" required>
  Whether to chunk the text into smaller pieces.
</ParamField>

<ParamField path="file" type="str" required>
  The file to convert to text.
</ParamField>

<ParamField path="file_parser" type="str">
  The type of file parser to use.
</ParamField>

<ParamField path="chunk_overlap" type="int">
  The overlap of each chunk of text.
</ParamField>

<ParamField path="chunk_size" type="int">
  The size of each chunk of text.
</ParamField>

<a id="text_to_file" />

## `text_to_file` — Text to File

Convert data from type Text to type File.

<Info>Platform docs: [Text to File](https://docs.vectorshift.ai/platform/pipelines/data-transformation/file/text-to-file)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.text_to_file(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="file_name" type="str" default="'converted_file'">
  The name for the generated file (without extension).
</ParamField>

<ParamField path="file_type" type="str" default="'PDF'">
  The type of file to convert the text to.
</ParamField>

<ParamField path="text" type="str" default="''">
  The text for conversion.
</ParamField>
