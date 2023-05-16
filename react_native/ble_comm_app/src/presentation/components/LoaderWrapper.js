import { Metrics } from '../../utils/theme'
import styled from 'styled-components'

export const LoaderWrapper = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
  width: ${Metrics.screenWidth}px;
  height: ${Metrics.screenHeight}px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(52, 52, 52, 0.2);
`