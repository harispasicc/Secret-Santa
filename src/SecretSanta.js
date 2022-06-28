import React, { useState } from "react";
import People from "./People";
import AddPerson from "./AddPerson";
import Generate from "./Generate";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import aes from "crypto-js/aes";
import cryptojs from "crypto-js";

function SecretSanta() {
  const [people, setPeople] = useState([]);
  const [santas, setSantas] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [message, setMessage] = useState("");

  const encryptString = () => {
    const key = process.env.REACT_APP_ENCRYPT_KEY;
    return aes.encrypt(JSON.stringify(key), "1234").toString();
  };

  const decryptHash = hash => {
    const key = process.env.REACT_APP_ENCRYPT_KEY;
    const plaintext = aes.decrypt(hash.toString(), key);
    return plaintext.toString(cryptojs.enc.Utf8);
  };

  const transformToArray = prmstr => {
    let params = {};
    let prmarr = prmstr.split("&");
    for (let i = 0; i < prmarr.length; i++) {
      let tmparr = prmarr[i].split("=");
      params[tmparr[0]] = tmparr[1];
    }
    return params;
  };

  const getSearchParameters = () => {
    let prmstr = window.location.search.substring(1);
    return prmstr !== null && prmstr !== "" ? transformToArray(prmstr) : {};
  };
  const params = getSearchParameters();

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const handleAddPersonParent = name => {
    name = name.toLowerCase();
    if (name === "") {
      setHidden(false);
      setMessage("Please enter a valid name!");
    } else if (people.indexOf(name) !== -1) {
      setHidden(false);
      setMessage("This person has already been added!");
    } else {
      setHidden(true);
      setPeople(people.concat(name));
      setSantas([]);
    }
  };

  const handleDeletePerson = name => {
    setPeople(people.filter(item => item !== name));
  };

  const handleGenerate = () => {
    const newArray = people.slice();
    const santas = shuffleArray(newArray);
    if (people.length <= 2) {
      setHidden(false);
      setMessage("You need at least 3 people to generate Secret Santas!");
    } else {
      setHidden(true);
      setSantas(santas);
    }
  };

  {
    let generateErrorMessage;
    generateErrorMessage = (
      <p
        style={{
          color: "#d53743",
          fontSize: ".75rem",
          textAlign: "center",
          marginTop: "-.75rem",
        }}
      >
        {message}
      </p>
    );

    if (params.name !== undefined) {
      return (
        <div className="container">
          <Header />
          <Note
            name={params.name}
            mykey={params.key}
            decryptHash={decryptHash}
          />
        </div>
      );
    }

    return (
      <div className="body-wrap">
        <div className="container wrap">
          <Header />
          <Generate handleGenerate={handleGenerate} />
          {!hidden ? generateErrorMessage : null}
          <AddPerson handleAddPersonParent={handleAddPersonParent} />
          <People
            people={people}
            santas={santas}
            handleDeletePerson={handleDeletePerson}
            encryptString={encryptString}
          />
        </div>
        <div className="container">
          <Footer />
        </div>
      </div>
    );
  }
}

export default SecretSanta;
