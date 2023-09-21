import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataHandler from "../handlers/DataHandler";

const Home = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publication_year: "",
    genre: "",
  });
  const [tableData, setTableData] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchGenre, setSearchGenre] = useState("");

  const handleLogout = () => {
    DataHandler.clearSession();
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleAddToTable = () => {
    setTableData([...tableData, bookData]);
    setBookData({
      title: "",
      author: "",
      publication_year: "",
      genre: "",
    });
  };

  const handleDelete = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
  };

  const filteredTableData = tableData.filter((item) => {
    const titleMatches = item.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase());
    const authorMatches = item.author
      .toLowerCase()
      .includes(searchAuthor.toLowerCase());
    const genreMatches = item.genre
      .toLowerCase()
      .includes(searchGenre.toLowerCase());

    return titleMatches && authorMatches && genreMatches;
  });

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          Input Area
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={bookData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control"
              id="author"
              name="author"
              value={bookData.author}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="publication_year" className="form-label">
              Publication Year
            </label>
            <input
              type="number"
              className="form-control"
              id="publication_year"
              name="publication_year"
              value={bookData.publication_year}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="genre" className="form-label">
              Genre
            </label>
            <input
              type="text"
              className="form-control"
              id="genre"
              name="genre"
              value={bookData.genre}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddToTable}>
            Add to Table
          </button>
        </div>
      </div>

      <div className="mt-5">
        <div className="d-flex justify-content-end mb-3">
          <div style={{ marginRight: "10px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>
          <div style={{ marginRight: "10px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by author"
              value={searchAuthor}
              onChange={(e) => setSearchAuthor(e.target.value)}
            />
          </div>
          <div style={{ marginRight: "10px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by genre"
              value={searchGenre}
              onChange={(e) => setSearchGenre(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={() => {}}>
            Search
          </button>
        </div>

        <h2>Table</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publication Year</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.publication_year}</td>
                <td>{item.genre}</td>
                <td>
                  <button type="button" className="btn btn-secondary">
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
