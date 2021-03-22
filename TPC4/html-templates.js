exports.index = index
exports.pagElementos = pagElementos
exports.pagElemento = pagElemento
exports.pagGrupos = pagGrupos
exports.pagGrupo = pagGrupo
exports.pagPeriodos = pagPeriodos
exports.pagPeriodo = pagPeriodo

function index () {
	let pagHTML = `
	<html>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="/w3.css"/>
	<body>
    	<div class="w3-container w3-teal">
    	    <h2>Conteúdo</h2>
    	</div>
    	<ul class="w3-ul w3-border">
        <li><a href="/elementos">Elementos</a></li>
        <li><a href="/grupos">Grupos</a></li>
        <li><a href="/periodos">Períodos</a></li>
      </ul>
      </body>
      </html>
    `
    return pagHTML
}

function pagElementos (elementos) {
	let pagHTML = `
	<html>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="/w3.css"/>
	<body>
    	<div class="w3-container w3-teal">
    	    <h2>Tabela de elementos</h2>
    	</div>
    	<table class="w3-table w3-bordered">
    	    <tr>
            <th>Símbolo</th>
            <th>Nome</th>
            <th>Número</th>
    	    </tr>
	`
    elementos.forEach( elem => {
      pagHTML += `
          <tr>
            <td><a href="/elementos/${elem.symbol}">${elem.symbol}</a></td>
            <td>${elem.name}</td>
            <td>${elem.number}</td>
          </tr>
      `
    })

    pagHTML += `
          </table>
      </body>
      </html>
    `
    return pagHTML
}

function pagElemento (elemento) {
	let pagHTML = `
	<html>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="/w3.css"/>
	<body>
    	<div class="w3-container w3-teal">
    	    <h2>Tabela do elemento ${elemento[0].name}</h2>
    	</div>
    	<table class="w3-table w3-bordered">
    	    <tr>
            <th>Símbolo</th>
            <th>Nome</th>
            <th>Número</th>
            <th>Peso</th>
            <th>Grupo</th>
            <th>Período</th>
            <th>Estado</th>
            <th>Cor</th>
            <th>Classificação</th>
    	    </tr>
          <tr>
            <td>${elemento[0].symbol}</td>
            <td>${elemento[0].name}</td>
            <td>${elemento[0].number}</td>
            <td>${elemento[0].weight}</td>
            <td><a href="/grupos/${elemento[0].group}">${elemento[0].group}</a></td>
            <td><a href="/periodos/${elemento[0].period}">${elemento[0].period}</a></td>
            <td>${elemento[0].state}</td>
            <td>${elemento[0].color}</td>
            <td>${elemento[0].classification}</td>
          </tr>
      `

    pagHTML += `
          </table>
      </body>
      </html>
    `
    return pagHTML
}

function pagGrupos (grupos) {
	let pagHTML = `
	<html>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="/w3.css"/>
	<body>
    	<div class="w3-container w3-teal">
    	    <h2>Tabela de grupos</h2>
    	</div>
    	<table class="w3-table w3-bordered">
    	    <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Número</th>
    	    </tr>
	`
    grupos.forEach( grupo => {
      pagHTML += `
          <tr>
            <td><a href="/grupos/${grupo.id}">${grupo.id}</a></td>
            <td>${grupo.name}</td>
            <td>${grupo.number}</td>
          </tr>
      `
    })

    pagHTML += `
          </table>
      </body>
      </html>
    `
    return pagHTML
}

function pagGrupo (elementos,grupo) {
	let pagHTML = `
	<html>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="/w3.css"/>
	<body>
    	<div class="w3-container w3-teal">
    	    <h2>Lista de elementos do grupo ${grupo}</h2>
    	</div>
    	<table class="w3-table w3-bordered">
    	    <tr>
            <th>Símbolo</th>
    	    </tr>
          `
          elementos.forEach( elemento => {
            pagHTML += `
                <tr>
                  <td><a href="/elementos/${elemento.id}">${elemento.id}</a></td>
                </tr>
            `
          })

    pagHTML += `
          </table>
      </body>
      </html>
    `
    return pagHTML
}

function pagPeriodos (periodos) {
	let pagHTML = `
	<html>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="/w3.css"/>
	<body>
    	<div class="w3-container w3-teal">
    	    <h2>Tabela de períodos</h2>
    	</div>
    	<table class="w3-table w3-bordered">
    	    <tr>
            <th>ID</th>
    	    </tr>
	`
    periodos.forEach( periodo => {
      pagHTML += `
          <tr>
            <td><a href="/periodos/${periodo.id}">${periodo.id}</a></td>
          </tr>
      `
    })

    pagHTML += `
          </table>
      </body>
      </html>
    `
    return pagHTML
}

function pagPeriodo (elementos,periodo) {
	let pagHTML = `
	<html>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="/w3.css"/>
	<body>
    	<div class="w3-container w3-teal">
    	    <h2>Lista de elementos do periodo ${periodo}</h2>
    	</div>
    	<table class="w3-table w3-bordered">
    	    <tr>
            <th>Símbolo</th>
    	    </tr>
          `
          elementos.forEach( elemento => {
            pagHTML += `
                <tr>
                  <td><a href="/elementos/${elemento.id}">${elemento.id}</a></td>
                </tr>
            `
          })

    pagHTML += `
          </table>
      </body>
      </html>
    `
    return pagHTML
}