import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import store, { AppDispatch, useAppSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../store/action/appStateAction';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ACTION_STATUSES, Error } from '../../typings/typings';
import qs from 'qs';
import { getUsers } from '../../api/userApi';
import { authSlise } from '../../api/authApi';
export interface ILoginValues {
  password: string;
  login: string;
}

type RootUser = {
  id?: string;
  email?: string;
  password?: string;
  name?: string;
  login?: string;
};
interface UseRegistrationReturnValues {
  initialValues: ILoginValues;
  loginLabel: string;
  passLabel: string;
  isButtonDisabled: boolean;
  requestStatus: ACTION_STATUSES;
  requestError: Error;
  validateForm: (values: ILoginValues) => void;
  setEmail: Dispatch<SetStateAction<string>>;
}

export const useLoginPage = (): UseRegistrationReturnValues => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const requestStatus = useAppSelector((state) => state.auth.signInStatus);
  const requestError = useAppSelector((state) => state.auth.error);
  const currentUser = useAppSelector((state) => state.user);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const loginLabel = t('login:email');
  const passLabel = t('login:password');
  const { search } = useLocation();
  const [email, setEmail] = useState<string>('');
  const { resetStatuses } = authSlise.actions;

  useEffect(() => {
    dispatch(getUsers());
    const qwe = store.getState().user;
    const params = qs.stringify({ isUserActivated: true });
    if (requestStatus === ACTION_STATUSES.FULFILLED) {
      const dataAwtorizeUser = qwe.entities.find((el: RootUser) => {
        return el.login === email;
      });
      navigate(`/?${params}`);
      const awtorizUserData: RootUser = dataAwtorizeUser || {};
      dispatch(setUserData(awtorizUserData));
      dispatch(resetStatuses());
    }
  }, [requestStatus, search]);

  const initialValues: ILoginValues = {
    login: '',
    password: '',
  };

  const validateForm = (values: ILoginValues): void => {
    setEmail(values.login);
    if (values.login && values.password) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  return {
    initialValues,
    loginLabel,
    passLabel,
    isButtonDisabled,
    requestStatus: requestStatus as ACTION_STATUSES,
    requestError: requestError as Error,
    validateForm,
    setEmail,
  };
};
