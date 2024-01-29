function TableActivity ({ activities }) {
  return (
    <div className='overflow-x-auto'>
      <table className='table table-xs table-pin-rows table-pin-cols'>
        <thead>
          <tr className=''>
            <th>Nombre</th>
            <th>Duración</th>
            <th>Temporada</th>
            <th>Dificultad</th>
          </tr>
        </thead>
        <tbody className=''>
          {activities && activities?.map(activity => (
            <tr key={activity.name}>
              <td>{activity.name}</td>
              <td>{activity.duration + ' Min'}</td>
              <td>{activity.season}</td>
              <td>{activity.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableActivity
