import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ItemList from './component/listItem'
import Menu from './container/menu'
import Home from './container/home'
import DetailFood from './container/detailFood';

export default function App() {
  return (
    <Router>
      <Routes >
        <Route path="/" Component={Home} />
        <Route path="/allMenu" Component={Menu} />
        <Route path="/detailFood" Component={DetailFood}/>
      </Routes>
    </Router>
  )
}