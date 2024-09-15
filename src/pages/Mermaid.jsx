import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Slider } from "@/components/ui/slider";
import { useTranslation } from 'react-i18next';

const Mermaid = ({ chart }) => {
  const mermaidRef = useRef(null);
  const [zoom, setZoom] = useState(100);
  const { t } = useTranslation();

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, []);

  useEffect(() => {
    if (chart) {
      mermaid.render('mermaid-diagram', chart).then((result) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = result.svg;
          applyZoom();
        }
      });
    }
  }, [chart, zoom]);

  const applyZoom = () => {
    if (mermaidRef.current) {
      mermaidRef.current.style.transform = `scale(${zoom / 100})`;
      mermaidRef.current.style.transformOrigin = 'top left';
    }
  };

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom[0]);
  };

  return (
    <div>
      <div className="mb-4 flex items-center space-x-4">
        <Slider
          value={[zoom]}
          onValueChange={handleZoomChange}
          min={50}
          max={200}
          step={10}
          className="w-64"
        />
        <span>{zoom}%</span>
      </div>
      <div className="overflow-auto border rounded-lg" style={{ maxHeight: '70vh', maxWidth: '100%' }}>
        <div ref={mermaidRef} className="mermaid inline-block min-w-full min-h-full"></div>
      </div>
    </div>
  );
};

export default Mermaid;
