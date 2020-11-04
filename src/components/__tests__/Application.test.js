import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, getByText, fireEvent, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe('Application', () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it ("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />); 
    // confirming container renders with name that is found
    await waitForElement(() => getByText(container, "Archie Cohen")); 
    const appointment = getAllByTestId(container, "appointment")[0];
    //adding a new appointment and saving the appointment
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    //checking to see if SAVE state is rendered 
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"))
    //making sure number of spots is being updated
    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    ); 
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

});