import React from "react";
import "./PartenairesSection.css";
import orangeLogo from "../images/orange.png";
import esuLogo from "../images/entete-esu.png";
import rawbankLogo from "../images/rawbank.png";
import esiLogo from "../images/esi.jpg";
import basykLogo from "../images/basyk.png";

const partenaires = [
  { src: orangeLogo, alt: "Orange" },
  { src: esuLogo, alt: "Entete ESU" },
  { src: rawbankLogo, alt: "Rawbank" },
  { src: esiLogo, alt: "ESI" },
  { src: basykLogo, alt: "Basyk" },
];

const PartenairesSection: React.FC = () => (
  <section className="partenaires-section">
    <h2>Nos partenaires</h2>
    <div className="partenaires-logos">
      {partenaires.map((p, idx) => (
        <img key={idx} src={p.src} alt={p.alt} className="partenaire-logo" />
      ))}
    </div>
  </section>
);

export default PartenairesSection; 