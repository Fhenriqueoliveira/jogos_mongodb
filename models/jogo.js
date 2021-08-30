const mongoose = require("../database/index");

//Nome do Jogo , Video de alguma parte do jogo , imagem da capa.
const jogoSchema = new mongoose.Schema({
    nome : {
        type:String,
        require:true
    },
    video:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true
    }

});

const Jogo = mongoose.model("Jogo",jogoSchema)

module.exports = Jogo;