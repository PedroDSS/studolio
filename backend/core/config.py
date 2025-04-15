from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    AIRTABLE_KEY = os.getenv("AIRTABLE_KEY")
    AIRTABLE_BDD = os.getenv("AIRTABLE_BDD")
    AIRTABLE_TECHNO = os.getenv("AIRTABLE_TECHNO")
    AIRTABLE_PROMO = os.getenv("AIRTABLE_PROMO")
    AIRTABLE_CATEGORIE = os.getenv("AIRTABLE_CATEGORIE")
    AIRTABLE_ETUDIANT = os.getenv("AIRTABLE_ETUDIANT")
    AIRTABLE_ADMIN = os.getenv("AIRTABLE_ADMIN")
    AIRTABLE_PROJET = os.getenv("AIRTABLE_PROJET")
    AIRTABLE_COMMENT = os.getenv("AIRTABLE_COMMENT")
    JWT_SECRET_ACCESS_TOKEN = os.getenv("JWT_SECRET_ACCESS_TOKEN")
    REACT_URL = os.getenv("REACT_URL")
    ALGORITHM = "HS256"

settings = Settings()