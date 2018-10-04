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
var sanitizeHtml = require("sanitize-html");
var SanitizedHTMLType = /** @class */ (function (_super) {
    __extends(SanitizedHTMLType, _super);
    function SanitizedHTMLType(type, options) {
        var _this = _super.call(this, {
            name: "SanitizedHTML",
            description: "Sanitizes a string containg html.",
            parseValue: function (value) {
                value = type.parseValue(value);
                return sanitize(options, value);
            },
            serialize: function (value) {
                value = type.serialize(value);
                return sanitize(options, value);
            },
            parseLiteral: function (ast) {
                var value = type.parseLiteral(ast, null);
                return sanitize(options, value);
            }
        }) || this;
        _this.name = "SanitizedHTML";
        _this.description = "";
        return _this;
    }
    return SanitizedHTMLType;
}(graphql_1.GraphQLScalarType));
exports.default = SanitizedHTMLType;
var sanitize = function (options, html) {
    if (options === void 0) { options = {}; }
    return sanitizeHtml(html, options);
};
//# sourceMappingURL=SanitizedHTMLType.js.map