import { router } from './trpc';

import {  ingredientsRouter } from '../routers/ingredientsRouter';
import {recipesRouter} from '../routers/recipesRouter';
import {customersRouter} from '../routers/customerRouter';
import { orderRouter } from '../routers/orderRouter';
 
export const appRouter = router({
  ingredient: ingredientsRouter,
  recipe : recipesRouter,
  customer : customersRouter,
  order : orderRouter,
});
 
export type AppRouter = typeof appRouter
