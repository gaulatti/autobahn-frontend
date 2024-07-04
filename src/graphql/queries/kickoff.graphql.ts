import { gql } from '@apollo/client';

export const kickoffQuery = gql`
  query kickoffQuery {
    kickoff {
      teams {
        id
        name
      }
      features {
        key
        is_enabled
      }
      me {
        name
        email
      }
    }
    statuses: __type(name: "Status") {
      name
      enumValues {
        name
      }
    }
    contentTypes: __type(name: "ContentType") {
      name
      enumValues {
        name
      }
    }
    roles: __type(name: "Role") {
      name
      enumValues {
        name
      }
    }
    socialMediaTypes: __type(name: "SocialMediaType") {
      name
      enumValues {
        name
      }
    }
    invitationStatuses: __type(name: "InvitationStatus") {
      name
      enumValues {
        name
      }
    }
  }
`;
