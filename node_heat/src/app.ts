import 'dotenv/config'
import express from 'express'
import { Server, Socket } from 'socket.io';
import http from 'http'
import cors from 'cors'
import { router } from './routes';
const app = express();
app.use(cors())
const serverHttp = http.createServer(app)

const io = new Server(serverHttp,{
    cors:{
        origin: '*'
    }
})

io.on('connection', (socket) =>{
    console.log(`usuario conectado no socket ${socket.id}`)
})

app.use(express.json())
app.use(router)


app.get('/github',function(req,res){
    console.log('chamou')
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITBUB_CLIENT_ID}`)
})


app.get('/signin/callback', function(req, res){
    const {code} = req.query

    res.json({code})
})

export {serverHttp, io}