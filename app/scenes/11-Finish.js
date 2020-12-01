import { Markup } from 'telegraf'
import ButtonLinks from '../utils/ButtonLinks'
import Downloader from '../utils/Downloader'
import FixImage from '../utils/FixImage'

export const Finish = (ctx, bot, CHANNEL, groups) => {
  if (ctx.message.photo) {
    let photo = ctx.message.photo
    photo = photo.reverse()[0]
    photo = photo.file_id

    const path = `${__dirname}/../../images/${ctx.message.from.id}.jpg`

    ctx.reply('در حال آماده سازی...')

    ctx.telegram.getFileLink(photo).then(url => {
      Downloader(url, path).then(() => {
        FixImage(path).then(() => {
          const {
            name,
            job,
            service,
            bio,
            skills,
            address,
            phone,
            email,
            links,
          } = ctx.wizard.state.data

          bot.telegram
            .sendPhoto(
              CHANNEL,
              { source: `${path}.jpg` },
              {
                caption:
                  `🔹 نام: ${name}\n` +
                  `🔸 شغل: ${job}\n` +
                  `🔹 سرویس: ${service}\n\n` +
                  `🔸 معرفی: \n${bio}\n` +
                  `🔹 تخصص‌ها:\n${skills.join(' - ')}\n\n` +
                  '🔸 ارتباط: \n' +
                  `${address ? '▪️ آدرس: ' + address + '\n' : ''}` +
                  `${phone ? '▪️ شماره: ' + phone + '\n' : ''}` +
                  `${email ? '▪️ ایمیل: ' + email : ''}`,

                reply_markup: Markup.inlineKeyboard([
                  ButtonLinks(links, Markup),
                  [
                    ctx.message.from.username &&
                      Markup.urlButton(
                        'Telegram Message',
                        `https://t.me/${ctx.message.from.username}`
                      ),
                  ],
                ]),
              }
            )
            .then(res => {
              ;[...groups, ctx.message.from.id].map(chatID =>
                bot.telegram.forwardMessage(chatID, CHANNEL, res.message_id)
              )
              ctx.reply(
                `تو هم میتونی با معرفی @SeeMe_ir به بقیه، به بزرگ شدن این خانواده کمک کنی ❤️`
              )
              return ctx.scene.leave()
            })
        })
      })
    })
  }
}
