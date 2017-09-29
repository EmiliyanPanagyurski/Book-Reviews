const HANDLERS_PATH = './views/templates/';

class TemplateHandler {

    getTemplate(templateName) {
        let templatePath = `${HANDLERS_PATH}${templateName}.handlebars`;

        return new Promise((resolve, reject) => {
            $.get(templatePath)
                .done(resolve)
                .fail(reject);
        });
    }

    setTemplate(templateName, targetSelector, dataObject) {
        return this.getTemplate(templateName)
            .then(template => {
                let compiledTemplate = Handlebars.compile(template);
                let templateHtml = compiledTemplate(dataObject);
                let $wrappedTemplate = $('<div/>');
                $wrappedTemplate.html(templateHtml);
                $(targetSelector).html($wrappedTemplate.html());

                return template;
            }).catch(console.log);
    }

}
const templateHandler = new TemplateHandler();

export { templateHandler };