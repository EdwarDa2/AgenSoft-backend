import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { RegistrarUsuarioDTO, LoginDTO, ActualizarUsuarioDTO, LoginResponseDTO, CambiarPasswordDTO } from '../../model/dto/usuario.dto.js';
import type { UsuarioResponseDTO } from '../../model/entity/usuario.entity.js';
import { UsuarioRepository } from '../../repository/usuario.repository.js';
import { UsuarioMapper } from '../../mapper/usuario.mapper.js';
import type { IUsuarioService } from '../usuario.service.js';

/**
 * Implementación: UsuarioServiceImpl
 * Contiene la lógica de negocio para gestión de usuarios
 * Buena práctica: Separar lógica de BD (Repository) de lógica de negocio (Service)
 */
export class UsuarioServiceImpl implements IUsuarioService {
  private usuarioRepository = new UsuarioRepository();

  /**
   * Registra un nuevo usuario
   * Validaciones:
   * - Email debe ser único
   * - Password se encripta antes de guardar
   * - rol_id debe ser válido
   */
  async registrar(dto: RegistrarUsuarioDTO): Promise<UsuarioResponseDTO> {
    // Validaciones básicas
    if (!dto.nombre || !dto.email || !dto.password || !dto.rol_id) {
      throw new Error('Nombre, email, contraseña y rol son requeridos');
    }

    // Email válido
    if (!this.esEmailValido(dto.email)) {
      throw new Error('El email no es válido');
    }

    // Contraseña suficientemente fuerte (mínimo 6 caracteres)
    if (dto.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // Verificar si el email ya existe
    const emailExiste = await this.usuarioRepository.existeEmail(dto.email);
    if (emailExiste) {
      throw new Error('El email ya está registrado');
    }

    // Encriptar contraseña
    const saltRounds = 10;
    const passwordEncriptada = await bcrypt.hash(dto.password, saltRounds);

    // Crear usuario
    const usuario = await this.usuarioRepository.crear({
      nombre: dto.nombre,
      email: dto.email,
      password: passwordEncriptada,
      rol_id: dto.rol_id,
    });

    return UsuarioMapper.toResponseDTO(usuario);
  }

  /**
   * Autentica un usuario
   * Validaciones:
   * - Email debe existir
   * - Password debe coincidir
   */
  async login(dto: LoginDTO): Promise<LoginResponseDTO> {
    // Validaciones básicas
    if (!dto.email || !dto.password) {
      throw new Error('Email y contraseña son requeridos');
    }

    // Obtener usuario por email
    const usuario = await this.usuarioRepository.obtenerPorEmail(dto.email);
    if (!usuario) {
      console.log(`Login fallido: Usuario no encontrado para email ${dto.email}`);
      throw new Error('Email o contraseña incorrectos');
    }

    // Verificar contraseña
    const passwordValida = await bcrypt.compare(dto.password, usuario.password);
    if (!passwordValida) {
      console.log(`Login fallido: Contraseña incorrecta para email ${dto.email}`);
      throw new Error('Email o contraseña incorrectos');
    }

    // Generar Token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol.nombre },
      process.env.JWT_SECRET || 'secret_fallback',
      { expiresIn: '24h' }
    );

    // Retornar datos del usuario (sin password) y el token
    return {
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol.nombre.toLowerCase(),
      },
      token: token
    };
  }

  /**
   * Obtiene un usuario por ID
   */
  async obtenerPorId(id: number): Promise<UsuarioResponseDTO> {
    if (!id || id <= 0) {
      throw new Error('ID de usuario inválido');
    }

    const usuario = await this.usuarioRepository.obtenerPorId(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    return UsuarioMapper.toResponseDTO(usuario);
  }

  /**
   * Obtiene todos los usuarios (con paginación)
   */
  async obtenerTodos(skip: number = 0, take: number = 10): Promise<UsuarioResponseDTO[]> {
    // Validar paginación
    if (skip < 0) skip = 0;
    if (take < 1 || take > 100) take = 10;

    const usuarios = await this.usuarioRepository.obtenerTodos(skip, take);
    return UsuarioMapper.toResponseDTOs(usuarios);
  }

  /**
   * Obtiene usuarios por rol
   */
  async obtenerPorRol(rol_id: number): Promise<UsuarioResponseDTO[]> {
    if (!rol_id || rol_id <= 0) {
      throw new Error('ID de rol inválido');
    }

    const usuarios = await this.usuarioRepository.obtenerPorRol(rol_id);
    return UsuarioMapper.toResponseDTOs(usuarios);
  }

  /**
   * Actualiza los datos de un usuario
   * Solo puede actualizar: nombre, email, password
   */
  async actualizar(id: number, dto: ActualizarUsuarioDTO): Promise<UsuarioResponseDTO> {
    if (!id || id <= 0) {
      throw new Error('ID de usuario inválido');
    }

    // Verificar que el usuario existe
    const usuarioExistente = await this.usuarioRepository.obtenerPorId(id);
    if (!usuarioExistente) {
      throw new Error('Usuario no encontrado');
    }

    const datosActualizacion: any = {};

    // Validar y agregar nombre
    if (dto.nombre !== undefined) {
      if (dto.nombre.trim().length === 0) {
        throw new Error('El nombre no puede estar vacío');
      }
      datosActualizacion.nombre = dto.nombre;
    }

    // Validar y agregar email
    if (dto.email !== undefined) {
      if (!this.esEmailValido(dto.email)) {
        throw new Error('El email no es válido');
      }
      // Verificar que no exista otro usuario con ese email
      if (dto.email !== usuarioExistente.email) {
        const emailExiste = await this.usuarioRepository.existeEmail(dto.email);
        if (emailExiste) {
          throw new Error('El email ya está registrado');
        }
      }
      datosActualizacion.email = dto.email;
    }

    // Validar y agregar password
    if (dto.password !== undefined) {
      if (dto.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }
      const saltRounds = 10;
      datosActualizacion.password = await bcrypt.hash(dto.password, saltRounds);
    }

    // Si no hay datos para actualizar, retornar usuario actual
    if (Object.keys(datosActualizacion).length === 0) {
      return UsuarioMapper.toResponseDTO(usuarioExistente);
    }

    const usuarioActualizado = await this.usuarioRepository.actualizar(id, datosActualizacion);
    return UsuarioMapper.toResponseDTO(usuarioActualizado);
  }

  /**
   * Elimina un usuario
   */
  async eliminar(id: number): Promise<void> {
    if (!id || id <= 0) {
      throw new Error('ID de usuario inválido');
    }

    const usuario = await this.usuarioRepository.obtenerPorId(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    await this.usuarioRepository.eliminar(id);
  }

  /**
   * Cambia la contraseña de un usuario
   * Requiere la contraseña actual para verificación
   */
  async cambiarPassword(id: number, dto: CambiarPasswordDTO): Promise<void> {
    if (!id || id <= 0) {
      throw new Error('ID de usuario inválido');
    }

    if (!dto.password_actual || !dto.password_nueva) {
      throw new Error('Las contraseñas actual y nueva son requeridas');
    }

    // Obtener usuario
    const usuario = await this.usuarioRepository.obtenerPorId(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    // Verificar contraseña actual
    const passwordValida = await bcrypt.compare(dto.password_actual, usuario.password);
    if (!passwordValida) {
      throw new Error('La contraseña actual es incorrecta');
    }

    // Validar nueva contraseña
    if (dto.password_nueva.length < 6) {
      throw new Error('La nueva contraseña debe tener al menos 6 caracteres');
    }

    // Encriptar y guardar
    const saltRounds = 10;
    const passwordEncriptada = await bcrypt.hash(dto.password_nueva, saltRounds);

    await this.usuarioRepository.actualizar(id, {
      password: passwordEncriptada,
    });
  }

  /**
   * Valida formato de email
   */
  private esEmailValido(email: string): boolean {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  }
}
