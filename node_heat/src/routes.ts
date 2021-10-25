import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController";
import { profileUserController } from "./controllers/profileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";


const router = Router();


router.post("/authenticate", new AuthenticateUserController().handle)
router.post("/message", ensureAuthenticated, new CreateMessageController().handle)
router.get('/messages/last3', new GetLast3MessagesController().handle)
router.get('/profile', ensureAuthenticated,new profileUserController().handle)

export {router}


