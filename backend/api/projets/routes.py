from fastapi import APIRouter, Depends, Response
from core.auth import verify_token
from core.config import settings
from services.airtable import AirtableService
from models.projets import (
    Projet,
    CreateProjet,
    UpdateProjet,
    AirtableProjet
)
from core.airtable import (
    get_all_airtable,
    get_by_id_airtable,
    create_airtable,
    update_airtable,
    delete_airtable
)

router = APIRouter()
airtable = AirtableService(settings.AIRTABLE_PROJET)

@router.get("/", response_model=AirtableProjet)
async def get_projets():
    return await get_all_airtable(airtable)

@router.get("/{id}", response_model=Projet)
async def get_projet(id: str):
    return await get_by_id_airtable(airtable, id)

@router.post("/", response_model=Projet, dependencies=[Depends(verify_token)], status_code=201)
async def create_projet(projet: CreateProjet):
    return await create_airtable(airtable, projet.dict())

@router.patch("/{id}", response_model=Projet, dependencies=[Depends(verify_token)])
async def update_projet(id: str, projet: UpdateProjet):
    return await update_airtable(airtable, id, projet.dict())

@router.delete("/{id}", dependencies=[Depends(verify_token)], status_code=204)
async def delete_projet(id: str):
    await delete_airtable(airtable, id)
    return Response(status_code=204)
