import styled from 'styled-components';
import errand from '../../assets/errand.jpg'

const BannerImage = styled.section`
  width: 70vw;
  height: 100vh;
  background-image: url(${errand});
  background-size: cover;
  background-position: center;
`

export { BannerImage }