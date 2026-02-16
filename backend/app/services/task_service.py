from datetime import datetime

from app.models.task import Task, TaskPriority, TaskStatus
from app.schemas.task import TaskCreate, TaskFilterParams, TaskUpdate


class TaskService:
    def __init__(self):
        self._tasks: list[Task] = self._seed_data()
        self._last_id = len(self._tasks)

    def _seed_data(self) -> list[Task]:
        return [
            Task(
                id=1,
                title="Definir arquitectura inicial",
                description="Preparar la arquitectura backend/frontend para la demo técnica.",
                status=TaskStatus.completed,
                priority=TaskPriority.high,
                owner="Ana",
                tags=["backend", "frontend"],
            ),
            Task(
                id=2,
                title="Diseñar dashboard principal",
                description="Maquetar la vista principal con tabla, filtros y métricas rápidas.",
                status=TaskStatus.in_progress,
                priority=TaskPriority.medium,
                owner="Luis",
                tags=["ui", "dashboard"],
            ),
        ]

    def list_tasks(self, filters: TaskFilterParams) -> list[Task]:
        result = self._tasks

        if filters.status:
            result = [task for task in result if task.status == filters.status]
        if filters.priority:
            result = [task for task in result if task.priority == filters.priority]
        if filters.owner:
            owner = filters.owner.lower()
            result = [task for task in result if owner in task.owner.lower()]
        if filters.search:
            term = filters.search.lower()
            result = [
                task
                for task in result
                if term in task.title.lower()
                or term in task.description.lower()
                or any(term in tag for tag in task.tags)
            ]

        return sorted(result, key=lambda task: task.updated_at, reverse=True)

    def get_task(self, task_id: int) -> Task | None:
        return next((task for task in self._tasks if task.id == task_id), None)

    def create_task(self, payload: TaskCreate) -> Task:
        self._last_id += 1
        now = datetime.utcnow()

        task = Task(
            id=self._last_id,
            created_at=now,
            updated_at=now,
            **payload.model_dump(),
        )
        self._tasks.append(task)
        return task

    def update_task(self, task: Task, payload: TaskUpdate) -> Task:
        updates = payload.model_dump(exclude_unset=True)

        for field, value in updates.items():
            setattr(task, field, value)

        task.updated_at = datetime.utcnow()
        return task

    def delete_task(self, task: Task) -> None:
        self._tasks.remove(task)


service = TaskService()
