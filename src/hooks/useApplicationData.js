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
        updateSpots(state.day, state.days, appointments);
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
        updateSpots(state.day, state.days, noAppointments)
        setState({
          ...state, 
          appointments: noAppointments
        });
        return;
      });
    };

    const updateSpots = (day, days, appointments) => {
      const dayObject = days.find((d) => d.name === day)

      let spots = 0; 

      for (const item of dayObject.appointments) {
        if (!appointments[item].interview) {
          spots ++
        }
      }
      dayObject.spots = spots;
    }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};