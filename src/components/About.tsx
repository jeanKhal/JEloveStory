import React from 'react';
import './About.css';
import slideImage1 from '../assets/_MT_0194.jpeg';
import slideImage2 from '../assets/_MT_0204.jpeg';
import slideImage3 from '../assets/_MT_0221.jpeg';

const About: React.FC = () => {

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2>Notre Histoire</h2>
          <p>Une belle aventure qui commence</p>
        </div>
        
        <div className="about-content">
          <div className="about-story">
            <div className="story-text">
              <p>
                Notre histoire a commencé de la manière la plus inattendue… lors d'un anniversaire. Nous ne savions pas encore que ce moment allait changer nos vies.
              </p>
              
              <p>
                Ce jour-là, entourés d'amis, nous nous sommes croisés pour la première fois sans savoir que leurs intention étaient de nous présenter l'un l'autre. Joël s'est alors proposé de me raccompagner chez moi, septique mais avec un humour spontané, je j'ai lancé :
              </p>
              
              <p className="quote">
                « Promets-moi juste de ne pas me kidnapper. »
              </p>
              
              <p>
                Un éclat de rire. Un regard complice. Et sans que nous le sachions, c'était le début de quelque chose de précieux.
              </p>
              
              <p>
                De cette rencontre est née une amitié profonde, sincère. Nous sommes rapidement devenu confidents, meilleurs amis, nous soutenons l'un l'autre.
                Ensemble, nous avons partagé des discussions sans fin, des rires, des moments simples et vrais.
                Puis, tout naturellement, cette amitié s'est transformée en amour.
              </p>
              
              <p>
                Aujourd'hui, après avoir construit pas à pas une relation solide et joyeuse, nous sommes sur le point de nous dire oui — un pas de plus dans cette belle aventure commencée presque par hasard… mais mis en place par le metteur en scène par excellence DIEU.
              </p>
            </div>
            
            <div className="story-gallery">
              <div className="gallery-grid">
                <div className="gallery-item">
                  <img src={slideImage1} alt="Joel & Eunice - Moment romantique" />
                </div>
                <div className="gallery-item">
                  <img src={slideImage2} alt="Joel & Eunice - Portrait élégant" />
                </div>
                <div className="gallery-item">
                  <img src={slideImage3} alt="Joel & Eunice - Cérémonie" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 