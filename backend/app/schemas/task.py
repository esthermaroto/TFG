from datetime import datetime

from pydantic import BaseModel, Field, field_validator

from app.models.task import TaskPriority, TaskStatus


class TaskBase(BaseModel):
    title: str = Field(min_length=5, max_length=120)
    description: str = Field(min_length=10, max_length=1000)
    status: TaskStatus = TaskStatus.pending
    priority: TaskPriority = TaskPriority.medium
    owner: str = Field(min_length=3, max_length=60)
    tags: list[str] = Field(default_factory=list, max_length=8)
    due_date: datetime | None = None

    @field_validator("tags")
    @classmethod
    def validate_tags(cls, tags: list[str]) -> list[str]:
        cleaned = [tag.strip().lower() for tag in tags if tag.strip()]
        unique_tags = list(dict.fromkeys(cleaned))
        if any(len(tag) < 2 for tag in unique_tags):
            raise ValueError("Cada etiqueta debe tener al menos 2 caracteres")
        return unique_tags


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=5, max_length=120)
    description: str | None = Field(default=None, min_length=10, max_length=1000)
    status: TaskStatus | None = None
    priority: TaskPriority | None = None
    owner: str | None = Field(default=None, min_length=3, max_length=60)
    tags: list[str] | None = Field(default=None, max_length=8)
    due_date: datetime | None = None

    @field_validator("tags")
    @classmethod
    def validate_tags(cls, tags: list[str] | None) -> list[str] | None:
        if tags is None:
            return tags
        cleaned = [tag.strip().lower() for tag in tags if tag.strip()]
        unique_tags = list(dict.fromkeys(cleaned))
        if any(len(tag) < 2 for tag in unique_tags):
            raise ValueError("Cada etiqueta debe tener al menos 2 caracteres")
        return unique_tags


class TaskResponse(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime


class TaskFilterParams(BaseModel):
    status: TaskStatus | None = None
    priority: TaskPriority | None = None
    owner: str | None = Field(default=None, min_length=2)
    search: str | None = Field(default=None, min_length=2, max_length=100)
