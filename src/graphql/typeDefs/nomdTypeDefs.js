const nomdTypeDefs = `
  scalar Date
  scalar Email

  enum Category {
    MONEY
    IMMIGRATION
    FAMILY
  }

  type Article{
    id: ID
    title: String
    categories: [Category]
    locale: String
    content: String
  }

  input CategoryCount{
    category: Category
    count: Int
  }

  input ArticleQuery{
    categoryCount: [CategoryCount]
  }

  input NewArticleInput{
    id: ID
    title: String
    categories: [Category]
    locale: String
    content: String
  }

  type NewArticleOutput{
    article: Article
  }

  type Comment{
    from: String
    time: Date
    content: String
  }
`;

export default nomdTypeDefs;
