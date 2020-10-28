import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Spacing } from "components/Layout";
import { LikeIcon } from "components/icons";

const Overlay = styled.div`
  position: absolute;
  width: 50vw;
  height: 400px;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s, visibility 0.3s;
  background: linear-gradient(
    180deg,
    #000000 -19.64%,
    rgba(0, 0, 0, 0) 1.67%,
    rgba(20, 155, 222, 0.5) 96.24%
  );
  color: ${(p) => p.theme.colors.white};
`;

const Root = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;
  border-radius: ${(p) => p.theme.radius.sm};
  overflow: hidden;

  &:hover ${Overlay} {
    opacity: 0;
  }
`;

const Photo = styled.div`
  width: 50vw;
  height: 400px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: ${(p) => p.theme.colors.grey[300]};
`;

const BottomWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 25px;
`;

const Icons = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 25px;
`;

const LikeIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;


const Title = styled.div`
  color: white;
  font-size: 20px;
`;

const Description = styled.div`
  color: white;
  font-size: 16px;
`;

const PostInfo = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

/**
 * Card component, meant to be used in Explore page
 */
const ExploreCard = ({ openPostPopup, image, countLikes }) => {

  return (
    <Root>
      <Photo style={imageLoaded ? { backgroundImage: `url(${image})` } : {}} />

      <Overlay onClick={openPostPopup}>
        <BottomWrapper>
          <PostInfo>
            <Title>
              title
            </Title>
            <Description>
              Description
            </Description>
          </PostInfo>

          <Icons>
            <LikeIconWrapper>
              <LikeIcon color="white" />
              <Spacing left="xs" right="lg">
                {countLikes}
              </Spacing>
            </LikeIconWrapper>
          </Icons>

        </BottomWrapper>
      </Overlay>
    </Root>
  );
};

ExploreCard.propTypes = {
  openPostPopup: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  countLikes: PropTypes.number.isRequired,
};

export default ExploreCard;
