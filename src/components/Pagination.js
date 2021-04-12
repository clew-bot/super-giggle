import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Paginations = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const classes = useStyles();
  const pageNumbers = [];
  const handleChangePage = (event, newPage) => {
    paginate(newPage)
  }

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <Pagination
      onChange={handleChangePage}
      count={10} variant="outlined" shape="rounded"
        className="pagination"
        style={{
          justifyContent: "space-evenly",
          border: "solid 2px black",
          fontFamily: "helveltica",
        }}
      >
        {pageNumbers.map((number) => (
          <p key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </p>
        ))}
      </Pagination>
    </nav>
  );
};

export default Paginations;
