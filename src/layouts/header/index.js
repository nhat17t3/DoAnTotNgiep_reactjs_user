import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { filterFavouriteByUser, getListCategory, logout } from "../../actions";
import { addToCart, getCart, removeItemFromCart } from "../../actions/cart";


function useQuery() {
  const { search } = useLocation();
  
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const MainHeader = (props) => {
  const history = useHistory();

  let query = useQuery();
  // const [searchFeild, setSearchFeild] = useState("");

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   console.log(searchFeild, "search");
  //   dispatch(searchListProductByName(searchFeild, 100, 0));
  //   history.push(`/shop?search=${searchFeild}&page=${1}`);

  //   if(searchFeild == "") history.push(`/shop`);

  //   // setCurrentPage(1);
  // };

  const authenticate = useSelector((state) => state.auth.user?.id);
  const userId = useSelector((state) => state.auth.user?.id);

  // for dispatch the function
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, []);

  // useEffect(() => {
  //   dispatch(getListCategory());
  // }, []);
  // const listCate = useSelector((state) => state.category.listCategory);

  useEffect(() => {
    dispatch(filterFavouriteByUser(userId));
  }, [userId]);
  const listFavourite = useSelector((state) => state.favourite.listFavourite);

  // select product from reducer cart
  const products = useSelector((state) => state.cart.products);
  const total = useSelector((state) => state.cart.total);
  // length of product in cart
  const length = products.length;
  // for show alert
  const alert = useAlert();

  // // get all wishlist product from redux
  // const WishlistProducts = useSelector((state) => state.cart.Wishlist_Products);
  // // get the length of the wishlist product
  // const wishlistProductLenght = WishlistProducts.length;

  // for delete the product form cart or list
  const confirmDelete = (index, item) => {
    dispatch(removeItemFromCart(index, item));
    dispatch(addToCart());
    alert.error("Deleted successfully!");
  };


  const [searchFeild, setSearchFeild] = useState(query.get("key"));
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchFeild, "search");
    // if (searchFeild === "") dispatch(getListArticleByPage(limit, currentPage - 1,categoryArticleId));
    // else dispatch(searchListArticleByName(searchFeild, limit, currentPage - 1));
    if (searchFeild !== "") history.push(`/shop/search?key=${searchFeild}`);
    else history.push(`/shop`);
  };

  return (
    <Fragment>
      <header className="section-header">
        <section className="header-main">
          <div className="container">
            <div className="row gy-3 align-items-center">
              <div className="col-lg-2 col-sm-4 col-4">
                <Link to="/" className="navbar-brand">
                  <img
                    className=""
                    style={{ width: "80px", height: "60px" }}
                    src="/logov2.png"
                  />
                </Link>
                {/* brand end.// */}
              </div>
              <div className="order-lg-last col-lg-5 col-sm-8 col-8">
                <div className="float-end d-flex">
                  <Link to="/wishlist" className="btn btn-light me-2">
                    <i className="fa fa-heart" />
                    <span className="ms-1 d-none d-sm-inline-block">
                      Y??u th??ch {listFavourite.length}
                    </span>
                  </Link>
                  <Link to="/cart-page" className="btn btn-light me-2">
                    <i className="fa fa-shopping-cart" />
                    <span className="ms-1">Gi??? h??ng {length}</span>
                  </Link>
                  {!authenticate ? (
                    <Link to="/signin" className="btn btn-light">
                      <i className="fa fa-user" />
                      <span className="ms-1 d-none d-sm-inline-block">
                        ????ng nh???p
                      </span>
                    </Link>
                  ) : (
                    <div className="nav-item dropdown d-inline">
                      <a
                        className="dropdown-toggle nav-link btn btn-light"
                        href="#"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        T??i kho???n
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to="/profile">
                            C?? nh??n
                          </Link>
                        </li>
                      
                        <li>
                          <Link className="dropdown-item" to="/orders">
                            ????n h??ng
                          </Link>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="/"
                            onClick={() => dispatch(logout())}
                          >
                            ????ng xu???t
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* col end.// */}
              <div className="col-lg-5 col-md-12 col-12">
                <form action="#" className onSubmit={handleSearch}>
                  <div className="input-group">
                    <input
                      type="search"
                      className="form-control"
                      style={{ width: "55%" }}
                      placeholder="T??m ki???m s???n ph???m"
                      name="searchFeild"
                      id="searchFeild"
                      value={searchFeild}
                      onChange={(e) => setSearchFeild(e.target.value)}
                    />
                    {/* <select className="form-select">
                <option value>All type</option>
                <option value="codex">Special</option>
                <option value="comments">Only best</option>
                <option value="content">Latest</option>
              </select> */}
                    <button className="btn btn-warning"  type="submit">
                      <i className="fa fa-search" />
                    </button>
                  </div>
                  {/* input-group end.// */}
                </form>
              </div>
              {/* col end.// */}
            </div>
            {/* row end.// */}
          </div>
          {/* container end.// */}
        </section>
        {/* header-main end.// */}
        {/* <nav className="navbar navbar-light bg-white border-top navbar-expand-lg"> */}
        <nav className="navbar navbar-light  navbar-expand-lg color-custom bg-custom">
          <div className="container">
            <button
              className="navbar-toggler border"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar_main"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbar_main">
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <Link className="nav-link ps-0 color-custom" to="/">
                    Trang ch???
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link color-custom" to="/shop">
                    S???n ph???m
                  </Link>
                </li>
                {/* {listCate.map((element) => {
                  if (element.parentId == 0)
                    return (
                      <li className="nav-item dropdown">
                        <a
                          className="dropdown-toggle nav-link color-custom"
                          href="#"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {element.name}
                        </a>
                        <ul className="dropdown-menu">
                          {listCate.map((q) => {
                            if (q.parentId == element.id)
                              return (
                                <li>
                                  <a className="dropdown-item" href="#">
                                    {q.name}
                                  </a>
                                </li>
                              );
                          })}
                        </ul>
                      </li>
                    );
                  else return null;
                })} */}
                <li className="nav-item">
                  <Link className="nav-link color-custom" to="/blog">
                    B??i vi???t
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link color-custom" to="/contact">
                    Li??n h???
                  </Link>
                </li>

                {/* <li className="nav-item dropdown">
            <a className="dropdown-toggle nav-link" href="#" data-bs-toggle="dropdown" aria-expanded="false">
              Others
            </a>
            <ul className="dropdown-menu">
              <li> <a className="dropdown-item" href="#">Submenu one </a> </li>
              <li> <a className="dropdown-item" href="#">Submenu two</a> </li>
              <li> <a className="dropdown-item" href="#">Submenu three</a> </li>
            </ul>
          </li> */}
              </ul>
            </div>
            {/* collapse end.// */}
          </div>
          {/* container end.// */}
        </nav>
        {/* navbar end.// */}
      </header>
    </Fragment>
  );
};

export default MainHeader;
