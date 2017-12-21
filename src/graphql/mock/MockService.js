export default class MockService{
  constructor(){
    console.log("New MockService!!! \n")
    this.doctors = [{
      id:"1",
      name: "Dr. House",
      specialty: "Diagnostics",
      patients:[]
    },
    {
      id:"2",
      name: "Dr. Dougie Houser",
      specialty: "Surgery",
      patients:[]
    }];
    this.patients = [{
      id:"1",
      doctorId: "1",
      name:"Pedro Marquez",
      gender: "MALE",
      dob: new Date(),
      email: "pfernandom@gmail.com",
      maritalStatus: "MARRIED",
      address:{
        street1: "Pirul 101, Barranca de Guadalupe",
        city: "Aguascalientes",
        country: "Mexico",
        zip: "20210"
      },
      restrictions:["Healthy food"]
    },
    {
      id:"2",
      doctorId: "1",
      name:"Eduardo Herrera",
      gender: "MALE",
      dob: new Date(),
      email: "kk",
      maritalStatus: "SINGLE",
      address:{
        street1: "Pirul 101, Barranca de Guadalupe",
        city: "Aguascalientes",
        country: "Mexico",
        zip: "20210"
      }
    },
    {
      id:"3",
      doctorId: "2",
      name:"John Doe",
      gender: "MALE",
      dob: new Date(),
      email: "kk",
      maritalStatus: "SINGLE",
      address:{
        street1: "Pirul 101, Barranca de Guadalupe",
        city: "Aguascalientes",
        country: "Mexico",
        zip: "20210"
      }
    }];
  }
  getDoctors(){
    console.log("All doctors",this.doctors)
    return this.doctors.map(d => {
      d.patients = [];
      this.patients.filter(p => p.doctorId === d.id).forEach(p => {
        d.patients.push(p)
      })
      return d;
    });
  }
  createDoctor(doctor){
    doctor.id = doctor.id || Math.random();
    this.doctors.push(doctor);
    console.log("All doctors",this.doctors)
    this.doctors = this.doctors;
    return doctor;
  }
  getPatients(){
    return this.patients.map(p => {
      p.doctors = this.doctors.filter(d => d.id = p.doctorId);
      return p;
    });
  }
  isRegistered(id){
    console.log("id",id);
    return id === "linkedin|CjstK2EkLJ";
  }
  register(doctorId,code){
    console.log("Registerind",{doctorId:doctorId,code:code})
    return true;
  }
}
