import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsSave, BsXCircle } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";

interface Fournisseur {
  Id: string;
  Nom: string;
  TypeId: string;
  IdentifiantFiscal: string;
  RC: string;
  ICE: string;
  SIRET: string;
  PaysId: string;
  Adresse: string;
  VilleId: string;
  Telephone: string;
  Email: string;
  DeviseId: string;
  ModePaiementId: string;
  IBAN: string;
  SWIFT: string;
  RIB: string;
  ContactNom: string;
  ContactTelephone: string;
  ContactEmail: string;
  Statut: string;
  DateCreation: string;
  UserId: string;
  Observations: string;
  dateArrivee?: string;
}

const UpdateFournisseur: React.FC = () => {
  const [fournisseur, setFournisseur] = useState<Fournisseur | null>(null);
  const [formData, setFormData] = useState<Fournisseur | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFournisseurDetails = async () => {
      setLoading(true);
      const mockData: Fournisseur = {
        Id: id || "1",
        Nom: "CMD-2025-458",
        TypeId: "1",
        IdentifiantFiscal: "IF123456",
        RC: "RC789",
        ICE: "123",
        SIRET: "SIRET456",
        PaysId: "Maroc",
        Adresse: "123 Rue de l'Industrie",
        VilleId: "Casablanca",
        Telephone: "+212 522 123 456",
        Email: "contact@cmd.com",
        DeviseId: "MAD",
        ModePaiementId: "Virement",
        IBAN: "MA123456789",
        SWIFT: "CMD123",
        RIB: "123456789",
        ContactNom: "Jean Dupont",
        ContactTelephone: "+212 600 123 456",
        ContactEmail: "jean.dupont@cmd.com",
        Statut: "activé",
        DateCreation: "25/02/2025",
        UserId: "USER1",
        Observations: "Fournisseur principal de ferraille",
        dateArrivee: "25/02/2025",
      };

      setFournisseur(mockData);
      setFormData(mockData);
      setLoading(false);
    };

    fetchFournisseurDetails();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = format(date, "dd/MM/yyyy");
      setFormData((prev) => (prev ? { ...prev, DateCreation: formattedDate } : null));
    }
  };

  const handleCancel = () => {
    navigate(`/details_fournisseurs`);
  };

  const handleSave = async () => {
    if (!formData) return;

    try {
      console.log("Saving data:", formData);
      // Replace with your actual API call to update the supplier
      // await fetch(`http://your-api-endpoint/fournisseurs/${id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      navigate(`/details_fournisseurs`);
    } catch (error) {
      console.error("Error saving fournisseur:", error);
    }
  };

  if (loading) {
    return <div className="container-fluid mt-4">Chargement...</div>;
  }

  if (!fournisseur || !formData) {
    return <div className="container-fluid mt-4">Fournisseur non trouvé</div>;
  }

  const parsedDate = formData.DateCreation
    ? parse(formData.DateCreation, "dd/MM/yyyy", new Date())
    : new Date();

  return (
    <div className="container-fluid mt-4">
      <style>{`
        .page-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #0f172a;
        }
        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 1rem;
        }
        .form-label {
          font-weight: 500;
          color: #495057;
          font-size: 0.95rem;
          margin-bottom: 0.25rem;
        }
        .form-control {
          margin-bottom: 1rem;
          background-color: #fff;
          border: 1px solid #ced4da;
          color: #64748b;
          font-size: 0.95rem;
        }
        .btn-action {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 10px;
          padding: 0.65rem 1.25rem;
          font-weight: 500;
          font-size: 0.95rem;
          margin-left: 10px;
        }
        .btn-back {
          color: #0f172a;
          text-decoration: none;
          font-size: 0.95rem;
        }
        .btn-back:hover {
          text-decoration: underline;
        }
        .btn-save {
          background-color: #28a745;
          color: white;
          border: none;
        }
        .btn-cancel {
          background-color: #dc3545;
          color: white;
          border: none;
        }
        .react-datepicker-wrapper {
          display: block;
        }
        .react-datepicker-popper {
          z-index: 1000;
        }
      `}</style>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title mb-1">Modifier Fournisseur</h2>
        <div>
          <button
            className="btn btn-secondary btn-action"
            onClick={() => navigate("/liste_fournisseurs")}
          >
            <span>←</span> <span>Retour</span>
          </button>
        </div>
      </div>

      <div className="row">
        {/* Informations Générales */}
        <div className="col-md-6">
          <h5 className="section-title">Informations Générales</h5>
          <div className="form-label">Nom</div>
          <input
            type="text"
            name="Nom"
            value={formData.Nom}
            onChange={handleInputChange}
            className="form-control"
          />

          <div className="form-label">ICE</div>
          <input
            type="text"
            name="ICE"
            value={formData.ICE}
            onChange={handleInputChange}
            className="form-control"
          />

          <div className="form-label">Identifiant Fiscal</div>
          <input
            type="text"
            name="IdentifiantFiscal"
            value={formData.IdentifiantFiscal}
            onChange={handleInputChange}
            className="form-control"
          />

          <div className="form-label">RC</div>
          <input
            type="text"
            name="RC"
            value={formData.RC}
            onChange={handleInputChange}
            className="form-control"
          />

          <div className="form-label">SIRET</div>
          <input
            type="text"
            name="SIRET"
            value={formData.SIRET}
            onChange={handleInputChange}
            className="form-control"
          />

          <div className="form-label">Statut</div>
          <select
            name="Statut"
            value={formData.Statut}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="activé">activé</option>
            <option value="non activé">non activé</option>
          </select>

          <div className="form-label mt-3">Date de Création</div>
          <DatePicker
            selected={parsedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="Sélectionnez une date"
          />
        </div>

        {/* Informations de Contact */}
        <div className="col-md-6">
          <h5 className="section-title">Informations de Contact</h5>
          <div className="form-label">Pays</div>
          <input
            type="text"
            name="PaysId"
            value={formData.PaysId}
            onChange={handleInputChange}
            className="form-control"
          />

          <div className="form-label">Ville</div>
          <input
            type="text"
            name="VilleId"
            value={formData.VilleId}
            onChange={handleInputChange}
            className="form-control"
          />

          <div className="form-label">Adresse</div>
          <input
            type="text"
            name="Adresse"
            value={formData.Adresse}
            onChange={handleInputChange}
            className="form-control"
          />

          <div className="form-label">Téléphone</div>
          <input
            type="text"
            name="Telephone"
            value={formData.Telephone}
            onChange={handleInputChange}
            className="form-control"
          />

          <div className="form-label">Email</div>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleInputChange}
            className="form-control"
          />

          <div className="form-label">Contact Principal</div>
          <input
            type="text"
            name="ContactNom"
            value={formData.ContactNom}
            onChange={handleInputChange}
            className="form-control"
          />

          <div className="form-label">Téléphone Contact</div>
          <input
            type="text"
            name="ContactTelephone"
            value={formData.ContactTelephone}
            onChange={handleInputChange}
            className="form-control"
          />

          <div className="form-label">Email Contact</div>
          <input
            type="email"
            name="ContactEmail"
            value={formData.ContactEmail}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        {/* Informations Bancaires */}
        <div className="col-md-6 mt-4">
          <h5 className="section-title">Informations Bancaires</h5>
          <div className="form-label">Devise</div>
          <input
            type="text"
            name="DeviseId"
            value={formData.DeviseId}
            onChange={handleInputChange}
            className="form-control"
          />

          <div className="form-label">Mode de Paiement</div>
          <input
            type="text"
            name="ModePaiementId"
            value={formData.ModePaiementId}
            onChange={handleInputChange}
            className="form-control"
          />

          <div className="form-label">IBAN</div>
          <input
            type="text"
            name="IBAN"
            value={formData.IBAN}
            onChange={handleInputChange}
            className="form-control"
          />

          <div className="form-label">SWIFT</div>
          <input
            type="text"
            name="SWIFT"
            value={formData.SWIFT}
            onChange={handleInputChange}
            className="form-control"
          />

          <div className="form-label">RIB</div>
          <input
            type="text"
            name="RIB"
            value={formData.RIB}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        {/* Informations Additionnelles */}
        <div className="col-md-6 mt-4">
          <h5 className="section-title">Informations Additionnelles</h5>
          <div className="form-label">Créé par (User ID)</div>
          <input
            type="text"
            name="UserId"
            value={formData.UserId}
            onChange={handleInputChange}
            className="form-control"
          />

          <div className="form-label">Observations</div>
          <textarea
            name="Observations"
            value={formData.Observations}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>
      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-action btn-cancel" onClick={handleCancel}>
          <BsXCircle className="me-2" /> Annuler
        </button>
        <button className="btn btn-action btn-save" onClick={handleSave}>
          <BsSave className="me-2" /> Enregistrer
        </button>              
      </div>                
    </div>
  );
};

export default UpdateFournisseur;