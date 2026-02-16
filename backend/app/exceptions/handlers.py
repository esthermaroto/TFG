from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.exceptions.custom import TaskNotFoundError


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(TaskNotFoundError)
    async def task_not_found_handler(request: Request, exc: TaskNotFoundError):
        return JSONResponse(
            status_code=404,
            content={
                "detail": "Tarea no encontrada",
                "task_id": exc.task_id,
                "path": str(request.url.path),
            },
        )
