exports.listarepos = listarepos
exports.listaclasses = listaclasses
exports.pagclass = pagclass
exports.pagind = pagind

function listarepos (repos) {
	let pagHTML = `
	<html>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="/w3.css"/>
	<body>
    	<div class="w3-container w3-teal">
    	    <h2>Lista de repositórios</h2>
    	</div>
    	<ul class="w3-ul w3-border">
	`
    repos.forEach(repo => {
      pagHTML += `<a href="/${repo}"><li>${repo}</li></a>`
    })

    pagHTML += `
        </ul>
      </body>
      </html>
    `
    return pagHTML
}

function listaclasses (classes,repo) {
	let pagHTML = `
	<html>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="/w3.css"/>
	<body>
    	<div class="w3-container w3-teal">
    	    <h2>Lista de classes do repositório ${repo}</h2>
    	</div>
    	<ul class="w3-ul w3-border">
	`
    classes.forEach(classe => {
      pagHTML += `<a href="/${repo}/${classe}"><li>${classe}</li></a>`
    })

    pagHTML += `
        </ul>
      </body>
      </html>
    `
    return pagHTML
}

function pagclass (inds,classe,repo) {
	let pagHTML = `
	<html>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="/w3.css"/>
	<body>
    	<div class="w3-container w3-teal">
    	    <h2>Lista de indíviduos da classe ${classe}</h2>
    	</div>
    	<ul class="w3-ul w3-border">
	`
    inds.forEach(ind => {
      pagHTML += `<a href="/${repo}/${classe}/${ind}"><li>${ind}</li></a>`
    })

    pagHTML += `
        </ul>
      </body>
      </html>
    `
    return pagHTML
}

function pagind (props,ind) {
	let pagHTML = `
	<html>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="/w3.css"/>
	<body>
    	<div class="w3-container w3-teal">
    	    <h2>Lista de propriedades do indíviduo ${ind}</h2>
    	</div>
    	<table class="w3-table w3-bordered">
    	    <tr>
    	        <th>P</th>
    	        <th>O</th>
    	    </tr>
	`
    props.forEach( prop => {
      pagHTML += `
          <tr>
              <td>${prop.p}</td>
              <td>${prop.o}</td>
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