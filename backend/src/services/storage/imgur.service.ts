import multer from 'multer';
import axios from 'axios';

export class ImgurService {
  private storage: multer.StorageEngine;

  constructor(private clientId: string) {
    this.storage = multer.memoryStorage();
  }

  async upload(file: Buffer): Promise<string> {
    try {
      console.log('uploading');
      const response = await axios.post(
        'https://api.imgur.com/3/upload',
        new URLSearchParams({
          image: file.toString('base64'),
        }),
        {
          headers: {
            Authorization: `Client-ID ${this.clientId}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response.data.data.link;
    } catch (error) {
      throw new Error('Error uploading image to Imgur: ' + error.message);
    }
  }

  getStorage() {
    return this.storage;
  }

  middleware() {
    const upload = multer({ storage: this.storage });
    return upload;
  }
}

export default ImgurService;
