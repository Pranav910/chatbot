from main import llm
from parser import str_output_parser
from prompt_template import prompt, image_prompt

simple_response_chain = prompt | llm | str_output_parser

image_response_chain = image_prompt | llm |str_output_parser