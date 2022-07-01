// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useHttp } from '../../hooks/http.hook';
import { v4 as uuidv4 } from 'uuid';
import { addHero } from '../../actions';

import './HeroesAddForm.scss';

function validate(values) {
  const { name, description, element } = values;
  const errors = {};

  if (!name) {
    errors.name = 'Заполните поле ввода.';
  } else if (name.length < 3) {
    errors.name = 'Минимум 3 символа.';
  }

  if (!description) {
    errors.description = 'Заполните поле ввода.';
  } else if (description.length < 5) {
    errors.description = 'Минимум 5 символов.';
  }

  if (!element) {
    errors.element = 'Необходимо выбрать скилл!';
  }

  return errors;
}

const HeroesAddForm = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();

  const addNewHero = useCallback(
    (values) => {
      const id = uuidv4();
      values.id = id;
      request(`http://localhost:3001/heroes/`, 'POST', JSON.stringify(values))
        .then((data) => console.log(data, `Hero "${values.name}" added`))
        .then(() => dispatch(addHero(values)))
        .catch((err) => console.log(err));
    },
    // eslint-disable-next-line
    [request]
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      element: '',
    },
    validate,
    onSubmit: (values) => {
      addNewHero(values);
      formik.resetForm();
    },
  });

  return (
    <form
      className='border p-4 shadow-lg rounded HeroesAddForm'
      onSubmit={formik.handleSubmit}
    >
      <div className='wrapper-name'>
        <label htmlFor='name' className='form-label fs-4 label-class'>
          Имя нового героя
        </label>
        <input
          id='name'
          type='text'
          name='name'
          className='form-control'
          placeholder='Как меня зовут?'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className='formik-error formik-error-inner'>
            {formik.errors.name}
          </div>
        ) : null}
      </div>

      <div className='wrapper-text'>
        <label htmlFor='description' className='form-label fs-4 label-class'>
          Описание
        </label>
        <textarea
          name='description'
          className='form-control'
          id='description'
          placeholder='Что я умею?'
          style={{ height: '130px' }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className='formik-error formik-error-inner'>
            {formik.errors.description}
          </div>
        ) : null}
      </div>

      <div className='wrapper-element'>
        <label htmlFor='element' className='form-label label-class'>
          Выбрать элемент героя
        </label>
        <select
          className='form-select'
          id='element'
          name='element'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.element}
        >
          <option>Я владею элементом...</option>
          <option value='fire'>Огонь</option>
          <option value='water'>Вода</option>
          <option value='wind'>Ветер</option>
          <option value='earth'>Земля</option>
        </select>
        {formik.touched.element && formik.errors.element ? (
          <div className='formik-error formik-error-inner'>
            {formik.errors.element}
          </div>
        ) : null}
      </div>

      <button type='submit' className='btn btn-danger label-class'>
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
