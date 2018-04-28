import { MockList } from 'graphql-tools';
import casual from 'casual';

const Article = (
	locale = casual.random_element(['en_US', 'es_ES']),
	categories
) => {
	let fields = {
		title: casual.title,
		content: () => new Array(5)
			.fill()
			.map(() => casual.sentences(10))
			.reduce((acc, el) =>
				`${acc}
				${el}`
			),
		locale: locale,
		categories: () => new MockList([1, 3]),
	}

	if (categories) {
		fields = { categories, ...fields };
	}

	return fields;
};

const Query = () => ({
	articles: (root, { count = 10, query }) => {
		console.log('query', query.categoryCount);
		return new MockList(count, (args, { locale }) =>
			Article(locale));
	},
});

casual.seed(123);
const mocks = {
	String: () => casual.sentence,
	Date: () => new Date(),
	Article,
	Query,
};

export default mocks;
