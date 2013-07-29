$(function()
{
    var windowHeight = $(window).height();
    var teamContentHeight = (windowHeight - $('.banner').height()) / 2;

    var $teamOneContainer = $('.team-one-container');
    var $teamTwoContainer = $('.team-two-container');

    var $teamOneScoreHolder = $('.team-one-score');
    var $teamTwoScoreHolder = $('.team-two-score');
    
    
    /*
    *
    *
    * SET UP WEBSOCKET CONNECTION
    *
    *
    */
    var socket = io.connect('http://washers.tcombs.c9.io');
    socket.on('update scores', function (data) {
        $teamOneScoreHolder.empty().append(data.game.teamonescore);
        $teamTwoScoreHolder.empty().append(data.game.teamtwoscore);
    });


    
    
    //Team One Buttons

    $('.plus-three-team-one').click(function(e)
    {
        e.preventDefault();
        //add three to the score
        var currentScore = parseInt($teamOneScoreHolder.text());
        currentScore += 3;
        $teamOneScoreHolder.empty().append(currentScore);
        var url = $(this).attr('href');
        $.get(url, function(game)
        {
           socket.emit('changes', game);
        });

    });


    $('.plus-one-team-one').click(function(e)
    {
        e.preventDefault();
        var currentScore = parseInt($teamOneScoreHolder.text());
        currentScore += 1;
        $teamOneScoreHolder.empty().append(currentScore);
        var url = $(this).attr('href');
        $.get(url, function(game)
        {
            socket.emit('changes', game);
        });
    });


    $('.minus-three-team-one').click(function(e)
    {
        e.preventDefault();
        var currentScore = parseInt($teamOneScoreHolder.text());
        currentScore -= 3;
        $teamOneScoreHolder.empty().append(currentScore);
        var url = $(this).attr('href');
        $.get(url, function(game)
        {
            socket.emit('changes', game);
        });
    });


    $('.minus-one-team-one').click(function(e)
    {
        e.preventDefault();
        var currentScore = parseInt($teamOneScoreHolder.text());
        currentScore -= 1;
        $teamOneScoreHolder.empty().append(currentScore);
        var currentScore = parseInt($teamOneScoreHolder.text());
        var url = $(this).attr('href');
        $.get(url, function(game)
        {
            socket.emit('changes', game);
        });
    });

    /*
    *
    *
    * TEAM TWO BUTTONS
    *
    *
    */
    
    $('.plus-three-team-two').click(function(e)
    {
        e.preventDefault();
        var currentScore = parseInt($teamTwoScoreHolder.text());
        currentScore += 3;
        $teamTwoScoreHolder.empty().append(currentScore);
        var url = $(this).attr('href');
        $.get(url, function(game)
        {
            socket.emit('changes', game);
        });
    });


    $('.plus-one-team-two').click(function(e)
    {
        e.preventDefault();
        var currentScore = parseInt($teamTwoScoreHolder.text());
        currentScore += 1;
        $teamTwoScoreHolder.empty().append(currentScore);
        var url = $(this).attr('href');
        $.get(url, function(game)
        {
            socket.emit('changes', game);
        });
    });


    $('.minus-three-team-two').click(function(e)
    {
        e.preventDefault();
        var currentScore = parseInt($teamTwoScoreHolder.text());
        currentScore -= 3;
        $teamTwoScoreHolder.empty().append(currentScore);
        var url = $(this).attr('href');
        $.get(url, function(game)
        {
            socket.emit('changes', game);
        });
    });


    $('.minus-one-team-two').click(function(e)
    {
        e.preventDefault();
        var currentScore = parseInt($teamTwoScoreHolder.text());
        currentScore -= 1;
        $teamTwoScoreHolder.empty().append(currentScore);
        var url = $(this).attr('href');
        $.get(url, function(game)
        {
            socket.emit('changes', game);
        });
    });

    $('.clear').click(function(e){
        e.preventDefault();
        var url = $(this).attr('href');
        $.get(url, function(game)
        {
            socket.emit('changes', game);
        });

    });

});