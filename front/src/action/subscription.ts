const reloadContacts = `subscription reloadContact{
    reloadContact{
      id
      name
      lastName
      address
      email
      phones{
        phoneNumber
          phoneId
        userId
      }
      }
  } 
  `;

export default reloadContacts;