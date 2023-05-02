import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller('video')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('proxy/index')
  getIndex(@Res() res: Response) {
    return this.appService.getIndex({ res });
  }

  @Get('proxy/stream')
  getStream(@Res() res: Response) {
    return this.appService.getStream({ res });
  }

  @Get('proxy/view')
  getView(@Res() res: Response) {
    return this.appService.getView({ res });
  }

  @Get('proxy/opencv-stream')
  getVideoOpenCV(@Res() res: Response) {
    return this.appService.getVideoOpenCV({ res });
  }
}
