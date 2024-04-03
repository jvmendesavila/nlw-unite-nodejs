import fastify from 'fastify'
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';

import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

// IMPORT ROUTES
import { getEvent } from './routes/get-event';
import { createEvent } from './routes/create-event';
import { registerForEvent } from './routes/register-for-event';
import { getAttendeeBadge } from './routes/get-attendee-badge';
import { checkIn } from './routes/check-in';
import { getEventAttendees } from './routes/get-event-attendees';
import { errorHandler } from './error-handler';

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description: 'Especificações da API para o back-end da aplicação pass.in construída durante o NLW Unite da Rocketseat.',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// ROUTES
  // Events
  app.register(createEvent)
  app.register(getEvent)
  app.register(getEventAttendees)
  
  // Attendees
  app.register(registerForEvent)
  app.register(getAttendeeBadge)

  // Check-in
  app.register(checkIn)

app.setErrorHandler(errorHandler)

app.listen({port: 3333, host: '0.0.0.0'}).then(() => {
  console.log('HTTP server running!')
})