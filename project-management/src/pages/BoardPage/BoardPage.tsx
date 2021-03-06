import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/reducer';
import { BasicAlerts } from '../../components/compunents';
import { ACTION_STATUSES } from '../../typings/typings';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
  setIsCreateColumnModalOpen,
  setIsCreateTaskModalOpen,
  setIsPreloaderOpen,
} from '../../store/action/appStateAction';
import { boardSlise, getBoardsById } from '../../api/boardApi';
import Board from '../../components/ForBoards/Board';
import { authorQuoteMap } from '../../components/ForBoards/testData';
import MockBoard from '../../components/MockBoard/MockBoard';

function BoardPage() {
  const appDispatch = useDispatch<AppDispatch>();
  const appState = useSelector((state: RootState) => state.appState);
  const boardRequestError = useSelector((state: RootState) => state.board.error) as Error;
  const boardRequestStatus = useSelector((state: RootState) => state.board.boardRequestStatus);
  const boardState = useSelector((state: RootState) => state.board);
  const { setBoard, resetBoardRequestStatus } = boardSlise.actions;
  const { t } = useTranslation();

  const onAddColumn = () => {
    appDispatch(setIsCreateColumnModalOpen(true));
  };

  const onAddRow = () => {
    appDispatch(setIsCreateTaskModalOpen(true));
  };

  const getBoard = async () => {
    appDispatch(setIsPreloaderOpen(true));
    const resp = await appDispatch(getBoardsById(appState.currentBoardId!));
    appDispatch(setIsPreloaderOpen(false));
    if (resp.meta.requestStatus === 'fulfilled') {
      appDispatch(resetBoardRequestStatus());
    }
  };

  useEffect(() => {
    getBoard();
  }, [appDispatch]);

  return (
    <>
      {boardRequestStatus === ACTION_STATUSES.REJECTED ? (
        <BasicAlerts error={boardRequestError} />
      ) : (
        <Box
          sx={{
            minHeight: '100wh',
            display: 'flex',
            flexDirection: 'column',
            columnGap: 1,
            mt: 1,
            justifyContent: 'flex-start',
          }}
        >
          <Box sx={{ display: 'flex', margin: '0 0 0 0.5rem' }}>
            <Button sx={{ mr: 1 }} variant="outlined" disabled={false} onClick={onAddColumn}>
              {t('boardPage:addColumn')}
            </Button>
            <Button sx={{ mr: 1 }} variant="outlined" disabled={false} onClick={onAddRow}>
              {t('boardPage:addRow')}
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              height: '300px',
            }}
          >
            <Board initial={authorQuoteMap} isCombineEnabled />
          </Box>
          {boardState.currentBoard !== undefined && (
            <MockBoard board={boardState.currentBoard!}></MockBoard>
          )}
        </Box>
      )}
    </>
  );
}

export default BoardPage;
