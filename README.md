# react-graphql-github-client

[![Build Status](https://travis-ci.org/mogikanen9/react-graphql-github-client.svg?branch=master)](https://travis-ci.org/mogikanen9/react-graphql-github-client)

![Node.js CI](https://github.com/mogikanen9/react-graphql-github-client/workflows/Node.js%20CI/badge.svg)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=react-graphql-client&metric=alert_status)](https://sonarcloud.io/dashboard?id=react-graphql-client)

GitHub client built with React.js based on [A complete React with GraphQL Tutorial](https://www.robinwieruch.de/react-with-graphql-tutorial/).

## Tech stack
Client setup using [https://github.com/Microsoft/TypeScript-React-Starter](https://github.com/Microsoft/TypeScript-React-Starter).

## Sample queries to GitHub GraphQL APi (v4):

### Get schema (the only GET request)
`curl -H "Authorization: bearer token" https://api.github.com/graphql`

### Get viewer info (POST)

```
    curl -H "Authorization: bearer token" -X POST -d " \
    { \
        \"query\": \"query { viewer { login }}\" \
    } \
    " https://api.github.com/graphql
```

```
{
  viewer {
    name
    url
  }
}
```

### Get total number of issues in a repo
```
query{
	repository(owner:"mogikanen9", name:"spring-cloud-gateway-guide-app"){
		issues(last:20){
			totalCount
		}
	}
}
```

### Get company/org data
```
{
  book: organization(login: "the-road-to-learn-react") {
    ...sharedOrganizationFields
  }
  company: organization(login: "facebook") {
    ...sharedOrganizationFields
  }
}

fragment sharedOrganizationFields on Organization {
  name
  url
}
```

### Get repository ID and Name
```
query {
  organization(login: "the-road-to-learn-react") {
    name
    url
    repository(name: "the-road-to-learn-react") {
      id
      name
    }
  }
}
```

### Add start to a GItHub repo
Query:
```
mutation AddStar($repositoryId: ID!) {
  addStar(input: {starrableId: $repositoryId}) {
    starrable {
      id
      viewerHasStarred
    }
  }
}
```

Variables:
```
{
	"repositoryId":"MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw=="
}
```

### Get list of repos with pagination
```
query OrganizationForLearningReact {
  organization(login: "spring-projects") {
    name
    url
    repositories(first: 5, after:"Y3Vyc29yOnYyOpHOABBeoA==") {
      edges {
        node {
          name
        }
      }
	pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
```
