from fastapi import APIRouter, HTTPException, Query, status

from app.models.task import TaskPriority, TaskStatus
from app.schemas.task import TaskCreate, TaskFilterParams, TaskResponse, TaskUpdate
from app.services.task_service import service

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.get("", response_model=list[TaskResponse])
def list_tasks(
    status_filter: TaskStatus | None = Query(default=None, alias="status"),
    priority: TaskPriority | None = Query(default=None),
    owner: str | None = Query(default=None),
    search: str | None = Query(default=None),
):
    filters = TaskFilterParams(
        status=status_filter,
        priority=priority,
        owner=owner,
        search=search,
    )
    return service.list_tasks(filters)


@router.get("/{task_id}", response_model=TaskResponse)
def get_task(task_id: int):
    task = service.get_task(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return task


@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate):
    return service.create_task(payload)


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, payload: TaskUpdate):
    task = service.get_task(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return service.update_task(task, payload)


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int):
    task = service.get_task(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    service.delete_task(task)
