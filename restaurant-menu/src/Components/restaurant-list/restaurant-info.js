import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useHistory } from "react-router-dom";

import ProgressSpinner from "./../../shared/spinner/spinner";
import RestaurantService from "./../../services/restaurant-service";


const RestaurantInfo = forwardRef((props, ref) => {

    const [restaurantData, updateRestaurantData] = useState([]);
    const [isLoading, updateLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        getInitialData();
        return () => {
            props.clearValue();
        }
    }, []);

    function getInitialData() {
        navigator.geolocation.getCurrentPosition((location) => {
            if (location?.coords?.latitude) {
                RestaurantService.getRestaurant(location?.coords?.latitude, location?.coords?.longitude, 2).then(res => {
                    updateLoading(false);
                    if (res?.data) {
                        updateRestaurantData(res.data);
                    }
                }, () => updateLoading(false));
            }
        })
    }

    function getTableRecords() {
        return <table className="table-root" aria-label="a dense table">
            <thead className="">
                <tr className="">
                    <th className="thead-cell" scope="col">Name</th>
                    <th className="thead-cell" scope="col">Cuisines</th>
                    <th className="thead-cell" scope="col">Phone</th>
                    <th className="thead-cell" scope="col">City</th>
                    <th className="thead-cell" scope="col">State</th>
                </tr>
            </thead>
            <tbody className="">
                {
                    restaurantData.map(data => (<tr onClick={() => history.push("/restaurant/" + data.restaurant_id)} key={data?.restaurant_id} className="restaurant-info" >
                        <th className="tbody-cell" role="cell" scope="row"><strong>{data?.restaurant_name || ""}</strong></th>
                        <td className="tbody-cell">{data?.cuisines?.length ? data.cuisines.toString() : ""}</td>
                        <td className="tbody-cell">{data?.restaurant_phone}</td>
                        <td className="tbody-cell">{data?.address?.city}</td>
                        <td className="tbody-cell">{data?.address?.state}</td>
                    </tr>))
                }

            </tbody>
        </table >
    }

    useImperativeHandle(
        ref,
        () => ({
            searchData(searchValue) {
                updateLoading(true);
                if (searchValue) {
                    RestaurantService.searchByName(searchValue).then(res => {
                        updateLoading(false);
                        if (res?.data) {
                            updateRestaurantData(res.data);
                        }
                    }, err => updateLoading(false));
                } else {
                    getInitialData();
                }
            }
        }),
    )
    return (
        <div>
            {!isLoading ? restaurantData?.length ?
                getTableRecords() :
                <h2 className="no-record">No Restaurant Found</h2> : <ProgressSpinner />
            }


        </div>
    )
})

export default RestaurantInfo;
