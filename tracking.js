function tracking(tag = 'tracker', margin = 50) {
  const socket = io()
  const areas = $(`.${tag}`)
    .map((i, el) => ({
      cls: $(el).attr('class').split(' ').filter(v => v != tag).join(),
      top: $(el).offset().top,
      bottom: $(el).offset().top + $(el).height()
    }))
    .toArray()

  function areasOnScreen(areas, margin) {
    const scrollTop = $(window).scrollTop()
    const windowHeight = $(window).height()
    return areas.reduce((memo, area) => {
      if (scrollTop > area.top - windowHeight + margin && scrollTop < area.bottom - margin) {
        memo.push(area.cls)
      }
      return memo
    }, [])
  }

  function feedback() {
    socket.emit('scroll', areasOnScreen(areas, margin))
  }

  window.addEventListener('scroll', feedback)
  feedback()
}
