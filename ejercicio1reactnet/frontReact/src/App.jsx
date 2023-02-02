import Guardar from './Components/GuardarComponent/Guardar'
import List from './Components/ListComponent/List'



function App() {
  return (
  <div className='globalContainer'>
    <div className='section'>
    <List/>
    </div>
    <div className='section'>
    <Guardar/>
    </div>
  </div>
  )
}

export default App
