import { router, publicProcedure } from "../main/trpc";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const customersRouter = router({
  userCreate: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { name, email } = opts.input;
      const createbook = await prisma.customer.create({
        data: { name, email },
      });
      return createbook;
    }),
})