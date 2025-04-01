import React, { useContext } from "react";
import { MesContext } from "../../Context/MesContextProvider";

const InRawProduct = () => {
    const { rawMaterials = [] } = useContext(MesContext); 

    return (
        <div className="in-raw-product">
            <select name="in-raw-product-name" id="in-raw-product-name">
                <option value="">Select an option</option>
                {rawMaterials.map((item, i) => (
                    <option key={i} value={item.materialName}>{item.materialName}</option>
                ))}
            </select>
        </div>
    );
};

export default InRawProduct;
