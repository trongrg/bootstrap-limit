$(document).ready(function() {
  $(".limit").limit({
    maxLength: 20,
    counter: '#counter1',
    removeMaxLengthAttr: true,
    threshold: 10,
    color: 'red'
  });
});
