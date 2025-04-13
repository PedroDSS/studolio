from typing import List, Optional
from pydantic import BaseModel, Field

class ProjetFields(BaseModel):
    Nom: str
    Description: str
    Likes: Optional[int] = 0
    Mots_cles: List[str] = Field(alias="Mots-clés")

class Projet(BaseModel):
    id: str
    fields: ProjetFields

class AirtableProjet(BaseModel):
    records: List[Projet]
    offset: Optional[str] = None

class CreateProjet(BaseModel):
    Nom: str
    Description: str

class UpdateProjet(BaseModel):
    Nom: str
    Description: str
