import React from 'react';
import { fireEvent, render, wait, waitFor, act } from '@testing-library/react';
import RestaurantSearch from '../../pages/RestaurantSearch';
import { unmountComponentAtNode } from "react-dom";
import mockAxios from 'axios';


const result = [
    {
        "id": 2,
        "name": "French Bistro",
        "averageRating": 4.3,
        "tags": "French, Bakery",
        "isActive": 1,
        "priceCategory": 2,
        "streetAddress": "La Rue",
        "city": "Paris",
        "state": "BA",
        "zipCode": 44444,
        "menu": [
            {
                "id": 4,
                "restaurantID": 2,
                "name": "Croissant",
                "cost": 2.99,
                "summary": "good bread",
                "special": 0,
                "isActive": 1,
                "category": "Pan"
            },
            {
                "id": 5,
                "restaurantID": 2,
                "name": "Pan Francaise",
                "cost": 3.99,
                "summary": "good bread",
                "special": 0,
                "isActive": 1,
                "category": "Pan"
            }
        ],
        "relevance": 0,
        "resultSize": 26,
        "totalPages": 3
    },
    {
        "id": 3439,
        "name": "HelloWord",
        "averageRating": 2.6,
        "tags": "hello, hola, salut, bonjour",
        "isActive": 1,
        "priceCategory": 1,
        "streetAddress": "34 Hola",
        "city": "Hello",
        "state": "HW",
        "zipCode": 55555,
        "menu": [],
        "relevance": 0,
        "resultSize": 26,
        "totalPages": 3
    },
    {
        "id": 3440,
        "name": "HelloWord",
        "averageRating": 2.6,
        "tags": "hello, hola, salut, bonjour",
        "isActive": 1,
        "priceCategory": 1,
        "streetAddress": "34 Hola",
        "city": "Hello",
        "state": "HW",
        "zipCode": 55555,
        "menu": [],
        "relevance": 0,
        "resultSize": 26,
        "totalPages": 3
    }];


let container = null;

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
        location: []
    }),
}));

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

it("Use Effect Runs On Load", async () => {
    let calls = mockAxios.get.mockResolvedValue({
        data: result,
        status: 200
    });

   

    await act(async () => {
        render(<RestaurantSearch />, container);
    });
    expect(calls.mock.calls.length).toBe(1);
    
});

it("Search Creates API Call", async () => {

    let calls = mockAxios.get.mockResolvedValue({
        data: result,
        status: 200
    });


    let dom;
    await act(async () => {
        dom = render(<RestaurantSearch />, container);
    });



    const searchBar = await dom.findByTestId('searchBar');

    await act(() => {
        fireEvent.change(searchBar, { target: { value: "hello" } });
        fireEvent.keyUp(searchBar, { keyCode: 13 });
    });

    //Third call caused by clear ratings function
    expect(calls.mock.calls.length).toBe(4);
    
});


it("Pagination API Calls", async () => {

    let calls = mockAxios.get.mockResolvedValue({
        data: result,
        status: 200
    });


    let dom;
    await act(async () => {
        dom = render(<RestaurantSearch />, container);
    });

    expect(calls.mock.calls.length).toBe(1);

    await act(async () => {
        fireEvent.click(dom.getByTestId('previousPageBtn'));
    });

    expect(calls.mock.calls.length).toBe(2);

    await act(async () => {
        fireEvent.click(dom.getByTestId('firstPageBtn'));
    });

    expect(calls.mock.calls.length).toBe(3);

    await act(async () => {
        fireEvent.click(dom.getByTestId('nextPageBtn'));
    });

    expect(calls.mock.calls.length).toBe(4);

     await act(async () => {
       fireEvent.click(dom.getByTestId('lastPageBtn'));
     });
     expect(calls.mock.calls.length).toBe(5);

});

it("Number of Items Per Page API Calls", async () => {

    let calls = mockAxios.get.mockResolvedValue({
        data: result,
        status: 200
    });


    let dom;
    await act(async () => {
        dom = render(<RestaurantSearch />, container);
    });

    expect(calls.mock.calls.length).toBe(1);

    act( () => {
        fireEvent.change(dom.getByTestId('rowsSelect'), { target: { value: 5 } });
    });

   expect(calls.mock.calls.length).toBe(2);


});

it("Inactive Checked API call", async () => {

    let calls = mockAxios.get.mockResolvedValue({
        data: result,
        status: 200
    });


    let dom;
    await act(async () => {
        dom = render(<RestaurantSearch />, container);
    });

    await act(async () => {
        fireEvent.click(dom.getByTestId('inactiveBox'), { target: { checked: true } });
    });

    expect(calls.mock.calls.length).toBe(2);


});

