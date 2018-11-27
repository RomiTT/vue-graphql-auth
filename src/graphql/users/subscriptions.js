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