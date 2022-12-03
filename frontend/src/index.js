import ReactDom from 'react-dom/client'
import App from './App'
import './index.css'
import 'tachyons'

const root = ReactDom.createRoot(document.getElementById('root'))

root.render(<App />)
