import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import HeroSec from './components/heroSec.jsx'
import VisualsPage from './components/visualsPage.jsx'
import './index.css'
import App from './App.jsx'
import VolcanoPage from './components/3dComponents/Volcano/volcanoPage.jsx'
import EarthPage from './components/3dComponents/EarthQuake/EarthPage.jsx'
import AuroraPage from './components/3dComponents/Aurora/AuroraPage.jsx'
import EclipsePage from './components/3dComponents/SolarEclipse/SolarEclipsePage.jsx'
import PerspectivePage from './components/3dComponents/SolarEclipse/PerspectivePage.jsx'
const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children:[
      {
        element:<HeroSec/>,
        path:"/",
        index:true
      },
      {
        element:<VisualsPage/>,
        path:"/visuals",
      },
      {
        element:<VolcanoPage/>,
        path:"/volcano",
      },
      {
        element:<EarthPage/>,
        path:"/earth",
      },
      {
        element:<AuroraPage/>,
        path:"/aurora",
      },
       {
        element:<EclipsePage/>,
        path:"/solar-eclipse",
      },
       {
        element:<PerspectivePage/>,
        path:"/earth-perspective",
      }



    ]
  },
  
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
