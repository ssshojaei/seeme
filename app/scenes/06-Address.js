import { Markup } from 'telegraf'

export const Address = ctx => {
  const skills = ctx.wizard.state.data.skills
  if (Array.isArray(skills)) {
    if (skills.length >= 4 || ctx.message.text === 'بعدی') {
      ctx.replyWithMarkdown(
        'آدرس دفتر خود را وارد کنید یا بر روی `بعدی` کلیک کنید',
        Markup.keyboard(['بعدی']).oneTime().resize().extra()
      )
      return ctx.wizard.next()
    }
    ctx.wizard.state.data.skills = [...skills, ctx.message.text]
    ctx.replyWithMarkdown(`${ctx.message.text} اضافه شد`)
  } else {
    if (ctx.message.text === 'بعدی') {
      ctx.replyWithMarkdown('دست کم به یک مهارت در معرفی خود نیاز دارید')
    } else {
      ctx.wizard.state.data.skills = [ctx.message.text]
      ctx.replyWithMarkdown(`${ctx.message.text} اضافه شد`)
    }
  }
}
