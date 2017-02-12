module.exports = (Handlebars, options) => {

    /**
     * Raw
     * Output a partial as raw text
     *
     * Usage example:
     * {{raw "my-partial"}}
     * 
     * To avoid escaping of html etc., use triple curly braces:
     * {{{raw "my-partial"}}}
     *
     * @param  {string} partialName Name of a registered partial.
     * @return {string}
     */
    Handlebars.registerHelper('raw', function(partialName) {
        return Handlebars.partials[partialName];
    });

};