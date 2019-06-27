
const addContact = `mutation AddContact($input: AddContactInput){
    addContact(input: $input){
      id
      name
      lastName
      address
      email
      phones{
        phoneId
        userId
        phoneNumber
      }
    }
  } 
  `;
const updateContactById = `mutation UpdateContactById($id: String, $input: EditContactInput){
    updateContactById(id: $id, input: $input){
      id
      name
      lastName
      address
      email
      phones{
        phoneId
        userId
        phoneNumber
      }
    }
  } 
  `;
const deleteContact = `mutation DeleteContact($id: String!){
    deleteContact(id: $id){
      name
      lastName
    }
  }
  `;
export { addContact, deleteContact, updateContactById }
