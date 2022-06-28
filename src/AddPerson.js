import React from "react";

function AddPerson(props) {
  const handleAddPersonChild = e => {
    e.preventDefault();
    const trimName = e.target.elements.name.value.trim();
    props.handleAddPersonParent(trimName);
    document.getElementById("name-form").reset();
  };

  return (
    <div className="form-wrap">
      <form
        autoComplete="off"
        onSubmit={handleAddPersonChild}
        id="name-form"
        className="form"
      >
        <input
          type="text"
          name="name"
          className="input"
          placeholder="Enter a name"
        />
        <button type="submit" className="add">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddPerson;
