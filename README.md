# Student Information

A small, responsive student-records webpage built with React.

## Run the webpage

From the project root, run:

```powershell
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.
If you prefer, you can run the frontend commands from the `frontend` folder instead.

`npm run dev` starts the development server; it does not create production build files.
To generate those files in `frontend/dist`, run:

```powershell
npm run build
```

The form and table work in the browser without a backend. Student records are temporary and will reset when the page is refreshed. MongoDB connection is not required to preview or use the page.

## Backend

The separate `backend` folder contains the Express API and Mongoose Student model. It can be connected to MongoDB Atlas later.
