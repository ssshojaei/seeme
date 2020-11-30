import axios from 'axios'
import { createWriteStream } from 'fs'

const Downloader = (url, path) => {
  return axios({ url, responseType: 'stream' }).then(response => {
    return new Promise((resolve, reject) => {
      response.data
        .pipe(createWriteStream(path))
        .on('finish', () => resolve(path))
        .on('error', e => reject(e))
    })
  })
}

export default Downloader
