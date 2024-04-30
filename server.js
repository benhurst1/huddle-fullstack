import express from "express";
import { createServer as createViteServer } from "vite";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

// db connection
const { Pool } = pg;
const pool = new Pool({
  user:
    process.env.NODE_ENV === "development" ? process.env.DEV_USER : "postgres",
  host: "localhost",
  database: "huddle",
  port: 5432,
});

async function createServer() {
  const app = express();
  app.use(express.json());

  app.get("/api/houses", async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM house");
    res.json(rows);
  });

  app.get("/api/houses/:id", async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT * FROM meterreading WHERE houseid = $1",
      [id]
    );
    res.json(rows);
  });

  app.post("/api/meterreadings", async (req, res) => {
    const { houseid, metertype, readingvalue, date } = req.body;

    if (!houseid || !metertype || !readingvalue || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const { rows } = await pool.query(
        "INSERT INTO meterreading (houseid, metertype, readingvalue, date) VALUES ($1, $2, $3, $4) RETURNING *",
        [houseid, metertype, readingvalue, date]
      );

      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to insert meter reading" });
    }
  });


  const vite = await createViteServer({
    server: { middlewareMode: "html" },
  });

  app.use(vite.middlewares);

  app.listen(3000, () => {
    console.log("Server listening at http://localhost:3000");
  });
}

createServer();
