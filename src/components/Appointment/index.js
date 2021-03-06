import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Error from "./Error"; 
import Confirm from "./Confirm"; 
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM"; 
  const EDIT = "EDIT"; 
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode (
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then (() => {
      transition(SHOW);
    })
    .catch(error => {
      transition(ERROR_SAVE, true);
    })
  }

  const confirmDelete = () => {
    transition(DELETING, true); 
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(error => {
      transition(ERROR_DELETE)
    });
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={ () => {console.log("Clicked onAdd"); transition(CREATE)} } />}
      {mode === SHOW && (
        <Show 
          student= {props.interview.student}
          interviewer= {props.interview.interviewer}
          onDelete = {() => transition(CONFIRM)}
          onEdit = {() => transition(EDIT)}
        />
      )}
      {mode === SAVING && (<Status message = "Saving..."/>)}
      {mode === CREATE && (
        <Form 
          interviewers = {props.interviewers}
          onCancel = {back}
          onSave = {save}

        />)}
        {mode === CONFIRM && (
          <Confirm
            onCancel = {back}
            onConfirm={confirmDelete}
            message="Are you sure you want to delete this appointment?"
          />
        )}
        {mode === ERROR_SAVE && (
          <Error 
            message= "Could not save appointment. Please try again"
            onClose = {back}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
          message = "Could not delete appointment. Please try again"
          onClose = {back}
          />
        )}
        {mode === DELETING && (
          <Status 
          message = "Deleting..." />
        )}
        {mode === EDIT && (
          <Form
            name = {props.interview.student}
            interviewers = {props.interviewers}
            interviewer = {props.interview.interviewer.id}
            onSave = {save} 
            onCancel = {back}
           />
        )}
    </article>
  )
}