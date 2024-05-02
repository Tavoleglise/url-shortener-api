import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import ShortUniqueId from 'short-unique-id';

@Injectable()
export class UrlService {
  private client;

  constructor(private DbService: DbService) {
    this.client = this.DbService.getClient();
  }

  public formatUrl(url: string) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `http://${url}`;
    }
    return url;
  }

  public async addUrl(url: string) {
    const urlCode = this.generateUrlCode();
    const query = `
    INSERT INTO urls (url_code, original_url, creation_date, user_id)
    VALUES ("${urlCode}", "${url}", datetime('now'), 0)
  `;
    const queryTogetUrl = `SELECT * FROM urls WHERE url_code = "${urlCode}"`;
    try {
      console.log('INTENTANDO INSERTAR URL', url);
      await this.client.execute(query);
      const urlData = await this.client.execute(queryTogetUrl);
      return urlData.rows;
    } catch (error) {
      console.error(error);
      return 'There was a problem adding the URL. Please try again.';
    }
  }

  public async getUrl(urlCode: string) {
    const query = `
    SELECT original_url FROM urls WHERE url_code = "${urlCode}"
  `;
    try {
      const result = await this.client.execute(query);
      return result.rows[0].original_url;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private generateUrlCode() {
    const uid = new ShortUniqueId({ length: 10 });
    return uid.rnd();
  }
}
