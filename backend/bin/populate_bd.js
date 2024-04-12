const { Pool } = require('pg');

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'admin', // Usuario de PostgreSQL
  host: 'localhost', // Host de PostgreSQL (puedes cambiarlo si PostgreSQL está en otro host)
  database: 'postgres', // Nombre de la base de datos PostgreSQL por defecto
  password: 'admin', // Contraseña de PostgreSQL
  port: 5432, // Puerto de PostgreSQL
});

(async () => {
  const client = await pool.connect();

  try {
    // Aquí puedes realizar las consultas y operaciones en la base de datos
    console.log('Conexión establecida con PostgreSQL.');

    // Ejemplo de consulta
    const res = await client.query('SELECT NOW()');
    console.log('Resultado de la consulta:', res.rows[0]);

  } catch (err) {
    console.error('Error de conexión a PostgreSQL:', err);
  } finally {
    client.release();
  }
})();
