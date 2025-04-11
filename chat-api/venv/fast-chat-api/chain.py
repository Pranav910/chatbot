from main import llm
from parser import str_output_parser
from prompt_template import prompt

chain = prompt | llm | str_output_parser