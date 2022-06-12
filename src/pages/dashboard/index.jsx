import React, {useState, useEffect} from "react";
import { Button, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import FormDashboard from "./form";
import axios from "axios";


export default function Dashboard() {
    const [header, setHeader] = useState([]);
    const [data, setData] = useState([]);
    const [action, setAction] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [updatedId, setUpdatedId] = useState(null);

    const handleCreate = () => {
        setAction("create");
        setModalVisible(true);
    }
    const handleEdit = (id) => {
        setUpdatedId(id);
        setAction("edit");
        setModalVisible("true")
    }
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/products/${id}`)
            .then(() =>{
                const updatedData = data.filter(v => v.id !== id);
                setData(updatedData);
            })
            .catch((err) => console.error(err));
    }
    const getData = async () => {
        await axios.get('http://localhost:8080/products')
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.error(err));
    }
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        window.location = '/'
    }

    useEffect(() => {
        const listHeader = ['No', 'Name', 'Price', 'Stock', 'Category', 'Action'];
        setHeader(listHeader);
        getData();
    }, [])

    return(
        <div>
            ini dashboard
            <Button color="primary" onClick={() => handleCreate()}>Add New Data</Button>
            <Button color="danger" onClick={() => handleLogout()}>Logout</Button>
            <Table>
                <thead>
                    <tr>
                        {header.map((v, idx) => (
                            <th key={idx}>{v}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((v, idx) => (
                        <tr key={idx}>
                            <th scope = "row">
                                {idx + 1}
                            </th>
                            <td>{v.name}</td>
                            <td>{v.price}</td>
                            <td>{v.stock}</td>
                            <td>{v.category}</td>
                            <td>
                                <Button onClick={() => handleDelete(v.id)}>Delete</Button>
                                <Button onClick={() => handleEdit(v.id)}>Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal isOpen={modalVisible} toggle={() => setModalVisible(!modalVisible)}>
                <ModalHeader>
                    {`Form ${action} Data`}
                </ModalHeader>
                <ModalBody>
                    <FormDashboard
                        actionForm={action}
                        data={data}
                        setData={setData}
                        setModalVisible={setModalVisible}
                        updatedId={updatedId}
                    />
                </ModalBody>
            </Modal>
        </div>
    )
}