# Auth Taller NestJS 🔐

Proyecto de autenticación con JWT y Guards en NestJS para el taller de Desarrollo en Plataformas - PUCE.

![NestJS](https://img.shields.io/badge/NestJS-v10-red?style=flat-square)
![JWT](https://img.shields.io/badge/JWT-Authentication-blue?style=flat-square)
![Node](https://img.shields.io/badge/Node.js-v18+-green?style=flat-square)

---

## 🎯 Características

- ✅ Registro de usuarios con contraseñas hasheadas (bcrypt)
- ✅ Login con generación de tokens JWT
- ✅ Rutas protegidas con Guards
- ✅ Validación de datos con class-validator
- ✅ Autenticación Bearer Token
- ✅ Pruebas completas en Postman

---

## 📋 Requisitos

- Node.js v18+
- npm o yarn
- Postman (para pruebas)
- Git

---

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/di874/auth-taller-nestjs.git
cd auth-taller

# Instalar dependencias
npm install

# Compilar el proyecto
npm run build

# Iniciar el servidor
npm run start
```

El servidor correrá en **http://localhost:3001**

---

## 📚 Documentación Visual

### Paso 1: Configuración Inicial
![Paso 1](./images/1.png)

### Paso 2: CEnvironments
![Paso 2](./images/2.png)

### Paso 3: Crear Proyecto
![Paso 3](./images/3.png)

### Paso 4: Registro
![Paso 4](./images/4.png)

### Paso 5: login
![Paso 5](./images/5.png)

### Paso 6: Con token
![Paso 6](./images/6.png)

### Paso 7: sin token
![Paso 7](./images/7.png)

### Paso 8: Ruta Protegida
![Paso 8](./images/8.png)

### Paso 9: Email Duplicado
![Paso 9](./images/9.png)

### Paso 10: Email Invalido
![Paso 10](./images/10.png)

### Paso 11: Postman - RegistroCorto
![Paso 11](./images/11.png)

### Paso 13: Postman - Login Iniciales incorrectas
![Paso 13](./images/13.png)

### Paso 14: Verificación en JWT.io
![Paso 14](./images/14.png)

---

## 🧪 Pruebas con Postman

### Endpoints Disponibles

| # | Método | URL | Descripción |
|---|--------|-----|-----------|
| 1 | POST | `/auth/register` | Registro de nuevo usuario |
| 2 | POST | `/auth/login` | Inicio de sesión |
| 3 | GET | `/auth/profile` | Obtener perfil (protegido) |
| 4 | GET | `/auth/protected` | Ruta protegida ejemplo |
| 5 | GET | `/users` | Listar todos los usuarios |

### Flujo de Autenticación

1. **Registrarse**: POST `/auth/register`
   - Body: `{ nombre, email, password }`
   - Respuesta: Usuario creado

2. **Login**: POST `/auth/login`
   - Body: `{ email, password }`
   - Respuesta: `access_token` (JWT)

3. **Acceder a ruta protegida**: GET `/auth/profile`
   - Header: `Authorization: Bearer <token>`
   - Respuesta: Datos del usuario autenticado

---

## 📁 Estructura del Proyecto

```
auth-taller/
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── register.dto.ts       # Validación de registro
│   │   │   └── login.dto.ts          # Validación de login
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts     # Protege rutas
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts       # Valida tokens JWT
│   │   ├── auth.controller.ts        # Endpoints de auth
│   │   ├── auth.service.ts           # Lógica de autenticación
│   │   └── auth.module.ts            # Módulo de auth
│   ├── users/
│   │   ├── entities/
│   │   │   └── user.entity.ts        # Modelo de usuario
│   │   ├── users.controller.ts       # Endpoints de usuarios
│   │   ├── users.service.ts          # Servicio de usuarios
│   │   └── users.module.ts           # Módulo de usuarios
│   ├── app.module.ts                 # Módulo raíz
│   └── main.ts                       # Punto de entrada
├── package.json
├── tsconfig.json
├── README.md
└── images/                           # Documentación visual
    ├── imagen1.png
    ├── imagen2.png
    └── ...
```

---

## 🔐 Seguridad

### Consideraciones Importantes:

⚠️ **Desarrollo**: La clave JWT está hardcodeada por propósitos educativos.

🔒 **Producción**: Usa variables de entorno (.env):
```env
JWT_SECRET=tu_clave_super_secreta_aqui
JWT_EXPIRATION=24h
PORT=3001
```

---

## 🔑 Variables de Entorno (Producción)

Crea un archivo `.env` en la raíz:

```env
# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/auth_db

# JWT
JWT_SECRET=tu_clave_muy_secreta
JWT_EXPIRATION=24h

# Servidor
PORT=3001
NODE_ENV=production
```

---

## 📖 Conceptos Clave

### ¿Qué es JWT?

JWT (JSON Web Token) es un estándar para representar claims de forma segura entre dos partes.

**Estructura**: `header.payload.signature`

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoianVhbkB0ZXN0LmNvbSJ9.Sig...
```

### ¿Qué es un Guard?

Un Guard es un middleware que verifica si un usuario tiene permiso para acceder a una ruta.

```typescript
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) {
  // Solo usuarios autenticados llegan aquí
}
```

---

## 📚 Dependencias Principales

```json
{
  "@nestjs/common": "^10.0.0",
  "@nestjs/core": "^10.0.0",
  "@nestjs/jwt": "^11.0.0",
  "@nestjs/passport": "^10.0.0",
  "passport": "^0.7.0",
  "passport-jwt": "^4.0.1",
  "bcrypt": "^5.1.0",
  "class-validator": "^0.14.0",
  "class-transformer": "^0.5.1"
}
```

---

## 🧪 Pruebas Unitarias

```bash
# Ejecutar tests
npm run test

# Con coverage
npm run test:cov
```

---

## 🚀 Deploy

### En Heroku:
```bash
heroku create auth-taller-nestjs
git push heroku main
```

### En Vercel:
```bash
vercel --prod
```

---

## 📝 Notas de Desarrollo

- La base de datos está en memoria (array). Para producción, usar PostgreSQL o MongoDB.
- Los tokens expiran en 24 horas.
- Las contraseñas se hashean con bcrypt (10 rondas).

---

## 🤝 Contribuciones

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**di874** - [GitHub](https://github.com/di874)

Proyecto para el taller de Desarrollo en Plataformas - PUCE

---

## 🔗 Enlaces Útiles

- [NestJS Documentation](https://docs.nestjs.com)
- [JWT.io - Debugger](https://jwt.io)
- [Postman](https://www.postman.com)
- [bcrypt npm](https://www.npmjs.com/package/bcrypt)

---

## ❓ FAQ

### ¿Por qué me sale error 401?
El token es inválido, expiró o no se envió. Verifica que incluyas `Authorization: Bearer <token>`

### ¿Cómo cambio la contraseña?
Actualmente no hay endpoint. Puedes agregarlo como reto adicional.

### ¿Puedo conectar a una base de datos real?
Sí, usa TypeORM con PostgreSQL o MongoDB.

---

**¡Gracias por usar este proyecto!** 🎉

---

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
