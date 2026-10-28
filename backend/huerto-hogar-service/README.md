# Huerto Hogar

Microservicio Spring Boot para el catálogo de **Huerto Hogar**, una tienda de frutas, verduras y productos de despensa. Conserva la estructura por capas del proyecto original: controladores, servicios, DTO, repositorios, entidades y manejo global de excepciones. Incluye además una interfaz web responsive servida desde `src/main/resources/static`.

## Requisitos

- Java 17 o superior
- Maven Wrapper incluido
- MySQL local o endpoint compatible con MySQL

## Configuración

Copia `.env.example` como referencia y exporta las variables antes de iniciar:

```bash
export DB_URL='jdbc:mysql://localhost:3306/huerto_hogar'
export DB_USERNAME='app_user'
export DB_PASSWORD='cambia-esta-clave'
export DDL_AUTO='update'
```

## Ejecución

```bash
./mvnw clean test
./mvnw spring-boot:run
```

La tienda queda disponible en `http://localhost:8080` y Swagger en `http://localhost:8080/doc/swagger-ui.html`.

## API REST

### Categorías

```http
GET    /api/categorias
GET    /api/categorias/{id}
POST   /api/categorias
PUT    /api/categorias/{id}
DELETE /api/categorias/{id}
```

Ejemplo: `{ "nombreCategoria": "Frutas" }`

### Productos

```http
GET    /api/productos
GET    /api/productos/{id}
POST   /api/productos
PUT    /api/productos/{id}
DELETE /api/productos/{id}
```

Ejemplo:

```json
{
  "nombreProducto": "Tomates cherry",
  "precio": 2490.00,
  "unidad": "bandeja 250 g",
  "stock": 24,
  "imagen": "🍅",
  "idCategoria": 2
}
```

La interfaz incluye datos visuales de respaldo para mostrar la experiencia incluso antes de cargar productos en la base de datos; cuando la API devuelve registros, los utiliza automáticamente.
