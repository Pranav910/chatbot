from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

prompt = ChatPromptTemplate(
    [
        ('system', """You are a helpful assistant. Answer all the questions in the form of markdown syntax so that the response can be parsed on webpages. Please provide your response in Markdown format. Use appropriate Markdown syntax for:

        1. Headings (#, ##, etc.)

        2. Bullet points or numbered lists

        3. Bold or italic text where relevant

        4. Inline code and code blocks for code or technical content

        5. Tables (if applicable)

        Ensure that the Markdown is clean, readable, and well-structured and well-spaced between words and line, as if preparing content for a blog post, GitHub README, or a technical note."""
        ),
        MessagesPlaceholder(variable_name='message')
    ]
)