var express = require('express');
var logger = require('morgan');
var axios = require('axios');
var templates = require('./html-templates');

const prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX adv: <http://www.di.uminho.pt/Charada#>
`

var url = 'http://localhost:7200/repositories'

var app = express();


app.use(logger('dev'));
app.use(express.static('public/'));

app.get('/', (req,res) => {
  axios.get('http://localhost:7200/rest/repositories')
    .then(dados => {
      var repos = dados.data.map(repo => repo.id)
      console.dir(repos)
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
			res.write(templates.listarepos(repos))
			res.end()
    })
    .catch(erro => console.log(erro))
})


/* TODAS AS CLASSES */
app.get('/:repo', (req,res) => {
  var target_url = url + '/' + req.params.repo + '?query='

  var query = 'SELECT ?s WHERE { ?s rdf:type owl:Class}'
  var encoded = encodeURIComponent(prefixes + query)
  
  axios.get(target_url + encoded)
    .then(dados => {
        var classes = dados.data.results.bindings.map(bind => bind.s.value.split('#')[1])
        console.dir(classes)
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
        res.write(templates.listaclasses(classes,req.params.repo))
        res.end()
    })
    .catch(erro => console.log(erro))
})

app.get('/:repo/:class', (req,res) => {
  var target_url = url + '/' + req.params.repo + '?query='

  var query = `SELECT ?s WHERE { ?s rdf:type adv:${req.params.class}}`
  var encoded = encodeURIComponent(prefixes + query)
  
  axios.get(target_url + encoded)
    .then(dados => {
        var inds = dados.data.results.bindings.map(bind => bind.s.value.split('#')[1])
        console.dir(inds)
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
        res.write(templates.pagclass(inds,req.params.class,req.params.repo))
        res.end()
    })
    .catch(erro => console.log(erro))

})

app.get('/:repo/:class/:ind', (req,res) => {
  var target_url = url + '/' + req.params.repo + '?query='

  var query = `SELECT * WHERE { adv:${req.params.ind} ?p ?o}`
  var encoded = encodeURIComponent(prefixes + query)
  
  axios.get(target_url + encoded)
    .then(dados => {
      var props = dados.data.results.bindings.map(bind => {return {
          p: bind.p.value.split('#')[1],
          o: (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1]

      }})
      console.dir(props)
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
      res.write(templates.pagind(props,req.params.ind))
      res.end()
    })
    .catch(erro => console.log(erro))
})

//GERAR O HTML


/*

			res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
			res.write(templates.listanivel1(data))
			res.end()

*/


app.listen(5000, () => console.log('Servidor à escuta na porta 5000'))