import styled from 'styled-components'

export default styled.View`
  flex: 1;
  background-color: ${props => props.backgroundColor || '#FFFFFF'};
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`