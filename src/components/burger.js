import React, { useContext } from "react"
import { BurgerStyles } from "../styles/navstyles"
import MenuContext from "./menucontext"

const Burger = () => {
  const [isOpen, setNav] = useContext(MenuContext)

  const toggleNav = () => {
    setNav(isOpen => !isOpen)
  }

  return (
    <BurgerStyles
      onClick={toggleNav}
      type="button"
      className={isOpen ? "open" : "closed"}
    >
      
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </BurgerStyles>
  )
}

export default Burger
