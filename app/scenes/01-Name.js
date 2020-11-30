export const Name = ctx => {
  ctx.replyWithMarkdown(
    'نام کامل خود را وارد کنید\n' + 'برای مثال: `سید صالح شجاعی`'
  )
  ctx.wizard.state.data = {}
  return ctx.wizard.next()
}
