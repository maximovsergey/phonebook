export const getAllUsers = `query getAllUsers{
  users{
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
export const getUserbyId = `query getUserbyId($id: String){
  getUserbyId(id: $id){
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

export default getAllUsers;