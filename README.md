# SAFORTI WEB APP

## Instalación y Ejecución
Para iniciar la aplicación web de SAFORTI

- npm install
- npm run dev

## Estructura
La aplicación web de SAFORTI, esta constituida por paquetes de:

- Services: Que se comunican con los microservicios correspondientes para cada funcionalidad
- Hooks: Conjunto de metodos que se reutilizan a lo largo de todo el proyecto en sus diferentes flujos
- Context: Es donde se define y almacena el estado de los objetos necesarios de la aplicacion web
- Routes: Es donde se establecen las rutas publicas y privadas de la aplicación para diferenciar la autenticacion del usuario
- Reducers: Es el conjunto de archivos que definen la logica de como alterar el estado de los objetos de la aplicación
- Pages: Agrupa las principales pantallas de la aplicación web
- Components: Es el conjunto de elementos JSX que interactuan en las diferentes pantallas de acuerdo a los diferentes flujos establecidos