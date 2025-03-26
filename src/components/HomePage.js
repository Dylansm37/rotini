import React from "react";
import Navbar from "./Navbar";
import FeaturedItems from "./FeaturedItems";

const homepage = () => {
    return (
        <div className = "home-container">
            <Navbar />
            <section className="featured-items">
                <h1> Featured Menu Items </h1>
                <FeaturedItems/>
            </section>
        </div>
    );
};

export default homepage;