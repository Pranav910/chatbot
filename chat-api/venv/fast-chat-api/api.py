from chat_history import with_chat_history
from langchain_core.messages import HumanMessage
from model_config import config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from allowed_origins import origins
from pydantic import BaseModel

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