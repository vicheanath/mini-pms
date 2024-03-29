import React from "react";
import { useQuery } from "react-query";
import Loading from "../components/Loading";
import Property from "../components/Property";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const MyProperty = () => {
  const {state} = useLocation();
  
  const { data, isFetching, isLoading, refetch } = useQuery(
    `properties?memberId=123`
  );
  const navigate = useNavigate();
  const handleViewOffer = (id) => {
    navigate(`/property/${id}/offers`);
  }

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <h2 className="mt-4">My Property</h2>
      {state?.message && (
        <div className="alert alert-success">{state.message}</div>
      )}
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
            <div className="col-md-4 mb-4" key={property.id}>
              <Property
                key={property.id}
                {...property}
                refetch={refetch}
                viewOffer={handleViewOffer}
                updateProperty={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyProperty;
