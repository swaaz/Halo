var socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');
console.log(form);
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        console.log(input.value);
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });