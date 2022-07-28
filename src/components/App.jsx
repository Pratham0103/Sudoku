import React, { useState, useEffect, useCallback, useRef } from "react";
import Number from "./Number";
import numbers from "../numbers";
import isvalid from "../valid";
import solve from "../solve";
import _board from "../_board";
import Footer from "./Footer";

function App() {
  const ref = useRef(null);
  const [form1, setForm1] = useState();
  const handleUserKeyPress = useCallback((event) => {
    const { key, keyCode } = event;
    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);
    //console.log(keyCode);
    var regex = /^[1-9]/;
    if (regex.test(key)) {
      // to check for input numbers
      const k = parseInt(form.elements[index].className, 10); // too find row and columm
      form.elements[index].value = parseInt(key, 10);
      form.elements[index].style.color = "forestgreen";
      const bool = isvalid(k, parseInt(key, 10));
      console.log("y: " + bool);
      if (bool) {
        //form.elements[index].value = parseInt(key, 10);
        form.elements[index].style.color = "forestgreen";
        if (index >= 0 && index < 80) form.elements[index + 1].focus();
      } else {
        form.elements[index].style.color = "firebrick";
      }
    } else if (keyCode === 39) {
      // too handle right arrow key
      if (index >= 0 && index < 80) form.elements[index + 1].focus();
      else if (index === 80) form.elements[0].focus();
    } else if (keyCode === 37) {
      // too handle left arrow key
      console.log("n:" + index);
      if (index <= 80 && index > 0) form.elements[index - 1].focus();
      else if (index === 0) form.elements[80].focus();
    } else if (keyCode === 40) {
      // too handle down arrow key
      if (index >= 0 && index <= 71) form.elements[index + 9].focus();
      else form.elements[index % 9].focus();
    } else if (keyCode === 38) {
      // too handle down arrow key
      if (index >= 9 && index <= 80) form.elements[index - 9].focus();
      else form.elements[index + 9 * 8].focus();
    } else if (keyCode === 8) {
      const k = parseInt(form.elements[index].className, 10);
      console.log(k);
      if (isvalid(k, 0)) form.elements[index].value = null;
    }
    event.preventDefault();
  }, []);

  useEffect(() => {
    const element = ref.current;
    setForm1(element);
    //console.log(element.elements[0].value);
    element.addEventListener("keydown", handleUserKeyPress);
    return () => {
      element.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  function handleSolve(event) {
    console.log("clicked");
    if (solve()) {
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (
            form1.elements[i * 9 + j].value === "" ||
            form1.elements[i * 9 + j].style.color === "firebrick"
          ) {
            form1.elements[i * 9 + j].style.color = "black";
            form1.elements[i * 9 + j].value = _board[i][j];
          }
        }
      }
      console.log("solved");
    }
  }

  return (
    <div>
      <h1 id="title">Sudoku</h1>
      <button
        id="restart"
        type="button"
        onClick={() => window.location.reload()}
      >
        Restart
      </button>
      <button id="solve" type="button" onClick={handleSolve}>
        Solve
      </button>

      <form ref={ref}>
        <div className="container">
          <Number value={numbers} />
        </div>
      </form>
      <Footer />
    </div>
    // <div>
    // <h1 id="title">Sudoku</h1>
	// 	<button id="restart" type="button">Restart</button>
        
	// 	<div className="container">
	// 		<div className="line">
	// 			<div><input className="1" type="text" maxLength="1" onKeyPress={handleAnswerChange}/></div>
	// 			<div><input type="text" maxLength="1" className="2" name="ha"/></div>
	// 			<div><input type="text" maxLength="1" className="3"/></div>
	// 			<div><input type="text" maxLength="1" className="4"/></div>
	// 			<div><input type="text" maxLength="1" className="5"/></div>
	// 			<div><input type="text" maxLength="1" className="6"/></div>
	// 			<div><input type="text" maxLength="1" className="7"/></div>
	// 			<div><input type="text" maxLength="1" className="8"/></div>
	// 			<div><input type="text" maxLength="1" className="9"/></div>
	// 		</div>

	// 		<div className="line">
	// 			<div><input type="text" maxLength="1" className="10"/></div>
	// 			<div><input type="text" maxLength="1" className="11"/></div>
	// 			<div><input type="text" maxLength="1" className="12"/></div>
	// 			<div><input type="text" maxLength="1" className="13"/></div>
	// 			<div><input type="text" maxLength="1" className="14"/></div>
	// 			<div><input type="text" maxLength="1" className="15"/></div>
	// 			<div><input type="text" maxLength="1" className="16"/></div>
	// 			<div><input type="text" maxLength="1" className="17"/></div>
	// 			<div><input type="text" maxLength="1" className="18"/></div>
	// 		</div>

	// 		<div className="line">
	// 			<div><input type="text" maxLength="1" className="19"/></div>
	// 			<div><input type="text" maxLength="1" className="20"/></div>
	// 			<div><input type="text" maxLength="1" className="21"/></div>
	// 			<div><input type="text" maxLength="1" className="22"/></div>
	// 			<div><input type="text" maxLength="1" className="23"/></div>
	// 			<div><input type="text" maxLength="1" className="24"/></div>
	// 			<div><input type="text" maxLength="1" className="25"/></div>
	// 			<div><input type="text" maxLength="1" className="26"/></div>
	// 			<div><input type="text" maxLength="1" className="27"/></div>
	// 		</div>
	// 		<div className="line">
	// 			<div><input type="text" maxLength="1" className="28"/></div>
	// 			<div><input type="text" maxLength="1" className="29"/></div>
	// 			<div><input type="text" maxLength="1" className="30"/></div>
	// 			<div><input type="text" maxLength="1" className="31"/></div>
	// 			<div><input type="text" maxLength="1" className="2"/></div>
	// 			<div><input type="text" maxLength="1" className="4"/></div>
	// 			<div><input type="text" maxLength="1" className="6"/></div>
	// 			<div><input type="text" maxLength="1" className="8"/></div>
	// 			<div><input type="text" maxLength="1" className="7"/></div>
	// 		</div>
	// 		<div className="line">
	// 			<div><input type="text" maxLength="1" className="5"/></div>
	// 			<div><input type="text" maxLength="1" className="8"/></div>
	// 			<div><input type="text" maxLength="1" className="4"/></div>
	// 			<div><input type="text" maxLength="1" className="6"/></div>
	// 			<div><input type="text" maxLength="1" className="3"/></div>
	// 			<div><input type="text" maxLength="1" className="7"/></div>
	// 			<div><input type="text" maxLength="1" className="1"/></div>
	// 			<div><input type="text" maxLength="1" className="9"/></div>
	// 			<div><input type="text" maxLength="1" className="2"/></div>
	// 		</div>
	// 		<div className="line">
	// 			<div><input type="text" maxLength="1" className="7"/></div>
	// 			<div><input type="text" maxLength="1" className="2"/></div>
	// 			<div><input type="text" maxLength="1" className="6"/></div>
	// 			<div><input type="text" maxLength="1" className="1"/></div>
	// 			<div><input type="text" maxLength="1" className="8"/></div>
	// 			<div><input type="text" maxLength="1" className="9"/></div>
	// 			<div><input type="text" maxLength="1" className="5"/></div>
	// 			<div><input type="text" maxLength="1" className="3"/></div>
	// 			<div><input type="text" maxLength="1" className="4"/></div>
	// 		</div>
	// 		<div className="line">
	// 			<div><input type="text" maxLength="1" className="2"/></div>
	// 			<div><input type="text" maxLength="1" className="3"/></div>
	// 			<div><input type="text" maxLength="1" className="7"/></div>
	// 			<div><input type="text" maxLength="1" className="9"/></div>
	// 			<div><input type="text" maxLength="1" className="1"/></div>
	// 			<div><input type="text" maxLength="1" className="8"/></div>
	// 			<div><input type="text" maxLength="1" className="4"/></div>
	// 			<div><input type="text" maxLength="1" className="5"/></div>
	// 			<div><input type="text" maxLength="1" className="6"/></div>
	// 		</div>
	// 		<div className="line">
	// 			<div><input type="text" maxLength="1" className="4"/></div>
	// 			<div><input type="text" maxLength="1" className="5"/></div>
	// 			<div><input type="text" maxLength="1" className="1"/></div>
	// 			<div><input type="text" maxLength="1" className="2"/></div>
	// 			<div><input type="text" maxLength="1" className="6"/></div>
	// 			<div><input type="text" maxLength="1" className="3"/></div>
	// 			<div><input type="text" maxLength="1" className="8"/></div>
	// 			<div><input type="text" maxLength="1" className="7"/></div>
	// 			<div><input type="text" maxLength="1" className="9"/></div>
	// 		</div>
	// 		<div className="line">
	// 			<div><input type="text" maxLength="1" className="6"/></div>
	// 			<div><input type="text" maxLength="1" className="9"/></div>
	// 			<div><input type="text" maxLength="1" className="8"/></div>
	// 			<div><input type="text" maxLength="1" className="4"/></div>
	// 			<div><input type="text" maxLength="1" className="7"/></div>
	// 			<div><input type="text" maxLength="1" className="5"/></div>
	// 			<div><input type="text" maxLength="1" className="3"/></div>
	// 			<div><input type="text" maxLength="1" className="2"/></div>
	// 			<div><input type="text" maxLength="1" className="1"/></div>
	// 		</div>
	// 	</div>
    // </div>
  );
}

export default App;
