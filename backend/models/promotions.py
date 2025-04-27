from typing import List, Optional
from pydantic import BaseModel

class PromotionFields(BaseModel):
    Nom: str

class Promotion(BaseModel):
    id: str
    fields: PromotionFields

class AirtablePromotion(BaseModel):
    records: List[Promotion]
    offset: Optional[str] = None

class CreatePromotion(BaseModel):
    Nom: str

class UpdatePromotion(BaseModel):
    Nom: Optional[str]