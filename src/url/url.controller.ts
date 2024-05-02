import { Controller, Post, Get, Body, Param, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { Response } from 'express';
import { Url } from './url-interfaces';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  // GET Redirect /urlId
  @Get(':urlId')
  async redirectUrl(@Param('urlId') urlId: string, @Res() res: Response) {
    const OriginalUrl = await this.urlService.getUrl(urlId);
    if (!OriginalUrl) {
      res.status(404).send(`URL not found for ${urlId}`);
    }
    res.redirect(this.urlService.formatUrl(`${OriginalUrl}`));
  }
  // POST Set new url /add-url
  @Post('add-url')
  async addUrl(@Body('url') url: string) {
    const urlData: Url = await this.urlService.addUrl(url);
    console.log(urlData);
    return { urlData };
  }
}
