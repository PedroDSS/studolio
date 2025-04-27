from typing import List, Optional
from pydantic import BaseModel

class AdminFields(BaseModel):
    Name:str
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
    Password: str

class UpdateAdministrateur(BaseModel):
    Nom: Optional[str]
    Prenom: Optional[str]
    Email: Optional[str]

class UpdateAdministrateurPassword(BaseModel):
    Password: str