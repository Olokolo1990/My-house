import React from "react";
import {Link} from "react-router-dom";

export const Forecast = () => {
    return (
        <div className="main_container">
            <div className="App">
                <h1>Pogoda</h1>
            </div>
            <div className="forecast_content">

            </div>
            <div className="buttons">
                <Link to="/" className="btn">Powrót</Link>
            </div>
        </div>

    )
}