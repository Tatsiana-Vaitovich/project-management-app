import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../store/reducer/reducer';
import { setIsCreateNewBoardModalOpen } from '../../store/action/appStateAction';
import { CreateNewBoardForm } from '../compunents';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import './createNewBoardModal.scss';
import { useTranslation } from 'react-i18next';
import CreateNewBoardFormFormik from '../CreateNewBoardForm/CreateNewBoardFormFormik';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
// const modalStyle = {
//   bgcolor: '#fff',
// }

function CreateNewBoardModal() {
  const {t} = useTranslation();
  const appState = useSelector((state: RootState) => state.appState);
  const appDispatch = useDispatch();
  const handleClose = () => appDispatch(setIsCreateNewBoardModalOpen(false));

  return (
    <div >
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={appState.isCreateNewBoardModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 700,
        }}
        // sx={modalStyle}
      >
        <Fade in={appState.isCreateNewBoardModalOpen} >
          <Box sx={style}>
            <Box component='div' className="modal__title" sx={{mb: 2}}>
              <NoteAddOutlinedIcon color='primary' sx={{mr: 2}}></NoteAddOutlinedIcon>
              <Typography id="transition-modal-title" variant="h6" component="h4">
                {t('createNewBoardForm:formTitle')}
              </Typography>
            </Box>
            <CreateNewBoardFormFormik />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default CreateNewBoardModal;