import { io } from "../app";
import { prismaClient } from "../prisma"

class CreateMessageService {
    async execute(text:string, user_id: string){
        const message =  await prismaClient.message.create({
            data:{
                text,
                user_id
            },
            include:{
                user:true,
            },
        })

        const infWS = {
            text: message.text,
            user_id: message.user,
            created_at: message.create_at,
            user:{
                name: message.user.name,
                avatar_url: message.user.avatar_url,
            }
        }       

        io.emit("newMessage", infWS)

        console.log(infWS)

        return message;
    }
}

export {CreateMessageService}