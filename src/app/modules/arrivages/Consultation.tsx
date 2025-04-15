import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Accordion,
  Table,
} from "react-bootstrap";
import { BsFileEarmarkText, BsTrash, BsUpload } from "react-icons/bs";

const Consultation: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [typeDocumentNavire, setTypeDocumentNavire] = useState("");
  const [documentsNomination, setDocumentsNomination] = useState<File[]>([]);
  const [documentsQualification, setDocumentsQualification] = useState<File[]>(
    []
  );
  const [qualificationForm, setQualificationForm] = useState({
    date: "",
    conforme: false,
    commentaire: "",
  });
  const [qualificationHistorique, setQualificationHistorique] = useState<any[]>(
    []
  );
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);

  const [typePieceQualification, setTypePieceQualification] = useState("");
  const [surveillants, setSurveillants] = useState<any[]>([]);
  const [surveillantForm, setSurveillantForm] = useState({ pays: "", nom: "" });
  const paysOptions = ["Maroc", "France", "Espagne", "Italie"];
  const surveillantOptions = ["SGS Maroc", "Bureau Veritas", "Intertek"];
  const removeSurveillant = (index: number) => {
    setSurveillants((prev) => prev.filter((_, i) => i !== index));
  };
  const [formData, setFormData] = useState<any>({
    description: "",
    numeroFactureProforma: "",
    dateReception: "",
    pays: "",
    fournisseur: "",
    devise: "",
    tonnage: "",
    tolerance: "",
    dateBooking: "",
    dateFixBuyers: "",
    coutFinancement: "",
    fretPrixDevise: "",
    dateDepotLC: "",
  });
  const handleUploadClick = (context: "nomination" | "qualification") => {
    if (fileInputRef.current) {
      fileInputRef.current.onchange = (e: any) => {
        const files = Array.from(e.target.files as File[]);
        if (files.length) {
          if (context === "nomination") {
            setDocumentsNomination((prev) => [...prev, ...files]);
          } else if (context === "qualification") {
            setDocumentsQualification((prev) => [...prev, ...files]);
          }
        }
        e.target.value = ""; // ✅ maintenant dans la portée
      };

      fileInputRef.current.click(); // ✅ toujours ici
    }
  };

  useEffect(() => {
    const fakeData = {
      id: "ARR-2025-001",
      description: "Arrivage de ferraille E1 et E2",
      numeroFactureProforma: "FP-2025-0458",
      dateReception: "2025-01-10",
      pays: "France",
      fournisseur: "ArcelorMittal",
      devise: "EUR",
      tonnage: "2000",
      tolerance: "5",
      dateBooking: "2025-01-20",
      dateFixBuyers: "2025-01-25",
      coutFinancement: "20000",
      fretPrixDevise: "10000",
      dateDepotLC: "2025-01-30",
    };

    setFormData(fakeData);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex align-items-center mb-4">
        <Button variant="light" onClick={() => navigate(-1)} className="me-3">
          <i className="bi bi-arrow-left"></i>
        </Button>
        <div>
          <h1 className="card-header-title mb-1">Détails de l'arrivage {id}</h1>
        </div>
      </div>

      <Card className="mt-3">
        <div className="card border-0 shadow-sm rounded-3 p-8">
          <h1 className="card-header-title mb-1">Détails d'arrivage</h1>
          <p className="card-header-subtitle mb-4" style={{ fontSize: "1rem" }}>
            Consultez et modifiez les informations de l'arrivage
          </p>

          <Card.Body>
            <Form>
              <Row className="mb-3">
                <Col md={10}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex align-items-end">
                  <Button
                    style={{
                      backgroundColor: "#35363B",
                      borderColor: "#35363B",
                    }}
                    className="w-100 d-flex align-items-center justify-content-center text-white"
                  >
                    Enregistrer autant que version finale
                  </Button>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date Réception Facture Proforma</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateReception"
                      value={formData.dateReception}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Numéro Facture Proforma</Form.Label>
                    <Form.Control
                      type="text"
                      name="numeroFactureProforma"
                      value={formData.numeroFactureProforma}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Pays</Form.Label>
                    <Form.Select
                      name="pays"
                      value={formData.pays}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionner un pays</option>
                      <option value="Maroc">Maroc</option>
                      <option value="France">France</option>
                      <option value="Espagne">Espagne</option>
                      <option value="Allemagne">Allemagne</option>
                      <option value="Italie">Italie</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Fournisseur</Form.Label>
                    <Form.Select
                      name="fournisseur"
                      value={formData.fournisseur}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionner un fournisseur</option>
                      <option value="ArcelorMittal">ArcelorMittal</option>
                      <option value="Tata Steel">Tata Steel</option>
                      <option value="POSCO">POSCO</option>
                      <option value="Nippon Steel">Nippon Steel</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Devise</Form.Label>
                    <Form.Select
                      name="devise"
                      value={formData.devise}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionner une devise</option>
                      <option value="MAD">MAD</option>
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                      <option value="GBP">GBP</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Tonnage Total</Form.Label>
                    <Form.Control
                      type="text"
                      name="tonnage"
                      value={formData.tonnage}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Tolérance Tonnage</Form.Label>
                    <Form.Control
                      type="text"
                      name="tolerance"
                      value={formData.tolerance}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date Booking</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateBooking"
                      value={formData.dateBooking}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Onglets Logistique supplémentaires */}
              <div className="flex flex-wrap space-x-2 border-bottom pb-2 mt-4">
                {[
                  { id: "details", label: "Plus de détails" },
                  { id: "nominationNavire", label: "Nomination du navire" },
                  {
                    id: "nominationSurveillant",
                    label: "Nomination du Surveillant",
                  },
                  {
                    id: "qualificationArrivage",
                    label: "Qualification au port de chargement",
                  },
                  {
                    id: "informationsContrat",
                    label: "Informations du contrat",
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`btn btn-sm me-2 ${
                      activeTab === tab.id
                        ? "btn-primary"
                        : "btn-outline-secondary"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="border rounded p-4 mt-3">
                {/* Onglet Plus de détails */}
                {activeTab === "details" && (
                  <div className="space-y-6">
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Montant Taxes</Form.Label>
                          <Form.Control
                            type="number"
                            name="montantTaxes"
                            value={formData.montantTaxes}
                            onChange={handleChange}
                            placeholder="Ex: 20000.00"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Date Signature Contrat</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateSignatureContrat"
                            value={formData.dateSignatureContrat}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Banque</Form.Label>
                          <Form.Control
                            type="text"
                            name="banque"
                            value={formData.banque}
                            onChange={handleChange}
                            placeholder="Nom de la banque"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Date Demande Licence Import</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateDemandeLicence"
                            value={formData.dateDemandeLicence}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Date Obtention Licence Import</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateObtentionLicence"
                            value={formData.dateObtentionLicence}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Port Chargement</Form.Label>
                          <Form.Control
                            type="text"
                            name="portChargement"
                            value={formData.portChargement}
                            onChange={handleChange}
                            placeholder="Ex: Port de Marseille"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Date Limite Chargement</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateLimiteChargement"
                            value={formData.dateLimiteChargement}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Date Début Chargement</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateDebutChargement"
                            value={formData.dateDebutChargement}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Poids Départ</Form.Label>
                          <Form.Control
                            type="number"
                            name="poidsDepart"
                            value={formData.poidsDepart}
                            onChange={handleChange}
                            placeholder="Ex: 5000.00"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Poids Arrivée</Form.Label>
                          <Form.Control
                            type="number"
                            name="poidsArrivee"
                            value={formData.poidsArrivee}
                            onChange={handleChange}
                            placeholder="Ex: 4980.00"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Poids Moyen</Form.Label>
                          <Form.Control
                            type="number"
                            name="poidsMoyen"
                            value={formData.poidsMoyen}
                            onChange={handleChange}
                            placeholder="Ex: 4990.00"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Qualité Départ</Form.Label>
                          <Form.Control
                            type="text"
                            name="qualiteDepart"
                            value={formData.qualiteDepart}
                            onChange={handleChange}
                            placeholder="Qualité départ"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Qualité Arrivée</Form.Label>
                          <Form.Control
                            type="text"
                            name="qualiteArrivee"
                            value={formData.qualiteArrivee}
                            onChange={handleChange}
                            placeholder="Qualité arrivée"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Qualité Moyenne</Form.Label>
                          <Form.Control
                            type="text"
                            name="qualiteMoyenne"
                            value={formData.qualiteMoyenne}
                            onChange={handleChange}
                            placeholder="Qualité moyenne"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Date Heure NOR</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateHeureNOR"
                            value={formData.dateHeureNOR}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Taux Déchargement</Form.Label>
                          <Form.Control
                            type="date"
                            name="tauxDechargement"
                            value={formData.tauxDechargement}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="pt-4 mt-7">
                        <Form.Group controlId="dispatchDemurrage">
                          <Form.Check
                            type="switch"
                            name="dispatchDemurrage"
                            label="Dispatch Demurrage"
                            onChange={handleChange}
                            checked={formData.dispatchDemurrage}
                            className="custom-switch-orange"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label>Conditions Achat</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            name="conditionsAchat"
                            value={formData.conditionsAchat}
                            onChange={handleChange}
                            placeholder="Conditions d'achat"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label>Informations Contractuelles</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            name="informationsContractuelles"
                            value={formData.informationsContractuelles}
                            onChange={handleChange}
                            placeholder="Informations contractuelles"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                )}

                {/* Onglet : Informations du contrat */}

                {activeTab === "nominationNavire" && (
                  <div className="space-y-6">
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Compagnie maritime</Form.Label>
                          <Form.Control type="text" name="compagnieMaritime" />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Nom du navire</Form.Label>
                          <Form.Control type="text" name="nomNavire" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Label>Date début chargement (LAYCAN)</Form.Label>
                        <Form.Control type="date" name="dateDebutLaycan" />
                      </Col>
                      <Col md={4}>
                        <Form.Label>Date fin chargement (LAYCAN)</Form.Label>
                        <Form.Control type="date" name="dateFinLaycan" />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Label>Date de départ port origine</Form.Label>
                        <Form.Control
                          type="date"
                          name="dateDepartPortOrigine"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Label>Date d'arrivée port EL JORF</Form.Label>
                        <Form.Control type="date" name="dateArriveePortJorf" />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Label>Taux de déchargement</Form.Label>
                        <Form.Control
                          type="text"
                          name="tauxDechargementNavire"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Label>Demurrage Rate</Form.Label>
                        <Form.Control type="text" name="demurrageRate" />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={2}>
                        <Form.Check
                          type="checkbox"
                          label="Éligible Half Dispatch"
                          name="eligibleHalfDispatch"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Label>Montant Demurrage</Form.Label>
                        <Form.Control type="number" name="montantDemurrage" />
                      </Col>
                    </Row>
                    <Row className="mb-3 align-items-end">
                      <Col md={10}>
                        <Form.Group>
                          <Form.Label>Type de document</Form.Label>
                          <Form.Select
                            name="typeDocumentNavire"
                            value={typeDocumentNavire}
                            onChange={(e) =>
                              setTypeDocumentNavire(e.target.value)
                            }
                          >
                            <option value="">
                              Sélectionner un type de document
                            </option>
                            <option value="charter_party">Charter Party</option>
                            <option value="declaration_navire">
                              Déclaration Navire
                            </option>
                            <option value="certificat">Certificat</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={2}>
                        <Button
                          style={{
                            backgroundColor: "#fc5421",
                            borderColor: "#fc5421",
                          }}
                          className="w-100 d-flex align-items-center justify-content-center text-white"
                          onClick={() => handleUploadClick("nomination")} // Pour le navire
                          disabled={typeDocumentNavire === ""}
                        >
                          <BsUpload className="me-2" /> Télécharger
                        </Button>

                        <Form.Control
                          type="file"
                          ref={fileInputRef}
                          name="documentNomination"
                          style={{ display: "none" }}
                        />
                      </Col>
                      {documentsNomination.length > 0 && (
                        <div className="mt-4">
                          <h6 className="mb-3 fw-semibold">
                            Documents téléchargés
                          </h6>
                          <div className="bg-light border rounded p-3">
                            {documentsNomination.map((file, index) => (
                              <div
                                key={index}
                                className="d-flex align-items-center justify-content-between border rounded px-3 py-2 mb-2"
                                style={{ backgroundColor: "#f9fbfc" }}
                              >
                                <div className="d-flex align-items-center gap-3">
                                  <BsFileEarmarkText
                                    size={24}
                                    color="#fd7e14"
                                  />
                                  <div>
                                    <div className="fw-semibold">Contrat</div>
                                    <div className="text-muted small">
                                      {file.name} (
                                      {(file.size / 1024 / 1024).toFixed(2)} MB)
                                    </div>
                                  </div>
                                </div>
                                <BsTrash
                                  color="#dc3545"
                                  size={18}
                                  role="button"
                                  onClick={() =>
                                    setDocumentsNomination((prev) =>
                                      prev.filter((_, i) => i !== index)
                                    )
                                  }
                                  className="ms-3"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Row>
                  </div>
                )}
                {/* Onglet Nomination du Surveillant */}
                {activeTab === "nominationSurveillant" && (
                  <div className="space-y-6">
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Label>Pays</Form.Label>
                        <Form.Select
                          value={surveillantForm.pays}
                          onChange={(e) =>
                            setSurveillantForm({
                              ...surveillantForm,
                              pays: e.target.value,
                            })
                          }
                        >
                          <option value="">Sélectionner un pays</option>
                          {paysOptions.map((pays, index) => (
                            <option key={index} value={pays}>
                              {pays}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={4}>
                        <Form.Label>Surveillant</Form.Label>
                        <Form.Select
                          value={surveillantForm.nom}
                          onChange={(e) =>
                            setSurveillantForm({
                              ...surveillantForm,
                              nom: e.target.value,
                            })
                          }
                        >
                          <option value="">Sélectionner un surveillant</option>
                          {surveillantOptions.map((nom, index) => (
                            <option key={index} value={nom}>
                              {nom}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={4} className="d-flex align-items-end">
                        <Button
                          onClick={() =>
                            setSurveillants([...surveillants, surveillantForm])
                          }
                        >
                          Ajouter
                        </Button>
                      </Col>
                    </Row>
                    {surveillants.length > 0 && (
                      <Table bordered>
                        <thead>
                          <tr>
                            <th>Pays</th>
                            <th>Surveillant</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {surveillants.map((s, index) => (
                            <tr key={index}>
                              <td>{s.pays}</td>
                              <td>{s.nom}</td>
                              <td>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => removeSurveillant(index)}
                                >
                                  Supprimer
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </div>
                )}

                {activeTab === "informationsContrat" && (
                  <div className="space-y-6">
                    {/* Dates et taux */}
                    <Row className="mb-3 mt-4">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Date limite de chargement *</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateLimiteChargement"
                            value={formData.dateLimiteChargement || ""}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Taux de déchargement *</Form.Label>
                          <Form.Control
                            type="text"
                            name="tauxDechargement"
                            value={formData.tauxDechargement || ""}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Half Dispatch & Demurrage */}
                    <Row className="mb-3">
                      <Col md={2}>
                        <Form.Check
                          type="checkbox"
                          label="Half Dispatch"
                          name="halfDispatch"
                          checked={formData.halfDispatch || false}
                          onChange={(e) =>
                            setFormData((prev: any) => ({
                              ...prev,
                              halfDispatch: e.target.checked,
                            }))
                          }
                        />
                      </Col>
                      <Col md={2}>
                        <Form.Check
                          type="checkbox"
                          label="Demurrage"
                          name="demurrage"
                          checked={formData.demurrage || false}
                          onChange={(e) =>
                            setFormData((prev: any) => ({
                              ...prev,
                              demurrage: e.target.checked,
                            }))
                          }
                        />
                      </Col>
                    </Row>

                    {/* Port de chargement */}
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Port de chargement</Form.Label>
                          <Form.Select
                            name="portChargement"
                            value={formData.portChargement || ""}
                            onChange={handleChange}
                          >
                            <option value="">Sélectionner un port</option>
                            <option value="Casablanca">Casablanca</option>
                            <option value="Jorf Lasfar">Jorf Lasfar</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Upload documents */}
                    <Row className="mb-3 align-items-end">
                      <Col md={10}>
                        <Form.Group>
                          <Form.Label>Type de document</Form.Label>
                          <Form.Select
                            name="typeDocumentContrat"
                            value={formData.typeDocumentContrat || ""}
                            onChange={handleChange}
                          >
                            <option value="">
                              Sélectionner un type de document
                            </option>
                            <option value="facture">Facture proforma</option>
                            <option value="contrat">Contrat</option>
                            <option value="lc">
                              Demande LC / Engagement d'import
                            </option>
                            <option value="licence">Licence d'import</option>
                            <option value="radio">
                              Certificat non-radioactif
                            </option>
                            <option value="explosif">
                              Certificat non-explosif
                            </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col md={2}>
                        <Button
                          style={{
                            backgroundColor: "#fc5421",
                            borderColor: "#dc3545",
                          }}
                          className="w-100 d-flex align-items-center justify-content-center text-white"
                          onClick={() =>
                            document.getElementById("uploadDoc")?.click()
                          }
                          disabled={!formData.typeDocumentContrat}
                        >
                          <i className="bi bi-upload me-2"></i> Télécharger
                        </Button>

                        {/* INPUT FILE CACHÉ */}
                        <Form.Control
                          type="file"
                          id="uploadDoc"
                          name="documentContrat"
                          style={{ display: "none" }}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (e.target.files && e.target.files.length > 0) {
                              const file: File = e.target.files[0];
                              setUploadedDocuments((prev: File[]) => [
                                ...prev,
                                file,
                              ]);
                            }
                          }}
                        />
                      </Col>
                      {/* 🧾 AFFICHAGE DES DOCUMENTS TÉLÉCHARGÉS */}
                      {uploadedDocuments.length > 0 && (
                        <div className="mt-4">
                          <h6 className="fw-semibold mb-3">
                            Documents téléchargés
                          </h6>
                          <div className="bg-light border rounded p-3">
                            {uploadedDocuments.map(
                              (file: File, index: number) => (
                                <div
                                  key={index}
                                  className="d-flex align-items-center justify-content-between border rounded px-3 py-2 mb-2"
                                  style={{ backgroundColor: "#f9fbfc" }}
                                >
                                  <div className="d-flex align-items-center gap-3">
                                    <i className="bi bi-file-earmark-text-fill fs-4 text-warning" />
                                    <div>
                                      <div className="fw-semibold">
                                        {formData.typeDocumentContrat ||
                                          "Document"}
                                      </div>
                                      <div className="text-muted small">
                                        {file.name} (
                                        {(file.size / 1024 / 1024).toFixed(2)}{" "}
                                        MB)
                                      </div>
                                    </div>
                                  </div>
                                  <i
                                    className="bi bi-trash-fill fs-5 text-danger"
                                    role="button"
                                    onClick={() =>
                                      setUploadedDocuments((prev: File[]) =>
                                        prev.filter((_, i) => i !== index)
                                      )
                                    }
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </Row>
                  </div>
                )}

                {/* Onglet Qualification d’arrivage */}
                {activeTab === "qualificationArrivage" && (
                  <div className="space-y-6">
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="dateQualification"
                          value={qualificationForm.date}
                          onChange={(e) =>
                            setQualificationForm({
                              ...qualificationForm,
                              date: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col md={2} className="d-flex align-items-end">
                        <Form.Check
                          type="checkbox"
                          label="Qualité Conforme"
                          checked={qualificationForm.conforme}
                          onChange={(e) =>
                            setQualificationForm({
                              ...qualificationForm,
                              conforme: e.target.checked,
                            })
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Label>Commentaire</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="commentaire"
                          rows={3}
                          value={qualificationForm.commentaire}
                          onChange={(e) =>
                            setQualificationForm({
                              ...qualificationForm,
                              commentaire: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col md={3}>
                        <Form.Label>Type de pièce</Form.Label>
                        <Form.Select
                          value={typePieceQualification}
                          onChange={(e) =>
                            setTypePieceQualification(e.target.value)
                          }
                        >
                          <option value="">Sélectionner un type</option>
                          <option value="rapport">Rapport</option>
                          <option value="photo">Photo</option>
                        </Form.Select>
                      </Col>
                      <Col md={3} className="d-flex align-items-end">
                        <Button
                          onClick={() => handleUploadClick("qualification")} // Pour la qualification
                          disabled={typePieceQualification === ""}
                          className="w-100 bg-primary text-white"
                        >
                          <BsUpload className="me-2" /> Upload
                        </Button>

                        {documentsNomination.length > 0 && (
                          <div className="mt-4">
                            <h6 className="mb-3 fw-semibold">
                              Documents téléchargés
                            </h6>
                            <div className="bg-light border rounded p-3">
                              {documentsNomination.map((file, index) => (
                                <div
                                  key={index}
                                  className="d-flex align-items-center justify-content-between border rounded px-3 py-2 mb-2"
                                  style={{ backgroundColor: "#f9fbfc" }}
                                >
                                  <div className="d-flex align-items-center gap-3">
                                    <BsFileEarmarkText
                                      size={24}
                                      color="#fd7e14"
                                    />
                                    <div>
                                      <div className="fw-semibold">Contrat</div>
                                      <div className="text-muted small">
                                        {file.name} (
                                        {(file.size / 1024 / 1024).toFixed(2)}{" "}
                                        MB)
                                      </div>
                                    </div>
                                  </div>
                                  <BsTrash
                                    color="#dc3545"
                                    size={18}
                                    role="button"
                                    onClick={() =>
                                      setDocumentsNomination((prev) =>
                                        prev.filter((_, i) => i !== index)
                                      )
                                    }
                                    className="ms-3"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <Form.Control
                          type="file"
                          ref={fileInputRef}
                          name="documentQualification"
                          style={{ display: "none" }}
                        />
                      </Col>
                    </Row>
                    {/* Liste des qualifications */}
                    {qualificationHistorique.length > 0 && (
                      <Table bordered>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Conforme</th>
                            <th>Commentaire</th>
                          </tr>
                        </thead>
                        <tbody>
                          {qualificationHistorique.map((q, i) => (
                            <tr key={i}>
                              <td>{q.date}</td>
                              <td>{q.conforme ? "Oui" : "Non"}</td>
                              <td>{q.commentaire}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </div>
                )}
              </div>

              <div className="text-end mb-3 mt-7">
                <Button variant="primary">Enregistrer les modifications</Button>
              </div>
            </Form>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default Consultation;
