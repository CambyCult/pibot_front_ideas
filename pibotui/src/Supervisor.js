import axios from "axios";
import { useState, useEffect } from "react";
import "./Supervisor.css";
import { Modal } from "./Modal";

export function SupervisorView() {
  const [messages, setMessages] = useState([]);
  const [isMessagesVisible, setIsMessagesVisible] = useState(false);

  // MESSAGES
  const handleMessages = () => {
    axios.get("http://localhost:3000/messages.json").then((response) => {
      // console.log(response.data);
      setMessages(response.data);
    });
  };

  // renders messages on page load
  useEffect(handleMessages, []);

  //opens modal with messages
  const showMessages = () => {
    setIsMessagesVisible(true);
  };

  const hideMessages = () => {
    setIsMessagesVisible(false);
  };

  //USERS

  const [users, setUsers] = useState([]);

  const retrieveUsers = () => {
    axios.get("http://localhost:3000/users.json").then((response) => {
      // console.log(response.data);
      setUsers(response.data);
    });
  };

  // renders users on page load
  useEffect(retrieveUsers, []);

  //creates an array of objects for each user and some of their attributes. This info is used in the form for assigning users to rigs.
  const usersInfo = users.map((user) => {
    const container = {};
    container.id = user.id;
    container.firstName = user.first_name;
    container.lastName = user.last_name;
    container.rigId = user.rig_id;
    return container;
  });

  // Acquire Rigs
  const [rigs, setRigs] = useState([]);
  const handleRigs = () => {
    axios.get("http://localhost:3000/rigs.json").then((response) => {
      // console.log(response.data);
      setRigs(response.data);
    });
  };
  useEffect(handleRigs, []);

  // Placing User on Rig

  const [selectUser, setSelectUser] = useState("");
  // const [isUsersVisible, setIsUsersVisible] = useState(false);
  const [isUsersVisible, setIsUsersVisible] = useState(true);

  // const handleTechs = () => {
  //   setIsUsersVisible(!isUsersVisible);
  // };

  //retrieves user_id for user clicked in form below to dynamically send patch request to that user on the backend
  const selectedUser = (event) => {
    setSelectUser(event.target.value);
  };

  const handleFieldAssign = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    // let chosenRig = params.get("rig_id");
    axios
      .patch(`http://localhost:3000/users/${selectUser}.json`, params)
      .then((response) => {
        // setIsUsersVisible(false);
        window.location.href = "/supervisor";
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };

  return (
    <div>
      <h2>Welcome to the supervisor portal.</h2>
      <button type="button" onClick={() => showMessages()}>
        Open Messages
      </button>
      <Modal show={isMessagesVisible} onClose={hideMessages}>
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className="message">
              <h5>date: {message.date}</h5>
              <h6>shift: {message.shift}</h6>
              <h6>
                field tech: {message.user_first} {message.user_last}{" "}
              </h6>
              <h5>message: {message.content}</h5>
            </div>
          ))}
        </div>
      </Modal>
      {/* {!isMessagesVisible ? (
        <button type="button" onClick={() => handleVisibleMessages()}>
          Open Messages
        </button>
      ) : (
        <button type="button" onClick={() => handleVisibleMessages()}>
          Close Messages
        </button>
      )}
      {!isMessagesVisible ? (
        <></>
      ) : (
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id}>
              <h3>date: {message.date}</h3>
              <h4>shift: {message.shift}</h4>
              <h4>
                field tech: {message.user_first} {message.user_last}{" "}
              </h4>
              <h5>message: {message.content}</h5>
            </div>
          ))}
        </div>
      )} */}
      <div></div>
      {/* <button type="button" onClick={handleTechs}>
        Assign Techs
      </button> */}
      {isUsersVisible ? (
        <div className="flexTechs">
          <form className="assign-form" onSubmit={handleFieldAssign}>
            <label>Tech:</label>
            <select id="id" name="id" size="8">
              {usersInfo.map((container) => (
                <option
                  value={container.id}
                  onClick={selectedUser}
                  key={container.id}
                >
                  {container.firstName}
                </option>
              ))}
            </select>
            <label>Rig:</label>
            <select id="rig_id" name="rig_id" size="6">
              <option value="1">Rig 1</option>
              <option value="2">Rig 2</option>
              <option value="3">Rig 3</option>
              <option value="4">Rig 4</option>
              <option value="5">Rig 5</option>
              <option value="6">Rig 6</option>
              <option value={null}>Unassign</option>
            </select>

            <button className="rig-button" type="submit">
              Submit
            </button>
          </form>
          <div className="assignments-container">
            <h3>Current Assignments</h3>
            <table className="assignments-table">
              <thead>
                <tr>
                  <th>Rig</th>
                  <th>Tech 1</th>
                  <th>Tech 2</th>
                </tr>
              </thead>
              <tbody>
                {rigs.map((rig) => (
                  <tr key={rig.id}>
                    <td>{rig.id}</td>
                    <td>
                      {rig.users.length >= 1 ? rig.users[0].first_name : ""}
                    </td>
                    <td>
                      {rig.users.length > 1 ? rig.users[1].first_name : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
