var Game = require('../models/game.js');

exports.index = function(req, res) {
    Game.findOne(function(err, game) {
        //res.setHeader('Access-Control-Allow-Origin','http://appName.userName.c9.io');
        res.render('index', { teamOneScore: game.teamonescore, teamTwoScore: game.teamtwoscore });
    });
        
    
};

exports.add = function(req, res) {
    var team = parseInt(req.params.team);
    var ammount = parseInt(req.params.ammount);
    Game.findOne(function(err, game) {
        if(team == 1)
        {
            game.teamonescore += ammount;
        }
        else if(team == 2)
        {
            game.teamtwoscore += ammount;
        }
        game.save(function() {
            res.send(game);
        });
        
    });
};

exports.sub = function(req, res) {
    var team = parseInt(req.params.team);
    var ammount = parseInt(req.params.ammount);
    Game.findOne(function(err, game) {
        if(team == 1)
        {
            game.teamonescore -= ammount;
        }
        else if(team == 2)
        {
            game.teamtwoscore -= ammount;
        }
        game.save(function() {
            res.send(game);
        });
        
    });
};

exports.new = function(req,res) {
    Game.find({},function(err,docs) {
        for (var i = 0; i < docs.length; i++) {
            var doc = docs[i];
            doc.remove();
        }
    });
    new Game().save(function () {
        res.redirect('/');
    });
    
};

exports.clear = function(req,res) {
    Game.findOne(function(err, game) {
        game.teamonescore =0;
        game.teamtwoscore =0;
        game.save(function() {
            res.send(game);
        });
    });
};

exports.getGame = function(callback) {
    Game.findOne(function(err, game) {
        callback(game);
    });
};




    
