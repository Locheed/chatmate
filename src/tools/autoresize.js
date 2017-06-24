module.exports = function textAreaResize(element, observe) {
  function resize() {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  }
  // 0-timeout to get the already changed text
  function delayedResize() {
    window.setTimeout(resize, 0);
  }
  observe('change', resize);
  observe('cut', delayedResize);
  observe('paste', delayedResize);
  observe('drop', delayedResize);
  observe('keydown', delayedResize);

  element.focus();
  element.select();
  resize();
};
