import { 
  Injectable, 
  ConflictException, 
  UnauthorizedException 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * REGISTRO DE USUARIO
   * 1. Verifica que el email no exista
   * 2. Hashea la contraseña
   * 3. Crea el usuario
   * 4. Retorna usuario sin contraseña
   */
  async register(registerDto: RegisterDto) {
    // 1. Verificar que el email no exista
    const existingUser = this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // 2. Hashear la contraseña (10 rondas de hashing)
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // 3. Crear el usuario con la contraseña hasheada
    const newUser = this.usersService.create({
      nombre: registerDto.nombre,
      email: registerDto.email,
      password: hashedPassword,
    });

    // 4. Retornar usuario sin contraseña
    const { password, ...user } = newUser;
    return {
      message: 'Usuario registrado exitosamente',
      user,
    };
  }

  /**
   * LOGIN DE USUARIO
   * 1. Busca usuario por email
   * 2. Verifica contraseña
   * 3. Genera token JWT
   * 4. Retorna token y datos del usuario
   */
  async login(loginDto: LoginDto) {
    // 1. Buscar usuario por email
    const user = this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 2. Verificar contraseña
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Generar token JWT
    const payload = {
      sub: user.id,
      email: user.email,
      nombre: user.nombre,
    };
    const access_token = this.jwtService.sign(payload);

    // 4. Retornar token y datos del usuario
    const { password, ...userWithoutPassword } = user;
    return {
      message: 'Login exitoso',
      access_token,
      user: userWithoutPassword,
    };
  }

  /**
   * OBTENER PERFIL
   * Retorna información del usuario autenticado
   */
  getProfile(userId: number) {
    const user = this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
