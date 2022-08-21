import { useState } from 'react';

import ErrorBoundary from "../../Common/ErrorBoundary/ErrorBoundary";
import RandomChar from "../../randomChar/RandomChar";
import CharList from "../../charList/CharList";
import CharInfo from "../../charInfo/CharInfo";
import CharForm from '../../charForm/CharForm';


const MainPage = () => {

  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>

      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>


          <div>
            <CharInfo charId={selectedChar} />
            <CharForm />
          </div>
  
      </div>
    </>
  );
};

export default MainPage
