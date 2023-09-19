import React from "react"
import { DiGithubBadge } from "react-icons/di"
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa"

export const mainMenuItems = [
  {
    path: "/blog",
    title: "Blog",
  },
  {
    path: "/essays",
    title: "Essays",
  },
  {
    path: "/goals",
    title: "Goals",
  },
  {
    path: "/tumble",
    title: "tumble",
  },
  {
    path: "/books",
    title: "Books",
  },
  {
    path: "/about",
    title: "Contact",
  },
]

export const socialMenuItems = [

  {
    icon: <FaTwitter />,
  url: "https://www.twitter.com/mhyrr",
    name: "Twitter",
  },
  {
    icon: <DiGithubBadge />,
    url: "https://github.com/mhyrr",
    name: "GitHub",
  },
  {
    icon: <FaInstagram />,
    url: "https://www.instagram.com/mhyrr",
    name: "Insta",
  },
]

export const footerMenuItems = [
  {
    path: "/privacy",
    title: "privacy",
  },
  {
    path: "/cookies",
    title: "cookies",
  },
]
