import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function getHealth(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/healthz', async (request, reply) => {
    return reply.status(200).send("HTTP server healthy!")
  })
}