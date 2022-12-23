import React, { useState, useEffect } from "react";
import axios from "axios";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const [elpData, setElpData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [dep, setDep] = useState();
  const [des, setDes] = useState();
  const [no, setNo] = useState();
  const [gen, setGen] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

//   useEffect(() => {
//     const fetchElpData = async () => {
//       const response = await axios(
//         "https://emst-b9ce9-default-rtdb.firebaseio.com/users.json"
//       );

//       if (response.statusText !== "OK") {
//         throw new Error("Something went wrong!");
//       }

//       const responseData = await response.data;

//       const loadedEmpData = [];

//       for (const key in responseData) {
//         loadedEmpData.push({
//           id: key,
//           name: responseData[key].name,
//           des: responseData[key].des,
//           dep: responseData[key].dep,
//           no: responseData[key].no,
//           email: responseData[key].email,
//           gen: responseData[key].gen,
//         });
//       }
//       console.log(elpData);
//       console.log(responseData);
//       console.log(loadedEmpData);
//       setElpData(loadedEmpData);
//       console.log(elpData);
//       setIsLoading(false);
//     };
//     fetchElpData().catch((error) => {
//       setIsLoading(false);
//       setHttpError(error.message);
//     });
//   }, []);

console.log('Context comp','------------------------')

  return (
    <Context.Provider value={[elpData, setElpData, name, setName,email, setEmail, no, setNo, des, setDes, dep, setDep,gen, setGen]}>
      {children}
    </Context.Provider>
  );
};
