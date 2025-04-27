from fastapi import APIRouter, Depends, Response
from collections import Counter
from core.auth import verify_token
from core.config import settings
from services.airtable import AirtableService
from models.dashboard import Dashboard

router = APIRouter()
airtable = AirtableService(settings.AIRTABLE_DASHBOARD)


@router.get("/", response_model=Dashboard, dependencies=[Depends(verify_token)])
async def get_dashboard():
    dashboard = await airtable.get_by_id(settings.DASHBOARD_ID)
    dashboard["fields"]["TotalCatégories"] = Counter(dashboard["fields"]["RépartitionCatégories"].split(', '))
    dashboard["fields"]["TotalTechnos"] = Counter(dashboard["fields"]["RépartitionTechnos"].split(', '))
    return dashboard