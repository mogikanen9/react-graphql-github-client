function buildOrganizationRepoQuery(itemsPerPage: number, cursorId?: string): string {
  if(cursorId){
  return `query OrganizationRepos {
    organization(login: "spring-projects") {
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
  }`}else{
    return `query OrganizationForLearningReact {
      organization(login: "spring-projects") {
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