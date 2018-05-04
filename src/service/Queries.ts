const LIST_ORG_REPOS = `query OrganizationForLearningReact {
    organization(login: "spring-projects") {
      name
      url
      repositories(first: 5, after:"Y3Vyc29yOnYyOpHOABBeoA==") {
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

  export {LIST_ORG_REPOS};