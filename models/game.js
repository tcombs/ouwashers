//The Game Model

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var gameSchema = new Schema({
    createdon: {type: Date, default: Date.now},
    teamonescore: {type: Number, default: 0},
    teamtwoscore: {type: Number, default: 0}
});
 
module.exports = mongoose.model('Game', gameSchema);
