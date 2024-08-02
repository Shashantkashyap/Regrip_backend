
# Notes API

This project is a simple RESTful API for managing notes, built with Node.js. The API allows users to create, retrieve, update, delete, and query notes based on tags. It uses in-memory storage, making it ideal for small-scale applications or as a foundation for more complex projects.

## Folder Structure

``` bash 
.
├── controllers
│   └── notesController.js   # Contains the logic for handling note operations
├── models
│   └── noteModel.js         # (Optional) A place for note schema or logic related to notes data structure
├── routes
│   └── notes.js             # Defines the routes for the notes API
├── index.js                 # Entry point for the application
├── package.json             # Dependencies and project metadata
└── package-lock.json        # Locked dependencies versions
```
## API Reference

#### Create a New Note

```http
  POST /api/notes
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | POST /notes |

#### Retrieve All Notes

```http
  GET api/notes
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | GET /notes |

#### Retrieve a Single Note by ID

```http
  GET /notes/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:id`      | `string` | GET /notes/:id |

#### Update a Note by ID

```http
  PUT /notes/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:id`      | `string` | PUT /notes/:id |

#### Delete a Note by ID

```http
  DELETE /notes/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:id`      | `string` | DELETE /notes/:id |

#### Retrieve All Notes

```http
  GET api/notes
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | GET /notes |

#### Add Tags to a Note

```http
  POST /notes/:id/tags
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:id`      | `string` |POST /notes/:id/tags , [tags] |

#### Remove Tags from a Note

```http
  DELETE /notes/:id/tags
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:id`      | `string` |DELETE /notes/:id/tags , [tags] |

#### Query Notes by Tags

```http
  POST /notes/query
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api`      | `string` |POST /notes/query , {query} |


## Installation

 1. Clone the Repository:

```bash
  git clone https://github.com/Shashantkashyap/Regrip_backend
  cd notes-api
```

2. Install Dependencies:

```bash
  npm install
```

3. Run the Application:

```bash
  node index.js
```
or 
```bash
  npm run dev
```
## Postman Api

https://www.postman.com/grey-space-839917/workspace/regrip-backend/collection/29320905-133a12a4-0427-43bc-9812-5802db7e751c?action=share&creator=29320905
## Features

#### In-Memory Storage
- This API uses in-memory storage for notes, meaning all notes are stored in a JavaScript array within the application. This storage is not persistent; all data will be lost when the server restarts. In-memory storage is suitable for testing and small-scale applications. For production use, consider integrating a database (e.g., MongoDB, PostgreSQL).
