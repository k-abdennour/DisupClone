import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import { Form } from 'formik'

const AddArrivagePage: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Création d'arrivage</PageTitle>

      <div className='card card-custom card-stretch'>
        <div className='card-body'>
          <div className='text-start'>
            <h1>Création d'arrivage</h1>
            <p>Formulaire de création d'arrivage</p>
          </div>
          {/* <Form className='form'> */}
            <div className='mb-10'>
              <label className='form-label'>Nom de l'arrivage</label>
              <input type='text' className='form-control' placeholder="Nom de l'arrivage" />
            </div>
            <div className='mb-10'>
              <label className='form-label'>Date d'arrivée</label>
              <input type='date' className='form-control' placeholder="Date d'arrivée" />
            </div>
            <div className='mb-10'>
              <label className='form-label'>Quantité</label>
              <input type='number' className='form-control' placeholder='Quantité' />
            </div>
            <button type='submit' className='btn btn-primary'>Créer</button>
          {/* </Form> */}
        </div>
      </div>
    </>
  )
}

// export default AddArrivagePage
// import React, {FC} from 'react'
// import {PageTitle} from '../../../../_metronic/layout/core'
// import { Form } from 'formik'

// const AddArrivagePage: FC = () => {
//   return (
//     <>
//       <PageTitle breadcrumbs={[]}>Création d'arrivage</PageTitle>

//       <div className='card card-custom card-stretch'>
//         <div className='card-body'>
//           <div className='text-start'>
//             <h1>Création d'arrivage</h1>
//             <p>Formulaire de création d'arrivage</p>
//           </div>
//           {/* <Form className='form'> */}
//             <div className='mb-10'>
//               <label className='form-label'>Nom de l'arrivage</label>
//               <input type='text' className='form-control' placeholder="Nom de l'arrivage" />
//             </div>
//             <div className='mb-10'>
//               <label className='form-label'>Date d'arrivée</label>
//               <input type='date' className='form-control' placeholder="Date d'arrivée" />
//             </div>
//             <div className='mb-10'>
//               <label className='form-label'>Quantité</label>
//               <input type='number' className='form-control' placeholder='Quantité' />
//             </div>
//             <button type='submit' className='btn btn-primary'>Créer</button>
//           {/* </Form> */}
//         </div>
//       </div>
//     </>
//   )
// }

export default AddArrivagePage
