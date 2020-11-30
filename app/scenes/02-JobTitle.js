import VP from 'validplease'
const vp = new VP()

export const JobTitle = ctx => {
  const res = vp.v(ctx.message.text).isPersian()
  if (res.success) {
    ctx.wizard.state.data.name = ctx.message.text
    ctx.replyWithMarkdown(
      'عنوان شغلی خود را وارد کنید\n' + 'برای مثال: `Senior FrontEnd Developer`'
    )
    return ctx.wizard.next()
  } else {
    ctx.reply('لطفا نام خود را به فارسی وارد کنید')
  }
}
