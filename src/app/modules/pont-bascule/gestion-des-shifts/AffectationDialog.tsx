import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Conducteur {
  nom: string;
  prenom: string;
  cin: string;
}

export interface AffectationData {
  matricule: string;
  conducteur: Conducteur;
  motif: string;
  heureAffectation: string;
}

interface AffectationDialogProps {
  show: boolean;
  onClose: () => void;
  onSave: (data: AffectationData) => void;
  onDelete: (index: number) => void;
  shiftLabel: string;
  camions: string[];
  conducteurs: Conducteur[];
  motifsRetard: string[];
  affectations: AffectationData[];
}

const AffectationDialog: React.FC<AffectationDialogProps> = ({
  show,
  onClose,
  onSave,
  onDelete,
  shiftLabel,
  camions,
  conducteurs,
  motifsRetard,
  affectations,
}) => {
  const [matricule, setMatricule] = useState("");
  const [conducteurCin, setConducteurCin] = useState("");
  const [motif, setMotif] = useState("");

  const handleSave = () => {
    const conducteur = conducteurs.find((c) => c.cin === conducteurCin);
    if (!matricule || !conducteur || !motif) return;

    const now = new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    onSave({
      matricule,
      conducteur,
      motif,
      heureAffectation: now,
    });

    setMatricule("");
    setConducteurCin("");
    setMotif("");
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Shift du {shiftLabel}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Matricule du camion</Form.Label>
          <Form.Select
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
          >
            <option value="">-- Sélectionner --</option>
            {camions.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Conducteur</Form.Label>
          <Form.Select
            value={conducteurCin}
            onChange={(e) => setConducteurCin(e.target.value)}
          >
            <option value="">-- Sélectionner --</option>
            {conducteurs.map((c) => (
              <option key={c.cin} value={c.cin}>
                {c.nom} {c.prenom} ({c.cin})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Motif de retard</Form.Label>
          <Form.Select value={motif} onChange={(e) => setMotif(e.target.value)}>
            <option value="">-- Sélectionner --</option>
            {motifsRetard.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* ✅ Tableau des affectations pour ce shift */}
        {affectations.length > 0 && (
          <div className="mt-4">
            <h6>Affectations enregistrées</h6>
            <table className="table table-sm table-bordered">
              <thead>
                <tr>
                  <th>Matricule</th>
                  <th>Conducteur</th>
                  <th>Heure Affectation</th>
                  <th>Motif</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {affectations.map((a, index) => (
                  <tr key={index}>
                    <td>{a.matricule}</td>
                    <td>
                      {a.conducteur.nom} {a.conducteur.prenom} (
                      {a.conducteur.cin})
                    </td>
                    <td>{a.heureAffectation}</td>
                    <td>{a.motif}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onDelete(index)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fermer
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AffectationDialog;
