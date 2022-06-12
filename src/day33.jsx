import React, { useEffect, useState } from "react";

// const App = () => {
//   return  (
//     <>Hello World</>
//   )
// }
// export default App;

export default function App() {
  const text = "ini text";
  const number = 12345;
  const isnull = null;
  const ternary = true;
  const array = ["text 1", "text 2", "text 3"];
  const arrayOfObj = [
    {id: 1, name: "John"},
    {id: 2, name: "Mike"},
    {id: 3, name: "Tom"},
  ];
  const obj = {name: "John", job: "software engineer"};
  const [gelas, setGelas] = useState(1);
  const [textValue, setTextValue] = useState("");
  const [data, setData] = useState([]);
  useEffect( () => {
    // alert("welcome to dibimbing") //initial render, ketika page pertama direfresh
    // fetch API
    fetch('https://randomuser.me/api')
    .then(response => {
      return response.json()
    })
    .then(({results}) => setData(results))
  }, [])
  useEffect(() => {
    // alert("Berhasil ditambah")
  }, [gelas]); //aktif saat value kondisi berubah
  const Child = ({initext, ininumber, setChild}) => {
    const text2 = "hello from child";
    return(
      <>
      this is child, parent say {initext}, {ininumber}, {helloChild}
      <button onClick={() => setChild(text2)}>child kirim data</button>
      </>
    )
  }
  const [helloChild, setHelloChild] = useState("");

console.log(data);


  return (
    <div style={{margin:"25%"}}>

      <> Hello World </>
      <div> test </div>
      <>{text}</>
      <>{number}</>
      <>{isnull}</>
    <br/>
    {ternary ? "ini benar" : "ini salah"}
    <br/>
    <br/>
    List:
    {array.map((arr, idx) => (
      <div key = {idx}>{arr}</div>
    ))}
    <br/>
    List arrayOfObj:
    {arrayOfObj.map((arr, idx) => (
      <>
      <div key = {arr.id}>
        <div>{arr.id}</div>
        <div>{arr.name}</div>
      </div>
      </>
    ))}
    <br/>
    List Object
    {Object.keys(obj).map((key, idx) => (
      <div key = {idx}>
        {obj[key]}
      </div>
    ))}
    <br/>
    useState and useEffect
    <br/>
    gelas: {gelas}
    <br/>
    <button onClick={() => setGelas(prev => prev + 1)}> Tambah volume </button>
    <button onClick={() => setGelas(99)}> Auto 99 </button>
    <br/>
    {textValue}
    <br/>
    <input value={textValue} onChange={(e) => setTextValue(e.target.value)}/>
    <br/>
    <br/>
    {data[0]?.email}
    <br/>
    <br/>
    <Child initext = {text} ininumber = {number} setChild = {setHelloChild}/>

    </div>
  );
}