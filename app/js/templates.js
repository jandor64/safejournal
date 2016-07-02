<!-- List -->
<xsl:template name="post_template">
    <ul class='post_list'>
        <xsl:for-each select="//post">
            <xsl:variable name="id" select="id"/>
            <li>
                <a href="{$id}">
                    <xsl:value-of select="title"/>
                </a>
                 - <xsl:value-of select="created"/>
            </li>
        </xsl:for-each>
    </ul>
    <a href='' class='new'>New</a>
    <button class='save_all'>Save</button>
</xsl:template>

<!-- Single view -->
<xsl:template name="single_template">
    <xsl:variable name="id" select="//id"/>
    <a href='home'>Post list</a>
    <h2><xsl:value-of select="//title"/></h2>
    <xsl:value-of select="//created"/>
    <xsl:value-of select="//entry" disable-output-escaping="yes"/>
    <a href='{$id}' class='edit'>Edit</a>
</xsl:template>

<!-- Edit view -->
<xsl:template name="edit_template">
    <xsl:variable name="id" select="//id"/>
    <xsl:variable name="title" select="//title"/>
    <xsl:variable name="created" select="//created"/>
    <a href='home'>Post list</a>
    <form class='edit_single'>
        <input name="id" type="hidden" value="{$id}" />
        <input name="created" type="hidden" value="{$created}" />
        <input name="title" type="text" value="{$title}" />
        <textarea name="entry"><xsl:value-of select="//entry" /></textarea>
        <input type='submit' value='submit' />
    </form>
</xsl:template>