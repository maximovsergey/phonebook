import { Button, Modal, Input, Icon, Select } from "antd";
import React from "react";
import './AddContact.css'
import { AddContactType } from "../type/AddContactType";
const { Option } = Select;

interface AddContactProps {
    onAddContact: (input: AddContactType) => void;
    onChangePhones: (n: number[]) => void;
    phones: number[];
}
interface AddContactState {

    visible: boolean;
    isEdit: boolean;
    name: string;
    lastName: string;
    phone: string;
    phoneNumbers: string[];
    address: string;
    email: string;
    selectedAgent: string;
}

class AddContact extends React.PureComponent<AddContactProps, AddContactState> {
    constructor(props: AddContactProps) {
        super(props);
        this.state = {
            visible: false,
            isEdit: false,
            name: '',
            lastName: '',
            phone: '',
            phoneNumbers: [''],
            address: '',
            email: '',
            selectedAgent: '@gmail.com',
        }
    }

    componentDidUpdate() {
        console.log('////////// componentDidUpdate ');
        console.log('////////// this.props ', this.props);
        console.log('////////// this.state ', this.state);
    }

    componentWillReceiveProps() {
        const { phones } = this.props;
        let nums: string[] = [];
        for (let i = 0; i < phones.length; i++) {
            nums.push(this.state.phone === '' ? '' : this.state.phoneNumbers[i]);
        }
        this.setState({
            phoneNumbers: nums
        })
    }

    public renderContactDataFields = () => {
        const fields: string[] = ['Имя', 'Фамилия', 'Адрес'];
        const stateFields: string[] = ['name', 'lastName', 'address'];
        const els = stateFields.map((i, index) => {
            let stateElement: any;
            switch (i) {
                case 'name': stateElement = this.state.name;
                    break;
                case 'lastName': stateElement = this.state.lastName;
                    break;
                case 'address': stateElement = this.state.address;
                    break;
            }
            return (<Input
                className='addContact'
                placeholder={`${fields[index]}`}
                key={`${i}`}

                value={stateElement}
                onChange={(e) => {
                    const obj: any = { [stateFields[index]]: e.target.value };
                    this.setState(obj)
                }}
            />
            )
        })
        return els;

    }

    public renderPhoneFields = () => {
        let temp = this.props.phones;
        const els = temp ? temp.map((el: any, ind: number) => {
            let bool = temp.length > 1 && ind + 1 !== temp.length;
            return (<div key={`renderPhoneFields${ind}`}>
                <Input className='addContact' placeholder='Телефон' key={`phone_${ind}`}
                    style={{ marginLeft: '24px' }}
                    value={this.state.phoneNumbers[ind]}
                    onChange={(e) => {
                        let newArr = this.state.phoneNumbers
                        let elem = this.state.phoneNumbers[ind];
                        elem = e.target.value;
                        newArr[ind] = elem;
                        this.setState({
                            phoneNumbers: newArr,
                            phone: elem
                        })
                    }} />
                <Icon
                    title={bool ? 'Удалить номер' : 'Добавить номер'}
                    key={`icon${ind}`}
                    className='icon--plus'
                    type={bool ? 'minus' : 'plus'}
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                        let i: number[] = this.props.phones;
                        let arr: string[] = this.state.phoneNumbers;
                        if (bool) {
                            i.splice(ind, 1);
                            arr.splice(ind, 1);
                        } else {
                            i.push(this.props.phones.length);
                            arr.push('');
                        }
                        this.props.onChangePhones(i);
                        this.setState({
                            phoneNumbers: arr
                        })
                    }}
                />
            </div>

            )
        }) : null
        return els;
    }

    public render() {
        const selectAfter = (
            <Select defaultValue="@gmail.com" style={{ width: '120px' }}
                onChange={((value: string) => {
                    this.setState({
                        selectedAgent: value,
                    })
                })}
            >
                <Option key={"@mail.ru"} value="@mail.ru">@mail.ru</Option>
                <Option key={"@gmail.com"} value="@gmail.com">@gmail.com</Option>
                <Option key={"@yandex.ru"} value="@yandex.ru">@yandex.ru</Option>
            </Select>
        );
        return <div>
            <Button
                title={'Добавить контакт'}
                onClick={() => this.setState({
                    visible: true,
                })}
            >Добавить контакт</Button>

            <Modal
                visible={this.state.visible}
                maskClosable={true}
                mask={true}
                closable={false}
                title='Добавить контакт'
                footer={<><Button
                    onClick={() => {
                        this.setState({ visible: false })
                    }}>Отмена
                        </Button>
                    <Button
                        title={this.state.name === '' ? 'Введите имя' : ''}
                        disabled={this.state.name === ''}
                        onClick={async () => {
                            let input: AddContactType = new AddContactType();
                            input.name = this.state.name;
                            input.lastName = this.state.lastName;
                            input.phones = this.state.phoneNumbers;
                            input.address = this.state.address;
                            input.email = this.state.email !== '' ? this.state.email + this.state.selectedAgent : '';

                            this.props.onAddContact(input);
                            this.setState({
                                visible: false,
                                name: '',
                                lastName: '',
                                phone: '',
                                address: '',
                                email: '',
                            })
                        }}>
                        {'Добавить контакт'}
                    </Button>
                </>}
            >
                <div style={{ lineHeight: 4, textAlign: 'center' }}>
                    <Icon
                        type="user"
                        className='icon' />
                </div>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    {this.renderContactDataFields()}
                    <Input className='addContact' placeholder='e-mail'
                        key={'e-mail'}
                        value={this.state.email}
                        addonAfter={selectAfter}
                        onChange={(e) => {
                            this.setState({
                                email: e.target.value,
                            })
                        }} />
                    {this.renderPhoneFields()}
                </div>
            </Modal>
        </div >



    };
}
export default AddContact;