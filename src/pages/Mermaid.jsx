import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Mermaid = ({ chart }) => {
  const mermaidRef = useRef(null);
  const [zoom, setZoom] = useState(1);
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
      mermaidRef.current.style.transform = `scale(${zoom})`;
      mermaidRef.current.style.transformOrigin = 'top left';
    }
  };

  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5));
  };

  return (
    <div>
      <div className="mb-4 flex justify-end space-x-2">
        <Button onClick={handleZoomIn} title={t('zoomIn')}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button onClick={handleZoomOut} title={t('zoomOut')}>
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>
      <div className="overflow-auto">
        <div ref={mermaidRef} className="mermaid inline-block"></div>
      </div>
    </div>
  );
};

export default Mermaid;
