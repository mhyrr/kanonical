import React, { useState } from "react"
import styled from "styled-components"

const Page = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color};
`

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 2rem;
  cursor: pointer;
`

const Cardinals = () => {
  const [color, setColor] = useState("#ffffff")

  const changeColor = () => {
    const newColor = `#${Math.floor(Math.random()*16777215).toString(16)}`
    setColor(newColor)
  }

  return (
    <Page color={color}>
      <Button onClick={changeColor}>Hi Cardinals</Button>
    </Page>
  )
}

export default Cardinals