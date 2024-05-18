import { gql } from "@apollo/client"

export const Query = gql`
  query getDocuments($filters: DocumentFilterInput!) {
    documents(filters: $filters) {
      id
      title
      createdBy {
        id
        fullName
      }
      body
      tags
      createdAt
    }
  }
`
