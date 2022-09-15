import ReactDOM from "react-dom";
import { useState } from "react";

function OmniBar(props) {
  const [text, setText] = useState("");
  const { close } = props;

  const changeHandler = (e) => {
    setText(e.target.value);
  };

  const keyDownHandler = (e) => {
    if (e.key === "Backspace" && text.length === 0) {
      close();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    close();
    let res = eval(text);
    if (res) {
      alert(res);
    }
  };

  return ReactDOM.createPortal(
    <div id="omnibar">
      <form onSubmit={submitHandler}>
        <input
          value={text}
          onChange={changeHandler}
          onKeyDown={keyDownHandler}
          autoFocus
        />
      </form>
    </div>,
    document.querySelector(".roam-app")
  );
}

export default OmniBar;
