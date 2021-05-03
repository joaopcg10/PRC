import json



def main():
    
    with open("mapa.json", encoding="utf-8") as file:
        mapa = json.load(file)
    
    file = open("converted.ttl", "w", encoding="utf-8")

    for cidade in mapa["cidades"]:
        file.write("###  http://www.semanticweb.org/joaop/ontologies/2021/4/mapa#" + cidade["id"] + "\n")
        file.write(":" + cidade["id"] + " rdf:type owl:NamedIndividual ,\n")
        file.write(" "*8 + ":Cidade ; \n")
        file.write(" "*8 + ":descricao " + '"' + cidade["descrição"] + '" ;\n')
        file.write(" "*8 + ":distrito " + '"' + cidade["distrito"] + '" ;\n')
        file.write(" "*8 + ":nome " + '"' + cidade["nome"] + '" ;\n')
        file.write(" "*8 + ":populacao " + cidade["população"] + " . \n")
        file.write("\n\n")



    for lig in mapa["ligações"]:
        file.write("###  http://www.semanticweb.org/joaop/ontologies/2021/4/mapa#" + lig["id"] + "\n")
        file.write(":" + lig["id"] + " rdf:type owl:NamedIndividual ,\n")
        file.write(" "*8 + ":Ligacao ; \n")
        file.write(" "*8 + ":destinoEm :" + lig["destino"] + " ; \n")
        file.write(" "*8 + ":origemEm :" + lig["origem"] + " ; \n")
        file.write(" "*8 + ":distancia " + str(lig["distância"]) + " . \n")
        file.write("\n\n")


    
    file.close()

if __name__ == "__main__":
    main()