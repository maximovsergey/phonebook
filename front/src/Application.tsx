import React, { Component } from "react";
import PhoneTable from "./components/PhoneTable";
import { getGraphQlClient } from "./action/graphqlClient";
import AddContact from "./components/AddContact";
import { addContact, deleteContact, updateContactById } from "./action/mutation";
import reloadContacts from "./action/subscription";
import getAllUsers, { getUserbyId } from "./action/query";
import EditContact from "./components/EditContact";
import { AddContactType } from "./type/AddContactType";


export class Application extends Component {
    state = {
        data: [],
        phones: [0],
        contact: {},
        visible: false,
        isEdit: false,
    }
    componentDidMount() {
        getGraphQlClient().request(getAllUsers).then((data: any) => {
            this.setState({
                data: data.users,
            })
        })
    }

    public onChangePhones = (num: number[]) => {
        this.setState({
            phones: num,
        })
    }

    public setEdit = (b: boolean) => {
        this.setState({
            isEdit: b,
        })
    }

    public onCloseModal = () => {
        this.setState({
            contact: {},
            visible: false,
            phones: [0]
        })
    }

    public onEditContact = async (id: string) => {
        await getGraphQlClient().request(getUserbyId, { id }).then((data: any) => {
            this.setState({
                contact: data.getUserbyId,
            })
        })
    }

    public onAddContact = async (input: AddContactType) => {
        await getGraphQlClient().request(addContact, { input }).then(async () => {
            await getGraphQlClient().request(reloadContacts).then((data: any) => {
                this.setState({
                    data: data.reloadContact,
                    phones: [0],
                })
            })
        });
    }

    public onUpdateContact = async (id: string, input: any) => {
        await getGraphQlClient().request(updateContactById, { id, input }).then(async () => {
            await getGraphQlClient().request(reloadContacts).then((data: any) => {
                this.setState({
                    data: data.reloadContact
                })
            })
        })
    }

    public onDeleteContact = async (id: string) => {
        await getGraphQlClient().request(deleteContact, { id }).then(async () => {
            await getGraphQlClient().request(reloadContacts).then((data: any) => {
                this.setState({
                    data: data.reloadContact,
                })
            });
        });
    }

    public showModal = (isShow: boolean, id?: string) => {
        this.setState({
            visible: isShow,
        })
        if (id && id !== '') {
            this.onEditContact(id);
            this.setEdit(true);
        }
    }

    public render() {
        const { data } = this.state;
        return (
            this.state.data.length > 0 ?
                <div>
                    <div
                        style={{
                            marginLeft: '10%',
                            marginBottom: '20px',
                            marginTop: '20px'
                        }}
                    >
                        <AddContact
                            phones={this.state.phones}
                            onAddContact={(input: AddContactType) => this.onAddContact(input)}
                            onChangePhones={(n: number[]) => this.onChangePhones(n)}
                        />
                        <EditContact
                            contact={this.state.contact ? this.state.contact : undefined}
                            onUpdateContact={(id: string, input: any) => this.onUpdateContact(id, input)}
                            phones={this.state.phones}
                            visible={this.state.visible}
                            setEdit={(b: boolean) => this.setEdit(b)}
                            isEdit={this.state.isEdit}
                            showModal={(isShow: boolean, id?: string) => this.showModal(isShow, id)}
                            onCloseModal={() => this.onCloseModal()}
                        />
                    </div>
                    <div>
                        <PhoneTable
                            data={data}
                            onDeleteContact={(id) => this.onDeleteContact(id)}
                            showModal={(isShow: boolean, id: string) => this.showModal(isShow, id)}
                        />
                    </div>
                </div> : <></>
        );
    }
}