import React from "react";
import { Modal, Button } from "react-bootstrap";

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

interface ConsulterFlotteDialogProps {
  show: boolean;
  onClose: () => void;
  shiftLabel: string;
  affectations: AffectationData[];
}

const ConsulterFlotteDialog: React.FC<ConsulterFlotteDialogProps> = ({
  show,
  onClose,
  shiftLabel,
  affectations,
}) => {
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Flotte affectée – Shift du {shiftLabel}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {affectations.length === 0 ? (
          <p className="text-muted">
            Aucune affectation enregistrée pour ce shift.
          </p>
        ) : (
          <table className="table table-sm table-bordered">
            <thead>
              <tr>
                <th>Matricule</th>
                <th>Conducteur</th>
                <th>Heure d'affectation</th>
                <th>Motif</th>
              </tr>
            </thead>
            <tbody>
              {affectations.map((a, i) => (
                <tr key={i}>
                  <td>{a.matricule}</td>
                  <td>
                    {a.conducteur.nom} {a.conducteur.prenom} ({a.conducteur.cin}
                    )
                  </td>
                  <td>{a.heureAffectation}</td>
                  <td>{a.motif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConsulterFlotteDialog;
