import React, { useEffect, useState } from "react";
import PaysSearchForm from "./__partials/PaysSearchForm";
import PaysDataTable from "./__partials/PaysDataTable";

interface Arrivage {
  id: string;
  commande: string;
  fournisseur: string;
  dateCreation: string;
  tonnage: string;
  statut: string;
  dateArrivee: string;
}

const Pays: React.FC = () => {
  const [arrivages, setArrivages] = useState<Arrivage[]>([]);
  const [filtered, setFiltered] = useState<Arrivage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fakeArrivages: Arrivage[] = [
      {
        id: "ARR-2025-001",
        commande: "CMD-2025-458",
        fournisseur: "ArcelorMittal",
        dateCreation: "15/01/2025",
        tonnage: "5000 tonnes",
        statut: "En cours",
        dateArrivee: "25/02/2025",
      },
      {
        id: "ARR-2025-002",
        commande: "CMD-2025-459",
        fournisseur: "Tata Steel",
        dateCreation: "20/01/2025",
        tonnage: "3500 tonnes",
        statut: "Planifié",
        dateArrivee: "10/03/2025",
      },
      {
        id: "ARR-2025-003",
        commande: "CMD-2025-460",
        fournisseur: "POSCO",
        dateCreation: "25/01/2025",
        tonnage: "4200 tonnes",
        statut: "En transit",
        dateArrivee: "05/03/2025",
      },
      {
        id: "ARR-2025-004",
        commande: "CMD-2025-461",
        fournisseur: "Nippon Steel",
        dateCreation: "01/02/2025",
        tonnage: "6000 tonnes",
        statut: "Planifié",
        dateArrivee: "15/03/2025",
      },
      {
        id: "ARR-2025-005",
        commande: "CMD-2025-462",
        fournisseur: "ArcelorMittal",
        dateCreation: "05/02/2025",
        tonnage: "4800 tonnes",
        statut: "En cours",
        dateArrivee: "30/03/2025",
      },
    ];

    setArrivages(fakeArrivages);
    setFiltered(fakeArrivages);
    setLoading(false);
  }, []);

  const handleSearch = (term: string, status: string) => {
    const lowerTerm = term.toLowerCase();
    const filteredData = arrivages.filter((item) => {
      const matchesTerm =
        item.id.toLowerCase().includes(lowerTerm) ||
        item.commande.toLowerCase().includes(lowerTerm) ||
        item.fournisseur.toLowerCase().includes(lowerTerm);
      const matchesStatus = status ? item.statut === status : true;
      return matchesTerm && matchesStatus;
    });
    setFiltered(filteredData);
  };

  const translate = (key: string) => key;

  return (
    <div className="container-fluid mt-4">
      {/* ✅ En-tête haut de page */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Liste des arrivages</h2>
        </div>
        <button className="btn btn-danger">
          <span className="me-2">➕</span> Nouvel arrivage
        </button>
      </div>

      {/* ✅ Carte unique englobant recherche + tableau */}
      <div className="card border-0 shadow-sm rounded-3 p-4">
        <h5 className="fw-semibold mb-1">Arrivages</h5>
        <p className="text-muted mb-4">Liste des arrivages de ferraille importée</p>

        {/* ✅ Formulaire de recherche */}
        <PaysSearchForm onSearch={handleSearch} translate={translate} />

        {/* ✅ Tableau des données */}
        <PaysDataTable
          data={filtered}
          loading={loading}
          translate={translate}
          onDelete={(id) => console.log("Suppression :", id)}
        />
      </div>
    </div>
  );
};

export default Pays;
