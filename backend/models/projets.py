from typing import List, Optional
from pydantic import BaseModel, Field

class ProjetFields(BaseModel):
    Nom: str
    Description: str
    Likes: int
    Mots: str
    GitHub: str
    Publié: Optional[bool] = None
    Catégorie: List[str]
    Technos: List[str]
    TechnosNames: List[str]
    Étudiants: List[str]
    ÉtudiantsNames: List[str]
    Commentaire: Optional[List[str]] = None
    Visuel: Optional[List[dict]] = None 

class Projet(BaseModel):
    id: str
    fields: ProjetFields

class LikeProjet(BaseModel):
    action: str 

class AirtableProjet(BaseModel):
    records: List[Projet]
    offset: Optional[str] = None

class CreateProjet(BaseModel):
    Nom: str
    Description: str
    Mots: str
    GitHub: str
    Catégorie: List[str]
    Technos: List[str]
    Étudiants: List[str]
    Publié: bool


class UpdateProjet(BaseModel):
    Nom: str
    Description: str
    Mots: str
    GitHub: str
    Publié: bool
    Catégorie: List[str]
    Technos: List[str]
    Étudiants: List[str]
