import React, { useEffect, useRef } from "react";

const App = () => {
  const iframeRef = useRef();

  useEffect(() => {
    const preventNewTabs = () => {
      const iframe = iframeRef.current;

      if (iframe) {
        iframe.contentWindow.document.addEventListener("click", (event) => {
          const target = event.target.closest("a");
          if (target) {
            event.preventDefault(); // Prevent default click behavior
            target.setAttribute("target", "_self"); // Make links open in the same iframe
            window.location.href = target.href; // Optionally redirect in the iframe
          }
        });
      }
    };

    // Wait for iframe content to load before attaching event listeners
    const handleLoad = () => {
      try {
        preventNewTabs();
      } catch (error) {
        console.error("Error accessing iframe's content:", error);
      }
    };

    const iframe = iframeRef.current;
    iframe.addEventListener("load", handleLoad);

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleLoad);
      }
    };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
      <iframe
        ref={iframeRef}
        src="https://crichd.vip"
        title="CricHD"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      ></iframe>
    </div>
  );
};

export default App;
