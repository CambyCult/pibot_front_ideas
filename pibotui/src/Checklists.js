import axios from "axios";
import { useState, useEffect } from "react";
import "./Checklists.css";

export function Checklists() {
  const [items, setItems] = useState([]);
  const handleItems = () => {
    axios.get("http://localhost:3000/items.json").then((response) => {
      setItems(response.data);
      console.log(response.data);
    });
  };
  useEffect(handleItems, []);

  const [manifests, setManifests] = useState([]);

  const handleManifests = () => {
    axios.get("http://localhost:3000/manifests.json").then((response) => {
      setManifests(response.data);
    });
  };

  useEffect(handleManifests, []);

  const [searchFilter, setSearchFilter] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/manifests.json", params)
      .then((response) => {
        console.log(response.data);
        handleManifests();
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };

  return (
    <div>
      <h6>View/Add Current Rig Items: </h6>
      <p>Choose a Rig</p>
      <input
        type="text"
        value={searchFilter}
        onChange={(event) => setSearchFilter(event.target.value)}
        list="rig_checklist_id"
      />
      <datalist id="rig_checklist_id">
        {manifests.map((manifest) => (
          <option key={manifest.id}>{manifest.rig_checklist_id}</option>
        ))}
      </datalist>
      <div className="flex_container">
        <div className="add_item">
          <form onSubmit={handleSubmit}>
            <label>Add Item to Checklist:</label>
            {/* <select id="item" name="id">
              {items.map((item) => (
                <option key={item.id} name="item_id">
                  {item.name}
                </option>
              ))}
            </select> */}
            <label>Item Id</label>
            <input type="number" name="item_id"></input>
            <label>Rig:</label>
            <input
              type="number"
              value={searchFilter}
              name="rig_checklist_id"
            ></input>
            <button type="submit">add to list</button>
          </form>
        </div>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Minimum</th>
            </tr>
          </thead>
          <tbody>
            {manifests
              .filter((manifest) => manifest.rig_checklist_id == searchFilter)
              .map((manifest) => (
                <tr key={manifest.id}>
                  <td>{manifest.item_name}</td>
                  <td>{manifest.item_minimum}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
