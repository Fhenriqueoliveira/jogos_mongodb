const express = require("express");
const JogoSchema = require("./models/jogo");
const mongoose = require("./database")
const app = express();
const port = 3000;
app.use(express.json());

app.get("/",(req,res)=>{
    res.send({message:"Seus Jogos no MongoDB!!git "})
});

app.get("/jogos", async (req,res)=>{
    const jogos = await JogoSchema.find()
    res.json({jogos})
});

app.get("/jogos/:id", async (req,res)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(422).send({error:"Id inválido"});
        return;
      }
      const jogo = await JogoSchema.findById(id);
   
      if (!jogo){
        res.status(404).send({error:'Jogo não encontrado!'});
        return;
      }
      res.send({jogo});
});

app.post("/jogos", async (req,res) =>{
    const jogo = req.body;

    if(!jogo || !jogo.nome || !jogo.video || !jogo.img){
        res.status(400).send({error:'Jogo invalido'});
        return;
    }
    const novoJogo = await new JogoSchema(jogo).save();
    res.status(201).send({novoJogo})
});

app.put("/jogos/:id", async (req,res) =>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(422).send({error:"Id inválido"});
        return;
      }
      const jogo = await JogoSchema.findById(id);
      if (!jogo){
        res.status(404).send({error:'Jogo não encontrado!'});
        return;
      }
      const novoJogo = req.body;
   if(!jogo || !jogo.nome || !jogo.video || !jogo.img){
    res.status(400).send({error: 'Jogo Invalido'});
    return;
}
  await JogoSchema.findOneAndUpdate({_id:id}, novoJogo);
  const jogoAtualizado = await JogoSchema.findById(id);

  res.send({jogoAtualizado})

});

app.delete("/jogos/:id", async (req, res)=> {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
     res.status(422).send({error:"Id inválido"});
     return;
 
 }
   const jogo = await JogoSchema.findById(id);
   if (!jogo){
     res.status(404).send({error:'Jogo não encontrado!'});
     return;
   }
  await JogoSchema.findByIdAndDelete(id);
  res.send({message:'Jogo excluido com sucesso!!'});
 
 });





app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });