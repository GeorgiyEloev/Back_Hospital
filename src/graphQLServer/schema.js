const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User {
    _id: ID
    login: String
    password: String
  }
  type Record {
    _id: ID
    userId: ID
    patient: String
    doctor: String
    date: String
    symptoms: String
  }

  input RecordInput {
    patient: String!
    doctor: String!
    date: String!
    symptoms: String!
  }

  type Query {
    getAllRecords(token: String!): [Record]
  }  
  type Mutation {
    addNewRecord(input: RecordInput!, token: String!): [Record]
    removeRecord(_id: ID!, token: String!): [Record]
  }
`);

module.exports = schema;
