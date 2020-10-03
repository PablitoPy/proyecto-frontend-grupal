import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Row, Col } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;


function TypeForm (props) {

         const [form] = Form.useForm();

    // Ejecutado solo al renderizar el componente por primera vez
    useEffect(() => {

        //const { match } = props;
        if (props.match.params.typeId) {
            axios.get(`/ws/rest/types/${props.match.params.typeId}`)
                .then((res) => {
                    // NOTE: modificamos atributo type para tener como id
                    let typeForm = res.data;
                    form.setFieldsValue(typeForm);
            });
        }
    }, []);

     const submit = (formType) => {
    //     // NOTE: modificamos atributo type para enviar como objeto
         const { match, history } = props;
        if (props.match.params.typeId) {
            axios.put(`/ws/rest/types/${props.match.params.typeId}`, formType)
                .then((rsp) => {
                    alert('exito');
                    history.push('/types');
                });
        } else {
            axios.post(`/ws/rest/types/`, formType)
                .then((rsp) => {
                    alert('exito');
                     history.push('/types');
                });
        }
    }   

    const onFinish = values => {
        console.log('Success:', values);
        submit(values);
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            style={{width: '60%', margin: '0 auto'}}
            form={form}
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Required!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Required!' }]}
            >
                <Input />
            </Form.Item>

            {/* <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: 'Required!' }]}
            > */}
                {/* <Select style={{ width: '100%' }} onChange={(value) => console.log('handleChangeSelect -> ' + value)}>
                    {
                        types.map(type => {
                            return (
                                <Option key={type.id} value={type.id}>{type.name}</Option>
                            )
                        })
                    }
                </Select> */}
            {/* </Form.Item> */}

            {/* <Form.Item
                label="Limit Date"
                name="limitDate"
                rules={[{ required: true, message: 'Required!' }]}
            >
                <DatePicker onChange={(date) => console.log('handleChangeDatepicker -> ' + date)} />
            </Form.Item> */}

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Row>
                    <Col span={12}>
                        <Button type="default" onClick={() => props.history.push(`/types`)}>
                            Cancel
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form> 
    )
}


export default TypeForm;