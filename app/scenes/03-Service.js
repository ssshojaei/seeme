import { Markup } from 'telegraf'
import VP from 'validplease'
const vp = new VP()

export const Service = ctx => {
  const res = vp.v(ctx.message.text).maxLen(35)
  if (res.success) {
    ctx.wizard.state.data.job = ctx.message.text
    ctx.reply(
      'نوع خدمات خود را از گزینه‌های زیر انتخاب کنید',
      Markup.keyboard([
        ['مدیریت پروژه', 'انجام پروژه'],
        ['مشاوره', 'سایر'],
      ])
        .oneTime()
        .resize()
        .extra()
    )
    return ctx.wizard.next()
  } else {
    ctx.reply(res.message)
  }
}
