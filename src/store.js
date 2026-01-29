export const initialStore = () => {
  return {
    contacts: [],
    currentUser: {},

  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    
    // Definir la acción para establecer el usuario actual
    case "SET_USER":
      return {
        ...store,
        currentUser: action.payload 
      };

    // Definir la acción para establecer la lista de contactos
    case 'SET_CONTACTS':
      return {
        ...store,
        contacts: action.payload,
      };

    // Definir la acción para agregar un nuevo contacto
    case "ADD_CONTACT":
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
      };

    // Definir la acción para eliminar un contacto
    case "DELETE_CONTACT":
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload)
      };
    
    // Definir la acción para actualizar un contacto existente
    case "UPDATE_CONTACT":
      return {
        ...store,
        contacts: store.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };

    // Si no coincide ninguna acción, devolver el estado actual
    default:
      return store;
  }
}
