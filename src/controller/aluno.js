const aluno = require('../model/aluno')


module.exports = app => {

    app.get('/alunos', 
    (req, res) => 
    {
      aluno.listaAlunos( lista =>{
          res.json({lista: lista});
        });
    })

    app.get('/alunos/:id', 
    (req, res) => 
    {
      aluno.getAluno(req.params.id, aluno =>{
          res.json({aluno: aluno});
        });
    })

    //Edita um registro especifico
    app.patch('/alunos',  async (req, res) => 
    {
      aluno.editaAluno(req.body, aluno =>{
        res.json({aluno: aluno});
      });
      
    });

    app.post('/alunos',   async function (req, res) {

      aluno.insereAluno(req.body, aluno =>{
        res.json({aluno: aluno});
      });
    })

    app.delete('/alunos/:id',  (req, res) => {

        aluno.removeAluno(req.params.id, aluno =>{
            res.json({aluno: aluno});
          });
     });
}
