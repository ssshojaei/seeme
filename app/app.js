import 'dotenv/config'
import { Telegraf, Stage, session, Markup } from 'telegraf'
import WizardScene from 'telegraf/scenes/wizard'
import {
  Name,
  JobTitle,
  Service,
  Bio,
  Skills,
  Address,
  Phone,
  Email,
  Links,
  Image,
  Finish,
} from './scenes'

const BOT_TOKEN = process.env.BOT_TOKEN || ''
const USERNAME = process.env.USERNAME || ''
const PORT = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000
const WEBHOOK_URL = `${process.env.WEBHOOK_URL}/bot${BOT_TOKEN}`
const CHANNEL = '@seeme_ir'
const groups = ['1048326975']

const superWizard = new WizardScene(
  'super-wizard',
  Name,
  JobTitle,
  Service,
  Bio,
  Skills,
  Address,
  Phone,
  Email,
  Links,
  Image,
  ctx => Finish(ctx, bot, CHANNEL, groups)
)
const stage = new Stage([superWizard])
const bot = new Telegraf(BOT_TOKEN, { username: USERNAME })

bot.use(session())
bot.use(stage.middleware())
bot.use(Telegraf.log())

bot.command('start', ctx => {
  return ctx.replyWithMarkdown(
    `درود، به ربات من رو ببین خوش اومدید
    ما اینجا تلاش میکنیم به کمک شما، جامعه‌ی فناوری شیراز رو بیش از پیش به هم متصل کنیم
    معرفی شما در تیم‌های اصلی جامعه‌ی شیراز منتشر میشن و به اعضا معرفی میشید!
    `,
    Markup.inlineKeyboard([
      Markup.urlButton('چطور کار میکنه؟', 'https://roxaleh.ir/seeme'),
      Markup.callbackButton('➕ خود را معرفی کنید', 'next'),
    ]).extra()
  )
})

bot.action('next', ctx => {
  console.log(ctx)
  ctx.scene.enter('super-wizard')
  ctx.update.callback_query.message.chat.type === 'private' &&
    ctx.scene.enter('super-wizard')
})

const production = () => {
  console.log('Bot runs in production mode')
  console.log(`${USERNAME} setting webhook: ${WEBHOOK_URL}`)
  bot.telegram.setWebhook(WEBHOOK_URL)
  console.log(`${USERNAME} starting webhook on port: ${PORT}`)
  bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT)
}

const development = () => {
  console.log('Bot runs in development mode')
  console.log(`${USERNAME} deleting webhook`)
  bot.telegram.deleteWebhook()
  console.log(`${USERNAME} starting polling`)
  bot.startPolling()
}

process.env.NODE_ENV === 'production' ? production() : development()
