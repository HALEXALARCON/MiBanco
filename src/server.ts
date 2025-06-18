import 'reflect-metadata';
import app from './app';
import { env } from './config/env';
import { AppDataSource } from './config/data-source';
import userRoutes from './routes/user.routes';

app.use('/api/users', userRoutes);
async function main() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Base de datos conectada');

    app.listen(env.PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar la aplicación:', err);
    process.exit(1);
  }
}

main();
