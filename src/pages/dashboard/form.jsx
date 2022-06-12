import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";

export default function FormDashboard({actionForm, data, setData, setModalVisible, updatedId}) {
    const initialFormValue = {
        name: "",
        price: 0,
        stock: 0,
        category: ""

    };
    const [form, setForm] = useState(initialFormValue);
    const createData = async () => {
        await axios.post('http://localhost:8080/products', form)
            .then((res) => {
                data.push(form)
            })
            .catch((err) => console.error(err));
        setModalVisible(false)
    };
    const updateData = async () => {
        await axios.put(`http://localhost:8080/products/${updatedId}`, form)
            .then(() => {
                const updateDataIndex = data.findIndex((p) => p.id === updatedId);
                data[updateDataIndex] = form;
            })
            .catch((err) => console.error(err));
        setModalVisible(false)
    };
    
    const handleSubmit = (e) => {
        e.preventDefault() //ignore cara kerja default html tag
        if (actionForm === "create") return createData();
        return updateData();

    };

    useEffect(() => {
        if (actionForm === "edit") {
            // create new object editedData from referal data
            const editedData = Object.assign({}, data.find(v => v.id === updatedId));
            delete editedData.id;
            setForm(editedData);
        }
    }, [data, updatedId, actionForm])

    return(
        <div>
            <form onSubmit={handleSubmit}>
                {Object.keys(form).map((key,idx) => (
                    <div key={idx}>
                        <FormGroup>
                            <Label>
                                {key}
                            </Label>
                            <Input
                            value={form[key]}
                            onChange={(e) => setForm((prev) => ({
                                ...prev,
                                [key]: e.target.value
                            }))}/>
                        </FormGroup>
                    </div>
                ))}
                <br/>
                <Button color="primary" type="submit">Submit</Button>
                <Button onClick={() => setModalVisible(false)}>Cancel</Button>
            </form>
        </div>
    )
}