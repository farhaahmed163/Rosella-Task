# Developer Feed

A small frontend app that pulls the latest posts from DEV.to.
You can bookmark Articles , save them in local storage, and display them in a separate view (Bookmarked Articles).

## Features

- **Community feed** : Loads recent articles from the DEV.to public API with client-side pagination.
- **Bookmarks** : Save articles to a list persisted in localStorage; switch between “All articles” and “Bookmarked” without losing state on refresh.
- **Article cards** : Title, author, tags, reactions, reading time, and link out to the original post.
- **Responsive layout** : Works from mobile through desktop; navigation adapts for smaller screens.

## Tech stack

-React + TypeScript
-Vite
-Tailwind CSS
-React Router

## Setup

```bash
git clone https://github.com/farhaahmed163/Rosella-Task.git
cd Rosella-Task
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Live demo

**Production:** `<https://rosella-task.vercel.app/>`

## Repository

`https://github.com/farhaahmed163/Rosella-Task`

## Assumptions

The app depends on the DEV.to public API being available and allowing requests directly from the browser (no API key needed).

Bookmarks are stored locally in the browser using localStorage, so there’s no account sync or backend involved.

## Known issues

API errors or limits: Sometimes the DEV.to API might be slow, down, or rate-limited, and in that case posts just won’t load properly.

Bookmarks are device-based: Saved articles stay only in the browser. If you clear your data or switch devices, they’ll be gone.
