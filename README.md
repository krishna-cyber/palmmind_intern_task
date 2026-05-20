# 💬️ PUBLIC CHAT
Global chat system for all registered users.

## FEATURES
1. Real time collabration using socket.io
2. Robust authentication using Better-auth
3. Good layout UI/UX with shadcn and tailwindcss

## Setup guide
Clone the repository. <br>
This project is two tier application .
# 1. Frontend 
### Technology highlights
Next.js, Better-auth, Chatcn, Shadcn, React Hook Form, Zod
 ### Setup environmental variable
 `cd frontend` <br>

 create a file `.env.local` at root of the frontend project
 ```env
BETTER_AUTH_SECRE=
NEXT_PUBLIC_BACKEND_URL=
 ```
 Install packages
 ```
 pnpm install
 ```
 Run development server
```
pnpm run dev
```
# 2. Backend
### Technology highlights
Socket.io , MongoDB, Better-Auth, JWT, Authorization
```
cd backend
```
Install packages
```
pnpm install
```
setup environmental variable, Create .env at root directory.
```env
PORT=
MONGO_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=# Base URL of your app
FRONTEND_URL=
```
Run development server
```bash
pnpm run dev
```

That's it , if any issues has arised please contact.
