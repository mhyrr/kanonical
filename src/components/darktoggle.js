import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components'
import Toggle from 'react-toggle';

const getTheme = () => {
  if (typeof window === 'undefined') {
    return;
  }
  return window.__theme;
}

const setPreferredTheme = (theme)  => {
  if (typeof window === 'undefined') {
    return;
  }
  window.__setPreferredTheme(theme);
}

const addThemeListener = (listener) => {
  if (typeof window === 'undefined' || !window.__themeListeners) {
    return;
  }
  window.__themeListeners.push(listener);
}

const removeThemeListener = (listener) =>  {
  if (typeof window === 'undefined' || !window.__themeListeners) {
    return;
  }
  window.__themeListeners = window.__themeListeners.filter(l => l !== listener);
}


const ICONS = {
  checked: <img src="/moon.svg" alt="dark mode" />,
  unchecked: <img src="/sun.svg" alt="light mode" />,
};

const DarkToggle = () => {

  const [checked, setChecked] = useState(getTheme() === 'dark');

  const onChange = useCallback(
    e => {
      if (typeof window === 'undefined') {
        // Never server-side render this, since we can't determine
        // the correct initial state until we get to the client.
        return null;
      }
       const isChecked = e.target.checked;
       setChecked(isChecked);
       window.__setPreferredTheme(isChecked ? 'dark' : 'light');
   },
   [setChecked]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      // Never server-side render this, since we can't determine
      // the correct initial state until we get to the client.
      return null;
    }
    const listener = () => {
      setChecked(getTheme() === 'dark');
    };
    addThemeListener(listener);

    return () => {
      removeThemeListener(listener);
    };
  }, [setChecked]);

  return <ToggleStyles><Toggle checked={checked} icons={ICONS} onChange={onChange} /></ToggleStyles>;
};

const ToggleStyles = styled.div`

  .react-toggle {
    touch-action: pan-x;

    display: inline-block;
    position: relative;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    padding: 0;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }

  .react-toggle-screenreader-only {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .react-toggle-track {
    position: relative;
    width: 50px;
    height: 24px;
    padding: 0;
    border-radius: 30px;
    background-color: var(--dark);
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  .react-toggle--checked .react-toggle-track {
    background-color: var(--secondary);
  }

  .react-toggle-track-check {
    position: absolute;
    width: 14px;
    height: 14px;
    top: 0px;
    bottom: 0px;
    margin-top: auto;
    margin-bottom: auto;
    line-height: 0;
    left: 8px;
    opacity: 0;
    -webkit-transition: opacity 0.25s ease;
    -moz-transition: opacity 0.25s ease;
    transition: opacity 0.25s ease;
  }

  .react-toggle--checked .react-toggle-track-check {
    opacity: 1;
  }

  .react-toggle-track-x {
    position: absolute;
    width: 15px;
    height: 15px;
    top: 0px;
    bottom: 0px;
    margin: auto 0;
    line-height: 0;
    right: 6px;
    opacity: 1;
    -webkit-transition: opacity 0.25s ease;
    -moz-transition: opacity 0.25s ease;
    transition: opacity 0.25s ease;
  }

  .react-toggle--checked .react-toggle-track-x {
    opacity: 0;
  }

  .react-toggle-thumb {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border: 1px solid var(--secondary);
    border-radius: 50%;
    background-color: var(--light);

    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    -webkit-transition: all 0.25s ease;
    -moz-transition: all 0.25s ease;
    transition: all 0.25s ease;

    -webkit-box-shadow: 0px 0px 3px 2px var(--secondary);
    -moz-box-shadow: 0px 0px 3px 2px var(--secondary);
    box-shadow: 0px 0px 2px 3px var(--secondary);
  }

  .react-toggle--checked .react-toggle-thumb {
    left: 27px;
    border-color: var(--color-primary);
  }

  img {
    border: 0;
    display: block;
    max-width: 100% !important;
  }
`

export default DarkToggle;
