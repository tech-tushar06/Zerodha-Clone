import React from 'react'
import Hero from "../home/Hero";
import Brokerage from './Brokerage';
import Navbar from "../../Navbar";
import OpenAccount from '../../OpenAccount';
import Footer from '../../Footer';



function PricingPage() {
    return (
        <>
            <Hero />
            <OpenAccount/>
            <Brokerage />
        
        </>
    );
}

export default PricingPage;