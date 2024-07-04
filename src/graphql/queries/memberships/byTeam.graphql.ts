import { gql } from "@apollo/client";

export const membershipsByTeam = gql`
  query membershipsByTeam($id: ID!) {
    getTeam(id: $id) {
      id
      memberships {
        id
        user {
          name
          email
        }
        role
      }
    }
  }
`;
