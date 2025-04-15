from typing import List, Optional
from pydantic import BaseModel

class TechnoFields(BaseModel):
    Nom: str

class Techno(BaseModel):
    id: str
    fields: TechnoFields

class AirtableTechno(BaseModel):
    records: List[Techno]
    offset: Optional[str] = None

class CreateTechno(BaseModel):
    Nom: str

class UpdateTechno(BaseModel):
    Nom: Optional[str]
