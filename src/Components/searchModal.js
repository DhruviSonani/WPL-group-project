import React from 'react'
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"
function SearchModal(props) {
    return (
        <div style={{
            display: 'block', width: 700, padding: 30
        }}>
            <Modal isOpen={props.searchBar}
                toggle={() => {
                    props.searchToggleHanler(!props.searchBar)
                }}
                modalTransition={{ timeout: 2000 }}>
                <ModalBody>
                    <div className="search-title">Search</div>
                    <form id="searchform" >
                        <div className="search-wrapper">
                            <input placeholder="Search professor"
                                type="text"
                                className="form-control search-input"
                                onChange={props.onChangeSearchInput}
                            />
                            <button className="search-submit" onClick={async (e) => {
                                e.preventDefault()
                                props.searchToggleHanler(!props.searchBar)
                            }}><i className="fa fa-search" /></button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div >
    )
}

export default SearchModal