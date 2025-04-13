from typing import List, Optional
from pydantic import BaseModel

class CommentFields(BaseModel):
    Nom: str

class Comment(BaseModel):
    id: str
    fields: CommentFields

class AirtableComment(BaseModel):
    records: List[Comment]
    offset: Optional[str] = None

class CreateComment(BaseModel):
    Nom: str

class UpdateComment(BaseModel):
    Nom: Optional[str]
