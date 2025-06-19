# Tremere

Tremere is a **NestJS-based backend** using **Prisma ORM**, **JWT authentication**, and **Socket.IO** for real-time chat. It follows a modular and maintainable structure with DTOs, Swagger, and guards for secure, scalable APIs.

---

## Technologies Used

| Technology            | Purpose                               |
| --------------------- | ------------------------------------- |
| **NestJS**            | Main backend framework                |
| **Prisma**            | Type-safe ORM for PostgreSQL          |
| **JWT**               | Authentication strategy               |
| **Socket.IO**         | Real-time bidirectional communication |
| **Swagger**           | API documentation                     |
| **Docker**            | Containerization support              |
| **Class-validator**   | DTO validation                        |
| **Class-transformer** | DTO conversion & serialization        |

---

## Project Structure

```
src/
│
├── auth/           # Auth module: login, JWT, guards
├── chat/           # Chat module: message service, gateway
├── user/           # User module: user profile & queries
├── dtos/           # Shared Data Transfer Objects
├── prisma/         # PrismaService + client injection
├── main.ts         # App bootstrap with global pipes
├── app.module.ts   # Root application module
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/khangzxrr/tremere
cd tremere
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file:

```env
JWT_SECRET=your_secret_key

POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=tremere

DATABASE_URL="postgresql://admin:admin@localhost:5432/tremere?schema=public"
```

### 4. Start Database Server

```bash
docker-compose up -d
```

### 5. Run Prisma migrations

```bash
npx prisma migrate dev
npx prisma generate
```

### 6. Start the server

```bash
npm run start:dev
```

---

## 📡 Swagger API Docs

Once the server is running, visit:

```
http://localhost:3000/swagger
```

---

## 🔐 Authentication

- Login with `/auth/login`
- Use the returned JWT token in Swagger with **Authorize → Bearer Token**
- `@UseGuards(JwtGuard)` is applied to protected routes

---

## 💬 Real-Time Chat

- Connect via Socket.IO with JWT token (via query param)
- Emit `message:send`, receive `message:receive`

Example:

```ts
const socket = io('http://localhost:3000', { query: { token: '...' } });
socket.emit('message:send', { receiverId: 2, content: 'Hi!' });
```

