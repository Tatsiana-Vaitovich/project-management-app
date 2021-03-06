export interface User {
  id?: string;
  password?: string;
  name?: string;
  login?: string;
  token?: string;
}

export interface Board {
  id?: string;
  title?: string;
  description?: string;
  columns?: Array<Column>;
}

export interface Column {
  title?: string;
  order?: number;
  id?: string;
  idBoard?: string;
  tasks?: Array<Task>;
}

export interface Task {
  title?: string;
  done?: boolean;
  order?: number;
  description?: string;
  userId?: string;
  boardId?: string;
  columnId?: string;
  id?: string;
  files?: string;
}

export interface File {
  taskId?: string;
  file?: string; // бинарно
}

export enum ACTION_STATUSES {
  FULFILLED = 'FULFILLED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export type reqState = {
  entities: All[];
  loading: 'idle' | 'pending';
  signInStatus?: ACTION_STATUSES | null;
  signUpStatus?: ACTION_STATUSES | null;
  userRequestStatus?: ACTION_STATUSES | null;
  taskRequestStatus?: ACTION_STATUSES | null;
  boardRequestStatus?: ACTION_STATUSES | null;
  columnRequestStatus?: ACTION_STATUSES | null;
  currentRequestId: string | undefined;
  error: Error;
  currentBoard?: Board;
  currentTask?: Task;
  currentColumn?: Column;
};
export interface Error {
  status?: number;
  message?: string;
  visible?: boolean;
}

export interface All {
  id?: string;
  title?: string;
  description?: string;
  taskId?: string;
  file?: string; // бинарно
  done?: boolean;
  order?: number;
  userId?: string;
  boardId?: string;
  columnId?: string;
  files?: string;
  password?: string;
  name?: string;
  login?: string;
  token?: string;
  idBoard?: string;
  user?: string | unknown | object | never;
}

export interface ICreateElemFormProps {
  elemType: 'board' | 'column' | 'task';
}

// типы для борда
export interface divTypes {
  height?: string;
  isDragging?: boolean;
  isDraggingOver?: boolean | undefined;
  isDropDisabled?: boolean | undefined;
  isDraggingFrom?: boolean;
  isGroupedOver?: boolean | undefined;
  isClone?: boolean | undefined;
}
