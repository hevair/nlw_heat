import {Request, Response} from 'express'
import { CreateMessageService } from '../services/CreateMessageService';

import {io} from '../app'

class CreateMessageController{
    async handle(req:Request, res:Response){
        const {message} = req.body
        const user_id = req.user_id;

        const service = new CreateMessageService()
        try{
            const result = await service.execute(message, user_id) 
            return res.json(result)
        }catch(err){
            return res.json({error: err.message})
        }
    }
}

export {CreateMessageController}