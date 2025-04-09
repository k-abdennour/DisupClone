import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

interface ArrivageData {
  description: string;
  proformaInvoiceNumber: string;
  proformaInvoiceDate: string;
  country: string;
  supplier: string;
  currency: string;
  totalTonnage: number;
  tonnageTolerance: number;
  bookingDate: string;
}

const Paiement: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [arrivage, setArrivage] = useState<ArrivageData | null>(null);

  const [bank, setBank] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [swiftRef, setSwiftRef] = useState("");
  const [swiftDate, setSwiftDate] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const BANK_OPTIONS = [
    "Attijariwafa Bank",
    "BMCE Bank (Bank of Africa)",
    "Banque Centrale Populaire",
    "CIH Bank",
    "Société Générale Maroc",
    "Crédit du Maroc",
    "CFG Bank",
    "Al Barid Bank",
  ];
  const PAYMENT_MODE_OPTIONS = [
    "Virement bancaire",
    "Lettre de crédit",
    "Chèque",
    "Espèces",
  ];

  useEffect(() => {
    // Remplacez par un appel réel à votre API
    const fakeData: ArrivageData = {
      description: "Arrivage de ferraille E1 et E2",
      proformaInvoiceNumber: "FP-2025-0458",
      proformaInvoiceDate: "2025-01-10",
      country: "France",
      supplier: "ArcelorMittal",
      currency: "EUR",
      totalTonnage: 2000,
      tonnageTolerance: 5,
      bookingDate: "2025-01-20",
    };
    setArrivage(fakeData);
  }, [id]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setAttachments((prevFiles) => [...prevFiles, ...files]);
    e.target.value = "";
  };

  const handleRemoveFile = (index: number) => {
    setAttachments((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Paiement enregistré avec succès !");
  };

  if (!arrivage) return <div>Chargement...</div>;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center mb-4">
        <Button variant="light" onClick={() => navigate(-1)} className="me-3">
          <i className="bi bi-arrow-left"></i>
        </Button>
        <div>
          <h1 className="card-header-title mb-1">
            Paiement de l’arrivage {id}
          </h1>
        </div>
      </div>
      <Card className="mt-3">
        <div className="card border-0 shadow-sm rounded-3 p-8 row mb-3">
          <h1 className="mt-4">Informations de paiement</h1>
          <p className="card-header-subtitle mb-4" style={{ fontSize: "1rem" }}>
            Consultez et modifiez les informations de l'arrivage
          </p>
          <form className="row g-3">
            <div className="row mb-3">
              <div className="col-md-13">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={arrivage.description}
                  disabled
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Numéro Facture Proforma</label>
                <input
                  type="text"
                  className="form-control"
                  value={arrivage.proformaInvoiceNumber}
                  disabled
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">
                  Date Réception Facture Proforma
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={arrivage.proformaInvoiceDate}
                  disabled
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Pays</label>
                <input
                  type="text"
                  className="form-control"
                  value={arrivage.country}
                  disabled
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Fournisseur</label>
                <input
                  type="text"
                  className="form-control"
                  value={arrivage.supplier}
                  disabled
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Devise</label>
                <input
                  type="text"
                  className="form-control"
                  value={arrivage.currency}
                  disabled
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Tonnage Total</label>
                <input
                  type="number"
                  className="form-control"
                  value={arrivage.totalTonnage}
                  disabled
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Tolérance Tonnage</label>
                <input
                  type="number"
                  className="form-control"
                  value={arrivage.tonnageTolerance}
                  disabled
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Date Booking</label>
                <input
                  type="date"
                  className="form-control"
                  value={arrivage.bookingDate}
                  disabled
                />
              </div>
            </div>
          </form>

          {/* Paiement */}
          <h2 className="mt-5">Paiement</h2>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Banque</label>
                <select
                  className="form-select"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  required
                >
                  <option value="">-- Sélectionnez une banque --</option>
                  {BANK_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Mode de paiement</label>
                <select
                  className="form-select"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  required
                >
                  <option value="">-- Sélectionnez un mode --</option>
                  {PAYMENT_MODE_OPTIONS.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Référence du SWIFT</label>
                <input
                  type="text"
                  className="form-control"
                  value={swiftRef}
                  onChange={(e) => setSwiftRef(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Date SWIFT</label>
                <input
                  type="date"
                  className="form-control"
                  value={swiftDate}
                  onChange={(e) => setSwiftDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-12">
              <label className="form-label">Pièces jointes</label>
              <input
                type="file"
                className="form-control"
                multiple
                onChange={handleFileChange}
              />
              {attachments.length > 0 && (
                <ul className="list-unstyled mt-2">
                  {attachments.map((file, index) => (
                    <li key={index}>
                      {file.name}{" "}
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleRemoveFile(index)}
                      >
                        Supprimer
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="d-flex justify-content-end mt-6 gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >
                Annuler
              </button>
              <button type="submit" className="btn btn-primary">
                Enregistrer le paiement
              </button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Paiement;
