import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "test@prisma.io",
      avatarUrl: "http://github.com/vinihasselmann.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "bol123",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.match.create({
    data: {
      date: "2022-11-29T16:00:00.201Z",
      countryCode1: "AR",
      countryCode2: "BR",
    },
  });

  await prisma.match.create({
    data: {
      date: "2022-11-29T12:00:00.201Z",
      countryCode1: "AR",
      countryCode2: "BR",

      guesses: {
        create: {
          country1Goals: 0,
          country2Goals: 2,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
