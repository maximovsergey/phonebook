import React, { Component } from 'react';
import { GraphQLClient } from 'graphql-request';
import { Spin } from 'antd';

class App extends Component {

  getGraphQLClient = () => {
    return new GraphQLClient('http://localhost:4000/graphql', {
      headers: {
        authentification: true,
      }
    })
  }

  getAllUsers = () => `query getAllUsers {
    users{
      id
      name
      email
      userPhones
    }
  }
  `;
  state = {
    name: '',
    email: '',
    users: [],
  };
  componentDidMount() {
    this.getGraphQLClient().request(this.getAllUsers()).then(data => {
      this.setState({
        users: data.users,
      })
    })
  }


  render() {
    // const query = `query hello {
    //   getData
    // }
    // `;

    /**
     * Запрос на получение всех пользователей
     */


    const addUser = `mutation addUser(
      $name: String
      $email: String
    ) {
      addUser(
        name: $name
        email: $email
      ){
        id
        name
        email
      }
    }
      `;

    const addPhoneNumber = `mutation addPhoneNumber(
      $id: String
      $phoneNumber: String  
      ){
        addPhoneNumber(
          id: $id
          phoneNumber: $phoneNumber  
        ){
          phoneId
          userId
          phoneNumber
        }
      }
      `;


    return (

      <div className="App">
        <table>
          {this.state.users.length > 0 ? this.state.users.map(el => {
            return <tr key={el.id}>
              <td>{el.name}</td>
              {el.userPhones.length > 0 ? el.userPhones.map(phone => {
                return <td key={phone}>
                  {phone}
                </td>
              }) : <td>Нет данных</td>}
            </tr>
          }) : <Spin size="large" />}
        </table>
        <input
          placeholder="Введите имя"
          onChange={e => {
            this.setState({
              name: e.target.value,
            });
          }
          }></input>
        <input
          placeholder="Введите email"
          onChange={e => {
            this.setState({
              email: e.target.value,
            });
          }
          }></input>
        <button
          onClick={() => {
            this.getGraphQLClient().request(addUser, { name: this.state.name, email: this.state.email }).then(data => {
            })
          }}
        >add Users</button>
        <button
          onClick={() => {
            this.getGraphQLClient().request(addPhoneNumber, { id: '4919fb40-65bb-11e9-bc96-431419f00c1f', phoneNumber: '89122223388345' }).then(data => {
            })

          }}
        >Добавить телефон</button>
      </div>

    );
  }
}

export default App;
