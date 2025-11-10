const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración de MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_NAME || 'hola_mundo_db'
};

let db;

// Función para conectar a MySQL con reintentos
async function connectToDatabase() {
  let retries = 5;
  while (retries > 0) {
    try {
      db = await mysql.createConnection(dbConfig);
      console.log('✅ Conectado a MySQL exitosamente');

      // Crear tabla de ejemplo si no existe
      await db.execute(`
        CREATE TABLE IF NOT EXISTS visitas (
          id INT AUTO_INCREMENT PRIMARY KEY,
          fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          mensaje VARCHAR(255)
        )
      `);
      console.log('✅ Tabla "visitas" verificada/creada');

      return;
    } catch (err) {
      console.log(`❌ Error conectando a MySQL. Reintentando... (${retries} intentos restantes)`);
      console.error(err.message);
      retries--;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  console.error('❌ No se pudo conectar a MySQL después de varios intentos');
}

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta API para verificar conexión a BD
app.get('/api/status', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({
        status: 'error',
        message: 'No hay conexión a la base de datos'
      });
    }

    // Insertar un registro de visita
    await db.execute(
      'INSERT INTO visitas (mensaje) VALUES (?)',
      ['Hola Mundo desde Docker!']
    );

    // Obtener el conteo de visitas
    const [rows] = await db.execute('SELECT COUNT(*) as total FROM visitas');
    const totalVisitas = rows[0].total;

    res.json({
      status: 'success',
      message: 'Conexión a MySQL exitosa',
      database: dbConfig.database,
      totalVisitas: totalVisitas
    });
  } catch (error) {
    console.error('Error en /api/status:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Iniciar servidor
app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  await connectToDatabase();
});
