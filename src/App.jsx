import { useState, useEffect } from 'react'
import "./style.scss";


const cities = [
  {
    name: "cumana",
    type: "city",
    id: 1,
    localities: [
      { name: "cancamure", id: 12, type: "barrio" },
      { name: "andes eloy blanco", id: 14, type: "barrio" },
      { name: "la floresta", id: 11, type: "barrio" }
    ]
  },
  {
    name: "puerto la cruz",
    id: 2,
    type: "city",
    localities: [
      { name: "mollorca", id: 17, type: "barrio" },
      { name: "pozuelos", id: 20, type: "barrio" },
      { name: "chuparin", id: 22, type: "barrio" }
    ]
  }
]


function App() {

  const [tags, setTags] = useState(() => {
    return cities.map(item => {
      return { name: item.name, id: item.id, type: item.type }
    })
  }); // array de tags
  const [city, setCities] = useState(cities); // array de cuidades


  const addTag = (data) => {
    if (tags.some(item => item.name == data.name)) {
      const searchTag = tags.findIndex(item => item.name == data.name);
      return setTags(
        tags.filter((item, i) => i !== searchTag)
      );
    }
    setTags([...tags, data]);
  } // añadir un tag

  const quietTag = (data) => {

    if (data.type == "city") {
      const searchCity = city.findIndex(item => item.name == data.name);
      const deleteTags = tags.filter((item, i) => {
        return !city[searchCity].localities.some(loc => loc.name == item.name)
      }).filter(item => {
        return item.name !== data.name
      });
      setTags(deleteTags);
      setCities(
        city.filter((item, i) => i !== searchCity)
      );
    }
    else {
      const searchTag = tags.findIndex(item => item.name == data.name);
      setTags(
        tags.filter((item, i) => i !== searchTag)
      )
    }

  } // quitar un tag


  //peticion que se realiza cada vez que existe un cambio
  useEffect(() => {
    console.log("se ha realizado la peticion con los cambios correspondientes");
  }, [tags, city])

  return (
    <div className='app'>
      <div className='app-container'>
        {
          tags.length == 0 && city.length == 0 &&
          <div>
            no hay resultados
          </div>
        }
        {
          city.length > 0 &&
          <>
            <ul className='tags-container'>
              {
                tags.map(item => {
                  return <li onDoubleClick={() => quietTag(item)}>{item.name}</li>
                })
              }
            </ul>
            <div className='checkboxes-container'>
              {
                city.map((item, i) => {
                  return <div className='card-checkbox'>
                    <h2> barrios de {item.name}</h2>
                    <ul>
                      {
                        item.localities.map((loc, index) => {
                          return <label key={index}>
                            <input type="checkbox"
                              value={loc.name}
                              onChange={() => addTag(loc)}
                              checked={tags.some((item) => item.name == loc.name)}
                            />
                            {loc.name}
                          </label>
                        })
                      }
                    </ul>
                  </div>
                })
              }
            </div>
            <div className='input'>
              
            </div>
          </>

        }
      </div>
    </div>
  )
}

export default App
