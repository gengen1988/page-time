function tracking(url, tag, margin) {
  tag = tag || 'tracker'
  margin = margin || 50

  var socket = io(url)
  var areas = Array.prototype.map.call(document.querySelectorAll('.' + tag), function (el) {
    return {
      cls: el.className.split(' ').filter(function (v) {return v != tag}).join(),
      top: el.offsetTop,
      bottom: el.offsetTop + el.offsetHeight
    }
  })

  function areasOnScreen(areas, margin) {
    var scrollTop = window.scrollY
    var windowHeight = window.innerHeight

    return areas.reduce(function (memo, area) {
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
