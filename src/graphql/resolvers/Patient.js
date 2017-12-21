//import MockService from "../mock/MockService"
import PatientService from '../../services/PatientService';

const service = new PatientService();


const PatientController = {
	index: ( args ) => {
		console.log("Patient search",args);
		if(args.id){
			return service.get(args.id);
		}

		return service.findAll()
		.then(({Items})=>{
			const patients = Items;
			return args.name ? patients.filter(p => p.name == args.name):patients;
		});
	},
	create: (patient) => {
		console.log("Saving patients...",patient);
		return service.save(patient).then(data=>{
			console.log("Patient created!",data)
			return {patient: Object.assign(patient,data)};
		})
		.catch(err=>{
			console.log("Error saving to the database")
			return err;
		});
	}

}

module.exports = PatientController;
