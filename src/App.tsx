import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import ItemList from './component/listItem'
import Menu from './container/menu'
import Home from './container/home'
import DetailFood from './container/detailFood';
import Order from './container/order';
import CardButton from './component/cartButton';

export default function App() {
  return (
    <Router>
      <Link to='/order'>
        <CardButton />
      </Link>
      <Routes >
        <Route path="/" Component={Home} />
        <Route path="/allMenu" Component={Menu} />
        <Route path="/detailFood" Component={DetailFood} />
        <Route path="/order" Component={Order} />
      </Routes>
    </Router>
  )
}