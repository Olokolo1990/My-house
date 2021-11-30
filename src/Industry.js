import React from "react";
import {Link} from "react-router-dom";
import {useState,useEffect} from "react";
import {db} from "./firebase";

export const Industry = () => {
    const [cards, setCards] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editQuantity, setEditQuantity] = useState("");
    const [editUnit, setEditUnit] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        db.collection("industry").get()
            .then((querySnapshot) => {
                const allIndustry = [];
                querySnapshot.forEach((doc) => {
                    allIndustry.push({
                        ...doc.data(),
                        id: doc.id,
                    });
                });
                setCards(allIndustry)
            });
    }, [edit]);

    const handleDelete = (id) => {
        db.collection("industry").doc(id).delete().then(() => {
            const deleteCard = cards.filter(card => card.id !== id)
            setCards(deleteCard);
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
    const handleEdit = (id, title, quantity, unit) => {
        setEdit(id);
        setEditTitle(title);
        setEditQuantity(quantity);
        setEditUnit(unit);
    }
    const handleUpdate = (e) => {
        e.preventDefault()
        const errorArray = [];
        if (editTitle.length < 2) {
            errorArray.push("pierwsze pole musi zwierac conajmniej 2 znaki");
        }
        if (editQuantity.length < 1) {
            errorArray.push("drugie pole musi nie może być puste !");
        }
        setErrors(errorArray);
        if (errorArray.length === 0) {
            db.collection("industry").doc(edit).update({
                title: editTitle,
                quantity: editQuantity,
                unit: editUnit,
            })
                .then((docRef) => {
                    setEdit(false)
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
    }
    const handleBack = () => {
        setEdit(false)
    }
    useEffect(() => {
        const allIndustry = [];
        db.collection("industry").get().then((snapshot => {

            snapshot.forEach(doc => {
                console.log(doc.data())
                allIndustry.push(doc.data());
            });
        }))
        setCards(allIndustry);
        console.log(cards);
    }, []);



    return (
        <>
            <div className="main_container">
                <div className="title">
                    <h1>Stan Przemysłu</h1>
                </div>
                <div className="main_content">
                    <table className="table">
                        <thead>
                        <th className="table_title">Nazwa</th>
                        <th className="table_quantity">Ilość</th>
                        <th className="table_action">Akcja</th>
                        </thead>
                        <tbody>
                        {cards.map(({title, quantity, unit, id}) => {
                            return (
                                <tr key={id}>
                                    <td className="table_title">{`${title}`}</td>
                                    <td className="table_quantity">{`${quantity} ${unit}`}</td>
                                    <td>

                                        <button
                                            onClick={() => handleEdit(id, title, quantity, unit)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" stroke="#FFB03B" fill="#FFB03B">
                                                <path
                                                    d="M18 14.45v6.55h-16v-12h6.743l1.978-2h-10.721v16h20v-10.573l-2 2.023zm1.473-10.615l1.707 1.707-9.281 9.378-2.23.472.512-2.169 9.292-9.388zm-.008-2.835l-11.104 11.216-1.361 5.784 5.898-1.248 11.103-11.218-4.536-4.534z"></path>
                                            </svg>
                                        </button>
                                        <button onClick={() => handleDelete(id)}>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" stroke="#BD4932" fill="#BD4932">
                                                <path
                                                    d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"></path>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="buttons">
                    <Link to="/Add_Industry" className="btn">Dodaj</Link>
                    <Link to="/" className="btn">Powrót</Link>
                </div>
            </div>
            {
                edit && (
                    <div className="edit_container">
                        {errors.length > 0 && <div className="edit_error" style={{background: "red"}}>{errors.map(error => <p>{error}</p>)}</div>}
                        <form className="edit_form" onSubmit={handleUpdate}>
                            <h2 className="title">Edytuj Produkt</h2>
                            <textarea className="edit_textarea" type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                            <textarea className="edit_textarea" type="text" value={editQuantity} onChange={e => setEditQuantity(e.target.value)} />
                            <select name="unit" className="edit_textarea"  value={editUnit} onChange={e => setEditUnit(e.target.value)} >
                                <option value="sztuk" >sztuk</option>
                                <option value="opakowań">opakowań</option>
                                <option value="gram">gram</option>
                                <option value="kg">kg</option>
                                <option value="ml">ml</option>
                                <option value="l">l</option>
                            </select>
                            <div className="edit_btnArea">
                                <button className="buttons btn" onClick={handleBack}>anuluj</button>
                                <button className="buttons btn" type="submit">zapisz</button>
                            </div>
                        </form>
                    </div>)
            }
        </>
    )
}
