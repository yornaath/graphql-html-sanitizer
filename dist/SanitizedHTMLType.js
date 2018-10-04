import { GraphQLScalarType } from 'graphql';
import * as sanitizeHtml from 'sanitize-html';
export default class SanitizedHTMLType extends GraphQLScalarType {
    constructor(type, options) {
        super({
            name: "SanitizedHTML",
            description: "Sanitizes a string containg html.",
            parseValue: (value) => {
                value = type.parseValue(value);
                return sanitize(options, value);
            },
            serialize: (value) => {
                value = type.serialize(value);
                return sanitize(options, value);
            },
            parseLiteral(ast) {
                let value = type.parseLiteral(ast, null);
                return sanitize(options, value);
            }
        });
        this.name = "SanitizedHTML";
        this.description = "";
    }
}
const sanitize = (options = {}, html) => {
    return sanitizeHtml(html, options);
};
//# sourceMappingURL=SanitizedHTMLType.js.map