import { Markup } from 'telegraf'
import VP from 'validplease'
const vp = new VP()

export const Phone = ctx => {
  if (ctx.message.text !== 'بعدی') {
    const res = vp.v(ctx.message.text).maxLen(150)
    if (res.success) {
      ctx.wizard.state.data.address = ctx.message.text
      ctx.reply(
        'شماره تماس خود را وارد کنید',
        Markup.keyboard(['بعدی']).oneTime().resize().extra()
      )
      return ctx.wizard.next()
    } else {
      ctx.reply(res.message)
    }
  } else {
    ctx.reply(
      'شماره تماس خود را وارد کنید',
      Markup.keyboard(['بعدی']).oneTime().resize().extra()
    )
    return ctx.wizard.next()
  }
}
