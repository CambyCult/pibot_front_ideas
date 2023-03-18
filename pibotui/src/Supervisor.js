import axios from "axios";
import { useState, useEffect } from "react";

export function SupervisorView() {
  const [messages, setMessages] = useState([]);
  const [isMessagesVisible, setIsMessagesVisible] = useState(false);

  // MESSAGES
  const handleMessages = () => {
    axios.get("http://localhost:3000/messages.json").then((response) => {
      console.log(response.data);
      // setIsMessagesVisible(true);
      setMessages(response.data);
    });
  };

  useEffect(handleMessages, []);

  const handleVisibleMessages = () => {
    setIsMessagesVisible(!isMessagesVisible);
  };

  //USERS

  const [users, setUsers] = useState([]);

  const retrieveUsers = () => {
    axios.get("http://localhost:3000/users.json").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  };

  useEffect(retrieveUsers, []);

  const usersInfo = users.map((user) => {
    const container = {};
    container.id = user.id;
    container.firstName = user.first_name;
    container.lastName = user.last_name;

    return container;
  });

  // Placing User on Rig

  const [selectUser, setSelectUser] = useState("");

  const selectedUser = (event) => {
    const selected = event.target.value;
    setSelectUser(event.target.value);
  };

  const handleFieldAssign = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    console.log(event.target);

    axios
      .patch(`http://localhost:3000/users/${selectUser}.json`, params)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };

  return (
    <div>
      <h2>Welcome to the supervisor portal.</h2>

      {!isMessagesVisible ? (
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
              <h4>field tech: {message.user_id}</h4>
              <h5>message: {message.content}</h5>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleFieldAssign}>
        <label>Tech:</label>
        <select id="id" name="id" size="8">
          {usersInfo.map((container) => (
            <option value={container.id} onClick={selectedUser}>
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
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
