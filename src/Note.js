import React from "react";

function Note(props) {
  return (
    <div className="people-container">
      <div className="note">
        <h5 className="note__title">Hi {props.name.replace("%20", " ")},</h5>
        <h5>
          you've been assigned{" "}
          <span className="note__santa">{props.decryptHash(props.mykey)}</span>.
        </h5>
        <h5>Good luck!</h5>
      </div>
    </div>
  );
}

export default Note;
