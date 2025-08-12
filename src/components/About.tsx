import React from 'react';
import './About.css';
// Image pour l'histoire du couple avec Data URI
const storyImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNENDRENDIiBvcGFjaXR5PSIwLjgiLz4KICA8dGV4dCB4PSI1MCUiIHk9IjQ1JSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPkFib3V0PC90ZXh0PgogIDx0ZXh0IHg9IjUwJSIgeT0iNjUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBvcGFjaXR5PSIwLjkiPk91ciBIaXN0b2lyZTwvdGV4dD4KPC9zdmc+Cg==';

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
                             <div className="single-image-container">
                 <img 
                   src={storyImage} 
                   alt="Joel & Eunice - Notre Histoire" 
                   className="story-image"
                   loading="lazy"
                   decoding="async"
                 />
               </div>
            </div>
          </div>
          
          {/* Section Nos moments préférés */}
          <div className="favorite-moments">
            <div className="moments-header">
              <h3>Nos Moments Préférés</h3>
            </div>
            <div className="moments-content">
              <p>
                Entre les soirées cinéma, les moments de partage, les découvertes, les expériences et les moments précieux en famille nous savourons chaque instant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 