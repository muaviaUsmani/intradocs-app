import { gql } from "@apollo/client"

const Mutation = gql`
  mutation refreshToken {
    refreshToken {
      token
    }
  }
`

export default Mutation
