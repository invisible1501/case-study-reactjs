import React from "react";
import Heading from "../utils_component/Heading";
import './HomePage.css';
import { reset, viewHomePage } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import CardGood from "./CardProduct";
import ReactLoading from "react-loading";
import Cookies from 'universal-cookie';
import Nav from "../utils_component/Nav";
import { useNavigate } from "react-router";
const cookies = new Cookies(); 

function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const arrGoods = useSelector(state => state.goods);
    const isLoading = useSelector(state => state.isLoading);
    const [goods, setGoods] = useState([]);
    const [find, setFind] = useState('');

    useEffect(() => {
        //if(cookies.get('username') == null) navigate('/login');
        dispatch(viewHomePage());
        dispatch(reset({'key': 'isLoading', 'data': true}));
    }, []);

    const handleFind = (evt) => {
        setFind(evt.target.value);
    };

    useEffect(() => {
        setGoods(arrGoods);
    }, [arrGoods])

    return (
        <div>
            <Heading handleFind={evt => handleFind(evt)}/>
            <Nav />
            {!isLoading ? (<div className="wrap-goods">
                    {goods.map(item => {
                        if(item.name.toLowerCase().match(find)) {
                            return (
                                <CardGood key={item._id}
                                    name={item.name}
                                    price={item.price}
                                    quantity={item.quantity}
                                    thumbnail={item.thumbnail}
                                    disable={cookies.get('username') == null}
                                />
                            )
                        }
                    })}
            </div>) : (
                <div className="wrapper-loading">
                    <ReactLoading className="loading" type="bubbles" color="#0000FF" height={100} width={50} />
                </div>
            )}
        </div>
    )
}

export default HomePage;