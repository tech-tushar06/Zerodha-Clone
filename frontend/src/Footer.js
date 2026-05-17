import React from 'react'

function Footer() {
    return (
        <>
        <style>{`
            footer a {
                color: black;
                transition: all 0.3s ease;
                display: block;
                margin-bottom: 8px;
            }
            footer a:hover {
                color: #1e90ff;
                text-shadow: 0 0 10px #1e90ff;
            }
        `}</style>
        <footer style={{backgroundColor:"rgb(250, 250, 250)"}}>
       <div className='container border-top mt-5'>
        <div className='row mt-5'>
            <div className='col'>
                <img src='media/logo.svg' style={{width:"50%"}} alt='Zerodha Logo'/>
                <p>
                    &copy; 2010 - 2024, Not Zerodha Broking Ltd. All rights reserved.
                </p>
            </div>
            <div className='col mb-5'>
                <p>Company</p>
                <a href='/about' style={{textDecoration:"none", marginRight:"1px"}}>About</a>
                <a href='/product' style={{textDecoration:"none", marginRight:"1px"}}>Products</a>
                <a href='/pricing' style={{textDecoration:"none", marginRight:"1px"}}>Pricing</a>
                <a href='/signup' style={{textDecoration:"none", marginRight:"1px"}}>Referal programme</a>
                <a href='/about' style={{textDecoration:"none", marginRight:"1px"}}>Careers</a>
                <a href='/product' style={{textDecoration:"none", marginRight:"1px"}}>Zerodha.tech</a>
                <a href='/about' style={{textDecoration:"none", marginRight:"1px"}}>Press & media</a>
                <a href='/about' style={{textDecoration:"none", marginRight:"1px"}}>Zeridha cares (CSR)</a>
            </div>
            <div className='col'>
                <p>Support</p>
                <a href='/support' style={{textDecoration:"none", marginRight:"1px"}}>Contact us</a>
                <a href='/support' style={{textDecoration:"none", marginRight:"1px"}}>Support portal</a>
                <a href='/support' style={{textDecoration:"none", marginRight:"1px"}}>How to file a complaint</a>
                <a href='/support' style={{textDecoration:"none", marginRight:"1px"}}>Status of your complaints</a>
                <a href='/support' style={{textDecoration:"none", marginRight:"1px"}}>Bulletin</a>
                <a href='/support' style={{textDecoration:"none", marginRight:"1px"}}>Circular</a>
                <a href='/support' style={{textDecoration:"none", marginRight:"1px"}}>Z-Connect blog</a>
            </div>
            <div className='col'>
                <p>Account</p>
                <a href='/signup' style={{textDecoration:"none", marginRight:"1px"}}>Open demat account</a>
                <a href='/signup' style={{textDecoration:"none", marginRight:"1px"}}>Minor demat account</a>
                <a href='/signup' style={{textDecoration:"none", marginRight:"1px"}}>NRI demat account</a>
                <a href='/product' style={{textDecoration:"none", marginRight:"1px"}}>Commodity</a>
                <a href='/support' style={{textDecoration:"none", marginRight:"1px"}}>Dematerialisation</a>
                <a href='/support' style={{textDecoration:"none", marginRight:"1px"}}>Fund transfer</a>
                <a href='/support' style={{textDecoration:"none", marginRight:"1px"}}>MTF transfer</a>
                <a href='/signup' style={{textDecoration:"none", marginRight:"1px"}}>Referral program</a>
            </div>
            <div className='col'>
                <p>Quick links</p>
                <a href='/product' style={{textDecoration:"none", marginRight:"1px"}}>Upcoming IPOs</a>
                <a href='/pricing' style={{textDecoration:"none", marginRight:"1px"}}>Brokerage charges</a>
                <a href='/about' style={{textDecoration:"none", marginRight:"1px"}}>Market holidays</a>
                <a href='/about' style={{textDecoration:"none", marginRight:"1px"}}>Economic calendor</a>
                <a href='/pricing' style={{textDecoration:"none", marginRight:"1px"}}>Calculators</a>
                <a href='/product' style={{textDecoration:"none", marginRight:"1px"}}>Markets</a>
                <a href='/product' style={{textDecoration:"none", marginRight:"1px"}}>Sectors</a>
            </div>
        </div>
        <div className='mt-5 text-muted' style={{fontSize:"12px", textDecoration:"none"}}>
        <p>Zerodha Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to complaints@zerodha.com, for DP related to dp@zerodha.com. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF </p>

<p>Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances</p>

<p>Smart Online Dispute Resolution | Grievances Redressal Mechanism</p>

Investments in securities market are subject to market risks; read all the related documents carefully before investing.

<p>Attention investors: (1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. (2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. (3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.</p>

<p>India's largest broker based on networth as per NSE. NSE broker factsheet</p>

<p>"Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please create a ticket here.</p>

<p>*Customers availing insurance advisory services offered by Ditto (Tacterial Consulting Private Limited | IRDAI Registered Corporate Agent (Composite) License No CA0738) will not have access to the exchange investor grievance redressal forum, SEBI SCORES/ODR, or arbitration mechanism for such products.</p>
</div>
       </div>
       </footer>
       </>
    );
}

export default Footer;
