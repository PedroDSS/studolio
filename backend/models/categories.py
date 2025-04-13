from typing import List, Optional
from pydantic import BaseModel

class CategorieFields(BaseModel):
    Nom: str

class Categorie(BaseModel):
    id: str
    fields: CategorieFields

class AirtableCategorie(BaseModel):
    records: List[Categorie]
    offset: Optional[str] = None

class CreateCategorie(BaseModel):
    Nom: str

class UpdateCategorie(BaseModel):
    Nom: Optional[str]
