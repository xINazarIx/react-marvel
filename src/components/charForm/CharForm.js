import React, { useState } from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import useMarvelServices from '../../services/MarvelService';
import * as Yup from 'yup';
import Loader from '../Common/loader/Loader.js'

import './charForm.scss';
import { NavLink, Link } from 'react-router-dom';

const CharForm = () => {

  const [char, setChar] = useState(null)
  const {loading, error, getCharacterByName} = useMarvelServices()

  const onCharLoad = (name) => {
    getCharacterByName(name).then(setChar)
  }

  return (
    <Formik

      initialValues={{
        name: ''
      }}

      validationSchema={Yup.object({
        name: Yup.string().min(3, 'Минимум два символа').required('Заполните поле')})
      }

      onSubmit = {values => onCharLoad(values.name)}
    >

      {({errors, touched}) => {

        let stylesInput = 'charForm-input'

        if(errors.name && touched.name){
          stylesInput += ' charForm-input--invalid' 
        }else if(touched.name && !errors.name){
          stylesInput += ' charForm-input--valid' 
        }


        let loader = loading ? <Loader width={75} height={75} /> : null;
        let errorMessage = error ? <ErrorMessage /> : null
        let content;

        if(!(loading && error)){
          if(char != null && char != undefined){
            content = <div className='charForm-body'>
                        <h2 className='charForm-title charForm-title--green'>There is! Visit {char.name} page?</h2>
                        <Link to={`/${char.id}`} href='#' className='button button__secondary'>
                          <div className="inner">To Page</div> 
                        </Link>
                      </div>
          }else if(char === null){
            content = null
          }else if(char === undefined){
            content = <div className='charForm-body'>
                        <h2 className='charForm-title charForm-title--red'>The character was not found. Check the name and try again.</h2>
                      </div>
          }
        }

        return (
          <Form className='charForm'>
            <h2 className='charForm-title'>Or find a character by name:</h2>

            <div className='charForm-body'>
              <Field className={stylesInput} 
                type="text" 
                name="name" 
                id="name" 
                placeholder='Enter name'/>

              <button className="button button__main" type='submit'>
                <div className="inner">Find</div>
              </button>
            </div>

            {loader}
            {errorMessage}
            {content}
          </Form>
        )
      }}
      
    </Formik>
  );
};

export default CharForm;