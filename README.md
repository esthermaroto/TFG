# TaskFlow Pro · Demo Full-Stack

TaskFlow Pro es una demo técnica full-stack con persistencia en memoria.

## Stack

- **Backend**: Python + FastAPI + Pydantic
- **Frontend**: React + Vite + TypeScript + TailwindCSS
- **Persistencia**: datos en memoria (sin base de datos)

## Estructura

```bash
.
├── backend
│   ├── app
│   │   ├── api/v1
│   │   ├── models
│   │   ├── schemas
│   │   └── services
│   └── requirements.txt
└── frontend
    ├── src
    │   ├── api
    │   ├── components
    │   ├── hooks
    │   ├── layouts
    │   ├── pages
    │   └── types
    └── package.json
```

## Backend (FastAPI)

Backend simplificado para funcionar con lo justo:
- API REST básica en memoria.
- Sin middleware personalizado.
- Sin consumo de APIs externas.
- Validaciones con Pydantic.
- Endpoints REST completos:
  - `GET /api/v1/tasks` con búsqueda/filtros
  - `GET /api/v1/tasks/{task_id}`
  - `POST /api/v1/tasks`
  - `PUT /api/v1/tasks/{task_id}`
  - `DELETE /api/v1/tasks/{task_id}`

### Ejecutar backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Documentación Swagger:
- http://localhost:8000/docs

## Frontend (React + Tailwind)

Características implementadas:
- Dashboard con métricas rápidas.
- Tabla de tareas con búsqueda y filtro dinámico por estado.
- Custom hook `useTasksApi` para llamadas HTTP.
- Componentes reutilizables (`TaskTable`, `TaskModal`, `StatusBadge`, `Toast`).
- Formularios controlados con validación frontend.
- Modal para crear/editar tareas.
- Estados de carga/error y feedback visual.

### Ejecutar frontend

```bash
cd frontend
npm install
npm run dev
```

App web:
- http://localhost:5173
