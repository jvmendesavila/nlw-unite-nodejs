import fastify from 'fastify'
import { routes } from './routes/_index';
import { errorHandler } from './error-handler';
import fastifyCors from '@fastify/cors';

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

// ROUTES
app.register(routes)  

app.setErrorHandler(errorHandler)

app.listen({port: 3333, host: '0.0.0.0'}).then(() => {
  console.log('HTTP server running!')
})