import fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

// IMPORT ROUTES
import { getEvent } from './routes/get-event';
import { createEvent } from './routes/create-event';
import { registerForEvent } from './routes/register-for-event';
import { getAttendeeBadge } from './routes/get-attendee-badge';

const app = fastify()

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// ROUTES
app.register(getEvent)
app.register(createEvent)
app.register(registerForEvent)
app.register(getAttendeeBadge)

app.listen({port: 3333}).then(() => {
  console.log('HTTP server running!')
})