# Hola Mundo - Docker + Node.js + MySQL

Aplicación web de demostración que integra Node.js, Express y MySQL utilizando Docker Compose.

## Información del Proyecto

- **Asignatura:** Electiva 2
- **Profesor:** Elvys Cruz
- **Estudiante:** Wilmar Gómez de la Cruz
- **Matrícula:** 2024-0103

## Características

- Servidor web Node.js con Express
- Base de datos MySQL 8.0
- Interfaz web con diseño moderno estilo neón
- Contador de visitas almacenado en MySQL
- Arquitectura multi-contenedor con Docker Compose
- Reinicio automático de servicios
- Health checks para MySQL

## Estructura del Proyecto

```
hola-mundo-docker/
├── src/
│   ├── server.js           # Servidor Express
│   ├── package.json        # Dependencias Node.js
│   ├── Dockerfile          # Imagen de la aplicación
│   └── public/
│       └── index.html      # Interfaz web
├── docker-compose.yml      # Configuración de servicios
├── .gitignore
└── README.md
```

## Requisitos Previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado
- Docker Compose (incluido en Docker Desktop)

## Instalación y Uso

### Opción 1: Docker Compose (Recomendado)

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd hola-mundo-docker

# Iniciar los contenedores
docker compose up -d --build

# Ver logs
docker compose logs -f

# Detener los contenedores
docker compose down
```

### Opción 2: PowerShell (Windows)

```powershell
# Navegar al directorio del proyecto
cd hola-mundo-docker

# Ejecutar Docker Compose
docker compose up -d --build
```

### Verificar la Aplicación

1. Espera 30 segundos a que MySQL inicie completamente
2. Abre tu navegador en: [http://localhost:3000](http://localhost:3000)
3. Deberías ver la página "HOLA MUNDO" con el contador de visitas

## Servicios

### Aplicación Node.js
- **Puerto:** 3000
- **Contenedor:** `hola-mundo-app`
- **Imagen:** Node.js 18 Alpine

### Base de Datos MySQL
- **Puerto:** 3306
- **Contenedor:** `hola-mundo-mysql`
- **Imagen:** MySQL 8.0
- **Base de datos:** `hola_mundo_db`
- **Usuario:** root
- **Contraseña:** rootpassword

## API Endpoints

### GET /api/status

Verifica el estado de la conexión a MySQL y registra una visita.

**Respuesta exitosa:**
```json
{
  "status": "success",
  "message": "Conexión a MySQL exitosa",
  "database": "hola_mundo_db",
  "totalVisitas": 42
}
```

## Comandos Útiles

```bash
# Ver contenedores en ejecución
docker ps

# Ver logs de un servicio específico
docker compose logs app
docker compose logs mysql

# Reiniciar servicios
docker compose restart

# Eliminar todo (contenedores y volúmenes)
docker compose down -v

# Reconstruir imágenes
docker compose build --no-cache
```

## Solución de Problemas

### El servidor no conecta a MySQL
- Espera 30 segundos, MySQL tarda en inicializar
- Verifica los logs: `docker compose logs mysql`

### Puerto 3000 ya en uso
- Cambia el puerto en `docker-compose.yml`: `"NUEVO_PUERTO:3000"`

### Errores de permisos en Windows
- Ejecuta PowerShell o CMD como Administrador

## Tecnologías Utilizadas

- **Node.js** 18 - Runtime de JavaScript
- **Express** 4 - Framework web
- **MySQL** 8.0 - Base de datos relacional
- **Docker** - Contenedorización
- **Docker Compose** - Orquestación de contenedores

## Licencia

Este proyecto es con fines educativos.
