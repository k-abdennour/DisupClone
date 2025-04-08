import { useIntl } from 'react-intl';
import { KTIcon } from '../../../helpers';
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub';
import { AsideMenuItem } from './AsideMenuItem';

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
      />
      <AsideMenuItem to="/builder" icon="switch" title="Layout Builder" /> */}
      <AsideMenuItemWithSub
        to="#"
        icon="shield-tick"
        title="Gestion des référentiels "
        isCollapsed={isCollapsed}
      >
        <AsideMenuItemWithSub
          to="#"
          icon="shield-tick"
          title="Gestion des Fournisseurs"
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
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>
    </>
  );
}