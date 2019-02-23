import React, { FunctionComponent } from 'react'
import { Link, NavLink } from 'react-router-dom';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  UncontrolledDropdown
} from 'reactstrap';
import { IHeaderProps } from '../../core/shared/HeaderContainer';

const Header: FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
  return (
    <Navbar color="light" light={true} expand="md">
      <NavbarBrand href="/">reactstrap</NavbarBrand>
      <NavbarToggler onClick={props.toggleNavbar} />
      <Collapse isOpen={props.isNavbarOpen} navbar={true}>
        <Nav className="ml-auto" navbar={true}>
          <NavItem className="nav-link">
            <NavLink to="/">Home</NavLink>
          </NavItem>
          <UncontrolledDropdown nav={true} inNavbar={true}>
            <DropdownToggle nav={true} caret={true}>
              User
            </DropdownToggle>
            <DropdownMenu right={true}>

              <Link to="/settings">
                <DropdownItem>
                  Settings
                </DropdownItem>
              </Link>

              <DropdownItem divider={true} />

              <Link to="/login">
                <DropdownItem>
                  Log in
                </DropdownItem>
              </Link>
              <Link to="/register">
                <DropdownItem>
                  Register
                </DropdownItem>
              </Link>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar >
  )
}

export default Header;