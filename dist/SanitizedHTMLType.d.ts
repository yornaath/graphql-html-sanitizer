import { GraphQLScalarType } from 'graphql';
import * as sanitizeHtml from 'sanitize-html';
export default class SanitizedHTMLType extends GraphQLScalarType {
    name: string;
    description: string;
    constructor(type: GraphQLScalarType, options?: sanitizeHtml.IOptions);
}
