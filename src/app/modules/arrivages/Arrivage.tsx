import React, { useEffect, useState } from "react";
import ArrivageSearchForm from "./__partials/ArrivageSearchForm";
import ArrivageDataTable from "./__partials/ArrivageDataTable";
import { useNavigate } from "react-router-dom";
import { BsPlus } from "react-icons/bs";

interface Arrivage {
  id: string;
  commande: string;
  fournisseur: string;
  dateCreation: string;
  tonnage: string;
  statut: string;
  dateArrivee: string;
  nomNavire: string;
  lastDateOfShipment?: string; // ✅ ajouté ici
}

const Arrivage: React.FC = () => {
  const [arrivages, setArrivages] = useState<Arrivage[]>([]);
  const [filtered, setFiltered] = useState<Arrivage[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        nomNavire: "Ocean Voyage",
        lastDateOfShipment: "29/02/2025",
      },
      {
        id: "ARR-2025-002",
        commande: "CMD-2025-459",
        fournisseur: "Tata Steel",
        dateCreation: "20/01/2025",
        tonnage: "3500 tonnes",
        statut: "Planifié",
        dateArrivee: "10/03/2025",
        nomNavire: "Sea Horizon",
        lastDateOfShipment: "05/03/2025",
      },
      {
        id: "ARR-2025-003",
        commande: "CMD-2025-460",
        fournisseur: "POSCO",
        dateCreation: "25/01/2025",
        tonnage: "4200 tonnes",
        statut: "En transit",
        dateArrivee: "05/03/2025",
        nomNavire: "Iron Pearl",
        lastDateOfShipment: "28/02/2025",
      },
      {
        id: "ARR-2025-004",
        commande: "CMD-2025-461",
        fournisseur: "Nippon Steel",
        dateCreation: "01/02/2025",
        tonnage: "6000 tonnes",
        statut: "Planifié",
        dateArrivee: "15/03/2025",
        nomNavire: "Global Titan",
        lastDateOfShipment: "10/03/2025",
      },
      {
        id: "ARR-2025-005",
        commande: "CMD-2025-462",
        fournisseur: "ArcelorMittal",
        dateCreation: "05/02/2025",
        tonnage: "4800 tonnes",
        statut: "En cours",
        dateArrivee: "30/03/2025",
        nomNavire: "Metal Queen",
        lastDateOfShipment: "25/03/2025",
      },
    ];

    setArrivages(fakeArrivages);
    setFiltered(fakeArrivages);
    setLoading(false);
  }, []);

  const handleSearch = (term: string, status: string, view?: string) => {
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
  const handleAddArrivageClick = () => {
    navigate("/addarrivage");
  };

  return (
    <div className="container-fluid mt-4">
      {/* ✅ CSS intégré */}
      <style>{`
        .page-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #0f172a;
        }

        .card-header-title {
          font-size: 2rem;
          font-weight: 600;
          color: #0f172a;
        }

        .card-header-subtitle {
          color: #64748b;
          font-size: 1.1rem;
        }

        .btn-add-arrivage {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 10px;
          padding: 0.65rem 1.25rem;
          font-weight: 500;
          font-size: 0.95rem;
        }
      `}</style>

      {/* ✅ En-tête haut de page */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="page-title mb-1">Liste des arrivages</h2>
        </div>
        <button
          className="btn btn-primary btn-add-arrivage"
          onClick={handleAddArrivageClick}
        >
          <BsPlus className="me-2" size={20} />
          <span>Nouvel arrivage</span>
        </button>
      </div>

      {/* ✅ Carte contenant tout le bloc */}
      <div className="card border-0 shadow-sm rounded-3 p-4">
        <h5 className="card-header-title mb-1">Arrivages</h5>
        <p className="card-header-subtitle mb-4">
          Liste des arrivages de ferraille importée
        </p>

        {/* ✅ Formulaire de recherche */}
        <ArrivageSearchForm onSearch={handleSearch} translate={translate} />

        {/* ✅ Tableau des données */}
        <ArrivageDataTable
          data={filtered}
          loading={loading}
          translate={translate}
          onDelete={(id) => console.log("Suppression :", id)}
        />
      </div>
    </div>
  );
};

export default Arrivage;
