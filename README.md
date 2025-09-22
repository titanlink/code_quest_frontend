# CODE QUEST 2025 - Frontend

**DevCaribe** presenta el **frontend** del proyecto **Blog Comunitario** para el desafío **CODE QUEST 2025**, organizado por **Fernando Herrera**.

La aplicación está desarrollada con **Next.js** y **TypeScript**, con **TailwindCSS** para estilos, **Zustand** para estado global y **Firebase** para autenticación. Los datos se consumen mediante **GraphQL**.

> ⚠️ Este repositorio corresponde únicamente al **frontend** del proyecto.
> Asegúrate de que el **backend** esté levantado antes de iniciar el frontend.

---

## 🚀 Instrucciones de instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/carlosdiazz/code_quest_backend
cd code_quest_backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
- Copia `.env.template` → `.env`
- Configura:
  - `NEXT_PUBLIC_API_URL` → endpoint del backend
  - Configuración Firebase (`apiKey`, `authDomain`, `projectId`, etc.)

### 4. Levantar el proyecto en desarrollo
```bash
npm run dev
# o
yarn dev
```

### 5. Abrir en el navegador
[http://localhost:3000](http://localhost:3000)

---
###  DEMO
[DemoPlayGround](https://code-quest-frontend-blond.vercel.app/)

---

## 🛠️ Tecnologías principales

| Tecnología | Propósito |
|------------|-----------|
| Next.js | Framework React |
| TypeScript | Tipado estático |
| TailwindCSS | Estilos utilitarios |
| Zustand | Estado global |
| Firebase | Auth y DB |
| GraphQL | Consulta de datos |

---

## 📜 Scripts disponibles

| Script | Descripción |
|--------|------------|
| npm run dev | Levanta el proyecto en desarrollo |
| npm run build | Compila para producción |
| npm start | Ejecuta producción |

---

## 🎨 Estilos y componentes

- **TailwindCSS** para clases utilitarias
- **Componentes reutilizables** con props tipadas en TypeScript
- **Dark mode** opcional con `class` en body

---

## 📦 Deployment

- Se recomienda **Vercel** para desplegar Next.js
- Configura variables de entorno en el panel de Vercel
- Build automático al hacer push a main/master

---