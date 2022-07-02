import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { fetchHeroes } from '../../actions';
import { deleteHero } from './HeroesSlice';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';
import './HeroesList.scss';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter, // filter - first agr
    (state) => state.heroes.heroes, // heroes - second agr
    (filter, heroes) => {
      if (filter === 'all') {
        return heroes;
      } else {
        return heroes.filter((hero) => hero.element === filter);
      }
    }
  );

  const filteredHeroes = useSelector(filteredHeroesSelector);

  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchHeroes(request));

    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then((data) => console.log(data, `Element №${id} Deleted`))
        .then(() => dispatch(deleteHero(id)))
        .catch((err) => console.log(err));
    },
    // eslint-disable-next-line
    [request]
  );

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className='text-center mt-5 text-white'>Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} classNames='hero'>
          <h5 className='text-center mt-5 text-white'>Героев пока нет</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition key={id} timeout={1000} classNames='hero'>
          <HeroesListItem {...props} onDelete={() => onDelete(id)} />
        </CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <TransitionGroup component='ul'>{elements}</TransitionGroup>;
};

export default HeroesList;
