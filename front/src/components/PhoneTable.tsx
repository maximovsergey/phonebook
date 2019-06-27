import React from 'react';
import { Table, Tag, Divider, Button, Popconfirm, Icon } from 'antd';
import './PhoneTable.css'

interface PhoneTableState {
    data: any,
}

interface PhoneTableProps {
    data: any,
    onDeleteContact: (id: string) => void
    showModal: (isShow: boolean, id: string) => void
}

class PhoneTable extends React.PureComponent<PhoneTableProps, PhoneTableState>{
    constructor(props: PhoneTableProps) {
        super(props)
    }
    public render() {
        const columns = [
            {
                className: 'column--name',
                title: 'Имя',
                dataIndex: 'name',
                key: 'name',
                render: (text: any) => <a href="javascript:;">{text}</a>,
            },
            {
                className: 'column--lastName',
                title: 'Фамилия',
                dataIndex: 'lastName',
                key: 'lastName',
            },
            {
                className: 'column--address',
                title: 'Адрес',
                dataIndex: 'address',
                key: 'address',
            },
            {
                className: 'column--phones',
                title: 'Телефон',
                dataIndex: 'phones',
                key: 'phones',
                render: (phone: any) => (
                    <div>
                        {phone.map((el: any) => {
                            return (
                                <div key={el.phoneId}>{el.phoneNumber}</div>
                            )
                        })}
                    </div>
                )
            },
            {
                className: 'column--email',
                title: 'E-mail',
                dataIndex: 'email',
                key: 'email',
            },
            // {
            //     title: 'Tags',
            //     key: 'tags',
            //     dataIndex: 'tags',
            //     render: (tags: any) => (
            //         <span>
            //             {tags.map((tag: any) => {
            //                 let color = tag.length > 5 ? 'geekblue' : 'green';
            //                 if (tag === 'loser') {
            //                     color = 'volcano';
            //                 }
            //                 return (
            //                     <Tag color={color} key={tag}>
            //                         {tag.toUpperCase()}
            //                     </Tag>
            //                 );
            //             })}
            //         </span>
            //     ),
            // },
            {
                className: 'column--action',
                title: 'Действия',
                key: 'action',
                render: (text: any, record: any) => (

                    <span>
                        <Button
                            title='Редактировать'
                            style={{ marginRight: '10px', float: 'left' }}
                            onClick={() => {
                                this.props.showModal(true, record.id)
                            }}>
                            <Icon type='edit' />
                        </Button>
                        <Popconfirm
                            placement='rightTop'
                            title={`Удалить контакт ${record.name} ${record.lastName}`}
                            onConfirm={() => this.props.onDeleteContact(record.id)}
                            okText="Yes"
                            cancelText="No">
                            <Button title='Удалить'>
                                <Icon type='delete' />

                            </Button>
                        </Popconfirm>
                    </span >
                ),
            },
        ];
        return (
            <Table
                style={{
                    marginLeft: '10%',
                    width: '80%'
                }}
                columns={columns}
                dataSource={this.props ? this.props.data : []}
                rowKey='id'
                pagination={false} />
        );
    }
}
export default PhoneTable;
