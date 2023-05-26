import React, { useState } from "react";

const Child = ({ data, setData, index }) => {
  const handleChangeInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = { ...updatedData[index], [name]: value };
      return updatedData;
    });
  };

  console.log(data);

  return (
    <div>
      <label htmlFor="nom">Nom:</label>
      <input
        placeholder="nom"
        type="text"
        value={data.nom}
        onChange={handleChangeInput}
        name="nom"
      />
      <label htmlFor="prenom">Prénom:</label>
      <input
        placeholder="prenom"
        type="text"
        value={data.prenom}
        onChange={handleChangeInput}
        name="prenom"
      />
    </div>
  );
};

const datas = [
  { nom: "", prenom: "" },
  { nom: "", prenom: "" },
  { nom: "", prenom: "" },
  { nom: "", prenom: "" },
];

const Test = () => {
  const [data, setData] = useState(datas);

  setTimeout(() => {
    alert(JSON.stringify(data));
  }, 4000);

  return (
    <React.Fragment>
      <Child data={data[0]} index={0} setData={setData} />
      <Child data={data[1]} index={1} setData={setData} />
      <Child data={data[2]} index={2} setData={setData} />
      <Child data={data[3]} index={3} setData={setData} />
    </React.Fragment>
  );
};
export default Test;
