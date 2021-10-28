import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PageTemplate = ({ pageContext: { page } }) => {
  return (
    <>
      <Seo title={page.name} description={page.title} />
      <Layout>
        <div className="page-standard">
          <h1>{page.title}</h1>
          <p>{page.content}</p>
        </div>
      </Layout>
    </>
  )
}

export default PageTemplate
