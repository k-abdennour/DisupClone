
import {useIntl} from 'react-intl'
import {KTIcon} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
      />
      <AsideMenuItem to='/builder' icon='switch' title='Layout Builder' />
      <AsideMenuItem 
        to='/new_arrivage' 
        icon='<Ship className="h-5 w-5" /> '
        title='Arrivage'
        submenu={[
          { title: "Création d'arrivage", href: "/arrivage/creation" },
          { title: "Liste des arrivages", href: "/arrivage/liste" }
        ]}
      />
    </>
  )
}
