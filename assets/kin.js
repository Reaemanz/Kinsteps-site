// Header shadow once the page moves, the mobile menu, and the card slider's arrows.
(function () {
  var header = document.getElementById('header');
  var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 4); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var toggle = document.getElementById('menu-toggle');
  var setMenu = function (open) {
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
  document.querySelectorAll('#nav a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  document.querySelectorAll('[data-slider]').forEach(function (slider) {
    var track = slider.querySelector('[data-track]');
    var prev = slider.querySelector('[data-prev]');
    var next = slider.querySelector('[data-next]');
    var step = function () { return track.firstElementChild.getBoundingClientRect().width + 24; };
    var update = function () {
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
      slider.classList.toggle('static', prev.disabled && next.disabled);
    };
    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();
