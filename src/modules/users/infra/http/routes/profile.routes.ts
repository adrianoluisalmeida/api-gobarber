// Libs
import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

// Controllers
import ProfileController from '../controllers/ProfileController';

// middlewares
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// Instance Controllers
const profileController = new ProfileController();

// Instance Libs
const profileRouter = Router();
profileRouter.use(ensureAuthenticated);

// Routes
profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirm: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profileRouter;
