import { gql } from "@apollo/client";

export const GET_ALL_CLIENT_CUSTOMERS = gql`
  query GetAllClientCustomers {
    getAllClientCustomers {
      page {
        edges {
          cursor
          node {
            _id
            deleteStatus
            deleteAt
            createdAt
            updatedAt
            type
            name
            description
            agentId
            gender
            contact {
              phone
              email
              social
            }
            distributor {
              _id
              name
            }
            updatedAt
          }
        }
      }
    }
  }
`;

export const GET_ALL_ASSET_ACCOUNTS = gql`
  query GetAllAssetAccounts(
    $clientId: ID!
    $first: Int
    $after: String
    $last: Int
    $before: String
    $search: String
  ) {
    getAllAssetAccountsForClient(
      clientId: $clientId
      first: $first
      after: $after
      last: $last
      before: $before
      search: $search
    ) {
      page {
        edges {
          cursor
          node {
            _id
            deleteStatus
            deleteAt
            createdAt
            updatedAt
            accountStage
            eventId
            asset {
              _id
              oemItemID
              sellerItemID
              codeGenerator {
                _id
                type
              }
              itemFleet {
                _id
              }
            }
            manager {
              _id
              orgContactPerson {
                _id
                name
                type
              }
            }
            credit {
              currency
              balance
              totalAmountPaid
              accountStatus
              owner {
                _id
                type
                name
                address {
                  unit
                  street
                  city
                  srpc
                  country
                  postcode
                  addressLocation {
                    addressLatitude
                    addressLongitude
                  }
                }
                contact {
                  phone
                  email
                  social
                }
              }
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasPreviousPage
          hasNextPage
        }
      }
      pageData {
        count
      }
    }
  }
`;

export const GET_ALL_CLIENT_ITEMS = gql`
  query GetAllClientItems(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $search: String
  ) {
    getAllClientItems(
      queryorder: DESC
      assetaccount: false
      first: $first
      after: $after
      last: $last
      before: $before
      search: $search
    ) {
      page {
        edges {
          cursor
          node {
            _id
            deleteAt
            createdAt
            updatedAt
            profile
            oemID
            description
            oemItemID
            sellerID
            assetAccount {
              _id
              eventId
            }
            codeGenerator {
              _id
              triggers
              type
              actionScope
              actorName
              profile
              hashRoot
              hashTop
              hashTopInitial
              codeCount
              hashIndex
              codeReversalCount
              freeCodeCount
            }
            itemSKU {
              _id
              deleteStatus
              deleteAt
              createdAt
              updatedAt
              triggers
              type
              actionScope
              actorName
              profile
              skuName
              productBase
              mainMediaURL
              properties {
                name
                attributes {
                  prop
                  value
                  meta
                }
              }
              oemDescription
            }
            itemBatch {
              _id
              deleteStatus
              deleteAt
              createdAt
              updatedAt
              triggers
              type
              actionScope
              actorName
              profile
              batchNumber
              batchDate
              description
              batchState
              eventMap
              starting_code
              secret_key
              code_gen_type
              actionProgress
              itemSKU {
                _id
                deleteStatus
                deleteAt
                createdAt
                updatedAt
                triggers
                type
                actionScope
                actorName
                profile
                skuName
                productBase
                mainMediaURL
                oemDescription
                properties {
                  name
                  attributes {
                    prop
                    value
                    meta
                  }
                }
              }
            }
            itemFirmware {
              _id
              deleteStatus
              deleteAt
              createdAt
              updatedAt
              triggers
              type
              actionScope
              actorName
              profile
              version
              codeSystem
              description
            }
            lifeCycle
            itemFleet {
              _id
              fleetName
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasPreviousPage
          hasNextPage
        }
      }
      pageData {
        count
      }
    }
  }
`;
