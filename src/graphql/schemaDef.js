import { makeExecutableSchema } from 'graphql-tools';
import ArticleResolver from './resolvers/Article';
import UserResolver from './resolvers/User';

import EmailType from './scalars/Email';
import DateType from './scalars/Date';

import userTypeDefs from 'graphql/typeDefs/userTypeDefs';
import nomdTypeDefs from 'graphql/typeDefs/nomdTypeDefs';

const mutationsAndQueries = `
  type Mutation {
    createArticle (
      article: NewArticleInput!
    ): NewArticleOutput
    authenticate(user:NewUser):UserProfile
  }

  type Query {
    articles(locale: String): [Article]
    article(id: String): Article
  }
`;

const typeDefs = [
	userTypeDefs,
	nomdTypeDefs,
	mutationsAndQueries,
];

const resolvers = {
	Email: EmailType,
	Date: DateType,
	Query: {
		articles: (
			parent,
			args,
			context,
			info
		) => ArticleResolver.index(args),
		article: (
			parent,
			args,
			context,
			info
		) => ArticleResolver.getById(args),
	},
	Mutation: {
		createArticle: (
			_,
			{ article }
		) => ArticleResolver.create(article),
		authenticate: (parent, args) => UserResolver.authenticate(args),
	},
};

export default makeExecutableSchema({
	typeDefs,
	resolvers,
});
