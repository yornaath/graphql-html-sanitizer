
# graphql-html-sanitizer

Contains a graphql directive and scalar type for sanitizing html input and field data.

## Installation

### Add package

```
yarn add graphql-html-sanitizer # typescript definitions are included
```


### Add directive and/or scalar type

__your_schema.graphql__
```graphql

directive @sanitizeHTML(allowedTags: [String], 
                        allowedIframeHostnames: [String], 
                        selfClosing: [String], 
                        allowedSchemes: [String], 
                        allowedSchemesAppliedToAttributes: [String]) 
                        on FIELD_DEFINITION | INPUT_FIELD_DEFINITION

scalar SanitizedHTML


type Post {
  content: String @sanitizeHTML(allowedTags: ["p", "i", "b"])
  #or
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
    SanitizedHTML: GQLHTMLSanitizer.Type
  },
  schemaDirectives: {
    sanitizeHTML: GQLHTMLSanitizer.Directive
  }
})

```
