export function getAppointmentsForDay(state, day) {
  // returns an array of appointments for that day
  let result = []
  let appointmentArray = []

  for (let item in state.days) {
    if (state.days[item].name === day) {
      appointmentArray = state.days[item].appointments
    }
  };
  
  for (let element in state.appointments) {
    if (appointmentArray.includes(state.appointments[element].id)) {
      result.push (state.appointments[element])
    }
  };

  return result 
};
