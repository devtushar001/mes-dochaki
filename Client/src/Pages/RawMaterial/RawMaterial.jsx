import React, { useContext, useEffect, useState } from "react";
import './RawMaterial.css';
import ImageUploader from "../../Component/ImageUploader/ImageUploader";
import { MesContext } from "../../Context/MesContextProvider";
import { toast } from "react-toastify";
import { assets } from "../../Assets/Assets";

const UpdatedRawMaterial = () => {
    const [addNew, setAddNew] = useState(false);
    const [inOUt, setInOut] = useState(false);
    const [productId, setProductId] = useState("");
    const { backend_url, rawMaterials, setRawMaterials, token, setLoginSignup } = useContext(MesContext);
    const [productImage, setProductImage] = useState({ type: "single", selection: false, image: null });
    const [rawData, setRawData] = useState({
        materialName: "",
        imageUrl: "",
        description: "",
        quantity: 0,
        color: ""
    });

    const [searchQuery, setSearchQuery] = useState("All");

    const [data, setData] = useState({
        ProductId: "",
        changeType: "in",
        issuedType: "default",
        message: "",
        quantity: 0
    });

    const [productEdit, setProductEdit] = useState({
        productId: "",
        action: false,
    });


    const fetchProduct = async () => {
        if (!token) setLoginSignup(true);
        try {
            const res = await fetch(`${backend_url}/api/raw-material/get?query=${searchQuery}`, {
                method: 'GET',
                headers: { 'Content-Type': "application/json", Authorization: `Bearer ${token}`, }
            });

            if (!res.ok) throw new Error("Failed to fetch raw materials");

            const data = await res.json();
            if (!data.success) {
                return;
            }

            setRawMaterials(data.data);
            console.log(data.data)
        } catch (error) {
            toast.error(`${error.name}: ${error.message}`);
        }
    };

    useEffect(() => {
        console.log(searchQuery)
        fetchProduct();
    }, [backend_url, searchQuery]);

    const createRawProduct = async () => {
        if (!token) setLoginSignup(true)
        try {
            const res = await fetch(`${backend_url}/api/raw-material/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(rawData)
            });

            if (!res.ok) throw new Error("Failed to create product");

            const data = await res.json();

            if (!data.success) {
                return;
            }

            setRawMaterials((prev) => [...prev, data.data]);

            // Reset form
            setRawData({ materialName: "", imageUrl: "", description: "", quantity: 0, color: "" });
            setProductImage({ type: "single", selection: false, image: null });
        } catch (error) {
            toast.error(`${error.name}: ${error.message}`);
        }
    };

    const deleteRawProduct = async (id) => {
        const confirmed = window.confirm(`Are you sure you want to delete the image with ID: ${id}?`);
        if (!confirmed) return;

        if (!token) {
            setLoginSignup(true);
            return;
        }

        try {
            const res = await fetch(`${backend_url}/api/raw-material/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error("Failed to delete product");

            const data = await res.json();
            if (!data.success) {
                toast.error(data.message);
                return;
            }

            toast.success("Product deleted successfully");
            fetchProduct();
        } catch (error) {
            toast.error(`${error.name}: ${error.message}`);
        }
    };


    useEffect(() => {
        if (productImage.image) {
            setRawData((prev) => ({ ...prev, imageUrl: productImage.image }));
        }
    }, [productImage.image]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRawData((prev) => ({ ...prev, [name]: value }));
    };

    const updateRawMaterial = async () => {
        if (!token) setLoginSignup(true);
        try {
            const res = await fetch(`${backend_url}/api/update-raw/update`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                throw new Error("Something went wrong while updating raw material");
            }

            const result = await res.json();

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success("Raw material updated successfully!");
            fetchProduct();
            setData((prev) => ({ ...prev, changeType: "in" }))
            setInOut(false);
        } catch (error) {
            toast.error(`${error.name}: ${error.message}`);
            console.error("Update error:", error);
        }
    };


    return (
        <>
            <div className="updated-raw-material">
                <div className="updated-controll-form-btn">
                    <button onClick={() => setAddNew(!addNew)}>
                        {!addNew ? "Add New Product" : "Close"}
                    </button>
                    <input style={{ paddingLeft: "12px" }} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search item" />
                </div>
                {addNew && (
                    <div className="updated-add-new-raw-material">
                        <div className="image">
                            {productImage.image ? (
                                <img style={{ width: "210px" }} src={productImage.image} alt="Product" />
                            ) : (
                                <p>No image selected</p>
                            )}
                        </div>
                        <div className="updated-material-name">
                            <input
                                value={rawData.materialName}
                                onChange={handleChange}
                                name="materialName"
                                type="text"
                                placeholder="Material name"
                            />
                            <button onClick={() => setProductImage((prev) => ({ ...prev, selection: true }))}>
                                Choose Image
                            </button>
                        </div>

                        {productImage.selection && (
                            <ImageUploader object={productImage} imageSelector={setProductImage} />
                        )}

                        <textarea
                            value={rawData.description}
                            onChange={handleChange}
                            name="description"
                            placeholder="Searching keyword"
                        />

                        <div className="updated-material-name">
                            <input
                                value={rawData.quantity}
                                onChange={handleChange}
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                            />
                            <input
                                value={rawData.color}
                                onChange={handleChange}
                                type="text"
                                name="color"
                                placeholder="Color"
                            />
                        </div>

                        <button onClick={createRawProduct} className="updated-submit">
                            Submit
                        </button>
                    </div>
                )}

                {!addNew && (
                    rawMaterials.length === 0 ? (
                        <p>No raw materials available. Please add one.</p>
                    ) : (
                        <div className="table-container">
                            <div className="table-header">
                                <span>S.No.</span>
                                <span>Material Name</span>
                                <span>Image</span>
                                <span>Description</span>
                                <span>Quantity</span>
                                <span>Color</span>
                                <span >Actions</span>
                            </div>
                            {rawMaterials.map((material, index) => (
                                <div className="table-body">
                                    <span>{index + 1}</span>
                                    <span>{material.materialName}</span>
                                    <span>
                                        <img
                                            src={material.imageUrl}
                                            alt="Material"
                                            className="updated-img-thumbnail"
                                        />
                                    </span>
                                    <span>{material.description}</span>
                                    <span>{material.quantity}</span>
                                    <span>{material.color}</span>
                                    <span className="btn">
                                        <button
                                            onClick={() => {
                                                setInOut(true);
                                                setProductId(material._id);
                                                setData(prev => ({ ...prev, ProductId: material._id }));
                                            }}
                                            className="updated-btn updated-btn-primary"
                                        >
                                            In Out
                                        </button>
                                        <button
                                            onClick={() => deleteRawProduct(material._id)}
                                            className="updated-btn updated-btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </span>
                                    <div className="update-product">
                                        <img onClick={() => { setProductEdit((prev) => ({ ...prev, action: true })); setProductEdit((prev) => ({ ...prev, productId: material._id })) }} src={assets.edit_icon} alt="" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div >
            {inOUt ? <div className="edit-in-out">
                < div className="container" >
                    <h2>Updating Raw!!!</h2>
                    <div className="close" onClick={() => setInOut(false)}>X</div>
                    {
                        rawMaterials.map((item, i) => {
                            if (item._id === productId) {
                                return (
                                    <div key={i} className="product-details">
                                        <img style={{ maxWidth: "110px" }} src={item.imageUrl} alt="" />
                                        <p>{item.materialName}&#44;</p>
                                        <p>Current-Qty: {item.quantity}</p>
                                    </div>
                                );
                            }
                        })
                    }
                    <div className="input-system">
                        <select
                            onChange={(e) => setData(prev => ({ ...prev, changeType: e.target.value }))}
                            name="update-type"
                            id="update-type"
                        >
                            <option value="in">in</option>
                            <option value="out">out</option>
                        </select>
                        <select name="issued-type" id="issued-type" onChange={(e) => setData(prev => ({ ...prev, issuedType: e.target.value }))}>
                            <option value="default">Default</option>
                            <option value="others">Other</option>
                            <option value="persion">Person</option>
                            <option value="packing-room">Packing room</option>

                        </select>
                        <input onChange={(e) => setData(prev => ({ ...prev, message: e.target.value }))} type="text" placeholder="Issued to" />
                        <input onChange={(e) => setData((prev) => ({ ...prev, quantity: Number(e.target.value) }))} type="number" name="quantity" id="quantity" placeholder="Quantity" />
                        <button onClick={updateRawMaterial}>Submit</button>
                    </div>
                </div >
            </div > : <></>}
            {productEdit.action && (
                <div className="edit-window">
                    {rawMaterials.map((item) =>
                        item._id === productEdit.productId ? (
                            <div key={item._id} className="editing-box-container">
                                <div onClick={() => { setProductEdit((prev) => ({ ...prev, action: false })) }} className="close">X</div>
                                <div className="div">
                                    <span>Product Image</span><img src={item.imageUrl} alt="" />
                                    <span>Material Name</span><input onChange={(e) => { setRawData((prev) => ({ ...prev, materialName: e.target.value })) }} value={rawData.materialName || item.name} type="text" placeholder="Material name"/>
                                    <span>Color </span><input type="text" value={item.color} />
                                    {/* <span>Quantity </span><input type="text" value={item.quantity} /> */}
                                    <span>Searching Keywords</span> <textarea style={{ fontFamily: "Arial" }} type="text" value={item.description} ></textarea>
                                </div>
                                <button className="btn-submit">Edit Raw Item</button>
                            </div>
                        ) : null
                    )}
                </div>
            )}

        </>
    );
};

export default UpdatedRawMaterial;
