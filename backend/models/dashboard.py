from typing import Dict
from pydantic import BaseModel

class DashboardFields(BaseModel):
    TotalLikes: int
    TotalPubliés: int
    TotalNonPubliés: int
    TotalProjets: int
    TotalCatégories: Dict[str, int]
    TotalTechnos: Dict[str, int]

class Dashboard(BaseModel):
    id: str
    fields: DashboardFields