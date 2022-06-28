import React from "react";
import Person from "./Person";

function People(props) {
  const renderRemove = () => {
    if (props.santas.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="people-container">
      {props.people.length > 0 ? (
        props.people.map((person, index) => (
          <Person
            person={person}
            key={person}
            santa={props.santas[index]}
            number={index + 1}
            handleDeletePerson={props.handleDeletePerson}
            renderRemove={renderRemove()}
            encryptString={props.encryptString}
            copyText={props.copyText}
          />
        ))
      ) : (
        <p className="empty-message">Add a employee to get started!</p>
      )}
    </div>
  );
}

export default People;
