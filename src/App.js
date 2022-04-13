import { useEffect, useState } from "react";
import Table from "./components/Table/index";
import StatusBoxes from "./components/StatusBoxes/index";
import "./App.css";

//MODITHY THIS NUMBER TO CHANGE UPDATE FREQUENCY. VALUE IN SECONDS
let TIME_TO_UPDATE = 15;

TIME_TO_UPDATE *= 1000;

const apiNameAll = [
  "accounts",
  "assets",
  "customers",
  "datapoints",
  "devices",
  "documents",
  "forms",
  "invites",
  "media",
  "messages",
  "namespaces",
  "orders",
  "patients",
  "relationships",
  "rules",
  "templates",
  "users",
  "workflows",
];

const apiStatusTemplate = {
  success: "",
  message: "",
  hostname: "",
  time: "",
};

const apiStatusAllTemplate = {};

for (const name of apiNameAll) {
  apiStatusAllTemplate[name] = { ...apiStatusTemplate };
}

const fetchApi = async function (apiName) {
  try {
    const response = await fetch(
      `https://api.factoryfour.com/${apiName}/health/status`
    );
    if (response.ok) {
      const data = await response.json();
      const date = new Date(data.time);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      data.time = `${hours}:${minutes}:${seconds}`;
      return data;
    } else {
      throw response.status;
    }
  } catch (error) {
    const message = "OUTAGE";
    console.log(error);
    const data = { ...apiStatusTemplate, message: message };
    return data;
  }
};

function App() {
  const [view, setView] = useState(Number(0));
  const viewQuantity = 1;
  const changeViewHandler = function () {
    setView((previosState) => {
      if (previosState === viewQuantity) {
        return Number(0);
      } else return Number(view + 1);
    });
  };

  const [apiAllStatus, setApiAllStatus] = useState({ ...apiStatusAllTemplate });
  useEffect(() => {
    const update = async function () {
      for (let key in apiAllStatus) {
        const data = await fetchApi(key);
        setApiAllStatus((prevState) => ({
          ...prevState,
          [key]: { ...data },
        }));
      }
    };
    update();
    setInterval(update, TIME_TO_UPDATE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <h1 className="viewTitle">Status page</h1>
      <button className="viewButton" onClick={changeViewHandler}>
        Change view
      </button>
      {view === 0 ? (
        <StatusBoxes status={apiAllStatus} />
      ) : (
        <Table status={apiAllStatus} />
      )}
    </div>
  );
}

export default App;
