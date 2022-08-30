import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Json: any;
  Long: any;
};

export type Meta = {
  __typename?: 'Meta';
  /** Alternate languages the document. */
  alternateLanguages: Array<RelatedDocument>;
  /** The first publication date of the document. */
  firstPublicationDate?: Maybe<Scalars['DateTime']>;
  /** The id of the document. */
  id: Scalars['String'];
  /** The language of the document. */
  lang: Scalars['String'];
  /** The last publication date of the document. */
  lastPublicationDate?: Maybe<Scalars['DateTime']>;
  /** The tags of the document. */
  tags: Array<Scalars['String']>;
  /** The type of the document. */
  type: Scalars['String'];
  /** The uid of the document. */
  uid?: Maybe<Scalars['String']>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Product = _Document & _Linkable & {
  __typename?: 'Product';
  _linkType?: Maybe<Scalars['String']>;
  _meta: Meta;
  brand?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  coffee_strength?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['Json']>;
  image?: Maybe<Scalars['Json']>;
  name?: Maybe<Scalars['String']>;
  origin?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
  taste?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
};

/** A connection to a list of items. */
export type ProductConnectionConnection = {
  __typename?: 'ProductConnectionConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ProductConnectionEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Long'];
};

/** An edge in a connection. */
export type ProductConnectionEdge = {
  __typename?: 'ProductConnectionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Product;
};

export type Query = {
  __typename?: 'Query';
  _allDocuments: _DocumentConnection;
  allProducts: ProductConnectionConnection;
  product?: Maybe<Product>;
};


export type Query_AllDocumentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  firstPublicationDate?: InputMaybe<Scalars['DateTime']>;
  firstPublicationDate_after?: InputMaybe<Scalars['DateTime']>;
  firstPublicationDate_before?: InputMaybe<Scalars['DateTime']>;
  fulltext?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  lang?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  lastPublicationDate?: InputMaybe<Scalars['DateTime']>;
  lastPublicationDate_after?: InputMaybe<Scalars['DateTime']>;
  lastPublicationDate_before?: InputMaybe<Scalars['DateTime']>;
  similar?: InputMaybe<Similar>;
  sortBy?: InputMaybe<SortDocumentsBy>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  tags_in?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<Scalars['String']>;
  type_in?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryAllProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  firstPublicationDate?: InputMaybe<Scalars['DateTime']>;
  firstPublicationDate_after?: InputMaybe<Scalars['DateTime']>;
  firstPublicationDate_before?: InputMaybe<Scalars['DateTime']>;
  fulltext?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  lang?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  lastPublicationDate?: InputMaybe<Scalars['DateTime']>;
  lastPublicationDate_after?: InputMaybe<Scalars['DateTime']>;
  lastPublicationDate_before?: InputMaybe<Scalars['DateTime']>;
  similar?: InputMaybe<Similar>;
  sortBy?: InputMaybe<SortProducty>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  tags_in?: InputMaybe<Array<Scalars['String']>>;
  uid?: InputMaybe<Scalars['String']>;
  uid_in?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<WhereProduct>;
};


export type QueryProductArgs = {
  lang: Scalars['String'];
  uid: Scalars['String'];
};

export type RelatedDocument = {
  __typename?: 'RelatedDocument';
  /** The id of the document. */
  id: Scalars['String'];
  /** The language of the document. */
  lang: Scalars['String'];
  /** The type of the document. */
  type: Scalars['String'];
  /** The uid of the document. */
  uid?: Maybe<Scalars['String']>;
};

export enum SortDocumentsBy {
  MetaFirstPublicationDateAsc = 'meta_firstPublicationDate_ASC',
  MetaFirstPublicationDateDesc = 'meta_firstPublicationDate_DESC',
  MetaLastPublicationDateAsc = 'meta_lastPublicationDate_ASC',
  MetaLastPublicationDateDesc = 'meta_lastPublicationDate_DESC'
}

export enum SortProducty {
  BrandAsc = 'brand_ASC',
  BrandDesc = 'brand_DESC',
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  CoffeeStrengthAsc = 'coffee_strength_ASC',
  CoffeeStrengthDesc = 'coffee_strength_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  MetaFirstPublicationDateAsc = 'meta_firstPublicationDate_ASC',
  MetaFirstPublicationDateDesc = 'meta_firstPublicationDate_DESC',
  MetaLastPublicationDateAsc = 'meta_lastPublicationDate_ASC',
  MetaLastPublicationDateDesc = 'meta_lastPublicationDate_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  OriginAsc = 'origin_ASC',
  OriginDesc = 'origin_DESC',
  PriceAsc = 'price_ASC',
  PriceDesc = 'price_DESC',
  RatingAsc = 'rating_ASC',
  RatingDesc = 'rating_DESC',
  TasteAsc = 'taste_ASC',
  TasteDesc = 'taste_DESC',
  WeightAsc = 'weight_ASC',
  WeightDesc = 'weight_DESC'
}

export type WhereProduct = {
  brand?: InputMaybe<Scalars['String']>;
  brand_fulltext?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  category_fulltext?: InputMaybe<Scalars['String']>;
  /** coffee_strength */
  coffee_strength?: InputMaybe<Scalars['Float']>;
  /** coffee_strength */
  coffee_strength_gt?: InputMaybe<Scalars['Float']>;
  /** coffee_strength */
  coffee_strength_lt?: InputMaybe<Scalars['Float']>;
  /** coffee_strength */
  coffee_strength_range?: InputMaybe<Array<Scalars['Float']>>;
  /** description */
  description_fulltext?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_fulltext?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  origin_fulltext?: InputMaybe<Scalars['String']>;
  /** price */
  price?: InputMaybe<Scalars['Float']>;
  /** price */
  price_gt?: InputMaybe<Scalars['Float']>;
  /** price */
  price_lt?: InputMaybe<Scalars['Float']>;
  /** price */
  price_range?: InputMaybe<Array<Scalars['Float']>>;
  /** rating */
  rating?: InputMaybe<Scalars['Float']>;
  /** rating */
  rating_gt?: InputMaybe<Scalars['Float']>;
  /** rating */
  rating_lt?: InputMaybe<Scalars['Float']>;
  /** rating */
  rating_range?: InputMaybe<Array<Scalars['Float']>>;
  taste?: InputMaybe<Scalars['String']>;
  taste_fulltext?: InputMaybe<Scalars['String']>;
  /** weight */
  weight?: InputMaybe<Scalars['Float']>;
  /** weight */
  weight_gt?: InputMaybe<Scalars['Float']>;
  /** weight */
  weight_lt?: InputMaybe<Scalars['Float']>;
  /** weight */
  weight_range?: InputMaybe<Array<Scalars['Float']>>;
};

/** A prismic document */
export type _Document = {
  _meta: Meta;
};

/** A connection to a list of items. */
export type _DocumentConnection = {
  __typename?: '_DocumentConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<_DocumentEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Long'];
};

/** An edge in a connection. */
export type _DocumentEdge = {
  __typename?: '_DocumentEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: _Document;
};

/** An external link */
export type _ExternalLink = _Linkable & {
  __typename?: '_ExternalLink';
  _linkType?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

/** A linked file */
export type _FileLink = _Linkable & {
  __typename?: '_FileLink';
  _linkType?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  size: Scalars['Long'];
  url: Scalars['String'];
};

/** A linked image */
export type _ImageLink = _Linkable & {
  __typename?: '_ImageLink';
  _linkType?: Maybe<Scalars['String']>;
  height: Scalars['Int'];
  name: Scalars['String'];
  size: Scalars['Long'];
  url: Scalars['String'];
  width: Scalars['Int'];
};

/** A prismic link */
export type _Linkable = {
  _linkType?: Maybe<Scalars['String']>;
};

export type Similar = {
  documentId: Scalars['String'];
  max: Scalars['Int'];
};

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { __typename?: 'Query', allProducts: { __typename?: 'ProductConnectionConnection', edges?: Array<{ __typename?: 'ProductConnectionEdge', node: { __typename?: 'Product', name?: string | null, price?: number | null, category?: string | null, image?: any | null, _meta: { __typename?: 'Meta', id: string, uid?: string | null } } } | null> | null } };

export type GetFilterValuesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFilterValuesQuery = { __typename?: 'Query', allProducts: { __typename?: 'ProductConnectionConnection', edges?: Array<{ __typename?: 'ProductConnectionEdge', node: { __typename?: 'Product', brand?: string | null, weight?: number | null, coffee_strength?: number | null } } | null> | null } };

export type GetProductsWithFilterQueryVariables = Exact<{
  brand?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['Float']>;
  coffeeStrength?: InputMaybe<Scalars['Float']>;
  priceMin?: InputMaybe<Scalars['Float']>;
  priceMax?: InputMaybe<Scalars['Float']>;
}>;


export type GetProductsWithFilterQuery = { __typename?: 'Query', allProducts: { __typename?: 'ProductConnectionConnection', edges?: Array<{ __typename?: 'ProductConnectionEdge', node: { __typename?: 'Product', name?: string | null, price?: number | null, category?: string | null, image?: any | null, _meta: { __typename?: 'Meta', uid?: string | null, id: string } } } | null> | null } };


export const GetAllProductsDocument = gql`
    query GetAllProducts {
  allProducts {
    edges {
      node {
        name
        price
        category
        image
        _meta {
          id
          uid
        }
      }
    }
  }
}
    `;

/**
 * __useGetAllProductsQuery__
 *
 * To run a query within a React component, call `useGetAllProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
      }
export function useGetAllProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
        }
export type GetAllProductsQueryHookResult = ReturnType<typeof useGetAllProductsQuery>;
export type GetAllProductsLazyQueryHookResult = ReturnType<typeof useGetAllProductsLazyQuery>;
export type GetAllProductsQueryResult = Apollo.QueryResult<GetAllProductsQuery, GetAllProductsQueryVariables>;
export const GetFilterValuesDocument = gql`
    query GetFilterValues {
  allProducts {
    edges {
      node {
        brand
        weight
        coffee_strength
      }
    }
  }
}
    `;

/**
 * __useGetFilterValuesQuery__
 *
 * To run a query within a React component, call `useGetFilterValuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilterValuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilterValuesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFilterValuesQuery(baseOptions?: Apollo.QueryHookOptions<GetFilterValuesQuery, GetFilterValuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilterValuesQuery, GetFilterValuesQueryVariables>(GetFilterValuesDocument, options);
      }
export function useGetFilterValuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilterValuesQuery, GetFilterValuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilterValuesQuery, GetFilterValuesQueryVariables>(GetFilterValuesDocument, options);
        }
export type GetFilterValuesQueryHookResult = ReturnType<typeof useGetFilterValuesQuery>;
export type GetFilterValuesLazyQueryHookResult = ReturnType<typeof useGetFilterValuesLazyQuery>;
export type GetFilterValuesQueryResult = Apollo.QueryResult<GetFilterValuesQuery, GetFilterValuesQueryVariables>;
export const GetProductsWithFilterDocument = gql`
    query GetProductsWithFilter($brand: String, $weight: Float, $coffeeStrength: Float, $priceMin: Float, $priceMax: Float) {
  allProducts(
    where: {brand: $brand, weight: $weight, coffee_strength: $coffeeStrength, price_lt: $priceMax, price_gt: $priceMin}
  ) {
    edges {
      node {
        name
        price
        category
        image
        _meta {
          uid
          id
        }
      }
    }
  }
}
    `;

/**
 * __useGetProductsWithFilterQuery__
 *
 * To run a query within a React component, call `useGetProductsWithFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsWithFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsWithFilterQuery({
 *   variables: {
 *      brand: // value for 'brand'
 *      weight: // value for 'weight'
 *      coffeeStrength: // value for 'coffeeStrength'
 *      priceMin: // value for 'priceMin'
 *      priceMax: // value for 'priceMax'
 *   },
 * });
 */
export function useGetProductsWithFilterQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsWithFilterQuery, GetProductsWithFilterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsWithFilterQuery, GetProductsWithFilterQueryVariables>(GetProductsWithFilterDocument, options);
      }
export function useGetProductsWithFilterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsWithFilterQuery, GetProductsWithFilterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsWithFilterQuery, GetProductsWithFilterQueryVariables>(GetProductsWithFilterDocument, options);
        }
export type GetProductsWithFilterQueryHookResult = ReturnType<typeof useGetProductsWithFilterQuery>;
export type GetProductsWithFilterLazyQueryHookResult = ReturnType<typeof useGetProductsWithFilterLazyQuery>;
export type GetProductsWithFilterQueryResult = Apollo.QueryResult<GetProductsWithFilterQuery, GetProductsWithFilterQueryVariables>;