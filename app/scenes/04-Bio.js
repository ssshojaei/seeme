export const Bio = ctx => {
  const res = ['مدیریت پروژه', 'انجام پروژه', 'مشاوره', 'سایر'].includes(
    ctx.message.text
  )
  if (res) {
    ctx.wizard.state.data.service = ctx.message.text
    ctx.replyWithMarkdown(
      'لطفا خود را مختصر معرفی کنید\n' +
        'برای مثال: `از سال ۹۶ به عنوان توسعه دهنده‌ی فرانت‌اند مشغول و در ژیهات CTO هستم`'
    )
    return ctx.wizard.next()
  } else {
    ctx.reply('سرویس که انتخاب کرده‌اید در لیست نیست')
  }
}
