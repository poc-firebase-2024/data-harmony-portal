import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const Mermaid = ({ chart }) => {
  const mermaidRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, []);

  useEffect(() => {
    if (chart) {
      mermaid.render('mermaid-diagram', chart).then((result) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = result.svg;
        }
      });
    }
  }, [chart]);

  return <div ref={mermaidRef} className="mermaid"></div>;
};

export default Mermaid;