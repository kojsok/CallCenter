import { closeCardDrawer, selectActiveComponent, selectCardDrawerState } from "@/store/clientsSlices/switcherSlice";
import { useDispatch, useSelector } from "react-redux";
import ClientCard from "../ClientCard/ClientCard";
import ClientsForm from "../ClientsForm/ClientsForm";
import EmptyCard from "../ClientCard/EmptyCard";
import { Button, Drawer, useMediaQuery } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const ClientViewContainer = () => {
  const activeComponent = useSelector(selectActiveComponent)
  const dispatch = useDispatch()
  const match = useMediaQuery('(min-width: 976px)')
  //управление drawer 3-го блока
  const handleDrawerClose = () => dispatch(closeCardDrawer())
  const drawerState = useSelector(selectCardDrawerState)

  // получение активного компонента
  const getActive = () => {
    switch (activeComponent) {
      case 'client-card': {
        return <ClientCard />
      }

      case 'edit-form': {
        return <ClientsForm formType="edit-form" />
      }
      case 'add-form': {
        return <ClientsForm formType="add-form" />
      }
      default: {
        return <EmptyCard />
      }
    }
  }
  return (
    <Drawer
      onClose={handleDrawerClose}
      open={drawerState}
      variant={match ? 'permanent' : 'temporary'}
      anchor="right"
      sx={{
        "& .MuiDrawer-paper": {
          position: 'relative',
          backgroundColor: 'var(--appBg05)',
          backdropFilter: 'blur(20px)',
          gap: '30px',
          p: 4
        },
        ...match && {
          height: '100%',
          "& .MuiDrawer-paper": {
            position: 'relative',
            backgroundColor: 'transparent'
          }
        },
      }}
    >
      <Button variant="outlined" sx={{ alignSelf: 'flex-start', ...match && { display: 'none' } }} onClick={handleDrawerClose}>
        <CloseIcon />
      </Button>
      {getActive()}
    </Drawer>
  )
}

export default ClientViewContainer;