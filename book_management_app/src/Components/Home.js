import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataHandler from "../handlers/DataHandler";
import APIService from "../services/APIService";

const Home = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publication_year: "",
    genre: "",
    book_id: "",
  });
  const [update, setUpdate] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchGenre, setSearchGenre] = useState("");

  const handleLogout = () => {
    DataHandler.clearSession();
    navigate("/login");
  };

  useEffect(() => {
    handleGetToTable();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleAddToTable = () => {
    {
      update
        ? APIService({
            url: `${process.env.REACT_APP_API}/book/update`,
            method: "PUT",
            data: bookData,
          })
            .then((res) => {
              setUpdate(false);
              handleGetToTable();
              setBookData({
                title: "",
                author: "",
                publication_year: "",
                genre: "",
              });
            })
            .catch((err) => {})
            .finally(() => {})
        : APIService({
            url: `${process.env.REACT_APP_API}/book/create`,
            method: "POST",
            data: bookData,
          })
            .then((res) => {
              handleGetToTable();
              setBookData({
                title: "",
                author: "",
                publication_year: "",
                genre: "",
              });
            })
            .catch((err) => {})
            .finally(() => {});
    }
  };

  const handleGetToTable = () => {
    APIService({
      url: `${process.env.REACT_APP_API}/book/get?title=${searchTitle}&author=${searchAuthor}&genre=${searchGenre}`,
      method: "GET",
    })
      .then((res) => {
        setTableData(res.data);
      })
      .catch((err) => {})
      .finally(() => {});
  };

  const handleDelete = (index) => {
    APIService({
      url: `${process.env.REACT_APP_API}/book/delete`,
      method: "POST",
      data: {
        book_id: tableData[index].book_id,
      },
    })
      .then((res) => {
        handleGetToTable();
        setTableData(res.data);
      })
      .catch((err) => {})
      .finally(() => {});
  };

  const handleaddUpdate = (index, item) => {
    setUpdate(true);
    setBookData({
      title: item.title,
      author: item.author,
      publication_year: item.publication_year,
      genre: item.genre,
      book_id: item.book_id,
    });
  };

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
            {update ? "Update Table" : "Add to Table"}
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
          <button className="btn btn-primary" onClick={handleGetToTable}>
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
            {tableData &&
              tableData.length > 0 &&
              tableData.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.publication_year}</td>
                  <td>{item.genre}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleaddUpdate(index, item)}
                      className="btn btn-secondary">
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
