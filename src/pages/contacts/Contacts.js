import React from "react";

import WrapGoogleMap from "./GoogleMap";

const Contacts = () => {
  return (
    <div className="contacts" id="contacts">
      <div className="contacts-container">
        <div className="contacts-title">Контакти</div>
        <div className="contacts-address">
          м.Київ, вул. Володимира Богдановицького{" "}
        </div>
        <br/>
      </div>
      <WrapGoogleMap />
      <br/>

    </div>
  );
};

export default Contacts;
