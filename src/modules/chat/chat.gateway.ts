import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'

@WebSocketGateway({
    cors: {
      origin: '*' 
    }
  })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() server: Server

    afterInit(server: Server) {
      console.log('Initialized!')
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      console.log(`Connected ${client.id}`)
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Disconnected: ${client.id}`)
    }

    @SubscribeMessage('sendMessage')
    handleMessage(client: Socket, message: { user: string, room: string, text: string }) {
      this.server.emit('receiveMessage', message);
    }
  
    @SubscribeMessage('joinRoom')
    handleRoomJoin(client: Socket, data: { room: string, user: string }) {
      client.join(data.room);
      console.log(data.room)
      console.log(data.user)
      client.emit('getRoomUser', data);
    }
}
