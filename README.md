# react-graphql-github-client
GitHub client built with React.js based on [A complete React with GraphQL Tutorial](https://www.robinwieruch.de/react-with-graphql-tutorial/).

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