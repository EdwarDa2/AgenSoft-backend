# Feature Pacientes

Este módulo gestiona los perfiles de pacientes y su relación con `Usuario`.

Endpoints:
- POST `/api/v1/pacientes` - Crear paciente
- GET `/api/v1/pacientes` - Obtener todos
- GET `/api/v1/pacientes/:id` - Obtener por id
- GET `/api/v1/pacientes/usuario/:usuario_id` - Obtener por usuario
- PATCH `/api/v1/pacientes/:id` - Actualizar
- DELETE `/api/v1/pacientes/:id` - Eliminar

Próximos pasos:
- Integrar validaciones con middleware
- Añadir tests unitarios
