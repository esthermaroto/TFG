from functools import lru_cache

from app.services.task_service import TaskService


@lru_cache
def get_task_service() -> TaskService:
    return TaskService()
