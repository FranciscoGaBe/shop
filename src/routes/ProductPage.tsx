import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Heading from '../components/Heading';
import LoadingHandler from '../components/LoadingHandler';
import Rating from '../components/Rating';
import SectionElement from '../components/SectionElement';
import { useGetProductQuery } from '../services/shop';

const stock = Array(30).fill(0).map((_, index) => index + 1);

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductQuery(id as string);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <LoadingHandler isLoading={isLoading} isError={isError}>
      { data && (
        <div className="p-1">
          <SectionElement className="overflow-hidden">
            <button
              type="button"
              className="font-bold text-neutral-500 px-4 py-2"
              onClick={() => goBack()}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              <span className="ml-2">Go back</span>
            </button>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/3 p-4 bg-white rounded-lg flex items-center">
                <img src={data.image} alt={data.title} />
              </div>
              <div className="w-full md:w-2/3 p-4">
                <p className="font-bold text-gray-500">{ data.category }</p>
                <Heading level={1}>{ data.title }</Heading>
                <div className="flex justify-between items-center mb-4 px-2">
                  <p className="font-black text-3xl text-rose-900">
                    { data.price }
                    {' '}
                    €
                  </p>
                  <div className="text-right text-gray-500 text-xs font-bold">
                    <p>{ data.rating.count }</p>
                    <Rating rate={data.rating.rate} />
                  </div>
                </div>
                <p className="font-semibold">{ data.description }</p>
                <div className="flex items-center justify-end gap-4 mt-8">
                  <label
                    htmlFor="product-quantity"
                    className="flex items-center bg-neutral-400 rounded-2xl py-1 pl-3 pr-2 text-white relative"
                  >
                    <p className="mr-2 select-none absolute pointer-events-none">Quantity:</p>
                    <select
                      id="product-quantity"
                      className="outline-none pl-20 pr-1 font-semibold bg-transparent"
                      value={quantity}
                      onChange={(event) => setQuantity(+event.target.value)}
                    >
                      { stock.map((value) => (
                        <option
                          key={value}
                          value={value}
                          className="bg-neutral-400"
                        >
                          { value }

                        </option>
                      )) }
                    </select>
                  </label>
                  <button
                    type="button"
                    className="bg-rose-800 rounded-lg px-2 py-1 text-white font-semibold"
                  >
                    Add to cart

                  </button>
                </div>
              </div>
            </div>
          </SectionElement>
        </div>
      ) }
    </LoadingHandler>
  );
};

export default ProductPage;
