import React, { useEffect, useState, useMemo } from "react";
import Header from "./Header";
import { TableHeader, Pagination, Search } from "./components/DataTable";
import useFullPageLoader from "./hooks/useFullPageLoader";
import ExternalInfo from "./components/ExternalInfo";
import AppConfig from "./components/hoc/App.config";
import RestaurantService from "../services/RestaurantService";
import AddRestaurantLink from "./AddRestaurantLink";
// "@fortawesome/react-fontawesome": "^0.1.14",
import CreateRestaurantComponent from "../components/CreateRestaurantComponent";

const DataTable = () => {
    const [comments, setComments] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 50;

    const headers = [
        { name: "Name", field: "name", sortable: true },
        { name: "Average Rating", field: "averageRating", sortable: false },
        { name: "Tags", field: "tags", sortable: true },
        { name: "City", field: "city", sortable: true },
        {name: "Restaurant Actions"}
    ];

    useEffect(() => {
        const getData = () => {
            showLoader();

              // RestaurantService.getRestaurant()
            // fetch("https://jsonplaceholder.typicode.com/comments")
/*            fetch("http://localhost:8080/restaurant")
                .then(response => response.json())
                .then(json => {
                    hideLoader();
                    setComments(json);
                });*/

            RestaurantService.getRestaurant(0).then(res => res.data)
                .then((data) => {
                    hideLoader();
                    setComments((comments) => data);
                    // console.log(data);
                });


            // RestaurantService.getRestaurant().then((res) =>
            // {
            //     console.log(typeof res.data)
            //     setComments(res.data)
            //     // this.setState({restaurants: res.data});x
            // });

        };

        // console.log("comments: "+ typeof comments);

        getData();
    }, [hideLoader, showLoader, comments]);

    const commentsData = useMemo(() => {
        let computedComments = comments;

        // console.log("computedComments: "+ typeof computedComments);


        //Search comments
        if (search) {
            // console.log("search = "+search);
            // computedComments = computedComments.filter(
           computedComments = comments.filter(
                comment =>
                    comment.tags.toLowerCase().includes(search.toLowerCase()) ||
                    comment.name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.averageRating.toString().includes(search) ||
                    comment.city.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedComments.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [comments, currentPage, search, sorting]);

    return (
        <>
            {/*<Header title="Building a data table in react" />*/}
            <h2 className="text-center">Restaurant List</h2>
            {/*<ExternalInfo page="datatable" />*/}
            <br/>

            <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">
                        <div className="col-md-6">
                            <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}


                            />
                        </div>
{/*                        <div className="col-md-6 d-flex flex-row-reverse">
                            <Search
                                onSearch={value => {
                                    setSearch(prevState => value);
                                    console.log("value of value: " + value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>*/}
                    </div>

                    {/*<div className="col-md-6 d-flex flex-row-reverse">*/}
                    <div style={{textAlign:"center"}}>
                        {/*<button className="btn btn-primary" onClick={this.addRestaurant}>Add Restaurant</button>*/}

                        <AddRestaurantLink/>


                        <Search
                            onSearch={value => {
                                setSearch(prevState => value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>


                    <table className="table table-striped">
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) =>
                                setSorting({ field, order })
                            }
                        />
                        <tbody>
                        {commentsData.map(comment => (
                            <tr>
                                <th scope="row" key={comment.id}>
                                    {comment.name}
                                </th>
                                {/*<td>{comment.name}</td>*/}
                                <td>{comment.averageRating}</td>
                                <td>{comment.tags}</td>
                                <td>{comment.city}</td>
                                <td>
                                    <button onClick={() => this.editRestaurant(comment.id)}
                                            className="btn btn-info">Update
                                    </button>
                                    <button style={{margin: "5px"}}
                                            onClick={() => this.deleteRestaurant(comment.id)}
                                            className="btn btn-danger"> Delete
                                    </button>
                                    <button style={{margin: "5px"}}
                                            onClick={() => this.viewRestaurant(comment.id)}
                                            className="btn btn-info"> View
                                    </button>
                                </td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {hideLoader}
        </>
    );
};

export default DataTable;
