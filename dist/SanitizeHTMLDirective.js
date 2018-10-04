"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var graphql_tools_1 = require("graphql-tools");
var SanitizedHTMLType_1 = require("./SanitizedHTMLType");
var SanitizeHTMLDirective = /** @class */ (function (_super) {
    __extends(SanitizeHTMLDirective, _super);
    function SanitizeHTMLDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SanitizeHTMLDirective.prototype.visitInputFieldDefinition = function (field) {
        this.wrapType(field);
    };
    SanitizeHTMLDirective.prototype.visitFieldDefinition = function (field) {
        this.wrapType(field);
    };
    SanitizeHTMLDirective.prototype.wrapType = function (field) {
        var options = {};
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
        if (field.type instanceof graphql_1.GraphQLNonNull &&
            field.type.ofType instanceof graphql_1.GraphQLScalarType) {
            field.type = new graphql_1.GraphQLNonNull(new SanitizedHTMLType_1.default(field.type.ofType, options));
        }
        else if (field.type instanceof graphql_1.GraphQLScalarType) {
            field.type = new SanitizedHTMLType_1.default(field.type, options);
        }
        else {
            throw new Error("SanitizeHTMLDirective encountered - Not a scalar type: " + field.type);
        }
    };
    return SanitizeHTMLDirective;
}(graphql_tools_1.SchemaDirectiveVisitor));
exports.default = SanitizeHTMLDirective;
//# sourceMappingURL=SanitizeHTMLDirective.js.map