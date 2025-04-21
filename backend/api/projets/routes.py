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

router = APIRouter()
airtable = AirtableService(settings.AIRTABLE_PROJET)

@router.get("/", response_model=AirtableProjet, dependencies=[Depends(verify_token)])
async def get_projets():
    return await airtable.get_all()

@router.get("/{id}", response_model=Projet, dependencies=[Depends(verify_token)])
async def get_projet(id: str):
    return await airtable.get_by_id(id)

@router.post("/", response_model=Projet, dependencies=[Depends(verify_token)], status_code=201)
async def create_projet(projet: CreateProjet):
    return await airtable.create(projet.dict())

@router.patch("/{id}", response_model=Projet, dependencies=[Depends(verify_token)])
async def update_projet(id: str, projet: UpdateProjet):
    return await airtable.update(id, projet.dict())

@router.delete("/{id}", dependencies=[Depends(verify_token)], status_code=204)
async def delete_projet(id: str):
    await airtable.delete(id)
    return Response(status_code=204)
