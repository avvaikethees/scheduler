import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, getByText, fireEvent, prettyDOM, getAllByTestId, getByAltText, queryByAltText,  getByPlaceholderText, queryByText} from "@testing-library/react";

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
    const { container } = render(<Application />); 
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

  it ("loads data, cancels an interview and increases the spots remaining for Monday by 1", async() => {
    const { container } = render (<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen")); 
    // click the delete button on the booked appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));
    // check the confirmation message is shown
    expect(getByText(appointment, "Are you sure you want to delete this appointment?")).toBeInTheDocument();
    //click the "confirm" button on the confirmation
    fireEvent.click(getByText(appointment, "Confirm"))
    //check that the element with the text "deleting..."" is displayed
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
    //wait until the element with the "Add" button is displayed
    await waitForElement(() => getByAltText(appointment, "Add"))
    //check that the daylistitem with the text "monday" also has the text "2 spots remaining"
    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    ); 
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  })
  
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
    const { container } = render (<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen")); 
    //click the edit button for an existing appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));
    // edit the name 
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Avvai Ketheeswaran"}
    });
    fireEvent.click(getByText(appointment, "Save"));
    //checking to see if SAVE state is rendered 
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Avvai Ketheeswaran"))
    //making sure number of spots is being updated
    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    ); 
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })

  it("shows the save error when failing to save an appointment", async() => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />); 
    await waitForElement(() => getByText(container, "Archie Cohen")); 
    const appointment = getAllByTestId(container, "appointment")[0];
    //adding a new appointment and saving the appointment
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    //checking to see if error message shows up 
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Error"))
  });

  it("shows the delete error when failing to delete an appointment", async() => {
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render (<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen")); 
    // click the delete button on the booked appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));
    // check the confirmation message is shown
    expect(getByText(appointment, "Are you sure you want to delete this appointment?")).toBeInTheDocument();
    //click the "confirm" button on the confirmation
    fireEvent.click(getByText(appointment, "Confirm"))
    //check that the element with the text "deleting..."" is displayed
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
    //checking to see if error message shows up
    await waitForElement(() => getByText(appointment, "Error"))

    debug();
  });

});