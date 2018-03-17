import ArticleService from 'services/ArticleService';

const service = new ArticleService();


const ArticleController = {
	index: ({ locale }) => {
		return service.findAll()
			.then(({Items}) => {
				const patients = Items;
				return locale ?
					patients.filter(p => p.locale === locale) :
					patients;
			});
	},
	getById: ({id}) => {
		return service.get(id);
	},
	create: (patient) => {
		console.log('Saving articles...', patient);
		return service.save(patient).then(data => {
			console.log('Article created!', data);
			return {article: Object.assign(patient, data)};
		})
			.catch(err => {
				console.log('Error saving to the database');
				return err;
			});
	},

};

module.exports = ArticleController;
