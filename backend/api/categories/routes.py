from fastapi import APIRouter, Depends, Response
from core.auth import verify_token
from core.config import settings
from services.airtable import AirtableService
from models.categories import (
    Categorie,
    CreateCategorie,
    UpdateCategorie,
    AirtableCategorie
)

router = APIRouter()
airtable = AirtableService(settings.AIRTABLE_CATEGORIE)

@router.get("/", response_model=AirtableCategorie, dependencies=[Depends(verify_token)])
async def get_categories():
    return await airtable.get_all()

@router.get("/{id}", response_model=Categorie, dependencies=[Depends(verify_token)])
async def get_categorie(id: str):
    return await airtable.get_by_id(id)

@router.post("/", response_model=Categorie, dependencies=[Depends(verify_token)], status_code=201)
async def create_categorie(categorie: CreateCategorie):
    return await airtable.create(categorie.dict())

@router.delete("/{id}", dependencies=[Depends(verify_token)], status_code=204)
async def delete_categorie(id: str):
    await airtable.delete(id)
    return Response(status_code=204)

@router.patch("/{id}", response_model=Categorie, dependencies=[Depends(verify_token)])
async def update_categorie(id: str, categorie: UpdateCategorie):
    return await airtable.update(id, categorie.dict())
