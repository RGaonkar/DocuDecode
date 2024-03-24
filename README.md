# DocuDecode

## Inspiration
DocuDecode was inspired by the realization that everyday individuals, professionals, and policymakers alike face the daunting task of deciphering complex documents filled with technical jargon. The challenge is particularly acute in critical areas such as healthcare, law, and government policy, where understanding the nuances can have significant implications. We wanted to empower people to grasp the essentials of such documents quickly, without needing specialized backgrounds.
## What it does
DocuDecode simplifies the understanding of complex, jargon-heavy documents by offering tiered explanations that cater to varying levels of expertise. Users can select their level of knowledge—red for experts, yellow for intermediate understanding, and green for novices—and receive tailored explanations accordingly. This ensures that whether you're a seasoned professional or a curious layperson, you have access to a clear and concise interpretation of the material.
## How we built it
DocuDecode harnesses the power of Mistral Large, a large language model, to identify and interpret jargon-heavy terms within documents. This scans texts to pinpoint complex language and offers clear, context-aware definitions. In order to generate context-aware definitions, we use few-shot, chain of thought reasoning to get the definitions. To enrich the explanations further, we integrated Brave Search API, tapping into a vast repository of real-time web search results to ensure our definitions are up-to-date and grounded in current usage.
The user interface of DocuDecode is made with TypeScript, React and Webpack.
On the backend, we opted for Python, Flask, and in some aspects Quart for asynchronous tasks.
## Challenges we ran into
Understanding what is difficult in a field is challenging. We used multiple prompting techniques and in-context learning to figure out the difficulty of a word in context. For example in radiology reports "impression" means a different thing than common words.
## Accomplishments that we're proud of
Got a chance to explore new API's and built a useful product that can impact day to day life.
## What we learned
Simple reader app that can accomplish this can make life significantly better.
## What's next for DocuDecode
- Expand to other modalities to help users better understand graphs, charts, inforgraphics, etc
- Build a mobile app, improve latency, add more knowledge












