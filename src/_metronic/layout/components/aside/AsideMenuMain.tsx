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
      <AsideMenuItem
        to="/dashboard"
        icon="element-11"
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
      />
      <AsideMenuItem to="/builder" icon="switch" title="Layout Builder" />
      <AsideMenuItemWithSub
        to="#"
        icon="shield-tick"
        title="Gestion d'arrivage"
        isCollapsed={isCollapsed}
      >
        <AsideMenuItem
          to="/new_arrivage"
          icon="plus"
          title="Création d'arrivage"
          isCollapsed={isCollapsed}
        />
        <AsideMenuItem
          to="/ListArrivages"
          icon="list"
          title="Liste des arrivages"
          isCollapsed={isCollapsed}
        />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to="#"
        icon="shield-tick"
        title="Gestion de pays"
        isCollapsed={isCollapsed}
      >
        <AsideMenuItem
          to="/AddPays"
          icon="plus"
          title="Création d'un pays"
          isCollapsed={isCollapsed}
        />
        <AsideMenuItem
          to="/ListPays"
          icon="list"
          title="Liste des pays"
          isCollapsed={isCollapsed}
        />
      </AsideMenuItemWithSub>
    </>
  );
}