const isValidHttpUrl = string => {
  let url

  try {
    url = new URL(string)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

export const Image = ctx => {
  const links = ctx.wizard.state.data.links

  if (Array.isArray(links)) {
    if (links.length >= 2 || ctx.message.text === 'بعدی') {
      ctx.replyWithMarkdown(
        'یک تصویر از خودتان ارسال کنید (این کار به همکاران شما اطمینان میدهد که کاربری واقعی و قابل اعتماد هستید)'
      )
      return ctx.wizard.next()
    }
    if (isValidHttpUrl(ctx.message.text)) {
      ctx.wizard.state.data.links = [...links, ctx.message.text]
      ctx.replyWithMarkdown(`${ctx.message.text} اضافه شد`)
    } else {
      ctx.replyWithMarkdown(
        'لینک ارسالی معتبر نیست، لینک کامل را ارسال کنید\n' +
          'مثلا: `https://roxaleh.ir/`'
      )
    }
  } else {
    if (ctx.message.text !== 'بعدی') {
      if (isValidHttpUrl(ctx.message.text)) {
        ctx.wizard.state.data.links = [ctx.message.text]
        ctx.replyWithMarkdown(`${ctx.message.text} اضافه شد`)
      } else {
        ctx.replyWithMarkdown(
          'لینک ارسالی معتبر نیست، لینک کامل را ارسال کنید\n' +
            'مثلا: `https://roxaleh.ir`'
        )
      }
    }
  }
}
