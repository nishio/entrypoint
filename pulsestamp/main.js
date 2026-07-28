$(function(){
  function print(s){
    $('#log').text(
      $('#log').text() + s + "\n"
    );
  }
  print('OK');

  var pad_width = 150;

  $('#pad_width').change(function(){
    var w = $('#pad_width').val();
    console.log(w)
    $('#pad').width(w).height(w);
    pad_width = $('#pad').width();
  })

  function get_pos(e){
    var x = e.offsetX, y = e.offsetY;
    // console.log(x, y);
    var ix = Math.floor(x * 3 / pad_width);
    var iy = Math.floor(y * 3 / pad_width);
    var i = ix + iy * 3;
    i = [5, 4, 3, 6, 8, 2, 7, 0, 1][i];
    // 543
    // 682
    // 701
    return i;
  }

  $('#pad').click(function(e){
  })

  var state = [0, 0, 0, 0, 0, 0, 0, 0];
  function mousedown(e){
    var i = get_pos(e);
    e.preventDefault();
    state[i] = 1;
  }
  function mouseup(e){
    var i = get_pos(e);
    e.preventDefault();
    state[i] = 0;
  }
  $('#pad').mousedown(function(e){
    mousedown(e);
  });
  $('#pad').mouseup(function(e){
    mouseup(e);
  });
  $('#pad').bind('touchstart', function(es){
    log(es);
    log(es.touches);
    log(es.touches[0]);
    log(es.touches.forEach);

    es.forEach(mousedown)
  });
  $('#pad').bind('touchend', function(es){
    es.forEach(mouseup);
  });

  function get_state_as_int(){
    return state[7] * 128 + state[6] * 64 + state[5] * 32 + state[4] * 16 + state[3] * 8 + state[2] * 4 + state[1] * 2 + state[0];
  }

  setInterval(function(){
    if(state.some(function(x){return x})){
      console.log(state);
      print(state + ":" + String.fromCharCode(get_state_as_int()));
    }
  }, 100)
})
