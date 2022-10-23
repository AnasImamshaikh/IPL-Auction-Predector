
import { useState,useRef } from "react";
import './App.css';
import FormInput from "./components/FormInput.js";


const App = () => {

  const [values, setValues] = useState({});
  const [result,setResult] = useState("");  
  const output = useRef();
  const op = useRef();
  const button = useRef();

  const inputs = [
    {
      id: 1,
      name: "Match",
      type: "text",
      placeholder: "No of Matches PLayed",
      errorMessage:
        "Only Numbers are allowed",
      label: "Match",
      required: true,
    },
    {
      id: 2,
      name: "Batsman Runs",
      type: "text",
      placeholder: "Total Runs Scored by Batsman",
      errorMessage:
        "Only Numbers are allowed",
      label: "Batsman Runs",
      required: true,
    },
    {
      id: 3,
      name: "Batsman Average",
      type: "text",
      placeholder: "Batting Average of Batsman",
      errorMessage:
        "Only Numbers are allowed",
      label: "Batsman Average",
      required: true,
    },
    {
      id: 4,
      name: "Batsman StrikeRate",
      type: "text",
      placeholder: "Batsman Strike Rate",
      errorMessage:
        "Only Numbers are allowed",
      label: "Batsman StrikeRate",
      required: true,
    },
    {
      id: 5,
      name: "Wickets",
      type: "text",
      placeholder: "No of wickets taken",
      errorMessage:
        "Only Numbers are allowed",
      label: "Wickets",
      required: true,
    },
    {
      id: 6,
      name: "Economy",
      type: "text",
      placeholder: "Economy",
      errorMessage:
        "Only Numbers are allowed",
      label: "Economy",
      required: true,
    },
    {
      id: 7,
      name: "5W Haul",
      type: "text",
      placeholder: "5W Haul",
      errorMessage:
        "Only Numbers are allowed",
      label: "5W Haul",
      required: true,
    },
  ]

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Values: ",values);
      
      fetch("http://127.0.0.1:5000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        output.current.style.display = "block";
        setResult(data);
        op.current.style.display = "none";
        button.current.style.display = "block";
      })
      .catch((err) => {
        console.log("Error: ",err);
      });

    };
  
    const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
    
    // auctionPlayer[['M','batRuns','batAvg','batSR','Wkts','Econ','5W','SoldOrNot']]

    return (
      <div className="app">
        <form ref={op} onSubmit={handleSubmit}>
          <h1>Enter Player Details</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button>Predict</button>
        </form>

        <h2 ref={output} style={{display:"none",textAlign:"center"}}>Results: {result}% Chances of being Sold in the Auction</h2>
        <button ref={button} 
        style={{display:"none",width:"100px",height:"50px",marginLeft:"45%",marginTop:"20px"}}
        onClick={(e)=>{
          output.current.style.display = "none";
          button.current.style.display = "none";
          op.current.style.display = "block";
        }}>
          Back
        </button>
      </div>
    );
  };


export default App;
