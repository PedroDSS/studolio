from services.airtable import AirtableService
from typing import List, Dict, Any, Optional

async def get_all_airtable(airtable: AirtableService, params: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
    return await airtable.get_all(params)

async def get_by_id_airtable(airtable: AirtableService, id: str) -> Dict[str, Any]:
    return await airtable.get_by_id(id)

async def create_airtable(airtable: AirtableService, data: Dict[str, Any]) -> Dict[str, Any]:
    return await airtable.create(data)

async def update_airtable(airtable: AirtableService, id: str, data: Dict[str, Any]) -> Dict[str, Any]:
    return await airtable.update(id, data)

async def delete_airtable(airtable: AirtableService, id: str) -> None:
    await airtable.delete(id)
