import './App.css'
import Quiz from './components/Quiz'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
      <Quiz />
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar={true} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    </>
  )
}

export default App
