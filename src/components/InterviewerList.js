import React from "react"; 
import PropTypes from "prop-types";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default function InterviewerList(props) {
  const interviewersItems = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key = {interviewer.id}
        name = {interviewer.name}
        avatar = {interviewer.avatar}
        selected = {props.interviewer === interviewer.id}
        onClick = {() => props.onChange(interviewer.id)}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersItems}</ul>
    </section>
  );
}
