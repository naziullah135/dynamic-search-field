import { Fragment, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [fields, setFields] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v2/all").then(res => res.json()).then(data => {
      setCountries(data)
    })
  }, [])

  const addFieldHandler = (e) => {
    if (e.key === "ArrowDown" && e.target.value !== "") {
      e.preventDefault();
      const newField = <Fragment>
        <input list={"country-list" + fields.length + 1} defaultValue={e.target.value} />
        <datalist id={"country-list" + fields.length + 1}>
          {
            countries?.map(({ name }) => <option key={name} value={name} />)
          }
        </datalist>
        <br /> <br />
      </Fragment>
      e.target.value = ""
      setFields(pre => [...pre, newField])
    }
  }



  return (
    <div className="App">
      <label>Choose country: <br /> <br /></label>
      {
        fields.length > 0 && fields.map((field, i) => <Fragment key={i}>{field}</Fragment>)
      }

      <input onKeyDown={addFieldHandler} list={"country-list"} />
      <datalist id={"country-list"}>
        {
          countries?.map(({ name }) => <option key={name} value={name} />)
        }
      </datalist>

    </div>
  );
}

export default App;
