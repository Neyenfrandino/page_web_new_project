import React, { useState, useEffect, useRef, useContext } from 'react';
import { ContextJsonLoadContext } from '../../context/context_json_load/context_json_load';
import './time_line_history.scss';
 
const TimeLineHistory = ({ index }) => {
  const { time_line_history } = useContext(ContextJsonLoadContext);
  const [activeChapter, setActiveChapter] = useState(0);
  const [moreInfo, setMoreInfo] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const chapterRefs = useRef([]);

  const chapters = time_line_history[index]?.items|| [];
  
  if(!chapters) return null;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      // Check which chapters are visible
      chapterRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
          
          if (isInView) {
            setIsVisible(prev => ({ ...prev, [index]: true }));
            if (rect.top < window.innerHeight * 0.5 && rect.top > -rect.height * 0.5) {
              setActiveChapter(index);
            }
          }
        }
      });
    };
    

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about-naluum">
      
      <section className="hero-section">
        <div className="hero-background">
          <div className="particle particle-1">✧</div>
          <div className="particle particle-2">✧</div>
          <div className="particle particle-3">✧</div>
          <div className="particle particle-4">✧</div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">Movimiento</span>
            <span className="title-highlight">Naluum</span>
          </h1>
          <p className="hero-subtitle">
            Una historia de regeneración planetaria que comenzó con un descubrimiento 
            y se convirtió en la esperanza de millones
          </p>
        </div>

        <div className="scroll-indicator">
            <span>Descubre nuestra historia</span>
            <div className="arrow-down">↓</div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="timeline-line" />
        
        {chapters.slice(0, moreInfo ? chapters.length : 3).map((chapter, index) => (
          <div
            key={chapter.id}
            ref={el => chapterRefs.current[index] = el}
            className={`chapter ${isVisible[index] ? 'visible' : ''} ${index % 2 === 0 ? 'left' : 'right'}`}
          >
              <div className="chapter-content">
                <div className='chapter-content-icon-year'>
                    <div className="chapter-year">{chapter.year}</div>
                    <div className="chapter-icon">{chapter.image}</div>
                </div>

                <h2 className="chapter-title">{chapter.title}</h2>
                <p className="chapter-text">{chapter.content}</p>
                <div className="chapter-highlight">
                    <span className="highlight-icon">⚡</span>
                    {chapter.highlight}
                </div>
              </div>
            <div className="chapter-marker">
              <div className={`marker-dot ${activeChapter === index ? 'active' : ''}`} />
            </div>
          </div>

        ))}
      
        <div className='timeline-buttons'>
          <button className="more-info" disabled={moreInfo} onClick={() => setMoreInfo(!moreInfo)}>
            mas info
          </button>
        </div>
      </section>

    </div>
  );
};

export default TimeLineHistory;