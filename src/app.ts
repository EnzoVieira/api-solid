import fastify from "fastify"
import { ZodError } from "zod"

import { appRoutes } from "./http/routes"

import { env } from "./env"

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((err, _, reply) => {
  if (err instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: err.format() })
  }

  if (env.NODE_ENV !== "production") {
    console.log(err)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error." })
})
