var fs = require('fs')
var alunos = require('./alunos.json')
var docentes = require('./docentes.json')
var ucs = require('./ucs.json')
var data = "\n\n"

fs.copyFile('headers.txt', 'ontologia.ttl', (err) => {
    if (err) throw err;
    console.log('Headers escritos com sucesso!');
  });

ucs.forEach(uc => data += `:${uc._id} rdf:type owl:namedIndividual , :UnidadeCurricular ; :nome "${uc.nome}" ; :ensinadaPor :${uc.docente} .\n`)
data += '\n'

docentes.forEach(docente => data += `:${docente._id} rdf:type owl:namedIndividual , :Docente ; :nome "${docente.nome}" .\n`)
data += '\n'

alunos.forEach(aluno => {
    data += `:${aluno._id} rdf:type owl:NamedIndividual , :Aluno ; :nome "${aluno.nome}" ; :frequenta "`
    aluno.ucs.forEach(uc => data += ':' + uc + ' ')
    data += '.\n'
})
data += '\n'

fs.appendFile('ontologia.ttl', data, function (err) {
    if (err) throw err;
    console.log('Ontologia escrita com sucesso!')
})