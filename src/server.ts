import cors from '@fastify/cors';
import Fastify from "fastify";

import { PrismaClient } from "@prisma/client";

import { poolRoutes } from './routes/pool.routes';
import { userRoutes } from './routes/user.routes';
import { guessRoutes } from './routes/guess.routes';
import { authRoutes } from './routes/auth.routes';
import { matchRoutes } from './routes/match.routes';


const prisma = new PrismaClient({
  log: ["query"],
});

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });
  
  await fastify.register(authRoutes)
  await fastify.register(matchRoutes)
  await fastify.register(poolRoutes)
  await fastify.register(userRoutes)
  await fastify.register(guessRoutes)


  await fastify.listen({ port: 3333, /*host: '0.0.0.0'*/ });
}

bootstrap();
