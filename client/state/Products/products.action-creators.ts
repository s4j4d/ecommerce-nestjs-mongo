import { Dispatch } from 'redux';
import { productsAPI } from '../../lib';
import { ActionTypes } from './products.action-types';
import { ProductsAction } from './products.actions';

export const fetchProducts =
  () => async (dispatch: Dispatch<ProductsAction>) => {
    try {
      dispatch({
        type: ActionTypes.FETCH_PRODUCTS_START,
      });

      const { data } = await productsAPI('/products');

      dispatch({
        type: ActionTypes.FETCH_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.FETCH_PRODUCTS_ERROR,
        payload: error.mesage,
      });
    }
  };

export const fetchProduct =
  (id: string) => async (dispatch: Dispatch<ProductsAction>) => {
    try {
      dispatch({
        type: ActionTypes.FETCH_PRODUCT_START,
      });

      const { data } = await productsAPI.get(`/products/${id}`);

      dispatch({
        type: ActionTypes.FETCH_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.FETCH_PRODUCT_ERROR,
        payload: error.mesage,
      });
    }
  };