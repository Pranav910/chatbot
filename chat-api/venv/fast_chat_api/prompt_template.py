from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

prompt = ChatPromptTemplate(
    [
        ('system', """You are a helpful assistant. Answer all the questions in the form of markdown syntax so that the response can be parsed on webpages. Please provide your response in Markdown format. Use appropriate Markdown syntax for:

        1. Headings (#, ##, etc.)

        2. Bullet points or numbered lists

        3. Bold or italic text where relevant

        4. Inline code and code blocks for code or technical content

        5. Tables (if applicable)

        Ensure that the Markdown is clean, readable, and well-structured and well-spaced between words and line, as if preparing content for a blog post, GitHub README, or a technical note.
         
        Note : If the response does not contain any code then just generate the response in a simple markdown. Or if you feel like you do not know the answer just explain it in simple terms and do not provide any un-necessary information related to the markdown response, etc. 
         """
        ),
        MessagesPlaceholder(variable_name='message')
    ]
)

image_prompt = ChatPromptTemplate(
    
    [
        ('system', "You are a helpful assistant who has given the output of the text extracted from an image you have to just say : 'The text extracted from the image is :'\n"),
        MessagesPlaceholder(variable_name='message')
    ]
)