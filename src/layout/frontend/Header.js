import React from "react";
import { Link } from 'react-router-dom';

function Header() {
  return (
  <React.StrictMode>
   <header className="main-header header-style-two">

         
            <div className="header-top">
                <div className="auto-container">
                    <div className="clearfix">
                       
                        <div className="top-left pull-left">
                            <ul className="clearfix">
                                <li><strong>Address:</strong> N 150 SECTOR 12 PRATAP VIHAR, GHAZIABAD - 201 009 UP INDIA
                                </li>

                            </ul>
                        </div>
                      
                        <div className="top-right pull-right">
                            <ul className="social-nav">
                                <li><Link to=""><span className="fa fa-facebook-f"></span></Link></li>
                                <li><Link to=""><span className="fa fa-twitter"></span></Link></li>
                                <li><Link to=""><span className="fa fa-google-plus"></span></Link></li>
                                <li><Link to=""><span className="fa fa-pinterest-p"></span></Link></li>
                                <li><Link to=""><span className="fa fa-dribbble"></span></Link></li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>

           
            <div className="main-box">
                <div className="auto-container">
                    <div className="outer-container clearfix">
                    
                        <div className="logo-box">
                            <div className="logo"><Link to="index.html"><img src="images/logo.png" alt=""/></Link></div>
                        </div>

                      
                        <div className="nav-outer clearfix">

                          
                            <nav className="main-menu navbar-expand-md">
                                <div className="navbar-header">
                                
                                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                </div>

                                <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                                    <ul className="navigation clearfix">
                                        <li><Link to="/" className="active1">Home</Link></li>



                                       
                                        <li className="dropdown"><Link to="">Products</Link>
                                            <ul>
                                                <li className="dropdown"><Link to="">Utility Locators</Link>
                                                    <ul>

                                                        <li><Link to="Advance-PipeCableLocator.html">vLoc3-Pro Receiver
                                                            </Link></li>


                                                        <li><Link to="Ferrous.html">Ferrous Metal Detector</Link></li>
                                                        <li><Link to="">Product</Link></li>
                                                        <li><Link to="">Product</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="dropdown"><Link to="">Fibre Optic Management System</Link>
                                                    <ul>

                                                        <li><Link to="Advance-PipeCableLocator.html">FLS Transmitter
                                                            </Link></li>



                                                        <li><Link to="">Product</Link></li>
                                                        <li><Link to="">Product</Link></li>
                                                    </ul>
                                                </li>


                                                <li className="dropdown"><Link to="">Inspection Cameras</Link>
                                                    <ul>

                                                        <li><Link to="Advance-PipeCableLocator.html"> Drain & Duct
                                                                Cameras Inspection System
                                                            </Link></li>


                                                        <li><Link to="Ferrous.html">Camera Inspection Sysytem</Link></li>
                                                        <li><Link to="">Mini Camera Inspection System</Link></li>
                                                        <li><Link to="">Product</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="dropdown"><Link to="">Solid-State Decouplers</Link>
                                                    <ul>

                                                        <li><Link to="Advance-PipeCableLocator.html"> SSD
                                                            </Link></li>


                                                        <li><Link to="Ferrous.html">PCRX</Link></li>
                                                        <li><Link to="Ferrous.html"> ISP</Link></li>
                                                        <li><Link to="Ferrous.html">PCR </Link></li>
                                                        <li><Link to="Ferrous.html">PCRH </Link></li>

                                                    </ul>
                                                </li>
                                                <li className="dropdown"><Link to="">Solid-State Overvoltage Protectors </Link>
                                                    <ul>

                                                        <li><Link to="Advance-PipeCableLocator.html"> OVP
                                                            </Link></li>


                                                        <li><Link to="Ferrous.html">OVP2 </Link></li>


                                                    </ul>
                                                </li>
                                                <li className="dropdown"><Link to="">Survey Instrument </Link>
                                                    <ul>

                                                        <li><Link to="Advance-PipeCableLocator.html">CorrReader Pro
                                                            </Link></li>


                                                        <li><Link to="Ferrous.html">Hexcorder Pro CIPS/DCVG/ACVG/GIS
                                                                Surveys</Link></li>
                                                        <li><Link to="Advance-PipeCableLocator.html">Smart Logger II Dual
                                                                Input with GPS
                                                            </Link></li>

                                                        <li><Link to="Advance-PipeCableLocator.html">CTL-3000 Analogue
                                                                DCVG Instrument-
                                                            </Link></li>


                                                    </ul>
                                                </li>

                                                <li className="dropdown"><Link to="">Fire & Safety</Link>
                                                    <ul>

                                                        <li><Link to="Advance-PipeCableLocator.html"> Portable Led Light
                                                                Tower
                                                            </Link></li>


                                                        <li><Link to="Ferrous.html"> Mobile Tower Light</Link></li>
                                                        <li><Link to="Ferrous.html"> Water Mist CAFS</Link></li>
                                                        <li><Link to="Ferrous.html">PCR </Link></li>
                                                        <li><Link to="Ferrous.html">PCRH </Link></li>

                                                    </ul>
                                                </li>

                                                <li className="dropdown"><Link to=""> Holiday Detector</Link>
                                                    <ul>

                                                        <li><Link to="Advance-PipeCableLocator.html"> APS High Voltage
                                                                Detector "Stick Type"
                                                            </Link></li>


                                                        <li><Link to="Ferrous.html">AP-W High Voltage Detector-Portable
                                                                Belt Worn</Link></li>
                                                        <li><Link to="Ferrous.html"> M/1 Low Voltage Holiday Detector</Link>
                                                        </li>


                                                    </ul>
                                                </li>
                                                <li className="dropdown"><Link to=""> Reference Electrodes </Link>
                                                    <ul>

                                                        <li><Link to="Advance-PipeCableLocator.html"> Portable Electrodes
                                                            </Link></li>


                                                        <li><Link to="Ferrous.html"> Permanent Electrodes </Link></li>



                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li ><Link to="Principal.html">Principle</Link>
                                            
                                        </li>
                                        <li className="dropdown"><Link to="industry.html">Industries</Link>
                                            <ul>
                                                <li><Link to="sewar.html">Sewer</Link></li>
                                                <li><Link to="power.html">Power   </Link></li>
                                                <li><Link to="water.html">Water</Link></li>
                                                <li><Link to="gas.html">Gas</Link></li>
                                                <li><Link to="Telecom.html">Telecom</Link></li>
                                                <li><Link to="Survey-Mapping.html">Survey/Mapping
                                                </Link></li>
                                                <li><Link to="Municipal.html">Municipal</Link></li>
                                                <li><Link to="Transmission.html">Transmission</Link></li>
                                                <li><Link to="Contract.html">Contract</Link></li>
                                            </ul>
                                        </li>
                                        <li className="dropdown"><Link to="">Support</Link>
                                            <ul>
                                                <li><Link to="">Support 1</Link></li>
                                                <li><Link to="">Support 2</Link></li>
                                                <li><Link to="">Support 2</Link></li>
                                                <li><Link to="">Support 2</Link></li>
                                            </ul>
                                        </li>
                                       <li><Link to="/about">Company</Link></li>

                                    <li><Link to="/contact-us">Contact us</Link></li>
                                    </ul>
                                </div>
                            </nav>
                           
                      
                        </div>
                     
                    </div>
                </div>
            </div>

           
            <div className="sticky-header">
                <div className="auto-container clearfix">
                  
                    <div className="logo pull-left">
                        <Link to="index.html" className="img-responsive"><img src="images/logo-small.png" alt=""
                                title=""/></Link>
                    </div>

             
                    <div className="right-col pull-right">
                      
                        <nav className="main-menu navbar-expand-md">
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="navbarSupportedContent1" aria-controls="navbarSupportedContent1"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>

                            <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent1">
                                <ul className="navigation clearfix">
                                    <li><Link to="/">Home</Link>

                                    </li>


                                  
                                    <li className="dropdown"><Link to="">Products</Link>
                                        <ul>
                                            <li className="dropdown"><Link to="">Utility Locators</Link>
                                                <ul>

                                                    <li><Link to="Advance-PipeCableLocator.html">vLoc3-Pro Receiver
                                                        </Link></li>


                                                    <li><Link to="Ferrous.html">Ferrous Metal Detector</Link></li>
                                                    <li><Link to="">Product</Link></li>
                                                    <li><Link to="">Product</Link></li>
                                                </ul>
                                            </li>
                                            <li className="dropdown"><Link to="">Fibre Optic Management System</Link>
                                                <ul>

                                                    <li><Link to="Advance-PipeCableLocator.html">FLS Transmitter
                                                        </Link></li>



                                                    <li><Link to="">Product</Link></li>
                                                    <li><Link to="">Product</Link></li>
                                                </ul>
                                            </li>


                                            <li className="dropdown"><Link to="">Inspection Cameras</Link>
                                                <ul>

                                                    <li><Link to="Advance-PipeCableLocator.html"> Drain & Duct
                                                            Cameras Inspection System
                                                        </Link></li>


                                                    <li><Link to="Ferrous.html">Camera Inspection Sysytem</Link></li>
                                                    <li><Link to="">Mini Camera Inspection System</Link></li>
                                                    <li><Link to="">Product</Link></li>
                                                </ul>
                                            </li>
                                            <li className="dropdown"><Link to="">Solid-State Decouplers</Link>
                                                <ul>

                                                    <li><Link to="Advance-PipeCableLocator.html"> SSD
                                                        </Link></li>


                                                    <li><Link to="Ferrous.html">PCRX</Link></li>
                                                    <li><Link to="Ferrous.html"> ISP</Link></li>
                                                    <li><Link to="Ferrous.html">PCR </Link></li>
                                                    <li><Link to="Ferrous.html">PCRH </Link></li>

                                                </ul>
                                            </li>
                                            <li className="dropdown"><Link to="">Solid-State Overvoltage Protectors </Link>
                                                <ul>

                                                    <li><Link to="Advance-PipeCableLocator.html"> OVP
                                                        </Link></li>


                                                    <li><Link to="Ferrous.html">OVP2 </Link></li>


                                                </ul>
                                            </li>
                                            <li className="dropdown"><Link to="">Survey Instrument </Link>
                                                <ul>

                                                    <li><Link to="Advance-PipeCableLocator.html">CorrReader Pro
                                                        </Link></li>


                                                    <li><Link to="Ferrous.html">Hexcorder Pro CIPS/DCVG/ACVG/GIS
                                                            Surveys</Link></li>
                                                    <li><Link to="Advance-PipeCableLocator.html">Smart Logger II Dual
                                                            Input with GPS
                                                        </Link></li>

                                                    <li><Link to="Advance-PipeCableLocator.html">CTL-3000 Analogue
                                                            DCVG Instrument-
                                                        </Link></li>


                                                </ul>
                                            </li>

                                            <li className="dropdown"><Link to="">Fire & Safety</Link>
                                                <ul>

                                                    <li><Link to="Advance-PipeCableLocator.html"> Portable Led Light
                                                            Tower
                                                        </Link></li>


                                                    <li><Link to="Ferrous.html"> Mobile Tower Light</Link></li>
                                                    <li><Link to="Ferrous.html"> Water Mist CAFS</Link></li>
                                                    <li><Link to="Ferrous.html">PCR </Link></li>
                                                    <li><Link to="Ferrous.html">PCRH </Link></li>

                                                </ul>
                                            </li>

                                            <li className="dropdown"><Link to=""> Holiday Detector</Link>
                                                <ul>

                                                    <li><Link to="Advance-PipeCableLocator.html"> APS High Voltage
                                                            Detector "Stick Type"
                                                        </Link></li>


                                                    <li><Link to="Ferrous.html">AP-W High Voltage Detector-Portable
                                                            Belt Worn</Link></li>
                                                    <li><Link to="Ferrous.html"> M/1 Low Voltage Holiday Detector</Link>
                                                    </li>


                                                </ul>
                                            </li>
                                            <li className="dropdown"><Link to=""> Reference Electrodes </Link>
                                                <ul>

                                                    <li><Link to="Advance-PipeCableLocator.html"> Portable Electrodes
                                                        </Link></li>


                                                    <li><Link to="Ferrous.html"> Permanent Electrodes </Link></li>



                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li ><Link to="Principal.html">Principle</Link>
                                            
                                    </li>
                                    <li className="dropdown"><Link to="industry.html">Industries</Link>
                                        <ul>
                                            <li><Link to="sewar.html">Sewer</Link></li>
                                            <li><Link to="power.html">Power   </Link></li>
                                            <li><Link to="water.html">Water</Link></li>
                                            <li><Link to="gas.html">Gas</Link></li>
                                            <li><Link to="Telecom.html">Telecom</Link></li>
                                            <li><Link to="Survey-Mapping.html">Survey/Mapping
                                            </Link></li>
                                            <li><Link to="Municipal.html">Municipal</Link></li>
                                            <li><Link to="Transmission.html">Transmission</Link></li>
                                            <li><Link to="/contact-us">Contract</Link></li>
                                        </ul>
                                    </li>

                                    <li className="dropdown"><Link to="">Support</Link>
                                        <ul>
                                            <li><Link to="">Support 1</Link></li>
                                            <li><Link to="">Support 2</Link></li>
                                            <li><Link to="">Support 2</Link></li>
                                            <li><Link to="">Support 2</Link></li>
                                        </ul>
                                    </li>


                                  
                                    <li><Link to="/about">Company</Link></li>

                                    <li><Link to="/contact-us">Contact us</Link></li>
                                </ul>
                            </div>
                        </nav>
                    </div>

                </div>
            </div>


        </header>
 
 </React.StrictMode>

  );
}

export default Header;