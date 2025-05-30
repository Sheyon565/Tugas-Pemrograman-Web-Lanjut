import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './charts/ChartjsConfig';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Layout from './partials/Layout';
import ArticleList from './pages/ArticleList';
import ArticleCreate from './pages/ArticleCreate';
import ArticleEdit from './pages/ArticleEdit';
import ArticleCategory from './pages/ArticleCategory';
import CategoryCreate from './pages/CategoryCreate';
import CategoryEdit from './pages/CategoryEdit';
import './index.css'

function App() {
  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute>
          <Layout />
        </ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/articles" element={<ArticleList />} />
          <Route path="/dashboard/articles/create" element={<ArticleCreate />} />
          <Route path="/dashboard/articles/:id/edit" element={<ArticleEdit />} />
          <Route path="/dashboard/category/" element={<ArticleCategory />} />
          <Route path="/dashboard/category/create" element={<CategoryCreate />} />
          <Route path="/dashboard/category/:id/edit" element={<CategoryEdit />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
