import { Inject, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(DbService)
    private DbService: DbService,
  ) {}

  public async getUsers() {
    const client = this.DbService.getClient();
    const users = await client.execute('SELECT * FROM users where id = 1');
    return users;
  }
}
