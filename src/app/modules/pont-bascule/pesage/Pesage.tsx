import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const camions = [
  "75843-A-1",
  "12934-B-2",
  "43920-C-3",
  "200505-D-4",
  "194903-E-5",
  "490521-F-6",
];

const Pesage: React.FC = () => {
  const [selectedMatricule, setSelectedMatricule] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState({
    matricule: "",
    pesee: "",
    navire: "",
    dum: "",
    commande: "",
    radio: "", // ❌ par défaut non sélectionné
    poids: "0.000",
    commentaire: "",
  });

  const handleSelectCamion = (matricule: string) => {
    setSelectedMatricule(matricule);

    // ✅ Auto-remplissage (sauf radioactivité et commentaire)
    setFormData({
      matricule,
      pesee: "2ème",
      navire: "NAV-" + matricule.slice(0, 3),
      dum: "DUM-" + Math.floor(Math.random() * 10000),
      commande: "CMD-" + Math.floor(Math.random() * 99999),
      radio: "", // pas de valeur par défaut
      poids: (Math.random() * 10 + 5).toFixed(3), // valeur simulée entre 5 et 15 tonnes
      commentaire: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Data saved:", formData);
    alert("Enregistré !");
  };

  return (
    <div className="container-fluid mt-4">
      <style>{`
        .poids-display {
          background-color: #000;
          color: #00cc66;
          font-size: 3.5rem;
          padding: 20px 40px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'Courier New', monospace;
        }
        .poids-display .unit {
          font-size: 1.2rem;
          margin-left: 8px;
          color: white;
        }
      `}</style>

      <div className="card shadow-sm border rounded-3 p-4">
        <div className="row">
          {/* 👉 Liste à gauche */}
          <div className="col-md-3 border-end pe-0">
            <h5 className="p-3 border-bottom">📋 Camions</h5>
            <ul className="list-group rounded-0">
              {camions.map((m) => (
                <li
                  key={m}
                  className={`list-group-item list-group-item-action ${
                    selectedMatricule === m ? "active" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelectCamion(m)}
                >
                  🚚 {m}
                </li>
              ))}
            </ul>
          </div>

          {/* 👉 Formulaire à droite */}
          <div className="col-md-9 px-5">
            {selectedMatricule ? (
              <>
                <h4 className="my-4 fw-semibold text-primary">
                  Fiche de pesée – {selectedMatricule}
                </h4>

                <div className="row mb-4">
                  <div className="col-md-4">
                    <Form.Label>Matricule</Form.Label>
                    <Form.Control value={formData.matricule} readOnly />
                  </div>
                  <div className="col-md-4">
                    <Form.Label>Pesée</Form.Label>
                    <Form.Control
                      value={formData.pesee}
                      onChange={(e) => handleChange("pesee", e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <Form.Label>Nom du navire</Form.Label>
                    <Form.Control
                      value={formData.navire}
                      onChange={(e) => handleChange("navire", e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-4">
                    <Form.Label>N° DUM</Form.Label>
                    <Form.Control
                      value={formData.dum}
                      onChange={(e) => handleChange("dum", e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <Form.Label>N° Commande</Form.Label>
                    <Form.Control
                      value={formData.commande}
                      onChange={(e) => handleChange("commande", e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <Form.Label>Radioactivité</Form.Label>
                    <div className="d-flex gap-3 mt-2">
                      <Form.Check
                        label="Positif"
                        name="radio"
                        type="radio"
                        id="positif"
                        checked={formData.radio === "positif"}
                        onChange={() => handleChange("radio", "positif")}
                      />
                      <Form.Check
                        label="Négatif"
                        name="radio"
                        type="radio"
                        id="negatif"
                        checked={formData.radio === "negatif"}
                        onChange={() => handleChange("radio", "negatif")}
                      />
                    </div>
                  </div>
                </div>

                {/* 🧾 Afficheur de poids */}
                <div className="text-center mb-4">
                  <div className="poids-display">
                    <span>{formData.poids}</span>
                    <span className="unit">t</span>
                  </div>
                </div>

                <Form.Group className="mb-4">
                  <Form.Label>Commentaire</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.commentaire}
                    onChange={(e) =>
                      handleChange("commentaire", e.target.value)
                    }
                  />
                </Form.Group>

                <div className="text-end">
                  <Button
                    onClick={handleSubmit}
                    variant="success"
                    className="px-4"
                  >
                    Enregistrer
                  </Button>
                </div>
              </>
            ) : (
              <div className="mt-5 text-muted text-center">
                Sélectionnez un matricule à gauche
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pesage;
