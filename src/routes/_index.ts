import { FastifyInstance } from "fastify"
import { EventsRoutes } from "./events/_index"
import { AttendeesRoutes } from "./attendees/_index"
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import fastifySwaggerUi from "@fastify/swagger-ui"
import fastifySwagger from "@fastify/swagger"

export async function routes(app: FastifyInstance) {
  // Add schema validator and serializer
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  
  // Fastify Swagger Config
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

  // Swagger
  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  })

  // Events 
  app.register(EventsRoutes, { prefix: '/events' })

  // Attendees
  app.register(AttendeesRoutes, { prefix: '/attendees' })
}

