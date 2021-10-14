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
        <Header target={target}></Header>
        <div className="global-wrapper" >
          <main className="main-body" ref={target}>{children}</main>

        </div>
        <Footer></Footer>
        <CookieConsent
          location="bottom"
          buttonText="Okay"
          cookieName="kanonicalCookie"
          expires={150}
          style={{
            background: "var(--black)",
            padding: "var(--spacing)",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
          buttonStyle={{
            padding: "1rem",
            color: "var(--black)",
            backgroundColor: "#fff",
            fontSize: "16px",
          }}
        >
          This website uses cookies to help improve your experience. By using
          this site you agree to the
          <Link to="/privacy" style={{ color: "#fff" }}>
            privacy statement
          </Link>
          .
        </CookieConsent>
      </motion.div>
    </div>
  )
}

export default Layout
