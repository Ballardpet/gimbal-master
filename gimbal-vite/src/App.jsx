import { useState } from 'react'
import radarsvg from './assets/radar.svg'
import './App.css'

import Header from './components/Header'
import Footer from './components/Footer'
import Manual_control from './components/Manual_Control'
import GPS from './components/GPS'
import Az_el from './components/Az_el'
import Display from './components/Display'

function App() {

  // maybe put the flexbox around manual_control to Display
  return (
    <>
      <Header />
      <Manual_control />
      <Display />
      <Az_el />
      <GPS />
      <Footer />
      <section id="spacer"></section>
    </>
  )
}

export default App
