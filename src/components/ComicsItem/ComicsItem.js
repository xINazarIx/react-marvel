import { Link } from 'react-router-dom';

import '../comicsList/comicsList.scss';

const ComicsItem = ({ id, img, url, desc, price }) => {
  return (
    <li className="comics__item">
      <Link to={`/comics/${id}`} href={url}>
        <img src={img} alt="ultimate war" className="comics__item-img" />
        <div className="comics__item-name">{desc}</div>
        <div className="comics__item-price">{price == '' ? null : `${price}$`}</div>
      </Link>
    </li>
  );
};

export default ComicsItem;
