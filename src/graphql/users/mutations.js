import gql from 'graphql-tag'

export async function deleteUser(apollo, email) {
  const result = apollo.mutate({
    mutation: gql `mutation deleteUser($email: String!){
      deleteUser(email:$email)
    }`,
    variables: {
      email: email
    }
  })

  return result
}

export async function signup(apollo, email, password, firstName, lastName) {

  const result = apollo.mutate({
    mutation: gql `mutation signup($email:String!, $password:String!, $firstName:String!, $lastName:String!) {
      signup(email:$email, password:$password, firstName:$firstName, lastName:$lastName) {
        email
        token
      }
    }`,
    variables: {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    }
  })

  return result
}

export async function login(apollo, email, password) {
  const result = apollo.mutate({
    mutation: gql `mutation login($email:String!, $password:String!) {
      login(email:$email, password:$password) {
        email
        firstName
        lastName
        role
        token
      }
    }`,
    variables: {
      email: email,
      password: password
    }
  })

  return result;
}

export async function logout(apollo) {
  const result = apollo.mutate({
    mutation: gql `mutation {
      logout
    }`
  })

  return result
}
