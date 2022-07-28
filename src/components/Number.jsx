import React from "react";

function Number(props) {
  const resultsRender = [];
  for (var i = 0; i < props.value.length; i += 9) {
    resultsRender.push(
      <div className="line">
        {props.value.slice(i, i + 9).map((user) => (
          <div>
            <input
              type="text"
              maxLength="1"
              className={user.value}
              value=""
            />
          </div>
        ))}
      </div>
    );
  }
  // resultsRender.push(<input></input>);
  return <div>{resultsRender}</div>;
}

export default Number;
