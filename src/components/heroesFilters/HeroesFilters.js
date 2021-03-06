// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilters } from './FiltersSlice';
import { changeActiveFilter } from './FiltersSlice';
import classnames from 'classnames';
import Spinner from '../spinner/Spinner';

import './HeroesFilters.scss';

const HeroesFilters = () => {
  const { filters, filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
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
