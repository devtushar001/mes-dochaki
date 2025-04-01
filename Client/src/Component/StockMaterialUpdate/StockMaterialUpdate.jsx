import React, { useContext, useEffect, useState, useCallback } from "react";
import "./StockMaterialUpdate.css";
import { Link } from "react-router-dom";
import { MesContext } from "../../Context/MesContextProvider";

const StockMaterialUpdate = () => {
    const { readDate, backend_url } = useContext(MesContext);
    const [fetchedData, setFetchedData] = useState([]);
    const [inputDate, setInputDate] = useState(getCurrentDate());

    function getCurrentDate() {
        return new Date().toISOString().split("T")[0]; // Faster way to get YYYY-MM-DD format
    }

    // Fetch data function wrapped in useCallback for optimization
    const fetchRecentUpdate = useCallback(async () => {
        if (!inputDate) return;

        try {
            const res = await fetch(`${backend_url}/api/stock-material-update/get-update/${inputDate}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to fetch recent updates");

            const result = await res.json();
            setFetchedData(result.data || []);
        } catch (error) {
            console.error("Error fetching updates:", error.message);
        }
    }, [inputDate, backend_url]);

    // Fetch data when the component mounts
    useEffect(() => {
        fetchRecentUpdate();
    }, [fetchRecentUpdate]);

    return (
        <>
            <div className="recent-update">
                <div className="filter-method">
                    <h2>RECENT UPDATED STOCK!!!</h2>
                    <div className="date-selection">
                        <p>Select Date</p>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={inputDate}
                            onChange={(e) => setInputDate(e.target.value)}
                        />
                        <button onClick={fetchRecentUpdate}>Search Data</button>
                    </div>
                </div>

                {fetchedData.length === 0 ? (
                    <p>No recent updates available.</p>
                ) : (
                    <div className="table">
                        <div className="table-head">
                            <span>Product Name</span>
                            <span>Change Type</span>
                            <span>Quantity</span>
                            <span>Current Quantity</span>
                            <span>Updated At</span>
                        </div>
                        {fetchedData.map((update) => (
                            <>
                                <div key={update._id} className="table-body">
                                    <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <img style={{ maxWidth: "45px" }} src={update.ProductData.image} alt="" />
                                        {update.ProductData.name}
                                    </span>
                                    <span>{update.changeType.toLowerCase()}</span>
                                    <span>  {update.quantity} {update.changeType === "in" ? "in" : "out"}</span>
                                    <span>{update.currentQuantity}</span>
                                    <span>{readDate(update.updatedAt)}</span>
                                </div>
                                <hr />
                            </>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default StockMaterialUpdate;
