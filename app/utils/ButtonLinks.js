const ButtonLinks = (array, Markup) => {
  const links = []

  array.forEach(item => {
    links.push(
      Markup.urlButton(new URL(item).host.split('.')[0].toUpperCase(), item)
    )
  })
  return links
}

export default ButtonLinks
