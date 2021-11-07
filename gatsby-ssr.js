import React from "react"
import { MenuProvider } from "./src/components/menucontext"
import { AnimatePresence } from "framer-motion"

export function wrapPageElement({ element }) {
  return <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
}

export function wrapRootElement({ element }) {
  return <MenuProvider>{element}</MenuProvider>
}

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  // Transition duration from layout.js * 1000 to get ms
  // * 2 for exit + enter animation
  const TRANSITION_DELAY = 0.3 * 1000 * 2

  // If it is a normal route
  if (location.action === "PUSH") {
    window.setTimeout(() => window.scrollTo(0, 0), TRANSITION_DELAY)
  }

  // If we used the browsers forward or back button
  else {
    const savedPosition = getSavedScrollPosition(location) || [0, 0]

    window.setTimeout(() => window.scrollTo(...savedPosition), TRANSITION_DELAY)
  }

  return false
}

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      dangerouslySetInnerHTML={{
        __html: `
  (function() {
    function setTheme(theme) {
      if (theme === 'dark') {
        document.documentElement.className = 'dark';
      } else {
        document.documentElement.className = '';
      }
      window.__theme = theme;
    };
    window.__setPreferredTheme = function(theme) {
      setTheme(theme);
      try {
        localStorage.setItem('preferred-theme', theme);
      } catch (e) {}
    };
    var preferredTheme;
    try {
      preferredTheme = localStorage.getItem('preferred-theme');
    } catch (e) {}
    window.__themeListeners = [];
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkQuery.addListener(function(e) {
      window.__setPreferredTheme(e.matches ? 'dark' : 'light');
      window.__themeListeners.forEach(function(listener) {
        listener();
      });
    });
    setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
  })();
  `
          .replace(/\n/g, ' ')
          .replace(/ {2}/g, ''),
      }}
    />,
  ]);
};
