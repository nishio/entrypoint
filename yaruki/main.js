$(function(){
    var path='';
    var p_message = $('#message');
    var btn_left = $('#left');
    var btn_right = $('#right');
    var textinput = $('#textinput');
    var NONE = 'NONE';

    var random_index = Math.floor(Math.random() * STORIES.length);
    var story = STORIES[random_index];
    var current_state = story.INITIAL_STATE;
    var mode; // story or oneclick
    var oneclick_answer_id;

    function record(q){
        if(story.VERSION == 'debug' || window.DEBUG){
            console.log(q);
        }else{
            _gaq.push(['_trackPageview', '/' + story.VERSION + q]);
        }
    }

    function onbeforeunload(){
        if(story.END_PAGES.indexOf(current_state) != -1) return;
        if(mode == 'oneclick') return;
        path += ',exit';
        record('/path/' + path);
    }
    window.onbeforeunload = onbeforeunload

    function update_story(state){
        if(state == null){
            state = current_state;
        }else{
            current_state = state;
        }
        var s = story.data[state];
        record('/q/' + state);
        path += state;

        // if it is end page, record path
        if(story.END_PAGES.indexOf(state) != -1){
            record('/path/' + path);
        }

        // update UI
        p_message.html(s['message']);
        var left = s['left_message'];
        if(left == NONE){
            btn_left.addClass('hidden');
        }else{
            btn_left.removeClass('hidden');
            btn_left.text(left);
        }
        var right = s['right_message'];
        if(right == NONE){
            btn_right.addClass('hidden');
        }else{
            btn_right.removeClass('hidden');
            btn_right.text(right);
        }

        // if it is input node, show inputbox
        if(story.INPUT_PAGES.indexOf(state) != -1){
            textinput.css('display', 'inline');
            textinput.focus();
            btn_left.addClass('disabled');
        }else{
            textinput.css('display','none');
        }

        // if it is end page, record path
        if(story.END_PAGES.indexOf(state) != -1){
            $('#response').appendTo($('#box'))
            .css('text-align', 'center')
            .css('font-weight', 'bold');
        }
    }

    function show_oneclick(){
        // choice one solution

        var answers = story.oneclick_answers;
        oneclick_answer_id = Math.floor(Math.random() * answers.length);
        message = answers[oneclick_answer_id];

        // update UI
        p_message.html(message);
        var left = '他の案を見る';
        btn_left.removeClass('hidden');
        btn_left.text(left);

        var right = 'やる気でた！';
        btn_right.removeClass('hidden');
        btn_right.text(right);

        textinput.css('display','none');
    }

    btn_left.click(function(){
        if(btn_left.hasClass('disabled')) return;

        if(mode == 'oneclick'){
            record('/oneclick/' + oneclick_answer_id + '/left/')
            show_oneclick();
            return false;
        }

        record('/q/' + current_state + '/left/');
        path += ',L,';

        // if it is input node, record input
        if(story.INPUT_PAGES.indexOf(current_state) != -1){
            record('/' + current_state + '/' + textinput.val())
            textinput.val('');
        }

        current_state = story.data[current_state]['left'];
        update_story();
    })

    btn_right.click(function(){

        if(mode == 'oneclick'){
            record('/oneclick/' + oneclick_answer_id + '/right/')
            update_story('thanks');
            return false;  // cancel original event handling (to navigate #)
        }

        record('/q/' + current_state + '/right/');
        path += ',R,';
        current_state = story.data[current_state]['right'];
        update_story();
    })

    textinput.on('change keydown paste input', function(){
        btn_left.removeClass('disabled');
    })

    // for debug
    window.update_story = update_story;

    function main(){
        if(location.search == '?oneclick'){
            mode = 'oneclick';
            record('/start_oneclick/');
            show_oneclick();
        }else{
            mode = 'story';
            update_story();
        }
    }

    main();
})