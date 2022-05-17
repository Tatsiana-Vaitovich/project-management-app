import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setIsCreateNewBoardModalOpen, setIsPreloaderOpen } from '../../store/action/appStateAction';
import './createNewBoardFormFormik.scss';

import { createBoard  } from '../../api/boardApi'
import { AppDispatch } from '../../store/store';

interface IValues {
  title: string;
  description: string;
}

function CreateNewBoardFormFormik() {
  const appDispatch = useDispatch<AppDispatch>();
  
  const {t} = useTranslation();
  const titleLabel = t('createNewBoardForm:boardTitle');
  const descriptionLabel = t('createNewBoardForm:boardDescription');
  const buttonText = t('createNewBoardForm:submit');
  const required = t('formValidation:required');
  const minValue = t('formValidation:minValue');
  const maxValue = t('formValidation:maxValue');

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const validateForm = (values: IValues): Partial<IValues> => {
    const errors: Partial<IValues> = {};
    setIsButtonDisabled(true);
    if (!values.title) {
      errors.title = required;
    } else if (values.title.length < 3) {
      errors.title = minValue;
    } else if (values.title.length > 12) {
      errors.title = maxValue;
    } else if (!values.description) {
      errors.description = required;
    }
    if (!errors.title && !errors.description) {
      setIsButtonDisabled(false);
    }
    return errors;
  }

  const initialValues = {
    title: '',
    description: '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={async (values: IValues, {setSubmitting}) => {
        setSubmitting(false);
        console.log(values);
        appDispatch(setIsCreateNewBoardModalOpen(false));
        appDispatch(setIsPreloaderOpen(true));
        const resp = await appDispatch(createBoard(values));
        console.log(resp);
        appDispatch(setIsPreloaderOpen(false));
        // Как тут вызывать функции к апи
        // const createBoardCard = appDispatch(getBoardsById('72f5c1a6-60dd-4e30-af83-009acada491f'))
        // console.log('createBoards', (await createBoardCard).payload);
        
        //todo обработать ошибку создания борды
      }}
    >
      {({ submitForm }) => (
        <Form className="form">
          <Field
            component={TextField}
            name="title"
            type="text"
            label={titleLabel}
            color="info"
          />
          <Field
            component={TextField}
            name="description"
            type="text"
            label={descriptionLabel}
            color="info"
          />
          <Button
            variant="outlined"
            color="info"
            disabled={isButtonDisabled}
            onClick={submitForm}
            type="submit"
          >
            {buttonText}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default CreateNewBoardFormFormik;