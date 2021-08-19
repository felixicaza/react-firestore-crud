/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
/* eslint-disable import/named */
/* eslint-disable arrow-parens */
/* eslint-disable no-console */
/* eslint-disable no-alert */

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LinkForm from './LinkForm';

import firestoreDB from '../firebase-config';

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState('');

  const linksHandler = async linkObj => {
    try {
      if (currentId === '') {
        await firestoreDB.collection('links').doc().set(linkObj);

        toast('Link Added', {
          type: 'success'
        });
      } else {
        await firestoreDB.collection('links').doc(currentId).update(linkObj);

        toast('Link Updated', {
          type: 'info'
        });

        setCurrentId('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteLinks = async id => {
    if (window.confirm('You want delete this link?')) {
      await firestoreDB.collection('links').doc(id).delete();

      toast('Link Deleted', {
        type: 'error',
        autoclose: 2000
      });
    }
  };

  const getLinks = () => {
    firestoreDB.collection('links').onSnapshot(querySnapshot => {
      const docs = [];
      querySnapshot.forEach(doc => {
        docs.push({ ...doc.data(), id: doc.id });
      });

      setLinks(docs);
    });
  };

  useEffect(() => getLinks(), []);

  return (
    <section className='min-h-screen bg-gray-100 py-20'>
      <section className='container mx-auto'>
        <h1 className='text-5xl text-center text-gray-600 mb-5'>Save URL</h1>
        <p className='text-center text-xl text-gray-500'>
          Made by&nbsp;
          <a
            className='text-indigo-500 hover:underline transition-all'
            href='https://felixicaza.com'
            target='_blank'
            rel='noreferrer'
          >
            Felix Icaza
          </a>
        </p>
        <p className='text-center text-gray-500 mb-5'>
          View&nbsp;
          <a
            className='text-indigo-500 hover:underline transition-all'
            href='https://github.com/Felix-Icaza/react-firestore-crud'
            target='_blank'
            rel='noreferrer'
          >
            source code on GitHub
          </a>
        </p>
        <section className='container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300'>
          <LinkForm {...{ linksHandler, currentId, links }} />
        </section>
        <section className='flex flex-wrap md:justify-center overflow-hidden mt-10'>
          {links.map(link => (
            <article
              className='w-full mb-8 md:w-80 md:mr-8 py-4 px-8 bg-white shadow-lg rounded-lg'
              key={link.id}
            >
              <h2 className='text-gray-800 text-3xl font-semibold'>
                {link.sitename}
              </h2>
              <p className='my-2 text-gray-600'>{link.description}</p>
              <a
                className='font-medium text-indigo-500 block'
                href={link.url}
                target='_blank'
                rel='noreferrer'
              >
                {link.url}
              </a>
              <section className='mt-4'>
                <button
                  className='pr-5 py-3 rounded-xl text-sm font-medium text-red-700 bg-white outline-none focus:outline-none border-4 border-transparent hover:text-red-900 transition-all'
                  onClick={() => deleteLinks(link.id)}
                >
                  Delete URL
                </button>
                <button
                  className='pr-5 py-3 rounded-xl text-sm font-medium text-blue-700 bg-white outline-none focus:outline-none border-4 border-transparent hover:text-blue-900 transition-all'
                  onClick={() => setCurrentId(link.id)}
                >
                  Edit URL
                </button>
              </section>
            </article>
          ))}
        </section>
      </section>
    </section>
  );
};

export default Links;
