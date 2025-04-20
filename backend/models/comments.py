from typing import List, Optional
from pydantic import BaseModel

class CommentFields(BaseModel):
    Administrateur: List[str]
    Notes: str

class Comment(BaseModel):
    id: str
    fields: CommentFields

class AirtableComment(BaseModel):
    records: List[Comment]
    offset: Optional[str] = None

class CreateComment(BaseModel):
    Administrateur: Optional[List[str]] = None
    Projet: List[str]
    Notes: str

class UpdateComment(BaseModel):
    Notes: Optional[str]
