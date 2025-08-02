import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const FormationReservationForm: React.FC = () => {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await addDoc(collection(db, "inscriptionsFormations"), form);
      setSuccess(true);
      setForm({ nom: "", prenom: "", telephone: "", email: "" });
    } catch (err) {
      setError("Erreur lors de l'enregistrement. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Inscription à la formation</h2>
      <div>
        <label>Nom :</label>
        <input
          type="text"
          name="nom"
          value={form.nom}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Prénom :</label>
        <input
          type="text"
          name="prenom"
          value={form.prenom}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Téléphone :</label>
        <input
          type="tel"
          name="telephone"
          value={form.telephone}
          onChange={handleChange}
          required
          placeholder="+243..."
        />
      </div>
      <div>
        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">S'inscrire</button>
      {success && <p style={{ color: "green" }}>Inscription réussie !</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default FormationReservationForm; 