> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Reviewing Submissions

> View and manage what people have submitted through the Manager tab

The Manager tab gives you a view of your form activity from a submissions perspective. Where Analytics tells you how your workflow is running, Manager tells you what people are submitting and what results they are getting.

Get to it by clicking "Manager" in the top navigation bar of your project.

## Filters and time range

At the top of the Manager tab you will find a date range picker defaulting to the last 30 days and a Weekly toggle next to it. Use these to focus on a specific time window.

Click Reload to make sure you are seeing the latest data.

<img src="../../../assets/forms-page37-img1_4855ab6e.png" alt="Manager tab showing date range picker, Runs, Failures, and Model Costs summary cards, and Form Responses table" width="1100" height="490" data-path="images/platform/interfaces/forms/forms-page37-img1.png" />

## Summary cards

At the top of the Manager tab you will see three summary cards side by side: Runs, Failures, and Model Costs. These give you the same top-line numbers as Analytics but viewed from the submissions perspective.

<img src="../../../assets/forms-page38-img1_d93d34d1.png" alt="Manager tab with summary cards highlighted showing Runs, Failures, and Model Costs" width="1100" height="490" data-path="images/platform/interfaces/forms/forms-page38-img1.png" />

If Failures are unexpectedly high relative to Runs, go to the Analytics tab and look at the Form Responses table to find out what is going wrong.

## Form responses

<img src="../../../assets/forms-page38-img2_f9910651.png" alt="Form Responses table showing Source, Name, Status, Start Time, End Time, Email, Details, and Error Message columns" width="1100" height="490" data-path="images/platform/interfaces/forms/forms-page38-img2.png" />

Below the summary cards is the submissions table. Each row represents one form submission. Here is what each column tells you:

* **Source** shows where the submission came from, for example a direct link, an embedded form, or an API call.
* **Name** shows the form or workflow name associated with that submission.
* **Status** shows whether the run completed successfully or failed.
* **Start Time** shows when the submission was received.
* **End Time** shows when the run finished processing.
* **Email** shows the email address of the user who submitted the form, if they were logged in.
* **Error Message** shows the error detail if the run failed. Use this column to quickly identify what went wrong on a specific submission without having to dig into the full trace.
* **Details** is a clickable link that opens the full run details for that submission, including inputs, outputs, and the trace through each node.

<img src="../../../assets/forms-submission-details_3a03afbd.png" alt="Details view showing full run details with inputs, outputs, and trace for a form submission" width="1100" height="490" data-path="images/platform/interfaces/forms/forms-submission-details.png" />

<Tip>Filter by Status: Failure to focus only on submissions that need attention. The Error Message column will tell you at a glance what went wrong for each one.</Tip>

<Tip>If you need to follow up with a specific user about their submission, the Email column is your quickest way to find them.</Tip>

To download the output from a specific submission, open the Details view for that row and look for the download option. You can save outputs as PDF, TXT, DOCX, or CSV depending on what your workflow produces.
