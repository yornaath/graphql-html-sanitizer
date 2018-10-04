import { GraphQLScalarType } from 'graphql'
import * as sanitizeHtml from 'sanitize-html'


export default class SanitizedHTMLType extends GraphQLScalarType {

  public name = "SanitizedHTML"
  public description = ""

  constructor(type:GraphQLScalarType, options?:sanitizeHtml.IOptions) {
    super({
      name: "SanitizedHTML",
      description: "Sanitizes a string containg html.",
      parseValue: (value) => {
        value = type.parseValue(value)
        return sanitize(options, value)
      },
      serialize: (value) => {
        value = type.serialize(value)
        return sanitize(options, value)
      },
      parseLiteral(ast) {
        let value = type.parseLiteral(ast, null)
        return sanitize(options, value)
      }
    })
  }

}

const sanitize = (options:sanitizeHtml.IOptions = {}, html:string) => {
  return sanitizeHtml(html, options)
}