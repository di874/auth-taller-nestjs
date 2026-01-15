export class User {
  id: number;              // ID único del usuario (generado automáticamente)
  nombre: string;          // Nombre completo del usuario
  email: string;           // Email único del usuario (debe ser válido)
  password: string;        // Contraseña hasheada con bcrypt (NUNCA en texto plano)
  createdAt: Date;         // Fecha de creación del usuario
}
