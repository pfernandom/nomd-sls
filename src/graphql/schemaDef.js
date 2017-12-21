import { makeExecutableSchema } from 'graphql-tools';
import PatientResolver from './resolvers/Patient';
import DoctorResolver from './resolvers/Doctor';

import EmailType from './scalars/Email'
import DateType from './scalars/Date'


const typeDefs = `
  scalar Date
  scalar Email

  enum Gender{
    MALE
    FEMALE
  }

  enum MaritalStatus{
    MARRIED
    SINGLE
  }

  type Address{
    street1: String
    street2: String
    city: String
    country: String
    zip: String
  }

  input AddressInput{
    street1: String!
    street2: String
    city: String!
    country: String!
    zip: String!
  }

  type Doctor{
    id: ID!
    name: String!
    specialty: String
    clinic: String
    patients: [Patient]
  }

  type Patient{
    id: ID
    name: String
    gender: Gender
    dob: Date
    birthPlace: String
    address: Address
    email: Email
    job: String
    maritalStatus: MaritalStatus
    schollarship: String
    restrictions: [String]
    bloodType: String
    insurance: String
    doctors: [Doctor]
  }

  input NewPatientInput{
    id: ID
    name: String
    gender: Gender
    dob: Date
    birthPlace: String
    address: AddressInput
    email: Email
    job: String
    maritalStatus: MaritalStatus
    schollarship: String
    restrictions: [String]
    bloodType: String
    insurance: String
    doctorId: String
  }

  input EditPatientInput{
    id: ID!
    name: String!
    gender: Gender
    dob: Date
    birthPlace: String
    address: AddressInput
    email: Email
    job: String
    maritalStatus: MaritalStatus
    schollarship: String
    restrictions: [String]
    bloodType: String
    insurance: String
  }

  input NewRegistration{
    doctorId: String!
    code: String!
  }

  type NewPatientOutput{
    patient: Patient
  }

  # this schema allows the following mutation:
  type Mutation {
    createPatient (
      patient: NewPatientInput!
    ): NewPatientOutput
    editPatient (
      patient: EditPatientInput!
    ): NewPatientOutput
    registerDoctor(doctorId:String!, code:String!):Boolean
  }

  type Query {
    patients(name: String): [Patient]
    patient(id: String): Patient
    doctors: [Doctor]
    isRegistered(id:String!): Boolean
  }
`;

const resolvers = {
  Email: EmailType,
  Date: DateType,
  Query: {
    patients: (parent, args, context, info)=> PatientResolver.index(args),
    patient: (parent, args, context, info)=> PatientResolver.index(args),
    doctors: (parent, args, context, info)=> DoctorResolver.index(args),
    isRegistered: (parent, args, context, info)=> DoctorResolver.isRegistered(args),
  },
  Mutation: {
    createPatient: (_, { patient }) => PatientResolver.create(patient),
    editPatient: (_, { patient }) => PatientResolver.update(patient),
    registerDoctor: (parent, args, context, info)=> DoctorResolver.register(args),
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
