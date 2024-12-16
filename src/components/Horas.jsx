import React, { useEffect, useState } from 'react';
import "../styles/style.css"
import { openDB } from 'idb';
import { CiFloppyDisk, CiTrash, CiCirclePlus, CiCircleRemove, CiGrid2H   } from "react-icons/ci";

// IndexedDB functions
const DB_NAME = 'timeEntriesDB';
const STORE_NAME = 'entries';

async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    }
  });
}

async function addEntry(entry) {
  const db = await initDB();
  return db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).add(entry);
}

async function getEntries() {
  const db = await initDB();
  return db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).getAll();
}

async function deleteEntry(id) {
  const db = await initDB();
  return db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).delete(id);
}

async function updateEntry(entry) {
  const db = await initDB();
  return db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).put(entry);
}

// TimeForm component
function TimeForm({ onSubmit, currentEntry }) {
  const [hours, setHours] = useState(currentEntry ? currentEntry.hours : '');
  const [minutes, setMinutes] = useState(currentEntry ? currentEntry.minutes : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      hours: parseInt(hours, 10),
      minutes: parseInt(minutes, 10),
      createdAt: new Date(),
    };
    onSubmit(entry);
    setHours('');
    setMinutes('');
  };

  const [isActive, setIsActive] = useState(false)

  const handleChangeMenu = () => {
      setIsActive(!isActive)
  }

  return (
    <div>
      <div>
        <button type="button" onClick={handleChangeMenu} className={isActive ? 'btnFormClose' : 'btnForm'}>{isActive ? <CiCircleRemove  /> : <CiCirclePlus  />}</button>
      </div>
    <form onSubmit={handleSubmit} className={isActive ? "active" : "inactive" }>
      <div className="cont">
        <label htmlFor="hours">Horas</label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          required
        />
      </div>
      <div className="cont">
        <label htmlFor="minutes">Minutos</label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          required
        />
      </div>
      <button type="submit"><CiFloppyDisk /> Guardar</button>
    </form>
    </div>
  );
}

// TimeList component
function TimeList({ entries, onEdit, onDelete }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="container">
      <ul>
      {entries.map(entry => (
        <li key={entry.id}>
          <p className='hr'>{entry.hours}:{entry.minutes} <br />
          <span className='dateDay'>{formatDate(entry.createdAt)}</span></p>
          <CiTrash onClick={() => onDelete(entry.id)} className="deleteBtn" />
        </li>
      ))}
    </ul>
    </div>
  );
}

// Horas component
function Horas() {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    // Reinicia el contador mensual al cambiar de mes
    if (month !== currentMonth) {
      resetMonthlyCount();
      setCurrentMonth(month);
    }

    // Reinicia el contador anual al cambiar de año
    if (year !== currentYear) {
      resetAnnualCount();
      setCurrentYear(year);
    }
  }, [entries, currentMonth, currentYear]);

  const loadEntries = async () => {
    const entries = await getEntries();
    setEntries(entries);
  };

  const handleAddEntry = async (entry) => {
    if (editingEntry) {
      entry.id = editingEntry.id;
      await updateEntry(entry);
      setEditingEntry(null);
    } else {
      await addEntry(entry);
    }
    loadEntries();
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
  };

  const handleDeleteEntry = async (id) => {
    await deleteEntry(id);
    loadEntries();
  };

  const resetMonthlyCount = () => {
    console.log('Reiniciando contador mensual');
  };

  const resetAnnualCount = () => {
    console.log('Reiniciando contador anual');
  };

  const getTotalTimeByMonth = () => {
    const totalsByMonth = {};
    entries.forEach(entry => {
      const date = new Date(entry.createdAt);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!totalsByMonth[monthKey]) {
        totalsByMonth[monthKey] = 0;
      }
      totalsByMonth[monthKey] += entry.hours * 60 + entry.minutes;
    });

    return Object.keys(totalsByMonth).map(monthKey => {
      const totalMinutes = totalsByMonth[monthKey];
      const totalHours = Math.floor(totalMinutes / 60);
      const minutesLeft = totalMinutes % 60;
      return (
        <li key={monthKey}>
          {monthKey}: {totalHours}:{minutesLeft}
        </li>
      );
    });
  };

  const getTotalTimeByYear = () => {
    const totalsByYear = {};
    entries.forEach(entry => {
      const date = new Date(entry.createdAt);
      const yearKey = date.getFullYear();
      if (!totalsByYear[yearKey]) {
        totalsByYear[yearKey] = 0;
      }
      totalsByYear[yearKey] += entry.hours * 60 + entry.minutes;
    });

    return Object.keys(totalsByYear).map(yearKey => {
      const totalMinutes = totalsByYear[yearKey];
      const totalHours = Math.floor(totalMinutes / 60);
      const minutesLeft = totalMinutes % 60;
      return (
        <li key={yearKey}>
          {yearKey}: {totalHours}:{minutesLeft}
        </li>
      );
    });
  };

  const [changeLayout, setChangeLayout] = useState(false)

  const total = () => {
    setChangeLayout(!changeLayout)
  }

  return (
    <div>
      <div>
        <h1>Registro de Tiempo</h1>
        <div>
          <TimeForm onSubmit={handleAddEntry} currentEntry={editingEntry} />
        </div>
        <TimeList entries={entries} onEdit={handleEditEntry} onDelete={handleDeleteEntry} />
        <div>
          <button type='button' onClick={total} className={changeLayout ? "activeBtnList" : "inactiveBtnList"} ><CiGrid2H /></button>
          <div className={changeLayout ? "activeList" : "inactiveList"}>
            <div>
              <h2>Total por Mes</h2>
              <ul>{getTotalTimeByMonth()}</ul>
            </div>
            <div>
              <h2>Total por Año</h2>
              <ul>{getTotalTimeByYear()}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Horas;