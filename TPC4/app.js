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
    PREFIX : <http://www.daml.org/2003/01/periodictable/PeriodicTable#>
`

var app = express();

app.use(logger('dev'));
app.use(express.static('public/'));

var url = 'http://localhost:7200/repositories/PRC2021-TPC4'


app.get('/', (req,res) => {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
  res.write(templates.index())
  res.end()
})

app.get('/elementos', (req,res) => {
  var target_url = url + '?query='

  var query = 'SELECT * WHERE {    ?s a :Element ;       :name ?name ;       :atomicNumber ?number .}ORDER BY ASC (?number)'
  var encoded = encodeURIComponent(prefixes + query)
  
  axios.get(target_url + encoded)
    .then(dados => {
      var info = dados.data.results.bindings.map(bind => {return {
          symbol: bind.s.value.split('#')[1],
          name: bind.name.value,
          number: bind.number.value

      }})
      console.dir(info)
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
      res.write(templates.pagElementos(info))
      res.end()
    })
    .catch(erro => console.log(erro))
})

app.get('/grupos', (req,res) => {
  var target_url = url + '?query='

  var query = `
  SELECT * WHERE {
    ?s a :Group .
      OPTIONAL{
          ?s :name ?name ;
             :number ?number ;
      }
  }
  ORDER BY ASC (?s)
  `
  var encoded = encodeURIComponent(prefixes + query)
  
  axios.get(target_url + encoded)
    .then(dados => {
      var info = dados.data.results.bindings.map(bind => {return {
          id: bind.s.value.split('#')[1],
          name: bind.name ? bind.name.value : '',
          number: bind.number ? bind.number.value : ''

      }})
      console.dir(info)
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
      res.write(templates.pagGrupos(info))
      res.end()
    })
    .catch(erro => console.log(erro))
})

app.get('/periodos', (req,res) => {
  var target_url = url + '?query='

  var query = `
  SELECT * WHERE {
    ?s a :Period.
  }
  ORDER BY ASC (?s)
  `
  var encoded = encodeURIComponent(prefixes + query)
  
  axios.get(target_url + encoded)
    .then(dados => {
      var info = dados.data.results.bindings.map(bind => {return {
          id: bind.s.value.split('#')[1],
      }})

      console.dir(info)
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
      res.write(templates.pagPeriodos(info))
      res.end()
    })
    .catch(erro => console.log(erro))
})

app.get('/elementos/:elem', (req,res) => {
  var target_url = url + '?query='

  var query = `
  SELECT * WHERE {
    :${req.params.elem} :name ?name ;
       :symbol ?symbol ;
       :atomicNumber ?number;
       :atomicWeight ?weight;
       :group ?group ;
       :period ?period ;
       :standardState ?state ;
       :color ?color ;
       :classification ?classification .
}`
  var encoded = encodeURIComponent(prefixes + query)
  
  axios.get(target_url + encoded)
    .then(dados => {
      var info = dados.data.results.bindings.map(bind => {return {
          symbol: bind.symbol.value,
          name: bind.name.value,
          number: bind.number.value,
          weight: bind.weight.value,
          group: bind.group.value.split('#')[1],
          period: bind.period.value.split('#')[1],
          state: bind.state.value.split('#')[1],
          color: bind.color.value,
          classification: bind.classification.value.split('#')[1]

      }})
      console.dir(info)
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
      res.write(templates.pagElemento(info))
      res.end()
    })
    .catch(erro => console.log(erro))
})

app.get('/grupos/:grupo', (req,res) => {
  var target_url = url + '?query='

  var query = `
  SELECT * WHERE {
    :${req.params.grupo} :element ?elemento.
  }
  `
  var encoded = encodeURIComponent(prefixes + query)
  
  axios.get(target_url + encoded)
    .then(dados => {
      var info = dados.data.results.bindings.map(bind => {return {
          id: bind.elemento.value.split('#')[1]

      }})
      console.dir(info)
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
      res.write(templates.pagGrupo(info,req.params.grupo))
      res.end()
    })
    .catch(erro => console.log(erro))
})

app.listen(5000, () => console.log('Servidor à escuta na porta 5000'))

app.get('/periodos/:periodo', (req,res) => {
  var target_url = url + '?query='

  var query = `
  SELECT * WHERE {
    :${req.params.periodo} :element ?elemento.
  }
  `
  var encoded = encodeURIComponent(prefixes + query)
  
  axios.get(target_url + encoded)
    .then(dados => {
      var info = dados.data.results.bindings.map(bind => {return {
          id: bind.elemento.value.split('#')[1]

      }})
      console.dir(info)
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
      res.write(templates.pagPeriodo(info,req.params.periodo))
      res.end()
    })
    .catch(erro => console.log(erro))
})

app.listen(5001, () => console.log('Servidor à escuta na porta 5001'))