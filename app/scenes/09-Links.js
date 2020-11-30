import { Markup } from 'telegraf'
import VP from 'validplease'
const vp = new VP()

export const Links = ctx => {
  if (ctx.message.text !== 'بعدی') {
    const res = vp.v(ctx.message.text).isEmail()
    if (res.success) {
      ctx.wizard.state.data.email = ctx.message.text
      ctx.replyWithMarkdown(
        'لینک های خود را وارد کنید و برای رفتن به مرحله‌ی بعد، `بعدی` را کلیک کنید (حداکثر ۳ لینک)',
        Markup.keyboard(['بعدی']).oneTime().resize().extra()
      )
      return ctx.wizard.next()
    } else {
      ctx.reply(res.message)
    }
  } else {
    ctx.replyWithMarkdown(
      'لینک های خود را وارد کنید و برای رفتن به مرحله‌ی بعد، `بعدی` را کلیک کنید (حداکثر ۳ لینک)',
      Markup.keyboard(['بعدی']).oneTime().resize().extra()
    )
    return ctx.wizard.next()
  }
}
