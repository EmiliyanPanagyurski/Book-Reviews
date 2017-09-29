const HTMLS_PATH = '../../views/';

class HtmlHandler {

    getHtml(htmlName) {
        let htmlPath = `${HTMLS_PATH}${htmlName}.html`;

        return new Promise((resolve, reject) => {
            $.get(htmlPath)
                .done(resolve)
                .fail(reject);
        });
    }

    setHtml(htmlName, targetSelector) {
        targetSelector = targetSelector || '#content';

        return this.getHtml(htmlName)
            .then(html => {
                $(targetSelector).html(html);
            }).catch(console.log);
    }
}

const htmlHandler = new HtmlHandler();

export { htmlHandler };