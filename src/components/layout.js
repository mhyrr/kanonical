import * as React from "react"
import { Link } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"
import GlobalStyles from '../styles/globalstyles'
import Typography from '../styles/typography'
import { motion } from 'framer-motion'
import CookieConsent from "react-cookie-consent"

const Layout = ({ location, title, children }) => {

  const target = React.createRef();
  const path = typeof location === 'undefined' ? "" : location.pathname

  return (
    <div>
      <GlobalStyles />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <Typography />
        <Header target={target} path={path}></Header>
        <div className="global-wrapper" >
          <main className={`${(path === '/' || path === '' || path === 'goals' || path === '/goals' || path === '/goals/') ? "main-index" : "main-body"}`} ref={target}>{children}</main>
        </div>
        <Footer></Footer>
      </motion.div>
    </div>
  )
}

export default Layout
