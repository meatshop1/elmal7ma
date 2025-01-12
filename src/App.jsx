import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Main from "./components/Main"

function App() {
  return (
    <div className='font-mono grid place-items-center text-white h-svh text-3xl bg-slate-800'>
      <Navbar />
      <Main />
      <Footer />
    </div>
  )
}

export default App
