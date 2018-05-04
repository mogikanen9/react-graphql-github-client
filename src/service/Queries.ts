const LIST_ORG_REPOS: string = 
`query OrganizationForLearningReact {
    organization(login: "spring-projects") {
      name
      url
      repositories(first: 10) {
        edges {
          node {
            name,
            description,
            createdAt
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }`;


export { LIST_ORG_REPOS };