import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { Fragment, useEffect, useState } from "react";
//import Alert from '../../../layouts/alert/Alert';
// import { setAlert } from '../../../actions/alert';
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
///////
import { createFavourite, filterFavouriteByUser, getListBrand, getListCategory, getListProductByPage } from "../../actions";
import {
  addItemToCart,
  addToCart, getCart, increaseItemQuantity
} from "../../actions/cart";
import MainFooter from "../../layouts/footer";
import MainHeader from "../../layouts/header";


function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Shop_Page5 = () => {

  useEffect(() => {
   
    dispatch(getCart())
  }, []);

  const alert = useAlert();
  // get all wishlist product from redux
  const WishlistProducts = useSelector(state => state.cart.Wishlist_Products);
  // get all product from redux store
  const products = useSelector(state => state.cart.products);
  // for Dispatch a fuction
  const dispatch = useDispatch();
  // add to cart function
  const addProductToCart = item => {
    const product = item;
    let itemQty = product.quantity;
    let productExists = false;
    let productIndex = -1;
    products.forEach((p, idx) => {
      if (product.id === p.id) {
        productExists = true;
        productIndex = idx;
      }
    });
    if (productExists) {
      if (itemQty === undefined) {
        itemQty = 1;
      } else {
        itemQty = product.quantity;
      }
      alert.success('Already in cart!');
      dispatch(increaseItemQuantity(
        productIndex,
        product,
        (itemQty = itemQty + 1)
      ));
    } else {
      dispatch(addItemToCart(product));
      // props.setAlert(
      //   '{product.products_name} has been added to cart',
      //   'success'
      // );
      alert.success('Successfully added to cart!');
    }
    // to add the product in localstorage

    dispatch(addToCart());
  };
  // add and update the cart button
  const addAndUpdatenTheCart = item => {
    let product = item;
    let productExists = false;
    products.forEach((p, idx) => {
      if (product.id === p.id) {
        productExists = true;
        // assign product from redux cart
        product = p;
      }
    });
    if (productExists) {
      addProductToCart(product);
    } else {
      addProductToCart(product);
    }

  };


  const userId = useSelector((state) => state.auth.user?.id);
  useEffect(() => {
    dispatch(filterFavouriteByUser(userId));
  }, [userId]);
  const listFavourite = useSelector((state) => state.favourite.listFavourite)

    const AddToWishList = async (item) => {
    let productExists = false;
    let productIndex = -1;
    listFavourite.forEach((p, idx) => {
      if (item.id === p.product?.id) {
        productExists = true;
        productIndex = idx;
      }
    });
    if (productExists) {
      alert.success(`Already in Wishlist!`);
    } else {
     await dispatch(createFavourite({userId: userId, productId : item.id }));
      dispatch(filterFavouriteByUser(userId));

      alert.success('Successfully added to Wishlist!');
    }
  };

  /////////////////////////////////////////////////////////////////

  const history = useHistory();
  let query = useQuery();

  const limit = 9;
  const [searchFeild, setSearchFeild] = useState("");
  const [reRender, setReRender] = useState(true);
  const [brandId , setBrandId] = useState(0);
  const [sortBy , setSortBy] = useState("default");


  const [currentPage, setCurrentPage] = useState(
    Number(query.get("page")) || 1
  );

  useEffect(() => {
   
    dispatch(getListProductByPage(limit, currentPage - 1,brandId,sortBy));
  }, [currentPage,brandId,sortBy]);

  // useEffect(() => {
  //   if (keyBrandId === 0)
  //     dispatch(getListProductByPage(limit, currentPage - 1));
  //   else dispatch(searchListProductByName(searchFeild, limit, currentPage - 1));
  // }, [currentPage]);


  const listProduct = useSelector((state) => state.product.listProduct);
  var iNewProducts = listProduct.map((product, index) => {
      return Object.assign({}, product, { quantity: 1 });
  });


  const count = useSelector((state) => state.product.count);
  var countPage = Math.ceil(count/limit);

  const handlePageChange = (event, pageNumber) => {
    console.log(pageNumber, "page");
    setCurrentPage(pageNumber);
    history.push(`?page=${pageNumber}`);
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   console.log(searchFeild, "search");
  //   dispatch(searchListProductByName(searchFeild, limit, 0));
  //   history.push(`?search=${searchFeild}&page=${1}`);
  //   setCurrentPage(1);
  // };

  const handleFilterByBrand = (brandId) => {
    // dispatch(filterProductByBrand(brandId , limit, 0));
    setBrandId(brandId);
    history.push(`?filterByBrandId=${brandId}&page=${1}`);
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getListBrand());
  }, []);

  const listBrand = useSelector((state) => state.brand.listBrand);

  useEffect(() => {
    dispatch(getListCategory());
  }, []);

  const listCategory = useSelector((state) => state.category.listCategory);

  return (
    <Fragment>
      <MainHeader />
      
      {/* <section className="bg-primary py-5">
  <div className="container">
    <h2 className="text-white">Cửa hàng</h2>
  
  </div> 
</section> */}
{/*  */}

<section className="padding-y">
  <div className="container">
    <div className="row">
      <aside className="col-lg-3">
        <button className="btn btn-outline-secondary mb-3 w-100  d-lg-none" data-bs-toggle="collapse" data-bs-target="#aside_filter">Show filter</button>
        {/* ===== Card for sidebar filter ===== */}
        <div id="aside_filter" className="collapse card d-lg-block mb-5 " style={{marginTop: "50px"}}>
          <article className="filter-group">
            <header className="card-header">
              <a href="#" className="title collapsed" data-bs-toggle="collapse" data-bs-target="#collapse_aside1" aria-expanded="false">
                <i className="icon-control fa fa-chevron-down" />   Thương hiệu 
              </a>
            </header>
            <div className="collapse show" id="collapse_aside1" style={{}}>
              <div className="card-body">
                <ul className="list-menu ">
                <li><a href="#" onClick={()=> setBrandId(0)} style={{color: "#333"}}>ALL </a></li>   
                  {listBrand.map((e)=>
                  <li><a href="#" onClick={()=> handleFilterByBrand(e.id)} style={{color: "#333"}}>{e.name} </a></li>                  
                  )}
                  
                </ul>
              </div> {/* card-body.// */}
            </div> {/* collapse.// */}
          </article> {/* filter-group // */}
          <article className="filter-group">
            <header className="card-header">
              <a href="#" className="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside2">
                <i className="icon-control fa fa-chevron-down" />  Giá 
              </a>
            </header>
            <div className="collapse show" id="collapse_aside2">
              <div className="card-body">
                <input type="range" className="form-range" min={0} max={100} />
                <div className="row mb-3">
                  <div className="col-6">
                    <label htmlFor="min" className="form-label">Min</label>
                    <input className="form-control" id="min" placeholder="$0" type="number" />
                  </div> {/* col end.// */}
                  <div className="col-6">
                    <label htmlFor="max" className="form-label">Max</label>
                    <input className="form-control" id="max" placeholder="$1,0000" type="number" />
                  </div> {/* col end.// */}
                </div> {/* row end.// */}
                <button className="btn btn-light w-100" type="button">Apply</button>
              </div> {/* card-body.// */}
            </div> {/* collapse.// */}
          </article> {/* filter-group // */}
        </div> {/* card.// */}
        {/* ===== Card for sidebar filter .// ===== */}
      </aside> {/* col .// */}
      <main className="col-lg-9">
        <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
          {/* <strong className="d-block py-2">32 Items found </strong> */}
          <div className="ms-auto">
            <select className="form-select d-inline-block w-auto" onChange={(e)=> setSortBy(e.target.value)}>
            <option value={"createdAt"}>Cũ nhất</option>
              <option value={"createdAtDESC"}>Mới nhất</option>
              <option value={"PriceASC"}>Giá từ thấp đến cao</option>
              <option value={"PriceDESC"}>Giá từ cao đến thấp</option>
            </select>
            {/* <div className="btn-group">
              <a href="#" className="btn btn-light" data-bs-toggle="tooltip" title data-bs-original-title="List view"> 
                <i className="fa fa-bars" />
              </a>
              <a href="#" className="btn btn-light active" data-bs-toggle="tooltip" title data-bs-original-title="Grid view"> 
                <i className="fa fa-th" />
              </a>
            </div> */}
          </div>
        </header>
        {/* ========= content items ========= */}
        <div className="row">
        {iNewProducts !== undefined && iNewProducts.length > 0
                        ? iNewProducts.map((product, index) => {
                            return (
          <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
            <figure className="card card-product-grid">
              <div className="img-wrap"> 
                <img src={product.image} /> 
              </div>
              <figcaption className="info-wrap border-top" >
                <div className="price-wrap">
                  <strong className="price">{product.promotionPrice} VNĐ</strong>
                  <del className="price-old">{product.unitPrice} VNĐ</del>
                </div> {/* price-wrap.// */}
                <p style={{cursor : "pointer" , textOverflow:"ellipsis"}} className="title mb-2 name-product" onClick={()=> {history.push(`/product-detail/${product.id}`)}}>{product.name}</p>
                <button className="btn btn-primary me-2"  onClick={() => addAndUpdatenTheCart(product)}>Thêm vào giỏ</button>
                <button className="btn btn-light btn-icon" onClick={() => AddToWishList(product)} > <i className="fa fa-heart" /> </button>
              </figcaption>
            </figure>
          </div> 
         );
        })
      : "null"}  
        </div> {/* row end.// */}
        <hr />
        <footer className="d-flex mt-4">
          {/* <div>
            <a href="javascript: history.back()" className="btn btn-light"> « Go back</a>
          </div>
          <nav className="ms-3">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item active" aria-current="page">
                <span className="page-link">2</span>
              </li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav> */}
          <Stack spacing={2}>
                    <Pagination
                      count={countPage}
                      color="primary"
                      page={currentPage}
                      onChange={handlePageChange}
                      // renderItem={(item) => (
                      //   <PaginationItem
                      //     component={Link}
                      //     to={`/products/list${item.page === 1 ? '' : `?page=${item.page}`}`}
                      //     {...item}
                      //   />
                      // )}
                    />
                  </Stack>
        </footer>
        {/* ========= content items .// ========= */}
      </main> {/* col .// */}
    </div> {/* row .// */}
  </div> {/* container .//  */}
</section>




      <MainFooter />
    </Fragment>
  );
};

export default Shop_Page5;
