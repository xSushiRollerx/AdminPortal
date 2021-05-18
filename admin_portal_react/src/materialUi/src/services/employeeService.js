/*
import RestaurantService from "../../../services/RestaurantService";
import {useEffect, useState} from "react";


const KEYS ={
    employees:'employees',
    employeeId:'employeeId'
}

export const getDepartmentCollection = ()=>([
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
])

export function insertEmployee(data) {
    let employees=getAllEmployees();
    data['id'] = generateEmployeeId()
    employees.push(data)
    localStorage.setItem(KEYS.employees,JSON.stringify(employees))
}

export function updateEmployee(data) {
    let employees = getAllEmployees();
    let recordIndex = employees.findIndex(x => x.id == data.id);
    employees[recordIndex] = {...data}
    localStorage.setItem(KEYS.employees,JSON.stringify(employees));
}

export function deleteEmployee(id) {
    let employees = getAllEmployees();
    employees = employees.filter(x => x.id != id)
    localStorage.setItem(KEYS.employees,JSON.stringify(employees));
}

export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.employeeId) == null)
        localStorage.setItem(KEYS.employeeId, '0')
    var id = parseInt(localStorage.getItem(KEYS.employeeId))
    localStorage.setItem(KEYS.employeeId, (++id).toString())
    return id;
}

export function getAllEmployees() {
    if (localStorage.getItem(KEYS.employees) == null)
        localStorage.setItem(KEYS.employees, JSON.stringify([]))
    // return JSON.parse(localStorage.getItem(KEYS.employees));
    let employees = JSON.parse(localStorage.getItem(KEYS.employees));
    let departments = getDepartmentCollection();
    return employees.map(x => ({
        ...x,
        department : departments[x.departmentId -1].title
    }))
}



export function GetAllRestaurants(){
    const [restaurants, setRestaurants] = useState();

              // fetch("http://localhost:8080/restaurant/all/page/0")
              //       .then(response => response.json())
              //       .then(json => {
              //           // hideLoader();
              //           // setComments(json);
              //           // console.log(json);
              //           setRestaurants({json})
              //       });

    RestaurantService.getRestaurant(0).then(res => res.data)
        .then((data) => {
            setRestaurants(() => data);
            // setRecords((records) => data);
        });

 /!*  return RestaurantService.getRestaurant().then((res) => {
        {restaurants: res.data};
    });
*!/

    // RestaurantService.getRestaurant(0).then(res => {
    //     setRestaurants(res.data)
    // });
    // return restaurants;

    // RestaurantService.getRestaurant(0).then(res => res.data)
    //     .then((data) => {
    //         setRestaurants((comments) => data);
    //         // console.log(data);
    //     });
    // console.log(restaurants);
    //     return restaurants;

/!*    let restaurants= [];
    restaurants =
        RestaurantService.getRestaurant(0).then(res => res.data);
/!*    .then((data) => {
        // hideLoader();
        // setComments((comments) => data);
        // console.log(data);
        return data;*!/
    console.log(restaurants);
    return restaurants;*!/
    console.log(restaurants);
    return restaurants;
    }
    /!*)}*!/
*/
