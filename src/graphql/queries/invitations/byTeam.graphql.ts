import { gql } from "@apollo/client";

export const invitationsByTeam = gql`
  query invitationsByTeam($id: ID!) {
    getTeam(id: $id) {
      id
      invitations {
        id
        email
        token
        status
      }
    }
  }
`;
