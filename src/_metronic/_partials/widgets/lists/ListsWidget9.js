/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { Dropdown } from "react-bootstrap";
import { DropdownCustomToggler, DropdownMenu1 } from "../../dropdowns";

export function ListsWidget9({ className }) {
  return (
    <>
      <div className={`card card-custom ${className}`}>
        {/* Header */}
        <div className="card-header align-items-center border-0 mt-4">
          <h3 className="card-title align-items-start flex-column">
            <span className="font-weight-bolder text-dark">Process To Add Product</span>
           
          </h3>
       
        </div>
        {/* Body */}
        <div className="card-body pt-4">
          <div className="timeline timeline-6 mt-3">
            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
               
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-warning icon-xl"></i>
              </div>

              <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
                Add Category
              </div>
            </div>
            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-success icon-xl"></i>
              </div>

              <div className="timeline-content d-flex">
                <span className="font-weight-bolder text-dark-75 pl-3 font-size-lg">
                  Add Sub-Category I
                </span>
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
               
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-danger icon-xl"></i>
              </div>

              <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
                Add Category II
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-primary icon-xl"></i>
              </div>

              <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
                Finally Add Product
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
