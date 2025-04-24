from chat_history import with_chat_history
from langchain_core.messages import HumanMessage, AIMessage
from model_config import config
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from allowed_origins import origins
from pydantic import BaseModel
from rag_response_generator import generate_rag_response
import os
import shutil

class Item(BaseModel):
    type : str
    prompt : str | None = None

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
async def root():
    return "this is root route"

@app.post("/api/v1/response")
def send_model_response(item : Item):
    result = with_chat_history.invoke(
        [HumanMessage(content=item.prompt)],
        config=config
    )
    print(f"result : {result}")
    return {'result' : result}

@app.post("/api/v1/file_response")
def send_model_response_with_file(file : UploadFile = File(...), user_prompt : str = Form()):
    file_path = os.path.join('./', file.filename)
    if os.path.exists(file_path) == False:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

    respone = generate_rag_response(file_path, user_prompt)
    
    return {'result' : respone}