import axios from "../helpers/axios";
import { categoryArticleConstants } from "../constants/categoryArticle.constants";
import { toast } from "react-toastify";

export const getListCategoryArticle = () => {
  return async (dispatch) => {
    dispatch({ type: categoryArticleConstants.GET_ALL_CATEGORY_ARTICLE_REQUEST });
    const res = await axios.get(`/api/cate_articles`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: categoryArticleConstants.GET_ALL_CATEGORY_ARTICLE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      // toast("get list categoryArticle success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: categoryArticleConstants.GET_ALL_CATEGORY_ARTICLE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      // toast("get list categoryArticle error");
    }
  };
};

export const getCategoryArticleById = (id) => {
  return async (dispatch) => {
    dispatch({ type: categoryArticleConstants.GET_CATEGORY_ARTICLE_BY_ID_REQUEST });
    const res = await axios.get(`/api/cate_articles/${id}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: categoryArticleConstants.GET_CATEGORY_ARTICLE_BY_ID_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      // toast("get  categoryArticle by id success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: categoryArticleConstants.GET_CATEGORY_ARTICLE_BY_ID_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      // toast("get  categoryArticle by id error");
    }
  };
};

export const createCategoryArticle = (form) => {
  return async (dispatch) => {
    dispatch({
      type: categoryArticleConstants.ADD_CATEGORY_ARTICLE_REQUEST,
    });
    const res = await axios.post(`/api/cate_articles`, form);

    if (res.status === 201) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: categoryArticleConstants.ADD_CATEGORY_ARTICLE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("t???o danh m???c b??i vi???t s???n ph???m th??nh c??ng");
      dispatch(getListCategoryArticle());
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: categoryArticleConstants.ADD_CATEGORY_ARTICLE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast.error("t???o danh m???c b??i vi???t s???n ph???m th???t b???i");
    }
  };
};
export const deleteCategoryArticle = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryArticleConstants.DELETE_CATEGORY_ARTICLE_REQUEST });
    const res = await axios.delete(`/api/cate_articles/${form.id}`);
    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: categoryArticleConstants.DELETE_CATEGORY_ARTICLE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("x??a danh m???c b??i vi???t s???n ph???m th??nh c??ng");

      dispatch(getListCategoryArticle());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: categoryArticleConstants.DELETE_CATEGORY_ARTICLE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("x??a danh m???c b??i vi???t s???n ph???m th???t b???i");
    }
  };
};

export const updateCategoryArticle = (id ,form) => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: categoryArticleConstants.UPDATE_CATEGORY_ARTICLE_REQUEST });
    const res = await axios.put(`/api/cate_articles/${id}`, form);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: categoryArticleConstants.UPDATE_CATEGORY_ARTICLE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("c???p nh???t danh m???c b??i vi???t s???n ph???m th??nh c??ng");

      dispatch(getListCategoryArticle());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: categoryArticleConstants.UPDATE_CATEGORY_ARTICLE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("c???p nh???t danh m???c b??i vi???t s???n ph???m th???t b???i");
    }
  };
};
