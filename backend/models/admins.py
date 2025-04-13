from typing import List, Optional
from pydantic import BaseModel, Field

class AdminFields(BaseModel):
    Nom: str
    Prenom: str
    Email: str

class Administrateur(BaseModel):
    id: str
    fields: AdminFields

class AirtableAdministrateur(BaseModel):
    records: List[Administrateur]
    offset: str = None

class CreateAdministrateur(BaseModel):
    Nom: str
    Prenom: str
    Email: str
    Mot_de_passe: str = Field(None, alias="Mot de passe")

class UpdateAdministrateur(BaseModel):
    Nom: Optional[str]
    Prenom: Optional[str]
    Email: Optional[str]