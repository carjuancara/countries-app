import React from 'react'
const Attributions = [
  {
    id: 1,
    name: 'location.png',
    link: '<a href="https://www.flaticon.com/free-icons/world" title="world icons">World icons created by srip - Flaticon</a>'
  }
]

function Attribution () {
  return (
    <div>
      {Attributions.map(attrib => (
        <div key={attrib.id}>
          <p>{attrib.name}</p>
          {attrib.link}
        </div>
      ))}
    </div>
  )
}

export default Attribution
