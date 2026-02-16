from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum


class TaskStatus(str, Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"
    cancelled = "cancelled"


class TaskPriority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


@dataclass(slots=True)
class Task:
    id: int
    title: str
    description: str
    status: TaskStatus
    priority: TaskPriority
    owner: str
    tags: list[str] = field(default_factory=list)
    due_date: datetime | None = None
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)
