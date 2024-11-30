# Manejador de Proyectos

Este proyecto es un **Manejador de Proyectos** diseñado para gestionar tareas, recursos y avances dentro de proyectos de desarrollo. La aplicación está basada en una arquitectura RESTful API, desarrollada con **Express.js** y otras tecnologías. El objetivo de este sistema es ofrecer una interfaz eficiente y fácil de usar para administrar múltiples proyectos y sus respectivas tareas.

## Integrantes

Andrea Burciaga 358353

Luis Moncayo 363641

Danna Corral 358147


## Funcionalidades

- **Creación y gestión de proyectos**: Permite crear, editar y eliminar proyectos.
- **Asignación de tareas**: Cada proyecto puede tener tareas asignadas a diferentes usuarios.
- **Seguimiento del progreso**: Cada tarea puede tener un estado (Pendiente, En progreso, Completada) y fechas límites.
- **Gestión de recursos**: Asignación de recursos como horas de trabajo, presupuestos y otros insumos necesarios para el desarrollo del proyecto.
- **Reportes**: Se generan reportes del estado de los proyectos y tareas en cualquier momento.

## Tecnologías utilizadas

- **Node.js**
- **Express.js**
- **MongoDB/MySQL** (Base de datos a elegir)
- **JWT** (Autenticación)
- **Postman** (Pruebas de la API)

## Componentes Implementados

- **Seguirdad**
**JWT (JSON Web Tokens)**: Se utiliza JWT para la autenticación y autorización de usuarios, asegurando que las solicitudes a las rutas protegidas sean legítimas. Se recomienda almacenar el JWT en cookies con el flag httpOnly para prevenir ataques XSS.
**Almacenamiento Seguro de Datos**: Se implementan prácticas para asegurar que los datos sensibles estén protegidos, evitando su exposición en el cliente.
- **Manejo de ambientes**
La aplicación está configurada para manejar diferentes ambientes (desarrollo, pruebas, producción) utilizando variables de entorno, lo que permite una configuración flexible y segura.
- **Matriz RBAC (Control de Acceso Basado en Roles)**
Se ha implementado un sistema de roles que permite gestionar los permisos de los usuarios, asegurando que cada uno tenga acceso solo a las funcionalidades necesarias según su rol.
- **Internacionalización y Localización**
La aplicación soporta múltiples idiomas y formatos regionales, permitiendo a los usuarios interactuar en su idioma preferido.

## Pruebas
Se han construido pruebas unitarias y de integración utilizando JEST y Supertest para cada ruta del proyecto. Se asegura que al menos el 50% del código esté cubierto por pruebas, garantizando así la estabilidad y funcionalidad de la aplicación.

## Comunicación con PaaS
La aplicación se comunica con MongoDB Atlas, un servicio PaaS que proporciona una base de datos escalable y segura en la nube. Se han implementado conexiones seguras utilizando credenciales almacenadas en variables de entorno.

## Estructura de la API

| Método HTTP | Endpoint            | Descripción                                            |
| ----------- | ------------------- | ------------------------------------------------------ |
| GET         | /projects            | Lista todos los proyectos.                             |
| GET         | /projects/:id        | Muestra detalles de un proyecto específico.            |
| POST        | /projects            | Crea un nuevo proyecto.                                |
| PUT         | /projects/:id        | Actualiza los detalles de un proyecto existente.        |
| DELETE      | /projects/:id        | Elimina un proyecto.                                   |
| GET         | /columns               | Lista todas las tareas.                                |
| POST        | /columns               | Crea una nueva tarea y la asigna a un proyecto.         |
| PUT         | /columns/:id           | Actualiza el estado o detalles de una tarea específica. |
| DELETE      | /columns/:id           | Elimina una tarea.                                     |

## Installation

Usar el package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) intalando las dependencias, incluida [Express](https://expressjs.com/).

```bash
npm i
```

Despues utilizamos el siguiente comando para correr el proyecto: 

```bash
npm start
```

## Diagrama de clases
![Diagrama de clases del proyecto](/images/diagramadeclases.png)

## Diagrama de interacción
![Diagrama de interacción del proyecto](/images/diagramadeinteraccion.png)

## Wireframes
![Pantalla de inicio de sesión](/images/wireframe1.png)
![Adición de un nuevo proyecto](/images/wireframe2.png)
![Adición de nuevos miembros del equipo](/images/wireframe3.png)
![Frente de la tarjeta](/images/wireframe4.jpg)
![Reverso de la tarjeta](/images/wireframe5.jpg)
![Tablero SCRUM](/images/wireframe6.jpg)

## Docker

También puedes usar Docker para ejecutar el proyecto. La imagen de Docker está disponible en [Docker Hub](https://hub.docker.com/r/andrea050/proyecto-reto). Sigue estos pasos para utilizarla:

### 1. Descarga la imagen de Docker:

```bash
docker pull andrea050/proyecto-reto
```

### 2. Ejecuta el contenedor:

```bash
docker run -d -p 80:80 andrea050/proyecto-reto
```

Esto iniciará el proyecto en un contenedor Docker, y podrás acceder a la aplicación desde `http://localhost`.

## License
[MIT](https://choosealicense.com/licenses/mit/)
