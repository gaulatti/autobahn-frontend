import { gql } from "@apollo/client";

export const getKickoff = gql`
  query getKickoff {
    kickoff {
      teams {
        id
        name
        created_at
        updated_at
        deleted_at
        memberships {
          id
          user {
            id
            name
          }
          role
        }
        assignments {
          id
          role
        }
        beacons {
          id
          uuid
          url
          provider
          mode
          fcp
          lcp
          tti
          si
          cls
          performance_score
          pleasantness_score
          status
          created_at
          updated_at
          ended_at
          deleted_at
        }
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
        created_at
        updated_at
        deleted_at
        memberships {
          id
          team {
            id
            name
          }
          role
        }
        assignments {
          id
          project {
            name
          }
          role
        }
      }
    }
  }
`;
