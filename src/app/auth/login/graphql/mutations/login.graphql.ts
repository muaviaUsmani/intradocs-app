import { gql } from "@apollo/client"

const Mutation = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
      refreshToken
    }
  }
`

export default Mutation
