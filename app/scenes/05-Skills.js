import { Markup } from 'telegraf'
import VP from 'validplease'
const vp = new VP()

export const Skills = ctx => {
  const res = vp.v(ctx.message.text).minLen(30).maxLen(150)
  if (res.success) {
    ctx.wizard.state.data.bio = ctx.message.text
    ctx.replyWithMarkdown(
      'مهارت‌های خود را وارد کنید و پس از اتمام از کیبورد پایین `بعدی` را ارسال کنید (حداکثر ۵ مهارت)',
      Markup.keyboard(['بعدی']).oneTime().resize().extra()
    )
    return ctx.wizard.next()
  } else {
    ctx.reply(res.message)
  }
}
