import { SchemaDirectiveVisitor } from 'graphql-tools';
export default class SanitizeHTMLDirective extends SchemaDirectiveVisitor {
    visitInputFieldDefinition(field: any): void;
    visitFieldDefinition(field: any): void;
    wrapType(field: any): void;
}
