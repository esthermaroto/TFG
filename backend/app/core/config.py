from pydantic import BaseModel, Field


class Settings(BaseModel):
    PROJECT_NAME: str = "TaskFlow Pro API"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api/v1"
    ALLOWED_ORIGINS: list[str] = Field(
        default_factory=lambda: [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ]
    )


settings = Settings()
