/* APP.TSX
################################### Restaurant Functional Module ###################################
/src/App.tsx    ::: primary application container
REQ: Vite-React.js+TypeScript, react-router-dom, react-hot-toast,
(c)2025 Lance Stubblefield
####################################################################################################
*/

// Style Sheets
import './App.css';
// Application Elements
import {Route, Routes} from 'react-router-dom';
import {Toaster} from "react-hot-toast";
// Classes and Functions
import {ctx} from './context';
import {Layout} from "./layout";
import {useLocalStorage} from "src/context/reducers/localStateReducers.tsx";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductsMenu from "src/modules/Products/ProductsMenu.tsx";
import Cart from "./modules/Cart/pages/Cart";
import News from "./modules/News";
import ProductCard from "src/modules/Products/ProductCard";
import Gallery from "src/modules/Gallery";
import {initialState, reducerFn} from "src/context/reducers/stateReducers.tsx";
import {useReducer} from "react";

function App() {
  const [state, dispatch] = useReducer(reducerFn, initialState);
  const [localState, localDispatch] = useLocalStorage("LocalStorage")

  return (
      <ctx.Provider value={{ localState, localDispatch, state, dispatch }}>
        <div className="App">
          <Toaster reverseOrder={true}/>
          <Layout>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='menu' element={<ProductsMenu/>}/>
              <Route path='product/:productID' element={<ProductCard />}/>
              <Route path='about' element={<About/>}/>
              <Route path='gallery' element={<Gallery/>}/>
              <Route path='news' element={<News/>}/>
              <Route path='contact' element={<Contact />}/>
              <Route path='cart' element={<Cart />}/>
            </Routes>
          </Layout>
        </div>
      </ctx.Provider>
  )
}

export default App