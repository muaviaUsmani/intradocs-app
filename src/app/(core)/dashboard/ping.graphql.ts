import { gql } from "@apollo/client"

const Query = gql`
  query ping {
    ping {
      status
    }
  }
`

export default Query
