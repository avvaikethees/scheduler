import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday", 
    days: [],
    appointments: {}, 
    interviewers: {}
  });

  useEffect( () => {
    Promise.all ([
      axios.get("/api/days"), 
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then ((all) => {
      console.log("this is the promise.all response: ", all)
      setState(prev => {
        return {
          ...prev, 
          days: all[0].data, 
          appointments: all[1].data, 
          interviewers: all[2].data
        }
      })
      console.log("this is the state: ", state);
    })
  }, []);

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    console.log("This is id, interview: ", id, interview);
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then ((res) => {
        console.log(res)
        setState({
          ...state, 
          appointments: appointments
        });
        return;
      })
    };

    const cancelInterview  = (id) => {
      const noAppointment = {
        ...state.appointments[id], 
        interview: null
      }; 
  
      const noAppointments = {
        ...state.appointments, 
        [id]: noAppointment
      }
  
      return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        console.log("It's deleting! woohoo");
        setState({
          ...state, 
          appointments: noAppointments
        });
        return;
      });
    };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};