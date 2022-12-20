import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main'
import { About } from './components/About'
import { Login } from './components/Login'
import { MyPage } from './components/MyPage'
import { Task } from './components/Task'
import { UserPage } from './components/UserPage'




function App() {
  return (
      <Router>
        <Header />
          <Routes>
              <Route path = '' element={<Main />}></Route>
              <Route path = '/about' element={<About />}></Route>
              <Route path = '/login' element={<Login />}></Route>
              <Route path = '/mypage' element={<MyPage />}></Route>
              <Route path='/task/:id' element={<Task />}></Route>
              <Route path='/userpage/:id' element={<UserPage />}></Route>

          </Routes>
          <aside className='main-aside'></aside>
        <Footer />
      </Router>
  );
}

export default App;
