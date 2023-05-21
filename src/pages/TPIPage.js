import React from "react";
import '../css/Page-Container.css';

const TPIPage = () => {  return (
    <div className="content">
        <h1 className="title"> Travail pratique individuel </h1>
            <p>site officiel : https://www.ict-berufsbildung.ch/fr</p>

            <div className="content-buttons" >
                <button className="cta-button" name="bt-planning"> Planning </button>

                <button className="cta-button" name="bt-journal"> Journal </button>

                <button className="cta-button" name="bt-suivi" > Suivi </button>
            </div>

        </div>
    );
};

export default TPIPage;