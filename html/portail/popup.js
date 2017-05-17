document.addEventListener('DOMContentLoaded', function() {
  //get the variable from popup.html
  var un = document.getElementById('username');
  var pw = document.getElementById('password');
  var on_off = document.getElementById('on_off');
  var save_btn = document.getElementById('save');
  var info = document.getElementById('info');

  //initialisation the form with storage
  chrome.storage.local.get(['un', 'pw', 'on'], function(result) {
    if (result.un)  //result是get到的结果
      un.value = result.un;  
    if (result.pw)
      pw.value = result.pw;
    //turn is used to record the current state of result.on
    var turn = result.on ? 1 : 0;
    if (1 == turn) {
      on_off.textContent = 'On';
      on_off.style.background = 'green';
    } else {
      on_off.textContent = 'Off';
      on_off.style.background = 'gray';
    }

    //the function for on/off button
    on_off.onclick = function() {
      turn = 1 - turn;
      chrome.storage.local.set({
        'on': turn
      }, function() {
        if (1 == turn) {
          on_off.textContent = 'On';
          on_off.style.background = 'green';
          info.textContent = 'funcion actived';
        } else {
          on_off.textContent = 'Off';
          on_off.style.background = 'gray';
          info.textContent = 'function closed';
        }
      });
    };
  });

  //the function for save button
  save_btn.onclick = function() {
    //in case that informations are not complet
    if (un.value == '') {
      un.focus();
      return false;
    }
    if (pw.value == '') {
      pw.focus();
      return false;
    }
    //store the information
    chrome.storage.local.set({
      'un': un.value,
      'pw': pw.value
    }, function() {
      info.textContent = 'info saved';
    });
  };

});