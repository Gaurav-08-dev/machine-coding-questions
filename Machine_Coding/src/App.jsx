import './App.css'
import {BrowserRouter as Router, Routes,Route, useNavigate} from "react-router-dom"
import EMICalculator from "./Component/emi_calculator/EMICalculator"
import Home from './Home';
function App() {

  // const navigate = useNavigate();
  const routes = [{
    element:<Home/>,
    path:"/"    
  },{
    element:<EMICalculator/>,
    path:"/emi_calculator"
  }]

  return (
    <Router>
    <Routes>
      {
        routes.map(route => <Route key={route.path} path={route.path} element={route.element}/>)
      }
    </Routes>
    </Router>
  )
}

export default App
