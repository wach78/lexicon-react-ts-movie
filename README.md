# React TypeScript Movie App

This project is a practice exercise for working with React and TypeScript.

The application uses the **MovieApi** ASP.NET Core Web API as its backend for movie, actor, genre, and review data.

## MovieApi

This frontend uses the [MovieApi](https://github.com/wach78/lexicon-MovieApi) ASP.NET Core Web API as its backend.

## Technologies

- React
- TypeScript
- Vite
- React Router
- Bootstrap
- Fetch API
- ASP.NET Core MovieApi backend

## Features

The application currently supports:

- Displaying a list of movies
- Adding movies
- Editing movies
- Deleting movies
- Viewing movie details
- Viewing actors and reviews
- Adding reviews to movies
- Filtering movies by genre
- Searching for movies
- Adding actors to movies
- Navigation with React Router

## MovieApi

This frontend requires the separate **MovieApi** project to be running.

The API provides endpoints for:

- Movies
- Actors
- Reviews
- Movie details
- Movie and actor relationships

## Run the project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The MovieApi backend must also be running for the application to retrieve and modify data.

## Purpose

The purpose of this project is to practice:

- React components
- React state with `useState`
- Side effects with `useEffect`
- TypeScript interfaces and DTOs
- React Router
- Forms and validation
- API communication with `fetch`
- Query parameters and filtering
- Working with relationships between API resources

## Note

This is an educational exercise and not a production application.
