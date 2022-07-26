import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function Loader() {
  return (
    <>
        <Spinner className="d-flex justify-content-center align-items-center" inner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </>
  )
}
