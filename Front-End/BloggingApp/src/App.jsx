import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom'
import './App.css'
import Register from './pages/register.jsx'
import HomePage from './pages/Home'
import LoginPage from './pages/login.jsx'
import BlogsPage from './pages/BlogsPage.jsx'
import CreationBlog from './pages/BlogeCreation.jsx'
import Post from './pages/Post.jsx'

function App() {


 
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/posts' element={<BlogsPage />} />
          <Route path='/creation' element={<CreationBlog />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </Router>


      
    
    </>
  )
}

export default App;
