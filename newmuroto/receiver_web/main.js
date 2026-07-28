$(function(){
  function print(s){
    $('#log').text(
      $('#log').text() + s + "\n"
    );
  }
  print('OK');

  var pad_width = null;
  function change_pad_size(){
    var w = $('#pad_width').val();
    $('#pad').width(w).height(w);
    pad_width = $('#pad').width();
    $('#pad_width').blur();
  }
  $('#pad_width').change(change_pad_size)
  change_pad_size();

  function get_pos(e){
    var x = e.offsetX, y = e.offsetY;
    if(x == null){  // it occurs when `e` is a touch event.
      var p = $('#pad').offset();
      x = e.clientX - p.left;
      y = e.clientY - p.top;
    }
    console.log('pos:', x, y);
    var ix = Math.floor(x * 3 / pad_width);
    var iy = Math.floor(y * 3 / pad_width);
    var i = ix + iy * 3;
    i = [5, 4, 3,
         6, 8, 2,
         7, 0, 1][i];
    console.log("get_pos result:", i);
    return i;
  }

  function demo(){
    print(state + ":" + String.fromCharCode(get_state_as_int()));
    if(state.some(function(x){return x})){
      var id = state.findIndex(function(x){return x == 1});
      if(id != 2 && id != 6){
        $('#image').attr('src', 'images/' + id + '.png');
      }
    }
  }

  var state = [0, 0, 0, 0, 0, 0, 0, 0];
  function sth_down(e) {
    console.log("SomethingDown", e);
    var i = get_pos(e);
    state[i] = 1;
    if(IS_DEMO){
      demo();
    }else{
      print(state + ":" + String.fromCharCode(get_state_as_int()));
    }
  }

  function mouseup(e){
    console.log("MouseUp", e);
    var i = get_pos(e);
    state[i] = 0;
  }

  $('#pad').mousedown(function(e){
    console.log('mousedown handler');
    sth_down(e);
    e.preventDefault();
  });

  $('#pad').mouseup(function(e){
    console.log('mouseup handler');
    mouseup(e);
    e.preventDefault();
  });

  $('#pad').bind('touchstart', function(es){
    console.log('touchstart handler');
    console.log(es);
    es.preventDefault();
    var touches = es.originalEvent.changedTouches;
    console.log(touches);
    for(var i = 0; i < touches.length; i++){
      sth_down(touches[i]);
    }
  });

  $('#pad').bind('touchend', function(es){
    console.log('touchstart handler');
    console.log(es);
    es.preventDefault();
    var touches = es.originalEvent.changedTouches;
    console.log(touches);
    for(var i = 0; i < touches.length; i++){
      mouseup(touches[i]);
    }
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
