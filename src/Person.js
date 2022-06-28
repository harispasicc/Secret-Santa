import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

function Person(props) {
  const [copied, setCopied] = useState(false);
  const [copyText, setCopyText] = useState("Copy link");

  const showCopied = () => {
    setCopyText("Copied");
    setTimeout(() => {
      setCopyText("Copy link");
    }, 1000);
  };

  return (
    <div className="person">
      <div className="person__number">{props.number}</div>
      <p className="person__name">{props.person}</p>
      {props.renderRemove === true ? (
        <button
          className="person__remove"
          onClick={() => {
            props.handleDeletePerson(props.person);
          }}
        >
          Remove
        </button>
      ) : (
        <CopyToClipboard
          text={
            window.location.origin.toString() +
            "/?name=" +
            props.person.split(" ").join("%20") +
            "&key=" +
            props.encryptString(props.santa)
          }
          onCopy={() => setCopied(true)}
        >
          <button className="person__link" onClick={showCopied}>
            {copyText}
          </button>
        </CopyToClipboard>
      )}
    </div>
  );
}

export default Person;
