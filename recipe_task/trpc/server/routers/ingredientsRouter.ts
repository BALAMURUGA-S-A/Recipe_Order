import { router, publicProcedure } from "../main/trpc";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const ingredientsRouter = router({
  ingredientCreate: publicProcedure
    .input(
      z.object({
        name: z.string(),
        quantity: z.number(),
        unit: z.string(),
        recipeId: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { name, quantity, unit, recipeId } = opts.input;
      const createingredient = await prisma.ingredient.create({
        data: { name, quantity, unit, recipeId },
      });
      return createingredient;
    }),
  ingredientUpdate: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        quantity: z.number(),
        unit: z.string(),
        recipeId: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { id, name, quantity, unit, recipeId } = opts.input;
      const updateIngredient = await prisma.ingredient.update({
        where: { id },
        data: { name, quantity, unit, recipeId },
      });
      return updateIngredient;
    }),
  ingredientList: publicProcedure.query(async () => {
    const getingredient = await prisma.ingredient.findMany();
    return getingredient;
  }),
  ingredientDelete: publicProcedure.input(z.number()).mutation(async (opts) => {
    const { input } = opts;
    const deleteingredient = await prisma.ingredient.delete({
      where: { id: input },
    });
    return deleteingredient;
  }),
});
