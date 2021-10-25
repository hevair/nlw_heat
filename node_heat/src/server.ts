import { serverHttp } from "./app"

serverHttp.listen(4000, function(){
    console.log('server is running on porte 4000')
})