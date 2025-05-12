from chat_history import with_chat_history, with_chat_history_with_image
from langchain_core.messages import HumanMessage
from model_config import config

def generate_response(prompt, prompt_type='without_image'):

    if prompt_type == 'without_image':
        result = with_chat_history.invoke(
            [HumanMessage(content=prompt)],
            config=config
        )
        return result
    
    elif prompt_type == 'with_image':
        result = with_chat_history_with_image.invoke(
            [HumanMessage(content=prompt)],
            config=config
        )
        return result