import styled from "styled-components";

const CardBlank = () => {
  return (
    <CardContainer className="card-container">
      <div className="image-container shimmerBG"></div>
      <div className="title shimmerBG">
        <p></p>
      </div>
      <div className="ratings shimmerBG">
        <p></p>
      </div>
      <div className="cuisines shimmerBG">
        <p></p>
      </div>
      <div className="areaName shimmerBG">
        <p></p>
      </div>
      <div className="deliveryTime shimmerBG">
        <p></p>
      </div>
    </CardContainer>
  );
};

export default CardBlank;

const CardContainer = styled.div`
  padding: 10px;
  pointer-events: none;
  cursor: default;
  > div {
    height: 26px;
    margin: 6px 0;
  }
  .image-container {
    width: 100%;
    height: 126px;
  }

  .title {
    width: 80%;
  }

  .ratings {
    width: 20%;
  }

  .cuisines {
    width: 100%;
  }

  .areaName {
    width: 100%;
  }

  .deliveryTime {
    width: 40%;
  }
`;
