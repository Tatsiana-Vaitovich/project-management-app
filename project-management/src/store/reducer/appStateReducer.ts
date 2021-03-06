import i18n from '../../services/i18n';
import {
  ActionKindAppState,
  SET_CURRENT_BOARD_ID,
  SET_DELETED_ID,
  SET_DELETED_ITEM,
  SET_IS_CONFIRM_MODAL_OPEN,
  SET_IS_CREATE_COLUMN_MODAL_OPEN,
  SET_IS_CREATE_NEW_BOARD_MODAL_OPEN,
  SET_IS_CREATE_TASK_MODAL_OPEN,
  SET_IS_EDIT_PROFILE_MODAL_OPEN,
  SET_IS_EDIT_TASK_MODAL_OPEN,
  SET_IS_PRELOADER_OPEN,
  SET_LANG,
} from '../actionTypes';

interface IAppState {
  isEditProfileModalOpen: boolean;
  isCreateTaskModalOpen: boolean;
  isCreateColumnModalOpen: boolean;
  isCreateNewBoardModalOpen: boolean;
  isPreloaderOpen: boolean;
  isConfirmModalOpen: boolean;
  deletedItem?: 'board' | 'task' | 'user' | 'column' | null;
  deletedId?: string | null;
  currentBoardId: string | null;
  lang: 'en' | 'ru';
  isEditTaskModalOpen: boolean;
}

const getLang = () => {
  const lang = i18n.language;
  return lang === 'ru-RU' || lang === 'ru' ? 'ru' : 'en';
};

const initialState: IAppState = {
  isCreateNewBoardModalOpen: false,
  isCreateColumnModalOpen: false,
  isCreateTaskModalOpen: false,
  isPreloaderOpen: false,
  isEditProfileModalOpen: false,
  isConfirmModalOpen: false,
  currentBoardId: null,
  lang: getLang(),
  isEditTaskModalOpen: false,
};

interface IAction {
  type: ActionKindAppState;
  payload?: boolean | string | null;
}

function appStateReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case SET_IS_CREATE_NEW_BOARD_MODAL_OPEN: {
      return {
        ...state,
        isCreateNewBoardModalOpen: action.payload as boolean,
      };
    }
    case SET_IS_CREATE_TASK_MODAL_OPEN: {
      return {
        ...state,
        isCreateTaskModalOpen: action.payload as boolean,
      };
    }
    case SET_IS_CREATE_COLUMN_MODAL_OPEN: {
      return {
        ...state,
        isCreateColumnModalOpen: action.payload as boolean,
      };
    }
    case SET_IS_EDIT_TASK_MODAL_OPEN: {
      return {
        ...state,
        isEditTaskModalOpen: action.payload as boolean,
      };
    }
    case SET_IS_PRELOADER_OPEN: {
      return {
        ...state,
        isPreloaderOpen: action.payload as boolean,
      };
    }
    case SET_IS_EDIT_PROFILE_MODAL_OPEN: {
      return {
        ...state,
        isEditProfileModalOpen: action.payload as boolean,
      };
    }
    case SET_IS_CONFIRM_MODAL_OPEN: {
      return {
        ...state,
        isConfirmModalOpen: action.payload as boolean,
      };
    }
    case SET_DELETED_ITEM: {
      return {
        ...state,
        deletedItem: action.payload as 'user' | 'board' | 'task' | null,
      };
    }
    case SET_DELETED_ID: {
      return {
        ...state,
        deletedId: action.payload as string,
      };
    }
    case SET_CURRENT_BOARD_ID: {
      return {
        ...state,
        currentBoardId: action.payload as string,
      };
    }
    case SET_LANG: {
      return {
        ...state,
        lang: action.payload as 'ru' | 'en',
      };
    }
    default: {
      return state;
    }
  }
}

export default appStateReducer;
