from fastapi import APIRouter, Depends, Response
from core.auth import verify_token
from core.config import settings
from services.airtable import AirtableService
from models.technos import (
    Techno,
    CreateTechno,
    UpdateTechno,
    AirtableTechno
)

router = APIRouter()
airtable = AirtableService(settings.AIRTABLE_TECHNO)

@router.get("/", response_model=AirtableTechno, dependencies=[Depends(verify_token)])
async def get_technos():
    return await airtable.get_all()

@router.get("/{id}", response_model=Techno, dependencies=[Depends(verify_token)])
async def get_techno(id: str):
    return await airtable.get_by_id(id)

@router.post("/", response_model=Techno, dependencies=[Depends(verify_token)], status_code=201)
async def create_techno(techno: CreateTechno):
    return await airtable.create(techno.dict())

@router.delete("/{id}", dependencies=[Depends(verify_token)], status_code=204)
async def delete_techno(id: str):
    await airtable.delete(id)
    return Response(status_code=204)

@router.patch("/{id}", response_model=Techno, dependencies=[Depends(verify_token)])
async def update_techno(id: str, techno: UpdateTechno):
    return await airtable.update(id, techno.dict())
