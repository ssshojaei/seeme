import { Markup } from 'telegraf'
import VP from 'validplease'
const vp = new VP()

export const Email = ctx => {
  if (ctx.message.text !== 'بعدی') {
    const res = vp.v(ctx.message.text).isMobile()
    if (res.success) {
      ctx.wizard.state.data.phone = ctx.message.text
      ctx.reply(
        'آدرس ایمیل خود را وارد کنید یا بعدی را کلیک کنید',
        Markup.keyboard(['بعدی']).oneTime().resize().extra()
      )
      return ctx.wizard.next()
    } else {
      ctx.reply(res.message)
    }
  } else {
    ctx.reply(
      'آدرس ایمیل خود را وارد کنید یا بعدی را کلیک کنید',
      Markup.keyboard(['بعدی']).oneTime().resize().extra()
    )
    return ctx.wizard.next()
  }
}
