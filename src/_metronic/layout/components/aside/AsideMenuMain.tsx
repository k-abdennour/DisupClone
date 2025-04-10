import { useIntl } from "react-intl";
import { KTIcon } from "../../../helpers";
import { AsideMenuItemWithSub } from "./AsideMenuItemWithSub";
import { AsideMenuItem } from "./AsideMenuItem";


interface AsideMenuMainProps {
  isCollapsed?: boolean;
}

export function AsideMenuMain({ isCollapsed = false }: AsideMenuMainProps) {
  const intl = useIntl();

  return (
    <>
     
      
        <AsideMenuItemWithSub
          to="#"
          icon="shield-tick"
          title="Gestion des Fournisseurs"
          isCollapsed={isCollapsed}
        >
          <AsideMenuItemWithSub
        to="#"
        icon="shield-tick"
        title="Gestion des référentiels "
        isCollapsed={isCollapsed}
      >

          <AsideMenuItem
            to="/addFournisseur"
            icon="plus"
            title="Création d'un Fournisseur"
            isCollapsed={isCollapsed}
          />
          <AsideMenuItem
            to="/liste_fournisseurs"
            icon="list"
            title="Liste des fournisseurs"
            isCollapsed={isCollapsed}
          />
        </AsideMenuItemWithSub>
        <AsideMenuItemWithSub
          to="#"
          icon="shield-tick"
          title="Gestion des pays"
          isCollapsed={isCollapsed}
        >
          <AsideMenuItem
            to="#"
            icon="plus"
            title="Création d'un pays"
            isCollapsed={isCollapsed}
          />
          <AsideMenuItem
            to="#"
            icon="list"
            title="Liste des pays"
            isCollapsed={isCollapsed}
          />
      <AsideMenuItemWithSub
        to="#"
        icon="shield-tick"
        title="Gestion d'arrivage "
        isCollapsed={isCollapsed}
      >
        <AsideMenuItem
          to="/addarrivage"
          title="Création d'arrivage"
          isCollapsed={isCollapsed}
        />
        <AsideMenuItem
          to="/arrivage"
          title="Liste des arrivages"
          isCollapsed={isCollapsed}
        />
      </AsideMenuItemWithSub>
    </>
  );
}

