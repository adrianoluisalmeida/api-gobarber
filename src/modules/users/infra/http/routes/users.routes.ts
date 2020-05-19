// Libs
import { Router } from 'express';
import multer from 'multer';

// Configs
import uploadConfig from '@config/upload';

// Controllers
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

// middlewares
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// Instance Controllers
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

// Instance Libs
const usersRouter = Router();
const upload = multer(uploadConfig);

// Routes
usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
