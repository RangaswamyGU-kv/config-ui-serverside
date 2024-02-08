// Packages
import React from "react";
import { useEffect } from 'react';

// Antd
import { 
    Layout, 
    Form, 
    Input, 
    Button, 
    Radio, 
    message, 
    Checkbox
} from 'antd';

// HOC
import withAuth from '../../lib/auth/withAuth';

// Services
import { getItem } from '../../lib/auth'
import { requestPost } from '../../lib/request';

const { Content } = Layout;
const options = [
    {
      label: 'Feed Master',
      value: 'search',
    },
    {
      label: 'BYD',
      value: 'byd',
    },
    {
      label: 'Compras Services',
      value: 'compras',
    },
  ];
function CreateUser(props) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (props.isEdit) {
            const formData = { ...props.user }
            formData.roles = props.user.roles && props.user.roles.length > 0 && props.user.roles[0].id
            formData.accessPrivileges && Object.keys(formData.accessPrivileges).forEach(i => {
                formData[i] = formData.accessPrivileges[i]
            })
            form.setFieldsValue(formData)
        }
    });

    const getConfig = () => {
        const configsRaw = getItem('config')
        const config = JSON.parse(configsRaw)
        return config && config.map(i => i.beanName)
    }

    const onFinish = async (values) => {
        message.loading({ content: 'Loading...', key: 'updatable' });
        const configNames = getConfig()
        let accessPrivileges = {}
        configNames.forEach(i => {
            accessPrivileges[i] = values[i]
        })
        const formObject = {
            ...values,
            roles: [{
                id: values.roles,
                name: values.roles,
            }],
            accessPrivileges
        }
        if (props.isEdit) {
            const result = await requestPost('global-config/user', formObject, 'put')
            if (result.data) {
                message.success({ content: `${values.userName} Updated successfully!`, key: 'updatable', duration: 4 });
                form.resetFields()
                props.setIsEdit(false, {}, true)
            } else {
                message.error({ content: 'Oops, Unable to create the user, please try again!', key: 'updatable', duration: 4 });
            }
        } else {
            const result = await requestPost('global-config/register', formObject)
            if (result.data) {
                message.success({ content: `New user ${values.userName} created successfully!`, key: 'updatable', duration: 4 });
                form.resetFields()
            } else {
                message.error({ content: 'Oops, Unable to create the user, please try again!', key: 'updatable', duration: 4 });
            }
        }
    }

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    }
    const onChange = () =>{
        console.log("onchange")
    }

    const displayAccess = () => {
        const beanNames = getConfig()
        return beanNames && beanNames.map(i => {
            return (
                <Form.Item name={i} label={i}
                    rules={[
                        {
                            required: true,
                            message: 'Please select the access',
                        },
                    ]}>
                    <Radio.Group>
                        <Radio value="view">View</Radio>
                        <Radio value="edit">Edit</Radio>
                        <Radio value="none">None</Radio>
                    </Radio.Group>
                </Form.Item>
            )
        })
    }

    return (
        <Layout style={{ padding: '2px 24px 24px' }}>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: '100vh',
                }}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 10,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {!props.isEdit && (
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    )}

                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter firstname!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter last name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Please enter valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please enter email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                        <Form.Item name="roles" label="Roles"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select the role!',
                                },
                            ]}>
                            <Radio.Group>
                                <Radio value="user">User</Radio>
                                <Radio value="admin">Admin</Radio>
                            </Radio.Group>
                        </Form.Item>

                    {displayAccess()}
                    
                    <Form.Item name="domainAccess" label="Domain Access"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select the any one domain!',
                                },
                            ]}>
                            <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} />
                            {/* <Radio.Group>
                                <Radio value="user">User</Radio>
                                <Radio value="admin">Admin</Radio>
                            </Radio.Group> */}
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        {props.isEdit && (
                            <Button type="default" onClick={() => { props.setIsEdit(false) }}>
                                Back
                            </Button>
                        )}
                        &nbsp;&nbsp;&nbsp;
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    )
}

export default withAuth(CreateUser)

