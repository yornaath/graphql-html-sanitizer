import { GraphQLNonNull, GraphQLScalarType } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import SanitizedHTMLType from './SanitizedHTMLType';
export default class SanitizeHTMLDirective extends SchemaDirectiveVisitor {
    visitInputFieldDefinition(field) {
        this.wrapType(field);
    }
    visitFieldDefinition(field) {
        this.wrapType(field);
    }
    wrapType(field) {
        let options = {};
        if (this.args.allowedTags) {
            options.allowedTags = this.args.allowedTags;
        }
        if (this.args.selfClosing) {
            options.selfClosing = this.args.selfClosing;
        }
        if (this.args.allowedSchemes) {
            options.allowedSchemes = this.args.allowedSchemes;
        }
        if (this.args.allowedSchemesAppliedToAttributes) {
            options.allowedSchemesAppliedToAttributes = this.args.allowedSchemesAppliedToAttributes;
        }
        if (this.args.allowedIframeHostnames) {
            options.allowedIframeHostnames = this.args.allowedIframeHostnames;
        }
        if (field.type instanceof GraphQLNonNull &&
            field.type.ofType instanceof GraphQLScalarType) {
            field.type = new GraphQLNonNull(new SanitizedHTMLType(field.type.ofType, options));
        }
        else if (field.type instanceof GraphQLScalarType) {
            field.type = new SanitizedHTMLType(field.type, options);
        }
        else {
            throw new Error(`SanitizeHTMLDirective encountered - Not a scalar type: ${field.type}`);
        }
    }
}
//# sourceMappingURL=SanitizeHTMLDirective.js.map