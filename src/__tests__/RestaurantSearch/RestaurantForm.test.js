import React from 'react';
import { fireEvent, render, wait, waitFor, act } from '@testing-library/react';
import RestaurantForm from '../../pages/RestaurantForm';
import { unmountComponentAtNode } from "react-dom";
import {createMemoryHistory} from 'history'
import mockAxios from 'axios';
import {Router} from 'react-router-dom';
import App from './../../App';

let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    jest.resetAllMocks();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Restaurant Form Renders", () => {

    render(<RestaurantForm />, container);

});

it("On Submit Validation Occurs", () => {

    const { getByTestId } = render(<RestaurantForm />, container);

    fireEvent.click(getByTestId("submit-button"));
    expect(getByTestId("name-error-text").textContent).toBe("This Field Cannot Be Blank");
    expect(getByTestId("street-error-text").textContent).toBe("This Field Cannot Be Blank");
    expect(getByTestId("city-error-text").textContent).toBe("This Field Cannot Be Blank");
    expect(getByTestId("state-error-text").textContent).toBe("This Field Cannot Be Blank");
    expect(getByTestId("zipCode-error-text").textContent).toBe("This Field Cannot Be Blank");
    expect(getByTestId("price-error-text").textContent).toBe("Please select a price range");

    fireEvent.change(getByTestId("zipCode-field"), { target: { value: "452" } });
    fireEvent.click(getByTestId("submit-button"));
    expect(getByTestId("zipCode-error-text").textContent).toBe("This zip code is incomplete. It does not have five digits.");

});

fit("On Submit API Call and Pushes to New Page", async () => {

    let calls = mockAxios.post.mockResolvedValue({
        data: {
            id: 27
        },
        status: 201
    });

    const history = createMemoryHistory()
    history.push('/restaurant')
    render(
        <Router history={history}>
          <App />
        </Router>,
        container
      )

    const { getByTestId } = render(<RestaurantForm />, container);

    fireEvent.change(getByTestId("name-field"), { target: { value: "Test Name" } });
    fireEvent.change(getByTestId("street-field"), { target: { value: "123 Lillith Rd" } });
    fireEvent.change(getByTestId("city-field"), { target: { value: "Test" } });
    fireEvent.change(getByTestId("state-field").querySelector('input'), { target: { value: "TX" } });
    fireEvent.change(getByTestId("zipCode-field"), { target: { value: "45236" } });
   

    await act(async () => {
        fireEvent.click(getByTestId("submit-button"));
    });

    expect(calls.mock.calls.length).toBe(1);


});

it("On Submit API Call Has Error, Modal Pops Up", async () => {

    let calls = mockAxios.post.mockResolvedValue({
        status: 500
    });

    const { getByTestId } = render(<RestaurantForm />, container);

    fireEvent.change(getByTestId("name-field"), { target: { value: "Test Name" } });
    fireEvent.change(getByTestId("street-field"), { target: { value: "123 Lillith Rd" } });
    fireEvent.change(getByTestId("city-field"), { target: { value: "Test" } });
    fireEvent.change(getByTestId("state-field").querySelector('input'), { target: { value: "TX" } });
    fireEvent.change(getByTestId("zipCode-field"), { target: { value: "45236" } });
   

    await act(async () => {
        fireEvent.click(getByTestId("submit-button"));
    });

    expect(getByTestId("error-modal")).toBeTruthy();
    


});


