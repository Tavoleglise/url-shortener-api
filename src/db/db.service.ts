import { Injectable } from '@nestjs/common';
import { createClient, Client } from '@libsql/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DbService {
  private dbUrl: string;
  private dbAuthToken: string;
  private client: Client;

  constructor(private configService: ConfigService) {
    this.dbUrl = this.configService.get<string>('DB_URL');
    this.dbAuthToken = this.configService.get<string>('DB_AUTH_TOKEN');
    this.client = createClient({
      url: this.dbUrl,
      authToken: this.dbAuthToken,
    });
  }

  public getClient(): Client {
    return this.client;
  }
}
