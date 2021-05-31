var express = require('express');
var logger = require('morgan');
var axios = require('axios');

const prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX : <http://www.semanticweb.org/joaop/ontologies/2021/4/emd#>
`

var app = express();

app.use(logger('dev'));
app.use(express.static('public/'));

var url = 'http://localhost:7200/repositories/PRC2021-Teste'


app.get('/emd', (req,res) => {
  var target_url = url + '?query='

  if (req.query.res) {
    var query = `
      SELECT ?id ?nome ?data ?resultado WHERE {
        ?id a :EMD ;
        :resultado "True" ;
          :data ?data ;
            :relativoA ?personid .
        ?personid a :Atleta ;
                  :nome ?nome .
      }
    `
  } else {
    var query = `
      SELECT ?id ?nome ?data ?resultado WHERE {
        ?id a :EMD ;
        :resultado ?resultado ;
          :data ?data ;
            :relativoA ?personid .
        ?personid a :Atleta ;
                  :nome ?nome .
      }
    `
  }

  var encoded = encodeURIComponent(prefixes + query)
  
  axios.get(target_url + encoded)
    .then(dados => {
      if (!req.query.res) {
        var info = dados.data.results.bindings.map(bind => {return {
            id: bind.id.value.split('#')[1],
            nome: bind.nome.value,
            data: bind.data.value,
            resultado: bind.resultado.value
        }})
      } else {
        var info = dados.data.results.bindings.map(bind => {return {
          id: bind.id.value.split('#')[1],
          nome: bind.nome.value,
          data: bind.data.value
        }})
      }
      console.dir(info)
      
      res.json(info)
      res.end()
    })
    .catch(erro => console.log(erro))
})

app.get('/emd/:id', (req,res) => {
  var id = req.params.id
  var target_url = url + '?query='

  var query = `
    SELECT ?nome ?modalidade ?data ?resultado WHERE {
      :${id} a :EMD ;
            :relativoA ?personid ;
            :referenteA ?modalidade ;
            :data ?data ;
            :resultado ?resultado .
      ?personid a :Atleta ;
                :nome ?nome
    }
`
  var encoded = encodeURIComponent(prefixes + query)
  
  axios.get(target_url + encoded)
    .then(dados => {
      var info = dados.data.results.bindings.map(bind => {return {
          nome: bind.nome.value,
          data: bind.data.value,
          resultado: bind.resultado.value,
          modalidade: bind.modalidade.value.split("#")[1]
      }})

      console.dir(info)
      
      res.json(info)
      res.end()
    })
    .catch(erro => console.log(erro))
})

app.get('/modalidades', (req,res) => {
  var target_url = url + '?query='

  var query = `
    SELECT ?nome WHERE {
      ?nome a :Modalidade .
    }
`
  var encoded = encodeURIComponent(prefixes + query)
  
  axios.get(target_url + encoded)
    .then(dados => {
      var info = dados.data.results.bindings.map(bind => {return {
          nome: bind.nome.value.split("#")[1],
      }})

      console.dir(info)
      
      res.json(info)
      res.end()
    })
    .catch(erro => console.log(erro))
})

app.get('/modalidades/:id', (req,res) => {
  var id = req.params.id
  var target_url = url + '?query='

  var query = `
    SELECT ?id WHERE {
      ?id a :EMD ;
            :referenteA :${id} . 
    }
`
  var encoded = encodeURIComponent(prefixes + query)
  
  axios.get(target_url + encoded)
    .then(dados => {
      var info = dados.data.results.bindings.map(bind => {return {
          id: bind.id.value.split("#")[1],
      }})

      console.dir(info)
      
      res.json(info)
      res.end()
    })
    .catch(erro => console.log(erro))
})

app.get('/atletas', (req,res) => {
  var id = req.params.id
  var target_url = url + '?query='

  if (req.query.gen) {
    var query = `
      SELECT ?nome WHERE {
        ?id a :Atleta ;
              :nome ?nome ;
              :genero "${req.query.gen}" .
      } ORDERBY (?nome)
    `

  } else if (req.query.clube) {
    var query = `
      SELECT ?nome WHERE {
        ?id a :Atleta ;
              :nome ?nome ;
              :eAtletaEm ${req.query.clube} .
      } ORDERBY (?nome)
    `
  }

  var encoded = encodeURIComponent(prefixes + query)
  
  axios.get(target_url + encoded)
    .then(dados => {
      var info = dados.data.results.bindings.map(bind => {return {
          nome: bind.nome.value,
      }})

      console.dir(info)
      
      res.json(info)
      res.end()
    })
    .catch(erro => console.log(erro))
})


app.listen(5001, () => console.log('Servidor à escuta na porta 5001'))