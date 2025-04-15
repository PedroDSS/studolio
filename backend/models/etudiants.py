from typing import List, Optional
from pydantic import BaseModel

class EtudiantFields(BaseModel):
    Nom: str
    Prenom: str
    Email: str
    Promotion: Optional[List[str]] = None
    Projet: Optional[List[str]] = None

class Etudiant(BaseModel):
    id: str
    fields: EtudiantFields

class AirtableEtudiant(BaseModel):
    records: List[Etudiant]
    offset: Optional[str] = None

class CreateEtudiant(BaseModel):
    Nom: str
    Prenom: str
    Email: str
    Promotion: Optional[List[str]] = None
    Projet: Optional[List[str]] = None

class UpdateEtudiant(BaseModel):
    Nom: Optional[str]
    Prenom: Optional[str]
    Email: Optional[str]
    Promotion: Optional[List[str]]
    Projet: Optional[List[str]]
