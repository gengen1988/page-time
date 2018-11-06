function tracking(opts) {
  opts = opts || {}

  const tag = opts.tag
  const margin = opts.margin || 50
  const backend = opts.backend || 'http://page-time.k8s.vilsale.com/'
  const className = opts.className || 'tracking'

  var socket = io(backend)

  socket.on('location', function (callback) {
    callback(tag || location.toString())
  })

  var areas = Array.prototype.map.call(document.querySelectorAll('.' + className), function (el) {
    return {
      cls: el.className.split(' ').filter(function (v) {return v != className}).join(),
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
