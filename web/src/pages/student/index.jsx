import {PlusOutlined} from '@ant-design/icons'
import {Button, Card, Popconfirm} from 'antd'
import React from 'react'

import {ButtonList, ProModal,HttpClient, PageContent} from "@tmgg/tmgg-system";
import {ProTable} from '@ant-design/pro-components'


export default class extends React.Component {

  state = {
    formValues: {},
  }

  tableRef = React.createRef()
  addRef = React.createRef()
  editRef = React.createRef()

  columns = [

    {
      title: '姓名',
      dataIndex: 'name',
      sorter: true,


    },

    {
      title: '年龄',
      dataIndex: 'age',
      sorter: true,

       valueType: 'digit',

    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'dictRadio',
      params:'yes_or_no'
    },

    {
      title: '创建人',
      dataIndex: 'createUserLabel',
      sorter: true,
      hideInSearch: true,
        hideInForm: true,


    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
          <ButtonList>
            <a perm='student:save' onClick={() => this.handleEdit(record)}> 修改 </a>
            <Popconfirm perm='student:delete' title='是否确定删除学生'  onConfirm={() => this.handleDelete(record)}>
              <a>删除</a>
            </Popconfirm>
          </ButtonList>
      ),
    },
  ]

  handleAdd = ()=>{
    this.addRef.current.show()
  }
  handleSave = value => {
    HttpClient.post( 'student/save', value).then(rs => {
      this.addRef.current.hide()
      this.tableRef.current.reload()
    })
  }

  handleEdit = record=>{
    this.editRef.current.show()
    this.setState({formValues: record})
  }
  handleUpdate = value => {
    let params = {id:this.state.formValues.id, ...value}
    HttpClient.post('student/save', params).then(rs => {
      this.editRef.current.hide()
      this.tableRef.current.reload()
    })
  }

  handleDelete = row => {
    HttpClient.post( 'student/delete', row).then(rs => {
      this.tableRef.current.reload()
    })
  }

  render() {
    return <PageContent bgGray>
      <ProTable
          actionRef={this.tableRef}
          toolBarRender={() => {
            return <ButtonList>
              <Button perm='student:save' type='primary' onClick={this.handleAdd}>
                <PlusOutlined/> 新增
              </Button>
            </ButtonList>
          }}
          request={(params, sort) => HttpClient.getPageableData('student/page', params, sort)}
          columns={this.columns}
          rowSelection={false}
          rowKey='id'
          columnEmptyText={false}
          bordered
          scroll={{
            x: 'max-content',
          }}
      />

      <ProModal actionRef={this.addRef} title='新增学生'>
        <ProTable
            onSubmit={this.handleSave}
            type='form'
            columns={this.columns}
        />
      </ProModal>

      <ProModal actionRef={this.editRef} title='编辑学生'>
        <ProTable
            onSubmit={this.handleUpdate}
            form={{initialValues: this.state.formValues}}
            type='form'
            columns={this.columns}
        />
      </ProModal>

    </PageContent>
  }
}



