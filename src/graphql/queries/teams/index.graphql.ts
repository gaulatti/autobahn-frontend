import { gql } from "@apollo/client";

export const getTeams = gql`
  query getTeams {
    projects {
      name
      team {
        id
        name
      }
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
`;

export const getBeacons = gql`
  query getBeacons {
    beacons {
      id
      team {
        id
        name
      }
      target {
        id
        name
      }
      triggered_by {
        id
      }
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
  }
`;

export const getSchedules = gql`
  query getSchedules {
    schedules {
      id
      provider
      target {
        id
        name
      }
      cron
      next_execution
      created_at
      updated_at
      deleted_at
    }
  }
`;
