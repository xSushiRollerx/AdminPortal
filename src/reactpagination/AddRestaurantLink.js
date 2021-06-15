import { useMemo } from "react";
import {
    useParams,
    useLocation,
    useHistory,
    useRouteMatch,
} from "react-router-dom";
import queryString from "query-string";
// Usage
function AddRestaurantLink() {
    // Get the router object
    const router = useRouter();
    // Get value from query string (?postId=123) or route param (/:postId)
    console.log(router.query.postId);
    // Get current pathname
    console.log(router.pathname);
    // Navigate with with router.push()
    return <button style={{
        color: "white", backgroundColor: "#333",height:"30px" ,float:"left"
    }} onClick={(e) => router.push('/add-restaurant/add')}>Add Restaurant</button>;
}
// Hook
export function useRouter() {
    const params = useParams();
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    // Return our custom router object
    // Memoize so that a new object is only returned if something changes
    return useMemo(() => {
        return {
            // For convenience add push(), replace(), pathname at top level
            push: history.push,
            replace: history.replace,
            pathname: location.pathname,
            // Merge params and parsed query string into single "query" object
            // so that they can be used interchangeably.
            // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
            query: {
                ...queryString.parse(location.search), // Convert string to object
                ...params,
            },
            // Include match, location, history objects so we have
            // access to extra React Router functionality if needed.
            match,
            location,
            history,
        };
    }, [params, match, location, history]);
}

export default AddRestaurantLink;