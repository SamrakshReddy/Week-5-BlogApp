# Blog App Frontend

React frontend for a blog application with separate user and author flows. Users can register, log in, view articles, open article details, and comment. Authors can register, log in, manage their profile, write articles, and view their published articles.

## Tech Stack

- React 19
- Vite
- React Router
- Zustand
- Axios
- React Hook Form
- React Hot Toast
- Tailwind CSS

## Features

- User and author registration
- Login, logout, and session restore
- Profile image upload during registration
- User profile with articles feed
- Author dashboard
- Create articles with title, category, and content
- View article details
- Add comments to articles
- Toast notifications for user feedback

## Project Structure

```text
Blog-app-Frontend/
+-- public/
+-- src/
|   +-- assets/
|   +-- components/
|   |   +-- ArticleById.jsx
|   |   +-- AuthorArticles.jsx
|   |   +-- AuthorProfile.jsx
|   |   +-- EditArticleForm.jsx
|   |   +-- Header.jsx
|   |   +-- Login.jsx
|   |   +-- Register.jsx
|   |   +-- UserProfile.jsx
|   |   +-- WriteArticle.jsx
|   +-- store/
|   |   +-- authStore.js
|   +-- styles/
|   |   +-- common.js
|   +-- App.jsx
|   +-- index.css
|   +-- main.jsx
+-- package.json
+-- vite.config.js
```

## Prerequisites

- Node.js
- npm
- Backend server running on `http://localhost:4000`

The frontend currently calls the backend with hardcoded URLs such as:

- `http://localhost:4000/common-api/login`
- `http://localhost:4000/common-api/logout`
- `http://localhost:4000/user-api/users`
- `http://localhost:4000/author-api/users`
- `http://localhost:4000/user-api/articles`
- `http://localhost:4000/author-api/articles`

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Builds the app for production into the `dist` folder.

```bash
npm run preview
```

Serves the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/register` | Register as user or author |
| `/login` | Login page |
| `/user-profile` | User profile and article feed |
| `/author-profile` | Author profile dashboard |
| `/author-profile/articles` | Author articles |
| `/author-profile/write-article` | Create a new article |
| `/article/:id` | Article details page |
| `/edit-article` | Edit article form |

## Notes

- Authentication requests use cookies, so the backend must support credentials and CORS for the frontend origin.
- Profile images support JPG and PNG uploads during registration.
- The backend should be started before using login, registration, articles, comments, and profile features.
