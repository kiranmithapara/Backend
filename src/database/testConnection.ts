import pool from "../config/db.config";

const testConnection = async () => {
  try {
    const result = await pool.query(`SELECT NOW()`);
    console.log("DB Connected", result.rows[0]);
  } catch (error) {
    console.log("DB Connection Error :", error);
  }
};

testConnection();
