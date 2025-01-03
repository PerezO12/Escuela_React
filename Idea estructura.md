/src
  /api                # Llamadas a la API backend
    auth.js           # Servicios de autenticación
    estudiantes.js    # Llamadas relacionadas a estudiantes
    formularios.js    # Llamadas relacionadas a formularios
    encargados.js     # Llamadas relacionadas a encargados
  /components         # Componentes reutilizables (dumb components)
    /Button           # Botones reutilizables
      Button.js
      Button.css
    /FormInput        # Inputs de formularios
      FormInput.js
      FormInput.css
  /features           # Funcionalidades específicas (smart components)
    /Estudiantes
      EstudiantesPage.js  # Página de estudiantes
      EstudianteForm.js   # Formulario de creación/edición de estudiantes
    /Encargados
      EncargadosPage.js   # Página para encargados
      EncargadoForm.js    # Gestión de encargados
    /Formularios
      FormulariosPage.js  # Página de formularios
      FormularioDetalle.js # Detalle de un formulario
  /context            # Contextos globales (para compartir estados entre componentes)
    AuthContext.js    # Contexto de autenticación
    UserContext.js    # Contexto de usuarios
  /hooks              # Hooks personalizados
    useAuth.js        # Hook para manejar autenticación
    useForm.js        # Hook para manejar lógica de formularios
  /layouts            # Layouts para organizar las páginas
    MainLayout.js     # Layout principal con navegación
    AuthLayout.js     # Layout para páginas de login/register
  /pages              # Páginas principales
    HomePage.js       # Página de inicio
    LoginPage.js      # Página de login
    RegisterPage.js   # Página de registro
    DashboardPage.js  # Página principal después de login
  /routes             # Configuración de rutas
    AppRoutes.js      # Definición de rutas principales
    PrivateRoute.js   # Ruta protegida por autenticación
  /styles             # Estilos globales
    variables.css     # Variables CSS globales (colores, fuentes, etc.)
    global.css        # Estilos generales
  /utils              # Utilidades y funciones genéricas
    validators.js     # Validaciones de datos
    hashHelper.js     # Utilidad para calcular el hash SHA256
  /assets             # Recursos estáticos (imágenes, íconos, etc.)
    /images           # Imágenes usadas en el proyecto
    /icons            # Íconos personalizados
  index.js            # Punto de entrada de React
  App.js              # Componente raíz
