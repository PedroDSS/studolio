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
from core.airtable import (
    get_all_airtable,
    get_by_id_airtable,
    create_airtable,
    update_airtable,
    delete_airtable
)

router = APIRouter()
airtable = AirtableService(settings.AIRTABLE_TECHNO)

@router.get("/", response_model=AirtableTechno, dependencies=[Depends(verify_token)])
async def get_technos():
    return await get_all_airtable(airtable)

@router.get("/{id}", response_model=Techno, dependencies=[Depends(verify_token)])
async def get_techno(id: str):
    return await get_by_id_airtable(airtable, id)

@router.post("/", response_model=Techno, dependencies=[Depends(verify_token)], status_code=201)
async def create_techno(techno: CreateTechno):
    return await create_airtable(airtable, techno.dict())

@router.delete("/{id}", dependencies=[Depends(verify_token)], status_code=204)
async def delete_techno(id: str):
    await delete_airtable(airtable, id)
    return Response(status_code=204)

@router.patch("/{id}", response_model=Techno, dependencies=[Depends(verify_token)])
async def update_techno(id: str, techno: UpdateTechno):
    return await update_airtable(airtable, id, techno.dict())
