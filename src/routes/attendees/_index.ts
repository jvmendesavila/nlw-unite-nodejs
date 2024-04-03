import { FastifyInstance } from "fastify"
import { getAttendeeCheckIn } from "./get-attendee-check-in"
import { getAttendeeBadge } from "./get-attendee-badge"


export async function AttendeesRoutes(app: FastifyInstance) {
  app.register(getAttendeeCheckIn)
  app.register(getAttendeeBadge)
}

