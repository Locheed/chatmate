module.exports = function textBoxAction(element, observe) {
  function textBoxSend(e) {
    if (e.which === 13 && !e.ctrlKey) {
      e.preventDefault();
      return false;
    }
    return true;
  } 
  observe('keydown', textBoxSend);
  textBoxSend();
};
