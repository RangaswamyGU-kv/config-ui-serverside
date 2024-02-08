// Packages
import React,{ Component } from "react";

// Services
import withAuth from '../../lib/auth/withAuth'
import { request, requestPost } from '../../lib/request'

// Antd
import { Popconfirm, message, Table, Layout } from 'antd';

// View
import CreateUser from './createUser'

const { Content } = Layout;

class ViewUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: '',
            user: {},
            isEditUser: false
        }
    }

    async componentDidMount() {
        await this.getUserData()
    }

    async componentDidUpdate() {
        if (!this.state.users) {
            await this.getUserData()
        }
    }

    async getUserData() {
        const results = await request('global-config/user')
        if (results && results.data && results.data.users) {
            this.setState({ users: results.data.users })
        } else {
            message.error({ content: 'Oops, Unable to get user data, please try again!', key: 'updatable', duration: 4 })
        }
    }

    async confirm(data) {
        message.loading({ content: 'Loading...', key: 'updatable' });
        const result = await requestPost(`global-config/user/${data.userName}`, {}, 'delete')
        if (result.data) {
            message.success({ content: `User deleted successfully!`, key: 'updatable', duration: 4 })
            this.setState({ users: '' })
        } else {
            message.error({ content: 'Oops, Unable to delete the user, please try again!', key: 'updatable', duration: 4 })
        }
    }

    setIsEdit = (isEditUser, user = {}, isPageUpdate = false) => {
        if (isPageUpdate) {
            this.setState({ isEditUser, user, users: '' })
        } else {
            this.setState({ isEditUser, user })
        }
    }

    getTableCols = () => {
        return [
            {
                title: 'FirstName',
                width: 100,
                dataIndex: 'firstName',
                key: 'firstName',
                fixed: 'left',
            },
            {
                title: 'LastName',
                width: 100,
                dataIndex: 'lastName',
                key: 'lastName',
            },
            {
                title: 'User Name',
                width: 100,
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: 'Email',
                width: 100,
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Roles',
                width: 100,
                dataIndex: 'roles',
                key: 'roles',
                render: roles => (
                    <div>
                        {roles && roles.map(r => <span key={r.id}>{r.id} - {r.roleName}</span>)}
                    </div>
                )
            },
            {
                title: 'Access Privileges',
                width: 100,
                dataIndex: 'accessPrivileges',
                key: 'accessPrivileges',
                render: access => (
                    <div>
                        {access && Object.keys(access).map(r => <div key={r}>{r} - {access[r]}</div>)}
                    </div>
                )
            },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 60,
                render: (data) => (
                    <>
                        <a href="#!" onClick={() => { this.setIsEdit(true, data) }}>Edit</a>&nbsp;|&nbsp;
                        <Popconfirm placement="topLeft" title='Are you sure to delete this user?' onConfirm={() => { this.confirm(data) }} okText="Yes" cancelText="No">
                            <a href="#!" >Delete</a>
                        </Popconfirm>
                    </>
                ),
            },
        ];
    }


    render() {
        const { isEditUser, user } = this.state
        return (
            <>
                {isEditUser ? (
                    <CreateUser isEdit={isEditUser} user={user} setIsEdit={this.setIsEdit}></CreateUser>
                ) : (
                    <Layout style={{ padding: '2px 24px 24px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: '100vh',
                            }}
                        >
                            <Table columns={this.getTableCols()} dataSource={this.state.users} scroll={{ x: 1300 }} />
                        </Content>
                    </Layout>
                )}
            </>
        )
    }
}

export default withAuth(ViewUser)

