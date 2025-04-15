import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface OuvertureProps {
  onGenerateShifts: (date: string, heure: string) => void;
}

const Ouverture: React.FC<OuvertureProps> = ({ onGenerateShifts }) => {
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("08:00");

  const handleClick = () => {
    if (date && heure) {
      onGenerateShifts(date, heure);
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h5 className="mb-3">Création de Shifts</h5>
      <div className="row">
        <div className="col-md-5">
          <Form.Label>Date d’ouverture</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="col-md-5">
          <Form.Label>Heure d’ouverture</Form.Label>
          <Form.Control
            type="time"
            value={heure}
            onChange={(e) => setHeure(e.target.value)}
          />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <Button className="w-100" onClick={handleClick}>
            Ouvrir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Ouverture;
