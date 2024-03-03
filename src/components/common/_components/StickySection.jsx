import { useEffect, useState } from "react";

function StickySection({ children }) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const footer = document.querySelector('.footer');
      if (!footer) return; 
      
      setIsSticky(scrollTop > 5);

    };


    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="sticky-section w-100">
      <div className={`sticky-bar ${isSticky ? "stick" : ""}`} style={{ bottom: `${isSticky && "0px"}` }}>
        {children}
      </div>
    </div>
  );
}

export default StickySection;
