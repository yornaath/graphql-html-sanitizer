
# graphql-html-sanitizer

Contains a graphql directive and scalar type for sanitizing html input and field data.

## Installation

### Install package

```bash
yarn add graphql-html-sanitizer
# typescript definitions are included
```


### Add directive and/or scalar type to your graphql schema

__your_schema.graphql__
```graphql
directive @sanitizeHTML(allowedTags: [String], 
                        allowedIframeHostnames: [String], 
                        selfClosing: [String], 
                        allowedSchemes: [String], 
                        allowedSchemesAppliedToAttributes: [String]) 
                        on FIELD_DEFINITION | INPUT_FIELD_DEFINITION

scalar SanitizedHTML

type PostUsingDirctive {
  content: String @sanitizeHTML(allowedTags: ["p", "i", "b"])
}

type PostUsingScalar {
  content: SanitizedHTML # Removes all script injection by default and leaves safe html
}

type PostInput {
  content: String! @sanitizeHTML(allowedTags: ["p", "i", "b"])
}
```

### Add to Apollo server

```typescript
import { ApolloServer } from 'apollo-server-lambda'
import * as GQLHTMLSanitizer from "graphql-html-sanitizer"

const typeDefs = require('your_schema.graphql')

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    SanitizedHTML: GQLHTMLSanitizer.Type // if using: scalar SanitizedHTML
  },
  schemaDirectives: {
    sanitizeHTML: GQLHTMLSanitizer.Directive // if using: directive @sanitizeHTML
  }
})
```
