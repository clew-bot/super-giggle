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

const Paginations = ({ postsPerPage, totalPosts, paginate }) => {
  const classes = useStyles();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul
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
      </ul>
    </nav>
  );
};

export default Paginations;
