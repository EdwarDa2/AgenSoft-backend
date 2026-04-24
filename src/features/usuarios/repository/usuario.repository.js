import prisma from '../../../config/prisma.js';
/**
 * Repository: Capa de acceso a datos para Usuarios
 * Buena práctica: Abstrae la lógica de BD, facilita testing
 */
export class UsuarioRepository {
    /**
     * Crea un nuevo usuario
     */
    async crear(datos) {
        const usuario = await prisma.usuario.create({
            data: {
                nombre: datos.nombre,
                email: datos.email,
                password: datos.password,
                rol_id: datos.rol_id,
            },
        });
        return usuario;
    }
    /**
     * Obtiene un usuario por ID
     */
    async obtenerPorId(id) {
        const usuario = await prisma.usuario.findUnique({
            where: { id },
        });
        return usuario;
    }
    /**
     * Obtiene un usuario por email
     * Útil para login y validaciones de unicidad
     */
    async obtenerPorEmail(email) {
        const usuario = await prisma.usuario.findUnique({
            where: { email },
            include: { rol: true }
        });
        return usuario;
    }
    /**
     * Obtiene todos los usuarios
     */
    async obtenerTodos(skip = 0, take = 10) {
        const usuarios = await prisma.usuario.findMany({
            skip,
            take,
            orderBy: { creado_en: 'desc' },
        });
        return usuarios;
    }
    /**
     * Obtiene usuarios por rol
     */
    async obtenerPorRol(rol_id) {
        const usuarios = await prisma.usuario.findMany({
            where: { rol_id },
            orderBy: { creado_en: 'desc' },
        });
        return usuarios;
    }
    /**
     * Actualiza un usuario
     */
    async actualizar(id, datos) {
        const usuario = await prisma.usuario.update({
            where: { id },
            data: {
                ...(datos.nombre && { nombre: datos.nombre }),
                ...(datos.email && { email: datos.email }),
                ...(datos.password && { password: datos.password }),
            },
        });
        return usuario;
    }
    /**
     * Elimina un usuario (borrado lógico sería mejor para producción)
     */
    async eliminar(id) {
        const usuario = await prisma.usuario.delete({
            where: { id },
        });
        return usuario;
    }
    /**
     * Verifica si un email ya existe
     */
    async existeEmail(email) {
        const usuario = await prisma.usuario.findUnique({
            where: { email },
        });
        return usuario !== null;
    }
    /**
     * Obtiene el total de usuarios
     */
    async obtenerTotal() {
        return await prisma.usuario.count();
    }
}
//# sourceMappingURL=usuario.repository.js.map