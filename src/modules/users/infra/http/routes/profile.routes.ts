// Libs
import { Router } from 'express';

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
profileRouter.put('/', profileController.update);

export default profileRouter;
