import json

def main():
    
    with open("emd.json", encoding="utf-8") as file:
        dataset = json.load(file)
    
    file = open("converted.ttl", "w", encoding="utf-8")

    emds = {}
    atletas = {}
    modalidades = set()
    clubes = {}

    for data in dataset:

        emds[data["_id"]] = {
            "data": data["dataEMD"],
            "modalidade": data["modalidade"],
            "nome": data["nome"]["primeiro"] + data["nome"]["último"],
            "resultado": data["resultado"]
        }

        atletas[data["nome"]["primeiro"] + data["nome"]["último"]] = {
            "nome": data["nome"]["primeiro"] + " " + data["nome"]["último"],
            "idade": data["idade"], 
            "género": data["género"],
            "morada": data["morada"],
            "modalidade": data["modalidade"],
            "clube": data["clube"],
            "email": data["email"],
            "federado": data["federado"],
        }

        modalidades.add(data["modalidade"])

        clube_key = data["clube"].replace(" ","")
        if clube_key in clubes:
            clubes[clube_key]["atletas"].append(data["nome"]["primeiro"] + data["nome"]["último"])
        else:
            clubes[clube_key] = {
                "nome": data["clube"],
                "atletas": [data["nome"]["primeiro"] + data["nome"]["último"]]
            }

    for emd in emds:
        file.write("###  http://www.semanticweb.org/joaop/ontologies/2021/4/emd#" + emd + "\n")
        file.write(":" + emd + " rdf:type owl:NamedIndividual ,\n")
        file.write(" "*8 + ":EMD ; \n")
        file.write(" "*8 + ":relativoA " + ":" + emds[emd]["nome"] + ' ;\n')
        file.write(" "*8 + ":referenteA " + ":" + emds[emd]["modalidade"] + ' ;\n')
        file.write(" "*8 + ":data " + '"' + emds[emd]["data"] + '" ;\n')
        file.write(" "*8 + ":resultado " + '"' + str(emds[emd]["resultado"]) + '" .\n')
        file.write("\n\n")

    for atleta in atletas:
        file.write("###  http://www.semanticweb.org/joaop/ontologies/2021/4/emd#" + atleta + "\n")
        file.write(":" + atleta + " rdf:type owl:NamedIndividual ,\n")
        file.write(" "*8 + ":Atleta ; \n")
        file.write(" "*8 + ":participaEm " + ":" + atletas[atleta]["modalidade"] + ' ;\n')
        file.write(" "*8 + ":nome " + '"' + atletas[atleta]["nome"] + '" ;\n')
        file.write(" "*8 + ":idade " + '"' + str(atletas[atleta]["idade"]) + '" ;\n')
        file.write(" "*8 + ":genero " + '"' + atletas[atleta]["género"] + '" ;\n')
        file.write(" "*8 + ":morada " + '"' + atletas[atleta]["morada"] + '" ;\n')
        file.write(" "*8 + ":email " + '"' + atletas[atleta]["email"] + '" ;\n')
        file.write(" "*8 + ":nome " + '"' + atletas[atleta]["nome"] + '" ;\n')
        file.write(" "*8 + ":federado " + '"' + str(atletas[atleta]["federado"]) + '" .\n')
        file.write("\n\n")

    for modalidade in modalidades:
        file.write("###  http://www.semanticweb.org/joaop/ontologies/2021/4/emd#" + modalidade + "\n")
        file.write(":" + modalidade + " rdf:type owl:NamedIndividual ,\n")
        file.write(" "*8 + ":Modalidade . \n")
        file.write("\n\n")

    for clube in clubes:
        file.write("###  http://www.semanticweb.org/joaop/ontologies/2021/4/emd#" + clube + "\n")
        file.write(":" + clube + " rdf:type owl:NamedIndividual ,\n")
        file.write(" "*8 + ":Clube ; \n")

        i = 0
        for atleta in clubes[clube]["atletas"]:
            if i == 0:
                file.write(" "*8 + ":temAtleta " + ":" + atleta)
            else :
                file.write(" "*18 + ":" + atleta)
            if i == len(clubes[clube]["atletas"])-1:
                file.write(" ;\n")
            else:
                file.write(" ,\n")
            i += 1

        file.write(" "*8 + ":nome " + '"' + clubes[clube]["nome"] + '" .\n')
        
        file.write("\n\n")

    file.close()

if __name__ == "__main__":
    main()