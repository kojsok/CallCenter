import { selectActiveComponent } from "@/store/clientsSlices/switcherSlice";
import { useSelector } from "react-redux";
import ClientCard from "../ClientCard/ClientCard";
import ClientsForm from "../ClientsForm/ClientsForm";
import EmptyCard from "../ClientCard/EmptyCard";

const ClientViewContainer = () => {
  const activeComponent = useSelector(selectActiveComponent)
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

export default ClientViewContainer;