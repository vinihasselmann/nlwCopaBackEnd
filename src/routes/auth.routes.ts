import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/users", async (req) => {
    const createUserBody = z.object({
      access_token: z.string(),
    });

    const { access_token } = createUserBody.parse(req.body);

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth/v2/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      });

      const userData = await userResponse.json()

      const userInfoSchema = z.object({
        id: z.string(),
        email: z.string().email(),
        name: z.string(),
        picture: z.string().url()
      })

      const userInfo = userInfoSchema.parse(userData)

      console.log(userInfo)
  });
}