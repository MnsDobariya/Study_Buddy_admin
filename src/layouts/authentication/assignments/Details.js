import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Details = () => {
  const navigate = useNavigate();

  return (
    <>
      
      <SoftBox mt={2} mb={1}>
        <div className="cardDetails w-75">
          {/* <div className="card-assignment" style={{ height: "77px" }}> */}

          <div style={{ padding: "22px", color: "#344767" }}>
            <p >Summary</p>
            <div className="card-Details2 border border-light">
              <p>Works everywhere, whether on a PC, tablet, or mobile device.</p>
            </div>
          </div>
          <p className="card-assignment"> </p>
          {/* </div> */}

          <div style={{ paddingLeft: "22px", paddingRight: "9px", color: "#344767" }}>
            <p >Description</p>
            <p style={{ fontSize: "smaller", paddingBottom: "13px", paddingTop: "13px" }}>Reports may have different structures, depending on the discipline and the purpose. Below is an example report structure, but of course you are should always check your assignment instructions to see what format or structure they suggest, and if in doubt, check with your teacher.</p>
          </div>


        </div>

      </SoftBox>
    </>
  )
}

export default Details;