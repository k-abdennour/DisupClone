import React, { useRef, useState } from "react";
import {
  Card,
  Form,
  Button,
  Table,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { BsSearch, BsThreeDotsVertical, BsUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const AddArrivage: React.FC = () => {

  const [searchCommandeQuery, setSearchCommandeQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("infosContrat");
  const [typeDocument, setTypeDocument] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [typeDocumentNavire, setTypeDocumentNavire] = useState("");
  const [qualificationForm, setQualificationForm] = useState({ date: "", conforme: false, commentaire: "" });
  const [qualificationHistorique, setQualificationHistorique] = useState<any[]>([]);
  const [typePieceQualification, setTypePieceQualification] = useState("");
  const [surveillants, setSurveillants] = useState<any[]>([]);
  const [surveillantForm, setSurveillantForm] = useState({ pays: "", nom: "" });
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const paysOptions = ["Maroc", "France", "Espagne", "Italie"];
  const surveillantOptions = ["SGS Maroc", "Bureau Veritas", "Intertek"];
  const [commandes, setCommandes] = useState<
    {
      id: string;
      numeroFactureProforma: string;
      fournisseur: string;
      devise: string;
      qualite: string;
      tonnage: number;
      tauxChange: number;
      delaiPaiement: string;
      prixUnitaire: number;
      incoterm: string;
    }[]
  >([]);



  const removeSurveillant = (index: number) => {
    setSurveillants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSearchCommande = () => {
    setIsSearching(true);
    // Simuler un appel API
    setTimeout(() => {
      setCommandes([
        {
          id: "CMD-2025-001",
          numeroFactureProforma: "FP-2025-1001",
          fournisseur: "ArcelorMittal",
          devise: "EUR",
          qualite: "A36",
          tonnage: 5000,
          tauxChange: 10.5,
          delaiPaiement: "30 jours",
          prixUnitaire: 450,
          incoterm: "CIF",
        },
        {
          id: "CMD-2025-002",
          numeroFactureProforma: "FP-2025-1002",
          fournisseur: "Tata Steel",
          devise: "USD",
          qualite: "S235",
          tonnage: 3000,
          tauxChange: 10.3,
          delaiPaiement: "60 jours",
          prixUnitaire: 420,
          incoterm: "FOB",
        },
      ]);

      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="container-fluid mt-4">
      <h3 className="card-header-title mb-1">Création d'arrivage</h3>
      <Card>
        <div className="card border-0 shadow-sm rounded-3 p-8">
          <Card.Body>
            {/* ✅ GESTION DES COMMANDES */}
            <div className="mb-5">
              <h1 className="card-header-title mb-2">
                Importation des commandes
              </h1>

              <Form>
                <Row className="align-items-end">
                  <Col md={6}>
                    <Form.Group controlId="searchCommande">
                      <Form.Label>N° de commande</Form.Label>
                      <Form.Control
                        type="text"
                        value={searchCommandeQuery}
                        onChange={(e) => setSearchCommandeQuery(e.target.value)}
                        placeholder="Entrez un numéro de commande"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="auto">
                    <Button
                      variant="primary"
                      onClick={handleSearchCommande}
                      disabled={isSearching}
                      className="d-flex align-items-center"
                    >
                      {isSearching ? (
                        <>
                          Recherche...{" "}
                          <Spinner
                            animation="border"
                            size="sm"
                            className="ms-2"
                          />
                        </>
                      ) : (
                        <>
                          Rechercher <BsSearch className="ms-2" />
                        </>
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>

              {commandes.length > 0 && (
                <Table bordered responsive className="mt-4">
                  <thead className="table-light">
                    <tr>
                      <th>N° Facture Proforma</th>
                      <th>Fournisseur</th>
                      <th>Devise</th>
                      <th>Qualité</th>
                      <th>Tonnage</th>
                      <th>Taux de change</th>
                      <th>Délai de paiement</th>
                      <th>Prix unitaire Final</th>
                      <th>Incoterm</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commandes.map((commande) => (
                      <tr key={commande.id}>
                        <td>{commande.numeroFactureProforma}</td>
                        <td>{commande.fournisseur}</td>
                        <td>{commande.devise}</td>
                        <td>{commande.qualite}</td>
                        <td>{commande.tonnage} tonnes</td>
                        <td>{commande.tauxChange}</td>
                        <td>{commande.delaiPaiement}</td>
                        <td>{commande.prixUnitaire} €/tonne</td>
                        <td>{commande.incoterm}</td>
                        <td className="text-end">
                          <DropdownButton
                            as={ButtonGroup}
                            variant="light"
                            title={<BsThreeDotsVertical />}
                            align="end"
                            size="sm"
                          >
                            <Dropdown.Item>Modifier</Dropdown.Item>
                            <Dropdown.Item>Voir détails</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item className="text-danger">
                              Supprimer
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </Card.Body>
        </div>
      </Card>
      <style>{`


        .card-header-title {
          font-size: 2rem;
          font-weight: 600;
          color: #0f172a;
        }

        .card-header-subtitle {
          color: #64748b;
          font-size: 1.1rem;
        }

      `}</style>
      {/* ✅ FORMULAIRE D’ARRIVAGE */}
      <Card className="mt-3">
        <div className="card border-0 shadow-sm rounded-3 p-8 ">
          <h5 className="card-header-title mb-1">
            Formulaire de création d'arrivage
          </h5>
          <p className="card-header-subtitle mb-4" style={{ fontSize: "1rem" }}>
            Remplissez les informations pour créer un nouvel arrivage
          </p>
          <Card.Body>
            <Form>
              {/* Ligne : Tolérance Tonnage + Date Booking */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Tolérance Tonnage</Form.Label>
                    <Form.Control
                      type="number"
                      name="toleranceTonnage"
                      placeholder="Ex: 5"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date Booking</Form.Label>
                    <Form.Control type="date" name="dateBooking" />
                  </Form.Group>
                </Col>
              </Row>

              {/* Ligne : Date Fix Buyers + Coût Financement */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date Fix Buyers</Form.Label>
                    <Form.Control type="date" name="dateFixBuyers" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Coût de Financement</Form.Label>
                    <Form.Control
                      type="number"
                      name="coutFinancement"
                      placeholder="Ex: 25000.00"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Ligne : Fret Prix Devise + Date Réception FP */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Fret (Prix en Devise)</Form.Label>
                    <Form.Control
                      type="number"
                      name="fretPrixDevise"
                      placeholder="Ex: 350000.00"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date Réception Facture Proforma</Form.Label>
                    <Form.Control type="date" name="dateReceptionFP" />
                  </Form.Group>
                </Col>
              </Row>

              {/* Ligne : Date Dépôt LC */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date Dépôt LC à la Banque</Form.Label>
                    <Form.Control type="date" name="dateDepotLC" />
                  </Form.Group>
                </Col>
              </Row>
{/* Onglets Logistique supplémentaires */}
<div className="flex flex-wrap space-x-2 border-bottom pb-2 mt-4">
  {[
{ id: "infosContrat", label: "Informations du contrat" }, { id: "nominationNavire", label: "Nomination du navire" }, { id: "nominationSurveillant", label: "Nomination du Surveillant" }, { id: "qualificationArrivage", label: "Qualification d’arrivage" }
  ].map((tab) => (
    <button
      key={tab.id}
      type="button"
      onClick={() => setActiveTab(tab.id)}
      className={`btn btn-sm me-2 ${
        activeTab === tab.id ? "btn-primary" : "btn-outline-secondary"
      }`}
    >
      {tab.label}
    </button>
  ))}
</div>

<div className="border rounded p-4 mt-3">
  {/* Onglet : Informations du contrat */}
  {activeTab === "infosContrat" && (
    <div className="space-y-6">
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Date limite de chargement *</Form.Label>
            <Form.Control type="date" name="dateLimiteChargement" required />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Taux de déchargement *</Form.Label>
            <Form.Control type="text" name="tauxDechargement" required />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={2}>
          <Form.Check
            type="checkbox"
            label="Half Dispatch"
            name="halfDispatch"
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type="checkbox"
            label="Demurrage"
            name="demurrage"
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Port de chargement</Form.Label>
            <Form.Select name="portChargement">
              <option value="">Sélectionner un port</option>
              <option value="Casablanca">Casablanca</option>
              <option value="Jorf Lasfar">Jorf Lasfar</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Téléversement document ici */}
      <Row className="mb-3 align-items-end">
        <Col md={10}>
          <Form.Group>
            <Form.Label>Type de document</Form.Label>
            <Form.Select
              name="typeDocumentContrat"
              value={typeDocument}
              onChange={(e) => setTypeDocument(e.target.value)}
            >
              <option value="">Sélectionner un type de document</option>
              <option value="facture">Facture proforma</option>
              <option value="contrat">Contrat</option>
              <option value="lc">Demande LC / Engagement d'import</option>
              <option value="licence">Licence d'import</option>
              <option value="radio">Certificat non-radioactif</option>
              <option value="explosif">Certificat non-explosif</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Button
            style={{ backgroundColor: "#fc5421", borderColor: "#fc5421" }}
            className="w-100 d-flex align-items-center justify-content-center text-white"
            onClick={handleUploadClick}
            disabled={typeDocument === ""}
          >
            <BsUpload className="me-2" />
            Télécharger
          </Button>
          <Form.Control
            type="file"
            ref={fileInputRef}
            name="documentContrat"
            style={{ display: "none" }}
          />
        </Col>
      </Row>
    </div>
  )}

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
                      <Col md={4}><Form.Label>Date début chargement (LAYCAN)</Form.Label><Form.Control type="date" name="dateDebutLaycan" /></Col>
                      <Col md={4}><Form.Label>Date fin chargement (LAYCAN)</Form.Label><Form.Control type="date" name="dateFinLaycan" /></Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={4}><Form.Label>Date de départ port origine</Form.Label><Form.Control type="date" name="dateDepartPortOrigine" /></Col>
                      <Col md={4}><Form.Label>Date d'arrivée port EL JORF</Form.Label><Form.Control type="date" name="dateArriveePortJorf" /></Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={4}><Form.Label>Taux de déchargement</Form.Label><Form.Control type="text" name="tauxDechargementNavire" /></Col>
                      <Col md={4}><Form.Label>Demurrage Rate</Form.Label><Form.Control type="text" name="demurrageRate" /></Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={2}><Form.Check type="checkbox" label="Éligible Half Dispatch" name="eligibleHalfDispatch" /></Col>
                      <Col md={4}><Form.Label>Montant Demurrage</Form.Label><Form.Control type="number" name="montantDemurrage" /></Col>
                    </Row>
                    <Row className="mb-3 align-items-end">
                      <Col md={10}>
                        <Form.Group>
                          <Form.Label>Type de document</Form.Label>
                          <Form.Select
                            name="typeDocumentNavire"
                            value={typeDocumentNavire}
                            onChange={(e) => setTypeDocumentNavire(e.target.value)}
                          >
                            <option value="">Sélectionner un type de document</option>
                            <option value="charter_party">Charter Party</option>
                            <option value="declaration_navire">Déclaration Navire</option>
                            <option value="certificat">Certificat</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={2}>
                        <Button
                          style={{ backgroundColor: "#fc5421", borderColor: "#fc5421" }}
                          className="w-100 d-flex align-items-center justify-content-center text-white"
                          onClick={handleUploadClick}
                          disabled={typeDocumentNavire === ""}
                        >
                          <BsUpload className="me-2" /> Télécharger
                        </Button>
                        <Form.Control type="file" ref={fileInputRef} name="documentNomination" style={{ display: "none" }} />
                      </Col>
                    </Row>
                  </div>
                )}
                {/* Onglet Nomination du Surveillant */}
                {activeTab === "nominationSurveillant" && (
                  <div className="space-y-6">
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Label>Pays</Form.Label>
                        <Form.Select value={surveillantForm.pays} onChange={(e) => setSurveillantForm({ ...surveillantForm, pays: e.target.value })}>
                          <option value="">Sélectionner un pays</option>
                          {paysOptions.map((pays, index) => (
                            <option key={index} value={pays}>{pays}</option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={4}>
                        <Form.Label>Surveillant</Form.Label>
                        <Form.Select value={surveillantForm.nom} onChange={(e) => setSurveillantForm({ ...surveillantForm, nom: e.target.value })}>
                          <option value="">Sélectionner un surveillant</option>
                          {surveillantOptions.map((nom, index) => (
                            <option key={index} value={nom}>{nom}</option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={4} className="d-flex align-items-end">
                        <Button onClick={() => setSurveillants([...surveillants, surveillantForm])}>Ajouter</Button>
                      </Col>
                    </Row>
                    {surveillants.length > 0 && (
                      <Table bordered>
                        <thead><tr><th>Pays</th><th>Surveillant</th><th>Actions</th></tr></thead>
                        <tbody>
                          {surveillants.map((s, index) => (
                            <tr key={index}>
                              <td>{s.pays}</td><td>{s.nom}</td>
                              <td><Button variant="danger" size="sm" onClick={() => removeSurveillant(index)}>Supprimer</Button></td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </div>
                )}

                {/* Onglet Qualification d’arrivage */}
                {activeTab === "qualificationArrivage" && (
                  <div className="space-y-6">
                    <Row className="mb-3">
                      <Col md={4}><Form.Label>Date</Form.Label><Form.Control type="date" name="dateQualification" value={qualificationForm.date} onChange={(e) => setQualificationForm({ ...qualificationForm, date: e.target.value })} /></Col>
                      <Col md={2} className="d-flex align-items-end">
                        <Form.Check
                          type="checkbox"
                          label="Qualité Conforme"
                          checked={qualificationForm.conforme}
                          onChange={(e) => setQualificationForm({ ...qualificationForm, conforme: e.target.checked })}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6}><Form.Label>Commentaire</Form.Label><Form.Control as="textarea" name="commentaire" rows={3} value={qualificationForm.commentaire} onChange={(e) => setQualificationForm({ ...qualificationForm, commentaire: e.target.value })} /></Col>
                      <Col md={3}>
                        <Form.Label>Type de pièce</Form.Label>
                        <Form.Select value={typePieceQualification} onChange={(e) => setTypePieceQualification(e.target.value)}>
                          <option value="">Sélectionner un type</option>
                          <option value="rapport">Rapport</option>
                          <option value="photo">Photo</option>
                        </Form.Select>
                      </Col>
                      <Col md={3} className="d-flex align-items-end">
                        <Button onClick={handleUploadClick} disabled={typePieceQualification === ""} className="w-100 bg-primary text-white">
                          <BsUpload className="me-2" /> Upload
                        </Button>
                        <Form.Control type="file" ref={fileInputRef} name="documentQualification" style={{ display: "none" }} />
                      </Col>
                    </Row>
                    {/* Liste des qualifications */}
                    {qualificationHistorique.length > 0 && (
                      <Table bordered>
                        <thead><tr><th>Date</th><th>Conforme</th><th>Commentaire</th></tr></thead>
                        <tbody>
                          {qualificationHistorique.map((q, i) => (
                            <tr key={i}><td>{q.date}</td><td>{q.conforme ? "Oui" : "Non"}</td><td>{q.commentaire}</td></tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </div>
                )}
</div>

              <div className="text-end mb-4  mt-10">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate(-1)}
                >
                  Annuler
                </button>
                <Button type="submit">Créer l'arrivage</Button>
              </div>
            </Form>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default AddArrivage;
