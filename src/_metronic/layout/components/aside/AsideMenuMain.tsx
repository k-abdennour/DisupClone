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
      {/* <AsideMenuItem
        to="/dashboard"
        icon="element-11"
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
      /> */}
      {/* <AsideMenuItem to="/builder" icon="switch" title="Layout Builder" /> */}

      {/* <AsideMenuItemWithSub
        to="#"
        icon="shield-tick"
        title="Gestion des référentiels "
        isCollapsed={isCollapsed}
      >
      <AsideMenuItemWithSub
        to="#"
        icon="shield-tick"
        title="Gestion de pays"
        isCollapsed={isCollapsed}
      >
        <AsideMenuItem
          to="/AddPays"
          title="Création d'un pays"
          isCollapsed={isCollapsed}
        />
        <AsideMenuItem
          to="/pays"
          title="Liste des pays"
          isCollapsed={isCollapsed}
        />
      </AsideMenuItemWithSub>
      </AsideMenuItemWithSub> */}

      {/* Gestion d'arrivage */}
      <AsideMenuItemWithSub
        to="#"
        icon="shield-tick"
        title="Gestion d'arrivage "
        isCollapsed={isCollapsed}
      >
        <AsideMenuItem
          to="/planning"
          title="Planning d’arrivage"
          isCollapsed={isCollapsed}
        />
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

      {/* Pont à bascule  */}
      <AsideMenuItemWithSub
        to="#"
        icon="shield-tick"
        title="Pont à bascule "
        isCollapsed={isCollapsed}
      >
        <AsideMenuItem
          to="/shifts"
          title="Gestion des shifts "
          isCollapsed={isCollapsed}
        />
        <AsideMenuItem 
          to="/pesage" 
          title="Pesage" 
          isCollapsed={isCollapsed} 
        />
        <AsideMenuItem
          to="/parametrage"
          title="Parametrage"
          isCollapsed={isCollapsed}
        />
      </AsideMenuItemWithSub>
    </>
  );
}
