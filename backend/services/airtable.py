import httpx
from typing import Any, List, Dict, Optional
from core.config import settings

class AirtableService:
    def __init__(self, table_name: str):
        self.base_url = f"https://api.airtable.com/v0/{settings.AIRTABLE_BDD}/{table_name}"
        self.headers = {
            "Authorization": f"Bearer {settings.AIRTABLE_KEY}",
            "Content-Type": "application/json"
        }

    async def get_all(self, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
            Récupère tous les instances de la table Airtable.
        """
        async with httpx.AsyncClient() as client:
            response = await client.get(
                self.base_url,
                headers=self.headers,
                params=params
            )
            if response.status_code == 200:
                return response.json()
            else:
                raise Exception(f"Error fetching records: {response.text}")

    async def get_by_id(self, record_id: str) -> Dict[str, Any]:
        """
            Récupère une instance par son ID.
        """
        url = f"{self.base_url}/{record_id}"
        async with httpx.AsyncClient() as client:
            response = await client.get(
                url,
                headers=self.headers
            )
            if response.status_code == 200:
                return response.json()
            else:
                raise Exception(f"Error fetching record by ID: {response.text}")

    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
            Crée une nouvel instance dans Airtable.
        """
        async with httpx.AsyncClient() as client:
            response = await client.post(
                self.base_url,
                headers=self.headers,
                json={"fields": data}
            )
            response.raise_for_status()
            return response.json()
            
    async def batch_create(self, records: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
            Crée plusieurs instances (Au maximum 10 qui est la limitation d'Airtable).
        """
        batch_datas = [
            {"fields": record} for record in records
        ]
        async with httpx.AsyncClient() as client:
            response = await client.post(
                self.base_url,
                headers=self.headers,
                json={"records": batch_datas}
            )
            response.raise_for_status()
            return response.json()

    async def update(self, record_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """
            Met à jour une instance existant.
        """
        url = f"{self.base_url}/{record_id}"
        async with httpx.AsyncClient() as client:
            response = await client.patch(
                url,
                headers=self.headers,
                json={"fields": data}
            )
            if response.status_code == 200:
                return response.json()
            else:
                raise Exception(f"Error updating record: {response.text}")

    async def delete(self, record_id: str) -> None:
        """
            Supprime une instance par son ID.
        """
        url = f"{self.base_url}/{record_id}"
        async with httpx.AsyncClient() as client:
            response = await client.delete(
                url,
                headers=self.headers
            )
            if response.status_code == 200:
                return None
            else:
                raise Exception(f"Error deleting record: {response.text}")
            
    async def batch_delete(self, records: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
            Supprime plusieurs instances (Au maximum 10 qui est la limitation d'Airtable).
        """
        record_ids = [record["id"] for record in records]
        params = [("records[]", rid) for rid in record_ids]
        async with httpx.AsyncClient() as client:
            response = await client.delete(
                self.base_url,
                headers=self.headers,
                params=params
            )
            if response.status_code == 200:
                return response.json()
            else:
                raise Exception(f"Error creating records: {response.text}")
