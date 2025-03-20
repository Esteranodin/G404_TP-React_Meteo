import '../styles/App.css'
import Header from './Header'
import Card from './Card'
import { ErrorProvider } from '../contexts/ErrorContext'

function App() {
  return (
    <ErrorProvider>
      <div className='App'>
        <Header />
        <Card />
      </div>
    </ErrorProvider>
  )
}

export default App
