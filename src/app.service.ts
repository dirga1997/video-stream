import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { AppGateway } from './app.gateway';

@Injectable()
export class AppService {
  constructor(private appGateway: AppGateway) {}

  getIndex(param: { req?: Request; res?: Response }) {
    const { res } = param;
    return res.sendFile(join(__dirname, '../static/index.html'));
  }

  getStream(param: { req?: Request; res?: Response }) {
    const { res } = param;
    return res.sendFile(join(__dirname, '../static/stream.html'));
  }

  getView(param: { req?: Request; res?: Response }) {
    const { res } = param;
    return res.sendFile(join(__dirname, '../static/view.html'));
  }

  getVideoOpenCV(param: { req?: Request; res?: Response }) {
    const { res } = param;
    res.sendFile(join(__dirname, '../static/opencv-index.html'));
    this.appGateway.handleOpenCVImage();
  }
}
