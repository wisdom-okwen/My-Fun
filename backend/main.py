from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Annotated

app = FastAPI()

class Post(BaseModel):
    id: int
    description: str



@app.get("/")
def read_root():
    return {"Hello there!": "Welcome"}