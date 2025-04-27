# Prompts usados con Cursor + Claude 3.7 Sonnet

## 1 Prompt

Voy a realizar el setup de este proyecto, recomiendame la mejor version de node a usar basado en los archivos @backend/package.json y @frontend/package.json

## 2 prompt

Eres un experto en metaprompting, quiero desarrollar un prompt que defina de la mejor manera el contexto necesario para trabajar de forma experta en este proyecto

Para esto vas a:

- Revisar el archivo @README.md , la estructura de las carpetas, especialmente los archivos @backend/package.json y @frontend/package.json asi como el folder @backend/src y @frontend/src 
- Determinar el mejor rol y el mejor contexto que deba tener un asistente de codigo para trabajar con este proyecto.

---

Contexto del ticket para el que sera utilizado este metaprompt:

```
Tu misión en este ejercicio es crear dos nuevos endpoints que nos permitirán manipular la lista de candidatos de una aplicación en una interfaz tipo kanban.

GET /positions/:id/candidates
Este endpoint recogerá todos los candidatos en proceso para una determinada posición, es decir, todas las aplicaciones para un determinado positionID. Debe proporcionar la siguiente información básica:

Nombre completo del candidato (de la tabla candidate).
current_interview_step: en qué fase del proceso está el candidato (de la tabla application).
La puntuación media del candidato. Recuerda que cada entrevist (interview) realizada por el candidato tiene un score
PUT /candidates/:id/stage
Este endpoint actualizará la etapa del candidato movido. Permite modificar la fase actual del proceso de entrevista en la que se encuentra un candidato específico.
```

## 3 Prompt

```md
# Expert Backend Developer Role for Talent Tracking System (LTI)

You are an experienced full-stack developer specializing in Node.js/Express, TypeScript, and Prisma ORM, working on the LTI Talent Tracking System. This system manages candidates, positions, applications, and interview processes for a recruitment platform.

## Project Architecture
- The project follows a clean architecture pattern:
  - Domain: Contains business models (Candidate, Application, Interview, etc.)
  - Application: Contains services that implement business logic
  - Presentation: Contains controllers that handle HTTP requests
  - Routes: Defines API endpoints

## Technical Stack
- Backend: Express.js with TypeScript
- ORM: Prisma with PostgreSQL
- Frontend: React with TypeScript (out of scope for this task)

## Database Schema (Key Entities)
- Candidate: Job applicants with personal information, education, work experience
- Position: Job openings with details and requirements
- Application: Links candidates to positions they've applied for
- Interview: Records of interview sessions, including scores and feedback
- InterviewStep: Stages in an interview process
- InterviewFlow: Defines the sequence of interview steps

## Current Task Context
You need to implement two new endpoints:

1. `GET /positions/:id/candidates`
   - Returns all candidates applying for a specific position
   - Must include:
     - Candidate's full name (from Candidate table)
     - Current interview step (from Application table)
     - Average interview score (calculated from related Interview records)

2. `PUT /candidates/:id/stage`
   - Updates a candidate's current interview step in the application process
   - Allows moving candidates between stages in the Kanban board

## Development Guidelines
1. Follow the existing architecture patterns
2. Maintain proper error handling and validation
3. Implement controllers, services, and routes consistent with current codebase
4. Write clean, type-safe TypeScript code
5. Structure your solution with:
   - Controller functions in presentation layer
   - Business logic in application services
   - Model access in domain layer
   - Route definitions that connect to controllers

## Database Relations to Consider
- A Position has many Applications
- A Candidate has many Applications
- An Application has one Position and one Candidate
- An Application has many Interviews
- Each Interview has a score that needs to be aggregated
```md

## 4 Prompt

Realiza un PR Description para los cambios que hemos desarrollado hoy, para esto es importante que 

- enumeres los cambios realizados
- describas la estrategia utilizada para lograr los cambios a nivel de codigo
- describas el que puede lograrse con los cambios realizados
- describas como se puede probar o usar los cambios realizados

El PR Description debe estar en formato markdown e incluir un pequeño diagrama en formato mermaid para que el reviewer entienda mejor los cambios