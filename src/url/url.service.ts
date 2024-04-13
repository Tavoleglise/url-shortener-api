import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import ShortUniqueId from 'short-unique-id';

@Injectable()
export class UrlService {
  constructor(private DbService: DbService) {}

  public formatUrl(url: string) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `http://${url}`;
    }
    return url;
  }

  private generateUrlCode() {
    const uid = new ShortUniqueId({ length: 10 });
    return uid.rnd();
  }

  public async addUrl(url: string) {
    const client = this.DbService.getClient();
    const urlCode = this.generateUrlCode();
    const query = `
    INSERT INTO urls (url_code, original_url, creation_date, user_id)
    VALUES ("${urlCode}", "${url}", datetime('now'), 0)
  `;
    try {
      await client.execute(query);
      console.log('INTENTANDO INSERTAR URL', url);
      return urlCode;
    } catch (error) {
      console.error(error);
      return 'There was a problem adding the URL. Please try again.';
    }
  }

  public async getUrl(urlCode: string) {
    const client = this.DbService.getClient();
    const query = `
    SELECT original_url FROM urls WHERE url_code = "${urlCode}"
  `;
    try {
      const result = await client.execute(query);
      return result.rows[0].original_url;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
