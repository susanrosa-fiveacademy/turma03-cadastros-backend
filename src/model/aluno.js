const { Client } = require('pg');
const moment = require("moment")

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect()


class Aluno { 

  listaAlunos(callback){
   
    client.query(`  SELECT nm_pessoa, 
                            to_char(dt_nascimento, 'YYYY-mm-dd') dt_nascimento, 
                            ds_cpf, 
                            ds_email, 
                            ds_telefone, 
                            ds_cep, 
                            ds_logradouro, 
                            ds_numero, 
                            ds_complemento, 
                            ds_bairro, 
                            ds_cidade, 
                            ds_estado, 
                            ds_observacao, 
                            nr_sequencia
                    FROM    pessoa`
    , (err, res) => {
      let rows = res.rows;
     
     // console.log(err, res)
      callback(rows)
      
      })
  }

  getAluno(id, callback){
 
    client.query(`  SELECT nm_pessoa, 
                            to_char(dt_nascimento, 'YYYY-mm-dd') dt_nascimento, 
                            ds_cpf, 
                            ds_email, 
                            ds_telefone, 
                            ds_cep, 
                            ds_logradouro, 
                            ds_numero, 
                            ds_complemento, 
                            ds_bairro, 
                            ds_cidade, 
                            ds_estado, 
                            ds_observacao, 
                            nr_sequencia
                    FROM    pessoa
                    WHERE   nr_sequencia = $1`,
                    [id]
    , (err, res) => {
     // console.log(err, res)
     let rows = res.rows;
   
      callback(rows);
     
      })
  }

  insereAluno(aluno, callback) {

    aluno.dt_nascimento = this.validaData(aluno.dt_nascimento);
    aluno.ds_cpf = this.onlyNumbers(aluno.ds_cpf);
    client.query(
        `INSERT INTO pessoa
          (nm_pessoa, dt_nascimento, ds_cpf, ds_email, ds_telefone, ds_cep, ds_logradouro, ds_numero, ds_complemento, ds_bairro, ds_cidade, ds_estado, ds_observacao)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13); `, 
        [aluno.nm_pessoa, aluno.dt_nascimento, aluno.ds_cpf, aluno.ds_email, aluno.ds_telefone, aluno.ds_cep, aluno.ds_logradouro, aluno.ds_numero, aluno.ds_complemento, aluno.ds_bairro, aluno.ds_cidade, aluno.ds_estado, aluno.ds_observacao],
        (err, res) => {
          console.log(err, res)
        

          callback();
    });
  }

  removeAluno(id, callback){

    client.query(`  DELETE
                    FROM    pessoa
                    WHERE nr_sequencia = $1`,
    [id],
     (err, res) => {
     // console.log(err, res)
      callback(res.rows)
      });

  }

  editaAluno(aluno, callback) {

    aluno.dt_nascimento = this.validaData(aluno.dt_nascimento);
    aluno.ds_cpf = this.onlyNumbers(aluno.ds_cpf);
    client.query(
        `UPDATE  pessoa
        SET 
        nm_pessoa = $1,
        dt_nascimento = $2 , 
        ds_cpf = $3 , 
        ds_email = $4 , 
        ds_telefone = $5 , 
        ds_cep = $6 , 
        ds_logradouro = $7 , 
        ds_numero = $8 , 
        ds_complemento = $9 , 
        ds_bairro = $10 , 
        ds_cidade = $11 , 
        ds_estado = $12 , 
        ds_observacao = $13
        WHERE nr_sequencia = $14 `, 
        [aluno.nm_pessoa, aluno.dt_nascimento, aluno.ds_cpf, aluno.ds_email, aluno.ds_telefone, aluno.ds_cep, aluno.ds_logradouro, aluno.ds_numero, aluno.ds_complemento, aluno.ds_bairro, aluno.ds_cidade, aluno.ds_estado, aluno.ds_observacao, aluno.nr_sequencia],
        (err, res) => {
          console.log(err, res);
          callback();
    })
  }

  validaData(data){
    if (data == ''){
      data = null;
    } else{
      data = moment(data , 'YYYY-MM-DD').toDate(); 
    }
    return data;
  }

  onlyNumbers(strCPF) {
    let onlyNumbers = strCPF.replace(/[^0-9]/g, '');
    return onlyNumbers;
  };
}

module.exports = new Aluno