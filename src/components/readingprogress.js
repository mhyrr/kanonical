import styled from 'styled-components'
import React, { useEffect, useState } from "react"

const Progress = styled.div`

  position: sticky;
  height: 5px;
  top: 0;
  background-color: var(--primary);
  opacity: 0.6;
  background: repeating-linear-gradient( 45deg, var(--primary), var(--primary) 12px, var(--secondary) 5px, var(--secondary) 25px );

  `;

const ReadingProgress = ({ target }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const scrollListener = () => {

    // Only do blog posts - this feels like a kludge
    if (target.target.current == null) { return; }
    if (target.target.current.firstChild.id != "reading") {
      return;
    }

    const element         = target.target.current;
    const totalHeight     = element.clientHeight - element.offsetTop - (window.innerHeight);
    const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (windowScrollTop === 0) {
      return setReadingProgress(0);
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100);
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  });


  return <Progress style={{width: `${readingProgress}%`}} />;
};

export default ReadingProgress;
