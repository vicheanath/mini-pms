import React from 'react'
import { useQuery } from 'react-query'
import Loading from '../components/Loading'
import Property from '../components/Property'
const MyProperty = () => {
    const { data, isFetching, isLoading, refetch } = useQuery(
        `properties?memberId=123`
      );
    
        if (isLoading) return <Loading />;
  return (
    <div className="container">
      <h2 className="mt-4">My Property</h2>
      <div className="row">
        {data?.data.length === 0 && (
          <div className="col-md-12">
            <div className="alert alert-info">
              You don't have any property yet.{" "}
              <a href="/add-property">Add Property</a>
            </div>
          </div>
        )}

        {data?.data.map((property) => {
          return (
            <div className="col-md-4" key={property.id}>
              <Property key={property.id} {...property} refetch={refetch} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyProperty