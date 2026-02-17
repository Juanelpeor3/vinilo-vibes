# Proyecto Final

> **RECORDAD QUE LOS PORCENTAJES DE LOS RAs SON DEL TOTAL DEL MÓDULO**

### RA6. ACCESO A BD Y SEGURIDAD (15%) - 18 checks

#### 1. Sistema de Autenticación (7 checks)

**Registro de Usuarios**

* [x] 1\. Formulario de registro con: nombre, email, contraseña, confirmar contraseña
* [x] 2\. Validaciones básicas: email válido, contraseña mínimo 6 caracteres, contraseñas coinciden
* [ ] 3\. Registro exitoso genera JWT y redirige al dashboard

**Login de Usuarios**

* [x] 4\. Formulario de login con email y contraseña
* [x] 5\. Almacenamiento de JWT en LocalStorage

**Logout**

* [x] 6\. Botón de logout visible cuando usuario autenticado
* [x] 7\. Eliminar token y limpiar estado

***

#### 2. Autorización y Protección de Rutas (4 checks)

**Guards Implementados**

* [x] 8\. **AuthGuard**: Protege rutas privadas (/dashboard, /lista)
* [x] 9\. **AuthGuard**: Redirige a /login si usuario no autenticado
* [x] 10\. **RoleGuard**: Diferencia permisos entre admin y usuario
  * Admin: puede editar y eliminar
  * Usuario: solo puede consultar y crear
* [x] 11\. Página **404 Not Found** para rutas inexistentes

***

#### 3. Operaciones CRUD Completas (7 checks)

**Entidad a gestionar**: Elegir una entidad según tu API (ejemplos: productos, tareas, posts, películas, etc.)

**Read (Leer/Consultar)**

* [x] 12\. **Listado completo**: Página con todos los registros
* [x] 13\. **Vista de detalle**: Página individual de cada registro

**Create (Crear)**

* [x] 14\. Formulario de creación con validaciones básicas
* [x] 15\. Solo usuarios autenticados pueden crear

**Update (Actualizar)**

* [x] 16\. Formulario de edición pre-rellenado (solo admin puede editar)

**Delete (Eliminar)**

* [x] 17\. Solo administradores pueden eliminar
* [x] 18\. Confirmación antes de eliminar

***

### RA7. Documentación de APIs (5%) - 2 checks

* [x] 19\. **README completo** con:
  * Descripción del proyecto
  * Instrucciones de instalación (`npm install`, `ng serve`)
  * Variables de entorno necesarias
  * Cuentas de prueba (usuario y admin)
  * URL de despliegue
* [x] 20\. **TSDoc** en servicios principales (AuthService, EntityService) y guards

***

### RA8. Frameworks avanzados, concurrencia y programación reactiva (15%) - 14 checks

#### 4. Interfaz de Usuario (8 checks)

**Navegación**

* [ ] 21\. **Navbar** con navegación dinámica según estado de autenticación:
  * Logo/nombre de la aplicación
  * Enlaces públicos (Home)
  * Enlaces privados (Dashboard, Lista) si autenticado
  * Botón Login/Registro o Logout según estado

**Páginas Públicas**

* [x] 22\. **Home**: Página de bienvenida
* [x] 23\. **Login**: Formulario de acceso
* [x] 24\. **Registro**: Formulario de registro

**Páginas Privadas**

* [x] 25\. **Dashboard**: Panel principal (protegido por AuthGuard)
* [x] 26\. **Listado**: Todos los registros de la entidad
* [x] 27\. **Detalle**: Vista individual de un registro

**Páginas de Error**

* [x] 28\. **404 Not Found**: Página para rutas inexistentes

***

#### 5. Gestión de Estado y Servicios (6 checks)

**Feedback Visual**

* [x] 29\. **Loaders** durante peticiones HTTP (spinner o skeleton)
* [ ] 30\. **Mensajes de éxito/error** en operaciones CRUD

**Servicios Angular**

* [x] 31\. **AuthService** con métodos: `login()`, `register()`, `logout()`, `isAuthenticated()`
* [x] 32\. **\[Entidad]Service** con CRUD completo: `getAll()`, `getById()`, `create()`, `update()`, `delete()`

**Interceptores**

* [ ] 33\. **AuthInterceptor**: Añade token JWT automáticamente a todas las peticiones HTTP

**Estado Reactivo**

* [x] 34\. **Estado de autenticación reactivo** con Signals o Observables (navbar se actualiza automáticamente)

***

### RA9. Despliegue de aplicaciones (5%) - 4 checks

*Recordad que se evalúa 5% ahora y el resto (10%) se evalúa después de la FFE*

* [x] 35\. **Deploy funcional** en Vercel, Netlify, Render o Railway
* [x] 36\. **Variables de entorno** configuradas correctamente
* [x] 37\. **Aplicación accesible** vía URL pública (HTTPS)
* [x] 38\. **Credenciales de prueba** en README (usuario normal + admin)