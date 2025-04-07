import React, {useState} from 'react'
// import Select from 'react-select';
import {PageTitle} from '../../../../_metronic/layout/core'
import { Form } from 'formik'


const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const AddArrivagePage = () => {
  // const [selectedOption, setSelectedOption] = useState(null);
  // const handleChange = (selectedOption) => {
  //   setSelectedOption(selectedOption);
  //   console.log(`Option sélectionnée :`, selectedOption);
  // };
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
              <label className='form-label'>Description</label>
              <input type='text' className='form-control' placeholder="Description de l'arrivage" />
            </div>
            <div className='mb-10 d-flex'>
              <div className='mb-10 flex-star'>
                <label className='form-label'>Description</label>
                <input type='text' className='form-control' placeholder="Description de l'arrivage" />
              </div>
              <div className='mb-10 flex-center'>
                <label className='form-label'>Date d'arrivée</label>
                <input type='date' className='form-control' placeholder="Date d'arrivée" />
              </div>
            </div>
            <div className='mb-10'>
              <label className='form-label'>Quantité</label>
              <input type='number' className='form-control' placeholder='Quantité' />
            </div>

            {/* <Select
              value={selectedOption}
              onChange={handleChange}
              options={options}
              isSearchable={true}
              placeholder="Sélectionnez une option..."
            /> */}
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
