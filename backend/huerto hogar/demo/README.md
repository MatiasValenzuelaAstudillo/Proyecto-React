# vehiculos-service

Microservicio Spring Boot para gestionar vehículos y categorías. Usa Java 17, Spring Data JPA y MySQL/Aurora MySQL.

## Requisitos

- Java 17 o superior
- Maven Wrapper incluido
- MySQL local o endpoint de Aurora MySQL

## Configuración

Copia `.env.example` como referencia y exporta las variables antes de iniciar la aplicación:

```bash
export DB_URL='jdbc:mysql://localhost:3306/vehiculos'
export DB_USERNAME='app_user'
export DB_PASSWORD='cambia-esta-clave'
export DDL_AUTO='update'
```

En producción se recomienda `DDL_AUTO=validate` y usar migraciones con Flyway o Liquibase.

## Ejecución

```bash
./mvnw clean test
./mvnw spring-boot:run
```

La aplicación inicia en `http://localhost:8080`.

Swagger está disponible en:

```text
http://localhost:8080/doc/swagger-ui.html
```

## Endpoints

### Categorías

```http
GET    /api/categorias
GET    /api/categorias/{id}
POST   /api/categorias
PUT    /api/categorias/{id}
DELETE /api/categorias/{id}
```

Ejemplo:

```json
{
  "nombreCategoria": "Sedán"
}
```

### Vehículos

```http
GET    /api/vehiculos
GET    /api/vehiculos/{id}
POST   /api/vehiculos
PUT    /api/vehiculos/{id}
DELETE /api/vehiculos/{id}
```

Ejemplo:

```json
{
  "patente": "AB123CD",
  "color": "Rojo",
  "idCategoria": 1
}
```

## Nota de seguridad

No guardar contraseñas en `application.properties`, Git ni archivos `.env` que se suban al repositorio. En AWS, usar Secrets Manager o Parameter Store y permitir el acceso a Aurora únicamente desde el security group de la instancia o servicio de aplicación.
