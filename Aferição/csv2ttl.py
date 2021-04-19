import csv

file = open("mapa.ttl", "w", encoding="utf-8")

translate = {
    "Loja": "A",
    "1Dto": "F",
    "1Esq": "G",
    "2Dto": "H",
    "3Dto": "I",
    "3Esq": "J",
    "4Dto": "L",
    "5Dto": "M",
    "5Esq": "N",
    "6Dto": "O",
    "7Dto": "P",
    "7Esq": "Q",
    "8Dto": "R"
}

with open('mapa.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    col_names = []

    line_count = 0
    for row in csv_reader:
        i=0
        for ele in row:
            if line_count == 0:
                col_names.append(ele)
            else:
                if i == 0:
                    file.write("###  http://www.semanticweb.org/joaop/ontologies/2021/3/condominios#mapa" + translate[row[0]] + "\n")
                    file.write(":mapa" + translate[row[0]] + " rdf:type owl:NamedIndividual ,\n")
                    file.write(" "*10 + ":MapaPagamento ;\n")
                    file.write(" "*10 + ":temFraçao :" + translate[row[0]] + " ;\n")
                else:
                    file.write(" "*10 + ":" + col_names[i])
                    if ele == "":
                        file.write(" 0")
                    else:
                        file.write(" 1")
                    if i == len(col_names)-1:
                        file.write(" .\n")
                    else:
                        file.write(" ;\n")

            i += 1
        line_count += 1
        file.write("\n\n")

    print(col_names)

file.close()

file = open("livro.ttl", "w", encoding="utf-8")

with open('livro.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    col_names = []

    line_count = 0
    for row in csv_reader:
        i=0
        for ele in row:
            if line_count == 0:
                col_names.append(ele)
            else:
                if i == 0:
                    file.write("###  http://www.semanticweb.org/joaop/ontologies/2021/3/condominios#" + ele.split("/")[1] + "\n")
                    file.write(":" + ele.split("/")[1] + " rdf:type owl:NamedIndividual ,\n")
                    file.write(" "*10 + ":LivroReceitas ;\n")                    
                else:
                    file.write(" "*10 + ":" + col_names[i] + ' "' + ele + '"')
                    if i == len(col_names)-1:
                        file.write(" .\n")
                    else:
                        file.write(" ;\n")
            i+=1
        line_count +=1
        file.write("\n\n")
    print(col_names)
