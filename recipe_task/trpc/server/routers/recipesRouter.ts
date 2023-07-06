import { router, publicProcedure } from "../main/trpc";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const recipesRouter = router({
  recipeCreate: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        cookingInstructions: z.string(),
        price: z.number(),
        // ingredients: z.array(
        //   z.object({
        //     name: z.string(),
        //     quantity: z.number(),
        //     unit: z.string(),
        //   })
        // ),
      })
    )
    .mutation(async (opts) => {
      const { name, description, cookingInstructions,price } =
        opts.input;
      const createrecipe = await prisma.recipe.create({
        data: {
          name,
          description,
          cookingInstructions,
          price,
          // ingredients: { create: ingredients },
        },
      });
      return createrecipe;
    }),
  recipeUpdate: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        cookingInstructions: z.string(),
        ingredients: z.array(
          z.object({
            name: z.string(),
            quantity: z.number(),
            unit: z.string(),
          })
        ),
      })
    )
    .mutation(async (opts) => {
      const { id, name, description, cookingInstructions, ingredients } =
        opts.input;
      const updaterecipe = await prisma.recipe.update({
        where: { id },
        data: {
          name,
          description,
          cookingInstructions,
          ingredients: { create: ingredients },
        },
      });
      return updaterecipe;
    }),
  recipeList: publicProcedure.query(async () => {
    const getrecipes = await prisma.recipe.findMany();
    return getrecipes;
  }),
  recipeById: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts;
    const book = await prisma.recipe.findUnique({ where: { id: input } });
    return book;
  }),
  recipeDelete: publicProcedure.input(z.number()).mutation(async (opts) => {
    const { input } = opts;
    const deleterecipes = await prisma.recipe.delete({
      where: { id: input },
    });
    return deleterecipes;
  }),
});
