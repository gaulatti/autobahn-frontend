import { gql } from '@apollo/client';

const getKickoff = gql`
  query getKickoff {
    kickoff {
      teams {
        id
        name
        projects {
          name
          targets {
            id
            name
          }
          assignments {
            id
            role
          }
        }
      }
      features {
        key
        is_enabled
      }
      me {
        id
        sub
        name
        last_name
        email
      }
    }
  }
`;

export { getKickoff };
