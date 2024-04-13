import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
