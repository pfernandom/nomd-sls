import MockService from "../mock/MockService"

const service = new MockService();

const DoctorController = {

	index: ( args ) => {
    var doctors = service.getDoctors()
    return args.name ? doctors.filter(doctor => doctor.name == args.name):doctors;
	},
  create: (doctor) => {
		return service.createDoctor(doctor);
	},
	isRegistered: ({id}) => {
		return service.isRegistered(id);
	},
	register:({doctorId,code}) => {
		return service.register(doctorId,code);
	}

}

module.exports = DoctorController;
