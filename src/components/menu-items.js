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
    path: "/tumble",
    title: "tumble",
  },
  {
    path: "/books",
    title: "Books",
  },
  {
    path: "https://www.12inchesbehind.com",
    title: "Photos",
  },
  {
    path: "https://www.justadream.co",
    title: "Beach",
  },
  {
    path: "/about",
    title: "about",
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
