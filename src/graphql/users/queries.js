import gql from 'graphql-tag'

export async function getTotalNumberOfUsers(apollo) {
  const result = apollo.query({
    query: gql `{
      totalNumberOfUsers
    }`,
    // fetchPolicy: "network-only"
  })

  return result
}

export async function takeUsers(apollo, offset, count) {
  const result = apollo.query({
    query: gql `query takeUsers($offset:Int!, $count:Int!) {
      takeUsers(offset:$offset, count:$count) {
        email
        firstName
        lastName
        role
        token
      }
    }`,
    variables: {
      offset: offset,
      count: count
    }
    // fetchPolicy: "cache-and-network"
  })

  return result
}