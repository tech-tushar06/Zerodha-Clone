import React from "react";

const sections = Array.from({ length: 6 }, () => ({
  title: "Account Opening",
  items: [
    "Online Account Opening",
    "Offline Account Opening",
    "Company, Partnership and HUF Account",
    "Opening",
    "NRI Account Opening",
    "Charges at Zerodha",
    "Zerodha IDFC FIRST Bank 3-in-1 Account",
    "Getting Started",
  ],
}));

function CreateTicket() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2">To create a ticket, select a relevant topic</h1>
        {sections.map((section, index) => (
          <div className="col-4 p-5 mt-2 mb-2" key={index}>
            <h4>
              <i className="fa fa-plus-circle" aria-hidden="true"></i> {section.title}
            </h4>
            {section.items.map((item) => (
              <React.Fragment key={item}>
                <a href="/support" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                  {item}
                </a>
                <br />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTicket;
