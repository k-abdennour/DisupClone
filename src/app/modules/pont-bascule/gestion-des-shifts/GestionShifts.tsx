import React, { useState } from "react";
import Ouverture from "./__partials/Ouverture";
import DataTableShifts from "./__partials/DataTableShifts";
import AffectationDialog from "./AffectationDialog";
import ConsulterFlotteDialog from "./ConsulterFlotteDialog";

interface Shift {
  id: number;
  date: string;
  heureOuverture: string;
  heureFermeture: string;
}
interface AffectationData {
  matricule: string;
  conducteur: {
    nom: string;
    prenom: string;
    cin: string;
  };
  motif: string;
  heureAffectation: string;
}

const GestionShifts: React.FC = () => {
  const [shiftsByDate, setShiftsByDate] = useState<{ [date: string]: Shift[] }>(
    {}
  );
  const [affectationsByShift, setAffectationsByShift] = useState<{
    [label: string]: AffectationData[];
  }>({});
  const [showConsultDialog, setShowConsultDialog] = useState(false);
  const [consultedShiftLabel, setConsultedShiftLabel] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedShiftLabel, setSelectedShiftLabel] = useState("");
  const camions = ["75843-A", "12934-B", "43920-C"];
  const conducteurs = [
    { nom: "El Fassi", prenom: "Ahmed", cin: "AA123456" },
    { nom: "Bennani", prenom: "Sara", cin: "BB654321" },
  ];
  const motifsRetard = ["Trafic", "Panne mécanique", "Autre"];
  const handleConsulter = (id: number) => {
    const shift = Object.values(shiftsByDate)
      .flat()
      .find((s) => s.id === id);

    if (shift) {
      const label = `${shift.date} ${shift.heureOuverture}`;
      setConsultedShiftLabel(label);
      setShowConsultDialog(true);
    }
  };
  const generateShifts = (date: string, heure: string) => {
    const alreadyExists = shiftsByDate[date];
    if (alreadyExists) {
      alert("Shifts pour cette date existent déjà !");
      return;
    }

    const shifts = [
      { id: 1, date, heureOuverture: "08:00", heureFermeture: "16:00" },
      { id: 2, date, heureOuverture: "16:00", heureFermeture: "00:00" },
      { id: 3, date, heureOuverture: "00:00", heureFermeture: "08:00" },
    ];

    setShiftsByDate((prev) => ({
      ...prev,
      [date]: shifts,
    }));
  };
  const handleSaveAffectation = (data: AffectationData) => {
    setAffectationsByShift((prev) => ({
      ...prev,
      [selectedShiftLabel]: [...(prev[selectedShiftLabel] || []), data],
    }));
  };

  const handleDeleteAffectation = (index: number) => {
    setAffectationsByShift((prev) => {
      const updated = [...(prev[selectedShiftLabel] || [])];
      updated.splice(index, 1);
      return { ...prev, [selectedShiftLabel]: updated };
    });
  };

  const handleAffecter = (id: number) => {
    const shift = Object.values(shiftsByDate)
      .flat()
      .find((s) => s.id === id);

    if (shift) {
      const label = `${shift.date} ${shift.heureOuverture}`;
      setSelectedShiftLabel(label);
      setShowDialog(true);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4">Gestion des Shifts</h2>

      {/* Sélecteur Date + Heure */}
      <Ouverture onGenerateShifts={generateShifts} />

      {/* Rendu de chaque tableau par date */}
      {Object.entries(shiftsByDate).map(([date, shifts]) => (
        <div key={date} className="mb-5">
          <h5 className="mb-3">Shifts du {date}</h5>
          <DataTableShifts
            shifts={shifts}
            onConsulter={handleConsulter}
            onAffecter={handleAffecter}
          />
          <AffectationDialog
            show={showDialog}
            onClose={() => setShowDialog(false)}
            onSave={handleSaveAffectation}
            onDelete={handleDeleteAffectation}
            shiftLabel={selectedShiftLabel}
            camions={camions}
            conducteurs={conducteurs}
            motifsRetard={motifsRetard}
            affectations={affectationsByShift[selectedShiftLabel] || []}
          />
          <ConsulterFlotteDialog
            show={showConsultDialog}
            onClose={() => setShowConsultDialog(false)}
            shiftLabel={consultedShiftLabel}
            affectations={affectationsByShift[consultedShiftLabel] || []}
          />
        </div>
      ))}
    </div>
  );
};

export default GestionShifts;
