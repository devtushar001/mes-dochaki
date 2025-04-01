import React, { useContext, useEffect, useState, useCallback } from "react";
import "./RawMaterialUpdate.css";
import { MesContext } from "../../Context/MesContextProvider";

const RawMaterialUpdate = () => {
    const { readDate, backend_url } = useContext(MesContext);
    const [fetchedData, setFetchedData] = useState([]);
    const [inputDate, setInputDate] = useState(getCurrentDate());

    function getCurrentDate() {
        const currentDate = new Date();
        return currentDate.toISOString().split("T")[0]; // More efficient way to format date (YYYY-MM-DD)
    }

    // Fetch Data (Optimized using useCallback)
    const fetchRecentUpdate = useCallback(async () => {
        if (!inputDate) return; // Prevent fetch if date is empty

        try {
            const res = await fetch(`${backend_url}/api/update-raw/get-update/${inputDate}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to fetch recent updates");

            const result = await res.json();
            setFetchedData(result.data || []);

        } catch (error) {
            console.error("Error fetching updates:", error.message);
        }
    }, [inputDate, backend_url]); // Dependencies: inputDate, backend_url

    // Fetch Data on Component Mount (Only Once)
    useEffect(() => {
        fetchRecentUpdate();
    }, [fetchRecentUpdate]);

    return (

        <>
            <div className="recent-update">
                <div className="filter-method">
                    <h2>RECENT UPDATED RAW!!!</h2>
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

export default RawMaterialUpdate;
