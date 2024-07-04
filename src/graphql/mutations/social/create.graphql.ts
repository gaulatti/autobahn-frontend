import { gql } from "@apollo/client";

const query = gql`
  mutation createSocialMediaImage($input: SocialMediaImageInput!) {
    createSocialMediaImage(input: $input) {
      image_url
      type
    }
  }
`;

export default query;
