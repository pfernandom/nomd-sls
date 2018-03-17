const userTypeDefs = `
input NewUser{
  sub: String!
  nickname: String,
  picture: String
  name: String
  given_name: String,
  family_name: String,
  country: String,
  timezone: String
}

type UserProfile{
  sub: String!
  nickname: String,
  picture: String
  name: String
  given_name: String,
  family_name: String,
  country: String,
  timezone: String
}
`;

export default userTypeDefs;
