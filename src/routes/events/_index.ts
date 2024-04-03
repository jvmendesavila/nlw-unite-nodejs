import { FastifyInstance } from "fastify"

import { createEvent } from "./post-events"
import { getEvent } from "./get-event"
import { getEventAttendees } from "./get-event-attendees"
import { postEventAttendees } from "./post-event-attendees"


export async function EventsRoutes(app: FastifyInstance) {
  app.register(createEvent)
  app.register(getEvent)
  app.register(getEventAttendees)
  app.register(postEventAttendees)
}

