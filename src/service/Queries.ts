function buildOrganizationRepoQuery(orgName: string, itemsPerPage: number,
  cursorId?: string): string {
  if (cursorId) {
    return `query OrganizationRepos {
    organization(login: "${orgName}") {
      name
      url
      repositories(first: ${itemsPerPage}, after: "${cursorId}") {
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
  }`} else {
    return `query OrganizationForLearningReact {
      organization(login: "${orgName}") {
        name
        url
        repositories(first: ${itemsPerPage}) {
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
  }
};

export { buildOrganizationRepoQuery };