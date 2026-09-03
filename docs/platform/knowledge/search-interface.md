> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Setting Up the Search Interface

> Build a branded, AI-powered search experience your team or customers can start using right away

Turn your knowledge base into a polished search experience your team or customers can use right away. The Interface tab lets you control how your search looks, behaves, and who can access it — with a live preview so you can see every change as you make it.

To access it, open a knowledge base and click the **Interface** tab in the top navigation.

<img src="../../assets/kb-page32-img1_6ec11f01.png" alt="Interface tab showing configuration sections on the left and live preview on the right" width="1100" height="490" data-path="images/platform/knowledge/kb-page32-img1.png" />

The left side of the screen shows all configuration sections. The right side shows a live preview that updates as you make changes.

## Basics

Shape what your users see when they search.

<img src="../../assets/kb-page32-img2_b4c7481b.png" alt="Basics section with Max document results per search, relevancy score toggle, and re-ranked documents toggle" width="1100" height="490" data-path="images/platform/knowledge/kb-page32-img2.png" />

**Max document results per search**

Set how many document results appear per query (default: 6). More results give users more to explore; fewer results keep the experience focused and faster to scan.

**Show relevancy score for every document result**

Let users gauge how closely each result matches their query — useful for power users who want to evaluate result quality at a glance.

**Re-ranked documents**

Surface the most relevant results first by adding an extra ranking step after retrieval. Especially helpful for broad queries where the first pass might not perfectly order the results.

## Style and personalisation

Make the search experience feel like part of your brand.

<img src="../../assets/kb-page33-img1_f14faefc.png" alt="Style and Personalisation section showing accent color, display image, display name, and welcome image options" width="1100" height="490" data-path="images/platform/knowledge/kb-page33-img1.png" />

**Accent color**

Choose the accent color used throughout the search interface (buttons, highlights, links) using the color picker.

**Display image**

Upload your logo or avatar to appear in the search interface. Suggested size is 56 x 56 pixels. Supported formats: PNG, JPEG.

**Display name**

Set the name that appears at the top of the search interface (e.g., your company name).

**Show welcome image**

Toggle this on to greet users with a welcome image when they first land on the search page.

**Welcome image**

Upload the image that appears above the welcome message.

**Search bar placeholder text**

Guide your users with custom placeholder text (e.g., "Search our knowledge base..." or "Ask a question...").

**Enable initial prompts**

Help new users get started by showing suggested questions before they type — this reduces the blank-page problem and shows what the search can do.

## AI overview

Shape the quality and accuracy of AI-generated answers your users receive.

<img src="../../assets/kb-page34-img1_72d93c66.png" alt="AI Overview section showing generation prompt, LLM provider, model, max tokens, and advanced search retrieval settings" width="1100" height="490" data-path="images/platform/knowledge/kb-page34-img1.png" />

**AI overview generation prompt**

Define instructions for how the AI generates answers. For example: "Answer strictly based on the provided context; do not introduce information outside it, and respond clearly, concisely, and accurately within these limits."

**LLM provider for AI overview**

Select the AI provider used to generate answers (e.g., OpenAI).

**Model for AI overview**

Select the specific model used to generate answers (e.g., gpt-4o-mini).

**Max token per LLM call**

Set the maximum number of tokens the AI can use per response. The default is 1000.

**Advanced search retrieval**

Get more accurate answers by adding an LLM-powered retrieval step that refines which chunks are used before generating the answer.

**Advanced search retrieval mode**

Balance speed and accuracy based on what your users need:

| Mode     | When to use                                                          |
| -------- | -------------------------------------------------------------------- |
| fast     | High-volume or real-time search where speed is critical              |
| accurate | Precision-focused search where getting the right answer matters most |

**Advanced search retrieval model**

Select the model used for the advanced retrieval step (e.g., gpt-4.1-mini).

<Tip>Start with the default AI overview prompt and adjust based on user feedback. If answers are too verbose, add instructions to be concise. If answers miss important details, widen the prompt to allow more thorough responses.</Tip>

## Security

Control who can access your search — keep it open for public use or restrict it to the right people.

<img src="../../assets/kb-page36-img1_2251a3e6.png" alt="Security section showing Protect with SSO Auth option with user roles and access denied page customization" width="1100" height="490" data-path="images/platform/knowledge/kb-page36-img1.png" />

**Protect with SSO Auth**

Ensure only authenticated team members can access the search by requiring SSO (Single Sign-On) login.

**Protect with Password**

<img src="../../assets/kb-page36-img2_62f8f86b.png" alt="Security section showing Protect with Password option with password field" width="1100" height="490" data-path="images/platform/knowledge/kb-page36-img2.png" />

Add a simple password gate — useful for sharing with clients or partners who don't have SSO access.

<Tip>Building an internal knowledge base? SSO Auth keeps it secure without any extra steps for your team. For a public-facing search, leave both toggles off.</Tip>

## Deploying your search

Your search is ready to go live. Share it as a direct link or embed it into any website.

### Open Search

<img src="../../assets/kb-page37-img1_828528bf.png" alt="Interface tab with Open Search button and deployed URL highlighted" width="1100" height="490" data-path="images/platform/knowledge/kb-page37-img1.png" />

At the top of the Interface tab, you'll see a URL like `https://app.vectorshift.ai/search/deployed/....` — this is the direct link to your deployed search. Click **Open Search** to open it in a new tab, or use the copy button to share the URL with your team.

### Embed Search

<img src="../../assets/kb-page37-img2_9bb8163c.png" alt="Interface tab with Embed Search button highlighted" width="1100" height="490" data-path="images/platform/knowledge/kb-page37-img2.png" />

Add search directly to your website or app. Click **Embed Search** to get an iframe code snippet you can drop into any platform — Wix, Squarespace, Framer, Webflow, WordPress, or custom HTML.

<img src="../../assets/kb-page38-img1_dcb5184c.png" alt="Embed Search dialog showing iframe HTML code snippet with Copy button" width="1100" height="490" data-path="images/platform/knowledge/kb-page38-img1.png" />

The dialog shows the HTML iframe code with a **Copy** button.

### Save

Click the **Save** button in the top-right corner to save your current interface configuration. The button shows a green "Saved" indicator once your changes are saved.

<Tip>Always click Save after making changes. The live preview updates in real time, but your changes are not persisted until you save.</Tip>

## Applying search filters

Help your users get more targeted results by narrowing their search to specific files in the knowledge base.

<img src="../../assets/kb-page39-img1_83f2428b.png" alt="Search interface showing Apply Filter option and filter modal" width="1100" height="490" data-path="images/platform/knowledge/kb-page39-img1.png" />

Click **Apply Filter** in the search preview (or in the deployed search) to open the Filter modal. This modal shows the knowledge base contents, and you can select or deselect individual files to include or exclude them from the search scope.

<img src="../../assets/kb-filters-applied_72f6e579.png" alt="Filter modal showing selected files with checkboxes to include or exclude specific documents from search" width="1100" height="490" data-path="images/platform/knowledge/kb-filters-applied.png" />

Use the **Search** bar and **All Statuses** dropdown within the filter modal to quickly find specific files. Selected files are highlighted with a checked checkbox.

A note at the bottom of the modal reads: "Filters will be applied for your next search prompt."

Click **Apply** to save the filter, or **Cancel** to discard.
