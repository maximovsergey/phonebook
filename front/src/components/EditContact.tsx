import { Button, Modal, Input, Icon } from "antd";
import React, { Component } from "react";
import './AddContact.css';
import { PhoneType } from "../type/PhoneType";
import { EditContactInput } from "../type/EditContactInput";

interface EditContactProps {
    phones: number[];
    contact: any | undefined;
    visible: boolean;
    isEdit: boolean;
    setEdit: (b: boolean) => void;
    onCloseModal: () => void;
    showModal: (b: boolean, id?: string) => void;
    onUpdateContact: (id: string, input: any) => void;
}
interface EditContactState {
    visible: boolean;
    name: string;
    lastName: string;
    phone: string;
    phoneNumbers: PhoneType[];
    phoneNumbersEdit: string[];
    address: string;
    email: string;
}

class EditContact extends React.PureComponent<EditContactProps, EditContactState> {
    constructor(props: EditContactProps) {
        super(props);
        this.state = {
            visible: false,
            name: '',
            lastName: '',
            phone: '',
            phoneNumbers: [],
            phoneNumbersEdit: [],
            address: '',
            email: '',
        }
    }
    componentDidUpdate(prevProps: EditContactProps, prevState: EditContactState) {
        if (this.props.visible && this.props.contact.id && this.props.isEdit) {
            let phoneNumbersEdit: string[] = [];
            this.props.contact.phones.map((el: any) => {
                phoneNumbersEdit.push(el.phoneNumber);
            })
            this.setState({
                name: this.props.contact.name,
                lastName: this.props.contact.lastName,
                phoneNumbers: this.props.contact.phones,
                phoneNumbersEdit: phoneNumbersEdit,
                address: this.props.contact.address,
                email: this.props.contact.email,
            })
            this.props.setEdit(false);
        }
    }

    public renderFields = () => {
        let temp = this.props.contact.phones;
        const els = temp ? temp.map((el: any, ind: number) => {
            return (<Input className='addContact' placeholder='Телефон' key={`${el.phoneId}`}
                style={el + 1 === this.props.phones.length ? { marginLeft: '24px' } : {}}
                value={this.state.phoneNumbersEdit[ind]}
                onChange={(e) => {
                    let newArr = this.state.phoneNumbersEdit
                    let elem = this.state.phoneNumbersEdit[ind];
                    elem = e.target.value;
                    newArr[ind] = elem;
                    this.setState({
                        phoneNumbersEdit: newArr,
                        phone: elem
                    })
                }} />

            )
        }) : null
        return els;
    }

    public render() {
        return <div><Modal
            visible={this.props.visible}
            maskClosable={true}
            mask={true}
            closable={false}
            title='Изменить контакт'
            footer={<><Button
                onClick={() => {
                    this.props.onCloseModal();
                }}>Отмена
                        </Button>
                <Button
                    title={this.state.name === '' ? 'Введите имя' : ''}
                    disabled={this.state.name === ''}
                    onClick={async () => {
                        let newPhones: PhoneType[] = [];
                        for (let i = 0; i < this.state.phoneNumbers.length; i++) {
                            const phone = this.state.phoneNumbers[i];
                            const updatedPhone = this.state.phoneNumbersEdit[i];
                            let newPhone: PhoneType = new PhoneType();
                            newPhone.phoneId = phone.phoneId;
                            newPhone.phoneNumber = updatedPhone;
                            newPhone.userId = phone.userId;
                            newPhones.push(newPhone);
                        }
                        let input: EditContactInput = new EditContactInput();
                        input.name = this.state.name;
                        input.lastName = this.state.lastName;
                        input.phones = newPhones;
                        input.address = this.state.address;
                        input.email = this.state.email;

                        this.props.onUpdateContact(this.props.contact.id, input);
                        this.setState({
                            visible: false,
                            name: '',
                            lastName: '',
                            phone: '',
                            address: '',
                            email: '',
                        })
                        this.props.onCloseModal();
                    }}>
                    {'Изменить контакт'}
                </Button>
            </>}
        >
            <div>
                <Icon
                    type="user"
                    className='icon' />
            </div>
            <div style={{ width: '100%', textAlign: 'center' }}>

                <Input className='addContact' placeholder='Имя'
                    value={this.state.name}
                    onChange={(e) => {
                        this.setState({
                            name: e.target.value
                        })
                    }} />
                <Input className='addContact' placeholder='Фамилия'
                    value={this.state.lastName}

                    onChange={(e) => {
                        this.setState({
                            lastName: e.target.value
                        })
                    }} />
                <Input className='addContact' placeholder='Адрес'
                    value={this.state.address}

                    onChange={(e) => {
                        this.setState({
                            address: e.target.value
                        })
                    }} />

                <div>
                    {this.renderFields()}

                    {/* <Icon
                        onClick={() => {
                            let i: number[] = this.props.phones;
                            i.push(this.props.phones.length);
                            // this.props.onAddPhone(i);
                            let pn: string[] = this.state.phoneNumbers;
                            pn.push('');
                            this.setState({
                                phoneNumbers: pn
                            })
                        }}
                        type='plus' style={{ marginLeft: '10px' }} /> */}
                </div>

                <Input className='addContact' placeholder='e-mail'
                    value={this.state.email}
                    onChange={(e) => {
                        this.setState({
                            email: e.target.value
                        })
                    }} />
            </div>
        </Modal>
        </div >



    };
}
export default EditContact;