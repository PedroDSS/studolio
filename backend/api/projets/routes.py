from fastapi import APIRouter, Depends, HTTPException, Response, Query
from core.auth import verify_token, verify_token_optional
from core.config import settings
from services.airtable import AirtableService
from typing import Optional
from models.projets import (
    Projet,
    LikeProjet,
    CreateProjet,
    UpdateProjet,
    AirtableProjet
)

router = APIRouter()
airtable = AirtableService(settings.AIRTABLE_PROJET)

@router.get("/", response_model=AirtableProjet)
async def get_projets(
    limit: Optional[int] = Query(10, gt=0),
    offset: Optional[str] = None,
    search: Optional[str] = None,
    current_user: Optional[dict] = Depends(verify_token_optional)
):
    params = {}
    if search:
        params["filterByFormula"] = f"OR(FIND(LOWER('{search}'), LOWER({{Nom}})), FIND(LOWER('{search}'), LOWER({{Description}})))"

    if current_user is None:
        published_filter = "{Publié} = TRUE()"
        if "filterByFormula" in params:
            params["filterByFormula"] = f"AND({params['filterByFormula']}, {published_filter})"
        else:
            params["filterByFormula"] = published_filter

    params["pageSize"] = limit
    if offset:
        params["offset"] = offset

    return await airtable.get_all(params=params)

@router.get("/{id}", response_model=Projet)
async def get_projet(
    id: str,
    current_user: Optional[dict] = Depends(verify_token_optional),
):
    projet = await airtable.get_by_id(id)
    
    if current_user is None and not projet["fields"].get("Publié", False):
        raise HTTPException(status_code=404, detail="Not Found.")
    
    return projet

@router.post("/", response_model=Projet, dependencies=[Depends(verify_token)], status_code=201)
async def create_projet(projet: CreateProjet):
    return await airtable.create(projet.dict())

@router.post("/{id}/like", response_model=Projet)
async def like_or_dislike_projet(id: str, action: LikeProjet):
    projet = await airtable.get_by_id(id)

    if not projet:
        raise HTTPException(status_code=404, detail="Not Found")

    current_likes = projet["fields"].get("Likes", 0) or 0
    if action.action == "like":
        updated_likes = current_likes + 1
    elif action.action == "dislike":
        updated_likes = max(current_likes - 1, 0)
    else:
        raise HTTPException(status_code=400, detail="Bad Request")

    updated_projet = await airtable.update(id, {"Likes": updated_likes})
    return updated_projet

@router.patch("/{id}", response_model=Projet, dependencies=[Depends(verify_token)])
async def update_projet(id: str, projet: UpdateProjet):
    return await airtable.update(id, projet.dict())

@router.delete("/{id}", dependencies=[Depends(verify_token)], status_code=204)
async def delete_projet(id: str):
    await airtable.delete(id)
    return Response(status_code=204)
