/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import {  checkIsActive } from "../../../../_helpers";
import { MdDashboard, MdOutlineInventory} from "react-icons/md";
import {  FaProductHunt } from "react-icons/fa";
import {  BiCategoryAlt, BiHeading} from "react-icons/bi";


export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
          <span className="svg-icon menu-icon">
          <MdDashboard/>
            </span>
            <span className="menu-text"> Dashboard</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}


        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/e-commerce/products", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/products">
            <span className="svg-icon menu-icon">
            <FaProductHunt/>
            </span>
            <span className="menu-text"> Products</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::2 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/categories"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/categories">
          <span className="svg-icon menu-icon">
          <BiCategoryAlt/>
            </span>
            <span className="menu-text">Category</span>
          </NavLink>
        </li>
      
       
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/subcategories"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/subcategories">
          <span className="svg-icon menu-icon">
          <MdOutlineInventory/>
            </span>
            <span className="menu-text">Sub-Category I</span>
          </NavLink>
        </li>

        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/subcategories1"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/subcategories1">
          <span className="svg-icon menu-icon">
          <MdOutlineInventory/>
            </span>
            <span className="menu-text">Sub-Category II</span>
          </NavLink>
        </li>

        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/roles"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/roles">
          <span className="svg-icon menu-icon">
          <BiHeading/>
            </span>
            <span className="menu-text">Roles</span>
          </NavLink>
        </li>

        


        {/*end::2 Level*/}

        {/* users
          vehicle
          parts
          decoration
          workshop - map
          ticket
          event
          training
          job
          logistic */}
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}