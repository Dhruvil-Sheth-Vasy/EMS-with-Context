import React, { useState, useEffect, useContext } from "react";
import Employee from "../../component/Employee";
import Navigation from "../Navbar/Navigation";
import { getCookie, deleteEmployee } from "../../Databse/Db";
import "./home.css";
// import Login from "../Login/Login";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Context } from "../../store/Context";

const Home = (props) => {

  console.log('home comp','------------------------')

  const [
    ,,
    name,
    setName,
    email,
    setEmail,
    no,
    setNo,
    des,
    setDes,
    dep,
    setDep,
    gen,
    setGen,
  ] = useContext(Context);

  const [elpData, setElpData] = useContext(Context)
  // const [elpData, setElpData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [reload, setReload] = useState(false);
  // const [isView, setIsView] = useState(true);
  // console.log(elpData)
  let a = getCookie("isAuthenticate");
  //
  

  // useEffect(()=> {
  //   setReload(true)
  // },[])

  const child = async (event) => {
    // console.log(event)
    // console.log(event.target.id)
    const dltEmployee = async (event) => {

      await deleteEmployee(event);

      // console.log("Home", "dlt succesful");
    };
   await dltEmployee(event)
    // console.log(reload);
    setReload((current) => !current);
    // console.log(reload);
  };
  // const b = getIDToken()
  // console.log(b)

  // const auth = currentUser().then((res) => {
  //   setIsView(res);
  //   console.log(res, "homeeeeeeeeee");
  // });

  // const authUser = () => {
  //   currentUser();
  // };

  // const viewStatus = (event) => {
  //   setIsView(true);
  // };

  useEffect(() => {
    const fetchElpData = async () => {
      console.log('home get data', '-------------')
      const response = await axios(
        "https://emst-b9ce9-default-rtdb.firebaseio.com/users.json"
      );

      if (response.statusText !== "OK") {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.data;

      const loadedEmpData = [];

      for (const key in responseData) {
        loadedEmpData.push({
          id: key,
          name: responseData[key].name,
          des: responseData[key].des,
          dep: responseData[key].dep,
          no: responseData[key].no,
          email: responseData[key].email,
          gen: responseData[key].gen,
        });
      }
      // console.log(elpData)
      // console.log(responseData);
      // console.log(loadedEmpData);
      setElpData(loadedEmpData);
      // console.log(elpData)
      setIsLoading(false);
    };
    fetchElpData().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [reload]);

  if (!a || a === "false") {
    return <Redirect to="/login"></Redirect>;
  }

  //   if (!isView) {
  //     console.log('no user')
  //     return(
  //     // <Login></Login>
  //     <Redirect to='/login'></Redirect>
  //     // <section className="EmpLoading">
  //     // <p>Loading...dhruvil</p>
  //   // </section>
  // );

  //    }

  if (isLoading) {
    return (
      <section className="EmpLoading">
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className="EmpError">
        <p>{httpError}</p>
      </section>
    );
  }

  const empList = elpData.map((emp) => (
    <Employee
      key={emp.id}
      id={emp.id}
      name={emp.name}
      email={emp.email}
      no={emp.no}
      des={emp.des}
      dep={emp.dep}
      gen={emp.gen}
      child={child}
    />
  ));

  // console.log(name,'gggggggg--------')
  // setName();
  // setEmail();
  // setNo();
  // setDep();
  // setDes();
  // setGen();
  // console.log('name changed......')
  // console.log(name )


  return (
    <div>
      <Navigation></Navigation>
      <div className="home-emp">{empList}</div>
    </div>
  );
};

export default Home;
