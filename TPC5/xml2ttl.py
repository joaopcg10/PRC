from xml.etree import ElementTree

def main():
    file = open("converted.ttl", "w", encoding="utf-8")

    xml_file = ElementTree.parse("jcrpubs.xml")
    pubs = xml_file.getroot()

    tosave_autores = []
    tosave_editores = []
    
    for pub in pubs:
        file.write("###  http://www.di.uminho.pt/prc2021/pubs#" + pub.attrib["id"] + "\n")
        file.write(":" + pub.attrib["id"] + " rdf:type " + "owl:NamedIndividual ,\n")
        file.write(" "*10 + ":" + pub.tag + " ;\n")

        # autor autor-ref editor editor-ref deliverables
        autores_ref = pub.findall("author-ref")
        if autores_ref:
            j=0
            file.write(' '*10 + ':hasReferencedAuthor ')
            for autor in autores_ref:
                if j == 0:
                    file.write(":" + autor.get("authorid"))
                else:
                    file.write(' '*31 + ":" + autor.get("authorid"))

                if j == len(autores_ref)-1:
                    file.write(" ;\n")
                else:
                    file.write(" ,\n")
                j += 1


        autores = pub.findall("author")
        if autores:
            j=0
            file.write(' '*10 + ':hasAuthor ')
            for autor in autores:
                if j == 0:
                    file.write(":" + autor.get("id"))
                else:
                    file.write(' '*21 + ":" + autor.get("id"))

                if j == len(autores)-1:
                    file.write(" ;\n")
                else:
                    file.write(" ,\n")
                j += 1
                tosave_autores.append({
                    "name": autor.text,
                    "id": autor.get("id")
                })

        editores = pub.findall("editor")
        if editores:
            j=0
            file.write(' '*10 + ':hasEditor ')
            for editor in editores:
                if j == 0:
                    file.write(":" + editor.get("id"))
                else:
                    file.write(' '*21 + ":" + editor.get("id"))

                if j == len(editores)-1:
                    file.write(" ;\n")
                else:
                    file.write(" ,\n")
                j += 1
                tosave_editores.append({
                    "name": editor.text,
                    "id": editor.get("id")
                })

        editores_ref = pub.findall("editor-ref")
        if editores_ref:
            j=0
            file.write(' '*10 + ':hasReferencedEditor ')
            for editor in editores_ref:
                if j == 0:
                    file.write(":" + editor.get("authorid"))
                else:
                    file.write(' '*31 + ":" + editor.get("authorid"))

                if j == len(editores_ref)-1:
                    file.write(" ;\n")
                else:
                    file.write(" ,\n")
                j += 1

        deliverables = pub.find("deliverables")
        if deliverables:
            file.write(' '*10 + ":deliverables" + ' "' + deliverables.find("pdf").get("url") + '" ;\n')

        i = 0
        for info in pub:
            # Resto
            if info.tag not in ["author","author-ref","editor","editor-ref","deliverables"]:
                file.write(' '*10 + ':' + info.tag + ' "' + info.text.replace("\n","") + '"')

                if i == len(pub)-1:
                    file.write(" .\n")
                else:
                    file.write(" ;\n")
            i += 1

        file.write("\n\n")
    
    for editor in tosave_editores:
        file.write("###  http://www.di.uminho.pt/prc2021/pubs#" + editor["id"] + "\n")
        file.write(":" + editor["id"] + " rdf:type owl:NamedIndividual ,\n")
        file.write(' '*10 + ":Editor ;\n")
        file.write(' '*10 + ':name "' + editor["name"] + '" .\n')
        file.write("\n\n")

    for autor in tosave_autores:
        file.write("###  http://www.di.uminho.pt/prc2021/pubs#" + autor["id"] + "\n")
        file.write(":" + autor["id"] + " rdf:type owl:NamedIndividual ,\n")
        file.write(' '*10 + ":Author ;\n")
        file.write(' '*10 + ':name "' + autor["name"] + '" .\n')
        file.write("\n\n")
    
    
    file.close()



if __name__ == "__main__":
    main()