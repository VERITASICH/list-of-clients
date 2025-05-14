import AddForm from './components/AddForm';
import Main from './components/Main';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
    <BrowserRouter>
      <div className=''>
        <NavBar/>

        <Routes>
          <Route
            path='/list-of-clients/'
            element={<Main/>

            }
          />
          <Route
            path='/addform'
            element={<AddForm/>

            }
          />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
