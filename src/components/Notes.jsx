import "../styles/style.css"
import { useEffect, useState } from 'react';
import { openDB } from "idb";
import { CiFloppyDisk, CiTrash, CiCirclePlus, CiCircleRemove  } from "react-icons/ci";

const init = async () => {
    return openDB("notes", 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains("myStore")) {
                const store = db.createObjectStore("myStore", {
                    keyPath: "id",
                    autoIncrement: true,
                })
                store.createIndex("name", "name", {unique: false});
            }
        }
    })
}

const addItem = async (data) => {
    const db = await init();
    const tx = db.transaction('myStore', 'readwrite');
    const store = tx.objectStore('myStore');
    await store.add(data);
    await tx.done;
};

const getItems = async () => {
    const db = await init();
    const tx = db.transaction('myStore', 'readonly');
    const store = tx.objectStore('myStore');
    return await store.getAll();
};

// const getItemById = async (id) => {
//     const db = await init();
//     const tx = db.transaction('myStore', 'readonly');
//     const store = tx.objectStore('myStore');
//     return await store.get(id);
// };

const deleteItem = async (id) => {
    const db = await init();
    const tx = db.transaction('myStore', 'readwrite');
    const store = tx.objectStore('myStore');
    await store.delete(id);
    await tx.done;
};

function Notes() {

    const [items, setItems] = useState([])
    const [name, setName] = useState("")
    const [direc, setDirec] = useState("")
    const [asunt, setAsunt] = useState("")
    const [texts, setTexts] = useState("")
    const [noteAdd, setNoteAdd] = useState("")

    useEffect(() => {
        loadItems()
    }, [])

    const loadItems = async () => {
        const allItems = await  getItems();
        setItems(allItems);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            name,
            direc,
            asunt,
            texts,
            noteAdd,
        }

        if (!name || !direc || !asunt || !texts || !noteAdd) {
            console.log("esta vacio")
        } else {
            await addItem(data)
            setName("")
            setDirec("")
            setAsunt("")
            setAsunt("")
            setTexts("")
            setNoteAdd("")
        }
        
        loadItems()
        
    }
    
    const handleDeleteItems = async (id) => {
        await deleteItem(id)
        loadItems();
    }

    const [isActive, setIsActive] = useState(false)

    const handleChangeMenu = () => {
        setIsActive(!isActive)
    }
    
    return (
        <div className="divContNotes">
        <h1>Regitro de notas</h1>
        <button type="button" onClick={handleChangeMenu} className={isActive ? 'btnFormClose' : 'btnForm'}>{isActive ? <CiCircleRemove  /> : <CiCirclePlus  />}</button>
        <form onSubmit={handleSubmit} className={isActive ? "active" : "inactive" }>
            <div className="cont">
                <label htmlFor="name">Nombre: </label>
                <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="cont">
                <label htmlFor="direc">Direccion: </label>
                <input type="text" name="direc" id="direc" value={direc} onChange={e => setDirec(e.target.value)} required />
            </div>
            <div className="cont">
                <label htmlFor="asunt">Tema de conversacion: </label>
                <input type="text" name="asunt" id="asunt" value={asunt} onChange={e => setAsunt(e.target.value)} required />
            </div>
            <div className="cont">
                <label htmlFor="texts">Textos: </label>
                <input type="text" name="texts" id="texts" value={texts} onChange={e => setTexts(e.target.value)} required />
            </div>
            <div className="cont">
                <label htmlFor="noteAdd">Nota adicional: </label>
                <input type="text" name="noteAdd" id="noteAdd" value={noteAdd} onChange={e => setNoteAdd(e.target.value)} required />
            </div>
            <button type="submit"><CiFloppyDisk /> Guardar</button>
        </form>
        <div className="container">
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <h3>{item.name}</h3>
                        <p>{item.direc}</p>
                        <p>{item.asunt}</p>
                        <p>{item.texts}</p>
                        <p>{item.noteAdd}</p>
                        <CiTrash onClick={() => handleDeleteItems(item.id)} className="deleteBtn" />
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Notes