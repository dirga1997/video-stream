/* eslint-disable prettier/prettier */
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { VideoCapture, imencode } from '@u4/opencv4nodejs';

@WebSocketGateway({ namespace: '/app' })
export class AppGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private FPS: number = 1000 / 144;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  handleOpenCVImage() {
    const videoCap = new VideoCapture(0);

    setInterval(() => {
      const frame = videoCap.read().flip(10);
      const image = imencode('.jpg', frame).toString('base64');
      this.wss.emit('opencvView', image);
    }, this.FPS);
  }

  @SubscribeMessage('stream')
  handleVideo(client: Socket, frame: any) {
    // const flipImage = imdecode(Buffer.from(frame.split('base64,')[1], 'base64')).flip(10)
    // this.wss.emit('view', imencode('.jpg', flipImage).toString('base64'));
    this.wss.emit('view', frame);
  }
}
