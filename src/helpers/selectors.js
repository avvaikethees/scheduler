const getAppointmentsForDay = (state, day) => {
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

const getInterviewersForDay = (state, day) => {
  let result = []
  let interviewerArray = []

  for (let item in state.days) {
    if (state.days[item].name === day) {
      interviewerArray = state.days[item].interviewers
    }
  };
  
  for (let element in state.interviewers) {
    if (interviewerArray.includes(state.interviewers[element].id)) {
      result.push (state.interviewers[element])
    }
  };

  return result 
};

const getInterview = (state, interview) => {
  let interviewInfo = {}

  if (!interview) {
    return null
  }

  interviewInfo["student"] = interview.student 
  interviewInfo["interviewer"] = {id: interview.interviewer}

  for (let interviewer in state.interviewers) {
    if (state.interviewers[interviewer].id === interview.interviewer) {
      interviewInfo["interviewer"] = {...interviewInfo.interviewer, name: state.interviewers[interviewer].name};
      interviewInfo["interviewer"] = {...interviewInfo.interviewer, avatar: state.interviewers[interviewer].avatar};
    }
  }

  return interviewInfo
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay }