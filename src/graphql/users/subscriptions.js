import gql from 'graphql-tag'

export function subscribeOnAllEvents(apollo) {
  const result = apollo.subscribe({
    query: gql `subscription {
      subscribeOnAllEvents {
        eventName
        user {
          email
          firstName
          lastName
          role
        }
      }
    }`
  })

  return result
}

export function subscribeOnSignup(apollo) {
  const result = apollo.subscribe({
    query: gql `subscription {
      subscribeOnSignup {
        email
        firstName
        lastName
        role
      }
    }`
  })

  return result;
}

export function subscribeOnLogin(apollo) {
  const result = apollo.subscribe({
    query: gql`subscription {
      subscribeOnLogin {
        email
        firstName
        lastName
        role
      }
    }`
  })

  return result;
}

export function subscribeOnLoginByUser(apollo, email) {
  const result = apollo.subscribe({
    query: gql `subscription subscribeOnLoginByUser($email:String!) {
      subscribeOnLoginByUser(email:$email) {
        email
        firstName
        lastName
        role
      }
    }`,
    variables: {
      email: email
    }
  })

  return result;
}

export function subscribeOnLogout(apollo) {
  const result = apollo.subscribe({
    query: gql `subscription {
      subscribeOnLogout {
        email
        firstName
        lastName
        role
      }
    }`
  })

  return result;
}

export function subscribeOnDeleteUser(apollo) {
  const result = apollo.subscribe({
    query: gql `subscription {
      subscribeOnDeleteUser {
        email
        firstName
        lastName
        role
      }
    }`
  })

  return result;
}