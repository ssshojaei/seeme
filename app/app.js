import 'dotenv/config'
import { Telegraf, Stage, session } from 'telegraf'
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
const CHANNEL = '@SeeMeTestChannel'

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
  ctx => Finish(ctx, bot, CHANNEL)
)
const stage = new Stage([superWizard])
const bot = new Telegraf(BOT_TOKEN, { username: USERNAME })

bot.use(session())
bot.use(stage.middleware())
bot.use(Telegraf.log())

bot.command('start', ctx => {
  ctx.message.chat.type === 'private' && ctx.scene.enter('super-wizard')
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
