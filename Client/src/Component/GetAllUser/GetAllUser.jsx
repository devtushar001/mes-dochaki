import React, { useContext, useEffect, useState } from "react";
import { MesContext } from "../../Context/MesContextProvider";
import { toast } from "react-toastify";
import "./GetAllUser.css";

const GetAllUser = () => {
    const [allUser, setAllUser] = useState([]);
    const { backend_url, token } = useContext(MesContext);

    const getAllUserData = async () => {
        if (!token) {
            toast.error("Authorization token is missing!");
            return;
        }

        try {
            const res = await fetch(`${backend_url}/api/user/all-users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Failed to fetch user data");
                return;
            }

            setAllUser(data.data); // ✅ Only update state if request is successful
            toast.success("User data fetched successfully!");
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Failed to fetch user data. Please try again.");
        }
    };

    useEffect(() => {
        getAllUserData();
    }, [token, backend_url]);

    const userAccess = async (personId) => {
        if (!token) {
            toast.error("Authorization token is missing!");
            return;
        }

        try {
            const res = await fetch(`${backend_url}/api/user/access`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ personId }),
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Failed to update user access");
                return;
            }

            setAllUser((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === personId ? { ...user, access: true } : user
                )
            );

            toast.success(data.message || "User access updated successfully!");
        } catch (error) {
            console.error("Error updating user access:", error);
            toast.error("Failed to update user access. Please try again.");
        }
    };

    const userDeletion = async (personId) => {
        if (!token) {
            toast.error("Authorization token is missing!");
            return;
        }

        try {
            const res = await fetch(`${backend_url}/api/user/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ personId }),
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Failed to delete user");
                return;
            }

            setAllUser((prevUsers) => prevUsers.filter((user) => user._id !== personId));

            toast.warning(data.message || "User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user. Please try again.");
        }
    };

    const removeAccess = async (personId) => {
        if (!token) {
            toast.error("Authorization token is missing!");
            return;
        }

        try {
            const res = await fetch(`${backend_url}/api/user/remove-access`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ personId }),
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Failed to remove access");
                return;
            }

            setAllUser((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === personId ? { ...user, access: false } : user
                )
            );

            toast.info(data.message || "User access removed successfully!");
        } catch (error) {
            console.error("Error removing user access:", error);
            toast.error("Failed to remove user access. Please try again.");
        }
    };

    return (
        <div className="all-user">
            {allUser.map((item, i) => (
                <div className="user-data-cont" key={i}>
                    <span>{item.name}</span>
                    <span>{item.email}</span>
                    <span>{item.isVerified ? "Verified" : "Not Verified"}</span>
                    <span>
                        {item.access ? (
                            <button className="remove-access" onClick={() => removeAccess(item._id)}>
                                Remove Access
                            </button>
                        ) : (
                            <button onClick={() => userAccess(item._id)}>Pending Access</button>
                        )}
                    </span>
                    <span>
                        <button onClick={() => userDeletion(item._id)}>Delete User</button>
                    </span>
                </div>
            ))}
        </div>
    );
};

export default GetAllUser;
