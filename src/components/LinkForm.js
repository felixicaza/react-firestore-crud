/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable import/named */
/* eslint-disable arrow-parens */

import React, { useState, useEffect } from 'react';

import firestoreDB from '../firebase-config';

const LinkForm = props => {
  const initialStateValues = {
    url: '',
    sitename: '',
    description: ''
  };

  const [values, setValues] = useState(initialStateValues);

  const getValues = e => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const submitForm = e => {
    e.preventDefault();

    props.linksHandler(values);

    setValues({ ...initialStateValues });
  };

  const getLinkId = async id => {
    const linkId = await firestoreDB.collection('links').doc(id).get();

    setValues({ ...linkId.data() });
  };

  useEffect(() => {
    if (props.currentId === '') {
      setValues({ ...initialStateValues });
    } else {
      getLinkId(props.currentId);
    }
  }, [props.currentId]);

  return (
    <form className='py-12 p-10 bg-white rounded-xl' onSubmit={submitForm}>
      <section className='mb-4'>
        <label className='text-gray-700 font-bold block mb-2' htmlFor='url'>
          <p className='mb-1'>Add website URL</p>
          <input
            className='border bg-gray-100 py-2 px-4 w-full block outline-none focus:ring-2 focus:ring-indigo-400 rounded'
            type='url'
            name='url'
            id='url'
            placeholder='https://example.com/'
            onChange={getValues}
            value={values.url}
          />
        </label>
      </section>
      <section className='mb-4'>
        <label
          className='text-gray-700 font-bold block mb-2'
          htmlFor='sitename'
        >
          <p className='mb-1'>Add website name</p>
          <input
            className='border bg-gray-100 py-2 px-4 w-full block outline-none focus:ring-2 focus:ring-indigo-400 rounded'
            type='text'
            name='sitename'
            id='sitename'
            placeholder='Example website'
            onChange={getValues}
            value={values.sitename}
          />
        </label>
      </section>
      <section className='mb-6'>
        <label
          className='text-gray-700 font-bold block mb-2'
          htmlFor='description'
        >
          <p className='mb-1'>Add wesite description</p>
          <textarea
            className='border bg-gray-100 py-2 px-4 w-full block h-32 resize-none outline-none focus:ring-2 focus:ring-indigo-400 rounded'
            name='description'
            id='description'
            placeholder='Example website description'
            onChange={getValues}
            value={values.description}
          />
        </label>
      </section>
      <button
        className='w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300'
        type='submit'
      >
        {props.currentId === '' ? 'Save URL' : 'Update URL'}
      </button>
    </form>
  );
};

export default LinkForm;
