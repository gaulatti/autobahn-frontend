import { gql } from '@apollo/client';

const getKickoff = gql`
  query getKickoff {
    kickoff {
      me {
        id
        sub
        name
        last_name
        email
        memberships {
          role
          team {
            id
            name
          }
          assignments {
            role
            project {
              name
            }
          }
        }
      }
          enums
    }
  }
`;

export { getKickoff };
