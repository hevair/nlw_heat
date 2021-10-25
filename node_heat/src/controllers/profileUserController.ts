import { Request, Response } from 'express'
import { ProfileUserService } from '../services/profileUserService'

class profileUserController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id

        const service = new ProfileUserService();

        const result = await service.execute(user_id)

        return res.json(result)
    }
}

export { profileUserController }