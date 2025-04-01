import React from "react";
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className="home-container">
                <Link to="/raw-material"><button className="raw">Raw</button></Link>
                <Link to="/stock-material"><button className="stock">Stock</button></Link>
            </div>
        </>
    )
}

export default Home;