import sharp from 'sharp'

const FixImage = path => {
  return new Promise((resolve, reject) => {
    sharp(path)
      .rotate()
      .resize(640, 640, {
        kernel: sharp.kernel.nearest,
        fit: 'cover',
        position: 'center',
      })
      .composite([
        {
          input: `${__dirname}/../assets/watermark.png`,
          gravity: 'center',
        },
      ])
      .toFile(`${path}.jpg`)
      .then(() => resolve(path))
  })
}

export default FixImage
