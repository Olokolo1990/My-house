import React from "react";
import {Link} from "react-router-dom";
import {useState} from "react";
import {db} from "./firebase";

export const Add_ShoppingList = () => {
    const [form, setForm] = useState({ title: "", quantity: "", unit: "" });
    const [errors, setError] = useState([]);
    const [success, setSuccess] = useState("")
    const handleAddToShippingList = (e) => {
        const { name, value } = e.target;
        setForm(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorArray = [];
        if (form.title.length < 2) {
            errorArray.push("pierwsze pole musi zwierac conajmniej 2 znaki");
        }
        if (form.quantity.length < 1) {
            errorArray.push("drugie pole nie może być puste!");
        }
        setError(errorArray);
        if (errorArray.length === 0) {
            db.collection("shopping").add({
                title: form.title,
                quantity: form.quantity,
                unit: form.unit === "" ? "sztuk" : form.unit
            })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    setForm({ title: "", quantity: "", unit: "", });
                    setSuccess("Dodano do listy ")
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
    }


    return (
        <div className="main_container">
            <div className="title">
                <h1 className="header">Dodaj do Listy Zakupów</h1>
            </div>
            <div className="add_content">

                <form className="form_add" onSubmit={handleSubmit}>
                    <div className="form_errors">{errors.length > 0 && errors.map((error, key) => <p key={key} style={{ color: "red", margin: "0px" }}>{error}</p>)}<p style={{ color: "green", margin: "0px" }}>{errors.length === 0 && success}</p></div>
                    <h2>Nazwa</h2>
                    <input type="text" className="input" value={form.title} onChange={handleAddToShippingList} name="title"/>
                    <h2>Ilość</h2>
                    <input type="text" className="input" value={form.quantity} onChange={handleAddToShippingList} name="quantity"/>
                    <select name="unit" className="select"  value={form.unit} onChange={handleAddToShippingList} name="unit">
                        <option value="sztuk" >sztuk</option>
                        <option value="opakowań">opakowań</option>
                        <option value="gram">gram</option>
                        <option value="kg">kg</option>
                        <option value="ml">ml</option>
                        <option value="l">l</option>
                    </select>
                    <div className="buttons">
                        <button type="submit" className="btn_add btn">Dodaj</button>
                    </div>
                </form>
            </div>
            <div className="buttons">
                <Link to="/ShoppingList" className="btn">Powrót</Link>
                <Link to="/" className="btn">Mój Dom</Link>
            </div>
        </div>
    )
}

