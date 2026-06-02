# 🐾 PawSpa — Sistema de Citas para Servicios de Grooming

Aplicación web full-stack para la gestión de **citas de grooming (peluquería y cuidado de mascotas)**. Permite a los clientes reservar, consultar, actualizar y cancelar citas para los servicios disponibles, mientras que el negocio administra su catálogo de servicios, mascotas y agenda desde una interfaz moderna y responsiva.

> Proyecto Programado — Curso **IF0006 · Desarrollo de Software III** · Universidad de Costa Rica · 2026-S1

<p align="center">
  <img src="https://img.shields.io/badge/Java-17-007396?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java 17" />
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white" alt="Hibernate" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white" alt="Maven" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Lucide-F56565?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white" alt="Jira" />
  <img src="https://img.shields.io/badge/Cypress-69D3A7?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

## 📋 Descripción

El sistema digitaliza el flujo de reservas de una barbería/spa para mascotas. El cliente puede:

- Explorar los **servicios** ofrecidos (baño, corte, uñas, paquetes, etc.) con su precio y duración.
- Registrar a sus **mascotas** y ver su historial.
- Agendar una **cita** seleccionando servicio, mascota, fecha y hora.
- Consultar, reprogramar (PUT) o cancelar (DELETE) sus citas.

Toda la información mostrada, registrada, actualizada o eliminada proviene **directamente de la base de datos** a través del backend, no de datos estáticos.

---

## 🧩 Modelo de datos (mínimo 3 tablas)

| Tabla        | Descripción                                              |
|--------------|----------------------------------------------------------|
| `users`      | Clientes del negocio (dueños de las mascotas).           |
| `pets`       | Mascotas asociadas a un cliente.                         |
| `services`   | Catálogo de servicios de grooming (nombre, precio, duración). |
| `appointments` | Citas que relacionan cliente, mascota y servicio en una fecha/hora. |

Cada entidad expone un `resourceId` (UUID público) para no exponer las llaves primarias internas.

---

## 🏗️ Arquitectura

El backend mantiene una arquitectura por capas, separando responsabilidades:

```
Cliente (React)
      │  HTTP / REST
      ▼
Controller  →  Facade  →  Service  →  Mapper (DTO ↔ Entity)  →  Repository
                                                                    │
                                                              Hibernate / JPA
                                                                    │
                                                              PostgreSQL
```

| Capa        | Responsabilidad                                            |
|-------------|------------------------------------------------------------|
| **Entity**     | Mapeo de las tablas de la base de datos.                |
| **Repository** | Acceso a datos vía Spring Data JPA.                     |
| **Service**    | Lógica de negocio y validaciones.                       |
| **Facade**     | Coordinación entre servicios y mapeo de DTOs.           |
| **Controller** | Exposición de los endpoints REST.                       |

---

## 🛠️ Stack Tecnológico

### Backend
- **Java 17**
- **Spring Boot** (Spring Web MVC, Spring Data JPA, Bean Validation)
- **Hibernate** como ORM
- **PostgreSQL** como gestor de base de datos
- **Lombok**
- **Maven** como gestor de dependencias

### Frontend
- **React 19** + **TypeScript**
- **Vite** como build tool
- **React Router DOM** para la navegación
- **Tailwind CSS 4** para los estilos
- **Framer Motion** para animaciones
- **Lucide React** para los iconos SVG
- Estilo visual basado en **Glassmorphism** (ver [STYLE.md](STYLE.md))

### Herramientas y DevOps
- **Git / GitHub** — control de versiones (branch principal + ramas + Pull Requests)
- **Jira** — gestión del backlog e historias de usuario
- **Cypress** — pruebas End-to-End (E2E)
- **Docker** — contenerización
- **DBeaver** — administración de la base de datos
- **Vercel** — despliegue del frontend

---

## 🌐 API REST

Operaciones CRUD expuestas (base: `/api`):

| Método   | Endpoint                          | Descripción                       |
|----------|-----------------------------------|-----------------------------------|
| `GET`    | `/api/services`                   | Listar servicios.                 |
| `POST`   | `/api/appointments`               | Crear una cita.                   |
| `GET`    | `/api/appointments`               | Listar citas.                     |
| `PUT`    | `/api/appointments/{resourceId}`  | Reprogramar una cita.             |
| `DELETE` | `/api/appointments/{resourceId}`  | Cancelar una cita.                |

> Se implementan como mínimo tres de las cuatro operaciones (GET, POST, PUT, DELETE).

---

## 📱 Pantallas (Frontend — Mobile First)

- **Home** — bienvenida al cliente y accesos rápidos a las pantallas.
- **Header** (obligatorio) — logo clickeable hacia Home, menú de navegación fijo, presente en todas las páginas.
- **Footer** (obligatorio) — derechos reservados y redes sociales.
- **Servicios** — catálogo de servicios de grooming.
- **Citas** — listar, agendar, reprogramar y cancelar citas.
- **Mascotas** — gestión de las mascotas del cliente.

---

## 🚀 Cómo ejecutar el proyecto

### Requisitos previos
- Java 17+
- Node.js 18+
- PostgreSQL en ejecución

### Backend
```bash
cd backend
./mvnw spring-boot:run
```
El backend se levanta en `http://localhost:8080`.

> Configura tus credenciales de base de datos en `backend/src/main/resources/application-local.properties`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
El frontend se levanta en `http://localhost:5173`.

---

## ✅ Pruebas E2E (Cypress)

```bash
cd frontend
npx cypress open    # modo interactivo
npx cypress run     # modo headless
```
Se implementan como mínimo **6 pruebas E2E**, cada una validando un flujo completo de la aplicación.

---

## 🔗 Enlaces

- **Aplicación en producción (Vercel):** _pendiente_
- **Tablero de Jira:** _pendiente_
- **Repositorio:** _pendiente_

---

## 👥 Integrantes

- **Keylor Barrantes Gómez**
- **Sebastián Marín Fernández**
- **Alexis Rivera González**
- **Juan Pablo Jiménez**

---

© 2026 PawSpa — Aplicación Web. Todos los derechos reservados.
