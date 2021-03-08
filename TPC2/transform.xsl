<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xd="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xd"
    version="2.0">
    
    <xd:doc scope="stylesheet">    
        <xd:desc>     
            <xd:p><xd:b>Created on:</xd:b> Mar 7, 2021</xd:p> 
            <xd:p><xd:b>Autor:</xd:b> João Gomes</xd:p>
            <xd:p> Folha XSLT transformador do arquivo musical XMl para TTL</xd:p>
        </xd:desc>   
    </xd:doc>
    
    <xsl:output method="text" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="obra">
        ### http://www.di.uminho.pt/prc2021/arquivo_musical#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :Obra ;
        <xsl:if test="titulo">
        :titulo <xsl:value-of select="titulo"/>
        </xsl:if>
        <xsl:if test="subtitulo">
        :subtitulo <xsl:value-of select="subtitulo"/>
        </xsl:if>      
        <xsl:if test="editado">
        :editado <xsl:value-of select="editado"/>
        </xsl:if>
        <xsl:if test="tipo">
        :tipo <xsl:value-of select="tipo"/>
        </xsl:if>
        <xsl:if test="arranjo">
        :arranjo <xsl:value-of select="arranjo"/>
        </xsl:if>
        .
        
        <xsl:if test="compositor"> ;
            ###  http://www.di.uminho.pt/prc2021/arquivo_musical#<xsl:value-of select="replace(replace(compositor,' ','_'),',','')"/>
        :<xsl:value-of select="translate(translate(compositor, ' ',''), ',','_')"/> rdf:type owl:NamedIndividual ,
        :Compositor
        :nome "<xsl:value-of select="compositor"/>" ;
        :compôs :<xsl:value-of select="@id"/> .
        # ----------------------------------
        </xsl:if>
        
        <xsl:for-each select="instrumentos/instrumento">
        ### http://www.di.uminho.pt/prc2021/arquivo_musical#<xsl:value-of select="replace(designacao,' ','_')"/>
        :<xsl:value-of select="replace(designacao,' ','_')"/> rdf:type owl:NamedIndividual,
        :Instrumento ;
        :utilizadoPor :<xsl:value-of select="../../@id"/> ;
        :designaçao "<xsl:value-of select="designacao"/>" .
        # --------------------------------------------------
     
        <xsl:for-each select="partitura">
        ### http://www.di.uminho.pt/prc2021/arquivo_musical#<xsl:value-of select="@path"/>
        :<xsl:value-of select="@path"/> rdf:type owl:NamedIndividual ,
        :Partitura ;
        :rel :<xsl:value-of select="replace(../designacao,' ','_')"/> ;
        :path "<xsl:value-of select="@path"/>" ;
        <xsl:if test="@afinacao">
        :afinacao "<xsl:value-of select="@afinacao"/>" ; 
        </xsl:if>          
        <xsl:if test="@clave">
        :clave "<xsl:value-of select="@clave"/>" ;
        </xsl:if>
        <xsl:if test="@voz">
        :voz "<xsl:value-of select="@voz"/>" ;
        </xsl:if> 
        :type "<xsl:value-of select="@type"/>" .
        # --------------------------------------------------
        </xsl:for-each>    
        </xsl:for-each>
        
        
        
    </xsl:template>
    
</xsl:stylesheet>