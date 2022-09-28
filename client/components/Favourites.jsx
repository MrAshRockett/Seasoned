import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from '@mui/material'

import { getFavourites, removeFavouriteAction, editFavourite } from '../actions'

function Favourites() {
  const favourites = useSelector((state) => state.favourites)
  const user = useSelector((state) => state.loggedInUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFavourites(user.auth0_id))
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Favourites table">
        <TableHead>
          <TableRow>
            <TableCell variant="h6">Name</TableCell>
            <TableCell variant="h6">Link</TableCell>
            <TableCell variant="h6">Done</TableCell>
            {/* <TableCell>Rating</TableCell> */}
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {favourites?.map((favourite) => (
            <TableRow key={favourite.id}>
              <TableCell>{favourite.label}</TableCell>
              <TableCell>
                <Link
                  target="_blank"
                  href={favourite.url}
                  rel="noreferrer"
                  underline="hover"
                >
                  {favourite.url}
                </Link>
              </TableCell>
              <TableCell>
                <input
                  type="checkbox"
                  checked={favourite.done}
                  onChange={() =>
                    dispatch(
                      editFavourite(favourite.id, {
                        ...favourite,
                        done: !favourite.done,
                      })
                    )
                  }
                />
              </TableCell>
              {/* <TableCell>{favourite.rating}</TableCell> */}
              <TableCell>
                <DeleteIcon
                  onClick={() =>
                    dispatch(removeFavouriteAction(favourite.id, user.auth0_id))
                  }
                  underline="hover"
                ></DeleteIcon>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Favourites
