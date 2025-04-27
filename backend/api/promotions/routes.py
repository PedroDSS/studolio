from fastapi import APIRouter, Depends, Response
from core.auth import verify_token
from core.config import settings
from services.airtable import AirtableService
from models.promotions import (
    Promotion,
    CreatePromotion,
    UpdatePromotion,
    AirtablePromotion
)

router = APIRouter()
airtable = AirtableService(settings.AIRTABLE_PROMO)

@router.get("/", response_model=AirtablePromotion, dependencies=[Depends(verify_token)])
async def get_promotions():
    return await airtable.get_all()

@router.get("/{id}", response_model=Promotion, dependencies=[Depends(verify_token)])
async def get_promotion(id: str):
    return await airtable.get_by_id(id)

@router.post("/", response_model=Promotion, dependencies=[Depends(verify_token)], status_code=201)
async def create_promotion(promotion: CreatePromotion):
    return await airtable.create(promotion.dict())

@router.delete("/{id}", dependencies=[Depends(verify_token)], status_code=204)
async def delete_promotion(id: str):
    await airtable.delete(id)
    return Response(status_code=204)

@router.patch("/{id}", response_model=Promotion, dependencies=[Depends(verify_token)])
async def update_promotion(id: str, promotion: UpdatePromotion):
    return await airtable.update(id, promotion.dict())
