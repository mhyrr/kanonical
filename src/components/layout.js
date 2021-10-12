import * as React from "react"
import { Link } from "gatsby"
import Header from "../components/header"
import GlobalStyles from '../styles/globalstyles'
import Typography from '../styles/typography'
import { motion } from 'framer-motion'


const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  console.log(location)
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div>
      <GlobalStyles />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <Typography />
        <Header></Header>
        <div className="global-wrapper" data-is-root-path={isRootPath}>
          <main className="main-body">{children}</main>

        </div>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </motion.div>
    </div>
  )
}

export default Layout
