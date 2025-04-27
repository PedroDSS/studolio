from pydantic import BaseModel

class Login(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    token: str