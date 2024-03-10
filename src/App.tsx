import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import ItemList from './component/listItem'
import Menu from './container/menu'
import Home from './container/home'
import DetailFood from './container/detailFood';
import Order from './container/order';
import CardButton from './component/cartButton';
import EnterCode from './container/enterCode';
import { firestore } from './firebase';
import { useEffect, useState } from 'react';
import AddFood from './container/addFood';
import AllOrder from './container/allOrder';

export default function App() {
  interface DataItem {
    active: boolean;
    id: string;
  }
  const [fullAccess, setFullAccess] = useState(false)
  useEffect(() => {
    firestore.get('adminCode').then(data => {
      if (data.some((item: DataItem) => item.id === localStorage.getItem('code'))) {
        setFullAccess(true)
      }
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [])


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
        <Route path="/enterCodeAccess" Component={EnterCode} />

        {fullAccess && (
          <>
            <Route path="/addFood" Component={AddFood} />
            <Route path="/managerOrder" Component={AllOrder} />
          </>
        )}


      </Routes>
      <div id='notifyContainer' className='fixed top-10 right-2'></div>
    </Router>
  )
}