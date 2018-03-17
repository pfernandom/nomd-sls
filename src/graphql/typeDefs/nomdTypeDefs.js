const nomdTypeDefs = `
  scalar Date
  scalar Email

  type Article{
    id: ID
    title: String
    categories: [String]
    locale: String
    content: String
  }

  input NewArticleInput{
    id: ID
    title: String
    categories: [String]
    locale: String
    content: String
  }

  type NewArticleOutput{
    article: Article
  }
`;

export default nomdTypeDefs;
