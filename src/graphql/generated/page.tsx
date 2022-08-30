import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient , ApolloClientContext} from '../../lib/Apollo/withApollo';
export async function getServerPageGetAllProducts
    (options: Omit<Apollo.QueryOptions<Types.GetAllProductsQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetAllProductsQuery>({ ...options, query: Operations.GetAllProductsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetAllProducts = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetAllProductsQuery, Types.GetAllProductsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetAllProductsDocument, options);
};
export type PageGetAllProductsComp = React.FC<{data?: Types.GetAllProductsQuery, error?: Apollo.ApolloError}>;
export const withPageGetAllProducts = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetAllProductsQuery, Types.GetAllProductsQueryVariables>) => (WrappedComponent:PageGetAllProductsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetAllProductsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetAllProducts = {
      getServerPage: getServerPageGetAllProducts,
      withPage: withPageGetAllProducts,
      usePage: useGetAllProducts,
    }
export async function getServerPageGetFilterValues
    (options: Omit<Apollo.QueryOptions<Types.GetFilterValuesQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetFilterValuesQuery>({ ...options, query: Operations.GetFilterValuesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetFilterValues = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetFilterValuesQuery, Types.GetFilterValuesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetFilterValuesDocument, options);
};
export type PageGetFilterValuesComp = React.FC<{data?: Types.GetFilterValuesQuery, error?: Apollo.ApolloError}>;
export const withPageGetFilterValues = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetFilterValuesQuery, Types.GetFilterValuesQueryVariables>) => (WrappedComponent:PageGetFilterValuesComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetFilterValuesDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetFilterValues = {
      getServerPage: getServerPageGetFilterValues,
      withPage: withPageGetFilterValues,
      usePage: useGetFilterValues,
    }
export async function getServerPageGetProductBySlug
    (options: Omit<Apollo.QueryOptions<Types.GetProductBySlugQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetProductBySlugQuery>({ ...options, query: Operations.GetProductBySlugDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetProductBySlug = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetProductBySlugQuery, Types.GetProductBySlugQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetProductBySlugDocument, options);
};
export type PageGetProductBySlugComp = React.FC<{data?: Types.GetProductBySlugQuery, error?: Apollo.ApolloError}>;
export const withPageGetProductBySlug = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetProductBySlugQuery, Types.GetProductBySlugQueryVariables>) => (WrappedComponent:PageGetProductBySlugComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetProductBySlugDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetProductBySlug = {
      getServerPage: getServerPageGetProductBySlug,
      withPage: withPageGetProductBySlug,
      usePage: useGetProductBySlug,
    }
export async function getServerPageGetProductsWithFilter
    (options: Omit<Apollo.QueryOptions<Types.GetProductsWithFilterQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetProductsWithFilterQuery>({ ...options, query: Operations.GetProductsWithFilterDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetProductsWithFilter = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetProductsWithFilterQuery, Types.GetProductsWithFilterQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetProductsWithFilterDocument, options);
};
export type PageGetProductsWithFilterComp = React.FC<{data?: Types.GetProductsWithFilterQuery, error?: Apollo.ApolloError}>;
export const withPageGetProductsWithFilter = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetProductsWithFilterQuery, Types.GetProductsWithFilterQueryVariables>) => (WrappedComponent:PageGetProductsWithFilterComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetProductsWithFilterDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetProductsWithFilter = {
      getServerPage: getServerPageGetProductsWithFilter,
      withPage: withPageGetProductsWithFilter,
      usePage: useGetProductsWithFilter,
    }