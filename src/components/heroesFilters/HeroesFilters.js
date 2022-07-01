// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  changeActiveFilter,
} from '../../actions';
import classnames from 'classnames';
import { useHttp } from '../../hooks/http.hook';
import Spinner from '../spinner/Spinner';

import './HeroesFilters.scss';

const buttons = [
  { id: 'All', label: 'Все', classNames: 'btn btn-outline-dark active' },
  { id: 'fire', label: 'Огонь', classNames: 'btn btn-danger' },
  { id: 'water', label: 'Вода', classNames: 'btn btn-primary' },
  { id: 'wind', label: 'Ветер', classNames: 'btn btn-success' },
  { id: 'earth', label: 'Земля', classNames: 'btn btn-secondary' },
];

const HeroesFilters = () => {
  const { filters, filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request('http://localhost:3001/filters')
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (filtersLoadingStatus === 'loading') {
    return (
      <div className='card shadow-lg border shadow-lg mt-4 pb-4 HeroesFilters'>
        <Spinner />
      </div>
    );
  } else if (filtersLoadingStatus === 'error') {
    return (
      <div className='card shadow-lg border shadow-lg mt-4 pb-4 HeroesFilters'>
        <h5 className='text-center mt-5 label-class text-danger'>
          Ошибка загрузки
        </h5>
      </div>
    );
  }

  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h5 className='text-center mt-5'>Фильтры не найдены</h5>;
    }

    return arr.map(({ name, label, className }) => {
      const btnClasses = classnames('btn', className, {
        'border-warning border-3': name === activeFilter,
      });

      return (
        <button
          onClick={() => dispatch(changeActiveFilter(name))}
          key={name}
          className={btnClasses}
          type='button'
        >
          {label}
        </button>
      );
    });
  };

  const elements = renderFilters(filters);

  return (
    <div className='card shadow-lg border shadow-lg mt-4 HeroesFilters'>
      <div className='card-body'>
        <p className='card-text label-class'>
          Отфильтруйте героев по элементам
        </p>
        <div className='btn-group'>{elements}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
