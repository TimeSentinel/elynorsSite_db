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
import {useReducer} from "react";
import {Route, Routes} from 'react-router-dom';
import {Toaster} from "react-hot-toast";
// Classes and Functions
import {ctx} from './context';
import {Layout} from "./layout";
import {initialState, reducerFn} from "src/context/reducers/stateReducers.tsx";
import {useLocalStorage} from "src/context/reducers/localStateReducers.tsx";
import Home from "./pages/Home";
// import Menu from "./modules/Products/pages/Menu";
// import {ProductDetail} from "./modules/Products/pages/ProductDetail";
// import Cart from "./modules/Cart/pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductsMenu from "src/modules/Products/ProductsMenu.tsx";
import Cart from "./modules/Cart/pages/Cart";
import News from "./modules/News";
import ProductCard from "src/modules/Products/ProductCard";
// import News from "src/modules/News";
// import Gallery from "src/modules/Gallery";

function App() {
  const [state, dispatch] = useReducer(reducerFn, initialState);
  const [localState, localDispatch] = useLocalStorage("LocalStorage")

  return (
      <ctx.Provider value={{state, dispatch, localState, localDispatch}}>
        <div className="App">
          <Toaster reverseOrder={true}/>
          <Layout>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='menu' element={<ProductsMenu/>}/>
              <Route path='products/:productID' element={<ProductCard />}/>
              <Route path='about' element={<About/>}/>
              <Route path='gallery' element={<Home/>}/>
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